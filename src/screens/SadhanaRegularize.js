import {
  Image,
  SafeAreaView,
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

const ITEM_WIDTH = horizontalScale(40);

const SadhanaRegularize = ({navigation, route}) => {
  const {sadhanaData = [], selectedDate = ''} = route?.params;

  const [regularizeData, setRegularizeData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const scrollRef = useRef(null);

  useEffect(() => {
    const getSelectDateIndex =
      Array.isArray(sadhanaData) &&
      sadhanaData.findIndex(day => {
        return day?.sadhanaDate === currentDate;
      });

    setSelectedIndex(getSelectDateIndex >= 0 ? getSelectDateIndex : 0);

    if (scrollRef.current && getSelectDateIndex >= 0) {
      scrollRef.current.scrollTo({
        x: ITEM_WIDTH * getSelectDateIndex,
        animated: true,
      });
    }
  }, []);

  const regularizeFields = [
    {
      label: 'Enter rounds',
      id: 1,
      fieldName: 'Chanting',
      key: 'rounds',
    },
    {
      label: 'Enter minutes',
      id: 2,
      fieldName: 'Reading',
      key: 'reading',
    },
    {
      label: 'Enter time',
      id: 3,
      fieldName: 'Wake up time',
      key: 'wakeupTime',
    },
    {
      label: 'Enter time',
      id: 4,
      fieldName: 'Bed time',
      key: 'bedTime',
    },
  ];

  const onPressedDate = (index, item) => {
    setSelectedIndex(index);
    setCurrentDate(item?.day);
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
            moment(currentDate, 'DD-MMM-YYYY')
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
            moment(currentDate, 'DD-MMM-YYYY')
              .add(1, 'day')
              .format('DD-MMM-YYYY')
          );
        });
      increasedCount < sadhanaData?.length
        ? onPressedDate(increasedCount, getSelectDate[0])
        : null;
    }
  };

  return (
    <Container>
      <CustomHeader
        titleName={selectedDate}
        goBack={() => navigation.goBack()}
      />
      <SafeAreaView style={[MyStyles.flex1]}>
        <LinearGradientBg height={verticalScale(250)} />

        {/* // @ Date Selection */}
        <View style={styles.dateSelectCont}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            {Array.isArray(sadhanaData) &&
              sadhanaData?.map((item, index) => {
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
                      {Number(item?.percentage) == 100 ? (
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.regFields}>
          {regularizeFields.map((item, index) => (
            <View style={styles.fieldCont} key={index}>
              <View style={styles.iconFieldNameCont}>
                <Image
                  source={require('../assets/images/chantImg.png')}
                  style={styles.iconStyles}
                />
                <Text style={styles.fieldName}>{item?.fieldName}</Text>
              </View>
              <FloatingInput
                label={item?.label}
                drpdwnContStyle={styles.dropdownCntStyle}
                value={regularizeData[item?.key] || ''}
                onChangeText={val => handleChange(item?.key, val, index)}
                cntnrStyle={styles.dropdownCont}
              />
            </View>
          ))}

          {/* Update Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.updateBtn}>
            <Text style={styles.updateTxt}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default SadhanaRegularize;

const styles = StyleSheet.create({
  dateSelectCont: {
    width: '100%',
    alignSelf: 'center',
  },
  regFields: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: '5%',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
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
    backgroundColor: COLORS.dropDownBg,
  },
  dropdownCont: {
    width: '70%',
    alignSelf: 'center',
    height: verticalScale(45),
    minHeight: verticalScale(45),
    borderRadius: moderateScale(10),
    marginTop: 0,
    backgroundColor: COLORS.dropDownBg,
  },
  updateBtn: {
    marginTop: '15%',
    width: horizontalScale(150),
    height: verticalScale(40),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.atlantis,
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
});
