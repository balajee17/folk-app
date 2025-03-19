import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
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

const Login = () => {
  const statusBarHeight = useStatusBarHeight();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loader, setLoader] = useState(false);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const txtInpt = useRef(null);

  useEffect(() => {}, []);

  // # Validate Mobile No
  const validateMobile = () => {
    console.log('first', mobile);
    if (mobile.length < 10) {
      toastMsg('Enter 10 Digit Mobile Number');
      return;
    }
    if (!mobileRegex.test(mobile)) {
      toastMsg('Invalid Mobile Number');
      return;
    }
    // loginAPI(1);

    setShowOtp(true);
  };

  //   # API GET OTP - type => 1 getOTP, 2 verifyOTP
  const loginAPI = async type => {
    try {
      setLoader(true);

      const params = type === 1 ? {mobileNumber: mobile} : {};
      const response =
        type === 1 ? await API.getOTP(params) : await API.verifyOTP(params);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        if (type === 1) {
          toastMsg(message, 'info');
        } else {
          // toastMsg(message, 'warning');
          navigation.navigate(screenNames.drawerNavigation);
        }
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-Login', err);
    }
  };

  return (
    <>
      <StatusBarTransp screen={screenNames.login} />
      <ImageBackground style={MyStyles.flex1} source={getImage.loginBg}>
        <Spinner spinnerVisible={loader} />
        <SafeAreaView style={MyStyles.flex1}>
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
                onPress={() => loginAPI(2)}
                activeOpacity={0.8}
                style={styles.resendBtn}>
                <Text style={styles.resendTxt}>Resend</Text>
              </TouchableOpacity>
            )}

            {/* // @ Button */}
            <TouchableOpacity
              onPress={validateMobile}
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
    marginTop: statusBarHeight,
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
