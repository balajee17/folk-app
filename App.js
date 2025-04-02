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

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const App = () => {
  const [globalState, setGlobalState] = useState({
    current: 'DB1',
    btTab: 'DB1',
    profileId: 1,
    activeEventTab: 0,
    isConnected: true,
    folkId: '',
    userName: '',
    mobileNumber: '',
    photo: '',
    reloadEventList: 'N',
    reloadCoupon: 'N',
    reloadProfile:'N'
  });

  useEffect(() => {
    // # Listen for real-time network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Internet Connected:', state.isConnected);
      setGlobalState(prev => ({...prev, isConnected: state.isConnected}));
    });
    // checkAppUpdates();
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
