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
import React, {useEffect, useState} from 'react';
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
import {toastThrottle} from '../components/CommonFunctionalities';

const Coupons = ({navigation, route}) => {
  const {globalState} = useAppContext();

  const {profileId} = globalState;
  const dateTime = ['Date', 'Time'];
  const {eventId} = route?.params;

  const [addCoupon, setAddCoupon] = useState({
    open: true,
    type: 'R',
    count: 1,
    maxCount: 2,
    refId: '',
  });
  const [qrCode, setQrCode] = useState({show: false, link: ''});
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [couponData, setCouponData] = useState([]);

  const toast = useToast();

  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  const closeAddCpnModal = () => {
    setAddCoupon(false);
  };

  useEffect(() => {
    getCouponsList();
  }, []);

  const getCouponsList = async () => {
    try {
      !loader && setLoader(true);
      const params = {profile_id: profileId, event_id: eventId};
      const response = await API.getCouponList(params);

      console.log('Coupon_List_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        // setCouponData(data?.coupons);
        setCouponData({
          couponList: [
            {
              dateTime: new Date(),
              id: 1,
              title: 'Prasadam Coupon Test',
              code: '2#Ehguj668',
              qty: 5,
              requestedCoupon: 'N',

              isPaid: 'N',

              btnTxtColor: '',
              btnBgColor: '',
              dateColor: '',
              labelColor: '',
              codeColor: '',
              titleColor: '',
              countColor: '',
              requestStatus: '',
            },
            {
              dateTime: new Date(),
              id: 2,
              title: 'Prasadam Coupon Test',
              code: '2#Ehguj668',
              qty: 5,
              requestedCoupon: 'N',
              isPaid: 'Y',
              btnTxtColor: '',
              btnBgColor: '',
              dateColor: '',
              labelColor: '',
              codeColor: '',
              titleColor: '',
              countColor: '',
              requestStatus: '',
            },
            {
              dateTime: new Date(),
              id: 1,
              title: 'Prasadam Coupon Test',
              code: '2#Ehguj668',
              qty: 5,
              requestedCoupon: 'Y',

              isPaid: 'N',

              btnTxtColor: '',
              btnBgColor: '',
              dateColor: '',
              labelColor: '',
              codeColor: '',
              titleColor: '',
              countColor: '',
              requestStatus: 'P',
            },
            {
              dateTime: new Date(),
              id: 1,
              title: 'Prasadam Coupon Test',
              code: '2#Ehguj668',
              qty: 5,
              requestedCoupon: 'Y',

              isPaid: 'N',

              btnTxtColor: '',
              btnBgColor: '',
              dateColor: '',
              labelColor: '',
              codeColor: '',
              titleColor: '',
              countColor: '',
              requestStatus: 'A',
            },
            {
              dateTime: new Date(),
              id: 1,
              title: 'Prasadam Coupon Test',
              code: '2#Ehguj668',
              qty: 5,
              requestedCoupon: 'Y',

              isPaid: 'N',

              btnTxtColor: '',
              btnBgColor: '',
              dateColor: '',
              labelColor: '',
              codeColor: '',
              titleColor: '',
              countColor: '',
              requestStatus: 'X',
            },
            {
              dateTime: new Date(),
              id: 1,
              title: 'Prasadam Coupon Test',
              code: '2#Ehguj668',
              qty: 6,
              requestedCoupon: 'Y',

              isPaid: 'Y',

              btnTxtColor: '',
              btnBgColor: '',
              dateColor: '',
              labelColor: '',
              codeColor: '',
              titleColor: '',
              countColor: '',
              requestStatus: 'A',
            },
          ],
        });
      } else {
        setCouponData([]);
        toastMsg(message, 'info');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-Coupon_List-screen', err);
    }
  };

  const increment = () => {
    const {maxCount, count} = addCoupon;
    if (maxCount) {
      if (maxCount > count) {
        setAddCoupon(prev => ({...prev, count: count + 1}));
      } else {
        toastMsg(`Limit reached! Only ${maxCount} coupons allowed.`, 'warning');
      }
      return;
    }
    setAddCoupon(prev => ({...prev, count: count + 1}));
  };

  const decrement = () => {
    const {count} = addCoupon;
    if (count > 1) {
      setAddCoupon(prev => ({...prev, count: count - 1}));
    } else {
      toastMsg(`Minimum 1 coupon required.`, 'warning');
    }
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        titleName={screenNames.coupons}
        goBack={() => navigation.goBack()}
        rightIcnAction={() => {
          setAddCoupon(true);
        }}
      />
      <SafeAreaView styles={[MyStyles.flex1]}>
        <Spinner spinnerVisible={loader} />
        {/* // @ Coupon card */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '25%'}}
          data={couponData?.couponList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                disabled={
                  item?.requestedCoupon === 'Y' || item?.requestStatus === 'X'
                }
                key={index + 1}
                activeOpacity={0.8}
                onPress={() => setQrCode({show: true, link: item?.qrLink})}
                style={[styles.couponCard]}>
                {/* // # Left Cutout */}
                <View style={[styles.cutout, styles.leftCutout]} />
                {/*  //# Vertical Line */}
                <View style={styles.verticalLine} />
                {/* // # Right Cutout */}
                <View style={[styles.cutout, styles.rightCutout]} />

                {/* // # Left Content */}
                <View style={styles.leftContent(item?.bgColor)}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.couponCodeTxt,
                      {color: item?.codeColor || COLORS.candlelight},
                    ]}>
                    {item?.code}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.couponCodeTxt,
                      styles.eventName,
                      {color: item?.titleColor || COLORS.white},
                    ]}>
                    {item?.title}
                  </Text>

                  <View style={styles.dtTimeContainer}>
                    {dateTime.map((dateItem, dateIndex) => {
                      return (
                        <View key={dateIndex} style={{width: '45%'}}>
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.labelTxt,
                              {color: item?.labelColor || COLORS.cloud},
                            ]}>
                            {dateItem}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.valueTxt,
                              {color: item?.dateColor || COLORS.white},
                            ]}>
                            {dateIndex === 0
                              ? moment(item?.dateTime).format('DD-MM-YYYY')
                              : moment(item?.dateTime).format('h:mm a')}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  {/* // # Pay Button */}
                  {item?.requestedCoupon === 'Y' && (
                    <TouchableOpacity
                      disabled={
                        item?.requestStatus === 'P' ||
                        item?.requestStatus === 'X'
                      }
                      onPress={() => {
                        if (item?.isPaid === 'Y') {
                          setAddCoupon({
                            open: true,
                            type: 'P',
                            count: item?.qty,
                            maxCount: item?.qty,
                            refId: item?.refId,
                          });
                        }
                        if (item?.isPaid === 'N') {
                          setAddCoupon({
                            open: true,
                            type: 'F',
                            count: item?.qty,
                            maxCount: item?.qty,
                            refId: item?.refId,
                          });
                        }
                      }}
                      activeOpacity={0.8}
                      style={[
                        styles.payBtn,
                        {backgroundColor: item?.btnBgColor || COLORS.golden},
                      ]}>
                      <Text
                        style={[
                          styles.btnTxt,
                          {
                            color: item?.btnTxtColor || COLORS.white,
                          },
                        ]}>
                        {item?.requestStatus === 'X'
                          ? 'Rejected'
                          : item?.requestStatus === 'P'
                          ? 'Pending'
                          : item?.requestStatus === 'A' && item?.isPaid === 'Y'
                          ? 'Pay Now'
                          : 'Reedem'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* // # Right Content */}
                <View style={styles.rightContent}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.eventName,
                      styles.qtyTxt,
                      {
                        color: item?.dateColor || COLORS.white,
                      },
                    ]}>
                    Qty
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.countTxt,
                      {color: item?.countColor || COLORS.candlelight},
                    ]}>
                    {item?.qty}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.valueTxt,
                      styles.amountTxt,
                      {
                        color: item?.dateColor || COLORS.white,
                      },
                    ]}>
                    {item?.isPaid === 'Y' ? 'Paid' : 'Free'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => getCouponsList()}
            />
          }
          ListEmptyComponent={
            !loader && <NoDataFound screen={screenNames.coupons} />
          }
        />
      </SafeAreaView>

      {/* // @ Add Coupon Modal */}
      <Modal animationType="slide" visible={addCoupon?.open} transparent>
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
              {addCoupon?.type === 'R' ? 'Request Coupon' : 'Avail Coupon'}
            </Text>
            {/* // # sub text  */}
            <Text numberOfLines={1} style={styles.subTxt}>
              Select how many Coupon you need.
            </Text>
            {/* // # horizontal line */}
            <View style={styles.horizontalLine} />
            {/* // # Incre-count-decre btn */}
            <View style={styles.flexContainer}>
              <TouchableOpacity
                onPress={() => decrement()}
                activeOpacity={0.8}
                style={styles.countBtn}>
                <MaterialCommunityIcons
                  name="minus"
                  size={moderateScale(25)}
                  color={COLORS.charcoal}
                />
              </TouchableOpacity>
              <Text style={styles.AddCpnCountTxt}>{addCoupon?.count}</Text>
              <TouchableOpacity
                onPress={() => increment()}
                activeOpacity={0.8}
                style={styles.countBtn}>
                <MaterialCommunityIcons
                  name="plus"
                  size={moderateScale(25)}
                  color={COLORS.charcoal}
                />
              </TouchableOpacity>
            </View>
            {/* // # horizontal line */}
            <View style={styles.horizontalLine} />
            {/* // # Amt section */}
            {addCoupon?.type !== 'F' && (
              <View
                style={[
                  styles.flexContainer,
                  {justifyContent: 'space-between'},
                ]}>
                <Text numberOfLines={1} style={styles.amtLblTxt}>
                  Prasadam Amount
                </Text>
                <Text numberOfLines={1} style={styles.amtValTxt}>
                  ₹ 80
                </Text>
              </View>
            )}
            {addCoupon?.type !== 'F' && (
              <View
                style={[
                  styles.flexContainer,
                  {justifyContent: 'space-between', marginTop: '2%'},
                ]}>
                <Text numberOfLines={1} style={styles.amtLblTxt}>
                  Total Amount
                </Text>
                <Text numberOfLines={1} style={styles.amtValTxt}>
                  ₹ 380
                </Text>
              </View>
            )}
            {/* // # horizontal line */}
            {addCoupon?.type !== 'F' && <View style={styles.horizontalLine} />}
            {/* // # Buttons */}
            <TouchableOpacity activeOpacity={0.8} style={styles.paymentBtn}>
              <Text
                style={[
                  styles.AddCpnCountTxt,
                  {color: COLORS.white, fontSize: SIZES.xl},
                ]}>
                {addCoupon?.type === 'R'
                  ? 'Request'
                  : addCoupon?.type === 'F'
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

      {/*  // @ Show QrCode */}
      <Modal
        animationType="slide"
        onRequestClose={() => setQrCode(false)}
        visible={qrCode}
        transparent>
        <Pressable onPress={() => setQrCode(false)} style={styles.fltrModal}>
          {/* // #  Qr Code Image */}
          <Pressable style={styles.qrCodeContainer}>
            <Image
              source={{
                uri: qrCode?.link,
              }}
              style={{height: '100%', width: '100%'}}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </Container>
  );
};

export default Coupons;

const styles = StyleSheet.create({
  couponCard: {
    backgroundColor: 'pink',
    width: '90%',
    borderTopRightRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),

    alignSelf: 'center',
    marginTop: '5%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cutout: {
    position: 'absolute',
    backgroundColor: COLORS.white, // Same as the background to create the cutout effect
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(20),
    // overflow: 'hidden',
    zIndex: 99,
  },
  leftCutout: {
    right: horizontalScale(80), // Moves it outside
    bottom: 0,
    transform: [{translateY: 10}],
  },
  rightCutout: {
    right: horizontalScale(80), // Moves it outside
    top: 0,
    transform: [{translateY: -10}],
  },
  verticalLine: {
    position: 'absolute',
    borderWidth: 0.7,
    borderColor: COLORS.white,
    borderStyle: 'dashed',
    height: '90%',
    right: horizontalScale(92),
    zIndex: 99,
  },
  leftContent: bgColor => ({
    backgroundColor: bgColor || COLORS.windowsBlue,
    width: horizontalScale(244.5),
  }),
  couponCodeTxt: {
    width: '85%',
    textAlign: 'left',
    alignSelf: 'center',
    color: COLORS.candlelight,
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    marginTop: '5%',
  },
  eventName: {
    fontSize: SIZES.subTitle,
    color: COLORS.white,
    textAlign: 'center',
  },
  dtTimeContainer: {
    marginTop: '7%',
    marginBottom: '5%',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  labelTxt: {
    width: '100%',
    color: COLORS.cloud,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
  },
  valueTxt: {
    width: '100%',
    marginTop: '5%',

    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
  },
  rightContent: {
    backgroundColor: COLORS.charcoal,
    width: horizontalScale(95),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyTxt: {
    width: '90%',
    textAlign: 'center',
    fontFamily: FONTS.urbanistBold,
  },
  countTxt: {
    marginTop: '2%',
    width: '85%',
    fontFamily: FONTS.urbanistBold,
    color: COLORS.candlelight,
    fontSize: SIZES.xxxl + 20,
    textAlign: 'center',
  },
  amountTxt: {
    marginTop: '2%',
    width: '85%',
    fontSize: SIZES.subTitle,
    textAlign: 'center',
  },
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
  AddCpnCountTxt: {
    fontFamily: FONTS.interMedium,
    fontSize: SIZES.xxl + SIZES.xxl,
    color: COLORS.black,
    marginHorizontal: '4%',
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
  payBtn: {
    width: horizontalScale(70),
    height: horizontalScale(25),
    borderRadius: moderateScale(4),
    marginBottom: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l,
  },
  qrCodeContainer: {
    width: windowWidth * 0.85,
    height: windowWidth * 0.85,
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
  },
});
