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

const EventDetails = ({route, navigation}) => {
  const statusBarHeight = useStatusBarHeight();
  const {selScreen, setSelScreen} = useAppContext();
  const {profileId} = selScreen;

  const [expanded, setExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [showReadMore, setShowReadMore] = useState(false);
  const [shimmer, setShimmer] = useState(true);

  const {screen, eventId} = route?.params;
  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };
  useEffect(() => {
    getEventDetails();
  }, []);

  const checkDataExist = Object.keys(eventDetails)?.length > 0;

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
      const params = {profile_id: profileId, event_id: eventId};
      const response = await API.getEventDetails(params);

      console.log('Event_Details_response', response?.data);
      const {Data, successCode, message} = response?.data;
      if (successCode === 1) {
        setEventDetails(Data);
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

  return (
    <>
      <SafeAreaView style={MyStyles.contentCont}>
        <StatusBarTransp />
        <ScrollView showsVerticalScrollIndicator={false}>
          {!shimmer ? (
            <ImageBackground
              source={{
                uri: eventDetails?.image,
              }}
              style={styles.bgImg}>
              {/* // @ header */}
              <View style={styles.header(statusBarHeight)}>
                <TouchableOpacity // Left Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  activeOpacity={0.6}
                  style={styles.menuIcon}>
                  <FontAwesome
                    name="chevron-left"
                    size={moderateScale(15)}
                    color={COLORS.charcoal}
                  />
                </TouchableOpacity>
                {/* Screen Name */}
                <Text
                  numberOfLines={1}
                  style={[MyStyles.titleText, styles.screenName]}>
                  Events Details
                </Text>
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
                <Text style={styles.title}>{eventDetails?.session_name}</Text>
              ) : (
                <TitleShimmer
                  height={verticalScale(70)}
                  width={horizontalScale(250)}
                />
              )}

              {!shimmer ? (
                <Text style={styles.amtTxt}>
                  ₹ {eventDetails?.prasadam_amount}
                </Text>
              ) : (
                <TitleShimmer
                  height={verticalScale(30)}
                  width={horizontalScale(60)}
                />
              )}
            </View>
            {/* // # Description */}
            {!shimmer ? (
              renderSubTitle('Description')
            ) : (
              <TitleShimmer
                height={verticalScale(25)}
                width={horizontalScale(150)}
              />
            )}

            {eventDetails?.description && !shimmer ? (
              <Text
                numberOfLines={expanded ? undefined : 2}
                onTextLayout={handleTextLayout}
                style={styles.descripTxt}>
                {eventDetails?.description}
              </Text>
            ) : (
              <>
                <TitleShimmer height={verticalScale(14)} width={'100%'} />
                <TitleShimmer
                  height={verticalScale(14)}
                  width={horizontalScale(200)}
                  marginBottom={verticalScale(30)}
                />
              </>
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
              : Array(3)
                  .fill(3)
                  .map((_, index) => (
                    <View style={styles.lablValCont} key={index + 1}>
                      <TitleShimmer />
                      <TitleShimmer />
                    </View>
                  ))}

            {/* // # Location */}
            {!shimmer && renderSubTitle('Location')}
            {eventDetails?.location && (
              <View style={styles.locationCont}>
                <Ionicons
                  style={styles.locationIcn}
                  name="location-sharp"
                  size={moderateScale(25)}
                  color={COLORS.watermelon}
                />
                <Text style={[styles.descripTxt, styles.locationTxt]}>
                  {eventDetails?.location}
                </Text>
              </View>
            )}

            {/* // # Discount Code */}
            {screen === 'Upcoming' && !shimmer && (
              <View style={styles.discountCont}>
                <TextInput
                  placeholder="Enter Discount Code"
                  placeholderTextColor={COLORS.midGrey}
                  style={[styles.descripTxt, styles.discountTxtInpt]}
                />

                <TouchableOpacity activeOpacity={0.6} style={styles.applyBtn}>
                  <Text style={styles.applyTxt}>Apply</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* // # Amount Section */}
            {screen === 'Upcoming' &&
              eventDetails?.amountDetails?.length > 0 &&
              eventDetails?.amountDetails?.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.lablValCont,
                      {marginTop: index === 0 ? '10%' : '5%'},
                    ]}
                    key={index + 1}>
                    <Text style={styles.labelTxt}> {item?.label}</Text>
                    <Text style={[styles.labelTxt, styles.colon]}>:</Text>
                    <Text
                      style={[
                        styles.labelTxt,
                        styles.valTxt,
                        {textAlign: 'right'},
                      ]}>
                      {item?.value}
                    </Text>
                  </View>
                );
              })}

            {/* // # Pay Now Btn */}
            {checkDataExist && !shimmer ? (
              <TouchableOpacity
                disabled={eventDetails?.amtPaid === 'Y'}
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
                  {eventDetails?.amtPaid === 'Y'
                    ? 'Registered'
                    : eventDetails?.paid_event === 'Y'
                    ? 'Pay now'
                    : 'Register'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TitleShimmer
                height={verticalScale(45)}
                width={'100%'}
                marginTop={verticalScale(80)}
              />
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: '5%',
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
  locationTxt: {marginTop: 0, width: '85%'},
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
});
