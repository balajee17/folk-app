import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {API} from '../services/API';
import {useNavigation} from '@react-navigation/native';

const SwitcherScreen = ({navigation, route}) => {
  const {selScreen, setSelScreen} = useAppContext();

  const {btTab} = selScreen;
  const {loadScreen = '', activeTab = ''} = route?.params || {};

  const [opnFltr, setOpnFltr] = useState(false);
  const [tab1Data, setTab1Data] = useState([
    {section: 1, title: '', updates: [{id: 1, link: ''}], forLoader: 'Y'},
    {section: 2, title: '', updates: [{id: 1, link: ''}]},
  ]);
  const [shimmer, setShimmer] = useState({
    home: true,
    upcoming: true,
    registered: true,
  });
  const [eventTabIndex, setEventTabIndex] = useState(0);
  const [eventList, setEventList] = useState({upcoming: [], registered: []});

  // # TitleName - DB1 Home, B2 Events, B3 Connectus,B4 Courses
  const titleName =
    btTab === 'DB1'
      ? screenNames.home
      : btTab === 'B2'
      ? screenNames.events
      : btTab === 'B3'
      ? screenNames.courses
      : // : useToast().show('Transaction Successful!', {
      //     type: 'success',
      //     duration: 4000,
      //   });
      btTab === 'B4'
      ? screenNames.connectUs
      : screenNames.home;

  useEffect(() => {
    if (loadScreen === 'B2' && eventList?.registered.length === 0) {
      setEventTabIndex(activeTab);
      setSelScreen({btTab: loadScreen, current: loadScreen});
      getRegisteredList();
      return true;
    }
    if (btTab === 'DB1') {
      const checkLoaderData = tab1Data?.filter(item => item?.section == 1);
      (checkLoaderData?.[0]?.forLoader === 'Y' || tab1Data.length === 0) &&
        getHomeScreenData();
    }

    btTab === 'B2' &&
      eventTabIndex === 0 &&
      eventList?.upcoming.length === 0 &&
      getUpcomingList();

    btTab === 'B2' &&
      eventTabIndex === 1 &&
      eventList?.registered.length === 0 &&
      getRegisteredList();
  }, [btTab, eventTabIndex]);

  // # API Home Data
  const getHomeScreenData = async () => {
    try {
      const response = await API.getHomeScreenData();

      console.log('Home_response', response?.data);
      const {data, SuccessCode} = response?.data;
      if (SuccessCode === 1) {
        setTab1Data(data);
      } else {
        setTab1Data([]);
      }
      setShimmer(prev => ({...prev, home: false}));
    } catch (err) {
      setTab1Data([]);
      console.log('ERR-Home-screen', err);
    }
  };

  // # API Upcoming List
  const getUpcomingList = async () => {
    try {
      const params = {profile_id: 1, tab: 'upcoming'};
      const response = await API.getEventList(params);
      const {data, successCode} = response?.data;
      if (successCode === 1) {
        setEventList(prev => ({...prev, upcoming: data?.Upcoming}));
      } else {
        setEventList(prev => ({...prev, upcoming: []}));
      }
      setShimmer(prev => ({...prev, upcoming: false}));
    } catch (err) {
      setEventList([]);
      console.log('ERR-Upcoming', err);
    }
  };

  // # API Registered List
  const getRegisteredList = async () => {
    try {
      const params = {profile_id: 1, tab: 'registered'};
      const response = await API.getEventList(params);
      const {data, successCode} = response?.data;
      if (successCode === 1) {
        setEventList(prev => ({...prev, registered: data?.Registered}));
      } else {
        setEventList(prev => ({...prev, registered: []}));
      }
      setShimmer(prev => ({...prev, registered: false}));
    } catch (err) {
      setEventList([]);
      console.log('ERR-Registered', err);
    }
  };

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
        {btTab === 'DB1' ? (
          <Home shimmer={shimmer?.home} apiData={tab1Data} />
        ) : btTab === 'B2' ? (
          <Events
            openFilter={opnFltr}
            closeFilter={() => setOpnFltr(false)}
            index={eventTabIndex}
            eventTabChange={index => setEventTabIndex(index)}
            shimmer={shimmer}
            eventList={eventList}
            navigation={navigation}
          />
        ) : btTab === 'B3' ? (
          <Courses />
        ) : btTab === 'B4' ? (
          <ConnectUs />
        ) : (
          <Home />
        )}
      </SafeAreaView>
      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={btTab}
        setSelIcon={value => {
          setSelScreen({btTab: value, current: value});
        }}
      />
    </Container>
  );
};

export default SwitcherScreen;

const styles = StyleSheet.create({});
