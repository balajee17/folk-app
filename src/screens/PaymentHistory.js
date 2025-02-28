import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
} from '../styles/MyStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {screenNames} from '../constants/ScreenNames';
import {useNavigation} from '@react-navigation/native';

const PaymentHistory = () => {
  const navigation = useNavigation();

  // # Navigate Sreen
  const navigateTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <TouchableOpacity
      onPress={() => navigateTo(screenNames.paymentDetails)}
      activeOpacity={0.8}
      style={styles.attendanceCard}>
      <View style={styles.evtImgNameCont}>
        {/* // # First Letter of Event Name */}
        <View style={styles.eventImg}>
          <Text style={styles.eventFrstLetter}>V</Text>
        </View>
        {/* // # Transaction ID & Event Name */}
        <View style={styles.idEvntNameCont}>
          <Text numberOfLines={1} style={[styles.txid, {width: '100%'}]}>
            TXID : 54366773575768
          </Text>

          <Text numberOfLines={1} style={[styles.eventName, {width: '100%'}]}>
            Vaikuntha Ekadashi
          </Text>
        </View>
        {/*  // # Amount */}
        <Text style={styles.amtTxt}>₹ 12000</Text>
      </View>
      {/*  // # Date & status  */}
      <View style={styles.dateStatusCont}>
        <View style={[styles.dateTimeCont, {width: '40%'}]}>
          <Text style={styles.dateTxt}>07 Feb 2025</Text>
          <View style={styles.dot} />
          <Text style={styles.dateTxt}>10:30AM</Text>
        </View>
        <View style={[styles.dateTimeCont, {width: '30%'}]}>
          <Text numberOfLines={1} style={[styles.eventName, styles.statusTxt]}>
            Successful
          </Text>
          <FontAwesome
            name="check-circle"
            size={moderateScale(20)}
            color={COLORS.moss}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  attendanceCard: {
    backgroundColor: COLORS.chromeWhite,
    marginTop: '3%',
    width: '95%',
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    padding: '3%',
  },
  evtImgNameCont: {flexDirection: 'row', justifyContent: 'space-between'},
  eventImg: {
    width: horizontalScale(45),
    height: horizontalScale(45),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.charcoal,
  },
  idEvntNameCont: {width: '55%'},
  txid: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.midGrey,
  },
  eventName: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    marginTop: '1%',
  },
  eventFrstLetter: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
  },
  amtTxt: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '25%',
    textAlignVertical: 'bottom',
    textAlign: 'right',
  },
  dateStatusCont: {
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  dateTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.midGrey,
  },
  dateTimeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: COLORS.black,
    width: horizontalScale(5),
    height: horizontalScale(5),
    borderRadius: moderateScale(3),
  },
  statusTxt: {width: '74%', textAlign: 'center'},
});
