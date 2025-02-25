import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const ToastMessage = ({toast}) => {
  const slideY = useSharedValue(-50);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    slideY.value = withTiming(0, {duration: 400});
    scale.value = withTiming(1, {duration: 400});
    opacity.value = withTiming(1, {duration: 400});

    setTimeout(() => {
      slideY.value = withTiming(-50, {duration: 400});
      scale.value = withTiming(0.8, {duration: 400});
      opacity.value = withTiming(0, {duration: 400});
    }, toast.duration || 4000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: slideY.value}, {scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <View style={styles.glowEffect} />
      <Text style={styles.toastText}>{toast.message}</Text>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: '5%',
    right: '5%',
    shadowColor: '#FFCC00',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  glowEffect: {
    width: 6,
    height: '100%',
    backgroundColor: '#FFCC00',
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
