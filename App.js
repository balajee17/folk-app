import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
import {createContext, useContext, useEffect, useState} from 'react';
import {StatusBarHeightProvider} from './src/components/StatusBarComponent';
import {Linking, Platform, Text, View} from 'react-native';
import {appVersion} from './AppVersion.json';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import ToastMessage from './src/components/ToastMessage';
import NetInfo from '@react-native-community/netinfo';
import {
  checkNotificationPermission,
  foreGroundNotificationHandler,
  getFcmId,
  getInitialNotification,
  getOnNotification,
  IOSIntialNotify,
} from './src/components/FCM';
import {COLORS} from './src/styles/MyStyles';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Store} from './src/redux/Store';
import {setRedirectScreen} from './src/redux/slices/RedirectScreen';
import {screenNames} from './src/constants/ScreenNames';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const App = () => {
  const [globalState, setGlobalState] = useState({
    current: 'DB1',
    btTab: 'DB1',
    profileId: '',
    activeEventTab: 0,
    isConnected: true,
    folkId: '',
    folkLevel: '',
    userName: '',
    mobileNumber: '',
    photo: '',
    reloadEventList: 'N',
    reloadCoupon: 'N',
    reloadProfile: 'N',
    menuItems: [],
    menuSpinner: true,
    reloadSadhana: 'N',
    redirectScreen: '',
    // Dynamic color themes
    headerColor: COLORS.header,
    bottomTabColor: COLORS.bottomTab,
    buttonColor: COLORS.button,
    cardColor: COLORS.card,
    eventCardColor: COLORS.eventCard,
    announcementCardColor: COLORS.announcementCard,
    tabIndicatorColor: COLORS.tabIndicator,
  });

  useEffect(() => {
    // # Listen for real-time network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Internet Connected:', state.isConnected);
      setGlobalState(prev => ({...prev, isConnected: state.isConnected}));
    });
    // checkAppUpdates();

    changeNavigationBarColor(COLORS.header);

    // @ Push Notifications
    notificationCheck();
    // getOnNotification();

    // Linking.addEventListener('url', handleLink);

    // @ Listen Url when app is opened through link ( Deep linking )
    Linking.getInitialURL().then(async url => {
      if (url) {
        try {
          console.log('Initial launch URL:', url);

          const parsedUrl = new URL(url);
          const screen = parsedUrl.hostname || screenNames.drawerNavigation; // retrieve screenName
          await Store.dispatch(
            setRedirectScreen({
              screenName: screen,
              btTab: globalState?.btTab ? globalState?.btTab : 'DB1',
              activeEvtTab: globalState?.activeEventTab
                ? Number(globalState?.activeEventTab)
                : 0,
            }),
          );
        } catch (error) {
          console.warn('Invalid URL format:', error);
        }
      }
    });

    return () => {
      unsubscribe();
      // Linking.removeEventListener('url', handleLink);
    };
  }, []);

  const notificationCheck = async () => {
    await getFcmId();
    await checkNotificationPermission();
    await foreGroundNotificationHandler(setGlobalState);
    await getInitialNotification();
    Platform.OS === 'ios' && (await getOnNotification(setGlobalState));
    Platform.OS === 'ios' && (await IOSIntialNotify());
  };

  const handleLink = ({url}) => {
    console.log('Opened with URL:', url);
    Linking.getInitialURL(url => {
      console.log('OPENED_URL', url);
    });
  };

  // const inAppUpdates = new SpInAppUpdates(true);
  // const majorUpdate = true;

  // const checkAppUpdates = async () => {
  //   try {
  //     const currentVersion = appVersion.versionCode;
  //     const updateResponse = await inAppUpdates.checkNeedsUpdate({
  //       curVersion: currentVersion,
  //     });

  //     if (updateResponse.shouldUpdate) {
  //       console.log('Update available, starting update.');

  //       const updateOptions = {
  //         updateType: majorUpdate
  //           ? IAUUpdateKind.IMMEDIATE
  //           : IAUUpdateKind.FLEXIBLE,
  //       };

  //       if (majorUpdate) {
  //         await inAppUpdates.startUpdate(updateOptions);
  //       } else {
  //         inAppUpdates.addStatusUpdateListener(downloadStatus => {
  //           console.log('Download status', downloadStatus);

  //           if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
  //             console.log('Downloaded');
  //             inAppUpdates.installUpdate();

  //             // Remove the status update listener after installation
  //             inAppUpdates.removeStatusUpdateListener(finalStatus => {
  //               console.log('Final status', finalStatus);
  //             });
  //           }
  //         });
  //       }
  //     } else {
  //       console.log('No update required, starting update anyway.');
  //       return false;
  //     }
  //   } catch (err) {
  //     console.log('ERROR_CHECK_UPDATE', err);
  //   }
  // };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBarHeightProvider>
        <ToastProvider
          placement="bottom"
          duration={3500}
          animationType="custom"
          animationDuration={500}
          renderToast={toast => <ToastMessage toast={toast} />}
          swipeEnabled={true}>
          <AppContext.Provider value={{globalState, setGlobalState}}>
            <StackNavigation />
          </AppContext.Provider>
        </ToastProvider>
      </StatusBarHeightProvider>
    </GestureHandlerRootView>
  );
};

export default App;
