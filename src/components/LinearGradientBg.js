import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, moderateScale, verticalScale} from '../styles/MyStyles';
import {useAppContext} from '../../App';
import {getGradientColors} from './CommonFunctionalities';

const LinearGradientBg = ({height, points}) => {
  const {globalState} = useAppContext();
  const getRGBColor = getGradientColors(globalState?.headerColor, points);
  return (
    <LinearGradient
      colors={getRGBColor}
      style={styles.gradient(height)}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
    />
  );
};

export default LinearGradientBg;

const styles = StyleSheet.create({
  gradient: height => ({
    width: '100%',
    height: height || verticalScale(350),
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }),
});
