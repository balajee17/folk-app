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

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};

// @ SIZES
export const SIZES = {
  xs: moderateScale(8), // Captions, disclaimers, or secondary text.
  s: moderateScale(10), // Helper text, labels, or input placeholders.
  m: moderateScale(12), // Body text for standard content.
  l: moderateScale(14), // Subheadings or slightly emphasized text.
  xl: moderateScale(16), // Section headings or titles.
  subTitle: moderateScale(18), // SubTitles
  xxl: moderateScale(20), // Main titles or prominent headings.
  xxxl: moderateScale(22), // Hero headers or standout call-to-actions.
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
  ceramic: '#ffffff66',
  gunsmoke: '#888786',
  windowsBlue: '#308AAF',
  whiteSmoke: '#f1ebeb80',
  davyGrey: 'rgba(69, 90, 100, 0.08)',
  inputBg: 'rgba(234, 236, 220, 1)',
  shimmerBg: '#888786',
  highLightColor: '#A8A8A8',
};

// @ FONTS

export let FONTS = {
  urbanistBold: 'Urbanist-Bold',
  urbanistSemiBold: 'Urbanist-SemiBold',
  urbanistMedium: 'Urbanist-Medium',
  urbanistRegular: 'Urbanist-Regular',
  aladinRegular: 'Aladin-Regular',
  interMedium: 'Inter-Medium',
  ysabeauInfantBold: 'YsabeauInfant-Bold',
};

// @ MyStyles
export let MyStyles = {
  flex1: {flex: 1},
  titleText: {
    fontSize: SIZES.xxxl,
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
  },
  subTitleText: {
    fontSize: SIZES.subTitle,
    color: COLORS.gableGreen,
    fontFamily: FONTS.urbanistSemiBold,
  },
  scrollView: {
    paddingBottom: moderateScale(8),
    backgroundColor: COLORS.paleYellow,
    // flexGrow: 1,
  },
  marTop3Per: {marginTop: '3%'},
  quotesImg: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(15),
  },
  updatesTextCont: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: moderateScale(15),
  },
  updatesBgImg: {
    marginTop: verticalScale(10),
    width: '100%',
    borderRadius: moderateScale(15),
  },
  updateTxt: {
    fontSize: SIZES.l,
    color: COLORS.white,
    fontFamily: FONTS.urbanistMedium,
    marginTop: '2%',
    lineHeight: 20,
  },
  paddingHor10: {paddingHorizontal: moderateScale(10)},
  updateTitle: {
    fontSize: SIZES.xxxl,
    textAlign: 'center',
    color: COLORS.golden,
    fontFamily: FONTS.aladinRegular,
  },
  gradient: {
    borderRadius: moderateScale(15),
  },
  marTop10: {marginTop: verticalScale(10)},
  youtubeCont: {
    borderRadius: moderateScale(15),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1%',
    paddingVertical: '2%',
    width: '100%',
    paddingHorizontal: '3%',
  },
  leftImgCont: {
    width: '43%',
  },
  rightImgCont: {
    width: '54%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.paleYellow,
    paddingHorizontal: moderateScale(10),
  },
};
