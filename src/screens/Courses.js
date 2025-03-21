import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {MyStyles, screenHeight, windowWidth} from '../styles/MyStyles';
import {getImage} from '../utils/ImagePath';

const Courses = () => {
  return (
    <View style={MyStyles.contentCont}>
      <Image source={getImage.comingSoon} style={MyStyles.comingSoonImg} />
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({});
