import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {firebase} from '@react-native-firebase/app';

const CHANNEL_ID = 'satvata-channel-id';
const CHANNEL_NAME = 'SATVATA';

export const getFcmId = async () => {
  const asyncStorageFcmId = await AsyncStorage.getItem('@FcmId');
  console.log('🚀 ~ asyncStorageFcmId:', asyncStorageFcmId);

  Platform.OS === 'android' &&
    (await firebase.messaging().registerDeviceForRemoteMessages());
  //   asyncStorageFcmId && (await Store.dispatch(setFCMID(asyncStorageFcmId)));
  !asyncStorageFcmId &&
    messaging()
      .getToken()
      .then(token => {
        console.log('🚀 ~ FCM ID:', token);
        storeFcmId(token);
      })
      .catch(e => console.log('🚀 ~ getToken ~ e:', e));
};

const storeFcmId = async value => {
  try {
    await AsyncStorage.setItem('@FcmId', value);
    // Store.dispatch(setFCMID(value));
  } catch (e) {
    console.log('🚀 ~ storeFcmId ~ e:', e);
  }
};
