import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  FONTS,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';

const CustomBottomTab = ({selIcon, setSelIcon}) => {
  const ICONS = [
    {id: 'DB1', name: screenNames.home},
    {id: 'B2', name: screenNames.events},
    {id: 'B4', name: screenNames.courses},
    {id: 'B3', name: screenNames.connectUs},
  ];

  return (
    <View style={styles.tabContainer}>
      {ICONS?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => setSelIcon(item?.id)}
            activeOpacity={0.6}
            style={[
              styles.tabButton,
              {
                backgroundColor:
                  item?.id === selIcon ? COLORS.white : COLORS.charcoal,
              },
            ]}>
            <MaterialCommunityIcons
              name={
                item?.id === 'DB1'
                  ? selIcon === 'DB1'
                    ? 'home-variant'
                    : 'home-variant-outline'
                  : item?.id === 'B2'
                  ? selIcon === 'B2'
                    ? 'calendar-star'
                    : 'calendar-blank'
                  : item?.id === 'B4'
                  ? selIcon === 'B4'
                    ? 'book-education'
                    : 'book-education-outline'
                  : item?.id === 'B3'
                  ? selIcon === 'B3'
                    ? 'account'
                    : 'account-outline'
                  : null
              }
              size={moderateScale(22)}
              color={item?.id === selIcon ? COLORS.charcoal : COLORS.white}
            />
            {item?.id === selIcon && (
              <Text style={styles.iconTxt}>{item?.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: COLORS.charcoal,
    width: '100%',
    height: verticalScale(60),
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '2%',
  },
  tabButton: {
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    padding: '2%',
    borderRadius: moderateScale(25),
  },
  iconTxt: {
    fontFamily: FONTS.interBold,
    fontSize: SIZES.m,
    color: COLORS.charcoal,
  },
});
