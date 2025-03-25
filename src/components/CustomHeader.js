import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  verticalScale,
} from '../styles/MyStyles';
import {getImage} from '../utils/ImagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenNames} from '../constants/ScreenNames';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {useStatusBarHeight} from './StatusBarComponent';

const CustomHeader = ({toggleDrawer, titleName, goBack, rightIcnAction}) => {
  const statusBarHeight = useStatusBarHeight();
  const filterIcnScreens =
    titleName === screenNames.quotes ||
    titleName === screenNames.dailyDarshan ||
    titleName === screenNames.updates ||
    titleName === screenNames.folkVideos ||
    titleName === screenNames.events;

  const plusIcnscreens = titleName === screenNames.coupons;

  const drawerScreens =
    titleName === screenNames.home ||
    titleName === screenNames.events ||
    titleName === screenNames.connectUs ||
    titleName === screenNames.courses ||
    titleName === screenNames.yfhForm ||
    titleName === screenNames.accommodation ||
    titleName === screenNames.folkMerchant ||
    titleName === screenNames.contribution;

  const bgColor =
    titleName === screenNames.eventDetails ||
    titleName === screenNames.profile ||
    titleName === screenNames.paymentDetails
      ? COLORS.transparent
      : COLORS.header;

  const noRightIcn =
    titleName === screenNames.eventDetails ||
    titleName === screenNames.profile ||
    titleName === screenNames.connectUs;

  const folkTitle =
    titleName === screenNames.home ||
    titleName === screenNames.profile ||
    titleName === screenNames.connectUs;

  const removeTitle =
    titleName !== screenNames.eventDetails &&
    titleName !== screenNames.connectUs &&
    titleName !== screenNames.paymentDetails;

  return (
    <View style={[styles.header(statusBarHeight), {backgroundColor: bgColor}]}>
      <TouchableOpacity // Left Icon
        onPress={() => {
          drawerScreens ? toggleDrawer() : goBack();
        }}
        activeOpacity={0.6}
        style={[
          styles.menuIcon(drawerScreens),
          {
            backgroundColor:
              titleName === screenNames.profile
                ? COLORS.backBg
                : titleName === screenNames.eventDetails
                ? COLORS.halfTransparent
                : titleName === screenNames.paymentDetails
                ? '#F1F1F1'
                : COLORS.transparent,
          },
        ]}>
        {drawerScreens ? (
          <Image
            style={styles.menuImage}
            source={getImage.menu}
            resizeMode="contain"
          />
        ) : (
          <FontAwesome
            name={'chevron-left'}
            size={bgColor ? moderateScale(15) : moderateScale(25)}
            color={
              titleName === screenNames.paymentDetails
                ? COLORS.black
                : COLORS.white
            }
          />
        )}
      </TouchableOpacity>
      {/* Title */}

      {folkTitle ? (
        <Image
          style={styles.folkImg}
          source={getImage.folk}
          resizeMode="contain"
        />
      ) : (
        <Text numberOfLines={1} style={[MyStyles.titleText]}>
          {removeTitle && titleName}
        </Text>
      )}
      {!noRightIcn ? (
        <TouchableOpacity // Right Icon
          onPress={() => {
            titleName === screenNames.home
              ? rightIcnAction(0)
              : rightIcnAction(1);
          }}
          activeOpacity={0.6}
          style={styles.menuIcon(titleName === screenNames.home)}>
          {titleName === screenNames.home ? (
            <Image
              style={styles.notifyImage}
              source={getImage.notification}
              resizeMode="contain"
            />
          ) : (
            <MaterialCommunityIcons
              name={
                filterIcnScreens ? 'filter' : plusIcnscreens ? 'plus' : null
              }
              size={moderateScale(25)}
              color={COLORS.white}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIcn} />
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: statusBarHeight => ({
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.header,
    zIndex: 99,
    // marginTop: statusBarHeight,
  }),
  menuIcon: screen => ({
    padding: moderateScale(6),
    borderWidth: screen ? moderateScale(1) : undefined,
    height: horizontalScale(35),
    width: horizontalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    borderColor: screen ? COLORS.white : COLORS.transparent,
  }),
  menuImage: {height: '80%', width: '80%'},
  notifyImage: {height: '90%', width: '90%'},
  folkImg: {height: '100%', width: '50%'},
  rightIcn: {
    height: horizontalScale(35),
    width: horizontalScale(35),
  },
});
