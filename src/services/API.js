import axios from 'axios';

const Access_Key = '856!@nHKRKkbngsppnsg@856';

const deploymentURL = '1'; // 1 for Test || 2 for Live

const baseURL =
  deploymentURL == 1 ? 'http://192.168.1.11/FOLKDashboard/api' : '';

export const API = {
  // # checkFCMId
  checkFCMId(data) {
    const getFCM_URL = baseURL + '/check-fcm';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL get OTPURL Data ', getFCM_URL, ' data ', requestData);
    return axios.post(getFCM_URL, requestData);
  },
  // # Get OTP
  getOTP(data) {
    const getOTPURL = baseURL + '/get-otp';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL get OTPURL Data ', getOTPURL, ' data ', requestData);
    return axios.post(getOTPURL, requestData);
  },
  // # Verify OTP
  verifyOTP(data) {
    const verifyOTPURL = baseURL + '/confirm-otp';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL VerifyOTPURL Data ', verifyOTPURL, ' data ', requestData);
    return axios.post(verifyOTPURL, requestData);
  },
  // # Home Screen API's
  getHomeScreenData(data) {
    const getHomeDataURL = baseURL + '/home-page-feeder';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL Home Screen Data ', getHomeDataURL, ' data ', requestData);
    return axios.post(getHomeDataURL, requestData);
  },
  // # History Screen API's
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
  getVideosHistroy() {
    const getVideosDataURL = baseURL + '/inspiring-videos/history';
    const requestData = {accessKey: Access_Key};
    console.log(
      'URL Videos Screen Data ',
      getVideosDataURL,
      ' data ',
      requestData,
    );
    return axios.post(getVideosDataURL, requestData);
  },
  // # Event Screen API's
  getEventList(data) {
    const getEventListURL = baseURL + '/folk-event-list';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL Event List Data ', getEventListURL, ' data ', requestData);
    return axios.post(getEventListURL, requestData);
  },
  getEventDetails(data) {
    const getEventDetailsURL = baseURL + '/event-details';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL Event Details Data ',
      getEventDetailsURL,
      ' data ',
      requestData,
    );
    return axios.post(getEventDetailsURL, requestData);
  },
  sendEventAttendance(data) {
    const getEventAttendanceURL = baseURL + '/insert-attendance';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL Event Attendance Data ',
      getEventAttendanceURL,
      ' data ',
      requestData,
    );
    return axios.post(getEventAttendanceURL, requestData);
  },

  applyCoupon(data) {
    const applyCouponURL = baseURL + '/event-apply-coupon';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL applyCoupon Data ', applyCouponURL, ' data ', requestData);
    return axios.post(applyCouponURL, requestData);
  },
  eventRegister(data) {
    const eventRegisterURL = baseURL + '/event-register';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL eventRegisterURL Data ',
      eventRegisterURL,
      ' data ',
      requestData,
    );
    return axios.post(eventRegisterURL, requestData);
  },

  // # Connect US
  getConnectDetails(data) {
    const getConnectDetailsURL = baseURL + '/connect';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL Coupon List Data ',
      getConnectDetailsURL,
      ' data ',
      requestData,
    );
    return axios.post(getConnectDetailsURL, requestData);
  },

  // # Profile Screen
  getUserDetails(data) {
    const getUserDetailsURL = baseURL + '/view-profile';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL Coupon List Data ',
      getUserDetailsURL,
      ' data ',
      requestData,
    );
    return axios.post(getUserDetailsURL, requestData);
  },
  // # COUPONS
  getCouponList(data) {
    const getCouponListURL = baseURL + '/prasadam-coupon-list';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL Coupon List Data ',
      getCouponListURL,
      ' data ',
      requestData,
    );
    return axios.post(getCouponListURL, requestData);
  },
  addCoupon(data) {
    const addCouponURL = baseURL + '/request-prasadam-coupon';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL Add Coupon Data ', addCouponURL, ' data ', requestData);
    return axios.post(addCouponURL, requestData);
  },

  // # PaymentDetails
  getPaymentDetails(data) {
    const payDetailsURL = baseURL + '/payment-details';
    const requestData = {accessKey: Access_Key, ...data};
    console.log('URL Add Coupon Data ', payDetailsURL, ' data ', requestData);
    return axios.post(payDetailsURL, requestData);
  },
  // # NotificationList
  getNotificationList(data) {
    const notifyListURL = baseURL + '/notification-list';
    const requestData = {accessKey: Access_Key, ...data};
    console.log(
      'URL notify List URL Data ',
      notifyListURL,
      ' data ',
      requestData,
    );
    return axios.post(notifyListURL, requestData);
  },
};
