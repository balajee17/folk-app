import React, {useEffect, useState} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  COLORS,
  FONTS,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import {StyleSheet, TextInput, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {screenNames} from '../constants/ScreenNames';

const FloatingInput = React.forwardRef((props, ref) => {
  const {
    txtInptStyle,
    cntnrStyle,
    floatingTxtCntnr,
    label,
    labelStyle,
    value,
    leftIcon,
    rightIcon,
    moveLblInX,
    rightIconStyle,
    data,
    drpdwnContStyle,
    type = 'txtInput',
    drpDwnStyle,
    screen,
  } = props;
  const [focused, setFocused] = useState(false);

  const labelAnimationValue = useSharedValue(0);

  useEffect(() => {
    if (value && typeof value !== 'object') {
      animateLabel('UP');
    } else if (!focused && !!value) {
      animateLabel('DOWN');
    }
  }, [value, focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -labelAnimationValue.value + 1}],
    };
  });

  const animateLabel = (direction = 'UP') => {
    labelAnimationValue.value = withTiming(direction === 'DOWN' ? 0 : 1, {
      duration: 200,
    });
  };

  const textTransformX = useDerivedValue(() => {
    return interpolate(
      labelAnimationValue.value,
      [0, 1],
      [0, moveLblInX !== undefined ? moveLblInX : -1],
    );
  });

  const yValue1 = verticalScale(38);
  const yValue2 = verticalScale(23);

  const textTransformY = useDerivedValue(() => {
    return interpolate(
      labelAnimationValue.value,
      [0, 1],
      [0, screenNames.login === screen ? -yValue1 : -yValue2],
    );
  });

  const onFocus = () => {
    setFocused(true), animateLabel();
  };

  const onBlur = () => {
    setFocused(false);
    if (!value) {
      animateLabel('DOWN');
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        cntnrStyle,
        props?.multiline && {height: verticalScale(100)},
      ]}>
      {leftIcon && leftIcon}
      <Animated.View
        style={[
          styles.floatingTxtCntnr,
          floatingTxtCntnr,
          {
            transform: [
              {
                translateX: textTransformX,
              },
              {
                translateY: textTransformY,
              },
            ],
          },
        ]}>
        <Animated.Text
          style={[
            styles.floatingText(focused, value),
            {
              fontSize: focused || value ? SIZES.m : SIZES.l,
            },
            animatedStyle,
            labelStyle,
            {top: props?.multiline ? -12 : 0},
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
      {type === 'txtInput' ? (
        <TextInput
          ref={ref}
          cursorColor={COLORS.button}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor={COLORS.button}
          style={[
            styles.txtInptStyle(props?.disabled),
            txtInptStyle,
            props?.multiline && {
              textAlignVertical: 'top',
            },
          ]}
          {...props}
        />
      ) : (
        <Dropdown
          ref={ref}
          style={[styles.dropdownStyle, drpDwnStyle]}
          selectedTextStyle={styles.drpdwnSelTxt(props?.disabled)}
          itemTextStyle={[styles.drpdwnItemTxt]}
          containerStyle={[styles.drpdwnCont, drpdwnContStyle]}
          activeColor={COLORS.button}
          placeholder=""
          data={data}
          labelField="label"
          valueField="value"
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
      )}

      {rightIcon && (
        <View style={[styles.rightIconCont, rightIconStyle]}>{rightIcon}</View>
      )}
    </View>
  );
});

export default FloatingInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: verticalScale(54),
    position: 'relative',
    marginTop: '4%',
    backgroundColor: COLORS.inptBg,
  },
  floatingTxtCntnr: {
    position: 'absolute',
    top: '30%',
    left: '2%',
    zIndex: -999,
    backgroundColor: 'transparent',
    paddingHorizontal: '2%',
    width: '60%',
  },

  floatingText: (focused, value) => ({
    paddingStart: '2%',
    color: focused ? COLORS.windowsBlue : value ? '#000' + 8 : COLORS.black,
    fontFamily: FONTS.urbanistSemiBold,
  }),
  txtInptStyle: disabled => ({
    fontFamily: FONTS.urbanistRegular,
    width: '80%',
    color: disabled ? COLORS.textLabel : COLORS.black,
  }),
  rightIconCont: {
    width: '10%',
    alignSelf: 'center',
  },
  dropdownStyle: {
    width: '100%',
    marginStart: 0,
    paddingRight: '6%',
    height: verticalScale(58),
  },
  drpdwnSelTxt: disabled => ({
    fontFamily: FONTS.urbanistRegular,
    color: disabled ? COLORS.textLabel : COLORS.black,
  }),
  drpdwnItemTxt: {
    color: COLORS.black,
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistRegular,
  },
  drpdwnCont: {
    backgroundColor: COLORS.inptBg,
    borderRadius: moderateScale(14),
    overflow: 'hidden',
    maxHeight: verticalScale(200),
  },
});
