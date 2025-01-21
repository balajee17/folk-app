import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../constants/ScreenNames';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Animation from '../screens/Animation';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Animation'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={screenNames.drawerNavigation}
          component={DrawerNavigation}
        />

        <Stack.Screen
          name={'Animation'}
          options={{gestureEnabled: false}}
          component={Animation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
