import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
import ImageViewer from './ImageViewer';

const OFF_SET = moderateScale(25);
const ITEM_WIDTH = windowWidth - OFF_SET * 2 + horizontalScale(2);

const ITEM_HEIGHT = verticalScale(400);
const Border_Radius = moderateScale(15);

const ParallexCarousel = ({carouselItems, autoScroll}) => {
  const scrollX = useSharedValue(0);
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const autoScrollInterval = useRef(null);
  const isAutoScrolling = useRef(true);

  const [imageViewer, setImageViewer] = useState({url: '', visible: false});

  useEffect(() => {
    if (autoScroll) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [carouselItems]);

  // # Start Auto Scroll
  const startAutoScroll = () => {
    if (
      !isAutoScrolling.current ||
      !scrollRef.current ||
      carouselItems?.length === 0
    )
      return;

    const totalSteps = 100; // Increased for smoother animation
    const intervalDuration = 6000; // Increased for slower overall pace

    const smoothScroll = (startOffset, endOffset) => {
      let step = 0;

      const scrollStep = () => {
        step++;
        if (step > totalSteps) {
          scrollRef?.current?.scrollTo({x: endOffset, animated: true});
          return;
        }

        const increment = (endOffset - startOffset) / totalSteps;
        const currentOffset = startOffset + increment * step;

        scrollRef?.current?.scrollTo({x: currentOffset, animated: false});
        requestAnimationFrame(scrollStep);
      };

      requestAnimationFrame(scrollStep);
    };

    autoScrollInterval.current = setInterval(() => {
      const currentOffset = currentIndex.current * ITEM_WIDTH;
      currentIndex.current = (currentIndex.current + 1) % carouselItems?.length;
      const nextOffset = currentIndex.current * ITEM_WIDTH;

      smoothScroll(currentOffset, nextOffset);
    }, intervalDuration);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
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
        overScrollMode={'never'}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        snapToInterval={ITEM_WIDTH}
        bounces={false}
        disableIntervalMomentum
        scrollEventThrottle={16}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          if (autoScroll) {
            stopAutoScroll();
            isAutoScrolling.current = false;
          }
        }}
        onMomentumScrollEnd={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          currentIndex.current = Math.round(offsetX / ITEM_WIDTH); // Update index after manual scroll
          if (autoScroll) {
            isAutoScrolling.current = true;
            startAutoScroll();
          }
        }}
        onTouchStart={() => {
          if (autoScroll) {
            stopAutoScroll();
          }
        }}
        onTouchEnd={() => {
          if (autoScroll) {
            startAutoScroll();
          }
        }}>
        {carouselItems?.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const translateStyle = useAnimatedStyle(() => {
            const translate = interpolate(
              scrollX.value,
              inputRange,
              [0.97, 0.85, 0.97],
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

          const overlayStyle = useAnimatedStyle(() => {
            const overlayOpacity = interpolate(
              scrollX.value,
              inputRange,
              [0.85, 0, 0.85],
              {
                extrapolate: Extrapolation.CLAMP,
              },
            );

            return {
              backgroundColor: COLORS.halfTransparent,
              opacity: overlayOpacity,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: Border_Radius,
            };
          });

          const translateImgStyle = useAnimatedStyle(() => {
            const translate = interpolate(scrollX.value, inputRange, [
              -ITEM_WIDTH * 0.2,
              0.87,
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
                    index === carouselItems?.length - 1 ? OFF_SET : undefined,
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  overflow: 'hidden',
                  shadowColor: COLORS.white,
                },
                translateStyle,
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  stopAutoScroll();
                  isAutoScrolling.current = false;
                  setImageViewer({url: item?.link, visible: true});
                }}>
                <Animated.View style={[translateImgStyle]}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: moderateScale(15),
                      overflow: 'hidden',
                      resizeMode: 'cover',
                    }}
                    source={{
                      uri: item?.link,
                    }}
                  />
                  <Animated.View style={overlayStyle} />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
      {/* // # PAGINATION DOTS */}
      <ParallexPaginationDots carouselItems={carouselItems} scrollX={scrollX} />

      {/* // # IMAGE VIEWER */}
      {imageViewer?.visible && (
        <ImageViewer
          imageURL={imageViewer?.url}
          closeImage={() => {
            setImageViewer({url: '', visible: false});
            isAutoScrolling.current = true;
            startAutoScroll();
          }}
        />
      )}
    </View>
  );
};

export default ParallexCarousel;

const styles = StyleSheet.create({
  ParallexCarouselCont: {
    marginTop: verticalScale(15),
  },
});
