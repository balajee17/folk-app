import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  percentageToPixel,
  resHeight,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const OFF_SET = 45;
const ITEM_WIDTH = Math.round(windowWidth - OFF_SET * 2);
const ITEM_HEIGHT = verticalScale(220);

const CustomCarousel = ({carouselItems, autoScroll, dots}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const WIDTH_SIZE = Math.round(windowWidth * 0.8);

  const x = useSharedValue(0);
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const isAutoScrolling = useRef(true);
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    if (autoScroll) {
      startAutoScroll();
    }

    return () => {
      if (autoScroll) {
        stopAutoScroll();
      }
    };
  }, [carouselItems]);

  // # Start Auto Scroll
  const startAutoScroll = () => {
    if (!isAutoScrolling.current) return; // Skip if manual scroll is active

    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        currentIndex.current =
          (currentIndex.current + 1) % carouselItems.length; // Cycle through images
        const nextOffset = currentIndex.current * WIDTH_SIZE;
        scrollRef?.current?.scrollTo({
          x: nextOffset,
          animated: true,
        });
      }
    }, 2000);
  };

  // # Stop Auto Scroll
  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  // # onScroll Event
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingVertical: '5%'}}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={WIDTH_SIZE}
        decelerationRate={'fast'}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          if (autoScroll) {
            stopAutoScroll(); // Stop auto-scroll when user starts scrolling
            isAutoScrolling.current = false;
          }
        }}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          currentIndex.current = Math.round(offsetX / WIDTH_SIZE); // Update index after manual scroll
          if (autoScroll) {
            isAutoScrolling.current = true;
            startAutoScroll();
          }
        }}>
        {carouselItems.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const animationStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              inputRange,
              [0.97, 0, 0.97],
              Extrapolation.CLAMP,
            );

            //   // const opacity = interpolate(
            //   //   x.value,
            //   //   (index - 2) * WIDTH_SIZE,
            //   //   (index - 1) * WIDTH_SIZE,
            //   //   index * WIDTH_SIZE,
            //   //   [0.6, 1, 0.6],
            //   //   Extrapolation.CLAMP,
            //   // );

            return {
              transform: [{scale}],
              // opacity,
            };
          });

          return (
            // <View
            //   key={index}
            //   style={{
            //     width: WIDTH_SIZE,
            //     alignItems: 'center',
            //   }}>

            <Animated.View
              key={index}
              style={[
                {
                  borderRadius: moderateScale(15),
                  marginLeft: index === 0 ? OFF_SET : undefined,
                  marginRight:
                    index === carouselItems.length - 1 ? OFF_SET : undefined,
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                },
                animationStyle,
              ]}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: moderateScale(15),
                }}
                source={{uri: item.image}}
              />
            </Animated.View>
            // </View>
          );
        })}
      </ScrollView>

      {/* Dots */}
      {/* {dots && (
        <View style={styles.dotsContainer}>
          {carouselItems.map((item, index) => {
            if (index === 0 || index === carouselItems.length - 1) {
              return null;
            }
            console.log('(index - 1) * dotSize', (index - 1) * dotSize);
            // Animated dot style
            const dotStyle = useAnimatedStyle(() => {
              // Calculate opacity based on scroll position
              const opacity = interpolate(
                x.value,
                [
                  (index - 1) * windowWidth,
                  index * windowWidth,
                  (index + 1) * windowWidth, // Current dot
                ],
                [0.4, 1, 0], // Opacity transitions
              );

              // const animatedOpacity = withTiming(opacity, {
              //   duration: 500,
              //   easing: Easing.circle,
              // });

              return {
                opacity: Math.max(opacity, 0.4),
              };
            });

            return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
          })}
        </View>
      )} */}
    </>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  dot: {
    borderRadius: moderateScale(6),
    marginHorizontal: horizontalScale(4),
    width: Math.round(windowWidth * 0.02),
    backgroundColor: COLORS.charcoal,
    height: Math.round(windowWidth * 0.02),
  },
});
