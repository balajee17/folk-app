import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';

const Notifications = ({navigation}) => {
  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.notifications}
        />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              MyStyles.scrollView,
              MyStyles.paddingHor10,
            ]}>
            {/* // @ Notification Card */}
            <View style={styles.notifyCard}>
              {/* // #  icon title container */}
              <View style={styles.titleIconCont}>
                <View style={styles.circleIcon}>
                  <Text style={styles.iconLetter}>K</Text>
                </View>

                <Text numberOfLines={2} style={styles.titleTxt}>
                  Mango Mania
                </Text>
              </View>

              {/* // #  Description */}
              <Text style={styles.descrpTxt}>
                These were three personalized sessions one-on-one at a date and
                time convenient to the participants
              </Text>

              {/* // # Date time age Container */}
              <View style={[styles.titleIconCont, styles.dateTimeCont]}>
                <Text style={styles.dateTxt}>20/05/2025</Text>
                <Text style={[styles.dateTxt, {textAlign: 'right'}]}>
                  10 min ago
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  notifyCard: {
    backgroundColor: COLORS.chromeWhite,
    width: '100%',
    marginTop: '4%',
    padding: '3%',
    borderRadius: moderateScale(20),
  },
  titleIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIcon: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLetter: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  titleTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.subTitle,
    color: COLORS.black,
    width: '85%',
    marginLeft: '4%',
  },
  descrpTxt: {
    fontFamily: FONTS.urbanistMedium,
    fontSize: SIZES.l,
    color: COLORS.midGrey,
    width: '100%',
    marginTop: '2%',
  },
  dateTimeCont: {justifyContent: 'space-between', marginTop: '4%'},
  dateTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
    color: COLORS.midGrey,
    width: '25%',
  },
});
