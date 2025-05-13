import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import {ImageShimmer, TitleShimmer} from '../components/Shimmer';
import {useAppContext} from '../../App';

const AttendanceHistory = ({shimmer, attendanceHistory}) => {
  const {globalState} = useAppContext();
  const {cardColor} = globalState;

  return shimmer ? (
    <View style={[styles.attendanceCard, {backgroundColor: COLORS.card}]}>
      <View style={styles.evtImgNameCont}>
        {/* // # Event Image */}
        <ImageShimmer
          width={horizontalScale(60)}
          borderRadius={moderateScale(40)}
          height={horizontalScale(60)}
        />

        {/* // # Event Name & Event Description */}
        <View style={styles.nameDescrpCont}>
          <TitleShimmer height={verticalScale(15)} width={verticalScale(200)} />
          <TitleShimmer height={verticalScale(12)} width={verticalScale(150)} />
        </View>
      </View>
      {/*  // # Date  */}
      <TitleShimmer
        height={verticalScale(12)}
        width={verticalScale(80)}
        alignSelf={'flex-end'}
      />
    </View>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: '3%'}}>
      {attendanceHistory?.map((item, index) => (
        <View
          key={index}
          style={[
            styles.attendanceCard,
            shimmer && {backgroundColor: COLORS.btIcon},
            {backgroundColor: cardColor || COLORS.eventCard},
          ]}>
          <View style={styles.evtImgNameCont}>
            {/* // # Event Image */}
            <Image
              source={{
                uri: item?.EVENT_IMAGE,
              }}
              style={styles.eventImg}
            />

            {/* // # Event Name & Event Description */}
            <View style={styles.nameDescrpCont}>
              <Text numberOfLines={2} style={styles.eventName}>
                {item?.EVENT_NAME}
              </Text>
              <Text numberOfLines={2} style={styles.descripTxt}>
                {item?.DESCRIPTION}
              </Text>
            </View>
          </View>
          {/*  // # Date  */}
          <Text numberOfLines={2} style={[styles.descripTxt, styles.dateTxt]}>
            {item?.ATT_DATE}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AttendanceHistory;

const styles = StyleSheet.create({
  attendanceCard: {
    backgroundColor: COLORS.card,
    marginTop: '3%',
    width: '95%',
    borderRadius: moderateScale(20),
    alignSelf: 'center',
    padding: '3%',
  },
  evtImgNameCont: {flexDirection: 'row'},
  eventImg: {
    width: horizontalScale(60),
    height: horizontalScale(60),
    borderRadius: moderateScale(40),
  },
  nameDescrpCont: {marginLeft: '5%', width: '77%'},
  eventName: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.btIcon,
    width: '100%',
  },
  descripTxt: {
    fontSize: SIZES.l,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.textLabel,
    width: '100%',
    marginTop: '1%',
  },
  dateTxt: {
    width: '50%',
    marginTop: 0,
    textAlign: 'right',
    alignSelf: 'flex-end',
    fontSize: SIZES.m,
  },
});
