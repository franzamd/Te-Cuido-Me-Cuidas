import axios from 'axios';
import { API_URL } from '@env';
import { Toast } from 'react-native-toast-notifications';
import { constants } from '../constants';

export const COMPLAINT_LIST_REQUEST = '@complaint/COMPLAINT_LIST_REQUEST';
export const COMPLAINT_LIST_SUCCESS = '@complaint/COMPLAINT_LIST_SUCCESS';
export const COMPLAINT_LIST_FAIL = '@complaint/COMPLAINT_LIST_FAIL';
export const COMPLAINT_CREATE_REQUEST = '@complaint/COMPLAINT_CREATE_REQUEST';
export const COMPLAINT_CREATE_SUCCESS = '@complaint/COMPLAINT_CREATE_SUCCESS';
export const COMPLAINT_CREATE_FAIL = '@complaint/COMPLAINT_CREATE_FAIL';
export const COMPLAINT_CREATE_FAIL_OFFLINE = '@complaint/COMPLAINT_CREATE_FAIL_OFFLINE';
export const COMPLAINT_DELIVER_TO_INSTANCE_REQUEST = '@complaint/COMPLAINT_DELIVER_TO_INSTANCE_REQUEST';
export const COMPLAINT_DELIVER_TO_INSTANCE_SUCCESS = '@complaint/COMPLAINT_DELIVER_TO_INSTANCE_SUCCESS';
export const COMPLAINT_DELIVER_TO_INSTANCE_FAIL = '@complaint/COMPLAINT_DELIVER_TO_INSTANCE_FAIL';
export const COMPLAINT_DELIVER_TO_INSTANCE_FAIL_OFFLINE = '@complaint/COMPLAINT_DELIVER_TO_INSTANCE_FAIL_OFFLINE';
export const COMPLAINT_DELETE_REQUEST = '@complaint/COMPLAINT_DELETE_REQUEST';
export const COMPLAINT_DELETE_SUCCESS = '@complaint/COMPLAINT_DELETE_SUCCESS';
export const COMPLAINT_DELETE_FAIL = '@complaint/COMPLAINT_DELETE_FAIL';
export const COMPLAINT_DELETE_FAIL_OFFLINE = '@complaint/COMPLAINT_DELETE_FAIL_OFFLINE';
export const COMPLAINT_CLEAR_ERROR = '@complaint/COMPLAINT_CLEAR_ERROR';
export const COMPLAINT_RESET = '@complaint/COMPLAINT_RESET';

export const getMyComplaints = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLAINT_LIST_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/complaints/me`, config);

    dispatch({ type: COMPLAINT_LIST_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    dispatch({ type: COMPLAINT_LIST_FAIL, payload: err.response?.data?.errors });
  }
};

export const getComplaintsFromUserIntermediary = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLAINT_LIST_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/complaints/intermediary?keyword=${keyword}`, config);

    dispatch({ type: COMPLAINT_LIST_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    dispatch({ type: COMPLAINT_LIST_FAIL, payload: err.response?.data?.errors });
  }
};

export const createComplaint = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLAINT_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`${API_URL}/api/complaints`, formData, config);

    // Toast
    Toast.show('Denuncia enviada exitosamente', {
      type: 'success',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    dispatch({ type: COMPLAINT_CREATE_SUCCESS });
  } catch (err) {
    // Toast
    Toast.show('¡Ups! Algo salió mal', {
      type: 'danger',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    // If failed network status
    if (err.message === 'Network Error') {
      const errors = {
        error: constants.offline.description
      }
      dispatch({ type: COMPLAINT_CREATE_FAIL_OFFLINE, payload: errors });
      return;
    }

    dispatch({ type: COMPLAINT_CREATE_FAIL, payload: err.response?.data?.errors });
  }
};

export const createComplaintAssisted = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLAINT_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    await axios.post(`${API_URL}/api/complaints/assisted`, formData, config);

    // Toast
    Toast.show('Denuncia enviada exitosamente', {
      type: 'success',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    dispatch({ type: COMPLAINT_CREATE_SUCCESS });
  } catch (err) {
    // Toast
    Toast.show('¡Ups! Algo salió mal', {
      type: 'danger',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    // If failed network status
    if (err.message === 'Network Error') {
      const errors = {
        error: constants.offline.description
      }
      dispatch({ type: COMPLAINT_CREATE_FAIL_OFFLINE, payload: errors });
      return;
    }

    dispatch({ type: COMPLAINT_CREATE_FAIL, payload: err.response?.data?.errors });
  }
};

// user intermediary to user instance
export const deliverToInstance = (complaintId, formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLAINT_DELIVER_TO_INSTANCE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const res = await axios.put(`${API_URL}/api/complaints/${complaintId}/deliver-instance`, formData, config);

    // Toast
    Toast.show('Denuncia enviada exitosamente', {
      type: 'success',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    dispatch({ type: COMPLAINT_DELIVER_TO_INSTANCE_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    // Toast
    Toast.show('¡Ups! Algo salió mal', {
      type: 'danger',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    // If failed network status
    if (err.message === 'Network Error') {
      const errors = {
        error: constants.offline.description
      }
      dispatch({ type: COMPLAINT_DELIVER_TO_INSTANCE_FAIL_OFFLINE, payload: errors });
      return;
    }

    dispatch({
      type: COMPLAINT_DELIVER_TO_INSTANCE_FAIL,
      payload: err.response?.data?.errors
    });
  }
};

// Delete complaint by intermediary
export const deleteComplaint = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLAINT_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${API_URL}/api/complaints/${id}`, config);

    // Toast
    Toast.show('Denuncia eliminada exitosamente', {
      type: 'success',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    dispatch({ type: COMPLAINT_DELETE_SUCCESS });
  } catch (err) {
    // Toast
    Toast.show('¡Ups! Algo salió mal', {
      type: 'danger',
      placement: 'top',
      duration: 5000,
      animationType: 'slide-in',
    });

    // If failed network status
    if (err.message === 'Network Error') {
      const errors = {
        error: constants.offline.description
      }
      dispatch({ type: COMPLAINT_DELETE_FAIL_OFFLINE, payload: errors });
      return;
    }

    dispatch({
      type: COMPLAINT_DELETE_FAIL,
      payload: err.response?.data?.errors
    });
  }
};
