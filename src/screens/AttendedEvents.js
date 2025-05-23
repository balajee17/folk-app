import {
  Alert,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  moderateScale,
  MyStyles,
  verticalScale,
} from '../styles/MyStyles';
import {screenNames} from '../constants/ScreenNames';
import {EventShimmer} from '../components/Shimmer';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import NoDataFound from '../components/NoDataFound';
import {RedirectURL, toastThrottle} from '../components/CommonFunctionalities';
import {useToast} from 'react-native-toast-notifications';
import {useAppContext} from '../../App';

const AttendedEvents = ({navigation, shimmer, registeredList, refresh}) => {
  const {globalState} = useAppContext();
  const {eventCardColor} = globalState;

  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const checkCameraPermission = async ID => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
      // Function to check permission
      const result = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );

      if (result === RESULTS.GRANTED) {
        navigateTo(screenNames.scanner, {eventId: ID});
      } else if (result === RESULTS.DENIED) {
        const result = await request(permission);

        if (result === RESULTS.GRANTED) {
          navigateTo(screenNames.scanner, {eventId: ID});
        }
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Please enable camera access in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => openAppSettings()},
          ],
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const openAppSettings = () => {
    openSettings().catch(() => {
      console.log('Unable to open settings. Please go to settings manually.');
    });
  };
  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);
  return (
    <>
      {!shimmer ? (
        <FlatList
          contentContainerStyle={{paddingBottom: verticalScale(250)}}
          showsVerticalScrollIndicator={false}
          data={registeredList}
          renderItem={({item, index}) => {
            return (
              <>
                {/*  // @ Events Card */}
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => {
                    navigateTo(screenNames.eventDetails, {
                      screen: 'Registered',
                      eventId: item?.id,
                    });
                  }}
                  activeOpacity={0.9}
                  style={[
                    MyStyles.card,
                    {
                      marginTop: index == 0 ? '2%' : '5%',
                      backgroundColor: eventCardColor || COLORS.eventCard,
                    },
                  ]}>
                  {/* // # Card image */}

                  <Image
                    style={MyStyles.cdImage}
                    source={{
                      uri: item?.image,
                    }}
                    resizeMode="stretch"
                  />

                  {/* // # Date Mode Container */}
                  <View style={MyStyles.dateModeCont}>
                    <View style={MyStyles.dateCont}>
                      <Text style={MyStyles.dateTxt}>{item?.start_date}</Text>
                      <Text style={MyStyles.monthTxt}>{item?.start_month}</Text>
                    </View>

                    {(item?.event_type === 'F' || item?.event_type === 'O') && (
                      <View style={MyStyles.modeCont}>
                        <Text style={MyStyles.modeTxt}>
                          {item?.event_type === 'F'
                            ? 'Offline'
                            : item?.event_type === 'O'
                            ? 'Online'
                            : ''}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* // # Content Container */}
                  <View style={MyStyles.boxContentContainer}>
                    <View style={{width: '72%'}}>
                      <Text numberOfLines={1} style={MyStyles.titleTxt}>
                        {item?.session_name}
                      </Text>
                      <Text numberOfLines={1} style={MyStyles.descripTxt}>
                        {item?.description}
                      </Text>
                    </View>

                    <View style={{width: '25%'}}>
                      <Text style={MyStyles.amtTxt}>{item?.amount}</Text>
                    </View>
                  </View>

                  {/* // # Icon & Register Btn Container */}
                  <View
                    style={[
                      MyStyles.boxContentContainer,
                      {marginBottom: '1%'},
                    ]}>
                    <View style={[MyStyles.iconsContainer, {width: '40%'}]}>
                      {!!item?.session_link && item?.event_type === 'O' && (
                        <TouchableOpacity
                          onPress={async () => {
                            const result = await RedirectURL(
                              item?.session_link,
                            );
                            if (!!result?.type) {
                              toastMsg(result?.message, result?.type);
                            }
                          }}
                          style={MyStyles.iconStyle}
                          activeOpacity={0.6}>
                          <Image
                            source={{
                              uri: item?.videoIcon,
                            }}
                            style={styles.iconImgStyle}
                          />
                        </TouchableOpacity>
                      )}

                      {item?.show_scan === 'Y' && (
                        <TouchableOpacity
                          onPress={() => checkCameraPermission(item?.id)}
                          style={MyStyles.iconStyle}
                          activeOpacity={0.6}>
                          <Image
                            source={{
                              uri: item?.scannerIcon,
                            }}
                            style={styles.iconImgStyle}
                          />
                        </TouchableOpacity>
                      )}

                      {item?.show_voucher === 'Y' && (
                        <TouchableOpacity
                          onPress={() =>
                            navigateTo(screenNames.coupons, {eventId: item?.id})
                          }
                          style={MyStyles.iconStyle}
                          activeOpacity={0.6}>
                          {/* <MaterialCommunityIcons
                            name="ticket-percent-outline"
                            size={moderateScale(22)}
                            color={COLORS.btIcon}
                          /> */}
                          <Image
                            source={{
                              uri: item?.prasadamIcon,
                            }}
                            style={styles.iconImgStyle}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {(item?.is_attended === 'Y' ||
                      item?.is_registered === 'Y') && (
                      <Text
                        style={[MyStyles.registerTxt, {color: COLORS.citrine}]}>
                        {item?.is_attended === 'Y'
                          ? 'Attended ✓✓'
                          : item?.is_registered === 'Y'
                          ? 'Registered ✓'
                          : ''}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={shimmer} onRefresh={refresh} />
          }
          ListEmptyComponent={<NoDataFound screen={screenNames.events} />}
        />
      ) : (
        Array(2)
          .fill(2)
          .map((_, i) => {
            return (
              <View>
                <EventShimmer marginTop={i === 0 ? '2%' : '5%'} />
              </View>
            );
          })
      )}
    </>
  );
};

export default AttendedEvents;

const styles = StyleSheet.create({
  iconImgStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
});
