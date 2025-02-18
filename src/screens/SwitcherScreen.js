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
import ConnectUs from './ConnectUs';

const SwitcherScreen = ({navigation}) => {
  const [selIcon, setSelIcon] = useState(1);
  const [opnFltr, setOpnFltr] = useState(false);

  // # TitleName - 1 Home, 2 Events, 3 Connectus
  const titleName =
    selIcon === 1
      ? screenNames.home
      : selIcon === 2
      ? screenNames.events
      : screenNames.connectUs;

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={titleName}
        rightIcnAction={value => setOpnFltr(value)}
        goBack={() => navigation.goBack()}
      />
      <SafeAreaView styles={MyStyles.flex1}>
        {/* // # Contents */}
        {selIcon === 1 ? (
          <Home />
        ) : selIcon === 2 ? (
          <Events openFilter={opnFltr} closeFilter={() => setOpnFltr(false)} />
        ) : (
          <ConnectUs />
        )}
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
