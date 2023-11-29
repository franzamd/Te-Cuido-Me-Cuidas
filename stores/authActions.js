import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RESET_SELECTED_TAB } from './tabActions'
import { COMMUNITY_RESET } from './communityActions'
import { ESTABLISHMENT_RESET } from './establishmentActions'
import { MUNICIPALITY_RESET } from './municipalityActions'
import { COMPLAINT_RESET } from './complaintActions'
import { USER_RESET } from './userActions'

export const USER_LOGIN_REQUEST = '@userLogin/USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = '@userLogin/USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = '@userLogin/USER_LOGIN_FAIL';
export const USER_REGISTER_REQUEST = '@userLogin/USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = '@userLogin/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = '@userLogin/USER_REGISTER_FAIL';
export const USER_LOAD_REQUEST = '@userLogin/USER_LOAD_REQUEST';
export const USER_LOAD_FROM_STORAGE_SUCCESS = '@userLogin/USER_LOAD_FROM_STORAGE_SUCCESS';
export const USER_LOAD_SUCCESS = '@userLogin/USER_LOAD_SUCCESS';
export const USER_LOAD_FAIL = '@userLogin/USER_LOAD_FAIL';
export const USER_LOGOUT_REQUEST = '@userLogin/USER_LOGOUT_REQUEST';
export const USER_LOGOUT = '@userLogin/USER_LOGOUT';
export const USER_LOGOUT_FAIL = '@userLogin/USER_LOGOUT_FAIL';
export const USER_CLEAR_ERRORS = '@userLogin/USER_CLEAR_ERRORS';

export const login = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch({ type: USER_LOGIN_REQUEST });
    const res = await axios.post(`${API_URL}/api/auth/login?accessMobile=true`, formData, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
    // Save to localStorage auth data (offline)
    const data = JSON.stringify(res.data);
    await AsyncStorage.setItem('@userLogin', data);
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.errors });
  }
};

export const register = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch({ type: USER_REGISTER_REQUEST });
    const res = await axios.post(`${API_URL}/api/auth/register`, formData, config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
    // Save to localStorage auth data (offline)
    const data = JSON.stringify(res.data);
    await AsyncStorage.setItem('@userLogin', data);
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response?.data?.errors });
  }
};

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });
    // Get user and token from localStorage
    const jsonValues = await AsyncStorage.getItem('@userLogin');
    if (jsonValues) {
      dispatch({ type: USER_LOAD_FROM_STORAGE_SUCCESS, payload: JSON.parse(jsonValues) });
    }

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/auth/me`, config);

    // Save to localStorage auth data (offline)
    const data = JSON.stringify(res.data);
    await AsyncStorage.setItem('@userLogin', data);
    dispatch({ type: USER_LOAD_SUCCESS, payload: res.data });
  } catch (error) {
    // If failed network status
    if (error.message === 'Network Error') {
      // Fetch localStorage auth data (offline)
      if (jsonValues) {
        dispatch({ type: USER_LOAD_FROM_STORAGE_SUCCESS, payload: JSON.parse(jsonValues) });
      }
      return;
    }

    // Else reset data for onboarding login register screen
    dispatch({ type: USER_LOAD_FAIL })
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    // Remove data from localStorage
    await AsyncStorage.removeItem('@userLogin');
    // Remove from api
    await axios.get(`${API_URL}/api/auth/logout`);
    // Clear data
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: RESET_SELECTED_TAB });
    dispatch({ type: COMMUNITY_RESET });
    dispatch({ type: ESTABLISHMENT_RESET });
    dispatch({ type: MUNICIPALITY_RESET });
    dispatch({ type: COMPLAINT_RESET });
    dispatch({ type: USER_RESET });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response?.data?.errors });
  }
};

// export const forgotPassword = formData => async dispatch => {
//   try {
//     const res = await axios.post(
//       `${API_URL}/api/auth/forgotpassword`,
//       formData,
//       configJSON,
//     );

//     dispatch({
//       type: FORGOT_PASSWORD_SUCCESS,
//       payload: res.data?.data,
//     });
//   } catch (error) {
//     // If failed network status
//     if (error.message === 'Network Error') {
//       return {
//         isNetworkFailed: true,
//       };
//     }

//     dispatch({
//       type: FORGOT_PASSWORD_FAILURE,
//       payload: error.response?.data?.errors,
//     });
//   }
// };


// export const deleteAccount = () => async dispatch => {
//   try {
//     // Remove from api
//     await axios.delete(`${API_URL}/api/auth/delete`);

//     // Remove from localStorage
//     await AsyncStorage.removeItem('@userLogin');

//     dispatch({
//       type: LOGOUT,
//     });
//   } catch (error) {
//     // If failed network status
//     if (error.message === 'Network Error') {
//       return {
//         isNetworkFailed: true,
//       };
//     }

//     return {
//       success: false,
//       error: error.response?.data?.errors?.error,
//     };
//   }
// };

// export const updateProfile = formData => async dispatch => {
//   try {
//     await axios.put(
//       `${API_URL}/api/auth/profile/update`,
//       formData,
//       configJSON,
//     );
//     dispatch(await loadUser());
//   } catch (error) {
//     // If failed network status
//     if (error.message === 'Network Error') {
//       return {
//         isNetworkFailed: true,
//       };
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: error.response?.data?.errors,
//     });
//     return error;
//   }
// };
