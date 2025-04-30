import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const OFF_SET = moderateScale(25);
const ITEM_WIDTH = windowWidth - OFF_SET * 2 + horizontalScale(2);
const dot_height = verticalScale(8);
const active_dot_height = verticalScale(16);

const PaginationDot = ({index, scrollX}) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      scrollX.value,
      inputRange,
      [dot_height, active_dot_height, dot_height],
      Extrapolation.CLAMP,
    );

    const opacityAnimation = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );

    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [-5, 0, 5],
      Extrapolation.CLAMP,
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
      transform: [{translateX}],
    };
  });

  return <Animated.View key={index} style={[styles.dots, animatedDotStyle]} />;
};

const ParallexPaginationDots = ({carouselItems, scrollX}) => {
  return (
    <View style={styles.paginationCont}>
      {carouselItems?.map((_, index) => {
        return <PaginationDot scrollX={scrollX} index={index} />;
      })}
    </View>
  );
};

export default ParallexPaginationDots;

const styles = StyleSheet.create({
  paginationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    width: '95%',
    alignSelf: 'center',
  },
  dots: {
    borderRadius: moderateScale(4),
    marginHorizontal: horizontalScale(6),
    height: verticalScale(8),
    backgroundColor: COLORS.charcoal,
  },
});
