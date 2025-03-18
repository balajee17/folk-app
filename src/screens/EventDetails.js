import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  screenHeight,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import {
  StatusBarTransp,
  useStatusBarHeight,
} from '../components/StatusBarComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {API} from '../services/API';
import {useAppContext} from '../../App';
import {useToast} from 'react-native-toast-notifications';
import Spinner from '../components/Spinner';
import {TitleShimmer} from '../components/Shimmer';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import moment from 'moment';
import {RedirectURL, toastThrottle} from '../components/CommonFunctionalities';

const EventDetails = ({route, navigation}) => {
  const statusBarHeight = useStatusBarHeight();
  const {globalState, setGlobalState} = useAppContext();
  const {profileId} = globalState;

  const [expanded, setExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [showReadMore, setShowReadMore] = useState(false);
  const [shimmer, setShimmer] = useState(true);
  const [loader, setLoader] = useState(false);
  const [amountDetails, setAmountDetails] = useState([]);
  const [coupon, setCoupon] = useState({
    code: '',
    warning: false,
    applied: false,
  });

  const {screen, eventId} = route?.params;
  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);
  useEffect(() => {
    getEventDetails();
  }, []);

  const checkDataExist = Object.keys(eventDetails || {})?.length > 0;

  const handleTextLayout = e => {
    const {lines} = e.nativeEvent;

    if (checkDataExist && lines?.length > 2) {
      setShowReadMore(true);
    }
  };

  const renderSubTitle = text => {
    return <Text style={styles.subTitle(text)}>{text}</Text>;
  };
  // # API Event Details
  const getEventDetails = async () => {
    try {
      !shimmer && setShimmer(true);
      const params = {profile_id: profileId, event_id: eventId};
      const response = await API.getEventDetails(params);

      const {data, successCode, message} = response?.data;
      console.log('Event_Details_response', data?.message);
      if (successCode === 1) {
        setEventDetails(data);
        setAmountDetails(data?.amountDetails);
      } else {
        setEventDetails({});
        toastMsg(message, 'info');
      }
      setShimmer(false);
    } catch (err) {
      setEventDetails({});
      toastMsg('', 'error');
      setShimmer(false);
      console.log('ERR-Event-Details-screen', err);
    }
  };

  // # API Apply Coupon
  const applyCoupon = async () => {
    try {
      setLoader(true);
      const params = {
        profileId: profileId,
        eventId: eventId,
        couponCode: coupon?.code,
      };
      const response = await API.applyCoupon(params);

      const {data, successCode, message} = response?.data;
      console.log('Apply_Coupon_response', data?.message);
      if (successCode === 1) {
        setCoupon(prev => ({...prev, applied: true}));
      } else {
        setCoupon(prev => ({...prev, warning: true}));
        toastMsg(message, 'info');
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-Apply_Coupon', err);
    }
  };

  // # API Register
  const register = async () => {
    const amountToPay = amountDetails?.filter(item => item?.id === 2);
    try {
      setLoader(true);
      const params = {
        profileId: profileId,
        eventId: eventId,
        offer_code: coupon?.applied ? coupon?.code : '',
        isFreeEvent: eventDetails?.Event_mode,
        pgName: 'cashFree',
        pgMode: 'Online',
        paidAmount:
          eventDetails?.Is_paid_event === 'Y' ? amountToPay?.[0]?.value : 0,
        name: globalState?.userName,
        mobileNumber: globalState?.mobileNumber,
        transactionDate: moment().format('YYYY-MM-DD H:mm:ss'),
        transactionStatus: eventDetails?.Is_paid_event === 'Y' ? 'I' : 'S',
      };
      const response = await API.eventRegister(params);

      const {data, successCode, message} = response?.data;
      console.log('Register_response', data?.message);
      if (successCode === 1) {
        if (eventDetails?.Event_mode === 'O') {
          // call payment gateway => payment status screen => back to event details
          // if amt > 0 then payment gateway
          setLoader(false);
        } else {
          resetValues();
          toastMsg(message, 'success');
          getEventDetails();
        }
      } else {
        toastMsg(message, 'info');
      }
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-Register', err);
    }
  };

  const removeCoupon = () => {
    setCoupon({code: '', applied: false, warning: false});
  };

  const resetValues = () => {
    expanded && setExpanded(false);
    setEventDetails({});
    showReadMore && setShowReadMore(false);
    setShimmer(true);
    setLoader(false);
    setAmountDetails([]);
    (coupon?.code !== '' || coupon?.warning || coupon?.applied) &&
      setCoupon({
        code: '',
        warning: false,
        applied: false,
      });
  };

  return (
    <>
      <SafeAreaView style={MyStyles.contentCont}>
        <StatusBarTransp />
        <Spinner spinnerVisible={loader} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          {!shimmer ? (
            <ImageBackground
              source={{
                uri: eventDetails?.Image,
              }}
              resizeMode="stretch"
              style={styles.bgImg}>
              {/* // # Header */}
              <View style={{marginTop: statusBarHeight}}>
                <CustomHeader
                  goBack={() => navigation.goBack()}
                  titleName={screenNames.eventDetails}
                />
              </View>

              {/* <LinearGradient
              colors={[
                COLORS.transparent,
                COLORS.transparent,
                'rgba(0,0,0,0.8)',
              ]}
              style={styles.imageOverlay}
            /> */}
            </ImageBackground>
          ) : (
            <View style={[styles.bgImg, {backgroundColor: COLORS.diesel}]} />
          )}

          {/* // @ Contents */}
          <View style={styles.contentCont}>
            {/* // @ Title Section */}
            <View style={styles.titleSec}>
              {!shimmer ? (
                <Text style={styles.title}>{eventDetails?.Title}</Text>
              ) : (
                <TitleShimmer
                  height={verticalScale(70)}
                  width={horizontalScale(250)}
                />
              )}
              {shimmer ? (
                <TitleShimmer
                  height={verticalScale(30)}
                  width={horizontalScale(60)}
                />
              ) : !!eventDetails?.Amount ? (
                <Text style={styles.amtTxt}>{eventDetails?.Amount}</Text>
              ) : (
                <></>
              )}
            </View>
            {/* // # Description */}
            {shimmer ? (
              <TitleShimmer
                height={verticalScale(25)}
                width={horizontalScale(150)}
              />
            ) : eventDetails?.Description ? (
              renderSubTitle('Description')
            ) : (
              <></>
            )}

            {shimmer ? (
              <>
                <TitleShimmer height={verticalScale(14)} width={'100%'} />
                <TitleShimmer
                  height={verticalScale(14)}
                  width={horizontalScale(200)}
                  marginBottom={verticalScale(30)}
                />
              </>
            ) : eventDetails?.Description ? (
              <Text
                numberOfLines={expanded ? undefined : 2}
                onTextLayout={handleTextLayout}
                style={styles.descripTxt}>
                {eventDetails?.Description}
              </Text>
            ) : (
              <></>
            )}
            {showReadMore && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{width: '23%'}}
                onPress={() => setExpanded(!expanded)}>
                <Text
                  style={[
                    styles.descripTxt,
                    {
                      fontFamily: FONTS.urbanistBold,
                      marginTop: 0,
                      color: COLORS.black,
                    },
                  ]}>
                  {expanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}

            {/* // # Guide, Category, Type etc... */}
            {!shimmer
              ? eventDetails?.details?.map((item, index) => {
                  return (
                    <View style={styles.lablValCont} key={index + 1}>
                      <Text style={styles.labelTxt}> {item?.label}</Text>
                      <Text style={[styles.labelTxt, styles.colon]}>:</Text>
                      <Text style={[styles.labelTxt, styles.valTxt]}>
                        {item?.value}
                      </Text>
                    </View>
                  );
                })
              : Array(2)
                  .fill(2)
                  .map((_, index) => (
                    <View
                      style={[styles.lablValCont, {width: '100%'}]}
                      key={index}>
                      <TitleShimmer />
                      <TitleShimmer />
                    </View>
                  ))}

            {/* // # Location */}
            {eventDetails?.Event_space &&
              renderSubTitle(
                eventDetails?.Event_mode === 'F' ? 'Location' : 'Online Link',
              )}
            {eventDetails?.Event_space && (
              <View style={styles.locationCont}>
                <Ionicons
                  style={styles.locationIcn}
                  name={
                    eventDetails?.Event_mode === 'F'
                      ? 'location-sharp'
                      : 'videocam'
                  }
                  size={moderateScale(25)}
                  color={
                    eventDetails?.Event_mode === 'F'
                      ? COLORS.watermelon
                      : COLORS.midGrey
                  }
                />
                <TouchableOpacity
                  disabled={eventDetails?.Event_mode === 'F'}
                  style={{width: '85%'}}
                  activeOpacity={0.6}
                  onPress={async () => {
                    const result = await RedirectURL(eventDetails?.Event_space);
                    if (!!result?.type) {
                      toastMsg(result?.message, result?.type);
                    }
                  }}>
                  <Text
                    style={[
                      styles.descripTxt,
                      styles.locationTxt,
                      {
                        color:
                          eventDetails?.Event_mode === 'F'
                            ? COLORS.midGrey
                            : COLORS.dodger,
                        textDecorationLine:
                          eventDetails?.Event_mode === 'O'
                            ? 'underline'
                            : 'none',
                      },
                    ]}>
                    {eventDetails?.Event_space}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* // # Discount Code */}
            {eventDetails?.Is_paid_event === 'Y' &&
              screen === 'Upcoming' &&
              !shimmer && (
                <View
                  style={[
                    styles.discountCont,
                    coupon?.warning && {
                      borderColor: COLORS.errorPB,
                      borderWidth: 1.5,
                    },
                  ]}>
                  <TextInput
                    value={coupon?.code}
                    onChangeText={text => {
                      coupon?.warning || coupon?.applied
                        ? setCoupon({
                            code: text,
                            warning: false,
                            applied: false,
                          })
                        : setCoupon(prev => ({...prev, code: text}));
                    }}
                    placeholder="Enter Discount Code"
                    placeholderTextColor={COLORS.midGrey}
                    style={[styles.descripTxt, styles.discountTxtInpt]}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      coupon?.applied
                        ? removeCoupon()
                        : !coupon?.code
                        ? (setCoupon(prev => ({...prev, warning: true})),
                          toastMsg('Enter coupon code.', 'warning'))
                        : applyCoupon();
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.applyBtn,
                      coupon?.applied && {backgroundColor: COLORS.watermelon},
                    ]}>
                    <Text style={styles.applyTxt}>
                      {coupon?.applied ? 'Remove' : 'Apply'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            {/* // # Amount Section */}
            {screen === 'Upcoming' &&
              eventDetails?.Is_paid_event === 'Y' &&
              amountDetails?.length > 0 &&
              amountDetails?.map((item, index) => {
                return (
                  <View
                    style={[styles.lablValCont, styles.amountsec(index)]}
                    key={index}>
                    <Text style={[styles.labelTxt, {width: '60%'}]}>
                      {item?.label}
                    </Text>
                    <Text style={[styles.labelTxt, styles.colon]}>:</Text>
                    <Text
                      style={[
                        styles.labelTxt,
                        styles.valTxt,
                        {textAlign: 'right', width: '35%'},
                      ]}>
                      {item?.value}
                    </Text>
                  </View>
                );
              })}

            {/* // # Pay Now Btn */}
            {shimmer ? (
              <TitleShimmer
                height={verticalScale(45)}
                width={'100%'}
                marginTop={verticalScale(80)}
              />
            ) : checkDataExist ? (
              <TouchableOpacity
                disabled={
                  eventDetails?.Is_registered === 'Y' ||
                  eventDetails?.Is_attended === 'Y'
                }
                onPress={() => {
                  eventDetails?.Is_registered !== 'Y' &&
                    eventDetails?.Is_attended !== 'Y' &&
                    register();
                }}
                activeOpacity={0.6}
                style={[
                  styles.payBtn,
                  {
                    backgroundColor:
                      screen === 'Upcoming'
                        ? COLORS.windowsBlue
                        : COLORS.atlantis,
                  },
                ]}>
                <Text style={styles.payBtnTxt}>
                  {eventDetails?.Is_attended === 'Y'
                    ? 'Attended'
                    : eventDetails?.Is_registered === 'Y'
                    ? 'Registered'
                    : eventDetails?.Is_paid_event === 'Y'
                    ? 'Pay Now to Register'
                    : 'Register'}
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  bgImg: {
    width: '100%',
    height: verticalScale(320),
  },
  header: statusHeight => ({
    padding: moderateScale(15),
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: statusHeight,
  }),
  screenName: {
    width: '50%',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -50}],
  },
  menuIcon: {
    padding: moderateScale(6),
    height: horizontalScale(32),
    width: horizontalScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.white,
    zIndex: 99,
  },
  titleSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4%',
  },
  title: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
    color: COLORS.header,
    width: '70%',
  },
  amtTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.black,
    paddingHorizontal: '4%',
    height: verticalScale(35),
    textAlignVertical: 'center',
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.atlantis,
  },
  contentCont: {
    backgroundColor: COLORS.white,
    width: '100%',
    flex: 1,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    overflow: 'hidden',
    marginTop: '-8%',
    padding: '4%',
  },
  imageOverlay: {
    height: screenHeight * 0.38,
    ...StyleSheet.absoluteFillObject,
  },
  subTitle: text => ({
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    width: '60%',
    marginTop: text === 'Description' ? 0 : '5%',
  }),
  descripTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l,
    color: COLORS.midGrey,
    marginTop: '2%',
    width: '100%',
  },
  lablValCont: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: '5%',
    alignSelf: 'center',
  },
  labelTxt: {
    width: '30%',
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.l,
    color: COLORS.black,
  },
  colon: {
    width: '3%',
    textAlign: 'center',
  },
  valTxt: {
    width: '65%',
    paddingLeft: '3%',
    fontFamily: FONTS.urbanistSemiBold,
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    backgroundColor: COLORS.chromeWhite,
    padding: '2%',
    borderRadius: moderateScale(25),
  },
  locationTxt: {marginTop: 0, width: '100%'},
  locationIcn: {
    width: '13%',
    textAlign: 'center',
  },
  discountCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '5%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.black,
    borderRadius: moderateScale(25),
  },
  discountTxtInpt: {
    marginTop: 0,
    width: '60%',
    color: COLORS.black,
  },
  applyBtn: {
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    width: horizontalScale(75),
    height: horizontalScale(33),
    backgroundColor: COLORS.atlantis,
  },
  applyTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l,
    color: COLORS.white,
    textAlign: 'center',
  },
  payBtn: {
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    width: '100%',
    height: horizontalScale(45),
    backgroundColor: COLORS.windowsBlue,
    marginVertical: '10%',
  },
  payBtnTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
    textAlign: 'center',
  },
  amountsec: index => ({
    marginTop: index === 0 ? '10%' : '5%',
    width: '60%',
    alignSelf: 'flex-end',
  }),
});
