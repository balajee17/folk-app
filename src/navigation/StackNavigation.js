import React from 'react';
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
import Events from '../screens/Events';
import Coupons from '../screens/Coupons';
import Notifications from '../screens/Notifications';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.drawerNavigation}
        screenOptions={{headerShown: false}}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
