import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext} from '../../App';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import NoDataFound from '../components/NoDataFound';
import moment from 'moment';
import Spinner from '../components/Spinner';
import {
  CashFreePayment,
  GetPaymentStatus,
  toastThrottle,
} from '../components/CommonFunctionalities';
import AndroidBackHandler from '../components/BackHandler';
import FloatingInput from '../components/FloatingInput';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import FlipCardCoupon from '../components/FlipCardCoupon';

const Coupons = props => {
  const {globalState, setGlobalState} = useAppContext();

  const {profileId, reloadCoupon} = globalState;
  const {route, navigation} = props;
  const {eventId} = route?.params;

  const [requestCoupon, setRequestCoupon] = useState({
    open: false,
    type: 'R',
    freeCount: 0,
    freeMaxCount: 0,
    refId: '',
    prasadamAmt: 0,
    prasadamAmtLbl: 0,
    totalAmt: 0,
    paidCount: 0,
    paidMaxCount: 0,
  });
  const [requestReason, setRequestReason] = useState('');
  const [selCoupon, setSelCoupon] = useState(requestCoupon);
  const [loader, setLoader] = useState(true);
  const [couponData, setCouponData] = useState([]);
  const [reloadCouponVal, setReloadCouponVal] = useState(reloadCoupon);

  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      console.log('reloadCoupon', reloadCouponVal);
      reloadCouponVal === 'Y' && reloadScreen();
    }, [reloadCouponVal]),
  );

  const reloadScreen = async () => {
    await setGlobalState(prev => ({...prev, reloadCoupon: 'N'}));
    getCouponsList();
  };

  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getCouponsList();
    return AndroidBackHandler.removerHandler();
  }, []);

  const setDefaultStates = () => {
    setCouponData([]);
    setSelCoupon({
      open: false,
      type: 'R',
      freeCount: 0,
      freeMaxCount: 0,
      refId: '',
      prasadamAmt: 0,
      prasadamAmtLbl: 0,
      totalAmt: 0,
      paidCount: 0,
      paidMaxCount: 0,
    });
    setRequestCoupon({
      open: false,
      type: 'R',
      freeCount: 0,
      freeMaxCount: 0,
      refId: '',
      prasadamAmt: 0,
      prasadamAmtLbl: 0,
      totalAmt: 0,
      paidCount: 0,
      paidMaxCount: 0,
    });
  };

  const getCouponsList = async () => {
    try {
      !loader && setLoader(true);
      const params = {profile_id: profileId, event_id: eventId};
      const response = await API.getCouponList(params);

      console.log('Coupon_List_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setCouponData(data?.coupons);
        const DATA = {
          open: false,
          type: 'R',
          freeCount: 0,
          freeMaxCount: 0,
          refId: '',
          paidCount: 0,
          paidMaxCount: 0,
          prasadamAmt: data?.requestPrasadamAmt,
          prasadamAmtLbl: data?.requestPrasadamAmtLabel,
          totalAmt: 0,
        };
        setRequestCoupon(DATA);
        setSelCoupon(DATA);
      } else {
        setDefaultStates();
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setDefaultStates();
      setLoader(false);
      console.log('ERR-Coupon_List-screen', err);
    }
  };

  const increment = couponType => {
    const {prasadamAmt, totalAmt} = selCoupon;
    const PAID_TYPE = couponType === 'P';
    const COUNT = PAID_TYPE ? selCoupon?.paidCount : selCoupon?.freeCount;
    const MAX_COUNT = PAID_TYPE
      ? selCoupon?.paidMaxCount
      : selCoupon?.freeMaxCount;

    if (MAX_COUNT) {
      if (MAX_COUNT > COUNT) {
        if (PAID_TYPE) {
          setSelCoupon(prev => ({
            ...prev,
            paidCount: Number(COUNT) + 1,
            totalAmt: Number(totalAmt) + Number(prasadamAmt),
          }));
        } else {
          setSelCoupon(prev => ({
            ...prev,
            freeCount: Number(COUNT) + 1,
          }));
        }
      } else {
        toastMsg(
          `Limit reached! Only ${MAX_COUNT} coupons allowed.`,
          'warning',
        );
      }
      return;
    }
    PAID_TYPE
      ? setSelCoupon(prev => ({
          ...prev,
          paidCount: Number(COUNT) + 1,
          totalAmt: Number(totalAmt) + Number(prasadamAmt),
        }))
      : setSelCoupon(prev => ({...prev, freeCount: Number(COUNT) + 1}));
  };

  const decrement = couponType => {
    const {prasadamAmt, totalAmt} = selCoupon;
    const PAID_TYPE = couponType === 'P';
    const COUNT = PAID_TYPE ? selCoupon?.paidCount : selCoupon?.freeCount;
    if (COUNT > 1 || (selCoupon?.type === 'R' && COUNT > 0)) {
      if (PAID_TYPE) {
        setSelCoupon(prev => ({
          ...prev,
          paidCount: Number(COUNT) - 1,
          totalAmt: Number(totalAmt) - Number(prasadamAmt),
        }));
      } else {
        setSelCoupon(prev => ({
          ...prev,
          freeCount: Number(COUNT) - 1,
        }));
      }
    } else {
      selCoupon?.type === 'R' && COUNT === 0
        ? null
        : toastMsg(`Minimum 1 coupon required.`, 'warning');
    }
  };

  const closeAddCpnModal = () => {
    setSelCoupon(requestCoupon);
  };

  const submitCoupon = () => {
    const TYPE =
      selCoupon?.type === 'R' ? 'R' : selCoupon?.type === 'F' ? 'F' : 'P';
    if (
      TYPE === 'R' &&
      selCoupon?.freeCount === 0 &&
      selCoupon?.paidCount === 0
    ) {
      toastMsg('Select atleast 1 Free or 1 Paid coupon.');
      return;
    }
    if (TYPE === 'R' && !requestReason) {
      toastMsg('Provide request reason.');
      return;
    }
    sendCouponDetails();
  };

  const sendCouponDetails = async () => {
    try {
      const TYPE = selCoupon?.type;
      !loader && setLoader(true);
      const params =
        TYPE === 'F'
          ? {
              profile_id: profileId,
              refId: selCoupon?.refId ? selCoupon?.refId : null,
              couponType: TYPE,
              event_id: eventId,
              freeCount: selCoupon?.freeCount > 0 ? selCoupon?.freeCount : null,
            }
          : {
              profile_id: profileId,
              event_id: eventId,
              refId:
                TYPE === 'R'
                  ? null
                  : selCoupon?.refId
                  ? selCoupon?.refId
                  : null,
              couponType: TYPE, // R - req, F - free, P - paid
              freeCount:
                selCoupon?.freeCount > 0 ? Number(selCoupon?.freeCount) : 0,
              paidCount:
                selCoupon?.paidCount > 0 ? Number(selCoupon?.paidCount) : 0,
              prasadamAmt: TYPE === 'P' ? Number(selCoupon?.prasadamAmt) : null,
              totalAmount: TYPE === 'P' ? 100 : 0,
              reason: TYPE === 'R' ? requestReason : '',
            };

      const response = await API.addCoupon(params);

      console.log('SEND_Coupon_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        toastMsg(message, 'success');
        const paymentSessionId = data?.payment_session_id;
        const orderId = data?.orderId;
        TYPE === 'P'
          ? getPaymentGateway(paymentSessionId, orderId)
          : (setDefaultStates(), getCouponsList());
      } else {
        toastMsg(message, 'warning');
        setLoader(false);
      }
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-SEND_Coupon', err);
    }
  };

  const getPaymentGateway = async (payment_session_id, orderId) => {
    try {
      setLoader(true);
      const orderId = 'order_105263592urD75HuONsZljL8Yn4DOSCecsB';
      const paymentSessionId =
        'session_wEZVPslq__Whn0thQGtjSfiYHF4mD-7zYF1bqRdUOvBSJo4oYzCczApoZ7qxyKXEmeQgTcGC3QfSoUWGUAMxn72EhFaKlvmFECsfillS61vJLkIAwzOeQFhCQgpaymentpayment';

      if (!paymentSessionId || !orderId) {
        setLoader(false);
        return toastMsg('', 'error');
      }

      const paymentGatewayRes = await CashFreePayment(
        paymentSessionId,
        orderId,
      );
      console.log('paymentGatewayRes', paymentGatewayRes);

      if (paymentGatewayRes?.type === 'ID') {
        await getPaymentStatusAPI(paymentGatewayRes?.orderId);
      } else {
        toastMsg('', 'error');
      }
    } catch (err) {
      setLoader(false);
      toastMsg('', 'error');
      console.log('ERR-Register', err);
    }
  };

  const getPaymentStatusAPI = async orderId => {
    const paymentStatusRes = await GetPaymentStatus(profileId, orderId);
    console.log('paymentStatusRes', paymentStatusRes);
    setLoader(false);
    setDefaultStates();

    navigation.navigate(screenNames.paymentDetails, {
      paymentStatus: paymentStatusRes,
      // paymentStatus: {
      //   amountDetails: [{label: 'Total Amount', value: '1001.15'}],
      //   TRANSACTION_DATE: '26-Mar-2025 04:28 PM',
      //   BANK_TRANSACTION_ID: '123jb1lj3hg5kjh',
      //   STATUS: 'Payment Success',
      //   EVENT_NAME: 'Cash Free Payment Gateway',
      //   PURPOSE: 'Cash Free Testing',
      //   TOTAL_AMOUNT: '110.15',
      //   STATUS_IMAGE:
      //     'https://gimgs2.nohat.cc/thumb/f/640/confirm-icon-payment-success--m2H7i8N4K9H7d3A0.jpg',
      // },
      screenFrom: screenNames.coupons,
    });
  };

  return (
    <Container>
      <SafeAreaView styles={[MyStyles.flex1]}>
        {/* // # Header */}
        <CustomHeader
          titleName={screenNames.coupons}
          goBack={() => navigation.goBack()}
          rightIcnAction={() => {
            setSelCoupon(prev => ({
              ...prev,
              open: true,
            }));
          }}
        />
        <Spinner spinnerVisible={loader} />
        {/* // @ Coupon card */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '40%', overflow: 'hidden'}}
          data={couponData}
          renderItem={({item, index}) => {
            return (
              <FlipCardCoupon
                item={item}
                index={index}
                setSelCoupon={value => {
                  setSelCoupon(value);
                }}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => getCouponsList()}
            />
          }
          ListEmptyComponent={
            !loader && <NoDataFound screen={screenNames.coupons} />
          }
        />
      </SafeAreaView>

      {/* // @ Add Coupon Modal */}
      <Modal animationType="slide" visible={selCoupon?.open} transparent>
        <View style={styles.fltrModal}>
          {/* // @  box */}
          <View style={styles.filterCard}>
            {/* // # Close btn */}
            <TouchableOpacity
              onPress={closeAddCpnModal}
              activeOpacity={0.8}
              style={styles.closeBtn}>
              <MaterialCommunityIcons
                name="close"
                size={moderateScale(22)}
                color={COLORS.black}
              />
            </TouchableOpacity>
            {/* // # card title */}
            <Text numberOfLines={1} style={styles.titleTxt}>
              {selCoupon?.type === 'R'
                ? 'Request Prasadam Coupon'
                : 'Avail Prasadam Coupon'}
            </Text>
            {/* // # sub text  */}
            <Text numberOfLines={1} style={styles.subTxt}>
              Select how many Coupon you need.
            </Text>
            {/* // # horizontal line */}
            <View style={styles.horizontalLine} />
            {/* // # Incre-count-decre btn */}
            {selCoupon?.type !== 'R' && (
              <View style={styles.flexContainer}>
                <TouchableOpacity
                  onPress={() => decrement(selCoupon?.type)}
                  activeOpacity={0.8}
                  style={styles.countBtn}>
                  <MaterialCommunityIcons
                    name="minus"
                    size={moderateScale(25)}
                    color={COLORS.charcoal}
                  />
                </TouchableOpacity>
                <Text style={styles.AddCpnCountTxt}>
                  {selCoupon?.type === 'P'
                    ? selCoupon?.paidCount
                    : selCoupon?.freeCount}
                </Text>
                <TouchableOpacity
                  onPress={() => increment(selCoupon?.type)}
                  activeOpacity={0.8}
                  style={styles.countBtn}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={moderateScale(25)}
                    color={COLORS.charcoal}
                  />
                </TouchableOpacity>
              </View>
            )}

            {selCoupon?.type === 'R' &&
              Array(2)
                .fill(2)
                .map((_, index) => (
                  <View
                    style={[
                      styles.flexContainer,
                      {justifyContent: 'space-between'},
                    ]}>
                    <Text style={styles.couponTypeTxt}>
                      {index === 0 ? 'Free' : 'Paid'}
                    </Text>
                    <View
                      style={[
                        styles.flexContainer,
                        {
                          justifyContent: 'space-between',
                          width: '50%',
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={() => decrement(index === 0 ? 'F' : 'P')}
                        activeOpacity={0.8}
                        style={styles.reqCountBtn}>
                        <MaterialCommunityIcons
                          name="minus"
                          size={moderateScale(18)}
                          color={COLORS.charcoal}
                        />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.AddCpnCountTxt,
                          {fontSize: SIZES.xxl + SIZES.l, width: '40%'},
                        ]}>
                        {index === 0
                          ? selCoupon?.freeCount
                          : selCoupon?.paidCount}
                      </Text>
                      <TouchableOpacity
                        onPress={() => increment(index === 0 ? 'F' : 'P')}
                        activeOpacity={0.8}
                        style={styles.reqCountBtn}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={moderateScale(18)}
                          color={COLORS.charcoal}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

            {selCoupon?.type === 'R' && (
              <View style={{marginTop: '2%', marginBottom: '8%'}}>
                <FloatingInput
                  label={'Reason*'}
                  value={requestReason}
                  onChangeText={item => {
                    setRequestReason(item);
                  }}
                  cntnrStyle={styles.dropdownCont}
                />
              </View>
            )}

            {/* // # horizontal line */}
            <View style={styles.horizontalLine} />
            {/* // # Amt section */}
            {selCoupon?.type !== 'F' && (
              <View
                style={[
                  styles.flexContainer,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={styles.prasAmtCont}>
                  <Text
                    numberOfLines={1}
                    style={[styles.amtLblTxt, {width: '70%'}]}>
                    Prasadam Donation
                  </Text>
                  <Text numberOfLines={1} style={[styles.perPersonTxt]}>
                    (per person)
                  </Text>
                </View>

                <Text numberOfLines={1} style={[styles.amtValTxt]}>
                  {selCoupon?.prasadamAmtLbl}
                </Text>
              </View>
            )}
            {selCoupon?.type !== 'F' && (
              <View
                style={[
                  styles.flexContainer,
                  {justifyContent: 'space-between', marginTop: '2%'},
                ]}>
                <Text numberOfLines={1} style={styles.amtLblTxt}>
                  Total Amount
                </Text>
                <Text numberOfLines={1} style={styles.amtValTxt}>
                  ₹ {selCoupon?.totalAmt}
                </Text>
              </View>
            )}
            {/* // # horizontal line */}
            {selCoupon?.type !== 'F' && <View style={styles.horizontalLine} />}
            {/* // # Buttons */}
            <TouchableOpacity
              onPress={() => {
                submitCoupon();
              }}
              activeOpacity={0.8}
              style={styles.paymentBtn}>
              <Text
                style={[
                  styles.AddCpnCountTxt,
                  {color: COLORS.white, fontSize: SIZES.xl},
                ]}>
                {selCoupon?.type === 'R'
                  ? 'Request'
                  : selCoupon?.type === 'F'
                  ? 'Redeem'
                  : 'Pay'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeAddCpnModal}
              activeOpacity={0.8}
              style={[styles.paymentBtn, styles.cancelBtn]}>
              <Text style={[styles.AddCpnCountTxt, {fontSize: SIZES.xl}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Coupons;

const styles = StyleSheet.create({
  fltrModal: {
    backgroundColor: COLORS.modalBg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCard: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: moderateScale(20),
    padding: '4%',
  },
  closeBtn: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    height: horizontalScale(30),
    width: horizontalScale(30),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '-3%',
    right: '-3%',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  titleTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
    color: COLORS.charcoal,
  },
  subTxt: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.midGrey,
    marginTop: '2%',
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dropDownBg,
    marginVertical: moderateScale(10),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBtn: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.midGrey,
  },
  reqCountBtn: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.midGrey,
  },
  AddCpnCountTxt: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.xxl + SIZES.xxl,
    color: COLORS.black,
    marginHorizontal: '4%',
    textAlign: 'center',
  },
  amtLblTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.black,
    width: '60%',
  },
  amtValTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.subTitle,
    color: COLORS.charcoal,
    width: '30%',
    textAlign: 'right',
  },
  paymentBtn: {
    backgroundColor: COLORS.windowsBlue,
    borderRadius: moderateScale(8),
    height: horizontalScale(40),
    width: '100%',
    alignItems: 'center',
    marginTop: '2%',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.midGrey,
    marginTop: '4%',
  },

  qrCodeContainer: {
    width: windowWidth * 0.85,
    height: windowWidth * 0.85,
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  couponTypeTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxl,
    color: COLORS.black,
    width: '35%',
  },
  prasAmtCont: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  perPersonTxt: {
    fontFamily: FONTS.urbanistRegular,
    fontSize: SIZES.s,
    color: COLORS.dolphin,
    width: '30%',
  },
  dropdownCont: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: '4%',
    paddingRight: 0,
    height: verticalScale(48),
    marginTop: '5%',
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.dropDownBg,
  },
  dropdownCntStyle: {
    backgroundColor: COLORS.dropDownBg,
    alignSelf: 'left',
  },
});
