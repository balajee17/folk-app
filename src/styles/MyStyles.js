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
  // # FINAL Color theme Dynamic
  header: '#4571BF',
  bottomTab: '#E0C24A',
  button: '#B1C63C',
  card: '#F6F6F6',
  eventCard: '#40414F',
  announcementCard: '#2D3B60',
  tabIndicator: '#B1C63C',

  // # Toast COLORS
  successBg: '#E2FEE5',
  successPB: '#2DD640',
  warningBg: '#FFEFDF',
  warningPB: '#F19106',
  errorBg: '#FFEAEB',
  errorPB: '#E63434',
  infoBg: '#DBEAFE',
  infoPB: '#3B82F6',

  // # other color
  black: '#000',
  white: '#fff',
  border: '#DBDBDB',
  btIcon: '#4A4A4A',
  backBg: 'rgba(234, 236, 220, 0.14)',
  loginBtn: '#88B160',
  whiteSmoke: '#f1ebeb80',
  gunsmoke: '#888786',
  shadow: 'rgba(0,0,0,0.2)',
  transparent: '#0000',
  whiteGlassy: 'rgba(255, 255, 255, 0.2)',
  textLabel: '#5D5D5D',
  inptBg: '#F8F8F8',
  citrine: '#E4D721',
  windowsBlue: '#308AAF',
  watermelon: '#FF5858',
  modalBg: 'rgba(0, 0, 0, 0.3)',
  whatsapp: '#19D06C',
  link: '#00d2ff',
  scannerBg: '#111',
  shimmerBg: '#B0B0B0',
  highLightColor: '#F8F8F8',
  purple: '#7F85E6',
  halfTransparent: 'rgba(0, 0, 0, 0.5)',
  blackOpacity01: 'rgba(0, 0, 0, 0.1)',
  shareBtn: 'rgba(0, 0, 0, 0.71)',
  borderColor: 'rgba(0, 0, 0, 0.03)',
  logoutColor: '#F8512B',
  imageViewBg: 'rgba(0, 0, 0, 0.95)',
};

// @ FONTS

export let FONTS = {
  urbanistBold: 'Urbanist-Bold',
  urbanistSemiBold: 'Urbanist-SemiBold',
  urbanistMedium: 'Urbanist-Medium',
  urbanistRegular: 'Urbanist-Regular',
  ysabeauInfantBold: 'YsabeauInfant-Bold',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsRegular: 'Poppins-Regular',
  ysabeauInfantRegular: 'YsabeauInfant-Regular',
  LufgaBold: 'LufgaBold',
  poppinsBold: 'Poppins-Bold',
};

// @ MyStyles
export let MyStyles = {
  flex1: {flex: 1},
  titleText: {
    fontSize: SIZES.xxxl,
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
    width: '75%',
    textAlign: 'center',
  },
  subTitleText: {
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    fontFamily: FONTS.poppinsSemiBold,
  },
  scrollView: {
    paddingBottom: moderateScale(8),
    backgroundColor: COLORS.white,
  },
  marTop3Per: {marginTop: '3%'},
  quotesImg: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'stretch',
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
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
    width: '100%',
  },
  paddingHor10: {paddingHorizontal: moderateScale(10)},
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
    marginTop: verticalScale(15),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1%',
    paddingTop: '2%',
    width: '100%',
  },
  leftImgCont: {
    width: '43%',
    justifyContent: 'space-around',
  },
  rightImgCont: {
    width: '54%',
    justifyContent: 'space-around',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: moderateScale(10),
  },
  contentCont: {backgroundColor: COLORS.white, flex: 1},
  card: {
    backgroundColor: COLORS.card,
    width: '93%',
    alignSelf: 'center',
    padding: '3%',
    borderRadius: moderateScale(10),
  },
  cdImage: {
    width: '100%',
    height: verticalScale(150),
    alignSelf: 'center',
    borderRadius: moderateScale(20),
  },
  dateModeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2%',
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(6),
  },
  dateCont: {
    backgroundColor: COLORS.citrine,
    width: horizontalScale(45),
    height: horizontalScale(45),
    alignItems: 'center',
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    paddingVertical: '4%',
  },
  dateTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
  },
  monthTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.s,
    color: COLORS.black,
  },
  modeCont: {
    backgroundColor: COLORS.white,
    width: '20%',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(13),
    padding: '2%',
  },
  modeTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.m,
    color: COLORS.black,
  },
  boxContentContainer: {
    width: '40%',
    paddingHorizontal: '2%',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '100%',
  },
  descripTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistMedium,
    color: COLORS.border,
    width: '100%',
  },
  amtTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
  },
  iconStyle: {
    height: horizontalScale(30),
    width: horizontalScale(30),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    margin: '5%',
  },
  registerBtn: {
    height: verticalScale(30),
    width: horizontalScale(80),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    backgroundColor: COLORS.button,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: '4%',
  },
  registerTxt: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
  },
  comingSoonImg: {
    width: windowWidth * 0.9,
    height: screenHeight * 0.5,
    alignSelf: 'center',
    marginTop: '25%',
    resizeMode: 'contain',
  },
  announceIcnTxtCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  announceIcn: {
    width: '100%',
    height: verticalScale(60),
    marginRight: '5%',
    resizeMode: 'stretch',
  },
  announceTxt: {
    fontSize: SIZES.subTitle,
    color: COLORS.white,
    fontFamily: FONTS.urbanistBold,
    width: '80%',
  },

  // # Image Upload Modal Styles
  modal: {
    flex: 1,
    backgroundColor: COLORS.modalBg,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: '4%',
    overflow: 'hidden',
  },
  closeBtn: {
    alignItems: 'center',
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  modalTitle: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    textAlign: 'center',
  },
  uploadTypeCont: {
    marginVertical: screenHeight * 0.04,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cameraBtn: {
    borderWidth: 1,
    borderColor: COLORS.inptBg,
    paddingVertical: 15,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.inptBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnTxt: {
    fontFamily: FONTS.urbanistMedium,
    color: COLORS.black,
    marginTop: verticalScale(8),
  },
  shareBtn: {
    backgroundColor: COLORS.backBg,
    width: horizontalScale(35),
    height: horizontalScale(35),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '4%',
    right: '7%',
  },
  noticeCard: bgColor => ({
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: bgColor || COLORS.announcementCard,
    borderRadius: moderateScale(15),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),

  imgCont: {
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    width: '40%',
    height: verticalScale(160),
  },
  image: {
    borderRadius: moderateScale(6),
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  dateTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
    color: COLORS.white,
  },
  avlSlotTxt: {
    fontFamily: FONTS.urbanistRegular,
    fontSize: SIZES.m,
    color: COLORS.white,
    textAlign: 'right',
  },
  avlAmtCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  dateModeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '2%',
  },
};
