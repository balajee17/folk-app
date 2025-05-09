import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {useAppContext} from '../../App';

const NotificationCard = ({item, index, swipedNotify}) => {
  const {globalState} = useAppContext();
  const {cardColor} = globalState;
  const Margin_Top = verticalScale(15);
  const HEIGHT = verticalScale(110);

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
          if (isFinised && swipedNotify) {
            runOnJS(swipedNotify)(item);
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
          style={[styles.notifyCard(cardColor), cardAnimate]}
          key={item?.NOT_ID}>
          <View>
            {/* // #  icon title container */}
            <View style={styles.titleIconCont}>
              <View style={styles.circleIcon}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: item?.ICON}}
                />
              </View>

              <Text numberOfLines={2} style={styles.titleTxt}>
                {item?.TITLE}
              </Text>
            </View>

            {/* // #  Description */}
            <Text numberOfLines={2} style={styles.descrpTxt}>
              {item?.NOTIFICATION}
            </Text>
          </View>

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
  notifyCard: bgColor => ({
    backgroundColor: bgColor || COLORS.card,
    width: '95%',
    padding: '3%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: COLORS.border,
  }),
  titleIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIcon: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.gunsmoke,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
    color: COLORS.textLabel,
    width: '100%',
    marginTop: '1%',
  },
  dateTimeCont: {
    justifyContent: 'space-between',
    // marginTop: '2%',
  },
  dateTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.s,
    color: COLORS.textLabel,
    width: '25%',
  },

  deleteIcon: {
    height: '100%',
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
