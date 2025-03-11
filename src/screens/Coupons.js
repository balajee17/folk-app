import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
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

const Coupons = ({navigation, route}) => {
  const {globalState} = useAppContext();

  const {profileId} = globalState;
  const dateTime = ['Date', 'Time'];
  const {eventId} = route?.params;

  const [opnAddCoupon, setOpnAddCoupon] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [loader, setLoader] = useState(false);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const closeAddCpnModal = () => {
    setOpnAddCoupon(false);
  };

  useEffect(() => {
    getCouponsList();
  }, []);

  const getCouponsList = async () => {
    try {
      const params = {profile_id: profileId, eventId: eventId};
      const response = await API.getCouponList(params);

      console.log('Coupon_List_response', response?.data);
      const {data, SuccessCode, message} = response?.data;
      if (SuccessCode === 1) {
        setCouponData(data);
      } else {
        setCouponData([]);
        toastMsg(message, 'info');
      }
      setLoader(false);
    } catch (err) {
      setCouponData([]);
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR-Coupon_List-screen', err);
    }
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        titleName={screenNames.coupons}
        goBack={() => navigation.goBack()}
        rightIcnAction={() => {
          setOpnAddCoupon(true);
        }}
      />
      <SafeAreaView styles={[MyStyles.flex1]}>
        <View style={MyStyles.contentCont}>
          {/* // @ Coupon card */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setShowQrCode(true)}
            style={styles.couponCard}>
            {/* // # Left Cutout */}
            <View style={[styles.cutout, styles.leftCutout]} />
            {/*  //# Vertical Line */}
            <View style={styles.verticalLine} />
            {/* // # Right Cutout */}
            <View style={[styles.cutout, styles.rightCutout]} />

            {/* // # Left Content */}
            <View style={styles.leftContent}>
              <Text numberOfLines={2} style={styles.couponCodeTxt}>
                ECPN-5-5365
              </Text>
              <Text
                numberOfLines={2}
                style={[styles.couponCodeTxt, styles.eventName]}>
                Prasadam Coupon
              </Text>

              <View style={styles.dtTimeContainer}>
                {dateTime.map((item, index) => {
                  return (
                    <View key={index + 1} style={{width: '45%'}}>
                      <Text numberOfLines={1} style={styles.labelTxt}>
                        {item}
                      </Text>
                      <Text numberOfLines={1} style={styles.valueTxt}>
                        {index === 0 ? '11-02-2025' : '10:30 AM'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* // # Right Content */}
            <View style={styles.rightContent}>
              <Text numberOfLines={1} style={[styles.eventName, styles.qtyTxt]}>
                Qty
              </Text>
              <Text numberOfLines={1} style={styles.countTxt}>
                01
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.valueTxt, styles.amountTxt]}>
                ₹ 120
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* // @ Add Coupon Modal */}
      <Modal animationType="slide" visible={opnAddCoupon} transparent>
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
              Buy Coupon
            </Text>
            {/* // # sub text  */}
            <Text numberOfLines={1} style={styles.subTxt}>
              Select how many Coupon you need.
            </Text>
            {/* // # horizontal line */}
            <View style={styles.horizontalLine} />
            {/* // # Incre-count-decre btn */}
            <View style={styles.flexContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.countBtn}>
                <MaterialCommunityIcons
                  name="minus"
                  size={moderateScale(25)}
                  color={COLORS.charcoal}
                />
              </TouchableOpacity>
              <Text style={styles.AddCpnCountTxt}>100</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.countBtn}>
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
            <View
              style={[styles.flexContainer, {justifyContent: 'space-between'}]}>
              <Text numberOfLines={1} style={styles.amtLblTxt}>
                Prasadam Amount
              </Text>
              <Text numberOfLines={1} style={styles.amtValTxt}>
                ₹ 80
              </Text>
            </View>
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
            {/* // # horizontal line */}
            <View style={styles.horizontalLine} />
            {/* // # Buttons */}
            <TouchableOpacity activeOpacity={0.8} style={styles.paymentBtn}>
              <Text
                style={[
                  styles.AddCpnCountTxt,
                  {color: COLORS.white, fontSize: SIZES.xl},
                ]}>
                Payment
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
        onRequestClose={() => setShowQrCode(false)}
        visible={showQrCode}
        transparent>
        <Pressable
          onPress={() => setShowQrCode(false)}
          style={styles.fltrModal}>
          {/* // #  Qr Code Image */}
          <Pressable
            style={{
              width: windowWidth * 0.85,
              height: windowWidth * 0.85,
              backgroundColor: '#fff',
              borderRadius: moderateScale(20),
            }}>
            <Image
              source={{
                uri: 'https://pngimg.com/uploads/qr_code/small/qr_code_PNG33.png',
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
  leftContent: {
    backgroundColor: COLORS.windowsBlue,
    width: horizontalScale(244.5),
  },
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
    paddingVertical: '5%',
    alignItems: 'center',
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
});
