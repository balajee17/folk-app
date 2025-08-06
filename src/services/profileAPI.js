import { API } from './API';

// API endpoints for profile data
const PROFILE_ENDPOINTS = {
  GET_PROFILE_DATA: '/profile/data',
  GET_USER_DETAILS: '/profile/user-details',
  UPDATE_PROFILE: '/profile/update',
};

// Function to fetch profile data structure from backend
export const fetchProfileDataStructure = async () => {
  try {
    const response = await API.get(PROFILE_ENDPOINTS.GET_PROFILE_DATA);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data structure:', error);
    // Return fallback structure if API fails
    return getFallbackProfileData();
  }
};

// Function to fetch user details from backend
export const fetchUserDetails = async (userId) => {
  try {
    const response = await API.get(`${PROFILE_ENDPOINTS.GET_USER_DETAILS}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

// Function to update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await API.put(`${PROFILE_ENDPOINTS.UPDATE_PROFILE}/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Fallback profile data structure (used when API fails)
const getFallbackProfileData = () => {
  return {
    userInfo: {
      email: "example@gmail.com",
      yfh: "8457648664",
      phone: "9874563214",
      gender: "Male",
      level: "Medium",
      spouse: "Null",
      occupation: "Designer",
      designation: "UIUX Designer",
      qualification: "UIUX Designer",
      center: "HK Hill",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      location: "Hare Krishna Hill, Chord Rd, Rajajinagar,\nBengaluru, Karnataka 560010",
      permanentAddress: "Hare Krishna Hill, Chord Rd, Rajajinagar,\nBengaluru, Karnataka 560010",
      fatherName: "N/A",
      fatherContact: "N/A",
      motherName: "N/A",
      motherContact: "N/A",
      bloodGroup: "N/A",
      emergencyContact: "N/A"
    },
    fieldGroups: [
      {
        type: "vertical",
        fields: [
          {
            label: "Email ID",
            key: "email",
            icon: "gmail"
          }
        ]
      },
      {
        type: "horizontal",
        style: "yfhPhoneContainer",
        fields: [
          {
            label: "YFH",
            key: "yfh",
            icon: "yfh",
            style: "yfhPhoneItem"
          },
          {
            label: "Phone Number",
            key: "phone",
            icon: "phone",
            style: "yfhPhoneItem"
          }
        ]
      },
      {
        type: "horizontal",
        fields: [
          {
            label: "Gender",
            key: "gender",
            icon: "gender"
          },
          {
            label: "Level",
            key: "level",
            icon: "level"
          }
        ]
      },
      {
        type: "horizontal",
        fields: [
          {
            label: "Spouse ID",
            key: "spouse",
            icon: "spouse"
          },
          {
            label: "Occupation",
            key: "occupation",
            icon: "occupation"
          }
        ]
      },
      {
        type: "horizontal",
        fields: [
          {
            label: "Designation",
            key: "designation",
            icon: "designation"
          },
          {
            label: "Highest Qualification",
            key: "qualification",
            icon: "qualification"
          }
        ]
      },
      {
        type: "horizontal",
        fields: [
          {
            label: "Center",
            key: "center",
            icon: "center"
          },
          {
            label: "City",
            key: "city",
            icon: "city"
          }
        ]
      },
      {
        type: "horizontal",
        fields: [
          {
            label: "State",
            key: "state",
            icon: "state"
          },
          {
            label: "Country",
            key: "country",
            icon: "country"
          }
        ]
      }
    ],
    additionalInfoGroups: [
      [
        {
          label: "Father's Name",
          key: "fatherName",
          icon: "father"
        },
        {
          label: "Father's Contact",
          key: "fatherContact",
          icon: "fatherContact"
        }
      ],
      [
        {
          label: "Mother's Name",
          key: "motherName",
          icon: "mother"
        },
        {
          label: "Mother's Contact",
          key: "motherContact",
          icon: "motherContact"
        }
      ],
      [
        {
          label: "Blood Group",
          key: "bloodGroup",
          icon: "bloodGroup"
        },
        {
          label: "Emergency Contact",
          key: "emergencyContact",
          icon: "emergencyContact"
        }
      ]
    ],
    locationFields: [
      {
        label: "Permanent Address",
        key: "permanentAddress",
        icon: "location"
      },
      {
        label: "Location",
        key: "location",
        icon: "location"
      }
    ]
  };
};

// Example usage in a component:
/*
import React, { useState, useEffect } from 'react';
import { fetchProfileDataStructure, fetchUserDetails } from '../services/profileAPI';
import ProfileDetails from '../screens/ProfileDetails';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile data structure from backend
        const dataStructure = await fetchProfileDataStructure();
        setProfileData(dataStructure);
        
        // Fetch user details from backend
        const userId = 'your-user-id'; // Get from auth context or props
        const userData = await fetchUserDetails(userId);
        setUserDetails(userData);
        
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ProfileDetails
      profileData={profileData}
      userDetails={userDetails}
      shimmer={loading}
    />
  );
};

export default ProfileScreen;
*/ 