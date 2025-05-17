import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';

const isAndroid = Platform.OS === 'android';

const DownLoadFile = (link, name) => {
  return new Promise((resolve, reject) => {
    const fileName = !!name ? name : link.split('/').pop().split('.')[0]; // Get the name before the extension
    const {dirs} = RNFetchBlob.fs;
    const dirToSave = isAndroid ? dirs.DownloadDir : dirs.DocumentDir;
    const configfb = isAndroid
      ? {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: fileName,
            path: `${dirToSave}/${fileName}`,
          },
        }
      : {
          fileCache: true,
          path: ` ${dirToSave}/${fileName}`,
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
          resolve(true); // Resolve with true if download is successful
        }
      })
      .catch(e => {
        console.log('Download_error==>', e);
        reject(false); // Reject the promise with false if there's an error
      });
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

export const DownloadImage = async data => {
  try {
    const {link, name} = data;
    const downloadResult = await DownLoadFile(link, name);
    return downloadResult;
  } catch (error) {
    console.log('Error in downloading image: ', error);
    return false;
  }
};
