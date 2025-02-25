import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
} from '../styles/MyStyles';
import {getImage} from '../utils/ImagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenNames} from '../constants/ScreenNames';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

const CustomHeader = ({toggleDrawer, titleName, goBack, rightIcnAction}) => {
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
    titleName === screenNames.contribution;
  return (
    <View style={[styles.header]}>
      <TouchableOpacity // Left Icon
        onPress={() => {
          drawerScreens ? toggleDrawer() : goBack();
        }}
        activeOpacity={0.6}
        style={styles.menuIcon(drawerScreens)}>
        {drawerScreens ? (
          <Image
            style={styles.menuImage}
            source={getImage.menu}
            resizeMode="contain"
          />
        ) : (
          <FontAwesome
            name="arrow-left-long"
            size={moderateScale(25)}
            color={COLORS.white}
          />
        )}
      </TouchableOpacity>
      {/* Title */}
      <Text style={MyStyles.titleText}>{titleName}</Text>
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
            name={filterIcnScreens ? 'filter' : plusIcnscreens ? 'plus' : null}
            size={moderateScale(25)}
            color={COLORS.white}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    padding: moderateScale(10),
    paddingVertical: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.charcoal,
  },
  menuIcon: screen => ({
    padding: screen ? moderateScale(6) : undefined,
    borderWidth: screen ? moderateScale(1) : undefined,
    height: horizontalScale(35),
    width: horizontalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    borderColor: COLORS.osloGrey,
  }),
  menuImage: {height: '80%', width: '80%'},
  notifyImage: {height: '90%', width: '90%'},
});
