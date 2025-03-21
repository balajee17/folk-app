import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import AndroidBackHandler from '../components/BackHandler';
import {useAppContext} from '../../App';
import {API} from '../services/API';
import {useToast} from 'react-native-toast-notifications';
import Spinner from '../components/Spinner';

const Notifications = props => {
  const {navigation} = props;

  const {globalState} = useAppContext();
  const {profileId} = globalState;
  const [loader, setLoader] = useState(true);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    AndroidBackHandler.setHandler(props);
    getNotificationList();
    return AndroidBackHandler.removerHandler();
  }, []);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const getNotificationList = async () => {
    try {
      const params = {profileId: profileId};
      const response = await API.getNotificationList(params);

      console.log('Notification List response', response?.data);
      const {data, successCode, message} = response?.data;
      if (successCode === 1) {
        setNotificationList(data?.list);
      } else {
        toastMsg(message, 'warning');
      }
      setLoader(false);
    } catch (err) {
      toastMsg('', 'error');
      setLoader(false);
      console.log('ERR Notification List screen', err);
    }
  };
  return (
    <Container>
      <SafeAreaView style={MyStyles.flex1}>
        {/* // # Header */}
        <CustomHeader
          goBack={() => navigation.goBack()}
          titleName={screenNames.notifications}
        />
        <Spinner spinnerVisible={loader} />
        {/* // # Contents */}
        <View style={MyStyles.contentCont}>
          {/* // @ Notification Card */}
          <FlatList
            data={notificationList}
            contentContainerStyle={{paddingBottom: '5%'}}
            renderItem={({item, index}) => (
              <View style={styles.notifyCard} key={item?.NOT_ID}>
                {/* // #  icon title container */}
                <View style={styles.titleIconCont}>
                  <View style={styles.circleIcon}>
                    <Text style={styles.iconLetter}>
                      {item?.TITLE.charAt(0)}
                    </Text>
                  </View>

                  <Text numberOfLines={2} style={styles.titleTxt}>
                    {item?.TITLE}
                  </Text>
                </View>

                {/* // #  Description */}
                <Text style={styles.descrpTxt}>{item?.NOTIFICATION}</Text>

                {/* // # Date time age Container */}
                <View style={[styles.titleIconCont, styles.dateTimeCont]}>
                  <Text style={styles.dateTxt}>{item?.DATE}</Text>
                  <Text style={[styles.dateTxt, {textAlign: 'right'}]}>
                    {item?.TIME}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  notifyCard: {
    backgroundColor: COLORS.chromeWhite,
    width: '95%',
    marginTop: '4%',
    padding: '3%',
    alignSelf: 'center',
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
