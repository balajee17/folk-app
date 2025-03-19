import DeviceInfo from 'react-native-device-info';

let DeviceInformation = {
  // To get App Verison
  getAppVersion: () => {
    return DeviceInfo.getVersion();
  },

  //   To get Device ID
  getDeviceId: () => {
    return DeviceInfo.getUniqueId();
  },

  // To get Device Name
  getDeviceName: () => {
    return DeviceInfo.getDeviceName();
  },

  // To get Device OS Version
  getDeviceOsVersion: () => {
    return DeviceInfo.getSystemVersion();
  },

  // To get Device Model
  getDeviceModel: () => {
    return DeviceInfo.getModel();
  },

  // To find  Device OS Name
  getDeviceOS: () => {
    return DeviceInfo.getSystemName();
  },

  // To find  Device Version
  getDeviceVersion: () => {
    return DeviceInfo.getSystemVersion();
  },
};

export default DeviceInformation;
