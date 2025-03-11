import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, verticalScale} from '../styles/MyStyles';

const LinearGradientBg = () => {
  return (
    <LinearGradient
      colors={[
        'rgba(65, 110, 189, 1)',
        'rgba(65, 110, 189, 0.9)',
        'rgba(65, 110, 189, 0.6)',
        'rgba(65, 110, 189, 0.1)',
        COLORS.white,
      ]}
      style={styles.halfBg}
    />
  );
};

export default LinearGradientBg;

const styles = StyleSheet.create({
  halfBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(300),
  },
});
