import messaging, {firebase} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setFCMID, setRedirectToScreen} from '../Redux/Actions/Action';
import {Alert, Platform} from 'react-native';
import {screenNames} from '../constants/ScreenNames';

const CHANNEL_ID = 'folk-channel-id';
const CHANNEL_NAME = 'FOLK';

export const getFcmId = async () => {
  const asyncStorageFcmId = await AsyncStorage.getItem('@FcmId');
  console.log('🚀 ~ asyncStorageFcmId:', asyncStorageFcmId);

  Platform.OS === 'android' &&
    (await firebase.messaging().registerDeviceForRemoteMessages());

  // asyncStorageFcmId && (await Store.dispatch(setFCMID(asyncStorageFcmId)));
  !asyncStorageFcmId &&
    messaging()
      .getToken()
      .then(token => {
        console.log('🚀 ~ FCM ID:', token);
        storeFcmId(token);
      })
      .catch(e => console.log('🚀 ~ getToken ~ e:', e));
};

const storeFcmId = async value => {
  try {
    await AsyncStorage.setItem('@FcmId', value);
    // Store.dispatch(setFCMID(value));
  } catch (e) {
    console.log('🚀 ~ storeFcmId ~ e:', e);
  }
};

export const checkNotificationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
    } else {
      const settings = await notifee.getNotificationSettings();

      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permissions has been authorized');
      } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
        console.log('Notification permissions has been denied');
        notifee.openNotificationSettings();
      }
    }
  } catch (error) {
    console.log('🚀 ~ checkPermision ~ error:', error);
  }
};

export const backgroundNotificationHandler = async () => {
  console.log('Message  background!');

  const unsubscribe = firebase
    .messaging()
    .setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      displayNotification(remoteMessage);
    });
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    // Check if the user pressed the "Mark as read" action
    // if (type === EventType.ACTION_PRESS) {
    //   // Remove the notification
    //   await notifee.cancelNotification(notification.id);
    // }

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.PRESS) {
      const redirectScreen =
        notification.data?.redirectScreenName?.data?.click_action;

      if (
        redirectScreen === ScreenNames.sadhana ||
        redirectScreen === ScreenNames.regularize
      ) {
        // await Store.dispatch(setRedirectToScreen(redirectScreen));
        // RootNavigation.navigate(redirectScreen);
      }
      // Remove the notification
      // await notifee.cancelNotification(notification.id);
    }
  });
  return unsubscribe;
};

export const foreGroundNotificationHandler = () => {
  const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
    console.log('Message handled in the foreground!', remoteMessage);

    displayNotification(remoteMessage);
  });
  notifee.onForegroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    console.log('pressAction_FR', pressAction);
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS) {
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
    if (type === EventType.PRESS) {
      const redirectScreen =
        notification.data?.redirectScreenName?.data?.click_action;
      if (
        redirectScreen === screenNames.sadhana ||
        redirectScreen === screenNames.regularize
      ) {
        // await Store.dispatch(setRedirectToScreen(redirectScreen));
        // RootNavigation.navigate(redirectScreen);
      }
    }
  });

  return unsubscribe;
};

const displayNotification = async remoteMessage => {
  try {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'sound',
      name: CHANNEL_NAME,
      importance: AndroidImportance.HIGH,
      sound: 'hare_krishna',
    });

    await notifee.displayNotification({
      title: remoteMessage?.data?.title,
      body: remoteMessage?.data?.body,
      data: {redirectScreenName: remoteMessage},

      android: {
        channelId,
        ongoing: true,
        sound: 'hare_krishna',

        // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        //  # pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
          vibration: true,
          vibrationPattern: [300, 500],
          // mainComponent: remoteMessage.data.click_action,
          // launchActivity: 'com.yourapp.MainActivity',
        },

        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            remoteMessage?.data?.image ||
            require('../assets/images/folkIcn.png'),
        },
      },

      ios: {
        attachments: [
          {
            url:
              remoteMessage?.data?.image ||
              require('../assets/images/folkIcn.png'),
          },
        ],
        sound: 'hare_krishna.mp3',
      },

      importance: AndroidImportance.HIGH,
    });
  } catch (error) {
    console.log('🚀 ~ displayNotification ~ error:', error);
  }
};

// Check if the app was launched from a notification
export const getInitialNotification = async () => {
  try {
    const initialNotification = await notifee.getInitialNotification();

    // Access the correct data path for redirecting
    const redirectScreen =
      initialNotification?.notification?.data?.redirectScreenName?.data
        ?.click_action;
    console.log('initialNotification', initialNotification);

    if (
      redirectScreen === screenNames.sadhana ||
      redirectScreen === screenNames.regularize
    ) {
      // Dispatch the action to redirect the user
      // Store.dispatch(setRedirectToScreen(redirectScreen));
    }
  } catch (error) {
    console.error('Error getting initial notification:', error);
  }
};

export const getOnNotification = async () => {
  try {
    const onNotification = await notifee.getTriggerNotifications();

    console.log('ON NOTIFICATION TAPPED', onNotification);
  } catch (error) {
    console.error('Error getting initial notification:', error);
  }
};
