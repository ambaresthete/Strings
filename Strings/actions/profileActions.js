import axios from 'axios';
import {Alert} from 'react-native';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  ADD_PROFILE,
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('http://192.168.43.175:5000/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://192.168.43.175:5000/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, navigate) => dispatch => {

  axios({
  url: 'http://192.168.43.175:5000/api/profile',
  method: 'POST',
  data: profileData,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
  })
    .then(res =>{
      dispatch({
        type: ADD_PROFILE,
        payload: res.data
      });
      navigate.push("Dashboard");
    })
    .catch(err => 
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (expData, navigate) => dispatch => {
  axios
    .post('http://192.168.43.175:5000/api/profile/experience', expData)
    .then(res => navigate.push('Dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (eduData, navigate) => dispatch => {
  axios
    .post('http://192.168.43.175:5000/api/profile/education', eduData)
    .then(res => navigate.push('Dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addMusic = (muData, navigate) => dispatch => {
  axios({
  url: 'http://192.168.43.175:5000/api/profile/music',
  method: 'POST',
  data: muData,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
  })
    .then(res => navigate.push("Dashboard"))
    .catch(err => 
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteMusic = id => dispatch => {
  axios
    .delete(`http://192.168.43.175:5000/api/profile/music/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`http://192.168.43.175:5000/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`http://192.168.43.175:5000/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('http://192.168.43.175:5000/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
    axios
      .delete('http://192.168.43.175:5000/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};