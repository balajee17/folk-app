import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {screenNames} from '../constants/ScreenNames';
import {moderateScale} from '../styles/MyStyles';
import SwitcherScreen from '../screens/SwitcherScreen';

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
      <Drawer.Screen
        name={screenNames.switcherScreen}
        component={SwitcherScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
