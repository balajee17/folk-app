import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import {getImage} from '../utils/ImagePath';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ICONS = [
  {
    id: 'DB1',
    name: 'Home',
    image: getImage.home,
    activeImage: getImage.homeActive,
  },
  {
    id: 'B2',
    name: 'Events',
    image: getImage.calendar,
    activeImage: getImage.calendarActive,
  },
  {
    id: 'B3',
    name: 'Courses',
    image: getImage.book,
    activeImage: getImage.bookActive,
  },
  {
    id: 'B4',
    name: 'Connect',
    image: getImage.account,
    activeImage: getImage.accountActive,
  },
];

const TAB_WIDTH = windowWidth / ICONS.length;
const ACTIVE_CIRCLE_SIZE = horizontalScale(50);

const CustomBottomTab = ({selIcon, setSelIcon}) => {
  const translateX = useSharedValue(0);

  const {globalState, setGlobalState} = useAppContext();
  const {bottomTabColor} = globalState;

  const handlePress = (id, index) => {
    setSelIcon(id);
    translateX.value = withSpring(index * TAB_WIDTH, {
      damping: 10,
      stiffness: 100,
    });
  };

  // # Animated Style for Moving Circle
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  useEffect(() => {
    const index =
      selIcon === 'DB1'
        ? 0
        : selIcon === 'B2'
        ? 1
        : selIcon === 'B3'
        ? 2
        : selIcon === 'B4'
        ? 3
        : 0;

    handlePress(selIcon, index);
  }, [selIcon]);

  {
  }

  return (
    <View style={styles.btTabContainer}>
      {/* // @ Active Circle */}
      {selIcon !== '' && (
        <Animated.View
          style={[styles.activeCircle(bottomTabColor), circleStyle]}>
          <Animated.Image
            source={
              selIcon === 'DB1'
                ? getImage.homeActive
                : selIcon === 'B2'
                ? getImage.calendarActive
                : selIcon === 'B3'
                ? getImage.bookActive
                : selIcon === 'B4'
                ? getImage.accountActive
                : getImage.homeActive
            }
            style={[styles.icon]}
          />
        </Animated.View>
      )}
      <View style={styles.tabContainer}>
        {/* // @ Tab Buttons */}
        {ICONS?.map((item, index) => {
          const isActive = item?.id === selIcon;

          const opacityAnim = useAnimatedStyle(() => ({
            opacity: isActive ? withSpring(0) : withSpring(1),
          }));

          const textAnimation = useAnimatedStyle(() => ({
            fontSize: isActive ? SIZES.l : SIZES.m,
            color: interpolateColor(
              isActive ? 1 : 0,
              [0, 1],
              [COLORS.btIcon, bottomTabColor || COLORS.bottomTab],
            ),
          }));

          return (
            <TouchableOpacity
              onPress={() => handlePress(item?.id, index)}
              activeOpacity={0.6}
              style={[styles.tabButton]}>
              <Animated.Image
                source={isActive ? item?.activeImage : item?.image}
                style={[styles.icon, opacityAnim]}
              />
              <Animated.Text
                style={[
                  styles.iconTxt,
                  textAnimation,
                  {
                    fontFamily:
                      item?.id === selIcon
                        ? FONTS.poppinsSemiBold
                        : FONTS.poppinsRegular,
                  },
                ]}>
                {item?.name}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* // @ Shadow Effect */}
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'transparent']}
        style={styles.shadow}
        start={{x: 0, y: 1.8}}
        end={{x: 0, y: 0}}
      />
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  btTabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS === 'ios' ? '5%' : 0,
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    width: TAB_WIDTH,
    padding: '1%',
  },
  iconTxt: {
    fontSize: SIZES.m,
    color: COLORS.btIcon,
    fontFamily: FONTS.poppinsRegular,
    marginTop: '5%',
  },
  shadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: verticalScale(25),
    top: verticalScale(-25),
  },
  activeCircle: color => ({
    backgroundColor: color || COLORS.bottomTab,
    width: ACTIVE_CIRCLE_SIZE,
    height: ACTIVE_CIRCLE_SIZE,
    borderRadius: ACTIVE_CIRCLE_SIZE / 2,
    position: 'absolute',
    top: verticalScale(-25),
    zIndex: 99,
    borderWidth: 3,
    borderColor: COLORS.white,
    left: TAB_WIDTH / 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  }),
  icon: {
    width: horizontalScale(25),
    height: horizontalScale(25),
  },
});
