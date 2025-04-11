import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, moderateScale, verticalScale} from '../styles/MyStyles';

const LinearGradientBg = () => {
  return (
    <LinearGradient
      colors={[
        'rgba(65, 110, 189, 1)',
        'rgba(65, 110, 189, 0.9)',
        'rgba(65, 110, 189, 0.6)',
        'rgba(65, 110, 189, 0.1)',
        '#0000',
      ]}
      style={styles.gradient}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
    />
  );
};

export default LinearGradientBg;

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: verticalScale(350),
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
