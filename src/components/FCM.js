import messaging, {firebase} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {screenNames} from '../constants/ScreenNames';
import {RootNavigation} from './RootNavigation';
import {Store} from '../redux/Store';
import {setRedirectScreen} from '../redux/slices/redirectScreen';

const CHANNEL_ID = 'folk-channel-id';
const CHANNEL_NAME = 'FOLK';

export const getFcmId = async () => {
  const asyncStorageFcmId = await AsyncStorage.getItem('@FcmId');
  console.log('🚀 ~ asyncStorageFcmId:', asyncStorageFcmId);

  Platform.OS === 'android' &&
    (await firebase.messaging().registerDeviceForRemoteMessages());

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
  const unsubscribe = firebase
    .messaging()
    .setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      displayNotification(remoteMessage);
    });
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS) {
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.PRESS) {
      const notificationData = notification.data;
      const redirectScreen = notification.data?.screenName;
      console.log('PRESSED', redirectScreen);

      if (
        redirectScreen === screenNames.drawerNavigation ||
        redirectScreen === screenNames.sadhanaCalendar
      ) {
        const btTab = notificationData?.btTab;
        const activeEventTab = notificationData?.activeEventTab;

        const storedVal = await AsyncStorage.getItem('userDetails');
        const parsedData = JSON.parse(storedVal);

        if (parsedData?.profileId) {
          await setGlobalState(prev => ({
            ...prev,
            redirectScreen,
            btTab: btTab ? btTab : 'DB1',
            activeEvtTab: activeEventTab ? Number(activeEventTab) : 0,
          })),
            RootNavigation(redirectScreen);
        } else {
          RootNavigation(screenNames.login);
        }
      }
      // Remove the notification
      // await notifee.cancelNotification(notification.id);
    }
  });
  return unsubscribe;
};

export const foreGroundNotificationHandler = setGlobalState => {
  const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
    console.log('Message handled in the foreground!', remoteMessage);

    displayNotification(remoteMessage);
  });
  notifee.onForegroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS) {
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
    if (type === EventType.PRESS) {
      const notificationData = notification.data;
      const redirectScreen = notification.data?.screenName;

      if (
        redirectScreen === screenNames.sadhanaCalendar ||
        redirectScreen === screenNames.drawerNavigation
      ) {
        const btTab = notificationData?.btTab;
        const activeEventTab = notificationData?.activeEventTab;

        const storedVal = await AsyncStorage.getItem('userDetails');
        const parsedData = JSON.parse(storedVal);

        if (parsedData?.profileId) {
          await setGlobalState(prev => ({
            ...prev,
            btTab: btTab ? btTab : prev?.btTab,
            currentTab: btTab ? btTab : prev?.currentTab,
            activeEventTab: activeEventTab
              ? Number(activeEventTab)
              : prev?.activeEventTab,
          }));
          RootNavigation(redirectScreen);
        } else {
          RootNavigation(screenNames.login);
        }
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
      // sound: 'hare_krishna',
    });

    const imageUrl = remoteMessage?.data?.image;

    // Check if image is a valid URL
    const isValidImage =
      imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http');

    const androidConfig = {
      channelId,
      ongoing: true,
      pressAction: {
        id: 'default',
        vibration: true,
        vibrationPattern: [300, 500],
        launchActivity: 'default',
      },
    };

    if (isValidImage) {
      androidConfig.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: imageUrl,
      };
    }

    const iosConfig = {};

    if (isValidImage) {
      iosConfig.ios = {
        attachments: [
          {
            url: imageUrl,
          },
        ],
      };
    }

    await notifee.displayNotification({
      title: remoteMessage?.data?.title,
      body: remoteMessage?.data?.body,
      data: remoteMessage?.data,
      android: androidConfig,
      ios: iosConfig,
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
    console.log('initialNotification', initialNotification);

    const notificationData = initialNotification?.notification?.data;
    const redirectScreen = notificationData?.screenName;

    if (
      redirectScreen === screenNames.sadhanaCalendar ||
      redirectScreen === screenNames.drawerNavigation
    ) {
      // Dispatch the action to redirect the user

      const btTab = notificationData?.btTab;
      const activeEventTab = notificationData?.activeEventTab;

      await Store.dispatch(
        setRedirectScreen({
          screenName: redirectScreen,
          btTab: btTab ? btTab : 'DB1',
          activeEvtTab: activeEventTab ? Number(activeEventTab) : 0,
        }),
      );
    }
  } catch (error) {
    console.error('Error getting initial notification:', error);
  }
};

export const getOnNotification = async setGlobalState => {
  try {
    await messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      const notificationData = remoteMessage?.data;
      const storedVal = await AsyncStorage.getItem('userDetails');
      const parsedData = JSON.parse(storedVal);

      if (parsedData?.profileId) {
        await setGlobalState(prev => ({
          ...prev,
          btTab: notificationData?.btTab
            ? notificationData?.btTab
            : prev?.btTab,
          activeEvtTab: notificationData?.activeEventTab
            ? Number(notificationData?.activeEventTab)
            : prev?.activeEventTab,
        }));
        RootNavigation(notificationData?.screenName);
      }
    });
  } catch (error) {
    console.error('Error getting initial notification:', error);
  }
};

export const IOSIntialNotify = async () => {
  await messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage,
      );
      const notificationData = remoteMessage?.data;
      const storedVal = await AsyncStorage.getItem('userDetails');
      const parsedData = JSON.parse(storedVal);

      if (parsedData?.profileId) {
        await Store.dispatch(
          setRedirectScreen({
            screenName: notificationData?.screenName,
            btTab: notificationData?.btTab ? notificationData?.btTab : 'DB1',
            activeEvtTab: notificationData?.activeEventTab
              ? Number(notificationData?.activeEventTab)
              : 0,
          }),
        );
      }
    });
};
