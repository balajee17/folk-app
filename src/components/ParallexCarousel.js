import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale, windowWidth} from '../styles/MyStyles';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';

const OFF_SET = 45;
const ITEM_WIDTH = windowWidth - OFF_SET * 2;
const ITEM_HEIGHT = 450;

const ParallexCarousel = ({carouselItems}) => {
  const scrollX = useAnimatedRef(0);
  return (
    <View style={styles.ParallexCarouselCont}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        snapToInterval={ITEM_WIDTH}
        bounces={false}
        disableIntervalMomentum
        scrollEventThrottle={16}
        onScroll={event => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}>
        {carouselItems.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const translateStyle = useAnimatedStyle(() => {
            const translate = interpolate(
              scrollX.value,
              inputRange,
              [0.97, 0.97, 0.97],
              Extrapolation.CLAMP,
            );

            return {
              transform: [{scale: translate}],
            };
          });

          return (
            <Animated.View
              key={index}
              style={[
                {
                  borderRadius: 15,

                  marginLeft: index === 0 ? OFF_SET : undefined,
                  marginRight:
                    index === carouselItems.length - 1 ? OFF_SET : undefined,
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                },
                translateStyle,
              ]}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 15,
                }}
                source={{uri: item.image}}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ParallexCarousel;

const styles = StyleSheet.create({
  ParallexCarouselCont: {paddingVertical: 10},
});
