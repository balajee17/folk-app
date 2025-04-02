import {Image, Linking, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import {
  CFCallback,
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import {API} from '../services/API';
import {COLORS, FONTS, moderateScale, MyStyles, screenHeight} from '../styles/MyStyles';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



// @ Redirect Link
export const RedirectURL = async (url, app = '') => {
  try {
    if (!url) {
      const message =
        app === 'phone'
          ? 'Mobile number not found.'
          : app === 'whatsapp'
          ? 'Whatsapp number not found.'
          : 'URL not found.';
      const toastMsg = {
        message: message,
        type: 'warning',
      };
      return toastMsg;
    }
    let showToast = false;
    const link =
      app === 'phone'
        ? `tel:${url}`
        : app === 'whatsapp'
        ? `whatsapp://send?text=hello&phone=${url}`
        : url;
    await Linking.openURL(link).catch(err => {
      showToast = true;
    });

    if (showToast) {
      const message =
        app === 'phone'
          ? 'Unable to open dial pad.'
          : app === 'whatsapp'
          ? 'Unable to open Whatsapp.'
          : 'Invalid URL or no supported app found.';
      const toastMsg = {
        message: message,
        type: 'warning',
      };
      return toastMsg;
    }
  } catch (err) {
    const errMsg = ('Failed to open the link. Please try again.', 'error');
    return errMsg;
  }
};

// @ Share Link
export const ShareLink = async link => {
  const options = {
    url: link,
  };

  try {
    await Share.open(options);
  } catch (err) {
    if (err.message === 'User did not share') {
      return null;
    } else {
      const errMsg = {
        message: 'Failed to share the link. Please try again.',
        type: 'error',
      };
      return errMsg;
    }
  }
};
// @ Toast Throttle
export const toastThrottle = (func, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

//  @ Mobile Regex
export const mobileRegex = /^[1-9]\d{9}$/;

// @ CashFree Payment Gateway
export const CashFreePayment = (payment_session_id, order_id) => {
  return new Promise((resolve, reject) => {
    try {
      CFPaymentGatewayService.setCallback({
        onVerify(orderID) {
          console.log('ON_VERIFY', orderID);
          resolve({type: 'ID', orderID});
        },
        onError(error, orderID) {
          console.log('ON_ERROR', error, 'OD_ID', orderID);
          reject({type: 'ID', orderID});
        },
      });

      const session = new CFSession(
        payment_session_id,
        order_id,
        CFEnvironment.SANDBOX,
      );

      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.UPI)
        .build();

      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor(COLORS.header)
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor(COLORS.atlantis)
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();

      const dropdown = new CFDropCheckoutPayment(session, paymentModes, theme);

      CFPaymentGatewayService.doPayment(dropdown);
    } catch (err) {
      console.log('Payment_Gateway_err', err);
      reject({type: 'ERROR', error: err});
    }
  });
};

export const GetPaymentStatus = async (profileId, orderId) => {
  try {
    const params = {
      profileId,
      orderId,
    };
    const response = await API.getPaymentStatus(params);

    const {data, successCode, message} = response?.data;
    console.log('Payment_status_response', data?.message);
    if (successCode === 1) {
      const returnData = {type: 'SUCCESS', message, data};
      return returnData;
    } else {
      const returnData = {type: 'ERROR', message};
      return returnData;
    }
  } catch (err) {
    console.log('ERR-Apply_Coupon', err);
    const returnData = {type: 'ERROR', message: ''};
    return returnData;
  }
};

 // # Choose Image
 export const  ChooseImage = async() => {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.5,
    });
      const path = result.path;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

   const imageData ={
    path: result?.data,
      name: fileName,
    };
    return imageData;
    
  };

  // # Capture Image
  export const CaptureImage = async () => {
    const result = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.5,
    });
    const path = result.path;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

   const imageData ={
      path: result?.data,
      name: fileName,
    };
    console.log('imageData',imageData);
    return imageData;
  };

  export const ImageUploadModal=({visible,closeModal,uploadType})=>{
    return(
      <Modal visible={visible} transparent animationType={'slide'}>
      <Pressable
        onPress={closeModal}
        style={MyStyles.modal}>
        <Pressable
          style={MyStyles.container}>
          <TouchableOpacity
            onPress={closeModal}
            activeOpacity={0.7}
            style={MyStyles.closeBtn}>
            <MaterialCommunityIcons
              name="close"
              color={COLORS.header}
              size={moderateScale(30)}
            />
          </TouchableOpacity>
          <Text
            style={MyStyles.modalTitle}>
            Media Upload Type
          </Text>
          <View
            style={MyStyles.uploadTypeCont}>
            <Pressable
              onPress={()=>uploadType('C')}
              style={MyStyles.cameraBtn}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/camera.png')}
                style={{width: 35, height: 35}}
              />
              <Text
                style={MyStyles.btnTxt}>
                Capture
              </Text>
            </Pressable>
            <Pressable
             onPress={()=>uploadType('G')}
              style={MyStyles.cameraBtn}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/gallery.png')}
                style={{width: 35, height: 35}}
              />
              <Text
                style={MyStyles.btnTxt}>
                Choose
              </Text>
            </Pressable>
            
          </View>
        </Pressable>
      </Pressable>
    </Modal>
    )
  }
