import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenNames} from '../constants/ScreenNames';
import {EventShimmer} from '../components/Shimmer';
import moment from 'moment';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {getImage} from '../utils/ImagePath';
import FastImage from 'react-native-fast-image';
import NoDataFound from '../components/NoDataFound';

const AttendedEvents = ({navigation, shimmer, registeredList}) => {
  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const checkCameraPermission = async ID => {
    console.log('ID', ID);
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
          {text: 'Open Settings', onPress: openAppSettings},
        ],
      );
    }
  };

  const openAppSettings = () => {
    openSettings().catch(() => {
      console.log('Unable to open settings. Please go to settings manually.');
    });
  };

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
                    {marginTop: index == 0 ? '2%' : '5%'},
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
                      <Text style={MyStyles.dateTxt}>
                        {moment(item?.start_datetime).format('DD')}
                      </Text>
                      <Text style={MyStyles.monthTxt}>
                        {moment(item?.start_datetime).format('MMM')}
                      </Text>
                    </View>

                    <View style={MyStyles.modeCont}>
                      <Text style={MyStyles.modeTxt}>
                        {item?.event_type === 'F' ? 'Offline' : 'Online'}
                      </Text>
                    </View>
                  </View>

                  {/* // # Content Container */}
                  <View style={MyStyles.boxContentContainer}>
                    <View style={{width: '80%'}}>
                      <Text numberOfLines={1} style={MyStyles.titleTxt}>
                        {item?.session_name}
                      </Text>
                      <Text numberOfLines={1} style={MyStyles.descripTxt}>
                        {item?.description}
                      </Text>
                    </View>

                    <View style={{width: '18%'}}>
                      <Text style={MyStyles.amtTxt}>
                        {item?.is_attended === 'N' ? 'Free' : 'Paid'}
                      </Text>
                    </View>
                  </View>

                  {/* // # Icon & Register Btn Container */}
                  <View
                    style={[
                      MyStyles.boxContentContainer,
                      {marginBottom: '1%'},
                    ]}>
                    <View style={[MyStyles.iconsContainer, {width: '30%'}]}>
                      {item?.is_attended === 'N' && (
                        <TouchableOpacity
                          onPress={() => checkCameraPermission(item?.id)}
                          style={MyStyles.iconStyle}
                          activeOpacity={0.6}>
                          <MaterialCommunityIcons
                            name="qrcode-scan"
                            size={moderateScale(19)}
                            color={COLORS.charcoal}
                          />
                        </TouchableOpacity>
                      )}

                      {item?.is_attended === 'Y' && (
                        <TouchableOpacity
                          onPress={() =>
                            // navigateTo(screenNames.coupons, {eventId: item?.id})
                            {}
                          }
                          style={MyStyles.iconStyle}
                          activeOpacity={0.6}>
                          <MaterialCommunityIcons
                            name="ticket-percent-outline"
                            size={moderateScale(22)}
                            color={COLORS.charcoal}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text
                      style={[
                        MyStyles.registerTxt,
                        {color: COLORS.candlelight},
                      ]}>
                      {item?.is_registered === 'Y' && 'Registered ✓'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          ListEmptyComponent={<NoDataFound screen={screenNames.events} />}
        />
      ) : (
        Array(2)
          .fill(2)
          .map((_, i) => {
            return (
              <TouchableOpacity onPress={() => checkCameraPermission(5)}>
                <EventShimmer marginTop={i === 0 ? '2%' : '5%'} />
              </TouchableOpacity>
            );
          })
      )}
    </>
  );
};

export default AttendedEvents;

const styles = StyleSheet.create({});
