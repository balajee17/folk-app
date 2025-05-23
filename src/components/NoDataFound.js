import {StyleSheet, View} from 'react-native';
import React from 'react';
import {horizontalScale, screenHeight} from '../styles/MyStyles';
import FastImage from 'react-native-fast-image';
import {getImage} from '../utils/ImagePath';
import {screenNames} from '../constants/ScreenNames';

const NoDataFound = ({screen}) => {
  return (
    <View style={styles.container(screen)}>
      <FastImage
        style={styles.gif}
        source={getImage.noData}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: screen => ({
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:
      screen === screenNames.events ? screenHeight * 0.55 : screenHeight * 0.7,
  }),
  gif: {
    width: horizontalScale(250),
    height: horizontalScale(250),
  },
});
