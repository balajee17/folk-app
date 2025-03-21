import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {MyStyles, screenHeight, windowWidth} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {getImage} from '../utils/ImagePath';
import AndroidBackHandler from '../components/BackHandler';

const Accommodation = props => {
  const {navigation} = props;
  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);
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
