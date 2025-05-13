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
import {useStatusBarHeight} from './StatusBarComponent';
import {useAppContext} from '../../App';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {toastThrottle} from './CommonFunctionalities';

const CustomHeader = ({
  toggleDrawer,
  titleName,
  goBack,
  rightIcnAction,
  martop,
}) => {
  const {setGlobalState, globalState} = useAppContext();
  const {mobileNumber, folkId, menuItems} = globalState;
  const statusBarHeight = useStatusBarHeight();
  const filterIcnScreens = '';
  // titleName === screenNames.quotes ||
  // titleName === screenNames.dailyDarshan ||
  // titleName === screenNames.updates ||
  // titleName === screenNames.folkVideos ||
  // titleName === screenNames.events;

  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  const plusIcnscreens = titleName === screenNames.coupons;

  const drawerScreens =
    titleName === screenNames.home ||
    titleName === screenNames.events ||
    titleName === screenNames.connectUs ||
    titleName === screenNames.courses ||
    titleName === screenNames.yfhForm ||
    titleName === screenNames.accommodation ||
    titleName === screenNames.folkMerchant ||
    titleName === screenNames.contribution ||
    titleName === screenNames.habitsSadhana;

  const bgColor =
    titleName === screenNames.eventDetails ||
    titleName === screenNames.profile ||
    titleName === screenNames.paymentDetails
      ? COLORS.transparent
      : COLORS.header;

  const noRightIcn =
    titleName === screenNames.eventDetails ||
    titleName === screenNames.connectUs;

  const folkTitle =
    titleName === screenNames.home ||
    titleName === screenNames.profile ||
    titleName === screenNames.connectUs ||
    titleName === screenNames.coupons ||
    titleName === screenNames.habitsSadhana;

  const removeTitle =
    titleName !== screenNames.eventDetails &&
    titleName !== screenNames.connectUs &&
    titleName !== screenNames.paymentDetails;

  const drawerControl = async () => {
    toggleDrawer();
    (!folkId || menuItems?.length === 0) && getMenuItems();
    console.log(
      '!folkId || menuItems?.length === 0',
      !folkId,
      menuItems?.length,
    );
  };

  const getMenuItems = async () => {
    try {
      await setGlobalState(prev => ({
        ...prev,
        menuItems: [],
        menuSpinner: true,
      }));
      const params = {mobile: mobileNumber};
      const response = await API.getMenuList(params);
      const {menu, successCode, message} = response?.data;
      if (successCode === 1) {
        await setGlobalState(prev => ({
          ...prev,
          menuItems: menu,
          menuSpinner: false,
        }));
      } else {
        await setGlobalState(prev => ({
          ...prev,
          menuItems: [],
          menuSpinner: false,
        }));
        toastMsg(message, 'warning');
      }
    } catch (err) {
      await setGlobalState(prev => ({
        ...prev,
        menuItems: [],
        menuSpinner: false,
      }));
      toastMsg('', 'error');
      console.log('Menu List Err', err);
    }
  };

  return (
    <View
      style={[
        styles.header(statusBarHeight, martop),
        {backgroundColor: bgColor},
      ]}>
      <TouchableOpacity // Left Icon
        onPress={() => {
          drawerScreens ? drawerControl() : goBack();
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
                ? COLORS.white
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
                filterIcnScreens
                  ? 'filter'
                  : plusIcnscreens
                  ? 'plus'
                  : titleName === screenNames.profile
                  ? 'palette'
                  : null
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
  header: (statusBarHeight, martop) => ({
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.header,
    zIndex: 99,
    // marginTop: martop ? statusBarHeight : 0,
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
