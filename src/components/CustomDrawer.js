import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appVersion} from '../../AppVersion.json';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
const CustomDrawer = ({navigation, route}) => {
  const menuItems = [
    {
      id: 'DB1',
      screenName: screenNames.home,
      whiteIcon: require('../assets/images/homeWhite.png'),
      blackIcon: require('../assets/images/homeBlack.png'),
    },
    {
      id: 'D2',
      screenName: screenNames.yfhForm,
      whiteIcon: require('../assets/images/formWhite.png'),
      blackIcon: require('../assets/images/formBlack.png'),
    },
    {
      id: 'D3',
      screenName: screenNames.accommodation,
      whiteIcon: require('../assets/images/accommodationWhite.png'),
      blackIcon: require('../assets/images/accommodationBlack.png'),
    },
    {
      id: 'D4',
      screenName: 'Contribution',
      whiteIcon: require('../assets/images/donateWhite.png'),
      blackIcon: require('../assets/images/donateBlack.png'),
    },
  ];

  const {selScreen, setSelScreen} = useAppContext();
  const {current} = selScreen;
  const {closeDrawer} = navigation;

  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const navigateScreen = (id, screenName) => {
    closeDrawer();
    if (id === 'DB1') {
      current !== 'DB1'
        ? (setSelScreen(prev => ({...prev, btTab: id, current: id})),
          navigateTo(screenNames.switcherScreen, route?.params))
        : null;
    } else {
      setSelScreen(prev => ({...prev, current: id})), navigateTo(screenName);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* // @ Profile Info */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigateTo(screenNames.profile);
          }}
          activeOpacity={0.6}
          style={styles.profImgCont}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.profImg}
          />
        </TouchableOpacity>
        <View style={styles.profileTextCont}>
          <Text style={styles.profName}>Naveen Alagarsamy</Text>
          <Text style={[styles.profName, styles.mailTxt]}>
            FOLK ID : 233q11241
          </Text>
        </View>
      </View>

      {/* // @ Menu Items */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index + 1}
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
              source={current === item?.id ? item?.whiteIcon : item?.blackIcon}
            />
          </View>
          <Text
            style={[
              styles.itemTxt,
              {
                color: current === item?.id ? COLORS.white : COLORS.gunsmoke,
              },
            ]}>
            {item?.screenName}
          </Text>
        </TouchableOpacity>
      ))}

      {/* // @ Logout Btn */}
      <View style={styles.logoutCont}>
        <TouchableOpacity style={styles.logoutBtn}>
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
  header: {
    backgroundColor: COLORS.header,
    padding: '5%',
    borderTopRightRadius: moderateScale(20),
    paddingTop: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profImgCont: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profImg: {
    width: horizontalScale(70),
    height: horizontalScale(70),
    resizeMode: 'cover',
    borderRadius: moderateScale(40),
  },
  profileTextCont: {marginLeft: '4%', width: '71%'},
  profName: {
    fontSize: SIZES.subTitle,
    fontFamily: FONTS.interMedium,
    color: COLORS.white,
  },
  mailTxt: {fontSize: SIZES.l, color: COLORS.ceramic},
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
    shadowColor: '#007AFF',
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
});
