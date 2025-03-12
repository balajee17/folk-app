import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyStyles, screenHeight, windowWidth} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {getImage} from '../utils/ImagePath';

const Accommodation = ({navigation}) => {
  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          toggleDrawer={() => navigation.openDrawer()}
          titleName={screenNames.accommodation}
        />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          <Image source={getImage.comingSoon} style={MyStyles.comingSoonImg} />
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Accommodation;

const styles = StyleSheet.create({});
