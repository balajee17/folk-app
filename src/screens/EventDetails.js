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

const EventDetails = ({route, navigation}) => {
  const statusBarHeight = useStatusBarHeight();

  const [expanded, setExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    details: [
      {label: 'FOLK Guide', value: 'Anandamaya Dasa'},
      {label: 'Category', value: 'FOLK'},
      {label: 'Event Type', value: 'Offline'},
      {label: 'FOLK Level', value: 'FOLK General'},
      {label: 'Date', value: '10-01-2025'},
      {label: 'Time', value: '6:30 PM'},
    ],
    amountDetails: [
      {label: 'Total Amount', value: '₹ 5000'},
      {label: 'Total Amount', value: '₹ 4500'},
      {label: 'Amount to pay', value: '₹ 500'},
    ],
    description:
      'Detect Line Count: Uses onTextLayout to check if the text exceeds maxLines. Control Text Display: Shows full text when expanded and trims it when collapsed.Show "Read More" Conditionally: If the text is within 2.5 lines, the button won’t appear.',
  });
  const [showReadMore, setShowReadMore] = useState(false);

  const {screen} = route?.params;

  const handleTextLayout = e => {
    const {lines} = e.nativeEvent;
    if (lines.length > 2) {
      setShowReadMore(true);
    }
  };

  const renderSubTitle = text => {
    return <Text style={styles.subTitle(text)}>{text}</Text>;
  };

  return (
    <>
      <SafeAreaView style={MyStyles.flex1}>
        <StatusBarTransp />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{
              uri: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600',
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

            {/* // @ Title Section */}
            <View style={styles.titleSec}>
              <Text style={styles.title}>The Journey of Self Discovery</Text>

              <Text style={styles.amtTxt}>₹ 500</Text>
            </View>

            <LinearGradient
              colors={[
                COLORS.transparent,
                COLORS.transparent,
                'rgba(0,0,0,0.8)',
              ]}
              style={styles.imageOverlay}
            />
          </ImageBackground>

          {/* // @ Contents */}
          <View style={styles.contentCont}>
            {/* // # Description */}
            {renderSubTitle('Description')}

            <Text
              numberOfLines={expanded ? undefined : 2}
              onTextLayout={handleTextLayout}
              style={styles.descripTxt}>
              {eventDetails?.description}
            </Text>
            {showReadMore && (
              <TouchableOpacity
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
            {eventDetails?.details?.map((item, index) => {
              return (
                <View style={styles.lablValCont} key={index + 1}>
                  <Text style={styles.labelTxt}> {item?.label}</Text>
                  <Text style={[styles.labelTxt, styles.colon]}>:</Text>
                  <Text style={[styles.labelTxt, styles.valTxt]}>
                    {item?.value}
                  </Text>
                </View>
              );
            })}

            {/* // # Location */}
            {renderSubTitle('Location')}
            <View style={styles.locationCont}>
              <Ionicons
                style={styles.locationIcn}
                name="location-sharp"
                size={moderateScale(25)}
                color={COLORS.watermelon}
              />
              <Text style={[styles.descripTxt, styles.locationTxt]}>
                Hare Krishna Hill, Chord Rd
              </Text>
            </View>

            {/* // # Discount Code */}
            {screen === 'Upcoming' && (
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
            <TouchableOpacity
              disabled={screen === 'Registered'}
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
                {screen === 'Upcoming' ? 'Pay now' : 'Registered'}
              </Text>
            </TouchableOpacity>
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
    padding: moderateScale(10),
    paddingVertical: moderateScale(15),
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    marginTop: verticalScale(80),
    zIndex: 99,
  },
  title: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
    color: COLORS.white,
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
    backgroundColor: COLORS.paleYellow,
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
