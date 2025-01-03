import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  verticalScale,
} from '../styles/MyStyles';
import {
  StatusBarTransp,
  useStatusBarHeight,
} from '../components/StatusBarComponent';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utils/GetImage';
import {screenNames} from '../constants/ScreenNames';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import ParallexCarousel from '../components/ParallexCarousel';

const Home = () => {
  const imageSource = [
    {
      id: 1,
      image: 'https://i.ytimg.com/vi/lWp58c3NOHU/hqdefault.jpg',
    },
    {
      id: 2,
      image:
        'https://i.ytimg.com/vi/WYPGdCz5ecI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCIekOyrKEWTgaOJosw_l5I_Prr1Q',
    },
    {
      id: 3,
      image: 'https://yometro.com/images/places/iskcon-temples.jpg',
    },
    {
      id: 4,
      image: 'https://i.ytimg.com/vi/LuE9riw-klA/maxresdefault.jpg',
    },
  ];

  return (
    <View>
      <StatusBarTransp />
      {/* // @ Gradient BackGround */}
      <View style={styles.gradientBg}>
        <LinearGradient
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={[COLORS.mirage, COLORS.dolphin]}
          style={styles.gradient}
        />
      </View>

      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <SafeAreaView style={styles.contentContainer}>
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
            {/* // @ Daily Darshana - Carousel  */}
            <View style={[styles.marTop15]}>
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
              <ParallexCarousel carouselItems={imageSource} />
            </View>

            {/* // @ Daily Quotes  */}
            <View style={styles.marTop15}>
              <View style={[styles.textHstryIcon, styles.paddingHor4]}>
                <Text style={[MyStyles.subTitleText]}>Daily Quotes</Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <MaterialCommunityIcons
                    name="history"
                    size={moderateScale(25)}
                    color={COLORS.gableGreen}
                  />
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={{uri: ''}}
                />
              </View>
            </View>
          </SafeAreaView>
        )}
      </SafeAreaInsetsContext.Consumer>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradientBg: {flex: 1, backgroundColor: COLORS.paleYellow},
  gradient: {
    height: verticalScale(305),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  contentContainer: {
    backgroundColor: COLORS.transparent,
    flex: 1,
    position: 'absolute',
  },
  header: {
    padding: '2.5%',
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
  marTop15: {marginTop: verticalScale(15)},
});
