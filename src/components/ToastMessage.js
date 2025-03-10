import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {COLORS, FONTS, SIZES, verticalScale} from '../styles/MyStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ToastMessage = ({toast}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(100)).current; // Progress Bar Animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 0, // Progress shrinks to 0
        duration: 3500,
        useNativeDriver: false, // Progress bar width needs `layout` updates
      }),
    ]).start();

    // Auto close the toast after 3 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {transform: [{scale: scaleAnim}], opacity: opacityAnim},
      ]}>
      <View style={styles.glowEffect} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.iconContainer(toast?.type)}>
          <AntDesign
            name={
              toast?.type === 'warning'
                ? 'warning'
                : toast?.type === 'success'
                ? 'checkcircle'
                : toast?.type === 'error'
                ? 'exclamationcircle'
                : 'infocirlce'
            }
            size={20}
            color={
              toast?.type === 'warning'
                ? COLORS.warningPB
                : toast?.type === 'success'
                ? COLORS.successPB
                : toast?.type === 'error'
                ? COLORS.errorPB
                : COLORS.infoPB
            }
          />
        </View>

        <Text numberOfLines={2} style={styles.toastText}>
          {toast?.message || 'Oops! Something went wrong.'}
        </Text>
      </View>

      {/* Progress Bar */}
      <Animated.View
        style={[
          styles.progressBar(toast?.type),
          {
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    position: 'absolute',
    bottom: verticalScale(10),
    left: '5%',
    right: '5%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },

  glowEffect: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.5,
    zIndex: -1,
  },

  toastText: {
    color: COLORS.black,
    fontSize: SIZES.l,
    fontFamily: FONTS.poppinsSemiBold,
    marginLeft: 10,
    width: '87%',
  },

  progressBar: toastType => ({
    height: 4,
    backgroundColor:
      toastType === 'warning'
        ? COLORS.warningPB
        : toastType === 'success'
        ? COLORS.successPB
        : toastType === 'error'
        ? COLORS.errorPB
        : COLORS.infoPB, // Progress bar color
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  }),
  iconContainer: toastType => ({
    width: 35,
    height: 35,
    backgroundColor:
      toastType === 'warning'
        ? COLORS.warningBg
        : toastType === 'success'
        ? COLORS.successBg
        : toastType === 'error'
        ? COLORS.errorBg
        : COLORS.infoBg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
