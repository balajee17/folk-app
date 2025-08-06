import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
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
  verticalScale,
} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import AndroidBackHandler from '../components/BackHandler';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';
import AccommodationCard from '../components/AccommodationCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {API} from '../services/API';
import {ShowQrCode} from '../components/CommonFunctionalities';
import FloatingInput from '../components/FloatingInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from '../components/Spinner';
import NoDataFound from '../components/NoDataFound';

const Accommodation = props => {
  const {globalState, setGlobalState} = useAppContext();
  const {profileId} = globalState;

  const {navigation, route} = props;
  const [openQrCode, setOpenQrCode] = useState({visible: false, qrLink: ''});
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [historyScreen, setHistoryScreen] = useState({
    visible: false,
    historyList: [],
    page: 1,
    lastPage: null,
    loadMore: false,
    noData: false,
  });
  const [requestModal, setRequestModal] = useState({
    visible: false,
    date: moment().format('DD-MMM-YYYY'),
    reason: '',
  });
  const [requestLists, setRequestLists] = useState([]);
  const [datePicker, setDatePicker] = useState(false);

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getRequestLists();

    return AndroidBackHandler.removerHandler();
  }, []);

  const closeModal = () => {
    setRequestModal(prev => ({...prev, visible: false}));
  };

  useEffect(() => {
    if (historyScreen.visible) {
      if (historyScreen.loadMore || historyScreen.page === 1) {
        if (historyScreen.page === 1) {
          setLoader(true);
        }
        getHistoryLists();
      }
    }
  }, [historyScreen.page, historyScreen.loadMore, historyScreen.visible]);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  // # API to Request List
  const getRequestLists = async () => {
    try {
      const params = {profileId};
      const response = await API.accommodationRequestList(params);

      console.log('Acc_List_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setRequestLists(data);
      } else {
        toastMsg(message, 'warning');
      }
      setRefresh(false);
      setLoader(false);
    } catch (err) {
      console.log('ERR-Acc_list-screen', err);
      setLoader(false);
      toastMsg('', 'error');
    }
  };

  // # API to get history list
  const getHistoryLists = async () => {
    try {
      const params = {profileId, page: historyScreen?.page};
      const response = await API.accommodationHistoryList(params);

      console.log('Acc_Hsty_List_response', response?.data);
      const {data, successCode, message, lastPage} = response?.data;
      if (successCode === 1) {
        setHistoryScreen(prev => ({
          ...prev,
          historyList: prev.page === 1 ? data : [...prev.historyList, ...data],
          lastPage,
          loadMore: false,
          noData: prev.page === 1 && data?.length === 0,
        }));
      } else {
        toastMsg(message, 'warning');
        setHistoryScreen(prev => ({
          ...prev,
          loadMore: false,
          noData: data?.length === 0 ? true : false,
        }));
      }
      setRefresh(false);
      setLoader(false);
    } catch (err) {
      console.log('ERR-Acc_Hsty_list-screen', err);
      setLoader(false);
      setHistoryScreen(prev => ({
        ...prev,
        loadMore: false,
      }));
      toastMsg('', 'error');
    }
  };

  // # API to Request Accommodation
  const requestAccommodation = async () => {
    try {
      if (!requestModal?.date) {
        toastMsg('Please select a date.', 'warning');
        return;
      }
      if (!requestModal?.reason) {
        toastMsg('Please enter a reason for the request.', 'warning');
        return;
      }
      setLoader(true);
      const params = {
        profileId,
        bookingDate: requestModal?.date,
        reason: requestModal?.reason,
      };
      const response = await API.accommodationRequest(params);

      console.log('REQ_Acc_response', response?.data);
      const {successCode, message} = response?.data;
      if (successCode === 1) {
        toastMsg(message, 'success');
        setLoader(true);
        setRequestModal({
          visible: false,
          reason: '',
          date: moment(new Date()).format('DD-MMM-YYYY'),
        });
        getRequestLists();
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      console.log('ERR-REquest_acc-screen', err);
      setLoader(false);
      toastMsg('', 'error');
    }
  };

  const handleLoadMore = () => {
    if (
      historyScreen.visible &&
      !historyScreen.loadMore &&
      historyScreen.page < historyScreen.lastPage
    ) {
      setHistoryScreen(prev => ({
        ...prev,
        loadMore: true,
        page: prev.page + 1,
      }));
    }
  };

  const renderFooter = () => {
    if (!historyScreen.visible || !historyScreen.loadMore) {
      return null;
    }
    return (
      <View style={{marginTop: '2%'}}>
        <ActivityIndicator size="large" color={COLORS.header} />
      </View>
    );
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={route?.params?.titleName}
        id={route?.params?.id}
        rightIcnAction={() => {
          setRequestModal(prev => ({...prev, visible: true}));
        }}
      />
      {/* // # Spinner */}
      <Spinner spinnerVisible={loader} />
      {/* // # Contents */}
      <View style={[MyStyles.contentCont, styles.mainContainer]}>
        {/* // # Request List Title and history Icn */}
        <View style={styles.titleIcnCont}>
          <Text style={styles.titleTxt}>
            {historyScreen?.visible ? 'History List' : 'Request List'}
          </Text>
          <MaterialIcons
            onPress={() => {
              historyScreen?.visible
                ? setHistoryScreen(prev => ({...prev, visible: false}))
                : setHistoryScreen(prev => ({...prev, visible: true}));
            }}
            name={historyScreen?.visible ? 'close' : 'history'}
            size={moderateScale(22)}
            color={COLORS.black}
          />
        </View>

        {/* // # Request List card */}
        <FlatList
          data={
            historyScreen?.visible ? historyScreen?.historyList : requestLists
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: '2%', paddingBottom: '25%'}}
          renderItem={({item, index}) => (
            <>
              <AccommodationCard
                historyScreen={historyScreen?.visible}
                data={item}
                index={index}
                openQrCode={link =>
                  setOpenQrCode({visible: true, qrLink: link})
                }
              />
            </>
          )}
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(true);
            if (historyScreen?.visible) {
              setHistoryScreen(prev => ({
                ...prev,
                lastPage: null,
                historyList: [],
                page: 1,
                loadMore: false,
                noData: false,
              }));
            } else {
              setRequestLists([]);
              getRequestLists();
            }
          }}
          ListEmptyComponent={!loader && <NoDataFound />}
          onEndReached={() => {
            if (!loader && historyScreen.visible && !historyScreen.loadMore) {
              handleLoadMore();
            }
          }}
          ListFooterComponent={renderFooter}
        />
      </View>

      {/* // @ Modal for Request */}
      <Modal
        transparent
        animationType="slide"
        visible={requestModal?.visible}
        onRequestClose={() => closeModal()}>
        <Pressable style={[MyStyles.modal, styles.modalStyle]}>
          <View style={styles.modalBox}>
            {/* // # Request Txt and Close Btn */}
            <View style={styles.titleIcnCont}>
              <Text style={[styles.titleTxt, {fontSize: SIZES.subTitle}]}>
                Request
              </Text>
              <AntDesign
                onPress={() => closeModal()}
                name="close"
                size={moderateScale(20)}
                color={COLORS.black}
              />
            </View>
            {/* // # Date */}
            <Pressable onPress={() => setDatePicker(true)}>
              <FloatingInput
                label={'Date'}
                drpdwnContStyle={styles.dropdownCntStyle}
                value={requestModal?.date}
                editable={false}
                txtInptStyle={{width: '85%'}}
                cntnrStyle={styles.dropdownCont}
                rightIcon={
                  <MaterialIcons
                    name={'calendar-month'}
                    color={COLORS.black}
                    size={25}
                  />
                }
              />
            </Pressable>
            {/* // # Reason */}
            <FloatingInput
              label={'Reason'}
              drpdwnContStyle={[styles.dropdownCntStyle]}
              value={requestModal?.reason}
              multiline
              numberOfLines={3}
              txtInptStyle={{
                width: '100%',
                height: verticalScale(68),
              }}
              onChangeText={item => {
                setRequestModal(prev => ({...prev, reason: item}));
              }}
              cntnrStyle={[styles.dropdownCont, {height: verticalScale(68)}]}
            />

            {/* // # cancel Request Btn */}
            <View style={styles.mdlBtnCont}>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                }}
                activeOpacity={0.9}
                style={styles.paymentBtn}>
                <Text style={[styles.AddCpnCountTxt]}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHistoryScreen(prev => ({
                    ...prev,
                    visible: false,
                    loadMore: false,
                  }));
                  requestAccommodation();
                }}
                activeOpacity={0.9}
                style={[styles.paymentBtn, {backgroundColor: COLORS.header}]}>
                <Text style={[styles.AddCpnCountTxt, {color: COLORS.white}]}>
                  Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* // @ QR Code Modal */}
      <ShowQrCode
        visible={openQrCode?.visible}
        closeModal={() => setOpenQrCode({visible: false, qrLink: ''})}
        imageUrl={openQrCode?.qrLink}
      />

      {/* // @ Date Picker */}
      {datePicker && (
        <DateTimePicker
          mode="date"
          minimumDate={new Date()}
          value={requestModal?.date ? new Date(requestModal?.date) : new Date()}
          onChange={(event, selectedDate) => {
            setDatePicker(false);
            if (selectedDate) {
              setRequestModal(prev => ({
                ...prev,
                date: moment(selectedDate).format('DD-MMM-YYYY'),
              }));
            }
          }}
          display="spinner"
        />
      )}

      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={''}
        setSelIcon={value => {
          if (value) {
            navigation.navigate(screenNames.switcherScreen);
            setGlobalState(prev => ({...prev, btTab: value, current: value}));
          }
        }}
      />
    </Container>
  );
};

export default Accommodation;

const styles = StyleSheet.create({
  mainContainer: {
    padding: '4%',
  },
  titleIcnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xxl,
    color: COLORS.black,
  },
  modalStyle: {justifyContent: 'center', alignItems: 'center'},
  modalBox: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    width: '90%',
    padding: '3%',
  },
  dropdownCont: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: '4%',
    marginTop: '5%',
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.inptBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownCntStyle: {
    backgroundColor: COLORS.inptBg,
    alignSelf: 'left',
  },
  mdlBtnCont: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'flex-end',
  },
  paymentBtn: {
    backgroundColor: COLORS.border,
    borderRadius: moderateScale(20),
    height: horizontalScale(35),
    width: '47%',
    alignItems: 'center',
    marginTop: '2%',
    justifyContent: 'center',
  },
  AddCpnCountTxt: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: SIZES.m,
    color: COLORS.black,
    textAlign: 'center',
    top: 2,
  },
});
