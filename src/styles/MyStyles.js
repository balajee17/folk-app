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
  charcoal: '#484C52',
  dolphin: '#5C5D6C',
  mirage: '#1C1D26',
  osloGrey: '#898989',
  paleYellow: '#F7F8E6',
  gableGreen: '#1B2830',
  golden: '#DAC056',
  ceramic: '#ffffff66',
  midGrey: '#626262',
  gunsmoke: '#888786',
  windowsBlue: '#308AAF',
  whiteSmoke: '#f1ebeb80',
  davyGrey: 'rgba(69, 90, 100, 0.08)',
  inputBg: 'rgba(234, 236, 220, 1)',
  highLightColor: '#D1D1D1',
  atlantis: '#B1C63C',
  citrine: '#E4D721',
  diesel: '#C8C8C8',
  watermelon: '#FF5858',
  chromeWhite: '#EAECDC',
  candlelight: '#F1E624',
  cloud: '#C2C2C2',
  modalBg: 'rgba(0, 0, 0, 0.3)',
  dropDownBg: '#EDEDED',
  silkBlue: '#4A83B5',
  whatsapp: '#19D06C',
  dodger: '#358AE0',
  link: '#00d2ff',
  backBg: 'rgba(234, 236, 220, 0.14)',
  silver: '#CECECE',
  moss: '#729F4D',
  scannerBg: '#111',

  // New COLORS
  header: '#416EBD',
  shimmerBg: '#B0B0B0',
  // # Toast COLORS
  successBg: '#E2FEE5',
  successPB: '#2DD640',
  warningBg: '#FFEFDF',
  warningPB: '#F19106',
  errorBg: '#FFEAEB',
  errorPB: '#E63434',
  infoBg: '#DBEAFE',
  infoPB: '#3B82F6',
  purple: '#7F85E6',
  halfTransparent: 'rgba(0, 0, 0, 0.5)',
  loginBtn: 'rgba(136, 177, 96, 1)',
  shareBtn: 'rgba(0, 0, 0, 0.71)',
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
  interBold: 'InterBold',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsRegular: 'Poppins-Regular',
  ysabeauInfantRegular: 'YsabeauInfant-Regular',
  LufgaBold: 'LufgaBold',
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
    color: COLORS.gableGreen,
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
    backgroundColor: COLORS.charcoal,
    width: '93%',
    alignSelf: 'center',
    padding: '2%',
    borderRadius: moderateScale(26),
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
    width: '100%',
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
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.diesel,
    width: '100%',
  },
  amtTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    width: '100%',
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
  },
  iconStyle: {
    height: horizontalScale(35),
    width: horizontalScale(35),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  registerBtn: {
    height: verticalScale(40),
    width: horizontalScale(100),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    backgroundColor: COLORS.atlantis,
    justifyContent: 'center',
  },
  registerTxt: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
    top: -1,
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
    width: horizontalScale(35),
    height: horizontalScale(35),
    marginRight: '5%',
  },
  announceTxt: {
    fontSize: SIZES.xl,
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    width: '80%',
  },

  // # Image Upload Modal Styles
  modal:{
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container:{
    backgroundColor: COLORS.white,
    padding: '4%',
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),          
    width: screenWidth,
    justifyContent: 'space-around',
  },
  closeBtn: {
    alignItems: 'center',
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  modalTitle:{
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    textAlign: 'center',
  },
  uploadTypeCont:{marginVertical: screenHeight * 0.04,  alignItems: 'center',flexDirection:'row',justifyContent:'space-around'},
  cameraBtn:{
    borderWidth: 1,
    borderColor: COLORS.dropDownBg,
    paddingVertical: 15,
    width:  '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.dropDownBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnTxt:{
    fontFamily: FONTS.urbanistMedium,
    color: COLORS.black,
    marginTop: verticalScale(8),
  },
};
