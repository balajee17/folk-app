import {Animated, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {COLORS, MyStyles, screenWidth} from '../styles/MyStyles';
import {CommonStatusBar} from '../components/StatusBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '../../App';
import {getImage} from '../utils/ImagePath';
import {API} from '../services/API';
import DeviceInformation from '../components/DeviceInfo';
import {screenNames} from '../constants/ScreenNames';

const Splash = ({navigation}) => {
  const {setGlobalState} = useAppContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Promise.all([startFadeAnimation(), checkLoginStatus()])
      .then(results => {
        const userData = results[1];
        console.log('userLoggedIn', userData);
        if (userData?.profileId) {
          updateFcm(userData);
        } else {
          navigation.navigate(screenNames.login);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const checkLoginStatus = async () => {
    const storedVal = await AsyncStorage.getItem('userDetails');
    const parsedData = JSON.parse(storedVal);
    console.log('storedVal', storedVal);
    return parsedData;
  };

  const updateFcm = async userData => {
    try {
      const asyncStorageFcmId = await AsyncStorage.getItem('@FcmId');
      console.log('asyncStorageFcmId', asyncStorageFcmId);
      const {
        getAppVersion,
        getDeviceId,
        getDeviceModel,
        getDeviceName,
        getDeviceVersion,
      } = DeviceInformation;
      const params = {
        profileId: userData?.profileId,
        fcmId: asyncStorageFcmId,
        deviceId: await getDeviceId(),
        deviceName: await getDeviceName(),
        deviceModel: await getDeviceModel(),
        deviceVersion: await getDeviceVersion(),
        appVersion: await getAppVersion(),
      };
      const response = await API.checkFCMId(params);

      console.log('Check_FCM_response', response?.data);
      const {colors, successCode, message} = response?.data;
      const {
        header,
        bottomTab,
        button,
        card,
        eventCard,
        announcementCard,
        tabIndicator,
      } = colors || {};
      if (successCode === 1) {
        await setGlobalState(prev => ({
          ...prev,
          profileId: userData?.profileId,
          folkId: userData?.folkId,
          userName: userData?.name,
          mobileNumber: userData?.mobile,
          photo: userData?.photo,
          current: 'DB1',
          btTab: 'DB1',
          activeEventTab: 0,
          isConnected: true,
          headerColor: header,
          bottomTabColor: bottomTab,
          buttonColor: button,
          cardColor: card,
          eventCardColor: eventCard,
          announcementCardColor: announcementCard,
          tabIndicatorColor: tabIndicator,
        }));
        navigation.replace(screenNames.drawerNavigation);
      } else {
        navigation.replace(screenNames.login);
      }
    } catch (error) {
      console.log('ERROR_FCM_Update', error);
      navigation.replace(screenNames.login);
    }
  };

  const startFadeAnimation = () => {
    return new Promise(resolve => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000, // Adjust animation duration as needed
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };

  return (
    <>
      <CommonStatusBar />

      <View style={[MyStyles.flex1, styles.mainContainer]}>
        <Animated.Image
          resizeMode="stretch"
          source={getImage.folkSplash}
          style={[styles.logoImg, {opacity: fadeAnim}]}
        />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.header,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {width: screenWidth * 0.5, height: screenWidth * 0.3},
});
