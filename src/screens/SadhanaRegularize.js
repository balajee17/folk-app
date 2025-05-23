import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../components/Container';
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
import CustomHeader from '../components/CustomHeader';
import LinearGradientBg from '../components/LinearGradientBg';
import FloatingInput from '../components/FloatingInput';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import CircularProgress from '../components/CircularProgress';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {API} from '../services/API';
import Spinner from '../components/Spinner';
import {useToast} from 'react-native-toast-notifications';
import {useAppContext} from '../../App';
import {toastThrottle} from '../components/CommonFunctionalities';
import DateTimePicker from '@react-native-community/datetimepicker';

const ITEM_WIDTH = horizontalScale(40);

const SadhanaRegularize = props => {
  const {sadhanaData = [], selSadhanaDate = ''} = props?.route?.params;
  const {navigation} = props;

  const {globalState, setGlobalState} = useAppContext();

  const {profileId, buttonColor} = globalState;

  const [regularizeData, setRegularizeData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedDate, setSelectedDate] = useState(selSadhanaDate);
  const [regularizeFields, setRegularizeFields] = useState([]);
  const [calendarList, setCalendarList] = useState(sadhanaData);
  const [spinner, setSpinner] = useState(true);
  const [timePicker, setTimePicker] = useState({visible: false, selItem: {}});

  const scrollRef = useRef(null);

  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  useEffect(() => {
    const getSelectDateIndex =
      Array.isArray(sadhanaData) &&
      sadhanaData.findIndex(day => {
        return day?.sadhanaDate === selectedDate;
      });

    setSelectedIndex(getSelectDateIndex >= 0 ? getSelectDateIndex : 0);

    if (scrollRef.current && getSelectDateIndex >= 0) {
      scrollRef.current.scrollTo({
        x: ITEM_WIDTH * getSelectDateIndex,
        animated: true,
      });
    }
  }, []);

  useEffect(() => {
    getRegularizeFields();
  }, [selectedDate]);

  // # Get Regularize Fields
  const getRegularizeFields = async () => {
    try {
      !spinner && setSpinner(true);
      const params = {
        profileId,
        sadhanaDate: selectedDate,
      };
      const response = await API.getRegularizeFields(params);

      const {data, successCode, message} = response?.data;
      console.log('Regularize_response', data);
      if (successCode === 1) {
        setRegularizeFields(data?.regularizeFields);
      } else {
        toastMsg(message, 'info');
        setRegularizeFields([]);
      }
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
      setRegularizeFields([]);
      console.log('ERR-Regularize', err);
      toastMsg('', 'error');
    }
  };

  // # Update Sadhana Details
  const updateSadhanaDetails = async () => {
    try {
      setSpinner(true);
      const params = {
        profileId,
        sadhanaDate: selectedDate,
        sadhanaFields: regularizeData,
      };
      const response = await API.updateSadhanaDetails(params);

      console.log('Update_Sadhana_response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setCalendarList(data?.sadhanaCalendar);
        toastMsg(message, 'success');
      } else {
        toastMsg(message, 'info');
      }
      setGlobalState(prev => ({...prev, reloadSadhana: 'Y'}));
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
      console.log('ERR-Update_Sadhana', err);
      toastMsg('', 'error');
    }
  };

  const onPressedDate = (index, item) => {
    setRegularizeData({});
    setSelectedIndex(index);
    setSelectedDate(item?.sadhanaDate);
    if (scrollRef.current && index >= 0) {
      const scrollToX = ITEM_WIDTH * index - windowWidth / 2;
      scrollRef.current.scrollTo({
        x: Math.max(0, scrollToX),
        animated: true,
      });
    }
  };

  const handleChange = (key, value) => {
    setRegularizeData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeDate = (value, index) => {
    if (value === -1) {
      // decrement
      const decreasedCount = Number(selectedIndex) - 1;
      const getSelectDate =
        Array.isArray(sadhanaData) &&
        sadhanaData.filter(day => {
          return (
            day?.sadhanaDate ===
            moment(selectedDate, 'DD-MMM-YYYY')
              .subtract(1, 'day')
              .format('DD-MMM-YYYY')
          );
        });
      decreasedCount < 0
        ? null
        : onPressedDate(decreasedCount, getSelectDate[0]);
    } else {
      // increment
      const increasedCount = Number(selectedIndex) + 1;
      const getSelectDate =
        Array.isArray(sadhanaData) &&
        sadhanaData.filter(day => {
          return (
            day?.sadhanaDate ===
            moment(selectedDate, 'DD-MMM-YYYY')
              .add(1, 'day')
              .format('DD-MMM-YYYY')
          );
        });
      increasedCount < sadhanaData?.length
        ? onPressedDate(increasedCount, getSelectDate[0])
        : null;
    }
  };

  const checkDataExists = () => {
    if (Object.keys(regularizeData)?.length === 0) {
      toastMsg('Please fill in at least one field.', 'info');
      return false;
    }

    updateSadhanaDetails();
  };

  const getTimeAsDate = timeStr => {
    const [time, modifier] = timeStr?.split(' ');
    let [hours, minutes] = time?.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    console.log('date', date);
    return date;
  };

  const closePicker = () => {
    setTimePicker({visible: false});
  };

  return (
    <Container>
      <CustomHeader
        titleName={selectedDate}
        goBack={() => navigation.goBack()}
      />
      <Spinner spinnerVisible={spinner} />
      <LinearGradientBg
        height={verticalScale(450)}
        points={{one: 1, two: 1, three: 0.4, four: 0.1}}
      />

      {/* // @ Date Selection */}
      <View style={styles.dateSelectCont}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {Array.isArray(calendarList) &&
            calendarList?.map((item, index) => {
              const isSelected = index === selectedIndex;

              const animatedStyle = useAnimatedStyle(() => {
                return {
                  backgroundColor: withTiming(
                    isSelected ? COLORS.white : COLORS.modalBg,
                    {
                      duration: 300,
                    },
                  ),
                };
              });

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => onPressedDate(index, item)}>
                  <Animated.View style={[styles.circle, animatedStyle]}>
                    <Text
                      style={[
                        styles.dateText,
                        {color: isSelected ? COLORS.black : COLORS.white},
                      ]}>
                      {item?.day}
                    </Text>
                    {Number(item?.percentage) >= 100 ? (
                      <View style={styles.perCircleCont(item?.progressColor)}>
                        <IonIcons
                          name="checkmark"
                          size={horizontalScale(28) * 0.5}
                          color={COLORS.white}
                          style={{
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                    ) : (
                      <CircularProgress
                        percentage={item?.percentage}
                        circleColor={item?.circleColor}
                        progressColor={item?.progressColor}
                        circleSize={horizontalScale(28)}
                      />
                    )}
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        {/* // # Date Changing Btns */}
        <View style={styles.dateChangeBtnCont}>
          <TouchableOpacity
            onPress={() => changeDate(-1)}
            activeOpacity={0.8}
            style={styles.changeDtBtn}>
            <Entypo
              name="chevron-thin-left"
              size={horizontalScale(15)}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeDate(1)}
            activeOpacity={0.8}
            style={styles.changeDtBtn}>
            <Entypo
              name="chevron-thin-right"
              size={horizontalScale(15)}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* // @ Regularize Fields */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.regFields}>
        {Array.isArray(regularizeFields) &&
          regularizeFields?.map((item, index) => (
            <View style={styles.fieldCont} key={index}>
              <View style={styles.iconFieldNameCont}>
                <Image
                  source={{uri: item?.sadhanaIcon}}
                  style={styles.iconStyles}
                />
                <Text style={styles.fieldName}>{item?.sadhana}</Text>
              </View>
              <Pressable
                onPress={() => {
                  if (item?.inputType === 'C') {
                    const timeValue = !!item?.sadhanaVal
                      ? getTimeAsDate(item?.sadhanaVal)
                      : new Date();
                    console.log('timeValue', timeValue);
                    setTimePicker({
                      visible: true,
                      selItem: item,
                      time: timeValue,
                    });
                  }
                }}>
                {/* <View pointerEvents="none"> */}
                <FloatingInput
                  label={item?.placeHolder}
                  editable={item?.inputType !== 'C'}
                  keyboardType="default"
                  drpdwnContStyle={styles.dropdownCntStyle}
                  value={
                    regularizeData.hasOwnProperty(item?.sadhana)
                      ? regularizeData[item?.sadhana]
                      : item?.sadhanaVal
                  }
                  onChangeText={val => handleChange(item?.sadhana, val)}
                  cntnrStyle={styles.dropdownCont}
                  labelStyle={{color: COLORS.textLabel}}
                  txtInptStyle={styles.txtInptStyle}
                />
                {/* </View> */}
              </Pressable>
            </View>
          ))}

        {/* // @ Update Button */}
        {Array.isArray(regularizeFields) && regularizeFields?.length > 0 && (
          <TouchableOpacity
            onPress={() => checkDataExists()}
            activeOpacity={0.8}
            style={[
              styles.updateBtn,
              {backgroundColor: buttonColor || COLORS.button},
            ]}>
            <Text style={styles.updateTxt}>Update</Text>
          </TouchableOpacity>
        )}
        {/* // # Time Picker */}
        {timePicker?.visible && Platform.OS === 'ios' && (
          <Modal
            transparent
            animationType="slide"
            visible={true}
            onRequestClose={() => closePicker()}>
            <Pressable onPress={() => closePicker()} style={MyStyles.modal}>
              <View style={styles.modalTimeBox}>
                <DateTimePicker
                  mode="time"
                  value={
                    moment(timePicker?.time, 'hh:mm a').toDate() || new Date()
                  }
                  onChange={(event, selectedTime) => {
                    if (selectedTime) {
                      setTimePicker(prev => ({
                        ...prev,
                        time: selectedTime,
                      }));
                    }
                  }}
                  display="spinner"
                />
                <TouchableOpacity
                  onPress={() => {
                    handleChange(
                      timePicker?.selItem?.sadhana,
                      moment(timePicker?.time).format('hh:mm a'),
                    );
                    setTimePicker({visible: false});
                  }}
                  style={styles.doneBtn}>
                  <Text style={styles.doneTxt}>Done</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        )}

        {timePicker?.visible && Platform.OS === 'android' && (
          <DateTimePicker
            mode="time"
            value={moment(timePicker?.time, 'hh:mm a').toDate() || new Date()}
            onChange={(event, selectedTime) => {
              closePicker();
              if (event.type === 'set' && selectedTime) {
                handleChange(
                  timePicker?.selItem?.sadhana,
                  moment(selectedTime).format('hh:mm a'),
                );
              }
            }}
            display="default"
          />
        )}
      </ScrollView>
    </Container>
  );
};

export default SadhanaRegularize;

const styles = StyleSheet.create({
  dateSelectCont: {
    width: '100%',
    alignSelf: 'center',
    minHeight: verticalScale(100),
    marginTop: '4%',
  },
  regFields: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: '5%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  fieldCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: '5%',
  },
  iconStyles: {
    width: horizontalScale(45),
    height: horizontalScale(45),
    borderRadius: moderateScale(30),
  },
  fieldName: {
    marginTop: '2%',
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.m,
    color: COLORS.black,
  },
  iconFieldNameCont: {
    width: '25%',
    alignItems: 'center',
  },
  dropdownCntStyle: {
    backgroundColor: COLORS.inptBg,
  },
  dropdownCont: {
    width: '92%',
    alignSelf: 'center',
    height: verticalScale(45),
    minHeight: verticalScale(45),
    borderRadius: moderateScale(10),
    marginTop: 0,
    backgroundColor: COLORS.inptBg,
    paddingHorizontal: '2.5%',
  },
  updateBtn: {
    marginTop: '15%',
    width: horizontalScale(150),
    height: verticalScale(40),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.button,
  },
  updateTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.l,
    color: COLORS.white,
  },

  // # Date Selector styles
  perCircleCont: bgColor => ({
    width: horizontalScale(28),
    height: horizontalScale(28),
    borderRadius: moderateScale(50),
    backgroundColor: bgColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  }),
  circle: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    borderRadius: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(4),
  },
  dateText: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.m,
    color: COLORS.white,
    marginTop: '4%',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: '2%',
  },

  dateChangeBtnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  changeDtBtn: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.blackOpacity01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTimeBox: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  doneBtn: {
    backgroundColor: COLORS.header,
    padding: '4%',
    alignItems: 'center',
  },
  doneTxt: {
    color: COLORS.white,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.xl,
  },
  txtInptStyle: {
    color: COLORS.black,
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l,
  },
});
