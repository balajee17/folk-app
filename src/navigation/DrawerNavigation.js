import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import {screenNames} from '../constants/ScreenNames';
import {COLORS, moderateScale} from '../styles/MyStyles';
import SwitcherScreen from '../screens/SwitcherScreen';
import YFHForm from '../screens/YFHForm';
import Accommodation from '../screens/Accommodation';
import Contribution from '../screens/Contribution';
import FolkMerchant from '../screens/FolkMerchant';
import HabitsSadhana from '../screens/HabitsSadhana';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {
          borderTopRightRadius:
            Platform.OS === 'android' ? moderateScale(20) : 0,
          borderBottomRightRadius:
            Platform.OS === 'android' ? moderateScale(20) : 0,
          backgroundColor: COLORS.white,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={screenNames.switcherScreen}
        component={SwitcherScreen}
      />
      <Drawer.Screen name={screenNames.yfhForm} component={YFHForm} />
      <Drawer.Screen
        name={screenNames.accommodation}
        component={Accommodation}
      />
      <Drawer.Screen name={screenNames.folkMerchant} component={FolkMerchant} />
      <Drawer.Screen name={screenNames.contribution} component={Contribution} />
      <Drawer.Screen
        name={screenNames.habitsSadhana}
        component={HabitsSadhana}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
