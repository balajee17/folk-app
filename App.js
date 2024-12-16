import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
import {useEffect} from 'react';
import {StatusBarHeightProvider} from './src/components/StatusBarComponent';

const App = () => {
  useEffect(() => {}, []);

  return (
    <GestureHandlerRootView>
      <StatusBarHeightProvider>
        <StackNavigation />
      </StatusBarHeightProvider>
    </GestureHandlerRootView>
  );
};

export default App;
