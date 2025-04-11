import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {getImage} from '../utils/ImagePath';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import WaveSkia from '../components/WaveSkia';

const CompletedChallenge = props => {
  const {globalState, setGlobalState} = useAppContext();

  const [challengesList, setChallengesList] = useState([
    {
      id: 3,
      title: 'Service - Volunteer',
      image:
        'https://static.vecteezy.com/system/resources/previews/004/449/833/non_2x/volunteers-2d-isolated-illustration-contributing-to-humanitarian-aid-smiling-man-and-woman-social-service-worker-flat-characters-on-cartoon-background-charity-work-colourful-scene-vector.jpg',
      percentage: '60%',
    },
    {
      id: 4,
      title: 'Service - Volunteer 2',
      image:
        'https://static.vecteezy.com/system/resources/previews/004/449/833/non_2x/volunteers-2d-isolated-illustration-contributing-to-humanitarian-aid-smiling-man-and-woman-social-service-worker-flat-characters-on-cartoon-background-charity-work-colourful-scene-vector.jpg',
      percentage: '100%',
    },
  ]);

  const {navigation} = props;
  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);

  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.completedChallenge}
        />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          {challengesList.map(item => (
            <View style={[styles.quotesBox, styles.sadhanaChallCards]}>
              <WaveSkia percentage={item?.percentage} />
              <Image
                source={{
                  uri: item?.image,
                }}
                style={styles.cardIcon}
              />
              <View style={styles.titleBtnCont}>
                <Text
                  style={[
                    styles.subTitleTxt,
                    {marginTop: '3%', width: '100%'},
                  ]}>
                  {item?.title}
                </Text>

                <Text style={styles.challengePercent}>{item?.percentage}</Text>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default CompletedChallenge;

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
    backgroundColor: COLORS.atlantis,
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
  challengePercent: {
    width: horizontalScale(50),
    textAlignVertical: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '2%',
    fontFamily: FONTS.urbanistBold,
    fontSize: SIZES.xl,
    color: COLORS.black,
  },
});
