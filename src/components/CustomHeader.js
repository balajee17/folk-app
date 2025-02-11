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

const CustomHeader = ({toggleDrawer, titleName, goBack}) => {
  const filterIcnScreens =
    titleName === screenNames.quotes ||
    titleName === screenNames.dailyDarshan ||
    titleName === screenNames.updates ||
    titleName === screenNames.folkVideos ||
    titleName === screenNames.events;

  const drawerScreens =
    titleName === screenNames.home || titleName === screenNames.events;
  return (
    <View style={[styles.header]}>
      <TouchableOpacity
        onPress={() => {
          drawerScreens ? toggleDrawer() : goBack();
        }}
        activeOpacity={0.6} // Menu Drawer Icon
        style={styles.menuIcon(drawerScreens)}>
        {drawerScreens ? (
          <Image
            style={styles.menuImage}
            source={getImage.menu}
            resizeMode="contain"
          />
        ) : (
          <MaterialCommunityIcons
            name="arrow-left"
            size={moderateScale(25)}
            color={COLORS.white}
          />
        )}
      </TouchableOpacity>
      {/* Title */}
      <Text style={MyStyles.titleText}>{titleName}</Text>
      <TouchableOpacity
        activeOpacity={0.6} // Notification Icon
        style={styles.menuIcon(titleName)}>
        {titleName === screenNames.home ? (
          <Image
            style={styles.notifyImage}
            source={getImage.notification}
            resizeMode="contain"
          />
        ) : (
          <MaterialCommunityIcons
            name={filterIcnScreens ? 'filter' : null}
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
  menuIcon: screens => ({
    padding: screens ? moderateScale(6) : undefined,
    borderWidth: screens ? moderateScale(1) : undefined,
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
