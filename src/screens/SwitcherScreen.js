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
  const {globalState, setGlobalState} = useAppContext();

  const {btTab, profileId, activeEventTab, isConnected} = globalState;
  console.log('isConnected_SS', isConnected);
  const [opnFltr, setOpnFltr] = useState(false);
  const [tab1Data, setTab1Data] = useState([
    {section: 1, title: '', updates: [{id: 1, link: ''}], forLoader: 'Y'},
    {section: 2, title: '', updates: [{id: 1, link: ''}]},
  ]);
  const [shimmer, setShimmer] = useState({
    home: true,
    upcoming: true,
    registered: true,
    connectUs: true,
  });
  const [eventTabIndex, setEventTabIndex] = useState(activeEventTab);
  const [eventList, setEventList] = useState({upcoming: [], registered: []});
  const [connectDetails, setConnectDetails] = useState({});

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  // # TitleName - DB1 Home, B2 Events, B3 Courses,B4 Connectus
  const titleName =
    btTab === 'DB1'
      ? screenNames.home
      : btTab === 'B2'
      ? screenNames.events
      : btTab === 'B3'
      ? screenNames.courses
      : btTab === 'B4'
      ? screenNames.connectUs
      : screenNames.home;

  useEffect(() => {
    if (btTab === 'DB1') {
      const checkLoaderData = tab1Data?.filter(item => item?.section == 1);
      (checkLoaderData?.[0]?.forLoader === 'Y' || tab1Data?.length === 0) &&
        getHomeScreenData();
    }

    if (
      btTab === 'B2' &&
      eventTabIndex === 0 &&
      activeEventTab !== 1 &&
      eventList?.upcoming?.length === 0
    ) {
      getUpcomingList();
    }

    if (
      btTab === 'B2' &&
      eventList?.registered?.length === 0 &&
      (activeEventTab === 1 || eventTabIndex === 1)
    ) {
      console.log(
        'AT',
        activeEventTab,
        'btTab',
        btTab,
        'current',
        globalState?.current,
      );
      getRegisteredList();
    }
    const checkConnectData = Object.keys(connectDetails || {})?.length === 0;
    if (btTab === 'B4' && checkConnectData) {
      getConnectDetails();
    }
  }, [btTab, eventTabIndex]);

  // # API Home Data
  const getHomeScreenData = async () => {
    try {
      !shimmer?.home && setShimmer(prev => ({...prev, home: true}));
      const response = await API.getHomeScreenData();

      console.log('Home_response', response?.data);
      const {data, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setTab1Data(data);
      } else {
        setTab1Data([]);
        toastMsg(message, 'info');
      }
      setShimmer(prev => ({...prev, home: false}));
    } catch (err) {
      setTab1Data([]);
      // toastMsg('', 'error');
      setShimmer(prev => ({...prev, home: false}));
      console.log('ERR-Home-screen', err);
    }
  };

  // # API Upcoming List
  const getUpcomingList = async () => {
    try {
      !shimmer?.upcoming && setShimmer(prev => ({...prev, upcoming: true}));

      const params = {profile_id: profileId, tab: 'upcoming'};
      const response = await API.getEventList(params);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setEventList(prev => ({...prev, upcoming: data?.Upcoming}));
      } else {
        setEventList(prev => ({...prev, upcoming: []}));
        toastMsg(message, 'info');
      }
      setShimmer(prev => ({...prev, upcoming: false}));
    } catch (err) {
      setEventList([]);
      setShimmer(prev => ({...prev, upcoming: false}));

      toastMsg('', 'error');
      console.log('ERR-Upcoming', err);
    }
  };

  // # API Registered List
  const getRegisteredList = async () => {
    try {
      !shimmer?.registered && setShimmer(prev => ({...prev, registered: true}));

      const params = {profile_id: profileId, tab: 'registered'};
      const response = await API.getEventList(params);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setEventList(prev => ({...prev, registered: data?.Registered}));
      } else {
        setEventList(prev => ({...prev, registered: []}));
        toastMsg(message, 'info');
      }
      setShimmer(prev => ({...prev, registered: false}));
    } catch (err) {
      setEventList([]);
      toastMsg('', 'error');
      setShimmer(prev => ({...prev, registered: false}));
      console.log('ERR-Registered', err);
    }
  };

  // # API  to get Connect Us Details
  const getConnectDetails = async () => {
    try {
      !shimmer?.connectUs && setShimmer(prev => ({...prev, connectUs: true}));

      const params = {profile_id: profileId};
      const response = await API.getConnectDetails(params);
      console.log('Connect_US_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setConnectDetails(data);
      } else {
        toastMsg(message, 'info');
      }
      setShimmer(prev => ({...prev, connectUs: false}));
    } catch (err) {
      console.log('ERR-Connect_US-screen', err);
      setShimmer(prev => ({...prev, connectUs: false}));
      toastMsg('', 'error');
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
          <ConnectUs apiData={connectDetails} shimmer={shimmer?.connectUs} />
        ) : (
          <Home />
        )}
      </SafeAreaView>
      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={btTab}
        setSelIcon={value => {
          setGlobalState(prev => ({...prev, btTab: value, current: value}));
        }}
      />
    </Container>
  );
};

export default SwitcherScreen;

const styles = StyleSheet.create({});
