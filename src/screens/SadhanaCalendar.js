import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../components/Container';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import CircularProgress from '../components/CircularProgress';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Svg, {Circle} from 'react-native-svg';
import AndroidBackHandler from '../components/BackHandler';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {toastThrottle} from '../components/CommonFunctionalities';
import {useAppContext} from '../../App';
import Spinner from '../components/Spinner';
import {useFocusEffect} from '@react-navigation/native';

const SadhanaCalendar = props => {
  const {navigation, route} = props;
  const {globalState, setGlobalState} = useAppContext();

  const {profileId, reloadSadhana} = globalState;

  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  const [currentDate, setCurrentDate] = useState(moment(new Date()));
  const [spinner, setSpinner] = useState(true);

  const [sadhanaData, setSadhanaData] = useState({});

  const size = horizontalScale(30);
  const strokeWidth = horizontalScale(4);
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  useFocusEffect(
    useCallback(() => {
      if (reloadSadhana === 'Y') {
        getSadhanaDetails();
        setGlobalState(prev => ({...prev, reloadSadhana: 'N'}));
      }
    }, [currentDate, reloadSadhana]),
  );

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    getSadhanaDetails();

    return () => {
      AndroidBackHandler.removerHandler();
    };
  }, [currentDate]);

  // # Get Sadhana Details
  const getSadhanaDetails = async () => {
    try {
      !spinner && setSpinner(true);
      const params = {
        profileId,
        sadhanaMonth: moment(currentDate).format('MMM'),
        sadhanaYear: moment(currentDate).format('YYYY'),
      };
      const response = await API.getSadhanaDetails(params);

      const {data, successCode, message} = response?.data;
      console.log('Sadhana_response', data);
      if (successCode === 1) {
        setSadhanaData(data);
      } else {
        toastMsg(message, 'info');
      }
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
      console.log('ERR-Sadhana', err);
      toastMsg('', 'error');
    }
  };

  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const renderDay = date => {
    const sadhanaCalendar =
      (Array.isArray(sadhanaData?.sadhanaCalendar) &&
        sadhanaData?.sadhanaCalendar?.find(day => {
          return (
            day.sadhanaDate === moment(date.dateString).format('DD-MMM-YYYY')
          );
        })) ||
      {};
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (!!sadhanaCalendar?.sadhanaDate) {
            navigateTo(screenNames.sadhanaRegularize, {
              selSadhanaDate: moment(date.dateString).format('DD-MMM-YYYY'),
              sadhanaData: sadhanaData?.sadhanaCalendar,
            });
          } else {
          }
        }}
        style={styles.calendarDayCont}>
        <Text style={styles.dayTxt}>{date.day}</Text>
        {Number(sadhanaCalendar?.percentage) >= 100 ? (
          <View style={styles.perCircleCont(sadhanaCalendar?.progressColor)}>
            <IonIcons
              name="checkmark"
              size={horizontalScale(30) * 0.5}
              color={COLORS.white}
              style={{
                alignSelf: 'center',
              }}
            />
          </View>
        ) : (
          <CircularProgress
            percentage={sadhanaCalendar?.percentage}
            circleColor={sadhanaCalendar?.circleColor}
            progressColor={sadhanaCalendar?.progressColor}
          />
        )}
      </TouchableOpacity>
    );
  };

  const changeMonth = value => {
    if (value === -1) {
      // decrement
      setCurrentDate(prev => moment(prev).subtract(1, 'months'));
    } else {
      // increment
      setCurrentDate(prev => {
        const newDate = moment(prev).add(value, 'months');
        const now = moment();

        // Prevent navigating to future months
        if (newDate.isAfter(now, 'month')) {
          return prev;
        }

        return newDate;
      });
    }
  };

  return (
    <Container>
      <Spinner spinnerVisible={spinner} />

      {/* // # Header */}
      <CustomHeader
        goBack={() => navigation.goBack()}
        titleName={screenNames.sadhanaCalendar}
      />
      {/* // # Contents */}
      <View style={MyStyles.contentCont}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* // @ Sadhana Icons */}
          <View style={styles.sadhanaIcnCont}>
            {sadhanaData?.iconData?.map((item, index) => {
              const fillStroke = (item?.percentage / 100) * circumference;
              return (
                <View key={index}>
                  {item?.percentage < 100 && (
                    <View style={styles.icnTxtCont}>
                      <Svg width={size} height={size}>
                        {/* Full base circle (background color) */}
                        <Circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          stroke={item?.circleColor}
                          strokeWidth={strokeWidth}
                          fill="none"
                        />
                        {/* Foreground arc (partial fill) */}
                        <Circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          stroke={item?.progressColor}
                          strokeWidth={strokeWidth}
                          strokeDasharray={`${fillStroke}, ${circumference}`}
                          strokeLinecap="round"
                          fill="none"
                          rotation="-90"
                          originX={cx}
                          originY={cy}
                        />
                      </Svg>
                      <Text style={styles.percentageTxt}>{item?.text}</Text>
                    </View>
                  )}

                  {item?.percentage >= 100 && (
                    <View style={styles.icnTxtCont}>
                      <MaterialCommunityIcons
                        style={[
                          styles.iconStyle,
                          {backgroundColor: item?.progressColor},
                        ]}
                        name="check"
                        size={moderateScale(23)}
                        color={COLORS.white}
                      />
                      <Text style={styles.percentageTxt}>{item?.text}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* // @ Calendar */}
          <Calendar
            style={styles.calendar}
            maxDate={moment().format('YYYY-MM-DD')}
            key={currentDate.format('YYYY-MM')}
            current={currentDate.format('YYYY-MM-DD')}
            customHeader={() => {
              return (
                <>
                  {/* // # Month,Year and Arrows */}
                  <View style={styles.calHead}>
                    {/* // # Left Arrow */}
                    <TouchableOpacity
                      onPress={() => changeMonth(-1)}
                      style={styles.calArrowBtn}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name={'chevron-left'}
                        size={25}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                    {/* // # Month,Year */}
                    <View style={styles.monthYearCont}>
                      <Text style={styles.calMonthTxt}>
                        {moment(currentDate).format('MMMM')}
                      </Text>
                      <Text style={styles.calYearTxt}>
                        {moment(currentDate).format('YYYY')}
                      </Text>
                    </View>
                    {/* // # Right Arrow */}
                    <TouchableOpacity
                      onPress={() => changeMonth(1)}
                      style={styles.calArrowBtn}
                      activeOpacity={0.6}>
                      <MaterialCommunityIcons
                        name={'chevron-right'}
                        size={25}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* // # Horizontal Line */}
                  <View style={styles.horizontalLine} />

                  {/* // # Days Name */}
                  <View style={styles.dayNameCont}>
                    {DAYS.map((day, index) => (
                      <Text key={index} style={styles.dayNameTxt}>
                        {day}
                      </Text>
                    ))}
                  </View>
                </>
              );
            }}
            hideArrows={true}
            firstDay={1}
            hideExtraDays={true}
            dayComponent={({date}) => renderDay(date)}
            enableSwipeMonths={true}
          />
        </ScrollView>
      </View>
    </Container>
  );
};

export default SadhanaCalendar;

const styles = StyleSheet.create({
  sadhanaIcnCont: {
    marginTop: '2%',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    minHeight: verticalScale(60),
  },
  icnTxtCont: {
    marginTop: '10%',
    alignItems: 'center',
    width: horizontalScale(100),
  },
  iconStyle: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(20),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  percentageTxt: {
    marginTop: '5%',
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    fontSize: SIZES.m,
  },
  calendar: {
    width: '95%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  calHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthYearCont: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calMonthTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xxl,
    color: COLORS.black,
  },
  calYearTxt: {
    fontFamily: FONTS.urbanistRegular,
    fontSize: SIZES.xxl,
    color: COLORS.black,
    marginLeft: '2%',
  },
  calArrowBtn: {
    width: horizontalScale(30),
    height: horizontalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLine: {
    borderBottomColor: COLORS.blackOpacity01,
    borderBottomWidth: 1,
    marginVertical: '3%',
  },
  dayNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayNameTxt: {
    fontFamily: FONTS.poppinsBold,
    fontSize: SIZES.s,
    color: COLORS.gunsmoke,
    width: '14%',
    textAlign: 'center',
  },
  calendarDayCont: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  dayTxt: {
    fontSize: SIZES.m,
    color: COLORS.black,
    fontFamily: FONTS.urbanistSemiBold,
  },
  perCircleCont: bgColor => ({
    width: horizontalScale(30),
    height: horizontalScale(30),
    borderRadius: moderateScale(30),
    backgroundColor: bgColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  }),
});
