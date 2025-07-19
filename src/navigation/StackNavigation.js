import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../constants/ScreenNames';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import DrawerNavigation from './DrawerNavigation';
import Quotes from '../screens/Quotes';
import DailyDarshan from '../screens/DailyDarshan';
import FolkUpdates from '../screens/FolkUpdates';
import FolkVideos from '../screens/FolkVideos';
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
import Splash from '../screens/Splash';
import EditProfile from '../screens/EditProfile';
import AddChallenge from '../screens/AddChallenge';
import CompletedChallenge from '../screens/CompletedChallenge';
import SadhanaCalendar from '../screens/SadhanaCalendar';
import SadhanaRegularize from '../screens/SadhanaRegularize';
import ChangeTheme from '../screens/ChangeTheme';
import {navigationRef} from '../components/RootNavigation';
import HabitsSadhana from '../screens/HabitsSadhana';
import Accommodation from '../screens/Accommodation';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const {globalState} = useAppContext();
  const {isConnected} = globalState;

  useEffect(() => {
    if (navigationRef.current) {
      if (!isConnected) {
        navigationRef.current.navigate(screenNames.noNetwork);
      }
    }
  }, [isConnected]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={screenNames.splash}
        screenOptions={{headerShown: false}}>
        {/* // @ Splash */}
        <Stack.Screen name={screenNames.splash} component={Splash} />
        {/* // @ Login */}
        <Stack.Screen name={screenNames.login} component={Login} />
        {/* // @ Drawer Component */}
        <Stack.Screen
          name={screenNames.drawerNavigation}
          component={DrawerNavigation}
        />

        {/* // @ Home Screen */}
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
        {/* <Stack.Screen
          name={screenNames.yfhForm}
          options={{gestureEnabled: false}}
          component={YFHForm}
        /> */}

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
        {/* // @ Edit Profile */}
        <Stack.Screen name={screenNames.editProfile} component={EditProfile} />

        {/* // @ Payment Details */}
        <Stack.Screen
          name={screenNames.paymentDetails}
          component={PaymentDetails}
        />
        {/* // @ Scanner */}
        <Stack.Screen
          options={{gestureEnabled: false}}
          name={screenNames.scanner}
          component={QrScanner}
        />
        {/* // @ Courses */}
        <Stack.Screen name={screenNames.courses} component={Courses} />

        {/* // @ Add Challenge */}
        <Stack.Screen
          name={screenNames.newChallenge}
          component={AddChallenge}
        />

        {/* // @ Completed Challenge */}
        <Stack.Screen
          name={screenNames.completedChallenge}
          component={CompletedChallenge}
        />

        {/* // @ Sadhana Calendar */}
        <Stack.Screen
          name={screenNames.habitsSadhana}
          component={HabitsSadhana}
        />

        {/* // @ Sadhana Calendar */}
        <Stack.Screen
          name={screenNames.sadhanaCalendar}
          component={SadhanaCalendar}
        />

        {/* // @ Accommodation */}
        <Stack.Screen
          name={screenNames.accommodation}
          component={Accommodation}
        />

        {/* // @ Sadhana Regularize */}
        <Stack.Screen
          name={screenNames.sadhanaRegularize}
          component={SadhanaRegularize}
        />

        {/* // @ Change Theme */}
        <Stack.Screen name={screenNames.changeTheme} component={ChangeTheme} />

        {/* // @ No Network */}
        <Stack.Screen name={screenNames.noNetwork} component={NoNetwork} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
