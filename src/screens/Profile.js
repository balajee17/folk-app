import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ProfileDetails from './ProfileDetails';
import AttendanceHistory from './AttendanceHistory';
import PaymentHistory from './PaymentHistory';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';

const Profile = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabItems = [
    {id: 1, tabName: 'Profile', icon: 'person-outline'},
    {id: 2, tabName: 'Attendance', icon: 'calendar-outline'},
    {id: 3, tabName: 'Payment', icon: 'receipt-outline'},
  ];
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
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1740649285~exp=1740652885~hmac=e3b71acbedc8749e46bba369cb9356231a0aecdaea4f8b197ef34c7cb2fc929b&w=740',
            }}
            style={styles.usrImg}
          />
        </View>
        {/* // # User Name */}
        <Text style={styles.usrName}>Kotresh R</Text>
        {/* // # User FOLK ID */}
        <Text style={styles.folkIdTxt}>FOLK ID : 457698625398</Text>

        {/* // # Tab Bar */}
        <View style={styles.tabBarCont}>
          {tabItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  setActiveTab(item?.id);
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
            );
          })}
        </View>
      </LinearGradient>

      {/* // @ Content */}
      {activeTab === 1 ? (
        <ProfileDetails />
      ) : activeTab === 2 ? (
        <AttendanceHistory />
      ) : activeTab === 3 ? (
        <PaymentHistory />
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
    borderRadius: moderateScale(50),
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
