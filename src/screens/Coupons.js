import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';

const Coupons = ({navigation}) => {
  const dateTime = ['Date', 'Time'];

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        titleName={screenNames.coupons}
        goBack={() => navigation.goBack()}
      />
      <SafeAreaView styles={[MyStyles.flex1]}>
        <View style={MyStyles.contentCont}>
          {/* // @ Coupon card */}
          <View style={styles.couponCard}>
            {/* // # Left Cutout */}
            <View style={[styles.cutout, styles.leftCutout]} />
            {/*  //# Vertical Line */}
            <View style={styles.verticalLine} />
            {/* // # Right Cutout */}
            <View style={[styles.cutout, styles.rightCutout]} />

            {/* // # Left Content */}
            <View style={styles.leftContent}>
              <Text numberOfLines={2} style={styles.couponCodeTxt}>
                ECPN-5-5365
              </Text>
              <Text
                numberOfLines={2}
                style={[styles.couponCodeTxt, styles.eventName]}>
                Prasadam Coupon
              </Text>

              <View style={styles.dtTimeContainer}>
                {dateTime.map((item, index) => {
                  return (
                    <View key={index + 1} style={{width: '45%'}}>
                      <Text numberOfLines={1} style={styles.labelTxt}>
                        {item}
                      </Text>
                      <Text numberOfLines={1} style={styles.valueTxt}>
                        {index === 0 ? '11-02-2025' : '10:30 AM'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* // # Right Content */}
            <View style={styles.rightContent}>
              <Text numberOfLines={1} style={[styles.eventName, styles.qtyTxt]}>
                Qty
              </Text>
              <Text numberOfLines={1} style={styles.countTxt}>
                01
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.valueTxt, styles.amountTxt]}>
                ₹ 120
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Coupons;

const styles = StyleSheet.create({
  couponCard: {
    backgroundColor: 'pink',
    width: '90%',
    borderTopRightRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),

    alignSelf: 'center',
    marginTop: '5%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cutout: {
    position: 'absolute',
    backgroundColor: COLORS.paleYellow, // Same as the background to create the cutout effect
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(20),
    // overflow: 'hidden',
    zIndex: 99,
  },
  leftCutout: {
    right: horizontalScale(80), // Moves it outside
    bottom: 0,
    transform: [{translateY: 10}],
  },
  rightCutout: {
    right: horizontalScale(80), // Moves it outside
    top: 0,
    transform: [{translateY: -10}],
  },
  verticalLine: {
    position: 'absolute',
    borderWidth: 0.7,
    borderColor: COLORS.paleYellow,
    borderStyle: 'dashed',
    height: '90%',
    right: horizontalScale(92),
    zIndex: 99,
  },
  leftContent: {
    backgroundColor: COLORS.windowsBlue,
    width: horizontalScale(244.5),
  },
  couponCodeTxt: {
    width: '85%',
    textAlign: 'left',
    alignSelf: 'center',
    color: COLORS.candlelight,
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    marginTop: '5%',
  },
  eventName: {
    fontSize: SIZES.subTitle,
    color: COLORS.white,
    textAlign: 'center',
  },
  dtTimeContainer: {
    marginTop: '7%',
    marginBottom: '5%',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  labelTxt: {
    width: '100%',
    color: COLORS.cloud,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
  },
  valueTxt: {
    width: '100%',
    marginTop: '5%',

    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
  },
  rightContent: {
    backgroundColor: COLORS.charcoal,
    width: horizontalScale(95),
    paddingVertical: '5%',
    alignItems: 'center',
  },
  qtyTxt: {
    width: '90%',
    textAlign: 'center',
    fontFamily: FONTS.urbanistBold,
  },
  countTxt: {
    marginTop: '2%',
    width: '85%',
    fontFamily: FONTS.urbanistBold,
    color: COLORS.candlelight,
    fontSize: SIZES.xxxl + 20,
    textAlign: 'center',
  },
  amountTxt: {
    marginTop: '2%',
    width: '85%',
    fontSize: SIZES.subTitle,
    textAlign: 'center',
  },
});
