import React, {useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../constants/ScreenNames';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import DrawerNavigation from './DrawerNavigation';
import Quotes from '../screens/Quotes';
import DailyDarshan from '../screens/DailyDarshan';
import FolkUpdates from '../screens/FolkUpdates';
import FolkVideos from '../screens/FolkVideos';
import YFHForm from '../screens/YFHForm';
import EventDetails from '../screens/EventDetails';
import Coupons from '../screens/Coupons';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import PaymentDetails from '../screens/PaymentDetails';
import QrScanner from '../components/QrScanner';
import Courses from '../screens/Courses';
import NoNetwork from '../components/NoNetwork';
import {useAppContext} from '../../App';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const {globalState} = useAppContext();
  const {isConnected} = globalState;

  const navigationRef = useRef();

  useEffect(() => {
    if (navigationRef.current) {
      if (isConnected) {
        navigationRef.current.navigate(screenNames.profile);
      } else {
        navigationRef.current.navigate(screenNames.noNetwork);
      }
    }
  }, [isConnected]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* // @ Login */}
        <Stack.Screen name={screenNames.login} component={Login} />

        {/* // @ Drawer Component */}
        <Stack.Screen
          name={screenNames.drawerNavigation}
          component={DrawerNavigation}
        />

        <Stack.Screen name={screenNames.home} component={Home} />

        {/*  // @ History Component's */}
        <Stack.Screen
          name={screenNames.quotes}
          options={{gestureEnabled: false}}
          component={Quotes}
        />
        <Stack.Screen
          name={screenNames.dailyDarshan}
          options={{gestureEnabled: false}}
          component={DailyDarshan}
        />
        <Stack.Screen
          name={screenNames.updates}
          options={{gestureEnabled: false}}
          component={FolkUpdates}
        />
        <Stack.Screen
          name={screenNames.folkVideos}
          options={{gestureEnabled: false}}
          component={FolkVideos}
        />

        {/* // @ Drawer Screens */}
        <Stack.Screen
          name={screenNames.yfhForm}
          options={{gestureEnabled: false}}
          component={YFHForm}
        />

        {/* // @ Event Details */}
        <Stack.Screen
          name={screenNames.eventDetails}
          component={EventDetails}
        />

        {/* // @ Coupon */}
        <Stack.Screen name={screenNames.coupons} component={Coupons} />

        {/* // @ Notifications */}
        <Stack.Screen
          name={screenNames.notifications}
          component={Notifications}
        />

        {/* // @ Profile */}
        <Stack.Screen name={screenNames.profile} component={Profile} />

        {/* // @ Payment Details */}
        <Stack.Screen
          name={screenNames.paymentDetails}
          component={PaymentDetails}
        />
        {/* // @ Scanner */}
        <Stack.Screen name={screenNames.scanner} component={QrScanner} />
        {/* // @ Courses */}
        <Stack.Screen name={screenNames.courses} component={Courses} />
        {/* // @ No Network */}
        <Stack.Screen name={screenNames.noNetwork} component={NoNetwork} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
