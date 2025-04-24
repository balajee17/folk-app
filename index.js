/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {backgroundNotificationHandler} from './src/components/FCM';

backgroundNotificationHandler();

AppRegistry.registerComponent(appName, () => App);
