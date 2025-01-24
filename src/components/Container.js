import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../styles/MyStyles';
import {CommonStatusBar} from './StatusBarComponent';

const Container = ({children}) => {
  return (
    <View style={styles.mainContainer}>
      <CommonStatusBar />

      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.charcoal,
  },
});
