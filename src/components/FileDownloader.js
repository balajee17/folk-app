import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {getSystemVersion} from 'react-native-device-info';

const isAndroid = Platform.OS === 'android';

export const requestPermission = async () => {
  if (isAndroid) {
    const deviceVersion = getSystemVersion();
    if (parseFloat(deviceVersion) >= 10) {
      // Android 10+: No permission needed for downloads
      return true;
    } else {
      // Android 9 and below: request WRITE permission
      const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      return result === RESULTS.GRANTED;
    }
  } else {
    const permissions = await getIOSPermission();

    const statuses = await checkMultiple(permissions);

    const allGranted = Object.values(statuses).every(
      status => status === RESULTS.GRANTED || status === RESULTS.LIMITED,
    );

    if (allGranted) return true;

    const reqStatuses = await requestMultiple(permissions);

    const allReqGranted = Object.values(reqStatuses).every(
      status => status === RESULTS.GRANTED || status === RESULTS.LIMITED,
    );

    return allReqGranted;
  }
};

const getIOSPermission = async () => {
  const iosVersion = parseFloat(Platform.Version);
  if (iosVersion >= 14) {
    return [
      PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ];
  }
  return [PERMISSIONS.IOS.PHOTO_LIBRARY];
};

// export const DownLoadFile = async (link, name) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//

//       const fileName = name || link.split('/').pop();
//       const extension = link.substring(link.lastIndexOf('.') + 1).toLowerCase();
//       const {dirs} = RNFetchBlob.fs;
//       const dirToSave = isAndroid ? dirs.DownloadDir : dirs.DocumentDir;
//       const filePath = `${dirToSave}/${fileName}`;

//       const configfb = isAndroid
//         ? {
//             fileCache: true,
//             addAndroidDownloads: {
//               useDownloadManager: true,
//               notification: true,
//               mediaScannable: true,
//               title: fileName,
//               path: filePath,
//             },
//           }
//         : {
//             fileCache: true,
//             path: filePath,
//           };
//       console.log('link', link);
//       const res = await RNFetchBlob.config(configfb).fetch('GET', link);

//       const localPath = isAndroid ? filePath : res.path(); // on iOS, res.path() gives the saved file path

//       console.log('Downloaded to:', localPath, extension);

//       // Save to Photos
//       const savedPath = await CameraRoll.saveAsset(
//         `file://${localPath}.${extension}`,
//         {
//           type: 'photo',
//         },
//       );
//       console.log('Saved to gallery:', savedPath);

//       resolve(true);
//     } catch (e) {
//       console.log('Download or save error:', e);
//       reject(false);
//     }
//   });
// };

// export const DownloadImage = async data => {
//   try {
//     const {link, name} = data;
//     const downloadResult = await DownLoadFile(link, name);
//     console.log('downloadResult', downloadResult);
//     return downloadResult;
//   } catch (error) {
//     console.log('Error in downloading image: ', error);
//     return error;
//   }
// };

const getExtensionFromMime = mimeType => {
  if (mimeType.includes('jpeg')) return 'jpg';
  if (mimeType.includes('png')) return 'png';
  return false;
};

export const DownloadImage = async image_URL => {
  try {
    const hasPermission = await requestPermission();
    console.log('hasPermission', hasPermission);
    if (!hasPermission) {
      return {type: 'F', msg: 'Permission denied'};
    }

    const headResp = await fetch(image_URL, {method: 'HEAD'});
    const mimeType = headResp.headers.get('Content-Type') || '';
    const extension = getExtensionFromMime(mimeType);
    console.log('extension', extension);
    if (!extension) {
      return {type: 'F', msg: 'Unsupported image format'};
    }

    const {config, fs} = RNFetchBlob;
    const imageName = image_URL.split('/').pop();
    let PictureDir = fs.dirs.PictureDir;
    const filePath = `${PictureDir}/${imageName}`;

    const options = {
      fileCache: true,
      appendExt: extension,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Image',
      },
    };
    const response = await config(options).fetch('GET', image_URL);
    console.log('response', response);

    if (Platform.OS === 'android') {
      console.log('Image downloaded to: ' + filePath);
      return {type: 'S', msg: 'Image downloaded successfully'};
    } else {
      const localFile = 'file://' + response.path();

      await CameraRoll.saveAsset(localFile, {
        type: 'photo',
      });

      console.log('Image saved to Camera Roll');
      return {type: 'S', msg: 'Image downloaded successfully'};
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    return {type: 'F', msg: 'Download failed'};
  }
};
