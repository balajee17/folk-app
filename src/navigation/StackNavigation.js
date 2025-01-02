import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../constants/ScreenNames';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Animation from '../screens/Animation';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={screenNames.home} component={Home} />

        {/* {/* <Stack.Screen
          name={screenNames.splash}
          options={{gestureEnabled: false}}
          component={Splash}
        /> */}

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
