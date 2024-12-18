import {Dimensions, PixelRatio} from 'react-native';

export let windowWidth = Dimensions.get('window').width;

export let windowHeight = Dimensions.get('window').height;

export let screenWidth = Dimensions.get('screen').width;

export let screenHeight = Dimensions.get('screen').height;

// @ Converts provided width percentage to independent pixel (dp).
export const resWidth = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((windowWidth * elemWidth) / 100);
};

// @ Converts provided height percentage to independent pixel (dp).
export const resHeight = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((windowHeight * elemHeight) / 100);
};

//@ Scale the text size based on screen width
export const scaleFontSize = size => {
  const {width} = Dimensions.get('window');
  const standardScreenWidth = 375; // base iPhone width
  return (size * width) / standardScreenWidth;
};

// @ SIZES
export const SIZES = {
  xs: scaleFontSize(8), // Captions, disclaimers, or secondary text.
  s: scaleFontSize(12), // Helper text, labels, or input placeholders.
  m: scaleFontSize(14), // Body text for standard content.
  l: scaleFontSize(16), // Subheadings or slightly emphasized text.
  xl: scaleFontSize(20), // Section headings or titles.
  subTitle: scaleFontSize(22), // SubTitles
  xxl: scaleFontSize(24), // Main titles or prominent headings.
  xxxl: scaleFontSize(32), // Hero headers or standout call-to-actions.
};

export const percentageToPixel = percentage => {
  return (percentage / 100) * windowWidth;
};

// @ COLORS
export let COLORS = {
  white: '#FFF',
  black: '#000',
  transparent: '#0000',
  charcoal: '#3F404E',
  dolphin: '#5C5D6C',
  mirage: '#1C1D26',
  osloGrey: '#898989',
  paleYellow: '#F7F8E6',
  gableGreen: '#1B2830',
  golden: '#FFC300',
};

// @ FONTS

export let FONTS = {
  urbanistBold: 'Urbanist-Bold',
  urbanistSemiBold: 'Urbanist-SemiBold',
  urbanistMedium: 'Urbanist-Medium',
};

// @ MyStyles
export let MyStyles = {
  flex1: {flex: 1},
  titleText: {
    fontSize: SIZES.xxl,
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
  },
  subTitleText: {
    fontSize: SIZES.subTitle,
    color: COLORS.gableGreen,
    fontFamily: FONTS.urbanistSemiBold,
  },
};

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};
