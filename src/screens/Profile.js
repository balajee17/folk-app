import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileDetails from './ProfileDetails';
import AttendanceHistory from './AttendanceHistory';
import PaymentHistory from './PaymentHistory';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import AndroidBackHandler, {CustomPopup} from '../components/BackHandler';
import {
  CaptureImage,
  ChooseImage,
  ImageUploadModal,
} from '../components/CommonFunctionalities';
import Spinner from '../components/Spinner';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradientBg from '../components/LinearGradientBg';
import Container from '../components/Container';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import AnimatedCircularBorder from '../components/AnimatedCircularBorder';

const Profile = props => {
  const {globalState, setGlobalState} = useAppContext();

  const {profileId, userName, reloadProfile, tabIndicatorColor} = globalState;
  const [activeTab, setActiveTab] = useState(1);
  const {navigation} = props;
  const [shimmer, setShimmer] = useState({
    primary: false,
    profile: false,
    attendance: false,
    payment: false,
  });
  const [profileData, setProfileDetails] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const tabItems = [
    {id: 1, tabName: 'Profile', icon: 'person-outline'},
    {id: 2, tabName: 'Attendance', icon: 'calendar-outline'},
    {id: 3, tabName: 'Payments', icon: 'receipt-outline'},
  ];

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type,
    });
  };

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    !!profileId && getUserData(1);

    return AndroidBackHandler.removerHandler();
  }, []);

  useFocusEffect(
    useCallback(() => {
      reloadProfile === 'Y' && reloadScreen();
    }, [reloadProfile]),
  );

  const reloadScreen = async () => {
    await setGlobalState(prev => ({...prev, reloadProfile: 'N'}));
    activeTab !== 1 && setActiveTab(1);
    getUserData(1);
  };

  const checkProfileExist =
    typeof profileData === 'object' && Object.keys(profileData)?.length > 0;

  const checkAttendanceExist =
    Array.isArray(attendanceData) && attendanceData?.length > 0;

  const checkPaymentExist =
    Array.isArray(paymentData) && paymentData?.length > 0;

  const shimmerController = (selTab, type) => {
    type === true
      ? setShimmer(prev => ({
          ...prev,
          profile: selTab === 1,
          attendance: selTab === 2,
          payment: selTab === 3,
        }))
      : setShimmer({
          primary: false,
          profile: false,
          attendance: false,
          payment: false,
        });
  };

  const setData = (selTab, data) => {
    const DATA = data;
    if (selTab === 1) {
      setProfileDetails(DATA);
    }
    if (selTab === 2) {
      setAttendanceData(DATA);
    }
    if (selTab === 3) {
      setPaymentData(DATA);
    }
  };

  // # API to get user details
  const getUserData = async selTab => {
    try {
      !shimmer?.primary && shimmerController(selTab, true);

      const params = {
        profileId: profileId,
        tab: selTab === 1 ? 'Profile' : selTab === 2 ? 'Attendance' : 'Payment',
      };
      const response = await API.getUserDetails(params);
      console.log('response_profile', response?.data);
      const {data, successCode, message, deleteProfile} = response?.data;
      if (successCode === 1) {
        setData(selTab, data);
        setDeleteProfile(deleteProfile === 'Y' ? true : false);
      } else {
        setData(selTab, selTab === 1 ? {} : []);
        toastMsg(message, 'warning');
      }
      shimmerController('', false);
    } catch (err) {
      setData(selTab, selTab === 1 ? {} : []);
      shimmerController('', false);
      toastMsg('', 'error');
      console.log('ERR-User Details', err);
    }
  };

  // # Upload Type
  const uploadType = async type => {
    const result = type === 'C' ? await CaptureImage() : await ChooseImage();

    if (typeof result === 'object' && Object.keys(result).length > 0) {
      console.log('result IF');
      setImagePicker(false);

      changeProfilePhoto(result);
    } else {
      setImagePicker(false);
    }
  };

  // # Change Photo API
  const changeProfilePhoto = async imageData => {
    try {
      setLoader(true);
      const params = {
        profileId: profileId,
        profilePhoto: imageData?.base64,
      };
      const response = await API.sendEditProfileDetails(params);
      console.log('response_profile_photo', response?.data);
      const {profileDetails, successCode, message} = response?.data;

      if (successCode === 1) {
        toastMsg(message, 'success');
        setGlobalState(prev => ({
          ...prev,
          photo: profileDetails?.profilePhoto,
        }));
        const existingData = await AsyncStorage.getItem('userDetails');
        const parsedData = JSON.parse(existingData);

        const userUpdatedData = {
          ...parsedData,
          photo: profileDetails?.profilePhoto,
        };
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(userUpdatedData),
        );
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-Photo', err);
    }
  };

  const logout = async () => {
    try {
      setShowLogout(false);
      await setGlobalState(prev => ({
        ...prev,
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
        reloadSadhana: 'N',
        folkLevel: '',
        folkGuide: '',
        qrCodeLink: '',
      }));
      await AsyncStorage.clear();
      Platform.OS === 'android' &&
        (await changeNavigationBarColor(COLORS.header));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screenNames.login}],
        }),
      );
    } catch (e) {
      console.log('logout e', e);
    }
  };

  // # API to Delete Account
  const deleteUserAccount = async () => {
    try {
      setLoader(true);

      const params = {
        profileId: profileId,
      };
      const response = await API.deleteUserAccount(params);
      console.log('response_Del_Acc', response?.data);
      const {successCode, message} = response?.data;
      if (successCode === 1) {
        toastMsg(message, 'success');
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-User Details', err);
    }
  };

  return (
    <>
      <Container>
        <View style={MyStyles.contentCont}>
          <LinearGradientBg height={verticalScale(450)} />
          {/* // # Header */}
          <CustomHeader
            goBack={() => navigation.goBack()}
            titleName={screenNames.profile}
            logout={() => setShowLogout(true)}
            rightIcnAction={value => {
              if (value === 1) {
                navigation.navigate(screenNames.changeTheme);
              }
            }}
          />

          {/* // @ Logout Modal */}
          <CustomPopup
            visible={showLogout}
            onOkay={() => logout()}
            onCancel={() => setShowLogout(false)}
            content={{
              title: 'Log Out?',
              text: 'Are you sure you want to LogOut?',
              buttonName: 'Log Out',
            }}
          />

          <Spinner spinnerVisible={loader} />
          {/* // # User Image */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AnimatedCircularBorder size={120} color="#007AFF" />
            </View>
            <Pressable
              disabled={shimmer?.primary}
              onPress={() => setImagePicker(true)}
              style={styles.usrImgCont}>
              {shimmer?.primary ? (
                <ImageShimmer
                  width={horizontalScale(104)}
                  borderRadius={moderateScale(70)}
                  height={horizontalScale(104)}
                />
              ) : (
                <Image
                  source={{
                    uri: globalState?.photo,
                  }}
                  style={styles.usrImg}
                />
              )}
            </Pressable>
          </View>
          {/* // # User Name */}
          {shimmer?.primary ? (
            <TitleShimmer
              marginTop={'2%'}
              height={verticalScale(15)}
              width={'60%'}
              alignSelf={'center'}
            />
          ) : (
            <Text style={styles.usrName}>
              {profileData?.primaryDetails?.Name || userName}
            </Text>
          )}
          {/* // # User FOLK ID */}
          {shimmer?.primary ? (
            <TitleShimmer
              marginTop={'1%'}
              height={verticalScale(12)}
              width={'40%'}
              alignSelf={'center'}
            />
          ) : (
            <Text style={styles.folkIdTxt}>
              {profileData?.primaryDetails?.Folk_id}
            </Text>
          )}

          {/* // # Tab Bar */}
          {!!profileId && (
            <View style={styles.tabBarCont}>
              {tabItems.map((item, index) =>
                shimmer?.primary ? (
                  <ImageShimmer
                    width={horizontalScale(110)}
                    borderRadius={moderateScale(20)}
                    padding={'2.5%'}
                    height={verticalScale(45)}
                  />
                ) : (
                  <TouchableOpacity
                    key={item?.id}
                    onPress={() => {
                      setActiveTab(item?.id);

                      const checkCurrentSectionLoading =
                        shimmer[item?.id] === true;

                      const conditions = {
                        1: checkProfileExist,
                        2: checkAttendanceExist,
                        3: checkPaymentExist,
                      };
                      if (
                        !checkCurrentSectionLoading &&
                        !conditions[item?.id]
                      ) {
                        getUserData(item?.id);
                      }
                    }}
                    activeOpacity={0.6}
                    style={[
                      styles.tabButton,
                      {
                        width: item?.id === 2 ? '33%' : '30%',

                        backgroundColor:
                          item?.id === activeTab
                            ? tabIndicatorColor || COLORS.button
                            : COLORS.white,
                        borderRadius: moderateScale(20),
                      },
                    ]}>
                    <Ionicons
                      name={item?.icon}
                      size={moderateScale(20)}
                      color={
                        item?.id === activeTab ? COLORS.white : COLORS.textLabel
                      }
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.tabBtnTxt,
                        {
                          color:
                            item?.id === activeTab
                              ? COLORS.white
                              : COLORS.textLabel,
                        },
                      ]}>
                      {item?.tabName}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          )}

          {/* // @ Content */}
          {!!profileId && activeTab === 1 ? (
            <ProfileDetails
              shimmer={shimmer?.profile}
              profileDetails={profileData?.profileDetails}
              navigation={navigation}
              deleteAccount={deleteProfile}
              deleteAction={() => {
                deleteUserAccount();
              }}
            />
          ) : !!profileId && activeTab === 2 ? (
            <AttendanceHistory
              shimmer={shimmer?.attendance}
              attendanceHistory={attendanceData}
            />
          ) : !!profileId && activeTab === 3 ? (
            <PaymentHistory
              shimmer={shimmer?.payment}
              paymentHistory={paymentData}
            />
          ) : null}
        </View>
      </Container>
      {/* // @ Pick Image upload */}
      <ImageUploadModal
        visible={imagePicker}
        uploadType={uploadType}
        closeModal={() => setImagePicker(false)}
      />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    padding: moderateScale(15),
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenName: {
    width: '50%',
    textAlign: 'center',
  },
  menuIcon: {
    padding: moderateScale(6),
    height: horizontalScale(40),
    width: horizontalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.backBg,
    zIndex: 99,
  },

  usrImgCont: {
    borderWidth: moderateScale(5),
    borderColor: COLORS.white,
    width: horizontalScale(120),
    height: horizontalScale(120),
    borderRadius: moderateScale(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usrImg: {
    width: horizontalScale(104),
    height: horizontalScale(104),
    borderRadius: moderateScale(70),
  },
  usrName: {
    fontSize: SIZES.xxxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    marginTop: '2%',
    textAlign: 'center',
  },
  folkIdTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.inptBg,
    width: '90%',
    marginTop: '1%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  tabBarCont: {
    marginVertical: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2.5%',
    justifyContent: 'center',
  },
  tabBtnTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    alignSelf: 'center',
    marginLeft: '6%',
  },
});
