import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ProfileDetails from './ProfileDetails';
import AttendanceHistory from './AttendanceHistory';
import PaymentHistory from './PaymentHistory';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import AndroidBackHandler from '../components/BackHandler';

const Profile = props => {
  const {globalState, setGlobalState} = useAppContext();

  const {profileId} = globalState;
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

  const tabItems = [
    {id: 1, tabName: 'Profile', icon: 'person-outline'},
    {id: 2, tabName: 'Attendance', icon: 'calendar-outline'},
    {id: 3, tabName: 'Payment', icon: 'receipt-outline'},
  ];

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type,
    });
  };

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getUserData(1);

    return AndroidBackHandler.removerHandler();
  }, []);

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
      // console.log('response_profile', response?.data?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setData(selTab, data);
      } else {
        setData(selTab, selTab === 1 ? {} : []);
        toastMsg(message, 'warning');
      }
      shimmerController('', false);
    } catch (err) {
      setData(selTab, selTab === 1 ? {} : []);
      shimmerController('', false);
      toastMsg('', 'error');
      console.log('ERR-Upcoming', err);
    }
  };

  return (
    <View style={MyStyles.contentCont}>
      <LinearGradient
        colors={[COLORS.charcoal, COLORS.dolphin, COLORS.dolphin]}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.profile}
        />
        {/* // # User Image */}
        <View style={styles.usrImgCont}>
          {shimmer?.primary ? (
            <ImageShimmer
              width={horizontalScale(104)}
              borderRadius={moderateScale(70)}
              height={horizontalScale(104)}
            />
          ) : (
            <Image
              source={{
                uri: profileData?.primaryDetails?.Profile_image,
              }}
              style={styles.usrImg}
            />
          )}
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
            {profileData?.primaryDetails?.Name}
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

                  const checkCurrentSectionLoading = shimmer[item?.id] === true;

                  const conditions = {
                    1: checkProfileExist,
                    2: checkAttendanceExist,
                    3: checkPaymentExist,
                  };
                  if (!checkCurrentSectionLoading && !conditions[item?.id]) {
                    getUserData(item?.id);
                  }
                }}
                activeOpacity={0.6}
                style={[
                  styles.tabButton,
                  {width: item?.id === 2 ? '33%' : '30%'},
                  item?.id === activeTab
                    ? {
                        backgroundColor: COLORS.atlantis,
                        borderRadius: moderateScale(20),
                      }
                    : {},
                ]}>
                <Ionicons
                  name={item?.icon}
                  size={moderateScale(20)}
                  color={COLORS.white}
                />
                <Text numberOfLines={1} style={styles.tabBtnTxt}>
                  {item?.tabName}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </LinearGradient>

      {/* // @ Content */}
      {activeTab === 1 ? (
        <ProfileDetails
          shimmer={shimmer?.profile}
          profileDetails={profileData?.profileDetails}
          navigation={navigation}
        />
      ) : activeTab === 2 ? (
        <AttendanceHistory
          shimmer={shimmer?.attendance}
          attendanceHistory={attendanceData}
        />
      ) : activeTab === 3 ? (
        <PaymentHistory
          shimmer={shimmer?.payment}
          paymentHistory={paymentData}
        />
      ) : null}
    </View>
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
    color: COLORS.silver,
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
