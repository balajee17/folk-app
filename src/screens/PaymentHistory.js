import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
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
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import moment from 'moment';

const PaymentHistory = ({shimmer, paymentHistory}) => {
  const navigation = useNavigation();

  // # Navigate Sreen
  const navigateTo = (screen, paymentId) => {
    navigation.navigate(screen, {paymentId});
  };
  return shimmer ? (
    <View style={[styles.attendanceCard]}>
      <View style={styles.evtImgNameCont}>
        {/* // # First Letter of Event Name */}
        <ImageShimmer
          width={horizontalScale(45)}
          borderRadius={moderateScale(25)}
          height={horizontalScale(45)}
        />
        {/* // # Transaction ID & Event Name */}
        <View style={styles.idEvntNameCont}>
          <TitleShimmer width={'60%'} height={horizontalScale(12)} />
          <TitleShimmer width={'90%'} height={horizontalScale(15)} />
        </View>
        {/*  // # Amount */}
        <View
          style={{
            width: '25%',
            justifyContent: 'flex-end',
          }}>
          <TitleShimmer
            width={horizontalScale(80)}
            height={horizontalScale(20)}
          />
        </View>
      </View>
      {/*  // # Date & status  */}
      <View style={styles.dateStatusCont}>
        <TitleShimmer
          width={horizontalScale(120)}
          height={horizontalScale(12)}
        />
        <TitleShimmer
          width={horizontalScale(100)}
          height={horizontalScale(12)}
        />
      </View>
    </View>
  ) : (
    <ScrollView contentContainerStyle={{paddingBottom:'3%'}}>
    {paymentHistory?.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigateTo(screenNames.paymentDetails, item?.PAYMENT_ID)}
        activeOpacity={0.8}
        style={[styles.attendanceCard]}>
        <View style={styles.evtImgNameCont}>
          {/* // # First Letter of Event Name */}
          <View style={styles.eventImg}>
            <Text style={styles.eventFrstLetter}>
              {item?.PURPOSE?.charAt(0)}
            </Text>
          </View>
          {/* // # Transaction ID & Event Name */}
          <View style={styles.idEvntNameCont}>
            <Text numberOfLines={1} style={[styles.txid, {width: '100%'}]}>
              TXID : {item?.TRANSACTION_ID}
            </Text>
            <Text numberOfLines={1} style={[styles.eventName, {width: '100%'}]}>
              {item?.PURPOSE}
            </Text>
          </View>
          {/*  // # Amount */}
          <Text style={styles.amtTxt}>{item?.TOTAL_AMOUNT}</Text>
        </View>
        {/*  // # Date & status  */}
        <View style={styles.dateStatusCont}>
          <View style={[styles.dateTimeCont, {width: '40%'}]}>
            <Text style={styles.dateTxt}>{item?.TRANSACTION_DATE}</Text>
            <View style={styles.dot} />
            <Text style={styles.dateTxt}>{item?.TRANSACTION_TIME}</Text>
          </View>
          <View style={[styles.dateTimeCont, {width: '30%'}]}>
            <Text
              numberOfLines={1}
              style={[styles.eventName, styles.statusTxt]}>
              {item?.STATUS}
            </Text>
            <FontAwesome
              name={
                item?.TRANSACTION_STATUS === 'S'
                  ? 'check-circle'
                  : item?.TRANSACTION_STATUS === 'F'
                  ? 'times-circle'
                  : 'exclamation-circle'
              }
              size={moderateScale(20)}
              color={
                item?.TRANSACTION_STATUS === 'S'
                  ? COLORS.successPB
                  : item?.TRANSACTION_STATUS === 'F'
                  ? COLORS.errorPB
                  : COLORS.warningPB
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    ))}
      </ScrollView>
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
  statusTxt: {width: '74%', textAlign: 'right'},
});
