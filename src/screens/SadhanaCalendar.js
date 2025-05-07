import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
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

const SadhanaCalendar = props => {
  const {navigation} = props;
  const {globalState, setGlobalState} = useAppContext();

  const {profileId} = globalState;

  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  const [currentDate, setCurrentDate] = useState(moment(new Date()));
  const [spinner, setSpinner] = useState(false);

  const [calendarList, setCalendarList] = useState({
    iconData: {
      circleColor: '#EAECDC',
      progessColor: '#B1C63C',
      progess100: '#DAC056',
      progressCompleted: '',
    },
    monthData: [
      {
        day: '1',
        sadhanaDate: '01-May-2025',
        percentage: 50,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '2',
        sadhanaDate: '02-May-2025',
        percentage: 25,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '3',
        sadhanaDate: '03-May-2025',
        percentage: 100,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '4',
        sadhanaDate: '04-May-2025',
        percentage: 10,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '5',
        sadhanaDate: '05-May-2025',
        percentage: 30,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '6',
        sadhanaDate: '06-May-2025',
        percentage: 50,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '7',
        sadhanaDate: '07-May-2025',
        percentage: 10,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '8',
        sadhanaDate: '08-May-2025',
        percentage: 25,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '9',
        sadhanaDate: '09-May-2025',
        percentage: 10,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '10',
        sadhanaDate: '10-May-2025',
        percentage: 40,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '11',
        sadhanaDate: '11-May-2025',
        percentage: 100,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '12',
        sadhanaDate: '12-May-2025',
        percentage: 90,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '13',
        sadhanaDate: '13-May-2025',
        percentage: 100,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
      {
        day: '14',
        sadhanaDate: '14-May-2025',
        percentage: 0,
        circleColor: '#EAECDC',
        progressColor: '#DAC056',
      },
      {
        day: '15',
        sadhanaDate: '15-May-2025',
        percentage: 0,
        circleColor: '#EAECDC',
        progressColor: '#B1C63C',
      },
    ],
  });

  const size = horizontalScale(30);
  const strokeWidth = horizontalScale(4);
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  // 50% example - you can tweak this part
  const percentage = 50; // change to any value
  const fillStroke = (percentage / 100) * circumference;

  const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    getSadhanaDetails();

    return AndroidBackHandler.removerHandler();
  }, [currentDate]);

  // # Get Sadhana Details
  const getSadhanaDetails = async () => {
    try {
      const params = {
        profileId,
        month: moment(currentDate).format('MMM'),
        year: moment(currentDate).format('YYYY'),
      };
      const response = await API.getSadhanaDetails(params);

      const {data, successCode, message} = response?.data;
      console.log('Sadhana_response', data?.message);
      if (successCode === 1) {
        setCalendarList(data);
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
    const sadhanaData =
      (Array.isArray(calendarList) &&
        calendarList.find(day => {
          return (
            day.sadhanaDate === moment(date.dateString).format('DD-MMM-YYYY')
          );
        })) ||
      {};
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (!!sadhanaData?.sadhanaDate) {
            navigateTo(screenNames.sadhanaRegularize, {
              selectedDate: moment(date.dateString).format('DD-MMM-YYYY'),
              sadhanaData: calendarList,
            });
          } else {
          }
        }}
        style={styles.calendarDayCont}>
        <Text style={styles.dayTxt}>{date.day}</Text>
        {Number(sadhanaData?.percentage) == 100 ? (
          <View style={styles.perCircleCont(sadhanaData?.progressColor)}>
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
            percentage={sadhanaData?.percentage}
            circleColor={sadhanaData?.circleColor}
            progressColor={sadhanaData?.progressColor}
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
      <SafeAreaView style={MyStyles.flex1}>
        <Spinner spinnerVisible={spinner} />

        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.sadhanaCalendar}
        />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          {/* // @ Sadhana Icons */}
          <View style={styles.sadhanaIcnCont}>
            <View style={styles.icnTxtCont}>
              <Svg width={size} height={size}>
                {/* Full base circle (background color) */}
                <Circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  stroke="#EAECDC"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                {/* Foreground arc (partial fill) */}
                <Circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  stroke="#B1C63C"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${fillStroke}, ${circumference}`}
                  strokeLinecap="round"
                  fill="none"
                  rotation="-90"
                  originX={cx}
                  originY={cy}
                />
              </Svg>
              <Text style={styles.percentageTxt}>50%</Text>
            </View>

            <View style={styles.icnTxtCont}>
              <MaterialCommunityIcons
                style={[styles.iconStyle, {backgroundColor: COLORS.atlantis}]}
                name="check"
                size={moderateScale(23)}
                color={COLORS.white}
              />
              <Text style={styles.percentageTxt}>100%</Text>
            </View>

            <View style={styles.icnTxtCont}>
              <MaterialCommunityIcons
                style={[styles.iconStyle, {backgroundColor: COLORS.golden}]}
                name="check"
                size={moderateScale(23)}
                color={COLORS.white}
              />
              <Text style={styles.percentageTxt}>Full Completed</Text>
            </View>
          </View>

          {/* // @ Calendar */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.calendarContainer}>
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
              // onMonthChange={onMonthChange}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default SadhanaCalendar;

const styles = StyleSheet.create({
  sadhanaIcnCont: {
    marginTop: '4%',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icnTxtCont: {alignItems: 'center'},
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
  calendarContainer: {
    marginTop: '5%',
  },
  calendar: {
    width: '95%',
    alignSelf: 'center',
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
