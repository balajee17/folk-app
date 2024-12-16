import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../constants/ScreenNames';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer
    // ref={navigationRef}
    >
      <Stack.Navigator
        initialRouteName={screenNames.home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={screenNames.home} component={Home} />

        {/* <Stack.Screen
          name={screenNames.splash}
          options={{gestureEnabled: false}}
          component={Splash}
        />

        <Stack.Screen
          name={screenNames.login}
          options={{gestureEnabled: false}}
          component={Login}
        /> */}
        {/* <Stack.Screen name={screenNames.verifyOTP} component={VerifyOTP} />
        <Stack.Screen
          options={{gestureEnabled: false}}
          name={screenNames.register}
          component={Register}
        /> */}
        {/* <Stack.Screen name="TermsConditions" component={TermsConditions} /> */}

        {/* Screens In Home Details  */}
        {/* <Stack.Screen
          name="BottomTabNavigation"
          options={{gestureEnabled: false}}
          component={BottomTabNavigation}
        /> */}
        {/* <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Accommodation" component={Accommodation} />
        <Stack.Screen name="HostelHistory" component={HostelHistory} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EventsTab" component={EventsTab} />
        <Stack.Screen name="YFHForm" component={YFHForm} />
        <Stack.Screen name="YFHAttend" component={YFHAttend} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="FolkForm" component={FolkForm} />
        <Stack.Screen name="Coupons" component={Coupons} />
        <Stack.Screen name="CouponsHistory" component={CouponsHistory} /> */}

        {/* Webview Screen for payment gateway */}
        {/* <Stack.Screen
          name="WebViewPayment"
          options={{gestureEnabled: false}}
          component={WebViewPayment}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
