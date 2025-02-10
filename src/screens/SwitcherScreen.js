import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomBottomTab from '../components/CustomBottomTab';
import Home from './Home';
import Events from './Events';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import Container from '../components/Container';
import {
  COLORS,
  moderateScale,
  MyStyles,
  screenHeight,
  verticalScale,
} from '../styles/MyStyles';

const SwitcherScreen = ({navigation}) => {
  const [selIcon, setSelIcon] = useState(1);

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={selIcon === 1 ? screenNames.home : screenNames.events}
      />
      <SafeAreaView styles={MyStyles.flex1}>
        {/* // # Contents */}
        {selIcon === 1 ? <Home /> : <Events />}
      </SafeAreaView>
      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={selIcon}
        setSelIcon={value => setSelIcon(value)}
      />
    </Container>
  );
};

export default SwitcherScreen;

const styles = StyleSheet.create({});
