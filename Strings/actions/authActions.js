import { GET_ERRORS, SET_CURRENT_USER  } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

// Register User
export const registerUser = (userData,navigation) => dispatch => {
  
  axios.post('http://192.168.43.175:5000/api/users/register', userData)
      .then(res => navigation.navigate("Login"))
      .catch(err =>{ 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        console.log("register catch",err);
      }
      );
};

// Login User
export const loginUser = (userData,navigate) => dispatch => {
  axios
    .post('http://192.168.43.175:5000/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      AsyncStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    
      navigate.navigate('App');  

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log("login catch",err);
    }

    );
};

// set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


// Log user out
export const logoutUser = (navigate) => dispatch => {
  // Remove token from localStorage
  AsyncStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  navigate.navigate('Auth');
};