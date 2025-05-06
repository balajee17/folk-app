import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';
import {horizontalScale} from '../styles/MyStyles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({percentage = 0, circleColor, progressColor}) => {
  const size = horizontalScale(30);
  const strokeWidth = horizontalScale(4);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);

  useEffect(() => {
    // Animate progress from 0 to target value
    progress.value = withTiming(percentage, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference - (circumference * progress.value) / 100,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background ring */}
        <Circle
          stroke={circleColor}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated foreground circle */}
        <AnimatedCircle
          stroke={progressColor}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
});

export default CircularProgress;
