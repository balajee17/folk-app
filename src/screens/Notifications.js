import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import AndroidBackHandler from '../components/BackHandler';
import {useAppContext} from '../../App';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import Spinner from '../components/Spinner';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import NotificationCard from '../components/NotificationCard';

const Notifications = props => {
  const {navigation} = props;

  const {globalState} = useAppContext();
  const {profileId} = globalState;
  const [loader, setLoader] = useState(true);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getNotificationList();
    return AndroidBackHandler.removerHandler();
  }, []);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const getNotificationList = async () => {
    try {
      const params = {profileId: profileId};
      const response = await API.getNotificationList(params);

      console.log('Notification List response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setNotificationList(data?.list);
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR Notification List screen', err);
    }
  };

  const removeNotification = useCallback(item => {
    console.log('remove_item', item);
    setLoader(true);
    setTimeout(() => setLoader(false), 3000);
  }, []);

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.notifications}
        />
        <Spinner spinnerVisible={loader} />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          {/* // @ Notification Card */}
          <FlatList
            data={notificationList}
            contentContainerStyle={{paddingBottom: '5%'}}
            renderItem={({item, index}) => {
              return (
                <NotificationCard
                  item={item}
                  index={index}
                  removeNotification={removeNotification}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
