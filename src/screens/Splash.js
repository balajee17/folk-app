import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
      await setGlobalState(prev => ({
        ...prev,
        profileId: userData?.profileId,
        folkId: userData?.folkId,
        userName: userData?.name,
        mobileNumber: userData?.mobile,
        photo: userData?.photo,
      }));
      const {
        getAppVersion,
        getDeviceId,
        getDeviceModel,
        getDeviceName,
        getDeviceOS,
        getDeviceOsVersion,
        getDeviceVersion,
      } = DeviceInformation;
      const params = {
        profileId: userData?.profileId,
        fcmId: 'FCM-15645641498454235346',
        device_id: await getDeviceId(),
        device_name: await getDeviceName(),
        device_model: await getDeviceModel(),
        device_version: await getDeviceVersion(),
        app_version: await getAppVersion(),
        device_os: await getDeviceOS(),
      };
      const response = await API.checkFCMId(params);

      console.log('Check_FCM_response', response?.data);
      const {successCode, message} = response?.data;
      if (successCode === 1) {
      }
      navigation.replace(screenNames.drawerNavigation);
    } catch (error) {
      console.log('ERROR_FCM_Update', error);
      navigation.replace(screenNames.drawerNavigation);
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
    <SafeAreaView style={MyStyles.flex1}>
      <CommonStatusBar />
      <View style={[MyStyles.flex1, styles.mainContainer]}>
        <Animated.Image
          resizeMode="stretch"
          source={getImage.folkSplash}
          style={[styles.logoImg, {opacity: fadeAnim}]}
        />
      </View>
    </SafeAreaView>
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
