import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  resHeight,
  resWidth,
  SIZES,
  verticalScale,
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
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

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
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mig9E0_kytqiyy-CXO9OAcxuXHMTpRuCLA&s',
    },
    {
      id: 4,
    },
  ];

  return (
    <>
      <StatusBarTransp />
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={styles.mainContainer}>
            {/* // @ Linear Gradient */}
            <LinearGradient
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              colors={[COLORS.mirage, COLORS.dolphin]}
              style={styles.gradient}>
              {/* // # Header */}
              <View style={[styles.header, {marginTop: insets?.top || 0}]}>
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
                top: '13%',
              }}>
              <View style={[styles.textHstryIcon, styles.paddingHor4]}>
                <Text
                  style={[
                    MyStyles.subTitleText,

                    {
                      color: COLORS.golden,
                    },
                  ]}>
                  Daily Darshan
                </Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <MaterialCommunityIcons
                    name="history"
                    size={moderateScale(25)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
              <CustomCarousel
                carouselItems={imageSource}
                autoScroll={true}
                dots={true}
              />
            </View>

            {/* // @ Daily Quotes - Carousel  */}
            <View
              style={[
                styles.textHstryIcon,
                styles.paddingHor4,
                {marginTop: verticalScale(120)},
              ]}>
              <Text style={[MyStyles.subTitleText]}>Daily Quotes</Text>
              <TouchableOpacity activeOpacity={0.6}>
                <MaterialCommunityIcons
                  name="history"
                  size={moderateScale(25)}
                  color={COLORS.gableGreen}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: COLORS.paleYellow},
  gradient: {
    paddingBottom: verticalScale(190),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  header: {
    padding: '2.5%',
    // marginVertical: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: {
    padding: '1.5%',
    borderWidth: moderateScale(1),
    height: horizontalScale(35),
    width: horizontalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
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
