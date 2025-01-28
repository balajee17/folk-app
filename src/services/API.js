import axios from 'axios';

const Access_Key = '856!@nHKRKkbngsppnsg@856';

const deploymentURL = '1'; // 1 for Test || 2 for Live

const baseURL =
  deploymentURL == 1 ? 'http://192.168.1.11/FOLKDashboard/api' : '';

export const API = {
  getHomeScreenData(data) {
    const getHomeDataURL = baseURL + '/home-page-feeder';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL Home Screen Data ', getHomeDataURL, ' data ', requestData);
    return axios.post(getHomeDataURL, requestData);
  },
};
