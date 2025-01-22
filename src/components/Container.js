import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../styles/MyStyles';

const Container = ({children}) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={COLORS.charcoal}
        barStyle="light-content"
        animated
      />
      <View style={styles.paleYellowBg}>{children}</View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: COLORS.charcoal},
  paleYellowBg: {
    flex: 1,
    backgroundColor: COLORS.paleYellow,
  },
});
