import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../constants/ScreenNames';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Animation from '../screens/Animation';
import DrawerNavigation from './DrawerNavigation';
import Quotes from '../screens/Quotes';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.drawerNavigation}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={screenNames.drawerNavigation}
          component={DrawerNavigation}
        />

        <Stack.Screen
          name={'Quotes'}
          options={{gestureEnabled: false}}
          component={Quotes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
