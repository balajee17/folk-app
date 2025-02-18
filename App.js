import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
import {useEffect} from 'react';
import {StatusBarHeightProvider} from './src/components/StatusBarComponent';
import {Text, View} from 'react-native';
import {appVersion} from './AppVersion.json';

const App = () => {
  useEffect(() => {}, []);

  const checkAppUpdates = async () => {
    try {
      currentVersion = appVersion.versionCode;
      const updateResponse = await inAppUpdate;
    } catch (err) {
      console.log('ERROR_CHECK_UPDATE', err);
    }
  };

  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    //   <StatusBarHeightProvider>
    //     <StackNavigation />
    //   </StatusBarHeightProvider>
    // </GestureHandlerRootView>
    <View>
      <Text>APP UPDATE</Text>
    </View>
  );
};

export default App;
