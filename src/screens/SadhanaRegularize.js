import {
  Image,
  SafeAreaView,
  ScrollView,
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
  verticalScale,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import LinearGradientBg from '../components/LinearGradientBg';
import FloatingInput from '../components/FloatingInput';

const SadhanaRegularize = ({navigation, route}) => {
  const [regularizeData, setReqularizeData] = useState({});

  const regularizeFields = [
    {
      label: 'Enter rounds',
      id: 1,
      fieldName: 'Chanting',
      key: 'rounds',
      value: '',
    },
    {
      label: 'Enter minutes',
      id: 2,
      fieldName: 'Reading',
      key: 'reading',
      value: '',
    },
    {
      label: 'Enter time',
      id: 3,
      fieldName: 'Wake up time',
      key: 'wakeupTime',
      value: '',
    },
    {
      label: 'Enter time',
      id: 4,
      fieldName: 'Bed time',
      key: 'bedTime',
      value: '',
    },
  ];

  const handleChange = (key, value) => {
    setReqularizeData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        titleName={route?.params?.titleName}
        goBack={() => navigation.goBack()}
      />
      <SafeAreaView style={[MyStyles.flex1]}>
        <LinearGradientBg height={verticalScale(250)} />

        {/* // # Date Selection  */}
        <View style={styles.dateSelectCont}></View>

        {/* // # Regularize Fields */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.regFields}>
          {regularizeFields.map((item, index) => (
            <View style={styles.fieldCont}>
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
                value={item?.value}
                onChangeText={item => {
                  handleChange(item?.key, item);
                }}
                cntnrStyle={styles.dropdownCont}
              />
            </View>
          ))}

          {/* // # Update Btn */}
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => sendEditProfile()}
            style={styles.updateBtn}>
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
    // backgroundColor: 'pink',
    height: verticalScale(120),
    width: '95%',
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
});
