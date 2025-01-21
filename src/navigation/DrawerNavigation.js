import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {screenNames} from '../constants/ScreenNames';
import Home from '../screens/Home';
import {moderateScale} from '../styles/MyStyles';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerStyle: {
          borderTopRightRadius: moderateScale(20),
          borderBottomRightRadius: moderateScale(20),
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={screenNames.home} component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
