import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const Login = () => {
  const statusBarHeight = useStatusBarHeight();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {}, []);

  //   # API GET OTP
  const getOTP = async () => {};

  return (
    <>
      <StatusBarTransp screen={screenNames.login} />
      <ImageBackground style={MyStyles.flex1} source={getImage.loginBg}>
        <SafeAreaView style={MyStyles.flex1}>
          {/* // @ FOLK GIF */}
          <FastImage
            style={styles.folkGIF(statusBarHeight)}
            source={getImage.folkGIF}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* // @ Login Txt */}
          <Text style={styles.loginTxt}>Login</Text>

          {/* // @ TextInput */}
          <FloatingInput
            screen={screenNames.login}
            cntnrStyle={styles.txtInptCont}
            txtInptStyle={styles.txtInpt}
            label={'Mobile Number'}
            labelStyle={styles.txtInptLbl}
            value={mobile}
            onChange={value => {
              setMobile(value);
            }}
            maxLength={10}
            floatingTxtCntnr={{top: '30%'}}
          />

          {/* // @ Get OTP Btn */}
          <TouchableOpacity
            onPress={getOTP}
            activeOpacity={0.8}
            style={styles.otpBtn}>
            <Text style={styles.otpBtnTxt}>Get OTP</Text>
          </TouchableOpacity>
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
    backgroundColor: COLORS.otpBtn,
    marginTop: '15%',
    borderRadius: moderateScale(28),
  },
  otpBtnTxt: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: SIZES.l,
    top: 2,
  },
});
