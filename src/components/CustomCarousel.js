import {Image, StyleSheet, View} from 'react-native';
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

const CustomCarousel = ({carouselItems, autoScroll, dots}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const WIDTH_SIZE = windowWidth * 0.8;
  const SPACER = (windowWidth - WIDTH_SIZE) / 2;

  const x = useSharedValue(0);
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const isAutoScrolling = useRef(true);
  const autoScrollInterval = useRef(null);
  const dotSize = windowWidth * 0.02; // Default dot size
  const activeDotSize = windowWidth * 0.05; // Active dot size
  const dotColor = COLORS.osloGrey; // Default dot color
  const activeDotColor = COLORS.mirage;

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
        scrollRef.current.scrollTo({
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
      const index = Math.round(event.contentOffset.x / WIDTH_SIZE);
      runOnJS(setActiveIndex)(index + 1);
    },
  });
  return (
    <>
      <Animated.ScrollView
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
          const animationStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [
                (index - 2) * WIDTH_SIZE,
                (index - 1) * WIDTH_SIZE,
                index * WIDTH_SIZE,
              ],
              [0.82, 1.1, 0.82],
            );
            return {
              transform: [{scale}],
            };
          });

          if (!item?.image) {
            return (
              <View
                style={{
                  width: SPACER,
                  height: resHeight('15%'),
                }}
                key={index}
              />
            );
          }
          return (
            <View
              key={index}
              style={{
                width: WIDTH_SIZE,
                alignItems: 'center',
              }}>
              <Animated.View
                key={index}
                style={[
                  {
                    borderRadius: moderateScale(15),
                    backgroundColor: '#fff',
                    shadowColor: 'white',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 10,
                    height: verticalScale(180),
                    width: '100%',
                  },
                  animationStyle,
                ]}>
                <Image
                  style={{
                    width: '100%',
                    // aspectRatio: 16 / 9,
                    height: '100%',

                    borderRadius: moderateScale(15),
                  }}
                  source={{uri: item.image}}
                />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Dots */}
      {dots && (
        <View style={styles.dotsContainer}>
          {carouselItems.map((item, index) => {
            if (index === 0 || index === carouselItems.length - 1) {
              return null;
            }
            let currentDotSize = dotSize;
            let currentDotColor = dotColor;

            // Set active dot size and color
            if (index === activeIndex) {
              currentDotSize = activeDotSize;
              currentDotColor = activeDotColor;
            }

            // Animated dot style
            const dotStyle = useAnimatedStyle(() => {
              // Calculate opacity based on scroll position
              const opacity = interpolate(
                x.value,
                [
                  (index - 1) * WIDTH_SIZE, // Previous dot
                  index * WIDTH_SIZE, // Current dot
                  (index + 1) * WIDTH_SIZE, // Next dot
                ],
                [0.4, 1, 0.4], // Opacity transitions
              );

              const animatedOpacity = withTiming(opacity, {
                duration: 500,
                easing: Easing.linear,
              });

              return {
                opacity: Math.max(animatedOpacity, 0.4), // Ensure opacity never goes below 0.4
              };
            });

            return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
          })}
        </View>
      )}
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
    width: windowWidth * 0.02,
    backgroundColor: COLORS.charcoal,
    height: windowWidth * 0.02,
  },
});
