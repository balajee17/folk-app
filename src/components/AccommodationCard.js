import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getImage} from '../utils/ImagePath';

const AccommodationCard = ({data, index, historyScreen, openQrCode}) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderWidth: horizontalScale(1),
          borderColor: COLORS.border,
        },
      ]}>
      {/* // # Date and status */}
      <View style={styles.flexRowCont}>
        <Text style={styles.dateTxt}>{data?.date}</Text>
        <Text
          style={[
            styles.pendingTxt,
            {
              backgroundColor:
                data?.status === 'B' ||
                data?.status === 'C' ||
                data?.status === 'O'
                  ? COLORS.successBg
                  : data?.status === 'P'
                  ? COLORS.warningBg
                  : data?.status === 'X'
                  ? COLORS.errorBg
                  : COLORS.border,
              color:
                data?.status === 'B' ||
                data?.status === 'C' ||
                data?.status === 'O'
                  ? COLORS.successPB
                  : data?.status === 'P'
                  ? COLORS.warningPB
                  : data?.status === 'X'
                  ? COLORS.errorPB
                  : COLORS.black,
            },
          ]}>
          {data?.status === 'B' || data?.status === 'C' || data?.status === 'O'
            ? 'Approved'
            : data?.status === 'X'
            ? 'Rejected'
            : data?.status === 'P'
            ? 'Pending'
            : ''}
        </Text>
      </View>
      {/* // # request reason */}
      <Text style={[styles.dateTxt, styles.reasonTxt]}>{data?.reason}</Text>
      {/* // # Rejected Reason */}
      {data?.status === 'X' && (
        <>
          <Text style={styles.rejReasTxt}>Reason for rejection</Text>
          <Text style={[styles.dateTxt, styles.reasonTxt]}>
            {data?.rejectedReason}
          </Text>
        </>
      )}

      {/* // # hostel, Bed no and Qr code */}

      <View style={[styles.flexRowCont, {marginTop: '3%'}]}>
        {(data?.status === 'C' || data?.status === 'O') && (
          <>
            <View style={[styles.flexRowCont, {width: '40%'}]}>
              <Image style={styles.icnStyle} source={getImage.hostelIcn} />
              <Text numberOfLines={1} style={styles.hostelName}>
                {data?.hostelName}
              </Text>
            </View>

            <View style={[styles.flexRowCont, {width: '35%'}]}>
              <Image style={styles.icnStyle} source={getImage.bedIcn} />
              <Text numberOfLines={1} style={[styles.hostelName]}>
                {data?.bedNo}
              </Text>
            </View>
          </>
        )}
        {data?.qrLink && (
          <MaterialIcons
            onPress={() => {
              openQrCode(data?.qrLink);
            }}
            name="qr-code"
            size={moderateScale(23)}
            color={COLORS.black}
          />
        )}
      </View>
    </View>
  );
};

export default AccommodationCard;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '100%',
    marginTop: '2%',
    padding: '2%',
    borderRadius: moderateScale(10),

    ...MyStyles,
  },
  flexRowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTxt: {
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.l,
    color: COLORS.black,
  },
  pendingTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m,
    color: COLORS.black,
    padding: '2.2%',
    paddingVertical: '1.2%',
    borderRadius: moderateScale(15),
  },
  reasonTxt: {
    fontFamily: FONTS.urbanistMedium,
    width: '100%',
    marginTop: '2%',
  },
  rejReasTxt: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.l + 1,
    color: COLORS.black,
    width: '100%',
    marginTop: '2%',
  },
  hostelName: {
    fontFamily: FONTS.urbanistSemiBold,
    fontSize: SIZES.m + 1,
    color: COLORS.black,
    width: '78%',
  },
  icnStyle: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    resizeMode: 'contain',
  },
});
