import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenWidth,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const UpcomingEvents = () => {
  return (
    <View style={[MyStyles.flex1, {width: screenWidth}]}>
      {/*  // @ Events Card */}
      <View style={styles.card}>
        {/* // # Card image */}
        <Image
          style={styles.cdImage}
          resizeMode="stretch"
          source={{
            uri: 'https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
        />
        {/* // # Date Mode Container */}
        <View style={styles.dateModeCont}>
          <View style={styles.dateCont}>
            <Text style={styles.dateTxt}>15</Text>
            <Text style={styles.monthTxt}>Jan</Text>
          </View>

          <View style={styles.modeCont}>
            <Text style={styles.modeTxt}>Offline</Text>
          </View>
        </View>

        {/* // # Content Container */}
        <View style={styles.contentCont}>
          <View style={{width: '80%'}}>
            <Text style={styles.titleTxt}>The Journey of self Discovery</Text>
            <Text style={styles.descripTxt}>The Journey of self Discovery</Text>
          </View>

          <View style={{width: '18%'}}>
            <Text style={styles.amtTxt}>Free</Text>
          </View>
        </View>

        {/* // # Icon & Register Btn Container */}
        <View style={[styles.contentCont, {marginBottom: '1%'}]}>
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              // onPress={{}}
              style={styles.iconStyle}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={moderateScale(19)}
                color={COLORS.charcoal}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={{}}
              style={styles.iconStyle}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="ticket-percent-outline"
                size={moderateScale(22)}
                color={COLORS.charcoal}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={{}}
              style={styles.iconStyle}
              activeOpacity={0.6}>
              <Entypo
                name="location-pin"
                size={moderateScale(25)}
                color={COLORS.charcoal}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              height: verticalScale(40),
              width: horizontalScale(100),
              borderRadius: moderateScale(20),
              alignItems: 'center',
              backgroundColor: COLORS.atlantis,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.urbanistSemiBold,
                fontSize: SIZES.xl,
                top: -1,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.charcoal,
    width: '93%',
    alignSelf: 'center',
    padding: '2%',
    borderRadius: moderateScale(26),
  },
  cdImage: {
    width: '100%',
    height: verticalScale(150),
    alignSelf: 'center',
    borderRadius: moderateScale(20),
  },
  dateModeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2%',
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(6),
  },
  dateCont: {
    backgroundColor: COLORS.citrine,
    width: horizontalScale(45),
    height: horizontalScale(45),
    alignItems: 'center',
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    paddingVertical: '4%',
  },
  dateTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
  },
  monthTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.s,
    color: COLORS.black,
  },
  modeCont: {
    backgroundColor: 'white',
    width: '20%',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(13),
    padding: '2%',
  },
  modeTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.m,
    color: COLORS.black,
  },
  contentCont: {
    width: '100%',
    paddingHorizontal: '2%',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '100%',
  },
  descripTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.diesel,
    width: '100%',
  },
  amtTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '100%',
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
  },
  iconStyle: {
    height: horizontalScale(35),
    width: horizontalScale(35),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
