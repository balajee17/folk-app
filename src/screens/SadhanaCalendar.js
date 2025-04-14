import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
} from '../styles/MyStyles';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SadhanaCalendar = props => {
  const {navigation} = props;
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
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default SadhanaCalendar;

const styles = StyleSheet.create({
  sadhanaIcnCont: {
    backgroundColor: 'pink',
    marginTop: '4%',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icnTxtCont: {backgroundColor: 'yellow', alignItems: 'center'},
  iconStyle: {
    width: horizontalScale(35),
    height: horizontalScale(35),
    borderRadius: moderateScale(30),
    backgroundColor: 'red',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  percentageTxt: {
    marginTop: '5%',
    fontFamily: FONTS.urbanistBold,
  },
});
