import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import {CommonStatusBar} from './StatusBarComponent';
import {CommonActions} from '@react-navigation/native';
import {screenNames} from '../constants/ScreenNames';
import {useAppContext} from '../../App';
import {useToast} from 'react-native-toast-notifications';
import {toastThrottle} from './CommonFunctionalities';
import {getImage} from '../utils/ImagePath';
import FastImage from 'react-native-fast-image';
import AndroidBackHandler from './BackHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from './Container';

const NoNetwork = ({navigation}) => {
  const {globalState, setGlobalState} = useAppContext();
  const {isConnected, headerColor} = globalState;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      AndroidBackHandler.noGoingBack,
    );

    return () => backHandler.remove();
  }, []);

  const toast = useToast();
  const toastMsg = toastThrottle((msg, type) => {
    toast.show(msg, {type});
  }, 3400);

  const reloadApp = async () => {
    if (isConnected) {
      const storedVal = await AsyncStorage.getItem('userDetails');
      const parsedData = JSON.parse(storedVal);
      parsedData?.profileId
        ? navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: screenNames.drawerNavigation}],
            }),
          )
        : navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: screenNames.login}],
            }),
          );
    } else {
      toastMsg('No internet connectivity.', 'error');
    }
  };

  return (
    <Container>
      <CommonStatusBar bgColor={headerColor} />
      <View style={[MyStyles.contentCont, {justifyContent: 'center'}]}>
        <FastImage
          style={{
            alignSelf: 'center',
            width: horizontalScale(200),
            height: horizontalScale(200),
          }}
          source={getImage.noNetwork}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.whooopsTxt}>Whooops!</Text>
        <Text style={styles.infoTxt}>
          We could not load the page. Try reloading the page or check your
          internet connection.
        </Text>
        <TouchableOpacity
          onPress={() => reloadApp()}
          activeOpacity={0.8}
          style={styles.reloadBtn}>
          <Text style={styles.reloadTxt}>Reload</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default NoNetwork;

const styles = StyleSheet.create({
  whooopsTxt: {
    textAlign: 'center',
    width: '50%',
    fontSize: SIZES.xxl,
    fontFamily: FONTS.ysabeauInfantBold,
    color: COLORS.black,
    alignSelf: 'center',
    marginTop: '5%',
  },
  infoTxt: {
    textAlign: 'center',
    width: '80%',
    fontSize: SIZES.l,
    fontFamily: FONTS.ysabeauInfantRegular,
    color: COLORS.gunsmoke,
    alignSelf: 'center',
    marginTop: '3%',
  },
  reloadBtn: {
    width: '70%',
    height: verticalScale(45),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.button,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  reloadTxt: {
    fontSize: SIZES.xl,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.white,
  },
});
