import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
import {createContext, useContext, useEffect, useState} from 'react';
import {StatusBarHeightProvider} from './src/components/StatusBarComponent';
import {Platform, Text, View} from 'react-native';
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
import NoNetwork from './src/components/NoNetwork';
import {
  backgroundNotificationHandler,
  checkNotificationPermission,
  foreGroundNotificationHandler,
  getFcmId,
  getInitialNotification,
  getOnNotification,
} from './src/components/FCM';
import {COLORS} from './src/styles/MyStyles';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Store} from './src/redux/Store';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const App = () => {
  const storeData = Store.getState();

  console.log('storeData12345', storeData);
  const [globalState, setGlobalState] = useState({
    current: storeData?.redirectScreen?.btTab || 'DB1',
    btTab: storeData?.redirectScreen?.btTab || 'DB1',
    profileId: '',
    activeEventTab: storeData?.redirectScreen?.activeEvtTab || 0,
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
    redirectScreen: storeData?.redirectScreen?.redirectScreen || '',
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
    getFcmId();
    checkNotificationPermission();
    foreGroundNotificationHandler(setGlobalState);
    getInitialNotification(setGlobalState);
    // getOnNotification();

    return () => unsubscribe();
  }, []);

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
