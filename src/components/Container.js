import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../styles/MyStyles';
import {CommonStatusBar} from './StatusBarComponent';
import {useAppContext} from '../../App';

const Container = ({children}) => {
  const {globalState} = useAppContext();
  const {headerColor} = globalState;
  return (
    <View style={styles.mainContainer}>
      <CommonStatusBar bgColor={headerColor} />

      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
