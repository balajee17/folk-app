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

const CustomBottomTab = ({selIcon, setSelIcon}) => {
  const ICONS = [
    {id: 1, name: screenNames.home},
    {id: 2, name: screenNames.events},
    // {id: 3, name: screenNames.connectUs},
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
                item?.id === 1
                  ? selIcon === 1
                    ? 'home-variant'
                    : 'home-variant-outline'
                  : item?.id === 2
                  ? selIcon === 2
                    ? 'account-group'
                    : 'account-group-outline'
                  : null
              }
              size={moderateScale(25)}
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
    height: verticalScale(80),
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
  },
  tabButton: {
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '30%',
    padding: '2%',
    borderRadius: moderateScale(25),
  },
  iconTxt: {
    fontFamily: FONTS.interBold,
    fontSize: SIZES.l,
    color: COLORS.charcoal,
  },
});
