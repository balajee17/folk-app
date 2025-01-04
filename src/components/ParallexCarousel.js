import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ParallexPaginationDots from './ParallexPaginationDots';

const OFF_SET = moderateScale(25);
const ITEM_WIDTH = windowWidth - OFF_SET * 2 + horizontalScale(2);
const ITEM_HEIGHT = verticalScale(200);

const ParallexCarousel = ({carouselItems, autoScroll}) => {
  const scrollX = useSharedValue(0);
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const autoScrollInterval = useRef(null);
  const isAutoScrolling = useRef(true);

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
        // Calculate the current and next offsets
        const currentOffset = currentIndex.current * ITEM_WIDTH;
        currentIndex.current =
          (currentIndex.current + 1) % carouselItems.length; // Cycle through images
        const nextOffset = currentIndex.current * ITEM_WIDTH;

        // Ensure smooth scroll starts fresh
        let step = 0;
        const totalSteps = 50;
        const increment = (nextOffset - currentOffset) / totalSteps;

        // Clear any ongoing smooth scroll before starting a new one
        if (autoScrollInterval?.smoothScroll) {
          clearInterval(autoScrollInterval?.smoothScroll);
        }

        autoScrollInterval.smoothScroll = setInterval(() => {
          step += 1;
          if (step >= totalSteps) {
            clearInterval(autoScrollInterval.smoothScroll); // Stop the incremental scroll
            scrollRef?.current?.scrollTo({
              x: nextOffset,
              animated: false, // Ensure alignment at the end
            });
          } else if (scrollRef.current) {
            scrollRef?.current?.scrollTo({
              x: currentOffset + increment * step,
              animated: false,
            });
          }
        }, 10); // Adjust delay for smoother movement
      }
    }, 5000); // Delay between auto-scroll transitions
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
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.ParallexCarouselCont}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        snapToInterval={ITEM_WIDTH}
        bounces={false}
        disableIntervalMomentum
        scrollEventThrottle={16}
        onScroll={onScroll}
        onTouchStart={() => {
          if (autoScroll) {
            stopAutoScroll();
          }

          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              x: currentIndex.current * ITEM_WIDTH,
              animated: false,
            });
          }
        }}
        onTouchEnd={() => {
          if (autoScroll) {
            startAutoScroll();
          }
        }}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / ITEM_WIDTH);
          currentIndex.current = index;

          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              x: currentIndex.current * ITEM_WIDTH,
              animated: true,
            });
          }

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
          const translateStyle = useAnimatedStyle(() => {
            const translate = interpolate(
              scrollX.value,
              inputRange,
              [0.97, 0.97, 0.97],
              {
                extrapolate: Extrapolation.CLAMP,
              },
            );

            const opacity = interpolate(
              scrollX.value,
              inputRange,
              [0.85, 1, 0.85],
              {
                extrapolate: Extrapolation.CLAMP,
              },
            );

            return {
              transform: [{scale: translate}],
              // opacity,
            };
          });

          const translateImgStyle = useAnimatedStyle(() => {
            const translate = interpolate(scrollX.value, inputRange, [
              -ITEM_WIDTH * 0.2,
              0.97,
              ITEM_WIDTH * 0.4,
            ]);

            return {
              transform: [{translateX: translate}],
            };
          });

          return (
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
                  overflow: 'hidden',
                  shadowColor: COLORS.white,
                  // padding: 5,
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                },
                translateStyle,
              ]}>
              <Animated.View style={[translateImgStyle]}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: moderateScale(15),
                    overflow: 'hidden',
                    resizeMode: 'cover',
                  }}
                  source={{uri: item.image}}
                />
              </Animated.View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
      {/* // # PAGINATION DOTS */}
      <ParallexPaginationDots carouselItems={carouselItems} scrollX={scrollX} />
    </View>
  );
};

export default ParallexCarousel;

const styles = StyleSheet.create({
  ParallexCarouselCont: {
    paddingTop: verticalScale(10),
  },
});
