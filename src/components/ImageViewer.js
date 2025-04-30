import {Image, Modal, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  COLORS,
  moderateScale,
  screenHeight,
  screenWidth,
  verticalScale,
  windowHeight,
  windowWidth,
} from '../styles/MyStyles';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ImageViewer = ({imageURL, closeImage}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 300});
  }, []);

  const requestToClose = () => {
    opacity.value = withTiming(0, {duration: 200});
    closeImage();
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd(() => {
      if (translateY.value > 150) {
        runOnJS(requestToClose)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const overlayStyle = useAnimatedStyle(() => {
    const clampedY = Math.min(translateY.value, 150); // Cap drag value at 150
    const dynamicOpacity = interpolate(
      clampedY,
      [0, 150],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: 'rgba(0, 0, 0, 1)', // This doesn't affect opacity, so:
      opacity: dynamicOpacity, // This fades the entire background
    };
  });

  return (
    <View style={[styles.container]}>
      {/* Fullscreen image */}
      <Animated.View style={[styles.fullscreenOverlay, overlayStyle]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[styles.fullscreenImageContainer, animatedStyle]}>
            <Image
              source={{uri: imageURL}}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    marginTop: verticalScale(70),
  },
  fullscreenOverlay: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fullscreenImageContainer: {
    width: windowWidth * 0.9,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
});
