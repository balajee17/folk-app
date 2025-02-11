import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyStyles, screenWidth} from '../styles/MyStyles';

const AttendedEvents = () => {
  return (
    <View
      style={[MyStyles.flex1, {backgroundColor: 'pink', width: screenWidth}]}>
      <Text>AttendedEvents</Text>
    </View>
  );
};

export default AttendedEvents;

const styles = StyleSheet.create({});
