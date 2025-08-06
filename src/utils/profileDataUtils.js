import { getImage } from './ImagePath';

// Helper function to get icon by name
export const getIconByName = (iconName) => {
  const iconMap = {
    gmail: getImage.gmail,
    yfh: getImage.yfh,
    phone: getImage.phone,
    gender: getImage.gender,
    level: getImage.level,
    spouse: getImage.spouse,
    occupation: getImage.occupation,
    designation: getImage.designation,
    qualification: getImage.qualification,
    center: getImage.center,
    city: getImage.city,
    state: getImage.state,
    country: getImage.country,
    location: getImage.location,
    father: getImage.father,
    fatherContact: getImage.fatherContact,
    mother: getImage.mother,
    motherContact: getImage.motherContact,
    bloodGroup: getImage.bloodGroup,
    emergencyContact: getImage.emergencyContact,
  };
  return iconMap[iconName] || getImage.person;
};

// Helper function to get style by name
export const getStyleByName = (styleName, styles) => {
  const styleMap = {
    yfhPhoneContainer: [styles.horizontalFieldsContainer, styles.yfhPhoneContainer],
    yfhPhoneItem: [styles.horizontalFieldItem, styles.yfhPhoneItem],
  };
  return styleMap[styleName] || null;
};

// Helper function to get value from userDetails or fallback
export const getFieldValue = (key, userDetails, profileData, fallback = 'N/A') => {
  return userDetails?.[key] || profileData?.userInfo?.[key] || fallback;
};

// Function to validate profile data structure
export const validateProfileData = (data) => {
  const requiredFields = ['userInfo', 'fieldGroups', 'additionalInfoGroups', 'locationFields'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    console.warn('Missing required fields in profile data:', missingFields);
    return false;
  }
  
  return true;
};

// Function to transform backend data to expected format
export const transformProfileData = (backendData) => {
  // If backend data is already in the correct format, return as is
  if (validateProfileData(backendData)) {
    return backendData;
  }
  
  // If backend data is in a different format, transform it
  // This is a placeholder for transformation logic
  return {
    userInfo: backendData.userInfo || backendData,
    fieldGroups: backendData.fieldGroups || [],
    additionalInfoGroups: backendData.additionalInfoGroups || [],
    locationFields: backendData.locationFields || []
  };
};

// Function to merge user details with profile data
export const mergeUserDetailsWithProfileData = (userDetails, profileData) => {
  return {
    ...profileData,
    userInfo: {
      ...profileData.userInfo,
      ...userDetails
    }
  };
}; 