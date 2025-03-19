import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';

const OtpInput = ({otpLength, setOtpValue, contnrStyle}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    console.log('newOtp', newOtp);
    setOtp(newOtp);
    const removeEmpty = newOtp.filter(element => element !== '').join('');
    setOtpValue(removeEmpty);

    // Move to the next input if a digit is entered
    if (text && index < otpLength - 1) {
      inputs.current[index + 1].focus();
    }

    // Check if all OTP boxes are filled
    if (newOtp.every(digit => digit !== '')) {
      Keyboard.dismiss(); // Dismiss the keyboard when all boxes are filled
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to the previous input on backspace if the current input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, contnrStyle]}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          style={styles.input}
          value={digit}
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          cursorColor={COLORS.white}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.white,
    width: horizontalScale(50),
    borderRadius: moderateScale(12),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    marginHorizontal: horizontalScale(5),
    marginTop: verticalScale(6),
    height: horizontalScale(50),
    marginBottom: verticalScale(6),
    backgroundColor: COLORS.backBg,
  },
});

export default OtpInput;
