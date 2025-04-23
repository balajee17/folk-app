import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appVersion} from '../../AppVersion.json';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import {getImage} from '../utils/ImagePath';
import {useStatusBarHeight} from './StatusBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {ImageShimmer, TitleShimmer} from './Shimmer';
const CustomDrawer = ({navigation, route}) => {
  const statusBarHeight = useStatusBarHeight();
  const {globalState, setGlobalState} = useAppContext();
  const {current, folkId, userName, photo, menuItems, menuSpinner} =
    globalState;
  const {closeDrawer} = navigation;

  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const navigateScreen = (id, screenName) => {
    closeDrawer();
    if (id === 'DB1') {
      current !== 'DB1'
        ? (setGlobalState(prev => ({...prev, btTab: id, current: id})),
          navigateTo(screenNames.switcherScreen, route?.params))
        : null;
    } else {
      setGlobalState(prev => ({...prev, current: id})),
        navigateTo(screenName, {titleName: screenName});
    }
  };

  const logout = async () => {
    await setGlobalState({
      current: 'DB1',
      btTab: 'DB1',
      profileId: '',
      activeEventTab: 0,
      isConnected: true,
      folkId: '',
      userName: '',
      mobileNumber: '',
      photo: '',
      menuItems: [],
      menuSpinner: true,
    });
    await AsyncStorage.clear();
    navigation.replace(screenNames.login);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* // @ Profile Info */}

      <View style={styles.header(statusBarHeight)}>
        {/* // # FOLK Logo */}
        <Image
          style={styles.folkLogo}
          source={getImage.folk}
          resizeMode="contain"
        />
        <View style={styles.profInfoCont}>
          {/* // # Profile, Name, FOLK id */}
          <TouchableOpacity
            onPress={() => {
              navigateTo(screenNames.profile);
            }}
            activeOpacity={0.8}
            style={styles.profImgCont}>
            <Image
              source={{
                uri: photo,
              }}
              style={styles.profImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigateTo(screenNames.profile);
            }}
            activeOpacity={0.8}
            style={[styles.profileTextCont]}>
            <Text style={styles.profName}>{userName}</Text>
            {!!folkId && (
              <Text style={[styles.profName, styles.mailTxt]}>
                FOLK ID : {folkId}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* // @ Menu Items */}
      {menuItems?.length > 0 &&
        menuItems?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItemBtn,
              {
                backgroundColor:
                  current === item?.id ? COLORS.windowsBlue : COLORS.white,
              },
            ]}
            onPress={() => {
              navigateScreen(item?.id, item?.screenName);
            }}
            activeOpacity={0.6}>
            <View style={styles.iconCont}>
              <Image
                style={styles.menuImg}
                source={
                  current === item?.id ? item?.whiteIcon : item?.blackIcon
                }
              />
            </View>
            <Text
              style={[
                styles.itemTxt,
                {
                  color: current === item?.id ? COLORS.white : COLORS.gunsmoke,
                },
              ]}>
              {item?.title}
            </Text>
          </TouchableOpacity>
        ))}

      {menuSpinner &&
        Array(3)
          .fill(3)
          .map((_, index) => (
            <View key={index} style={styles.shimmerCont}>
              <ImageShimmer
                width={horizontalScale(35)}
                borderRadius={moderateScale(20)}
                height={horizontalScale(35)}
              />
              <TitleShimmer
                width={horizontalScale(200)}
                borderRadius={moderateScale(20)}
                height={horizontalScale(25)}
                marginTop={0}
                marginLeft={'8%'}
              />
            </View>
          ))}

      {/* // @ Logout Btn */}
      <View style={styles.logoutCont}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => logout()}
          style={styles.logoutBtn}>
          <MaterialCommunityIcons
            name="logout"
            size={moderateScale(25)}
            color={COLORS.white}
          />
          <Text style={styles.logTxt}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.appVersion}>App Version : {appVersion.version}</Text>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  folkLogo: {
    width: horizontalScale(60),
    height: horizontalScale(60),
    alignSelf: 'center',
  },
  header: statusBarHeight => ({
    backgroundColor: COLORS.header,
    padding: '5%',
    borderTopRightRadius: moderateScale(20),
    // marginTop: statusBarHeight,
  }),
  profInfoCont: {flexDirection: 'row', alignItems: 'center', marginTop: '4%'},
  profImgCont: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profImg: {
    width: horizontalScale(70),
    height: horizontalScale(70),
    resizeMode: 'cover',
    borderRadius: moderateScale(50),
  },
  profileTextCont: {marginLeft: '4%', width: '71%'},
  profName: {
    fontSize: SIZES.subTitle,
    fontFamily: FONTS.ysabeauInfantBold,
    color: COLORS.white,
    width: '100%',
  },
  mailTxt: {
    fontSize: SIZES.l,
    color: COLORS.ceramic,
    fontFamily: FONTS.ysabeauInfantBold,
    width: '100%',
  },
  menuItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    paddingHorizontal: '5%',
    marginTop: '4%',
    marginHorizontal: '5%',
    borderRadius: moderateScale(15),
  },
  itemIcn: {
    width: '10%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  itemTxt: {
    marginLeft: '4%',
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.gunsmoke,
    width: '80%',
  },
  iconCont: {
    width: horizontalScale(25),
    height: verticalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoutCont: {
    position: 'absolute',
    bottom: '5%',
    backgroundColor: COLORS.whiteSmoke,
    alignSelf: 'center',
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(200),
    borderRadius: moderateScale(28),
  },
  logoutBtn: {
    width: '85%',
    backgroundColor: COLORS.windowsBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '5%',
    borderRadius: moderateScale(14),
    borderRadius: 10,
    shadowColor: COLORS.infoPB,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  appVersion: {
    position: 'absolute',
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.gunsmoke,
    bottom: '1%',
    alignSelf: 'center',
    width: '90%',
    textAlign: 'right',
  },
  shimmerCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    paddingHorizontal: '5%',
    marginTop: '4%',
  },
});
