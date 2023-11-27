import axios from 'axios';
import { API_URL } from '@env';

export const COMPLAINT_LIST_REQUEST = '@complaint/COMPLAINT_LIST_REQUEST';
export const COMPLAINT_LIST_SUCCESS = '@complaint/COMPLAINT_LIST_SUCCESS';
export const COMPLAINT_LIST_FAIL = '@complaint/COMPLAINT_LIST_FAIL';
export const COMPLAINT_CREATE_REQUEST = '@complaint/COMPLAINT_CREATE_REQUEST';
export const COMPLAINT_CREATE_SUCCESS = '@complaint/COMPLAINT_CREATE_SUCCESS';
export const COMPLAINT_CREATE_FAIL = '@complaint/COMPLAINT_CREATE_FAIL';
export const COMPLAINT_RESET = '@complaint/COMPLAINT_RESET';

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

    dispatch({ type: COMPLAINT_CREATE_SUCCESS });
  } catch (err) {
    console.log(err.response?.data);
    dispatch({ type: COMPLAINT_CREATE_FAIL, payload: err.response?.data?.errors });
  }
};
