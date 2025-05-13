import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';

const ChallengeCompletedCard = ({title, image, fillPercentage, color}) => {
  const fillHeight = useSharedValue(0);

  const height = verticalScale(100);

  useEffect(() => {
    fillHeight.value = withTiming((height * fillPercentage) / 100, {
      duration: 1500,
    });
  }, [fillPercentage]);

  const animatedFillStyle = useAnimatedStyle(() => {
    return {
      height: fillHeight.value,
    };
  });

  const height80 = verticalScale(80);
  const titleAnimatedStyle = useAnimatedStyle(() => {
    const colorVal = interpolateColor(
      fillHeight.value,
      [0, height80],
      [COLORS.black, COLORS.white],
    );
    return {color: colorVal};
  });

  const height25 = verticalScale(25);
  const percentAnimatedStyle = useAnimatedStyle(() => {
    const colorVal = interpolateColor(
      fillHeight.value,
      [0, height25],
      [COLORS.black, COLORS.white],
    );
    return {color: colorVal};
  });

  return (
    <View style={[styles.quotesBox, styles.sadhanaChallCards]}>
      <Animated.View
        style={[styles.fill, {backgroundColor: color}, animatedFillStyle]}
      />

      <Image source={{uri: image}} style={styles.cardIcon} />

      <View style={styles.titleBtnCont}>
        <Animated.Text
          numberOfLines={2}
          style={[
            styles.subTitleTxt,
            {marginTop: '5%', width: '100%'},
            fillPercentage >= 80 && titleAnimatedStyle,
          ]}>
          {title}
        </Animated.Text>

        <Animated.Text style={[styles.challengePercent, percentAnimatedStyle]}>
          {fillPercentage}%
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.inptBg,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: COLORS.link,
  },
  percentageText: {
    position: 'absolute',
    top: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.black,
  },

  quotesBox: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  sadhanaChallCards: {
    marginTop: '5%',
    borderRadius: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: verticalScale(100),
  },
  cardIcon: {
    width: '30%',
    height: '100%',
    resizeMode: 'stretch',
  },
  titleBtnCont: {
    width: '68%',
    justifyContent: 'space-between',
    padding: '1%',
  },
  subTitleTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '50%',
    lineHeight: 25,
  },
  addBtn: {
    backgroundColor: COLORS.button,
    width: horizontalScale(55),
    height: horizontalScale(25),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
    alignSelf: 'flex-end',
  },
  addTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
  },
  challengePercent: {
    width: horizontalScale(50),
    textAlignVertical: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '2%',
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
    color: COLORS.black,
  },
});

export default ChallengeCompletedCard;
