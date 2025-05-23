import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../App';
import AndroidBackHandler from '../components/BackHandler';
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

const AddChallenge = props => {
  const [challengesList, setChallengesList] = useState([
    {
      id: 3,
      title: 'Service - Volunteer',
      image:
        'https://static.vecteezy.com/system/resources/previews/004/449/833/non_2x/volunteers-2d-isolated-illustration-contributing-to-humanitarian-aid-smiling-man-and-woman-social-service-worker-flat-characters-on-cartoon-background-charity-work-colourful-scene-vector.jpg',
    },
    {
      id: 4,
      title: 'Service - Volunteer 2',
      image:
        'https://static.vecteezy.com/system/resources/previews/004/449/833/non_2x/volunteers-2d-isolated-illustration-contributing-to-humanitarian-aid-smiling-man-and-woman-social-service-worker-flat-characters-on-cartoon-background-charity-work-colourful-scene-vector.jpg',
    },
  ]);

  const {navigation} = props;
  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);
  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        goBack={() => navigation.goBack()}
        titleName={screenNames.newChallenge}
      />
      {/* // # Contents */}
      <View style={MyStyles.contentCont}>
        {challengesList.map(item => (
          <View style={[styles.quotesBox, styles.sadhanaChallCards]}>
            <Image
              source={{
                uri: item?.image,
              }}
              style={styles.cardIcon}
            />
            <View style={styles.titleBtnCont}>
              <Text
                style={[styles.subTitleTxt, {marginTop: '3%', width: '100%'}]}>
                {item?.title}
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.addBtn}>
                <Text style={styles.addTxt}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </Container>
  );
};

export default AddChallenge;

const styles = StyleSheet.create({
  quotesBox: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  sadhanaChallCards: {
    marginTop: '5%',
    borderRadius: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardIcon: {
    width: horizontalScale(80),
    height: horizontalScale(80),
  },
  titleBtnCont: {
    width: '74%',
    justifyContent: 'space-between',
    padding: '1%',
  },
  subTitleTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '50%',
  },
  addBtn: {
    backgroundColor: COLORS.button,
    width: horizontalScale(55),
    height: horizontalScale(25),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
    alignSelf: 'flex-end',
  },
  addTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
  },
});
