import React, {createContext, useContext, useEffect, useState} from 'react';
import {NativeModules, Platform, StatusBar, View} from 'react-native';
import {COLORS} from '../styles/MyStyles';
import {screenNames} from '../constants/ScreenNames';

const {StatusBarManager} = NativeModules;

const StatusBarHeightContext = createContext(0);

// # StatusBarHeightProvider: Centralized logic for status bar height
export const StatusBarHeightProvider = ({children}) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    const fetchStatusBarHeight = () => {
      if (Platform.OS === 'ios') {
        StatusBarManager.getHeight(({height}) => setStatusBarHeight(height));
      } else if (Platform.OS === 'android') {
        setStatusBarHeight(StatusBar.currentHeight || 0);
      }
    };

    fetchStatusBarHeight();
  }, []);

  return (
    <StatusBarHeightContext.Provider value={statusBarHeight}>
      {children}
    </StatusBarHeightContext.Provider>
  );
};

// # Custom hook for accessing the status bar height
export const useStatusBarHeight = () => useContext(StatusBarHeightContext);

// # StatusBarTransp: Component for rendering a transparent status bar
export const StatusBarTransp = ({screen}) => {
  const statusBarHeight = useStatusBarHeight();
  return (
    <>
      {Platform.OS === 'android' ? (
        <StatusBar
          backgroundColor={COLORS.transparent}
          barStyle={
            screen === screenNames.login ? 'dark-content' : 'light-content'
          }
          animated
          translucent
        />
      ) : (
        <View
          style={{
            backgroundColor: COLORS.transparent,
            height: statusBarHeight,
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export const CommonStatusBar = ({bgColor}) => {
  const statusBarHeight = useStatusBarHeight();

  return (
    <>
      {Platform.OS === 'android' ? (
        <StatusBar
          backgroundColor={bgColor || COLORS.header}
          barStyle={bgColor ? 'dark-content' : 'light-content'}
          animated
        />
      ) : (
        <View
          style={{
            backgroundColor: COLORS.header,
            height: statusBarHeight,
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};
