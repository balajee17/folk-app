import {
  Image,
  Platform,
  ScrollView,
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
import {getImage} from '../utils/ImagePath';
import {CommonStatusBar} from './StatusBarComponent';
import {ImageShimmer, TitleShimmer} from './Shimmer';
import {ShowQrCode} from './CommonFunctionalities';

const CustomDrawer = ({navigation, route}) => {
  const {globalState, setGlobalState} = useAppContext();
  const {
    current,
    folkId,
    folkLevel,
    userName,
    photo,
    menuItems,
    menuSpinner,
    headerColor,
    tabIndicatorColor,
    qrCodeLink,
  } = globalState;
  const {closeDrawer} = navigation;

  const [openQrCode, setOpenQrCode] = useState(false);

  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const navigateScreen = (id, screenName, title) => {
    closeDrawer();
    if (id === 'DB1') {
      current !== 'DB1'
        ? (setGlobalState(prev => ({...prev, btTab: id, current: id})),
          navigateTo(screenNames.switcherScreen, route?.params))
        : null;
    } else {
      setGlobalState(prev => ({...prev, current: id})),
        navigateTo(screenName, {titleName: title, id});
    }
  };
  return (
    <>
      <CommonStatusBar bgColor={headerColor} />
      <>
        {/* // @ Profile Info */}
        <View style={styles.header(headerColor)}>
          {/* // # FOLK Logo */}
          <Image
            style={styles.folkLogo}
            source={getImage.folk}
            resizeMode="contain"
          />
          <View
            style={[
              styles.profInfoCont,
              {justifyContent: !!qrCodeLink ? 'space-between' : 'flex-start'},
            ]}>
            {/* // # Profile, Name, FOLK id, qrCode */}
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
              style={[
                styles.profileTextCont,
                {
                  marginLeft: !!qrCodeLink ? 0 : '4%',
                },
              ]}>
              <Text style={styles.profName}>{userName}</Text>
              {!!folkId && (
                <Text style={[styles.profName, styles.mailTxt]}>
                  FOLK ID : {folkId}
                </Text>
              )}
              {!!folkLevel && (
                <Text style={[styles.profName, styles.mailTxt]}>
                  FOLK LEVEL : {folkLevel}
                </Text>
              )}
            </TouchableOpacity>

            {!!qrCodeLink && (
              <TouchableOpacity
                onPress={() => setOpenQrCode(true)}
                activeOpacity={0.8}
                style={styles.qrCircle}>
                <MaterialCommunityIcons
                  name="qrcode"
                  size={20}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* // @ Menu Items */}
        <View style={{height: verticalScale(470)}}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: '20%',
            }}
            showsVerticalScrollIndicator={false}>
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
            {menuItems?.length > 0 &&
              menuItems?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItemBtn,
                    {
                      marginTop: index === 0 ? '8%' : '4%',
                      backgroundColor:
                        current === item?.id
                          ? tabIndicatorColor || COLORS.button
                          : COLORS.white,
                    },
                  ]}
                  onPress={() => {
                    navigateScreen(item?.id, item?.screenName, item?.title);
                  }}
                  activeOpacity={0.6}>
                  <View style={styles.iconCont}>
                    <Image
                      style={styles.menuImg}
                      source={{
                        uri:
                          current === item?.id
                            ? item?.whiteIcon
                            : item?.blackIcon,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.itemTxt,
                      {
                        color:
                          current === item?.id ? COLORS.white : COLORS.gunsmoke,
                      },
                    ]}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        {/* // @ QR Code Modal */}
        <ShowQrCode
          visible={openQrCode}
          closeModal={() => setOpenQrCode(false)}
          imageUrl={qrCodeLink}
        />

        <Text style={styles.appVersion}>
          App Version : {appVersion.version}
        </Text>
      </>
    </>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  folkLogo: {
    width: horizontalScale(60),
    height: horizontalScale(60),
    alignSelf: 'center',
  },
  header: color => ({
    backgroundColor: color || COLORS.header,
    padding: '5%',
    borderTopRightRadius: Platform.OS === 'android' ? moderateScale(20) : 0,
  }),
  profInfoCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
    justifyContent: 'space-between',
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
    borderRadius: moderateScale(50),
  },
  profileTextCont: {width: '60%'},
  profName: {
    fontSize: SIZES.subTitle,
    fontFamily: FONTS.ysabeauInfantBold,
    color: COLORS.white,
    width: '100%',
  },
  mailTxt: {
    fontSize: SIZES.m,
    color: COLORS.inptBg,
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
    borderRadius: moderateScale(12),
    width: '80%',
  },
  itemTxt: {
    marginLeft: '7%',
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.btIcon,
    width: '80%',
  },
  iconCont: {
    width: horizontalScale(20),
    height: verticalScale(20),
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
    bottom: '7%',
    backgroundColor: COLORS.whiteSmoke,
    alignSelf: 'center',
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(200),
    borderRadius: moderateScale(28),
  },
  logoutBtn: color => ({
    width: '85%',
    backgroundColor: color || COLORS.button,
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
  }),
  logTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  appVersion: {
    position: 'absolute',
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.btIcon,
    bottom: '2%',
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
  qrCircle: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.whiteGlassy,
  },
});
