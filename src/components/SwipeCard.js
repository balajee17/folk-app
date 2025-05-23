import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const SwipeCard = ({
  newData,
  setNewData,
  currentIndex,
  setCurrentIndex,
  animatedValue,
  item,
  index,
  quotesData,
}) => {
  const swipeXArray = useSharedValue(0);
  const swipeDirection = useSharedValue(0);

  const swipeAnimation = useAnimatedStyle(() => {
    const isCurrentItem = currentIndex === index;
    const rotateZ = interpolate(
      swipeXArray.value || 0,
      [0, windowWidth],
      [0, 20],
    );
    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-30, 0],
    );
    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1],
    );

    return {
      transform: [
        {translateX: swipeXArray.value || 0},
        {scale: isCurrentItem ? 1 : scale},
        {translateY: isCurrentItem ? 0 : translateY},
        {rotateZ: `${isCurrentItem ? rotateZ : 0}deg`},
      ],
    };
  });
  const pan = Gesture.Pan()
    .onUpdate(e => {
      const isSwipeRight = e.translationX > 0;
      swipeDirection.value = isSwipeRight ? 1 : -1;

      if (currentIndex === index) {
        swipeXArray.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, windowWidth],
          [index, index + 1],
        );
      }
    })
    .onEnd(e => {
      if (currentIndex === index) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          swipeXArray.value = withTiming(
            windowWidth * swipeDirection.value * 2,
            {},
            () => {
              runOnJS(setNewData)([...newData, newData[currentIndex]]);
              runOnJS(setCurrentIndex)(currentIndex + 1);
            },
          );
          animatedValue.value = withTiming(currentIndex + 1);
        } else {
          swipeXArray.value = withTiming(0, {
            duration: 500,
          });
          animatedValue.value = withTiming(currentIndex);
        }
      }
    });

  return (
    <GestureDetector key={item?.id} gesture={pan}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: newData.length - index,
            width: '100%',
            height: verticalScale(350),
          },
          swipeAnimation,
        ]}>
        <ImageBackground
          source={{uri: item?.link}}
          resizeMode="stretch"
          imageStyle={{borderRadius: moderateScale(20)}}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              width: '40%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: '6%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.31)',
                width: horizontalScale(45),
                height: horizontalScale(45),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: moderateScale(30),
              }}
              activeOpacity={0.6}>
              <Feather
                name="download"
                size={moderateScale(30)}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.31)',
                width: horizontalScale(45),
                height: horizontalScale(45),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: moderateScale(30),
              }}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="share"
                size={moderateScale(30)}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({});
