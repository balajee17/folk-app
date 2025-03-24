import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  screenWidth,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const NotificationCard = ({item, index, removeNotification}) => {
  const Margin_Top = verticalScale(25);
  const HEIGHT = verticalScale(120);

  const translateX = useSharedValue(0);
  const Translate_X_Threshold = -windowWidth * 0.3;
  const marginTop = useSharedValue(Margin_Top);
  const opacity = useSharedValue(1);
  const height = useSharedValue(HEIGHT);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < Translate_X_Threshold;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-screenWidth);
        marginTop.value = withTiming(0);
        height.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinised => {
          if (isFinised && removeNotification) {
            runOnJS(removeNotification)(item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const cardAnimate = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const icnOpacityAnimate = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < Translate_X_Threshold ? 1 : 0,
    );
    return {opacity};
  });

  const cardContAnimate = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value,
      height: height.value,
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View style={[styles.notifyRowCont, cardContAnimate]}>
      <Animated.View style={[styles.deleteIcon, icnOpacityAnimate]}>
        <FontAwesome5
          name="trash-alt"
          size={moderateScale(25)}
          color={COLORS.errorPB}
        />
      </Animated.View>
      <GestureDetector key={index} gesture={panGesture}>
        <Animated.View
          style={[styles.notifyCard, cardAnimate]}
          key={item?.NOT_ID}>
          {/* // #  icon title container */}
          <View style={styles.titleIconCont}>
            <View style={styles.circleIcon}>
              <Text style={styles.iconLetter}>{item?.TITLE.charAt(0)}</Text>
            </View>

            <Text numberOfLines={2} style={styles.titleTxt}>
              {item?.TITLE}
            </Text>
          </View>

          {/* // #  Description */}
          <Text numberOfLines={2} style={styles.descrpTxt}>
            {item?.NOTIFICATION}
          </Text>

          {/* // # Date time age Container */}
          <View style={[styles.titleIconCont, styles.dateTimeCont]}>
            <Text numberOfLines={1} style={styles.dateTxt}>
              {item?.DATE}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.dateTxt, {textAlign: 'right'}]}>
              {item?.TIME}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notifyRowCont: {
    width: '100%',
    alignItems: 'center',
  },
  notifyCard: {
    backgroundColor: COLORS.chromeWhite,
    width: '95%',
    padding: '3%',

    alignSelf: 'center',
    borderRadius: moderateScale(20),
  },
  titleIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '25%',
  },
  circleIcon: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLetter: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  titleTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    width: '85%',
    marginLeft: '4%',
  },
  descrpTxt: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.midGrey,
    width: '100%',
    marginTop: '2%',
    height: '38%',
  },
  dateTimeCont: {justifyContent: 'space-between', marginTop: '4%'},
  dateTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
    color: COLORS.midGrey,
    width: '25%',
  },

  deleteIcon: {
    height: horizontalScale(120),
    width: horizontalScale(40),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '7%',
    top: '20%', // Move to the middle
    transform: [{translateY: -25}],
  },
});
