import {Linking} from 'react-native';
import Share from 'react-native-share';

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
