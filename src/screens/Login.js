import {
  BackHandler,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  CommonStatusBar,
  StatusBarTransp,
  useStatusBarHeight,
} from '../components/StatusBarComponent';
import {getImage} from '../utils/ImagePath';
import {screenNames} from '../constants/ScreenNames';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import FastImage from 'react-native-fast-image';
import FloatingInput from '../components/FloatingInput';
import {mobileRegex} from '../components/CommonFunctionalities';
import {useToast} from 'react-native-toast-notifications';
import {API} from '../services/API';
import Spinner from '../components/Spinner';
import OtpInput from '../components/OtpInput';
import {useFocusEffect} from '@react-navigation/native';
import DeviceInformation from '../components/DeviceInfo';
import AndroidBackHandler, {CustomPopup} from '../components/BackHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '../../App';

const Login = ({navigation}) => {
  const statusBarHeight = useStatusBarHeight();

  const {setGlobalState} = useAppContext();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [exitAppModal, setExitAppModal] = useState(false);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const txtInpt = useRef(null);

  // # Back Handler
  useEffect(() => {
    const backAction = () => {
      if (showOtp) {
        setShowOtp(false);
        setOtp('');
        return true;
      }
      setExitAppModal(!exitAppModal);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleOkay = () => {
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setExitAppModal(false);
  };

  // # Validate Mobile No
  const validateMobile = type => {
    console.log('first', mobile);
    if (type === 1 && mobile.length < 10) {
      toastMsg('Enter 10 Digit Mobile Number.');
      return;
    }
    if (type === 1 && !mobileRegex.test(mobile)) {
      toastMsg('Invalid Mobile Number.');
      return;
    }
    console.log('otp?.length', otp?.length);
    if (type === 2 && otp?.length < 4) {
      toastMsg('Enter 4 digit OTP.');
      return;
    }
    loginAPI(type);
  };

  //   # API GET OTP - type => 1 getOTP, 2 verifyOTP
  const loginAPI = async type => {
    try {
      setLoader(true);
      const {
        getAppVersion,
        getDeviceId,
        getDeviceModel,
        getDeviceName,
        getDeviceOS,
        getDeviceOsVersion,
        getDeviceVersion,
      } = DeviceInformation;
      const params =
        type === 1
          ? {mobileNumber: mobile}
          : {
              mobileNumber: mobile,
              otp: otp,
              fcm_id: 'FCM-1564564149845456845',
              device_id: await getDeviceId(),
              device_name: await getDeviceName(),
              device_model: await getDeviceModel(),
              device_version: await getDeviceVersion(),
              app_version: await getAppVersion(),
              device_os: await getDeviceOS(),
            };
      const response =
        type === 1 ? await API.getOTP(params) : await API.verifyOTP(params);
      const {successCode, message} = response?.data;
      if (successCode === 1) {
        if (type === 1) {
          setShowOtp(true);
          toastMsg(message, 'success');
          setLoader(false);
        } else {
          setLoader(false);
          console.log('data12345', response?.data);
          const {id, photo, name, folkId, mobile} = response?.data?.profile;
          const userDetails = {profileId: id, photo, name, folkId, mobile};
          await setGlobalState({
            current: 'DB1',
            btTab: 'DB1',
            profileId: id,
            activeEventTab: 0,
            isConnected: true,
            folkId: folkId,
            userName: name,
            mobileNumber: mobile,
            photo: photo,
          });
          await AsyncStorage.setItem(
            'userDetails',
            JSON.stringify(userDetails),
          );
          await navigation.replace(screenNames.drawerNavigation);
        }
      } else {
        setLoader(false);
        toastMsg(message, 'warning');
      }
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-Login', err);
    }
  };

  return (
    <>
      <CommonStatusBar bgColor={COLORS.white} screen={screenNames.login} />
      <ImageBackground style={MyStyles.flex1} source={getImage.loginBg}>
        <Spinner spinnerVisible={loader} />
        <SafeAreaView style={MyStyles.flex1}>
          {/* // @ Exit App Modal */}
          <CustomPopup
            visible={exitAppModal}
            onOkay={() => handleOkay()}
            onCancel={() => handleCancel()}
          />

          {/* // @ FOLK GIF */}
          <FastImage
            style={styles.folkGIF(statusBarHeight)}
            source={getImage.folkGIF}
            resizeMode={FastImage.resizeMode.contain}
          />
          <ScrollView
            style={MyStyles.flex1}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            {/* // @ Login Txt */}
            <Text style={styles.loginTxt}>{!showOtp ? 'Login' : 'OTP'}</Text>

            {/* // @ TextInput */}
            {!showOtp ? (
              <FloatingInput
                ref={txtInpt}
                screen={screenNames.login}
                cntnrStyle={styles.txtInptCont}
                txtInptStyle={styles.txtInpt}
                label={'Mobile Number'}
                labelStyle={styles.txtInptLbl}
                value={mobile}
                onChangeText={text => {
                  setMobile(text);
                  if (text.length === 10) {
                    Keyboard.dismiss();
                  }
                }}
                maxLength={10}
                floatingTxtCntnr={{top: '30%'}}
                keyboardType="number-pad"
                cursorColor={COLORS.white}
              />
            ) : (
              <OtpInput
                contnrStyle={{marginTop: '12%'}}
                otpLength={4}
                setOtpValue={val => setOtp(val)}
              />
            )}
            {/* // @ Get OTP Btn */}
            {showOtp && (
              <TouchableOpacity
                onPress={() => validateMobile(2)}
                activeOpacity={0.8}
                style={styles.resendBtn}>
                <Text style={styles.resendTxt}>Resend</Text>
              </TouchableOpacity>
            )}

            {/* // @ Button */}
            <TouchableOpacity
              onPress={() => validateMobile(showOtp ? 2 : 1)}
              activeOpacity={0.8}
              style={[styles.otpBtn, showOtp && {marginTop: '10%'}]}>
              <Text style={styles.otpBtnTxt}>
                {!showOtp ? 'Get OTP' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  folkGIF: statusBarHeight => ({
    width: horizontalScale(320),
    height: horizontalScale(320),
    alignSelf: 'center',
  }),
  loginTxt: {
    fontFamily: FONTS.LufgaBold,
    fontSize: SIZES.xxxl + 5,
    color: COLORS.white,
    textAlign: 'center',
  },
  txtInptCont: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '15%',
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: COLORS.backBg,
  },
  txtInpt: {
    width: '94%',
    marginHorizontal: '2%',
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    letterSpacing: 2,
  },
  txtInptLbl: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.l,
  },
  otpBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(130),
    height: verticalScale(40),
    backgroundColor: COLORS.loginBtn,
    marginTop: '15%',
    borderRadius: moderateScale(28),
  },
  otpBtnTxt: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: SIZES.l,
    top: 2,
  },
  resendBtn: {
    marginTop: '1%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  resendTxt: {
    fontFamily: FONTS.LufgaBold,
    color: COLORS.silver,
    fontSize: SIZES.l,
  },
});
