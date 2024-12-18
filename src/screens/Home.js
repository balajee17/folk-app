import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  MyStyles,
  resHeight,
  resWidth,
  SIZES,
  windowHeight,
} from '../styles/MyStyles';
import {
  StatusBarTransp,
  useStatusBarHeight,
} from '../components/StatusBarComponent';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utils/GetImage';
import {screenNames} from '../constants/ScreenNames';
import CustomCarousel from '../components/CustomCarousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const statusBarHeight = useStatusBarHeight();

  const imageSource = [
    {
      id: 1,
    },
    {
      id: 1,
      image:
        'https://www.iskconbangalore.org/wp-content/uploads/2016/01/g01-night-view-of-iskcon-bangalore.jpg',
    },
    {
      id: 2,
      image:
        'https://www.iskconbangalore.org/wp-content/uploads/2020/03/iskcon-whitefield-860x600.jpg',
    },
    {
      id: 3,
      image:
        'https://www.iskconbangalore.org/wp-content/uploads/2015/11/t01-aerial-view-of-the-temple.jpg',
    },
    {
      id: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThQvTnYAk_S603ht3mi6Roo0scz4gAFTbbKQ&s',
    },
    {
      id: 1,
    },
  ];

  return (
    <>
      <StatusBarTransp />
      <View style={styles.mainContainer}>
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
        {/* // @ Daily Darshana - Carousel  */}
        <View
          style={{
            position: 'absolute',
            top: 90,
          }}>
          <View style={[styles.textHstryIcon, styles.paddingHor4]}>
            <Text
              style={[
                MyStyles.subTitleText,

                {
                  color: COLORS.golden,
                },
              ]}>
              Daily Darshana
            </Text>
            <TouchableOpacity activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="history"
                size={SIZES.xxl}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <CustomCarousel carouselItems={imageSource} autoScroll={true} />
        </View>

        {/* // @ Daily Quotes - Carousel  */}
        <View
          style={[
            styles.textHstryIcon,
            styles.paddingHor4,
            {marginTop: resHeight('20%')},
          ]}>
          <Text style={[MyStyles.subTitleText]}>Daily Quotes</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <MaterialCommunityIcons
              name="history"
              size={SIZES.xxl}
              color={COLORS.gableGreen}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: COLORS.paleYellow},
  gradient: {
    height: resHeight('35%'),
    borderBottomLeftRadius: resWidth('8%'),
    borderBottomRightRadius: resWidth('8%'),
  },
  header: statusBarHeight => ({
    padding: '2.5%',
    marginTop: statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  menuIcon: {
    padding: '1.5%',
    borderWidth: resWidth('0.2%'),
    height: resWidth('10%'),
    width: resWidth('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: resHeight('8%'),
    borderColor: COLORS.osloGrey,
  },
  menuImage: {height: '80%', width: '80%'},
  notifyImage: {height: '90%', width: '90%'},
  textHstryIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paddingHor4: {paddingHorizontal: '4%'},
});
