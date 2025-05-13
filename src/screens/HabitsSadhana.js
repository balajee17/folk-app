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
import CustomHeader from '../components/CustomHeader';
import Container from '../components/Container';
import {screenNames} from '../constants/ScreenNames';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
} from '../styles/MyStyles';
import CustomBottomTab from '../components/CustomBottomTab';
import {useAppContext} from '../../App';
import LinearGradientBg from '../components/LinearGradientBg';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import {
  getGradientColors,
  toastThrottle,
} from '../components/CommonFunctionalities';
import AndroidBackHandler from '../components/BackHandler';
import Spinner from '../components/Spinner';

const HabitsSadhana = props => {
  const {globalState, setGlobalState} = useAppContext();

  const {profileId, headerColor} = globalState;
  const {navigation} = props;
  const [userDetails, setUserDetails] = useState({});
  const [spinner, setSpinner] = useState(true);

  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    getHabitsSadhanaDetails();

    return AndroidBackHandler.removerHandler();
  }, []);

  // # Get Habits Sadhana Details
  const getHabitsSadhanaDetails = async () => {
    try {
      const params = {
        profileId,
      };
      const response = await API.getHabitsSadhana(params);

      const {data, successCode, message} = response?.data;
      console.log('Habits Sadhana_response', data?.message);
      if (successCode === 1) {
        setUserDetails(data);
      } else {
        setUserDetails({});
        toastMsg(message, 'info');
      }
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
      console.log('ERR-HabitsSadhana', err);
      toastMsg('', 'error');
    }
  };

  const sections = [
    {
      id: 1,
      title: 'Sadhana',
      data: [
        {
          id: 1,
          title: 'Sadhana 1',
          image:
            'https://img.freepik.com/free-vector/appointment-booking-with-calendar_23-2148553008.jpg',
        },
      ],
    },
    // {
    //   id: 2,
    //   title: 'Active Challenges',
    //   data: [
    //     {
    //       id: 3,
    //       title: 'Service - Volunteer',
    //       image:
    //         'https://static.vecteezy.com/system/resources/previews/004/449/833/non_2x/volunteers-2d-isolated-illustration-contributing-to-humanitarian-aid-smiling-man-and-woman-social-service-worker-flat-characters-on-cartoon-background-charity-work-colourful-scene-vector.jpg',
    //     },
    //     {
    //       id: 4,
    //       title: 'Habits - Illuminate',
    //       image:
    //         'https://www.shutterstock.com/image-vector/make-choice-concept-businessman-walking-260nw-2321958589.jpg',
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   title: '3B Habits',
    //   data: [
    //     {
    //       id: 5,
    //       title: 'Service - Volunteer',
    //       image:
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjuJh19j8ciq8D6E4EMVjxCsa5IYoJoU1TSfx763sxJLAUHQ1F6bn9E2iEr6wMx7lWz3w&usqp=ANd9GcSjuJh19j8ciq8D6E4EMVjxCsa5IYoJoU1TSfx763sxJLAUHQ1F6bn9E2iEr6wMx7lWz3w',
    //     },
    //     {
    //       id: 6,
    //       title: 'Reading Books',
    //       image:
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHc7GCnD0XHwZwImIPdjyTnslxpBK57zpqXQ&s',
    //     },
    //   ],
    // },
  ];

  // # Navigate Screen
  const navigateScreen = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        toggleDrawer={() => navigation.openDrawer()}
        titleName={screenNames.habitsSadhana}
        goBack={() => navigation.goBack()}
      />
      <Spinner spinnerVisible={spinner} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '40%',
        }}>
        <LinearGradientBg />

        {/* // @  User Details Box */}
        <View style={styles.userDetailsBox}>
          <Image
            source={{
              uri: userDetails?.userImage,
            }}
            style={styles.userImg}
          />
          <Text style={styles.userNameTxt}>{userDetails?.userName}</Text>
          <Text style={styles.greetUserTxt}>{userDetails?.greetUser}</Text>

          <View style={styles.quotesBox}>
            <LinearGradient
              style={styles.quotesLGBox}
              colors={getGradientColors(headerColor, {
                one: 0.4,
                two: 0.3,
                three: 0.2,
                four: 0.1,
              })}>
              <Text style={styles.quotesTxt}>{userDetails?.quote}</Text>
              <Text style={styles.quotesByTxt}> {userDetails?.quoteBy}</Text>
            </LinearGradient>
          </View>
        </View>

        {/* // @ Sadhana Card */}
        {userDetails?.cardsSection?.map((item, index) => (
          <>
            <View key={index} style={styles.cardTitleCont}>
              <Text style={styles.subTitleTxt}>{item?.section}</Text>
              {/* {section?.id !== 1 && (
                  <View style={styles.rightBtnsCont}>
                    <View style={styles.histIconCont}>
                      <MaterialCommunityIcons
                        onPress={() => {
                          navigateScreen(screenNames.completedChallenge);
                        }}
                        style={styles.historyIcn}
                        name="history"
                        size={moderateScale(20)}
                        color={COLORS.button}
                      />
                    </View>
                    <View style={styles.addBtnCont}>
                      <TouchableOpacity
                        onPress={() => {
                          section?.id === 2 &&
                            navigateScreen(screenNames.newChallenge);
                        }}
                        activeOpacity={1}
                        style={styles.addBtn}>
                        <Text style={styles.addTxt}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )} */}
            </View>

            {item?.cards.map((card, cardIndex) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigateScreen(card?.screenName);
                }}
                style={[styles.quotesBox, styles.sadhanaChallCards]}>
                <Image
                  source={{
                    uri: card?.icon,
                  }}
                  style={styles.cardIcon}
                />
                <Text
                  style={[styles.subTitleTxt, {marginTop: '3%', width: '74%'}]}>
                  {card?.title}
                </Text>

                {/* {card?.id !== 1 && (
                    <Text style={styles.challengePercent}>
                      {item?.percentage}
                    </Text>
                  )} */}
              </TouchableOpacity>
            ))}
          </>
        ))}
      </ScrollView>

      {/* // @ Bottom Tab */}
      <CustomBottomTab
        selIcon={''}
        setSelIcon={value => {
          if (value) {
            navigation.navigate(screenNames.switcherScreen);
            setGlobalState(prev => ({...prev, btTab: value, current: value}));
          }
        }}
      />
    </Container>
  );
};

export default HabitsSadhana;

const styles = StyleSheet.create({
  userImg: {
    width: horizontalScale(80),
    height: horizontalScale(80),
    borderRadius: moderateScale(50),
  },
  userDetailsBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  userNameTxt: {
    fontSize: SIZES.xxl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
    marginTop: '5%',
    width: '100%',
  },
  greetUserTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistMedium,
    color: COLORS.white,
    marginTop: '2%',
    width: '100%',
  },
  quotesBox: {
    marginTop: '5%',
    borderRadius: moderateScale(20),
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
  quotesLGBox: {
    borderRadius: moderateScale(20),
    padding: '4%',
  },
  quotesTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.black,
    width: '100%',
  },
  quotesByTxt: {
    fontSize: SIZES.s,
    fontFamily: FONTS.urbanistSemiBold,
    color: COLORS.gunsmoke,
    width: '50%',
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginTop: '1%',
  },
  cardTitleCont: {
    width: '90%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  subTitleTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.black,
    width: '50%',
  },
  rightBtnsCont: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  histIconCont: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyIcn: {
    borderWidth: 1,
    borderColor: COLORS.button,
    borderRadius: moderateScale(40),
    padding: '6%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  addBtnCont: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addBtn: {
    backgroundColor: COLORS.button,
    width: horizontalScale(65),
    height: horizontalScale(30),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },
  addTxt: {
    fontSize: SIZES.m,
    fontFamily: FONTS.urbanistBold,
    color: COLORS.white,
  },
  sadhanaChallCards: {
    borderRadius: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardIcon: {
    width: horizontalScale(80),
    height: horizontalScale(80),
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
