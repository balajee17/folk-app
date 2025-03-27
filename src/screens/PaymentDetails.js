import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import {
  CommonStatusBar,
  useStatusBarHeight,
} from '../components/StatusBarComponent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getImage} from '../utils/ImagePath';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {useAppContext} from '../../App';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';

const PaymentDetails = ({navigation, route}) => {
  const {globalState, setGlobalState} = useAppContext();
  const {profileId} = globalState;

  const {paymentId = '', paymentStatus = {}, screenFrom = ''} = route?.params;

  const [shimmer, setShimmer] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    typeof paymentStatus === 'object' && Object.keys(paymentStatus).length > 0
      ? storePaymentStatus()
      : getPaymentDetails();
  }, []);

  const storePaymentStatus = async () => {
    console.log(
      'screenFrom === screenNames.coupons',
      screenFrom === screenNames.coupons,
    );
    setPaymentDetails(paymentStatus);

    await setGlobalState(prev => ({
      ...prev,
      reloadCoupon: screenFrom === screenNames.coupons ? 'Y' : 'N',
      reloadEventList: screenFrom === screenNames.eventDetails ? 'Y' : 'N',
    }));
  };

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const getPaymentDetails = async () => {
    try {
      setShimmer(true);
      const params = {profileId: profileId, paymentId: paymentId};
      const response = await API.getPaymentDetails(params);

      console.log('Payment_details_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setPaymentDetails(data);
      } else {
        toastMsg(message, 'warning');
      }
      setShimmer(false);
    } catch (err) {
      toastMsg('', 'error');
      setShimmer(false);
      console.log('ERR-Payment_details-screen', err);
    }
  };

  return (
    <>
      <CommonStatusBar bgColor={COLORS.header} />
      <SafeAreaView style={[MyStyles.flex1, styles.mainContainer]}>
        {/* // @ Left Arrow Icon */}

        {/* <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.6}
          style={styles.menuIcon}>
          <FontAwesome6
            name="chevron-left"
            size={moderateScale(23)}
            color={COLORS.white}
          />
        </TouchableOpacity> */}

        <CustomHeader
          martop={
            typeof paymentStatus === 'object' &&
            Object.keys(paymentStatus).length > 0
              ? true
              : false
          }
          goBack={() => navigation.goBack()}
          titleName={screenNames.paymentDetails}
        />

        {/* // @ Status, Amt, Event Name */}
        {shimmer ? (
          <ImageShimmer
            height={horizontalScale(100)}
            width={horizontalScale(100)}
            borderRadius={moderateScale(20)}
            alignSelf={'center'}
          />
        ) : (
          <Image
            source={{uri: paymentDetails?.STATUS_ICON}}
            style={styles.statusImg}
          />
        )}
        {shimmer ? (
          <>
            <TitleShimmer
              height={horizontalScale(15)}
              width={horizontalScale(220)}
              borderRadius={moderateScale(20)}
              alignSelf={'center'}
              marginTop={'2%'}
            />
            <TitleShimmer
              height={horizontalScale(12)}
              width={horizontalScale(150)}
              borderRadius={moderateScale(20)}
              alignSelf={'center'}
              marginTop={'1%'}
            />
            <TitleShimmer
              height={horizontalScale(40)}
              width={horizontalScale(100)}
              borderRadius={moderateScale(10)}
              alignSelf={'center'}
              marginTop={'4%'}
            />
          </>
        ) : (
          <>
            <Text style={styles.statusTxt}>{paymentDetails?.STATUS}</Text>
            <Text style={styles.eventName}>{paymentDetails?.EVENT_NAME}</Text>
            <Text style={styles.eventName}>{paymentDetails?.PURPOSE}</Text>
            <Text style={styles.amtTxt}>{paymentDetails?.TOTAL_AMOUNT}</Text>
          </>
        )}

        {/* // @ Payment Details */}
        <View
          style={[
            styles.payDetailsBox,
            shimmer && {backgroundColor: COLORS.charcoal},
          ]}>
          {/* // # Icon and Pay Details */}
          <View style={styles.payDetailIcnCont}>
            {shimmer ? (
              <TitleShimmer
                height={horizontalScale(20)}
                width={horizontalScale(200)}
                borderRadius={moderateScale(10)}
                alignSelf={'center'}
              />
            ) : (
              <>
                <AntDesign
                  name="profile"
                  size={moderateScale(22)}
                  color={COLORS.white}
                  style={styles.payDtlIcn}
                />
                <Text numberOfLines={1} style={styles.payDetailTxt}>
                  Payment Details
                </Text>
              </>
            )}
          </View>
          {/* // # Transaction ID and Copy Option  */}
          {shimmer ? (
            <>
              <TitleShimmer
                height={horizontalScale(15)}
                width={horizontalScale(180)}
                borderRadius={moderateScale(10)}
                alignSelf={'left'}
                marginTop={'4%'}
              />
              <TitleShimmer
                height={horizontalScale(10)}
                width={horizontalScale(140)}
                borderRadius={moderateScale(10)}
                alignSelf={'left'}
                marginTop={'2%'}
              />
            </>
          ) : (
            <View style={styles.txidCopyCont}>
              <View style={{width: '80%'}}>
                <Text style={styles.labelTxt}>Transaction ID</Text>
                <Text
                  style={[styles.labelTxt, styles.valueTxt, {marginTop: '1%'}]}>
                  {paymentDetails?.BANK_TRANSACTION_ID}
                </Text>
              </View>
              <MaterialIcons
                name="content-copy"
                size={moderateScale(25)}
                color={COLORS.charcoal}
                style={{textAlignVertical: 'bottom'}}
              />
            </View>
          )}
          {/*  // # Date Time */}
          {!shimmer && (
            <Text style={[styles.labelTxt, styles.valueTxt, {marginTop: '2%'}]}>
              {paymentDetails?.TRANSACTION_DATE}
            </Text>
          )}
          {/* // # Amount Container */}
          {shimmer
            ? Array(2)
                .fill(2)
                .map(() => (
                  <View style={styles.txidCopyCont}>
                    <TitleShimmer
                      height={horizontalScale(15)}
                      width={horizontalScale(150)}
                      borderRadius={moderateScale(10)}
                      marginTop={'4%'}
                    />
                    <TitleShimmer
                      height={horizontalScale(20)}
                      width={horizontalScale(70)}
                      borderRadius={moderateScale(6)}
                      marginTop={'2%'}
                    />
                  </View>
                ))
            : paymentDetails?.amountDetails?.map((item, index) => (
                <View style={styles.txidCopyCont}>
                  <Text
                    numberOfLines={1}
                    style={[styles.labelTxt, {width: '60%'}]}>
                    {item?.label}
                  </Text>
                  <Text
                    style={[styles.labelTxt, styles.valueTxt, styles.amtValue]}>
                    {item?.value}
                  </Text>
                </View>
              ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
  },
  menuIcon: {
    padding: moderateScale(6),
    height: horizontalScale(40),
    width: horizontalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    margin: '3%',
    zIndex: 99,
    backgroundColor: COLORS.modalBg,
  },
  statusImg: {
    alignSelf: 'center',
    width: horizontalScale(100),
    height: horizontalScale(100),
  },
  statusTxt: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '90%',
    textAlign: 'center',
    marginTop: '1%',
    alignSelf: 'center',
  },
  eventName: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.midGrey,
    width: '90%',
    marginTop: '1%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  amtTxt: {
    fontSize: SIZES.xxxl + SIZES.s,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '90%',
    marginTop: '4%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  payDetailsBox: {
    backgroundColor: COLORS.chromeWhite,
    alignSelf: 'center',
    width: '95%',
    marginTop: '10%',
    borderRadius: moderateScale(20),
    padding: '4%',
  },
  payDetailTxt: {
    fontSize: SIZES.subTitle,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '60%',
    marginLeft: '5%',
  },
  payDetailIcnCont: {
    flexDirection: 'row',
    width: '100%',
  },
  payDtlIcn: {
    backgroundColor: COLORS.black,
    borderRadius: moderateScale(3),
    textAlignVertical: 'center',
  },
  txidCopyCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
  },
  labelTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.highLightColor,
    width: '100%',
  },
  valueTxt: {
    color: COLORS.black,
  },
  amtValue: {
    width: '35%',
    color: COLORS.black,
    textAlign: 'right',
  },
});
