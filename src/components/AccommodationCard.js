import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getImage} from '../utils/ImagePath';

const AccommodationCard = ({data, index}) => {
  return (
    <View style={styles.card}>
      {/* // # Date and status */}
      <View style={styles.flexRowCont}>
        <Text style={styles.dateTxt}>Date</Text>

        <Text style={styles.pendingTxt}>Rejected</Text>
      </View>
      {/* // # request reason */}
      <Text style={[styles.dateTxt, styles.reasonTxt]}>
        Request reason Text
      </Text>
      {/* // # Rejected Reason */}
      <Text style={styles.rejReasTxt}>Reason for rejection</Text>
      <Text style={[styles.dateTxt, styles.reasonTxt]}>
        REjected reason Text
      </Text>

      {/* // # hostel, Bed no and Qr code */}
      <View style={[styles.flexRowCont, {marginTop: '3%'}]}>
        <View style={[styles.flexRowCont, {width: '40%'}]}>
          <Image style={styles.icnStyle} source={getImage.hostelIcn} />
          <Text numberOfLines={1} style={styles.hostelName}>
            HOSTEL naME
          </Text>
        </View>

        <View style={[styles.flexRowCont, {width: '35%'}]}>
          <Image style={styles.icnStyle} source={getImage.bedIcn} />
          <Text numberOfLines={1} style={[styles.hostelName]}>
            L122 (3rd floor)
          </Text>
        </View>

        <MaterialIcons
          onPress={() => {}}
          name="qr-code"
          size={moderateScale(23)}
          color={COLORS.black}
        />
      </View>
    </View>
  );
};

export default AccommodationCard;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '100%',
    marginTop: '2%',
    padding: '2%',
    borderRadius: moderateScale(10),
    borderWidth: horizontalScale(1),
    borderTopColor: COLORS.border,
    borderRightColor: COLORS.border,
    borderBottomColor: COLORS.border,
    borderLeftWidth: 5,
    borderLeftColor: 'red',
    ...MyStyles,
  },
  flexRowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.l,
    color: COLORS.black,
  },
  pendingTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
    color: COLORS.black,
    padding: '2.2%',
    paddingVertical: '1.2%',
    borderRadius: moderateScale(15),
    backgroundColor: 'red',
  },
  reasonTxt: {
    fontFamily: FONTS.urbanistMedium,
    width: '100%',
    marginTop: '2%',
  },
  rejReasTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l + 1,
    color: COLORS.black,
    width: '100%',
    marginTop: '2%',
  },
  hostelName: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m + 1,
    color: COLORS.black,
    width: '78%',
  },
  icnStyle: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    resizeMode: 'contain',
  },
});
