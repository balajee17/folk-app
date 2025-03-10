import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MyStyles, screenHeight, windowWidth} from '../styles/MyStyles';

const Courses = () => {
  return (
    <View style={MyStyles.contentCont}>
      <Image
        source={require('../assets/images/comingSoon.png')}
        style={MyStyles.comingSoonImg}
      />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({});
