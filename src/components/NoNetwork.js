import {
  BackHandler,
  Image,
  SafeAreaView,
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

const NoNetwork = ({navigation}) => {
  const {globalState, setGlobalState} = useAppContext();
  const {isConnected} = globalState;
  console.log('isConnected_SN', isConnected);

  useEffect(() => {
    const backAction = () => {
      return true; // Blocks back button
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup
  }, []);

  const toast = useToast();
  const toastMsg = (msg, type) => {
    toast.show(msg, {
      type: type,
    });
  };

  const reloadApp = () => {
    if (isConnected) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screenNames.drawerNavigation}], // Change to your main screen
        }),
      );
    } else {
      toastMsg('No internet connectivity.', 'error');
    }
  };

  return (
    <SafeAreaView style={[MyStyles.contentCont, {justifyContent: 'center'}]}>
      <CommonStatusBar />
      <Image
        style={{
          alignSelf: 'center',
          width: horizontalScale(200),
          height: horizontalScale(200),
        }}
        source={{
          uri: 'https://cdni.iconscout.com/illustration/premium/thumb/no-internet-connection-illustration-download-in-svg-png-gif-file-formats--wifi-logo-error-browser-ecommerce-empty-pack-e-commerce-shopping-illustrations-6632283.png',
        }}
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
    </SafeAreaView>
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
    color: COLORS.black,
    alignSelf: 'center',
    marginTop: '3%',
  },
  reloadBtn: {
    width: '70%',
    height: verticalScale(45),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.atlantis,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  reloadTxt: {
    fontSize: SIZES.subTitle,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.white,
  },
});
