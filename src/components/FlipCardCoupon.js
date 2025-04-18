import {
  Image,
  Pressable,
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
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const FlipCardCoupon = ({item, index, setSelCoupon}) => {
  const rotation = useSharedValue(0);
  const dateTime = ['Date', 'Time'];

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
      position: 'absolute',
    };
  });

  const handleFlip = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 600,
    });
  };

  return (
    <Pressable
      disabled={
        item?.requestedCoupon === 'Y' ||
        item?.requestStatus === 'X' ||
        item?.is_Availed === 'Y'
      }
      key={index}
      onPress={handleFlip}>
      {/* // # Front Side */}
      <Animated.View
        activeOpacity={0.8}
        style={[styles.couponCard, frontAnimatedStyle]}>
        {/* // # Left Cutout */}
        <View style={[styles.cutout, styles.leftCutout]} />
        {/*  //# Vertical Line */}
        <View style={styles.verticalLine} />
        {/* // # Right Cutout */}
        <View style={[styles.cutout, styles.rightCutout]} />

        {/* // # Left Content */}
        <View
          style={[
            styles.leftContent(item?.bgColor),
            item?.is_Availed === 'Y' && {opacity: 0.5},
          ]}>
          {item?.code && (
            <Text
              numberOfLines={2}
              style={[
                styles.couponCodeTxt,
                {color: item?.codeColor || COLORS.candlelight},
              ]}>
              {item?.code}
            </Text>
          )}
          <Text
            numberOfLines={2}
            style={[
              styles.couponCodeTxt,
              styles.eventName,
              {color: item?.titleColor || COLORS.white},
            ]}>
            {item?.title}
          </Text>

          <View style={styles.dtTimeContainer}>
            {dateTime.map((dateItem, dateIndex) => {
              return (
                <View key={dateIndex} style={{width: '45%'}}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.labelTxt,
                      {color: item?.labelColor || COLORS.cloud},
                    ]}>
                    {dateItem}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.valueTxt,
                      {color: item?.dateColor || COLORS.white},
                    ]}>
                    {dateIndex === 0 ? item?.date : item?.time}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* // # Pay Button */}
          {item?.requestedCoupon === 'Y' && (
            <TouchableOpacity
              disabled={
                item?.requestStatus === 'P' || item?.requestStatus === 'X'
              }
              onPress={() => {
                if (item?.isPaid === 'Y') {
                  setSelCoupon({
                    open: true,
                    type: 'P',
                    refId: item?.refId,
                    prasadamAmt: item?.prasadamAmt,
                    prasadamAmtLbl: item?.prasadamAmtLabel,
                    totalAmt: Number(item?.qty) * Number(item?.prasadamAmt),
                    paidCount: item?.qty,
                    paidMaxCount: item?.qty,
                  });
                }
                if (item?.isPaid === 'N') {
                  setSelCoupon({
                    open: true,
                    type: 'F',
                    freeCount: item?.qty,
                    freeMaxCount: item?.qty,
                    refId: item?.refId,
                    prasadamAmt: item?.prasadamAmt,
                    totalAmt: 0,
                  });
                }
              }}
              activeOpacity={0.8}
              style={[
                styles.payBtn,
                {backgroundColor: item?.btnBgColor || COLORS.golden},
              ]}>
              <Text
                style={[
                  styles.btnTxt,
                  {
                    color: item?.btnTxtColor || COLORS.white,
                  },
                ]}>
                {item?.requestStatus === 'X'
                  ? 'Rejected'
                  : item?.requestStatus === 'P'
                  ? 'Pending'
                  : item?.requestStatus === 'A' && item?.isPaid === 'Y'
                  ? 'Pay Now'
                  : 'Reedem'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* // # Right Content */}
        <View
          style={[
            styles.rightContent,
            item?.is_Availed === 'Y' && {opacity: 0.5},
          ]}>
          <Text
            numberOfLines={1}
            style={[
              styles.eventName,
              styles.qtyTxt,
              {
                color: item?.dateColor || COLORS.white,
              },
            ]}>
            Qty
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.countTxt,
              {color: item?.countColor || COLORS.candlelight},
            ]}>
            {item?.qty}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.valueTxt,
              styles.amountTxt,
              {
                color: item?.dateColor || COLORS.white,
              },
            ]}>
            {item?.isPaid === 'Y' ? 'Paid' : 'Free'}
          </Text>
        </View>
      </Animated.View>

      {/* // # Back Side */}
      {item?.qrImage && (
        <Animated.View
          key={index}
          activeOpacity={0.8}
          style={[styles.couponCard, backAnimatedStyle]}>
          {/* // # Left Cutout */}
          <View style={[styles.cutout, styles.leftCutout]} />
          {/*  //# Vertical Line */}
          <View style={styles.verticalLine} />
          {/* // # Right Cutout */}
          <View style={[styles.cutout, styles.rightCutout]} />

          {/* // # Left Content */}
          <View
            style={[
              styles.leftContent(item?.bgColor),
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: horizontalScale(120),
                height: verticalScale(120),
                borderRadius: moderateScale(10),
                margin: horizontalScale(7),
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  width: horizontalScale(110),
                  height: verticalScale(110),
                }}
                source={{uri: item?.qrImage}}
                resizeMode="stretch"
              />
            </View>
          </View>

          {/* // # Right Content */}
          <View style={[styles.rightContent]} />
        </Animated.View>
      )}
    </Pressable>
  );
};

export default FlipCardCoupon;

const styles = StyleSheet.create({
  couponCard: {
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
    backgroundColor: COLORS.white, // Same as the background to create the cutout effect
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
    borderColor: COLORS.white,
    borderStyle: 'dashed',
    height: '90%',
    right: horizontalScale(92),
    zIndex: 99,
  },
  leftContent: bgColor => ({
    backgroundColor: bgColor || COLORS.windowsBlue,
    width: horizontalScale(244.5),
  }),
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
    alignItems: 'center',
    justifyContent: 'center',
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
  payBtn: {
    width: horizontalScale(70),
    height: horizontalScale(25),
    borderRadius: moderateScale(4),
    marginBottom: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l,
  },
});
