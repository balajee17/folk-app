import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import {useAppContext} from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WheelColor = ({
  selectedColor,
  openColorPick,
  closePicker,
  userColorCode,
}) => {
  const {globalState} = useAppContext();
  const {buttonColor} = globalState;
  const [currentColor, setCurrentColor] = useState('#fff');

  useEffect(() => {
    setCurrentColor(userColorCode);
  }, [userColorCode]);

  const chosenColor = color => {
    setCurrentColor(color);
  };

  const saveColor = () => {
    return selectedColor(currentColor);
  };

  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={openColorPick}
      transparent
      animationType={'fade'}>
      <View style={[MyStyles.modal, {justifyContent: 'center'}]}>
        <View style={styles.modalBox}>
          {/* // @ Close Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => closePicker()}
            style={styles.closeButton}>
            <MaterialCommunityIcons
              name="close"
              size={moderateScale(23)}
              color={COLORS.black}
            />
          </TouchableOpacity>
          {/* // @ Color Picker */}
          <View style={styles.container}>
            <ColorPicker
              color={currentColor}
              onColorChange={color => chosenColor(color)}
              thumbSize={30}
              sliderSize={25}
              noSnap={true}
              row={false}
              useNativeLayout={true}
              swatchesLast={true}
              swatches={true}
              style={{width: 250, height: 250, alignSelf: 'center'}}
              discrete={false}
              wheelLodingIndicator={
                <ActivityIndicator size={40} color={COLORS.header} />
              }
              sliderLodingIndicator={
                <ActivityIndicator size={20} color={COLORS.button} />
              }
            />
          </View>
          {/* // @ Color Code */}
          <View style={[styles.flexD, styles.colorCodeCont]}>
            <View style={styles.selColorBox(currentColor)} />
            <Text style={styles.colorCode}>{currentColor}</Text>
          </View>
          {/* // @ Buttons */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => saveColor()}
            style={styles.button(buttonColor)}>
            <Text style={styles.btnTxt}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WheelColor;

const styles = StyleSheet.create({
  container: {
    minHeight: '40%',
  },
  modalBox: {
    backgroundColor: COLORS.white,
    padding: '2%',
    alignSelf: 'center',
    width: '85%',
    minHeight: '63%',
    borderRadius: moderateScale(12),
  },
  selColorBox: currentColor => ({
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(4),
    backgroundColor: currentColor,
    alignSelf: 'center',
    borderWidth: 1,
  }),
  flexD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorCodeCont: {
    width: '40%',
    alignSelf: 'center',
    marginTop: '7%',
  },
  colorCode: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
  },
  button: buttonColor => ({
    width: horizontalScale(100),
    height: horizontalScale(30),
    borderRadius: moderateScale(6),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: buttonColor || COLORS.button,
  }),
  btnTxt: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  closeButton: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '10%',
    alignSelf: 'flex-end',
  },
});
