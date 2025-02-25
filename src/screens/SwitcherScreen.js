import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomBottomTab from '../components/CustomBottomTab';
import Home from './Home';
import Events from './Events';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import Container from '../components/Container';
import {MyStyles} from '../styles/MyStyles';
import ConnectUs from './ConnectUs';
import {useToast} from 'react-native-toast-notifications';
import Courses from './Courses';
import {useAppContext} from '../../App';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const SwitcherScreen = ({navigation}) => {
  const {selScreen, setSelScreen} = useAppContext();

  const {current, previous} = selScreen;

  const [opnFltr, setOpnFltr] = useState(false);

  useFocusEffect(
    useCallback(() => {
      !!previous && setSelScreen({current: previous, previous: ''});
    }, [previous]),
  );

  // # TitleName - DB1 Home, B2 Events, B3 Connectus,B4 Courses
  const titleName =
    current === 'DB1'
      ? screenNames.home
      : current === 'B2'
      ? screenNames.events
      : current === 'B3'
      ? screenNames.connectUs
      : // : useToast().show('Transaction Successful!', {
        //     type: 'success',
        //     duration: 4000,
        //   });
        screenNames.courses;

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={titleName}
        rightIcnAction={value => {
          value === 0
            ? navigation.navigate(screenNames.notifications)
            : setOpnFltr(true);
        }}
        goBack={() => navigation.goBack()}
      />
      <SafeAreaView styles={MyStyles.flex1}>
        {/* // # Contents */}
        {current === 'DB1' ? (
          <Home />
        ) : current === 'B2' ? (
          <Events openFilter={opnFltr} closeFilter={() => setOpnFltr(false)} />
        ) : current === 'B3' ? (
          <ConnectUs />
        ) : (
          <Courses />
        )}
      </SafeAreaView>
      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={current}
        setSelIcon={value => setSelScreen({current: value, previous: ''})}
      />
    </Container>
  );
};

export default SwitcherScreen;

const styles = StyleSheet.create({});
