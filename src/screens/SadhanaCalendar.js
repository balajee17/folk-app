import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const SadhanaCalendar = props => {
  const {navigation} = props;

  const [currentDate, setCurrentDate] = useState(new Date());

  const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  const calendarList = [
    {day: '1', sadhanaDate: '1-Apr-2025', progress: 50},
    {day: '2', sadhanaDate: '2-Apr-2025', progress: 25},
    {day: '3', sadhanaDate: '3-Apr-2025', progress: 100},
  ];

  const renderDay = date => {
    const dayData =
      (Array.isArray(calendarList) &&
        calendarList.find(
          day =>
            day.sadhanaDate === moment(date.dateString).format('DD-MMM-YYYY'),
        )) ||
      {};
    console.log('dayData', dayData);
    return (
      <View style={{backgroundColor: 'pink'}}>
        <Text
          style={{
            fontSize: SIZES.m,
            color: COLORS.black,
            fontFamily: FONTS.urbanistSemiBold,
          }}>
          {dayData?.day}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
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
              <Image
                style={styles.iconStyle}
                source={require('../assets/images/50PerCircle.png')}
              />
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
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              maxDate={new Date()}
              key={currentDate}
              current={currentDate}
              customHeader={() => {
                return (
                  <>
                    {/* // # Month,Year and Arrows */}
                    <View style={styles.calHead}>
                      {/* // # Left Arrow */}
                      <TouchableOpacity
                        // onPress={() => addMonth(-1)}
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
                        // onPress={() => addMonth(1)}
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
              theme={
                {
                  // indicatorColor: color.deepRose,
                  // arrowColor: color.deepRose,
                  // todayTextColor: color.deepRose,
                  // textDayStyle: {
                  //   fontFamily: fontFamily.ReemKufiBold,
                  // },
                  // monthTextColor: color.white,
                  // agendaDayTextColor: color.black,
                }
              }
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              dayComponent={({date}) => renderDay(date)}
              enableSwipeMonths={true}
              // onMonthChange={this.onMonthChange}
            />
          </View>
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
    justifyContent: 'space-around',
  },
  dayNameTxt: {
    fontFamily: FONTS.poppinsBold,
    fontSize: SIZES.s,
    color: COLORS.gunsmoke,
  },
});
