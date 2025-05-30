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
  SIZES,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ]}
                  key={item?.id}>
                  {/* // # Left Side Image */}
                  <View style={[MyStyles.imgCont]}>
                    <Image
                      style={MyStyles.image}
                      source={{
                        uri: item?.image,
                      }}
                    />
                  </View>

                  {/* // # Right Side - Event Title */}
                  <View style={{width: '56%'}}>
                    <Text numberOfLines={1} style={MyStyles.titleTxt}>
                      {item?.session_name}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={[
                        MyStyles.descripTxt,
                        {marginTop: '1%', lineHeight: 17},
                      ]}>
                      {item?.description}
                    </Text>
                    {/* // # Date & mode */}
                    <View style={MyStyles.dateModeCont}>
                      <Text numberOfLines={1} style={MyStyles.dateTxt}>
                        {item?.start_date}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[MyStyles.dateTxt, {marginLeft: '2%'}]}>
                        {item?.start_month},
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={[MyStyles.dateTxt, {marginLeft: '1%'}]}>
                        {item?.event_type === 'F' ? 'Offline' : 'Online'}
                      </Text>
                    </View>

                    {/*  // # Amount & Available Seats */}
                    <Text
                      numberOfLines={1}
                      style={[MyStyles.amtTxt, {width: '100%'}]}>
                      {item?.amount}
                    </Text>

                    {/*  // # Icons & Status */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                      }}>
                      {/* // # Icon & Register Btn Container */}
                      <View
                        style={[
                          MyStyles.iconsContainer,
                          {
                            width: '60%',
                            justifyContent: 'flex-start',
                          },
                        ]}>
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
                              navigateTo(screenNames.coupons, {
                                eventId: item?.id,
                              })
                            }
                            style={MyStyles.iconStyle}
                            activeOpacity={0.6}>
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
                          style={[
                            MyStyles.registerTxt,
                            {
                              color: COLORS.citrine,
                              fontSize: SIZES.subTitle,
                              bottom: 0,
                              position: 'absolute',
                              right: 0,
                            },
                          ]}>
                          {item?.is_attended === 'Y'
                            ? '✓✓'
                            : item?.is_registered === 'Y'
                            ? '✓'
                            : ''}
                        </Text>
                      )}
                    </View>
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
        Array(3)
          .fill(3)
          .map((_, i) => {
            return <EventShimmer marginTop={i === 0 ? '2%' : '5%'} />;
          })
      )}
    </>
  );
};

export default AttendedEvents;

const styles = StyleSheet.create({
  iconImgStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
