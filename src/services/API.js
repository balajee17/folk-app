import axios from 'axios';

const Access_Key = '856!@nHKRKkbngsppnsg@856';

const deploymentURL = '1'; // 1 for Test || 2 for Live

const baseURL =
  deploymentURL == 1 ? 'http://192.168.1.11/FOLKDashboard/api' : '';

export const API = {
  getHomeScreenData() {
    const getHomeDataURL = baseURL + '/home-page-feeder';
    const requestData = {accessKey: Access_Key};
    console.log('URL Home Screen Data ', getHomeDataURL, ' data ', requestData);
    return axios.post(getHomeDataURL, requestData);
  },
  getDarshanHistroy() {
    const getDarshanDataURL = baseURL + '/daily-darshan/history';
    const requestData = {accessKey: Access_Key};
    console.log(
      'URL Darshan Screen Data ',
      getDarshanDataURL,
      ' data ',
      requestData,
    );
    return axios.post(getDarshanDataURL, requestData);
  },
  getUpdatesHistroy() {
    const getUpdatesDataURL = baseURL + '/folk-announcement/history';
    const requestData = {accessKey: Access_Key};
    console.log(
      'URL Updates Screen Data ',
      getUpdatesDataURL,
      ' data ',
      requestData,
    );
    return axios.post(getUpdatesDataURL, requestData);
  },
  getQuotesHistroy() {
    const getQuotesDataURL = baseURL + '/inspiring-quotes/history';
    const requestData = {accessKey: Access_Key};
    console.log(
      'URL Quotes Screen Data ',
      getQuotesDataURL,
      ' data ',
      requestData,
    );
    return axios.post(getQuotesDataURL, requestData);
  },
};
