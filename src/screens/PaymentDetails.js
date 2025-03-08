import {
  Image,
  SafeAreaView,
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
  SIZES,
} from '../styles/MyStyles';
import {CommonStatusBar} from '../components/StatusBarComponent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PaymentDetails = ({navigation}) => {
  return (
    <>
      <CommonStatusBar bgColor={COLORS.header} />
      <SafeAreaView style={[MyStyles.flex1, styles.mainContainer]}>
        {/* // @ Left Arrow Icon */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.6}
          style={styles.menuIcon}>
          <FontAwesome6
            name="arrow-left-long"
            size={moderateScale(23)}
            color={COLORS.black}
          />
        </TouchableOpacity>

        {/* // @ Status, Amt, Event Name */}
        <Image
          source={require('../assets/images/success.png')}
          style={styles.statusImg}
        />
        <Text style={styles.statusTxt}>Payment Successful</Text>
        <Text style={styles.eventName}>to Mango Mania</Text>
        <Text style={styles.amtTxt}>₹ 350</Text>

        {/* // @ Payment Details */}
        <View style={styles.payDetailsBox}>
          {/* // # Icon and Pay Details */}
          <View style={styles.payDetailIcnCont}>
            <AntDesign
              name="profile"
              size={moderateScale(22)}
              color={COLORS.white}
              style={styles.payDtlIcn}
            />
            <Text numberOfLines={1} style={styles.payDetailTxt}>
              Payment Details
            </Text>
          </View>
          {/* // # Transaction ID and Copy Option  */}
          <View style={styles.txidCopyCont}>
            <View style={{width: '80%'}}>
              <Text style={styles.labelTxt}>Transaction ID</Text>
              <Text
                style={[styles.labelTxt, styles.valueTxt, {marginTop: '1%'}]}>
                T25020701216322
              </Text>
            </View>
            <MaterialIcons
              name="content-copy"
              size={moderateScale(25)}
              color={COLORS.charcoal}
              style={{textAlignVertical: 'bottom'}}
            />
          </View>
          {/*  // # Date Time */}
          <Text style={[styles.labelTxt, styles.valueTxt, {marginTop: '2%'}]}>
            12 February 2025 04:37 PM
          </Text>
          {/* // # Amount Container */}
          <View style={styles.txidCopyCont}>
            <Text numberOfLines={1} style={[styles.labelTxt, {width: '60%'}]}>
              Total Amount :
            </Text>
            <Text style={[styles.labelTxt, styles.valueTxt, styles.amtValue]}>
              ₹ 350
            </Text>
          </View>

          <View style={styles.txidCopyCont}>
            <Text numberOfLines={1} style={[styles.labelTxt, {width: '60%'}]}>
              Discount Amount :
            </Text>
            <Text style={[styles.labelTxt, styles.valueTxt, styles.amtValue]}>
              ₹ 35000
            </Text>
          </View>

          <View style={styles.txidCopyCont}>
            <Text numberOfLines={1} style={[styles.labelTxt, {width: '60%'}]}>
              Amount to be pay :
            </Text>
            <Text style={[styles.labelTxt, styles.valueTxt, styles.amtValue]}>
              ₹ 35000
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
  },
  menuIcon: {
    padding: moderateScale(6),
    height: horizontalScale(40),
    width: horizontalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    margin: '3%',
    zIndex: 99,
  },
  statusImg: {
    alignSelf: 'center',
    width: horizontalScale(100),
    height: horizontalScale(100),
  },
  statusTxt: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '90%',
    textAlign: 'center',
    marginTop: '1%',
    alignSelf: 'center',
  },
  eventName: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.midGrey,
    width: '90%',
    marginTop: '1%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  amtTxt: {
    fontSize: SIZES.xxxl + SIZES.s,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '90%',
    marginTop: '4%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  payDetailsBox: {
    backgroundColor: COLORS.chromeWhite,
    alignSelf: 'center',
    width: '95%',
    marginTop: '10%',
    borderRadius: moderateScale(20),
    padding: '4%',
  },
  payDetailTxt: {
    fontSize: SIZES.subTitle,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '60%',
    marginLeft: '5%',
  },
  payDetailIcnCont: {
    flexDirection: 'row',
    width: '100%',
  },
  payDtlIcn: {
    backgroundColor: COLORS.black,
    borderRadius: moderateScale(3),
    textAlignVertical: 'center',
  },
  txidCopyCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
  },
  labelTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.highLightColor,
    width: '100%',
  },
  valueTxt: {
    color: COLORS.black,
  },
  amtValue: {
    width: '35%',
    color: COLORS.black,
    textAlign: 'right',
  },
});
