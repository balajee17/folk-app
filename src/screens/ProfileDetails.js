import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProfileDetails = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollCntStyle}>
      {/* // # Title and Edit Btn Container */}
      <View style={styles.titleEditCont}>
        <Text numberOfLines={1} style={styles.titleTxt}>
          Details
        </Text>
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.8}
          style={styles.editIcnBtn}>
          <Text style={styles.editTxt}>Edit</Text>
          <FontAwesome6
            name="edit"
            size={moderateScale(15)}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      {/* // # user details */}
      <Text style={[styles.labelTxt, {marginTop: '6%'}]}>Email ID</Text>
      <View style={styles.valueBox}>
        <Text style={styles.valueTxt}>kotreshrudresh@gmail.com</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  scrollCntStyle: {
    paddingTop: '6%',
    padding: '4%',
  },
  titleEditCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcnBtn: {
    backgroundColor: COLORS.dolphin,
    width: horizontalScale(75),
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: moderateScale(12),
  },
  titleTxt: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '60%',
  },
  editTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '50%',
  },
  labelTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.midGrey,
    width: '100%',
    marginTop: '3%',
  },
  valueBox: {
    marginTop: '2%',
    backgroundColor: COLORS.chromeWhite,
    width: '100%',
    borderRadius: moderateScale(12),
    padding: '4%',
  },
  valueTxt: {
    width: '100%',
    borderRadius: moderateScale(12),
    textAlignVertical: 'center',
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.midGrey,
  },
});
