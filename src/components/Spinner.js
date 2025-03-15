import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {horizontalScale} from '../styles/MyStyles';

const Spinner = ({spinnerVisible}) => {
  return (
    <Modal visible={spinnerVisible} transparent statusBarTranslucent>
      <View style={styles.indicator}>
        {/* <ActivityIndicator animating size="large" />
         */}
        <FastImage
          style={styles.gif}
          source={require('../assets/images/coupon.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  gif: {
    width: horizontalScale(70),
    height: horizontalScale(70),
  },
});
