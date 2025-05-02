import {PermissionsAndroid, Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {useToast} from 'react-native-toast-notifications';
import RNFetchBlob from 'rn-fetch-blob';
import {verticalScale} from '../styles/MyStyles';

const isAndroid = Platform.OS === 'android';

export const showToast = (message, type = 'normal') => {
  if (toastRef.current) {
    toastRef.current.show(message, {type});
  } else {
    console.warn('Toast ref not available');
  }
};

const DownLoadFile = (link, name) => {
  const {dirs} = RNFetchBlob.fs;
  const dirToSave = isAndroid ? dirs.DownloadDir : dirs.DocumentDir;
  const configfb = isAndroid
    ? {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: name,
          path: `${dirToSave}/${name}`,
        },
      }
    : {
        fileCache: true,
        path: `${dirToSave}/${fileName}`,
      };

  const configOptions = Platform.select({
    ios: configfb,
    android: configfb,
  });

  RNFetchBlob.config(configOptions || {})
    .fetch('GET', link, {})
    .then(res => {
      if (!isAndroid) {
        RNFetchBlob.ios.openDocument(configfb.path);
      }
      if (isAndroid) {
        console.log('file downloaded', configfb.addAndroidDownloads.path);
        toastMsg('Image downloaded.', 'success');
      }
    })
    .catch(e => {
      console.log('Download_error==>', e);
      toastMsg('Download failed.', 'error');
    });
};

const requestIOSPhotoPermission = async (link, name) => {
  const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  if (result === RESULTS.GRANTED) {
    DownLoadFile(link, name);
  } else {
    console.log('iOS permission denied');
  }
};

const requestAndroidStoragePermission = async (link, name) => {
  if (Platform.Version >= 33) {
    // Android 13+ (API 33+) uses these new permissions
    const result = await requestMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);

    const allGranted = Object.values(result).every(r => r === RESULTS.GRANTED);

    if (allGranted) {
      console.log('All media permissions granted');
      DownLoadFile(link, name);
    } else {
      console.log('One or more media permissions denied:', result);
    }
  } else {
    const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    if (granted === RESULTS.GRANTED) {
      console.log('WRITE_EXTERNAL_STORAGE granted');
      DownLoadFile(link, name);
    } else {
      console.log('Storage permission denied');
    }
  }
};

export const DownloadImage = data => {
  const {link, name} = data;
  //   isAndroid
  //     ? requestAndroidStoragePermission(link, name)
  //     : requestIOSPhotoPermission(link, name);

  DownLoadFile(link, name);
};
