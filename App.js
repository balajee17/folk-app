import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
import {useEffect} from 'react';
import {StatusBarHeightProvider} from './src/components/StatusBarComponent';
import {Platform, Text, View} from 'react-native';
import {appVersion} from './AppVersion.json';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';

const App = () => {
  // useEffect(() => {
  //   checkAppUpdates();
  // }, []);

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
        <StackNavigation />
      </StatusBarHeightProvider>
    </GestureHandlerRootView>
  );
};

export default App;
