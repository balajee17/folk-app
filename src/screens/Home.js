import {
  Image,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, MyStyles, resHeight, resWidth, SIZES} from '../styles/MyStyles';
import {
  StatusBarTransp,
  useStatusBarHeight,
} from '../components/StatusBarComponent';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utils/GetImage';
import {screenNames} from '../constants/ScreenNames';
import Carousel from 'react-native-reanimated-carousel';

const Home = () => {
  const statusBarHeight = useStatusBarHeight();
  useEffect(() => {
    console.log('UNIXSTAMP', Math.floor(new Date().getTime() / 1000) + 120);
    console.log(first);
  }, []);
  return (
    <>
      <StatusBarTransp />
      {/* // @ Linear Gradient */}
      <LinearGradient
        colors={[COLORS.charcoal, COLORS.dolphin, COLORS.mirage]}
        style={styles.gradient}>
        {/* // # Header */}
        <View style={styles.header(statusBarHeight)}>
          <TouchableOpacity
            activeOpacity={0.6} // Menu Drawer Icon
            style={styles.menuIcon}>
            <Image
              style={styles.menuImage}
              source={getImage.menu}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* Title */}
          <Text style={MyStyles.titleText}>{screenNames.home}</Text>
          <TouchableOpacity
            activeOpacity={0.6} // Notification Icon
            style={styles.menuIcon}>
            <Image
              style={styles.notifyImage}
              source={getImage.notification}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* // @ Carousel  */}
      <Carousel
        loop
        width={resWidth('100%')}
        height={resWidth('100%') / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradient: {
    height: resHeight('35%'),
    borderBottomLeftRadius: resWidth('8%'),
    borderBottomRightRadius: resWidth('8%'),
  },
  header: statusBarHeight => ({
    // backgroundColor: 'pink',
    padding: '2.5%',
    marginTop: statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  menuIcon: {
    padding: '1.5%',
    borderWidth: resWidth('0.2%'),
    height: resHeight('5%'),
    width: resWidth('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: resHeight('8%'),
    borderColor: COLORS.osloGrey,
  },
  menuImage: {height: '80%', width: '80%'},
  notifyImage: {height: '90%', width: '90%'},
});
