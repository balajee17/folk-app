import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated as RNAnimated} from 'react-native';

const AnimatedCircularBorder = ({size = 120, color = '#007AFF'}) => {
  const scaleAnim = useRef(new RNAnimated.Value(1)).current;
  const opacityAnim = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    console.log('AnimatedCircularBorder mounted, starting animation');
    
    const startAnimation = () => {
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      
      RNAnimated.parallel([
        RNAnimated.timing(scaleAnim, {
          toValue: 2,
          duration: 2000,
          useNativeDriver: true,
        }),
        RNAnimated.timing(opacityAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Restart animation
        startAnimation();
      });
    };

    startAnimation();
  }, []);

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      {/* Static circle for testing */}
      <View style={[styles.staticCircle, {width: size, height: size, borderColor: color}]} />
      
      <RNAnimated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderColor: color,
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  staticCircle: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 5,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 5,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
});

export default AnimatedCircularBorder; 