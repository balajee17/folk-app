import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {percentageToPixel, resHeight, windowWidth} from '../styles/MyStyles';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const CustomCarousel = ({carouselItems, autoScroll}) => {
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

  const WIDTH_SIZE = windowWidth * 0.8;
  const SPACER = (windowWidth - WIDTH_SIZE) / 2;

  const x = useSharedValue(0);
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const isAutoScrolling = useRef(true);
  const autoScrollInterval = useRef(null);

  // # onScroll Event
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
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
                  borderRadius: resHeight('2%'),
                  backgroundColor: '#fff',
                  shadowColor: 'white',
                  shadowOffset: {width: 0, height: 4},
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 10,
                  height: resHeight('22%'),
                  width: '100%',
                },
                animationStyle,
              ]}>
              <Image
                style={{
                  width: '100%',
                  // aspectRatio: 16 / 9,
                  height: '100%',

                  borderRadius: resHeight('2%'),
                }}
                source={{uri: item.image}}
              />
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({});
