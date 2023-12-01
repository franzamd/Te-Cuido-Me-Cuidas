import axios from 'axios';
import { API_URL } from '@env';

export const DEPARTMENT_LIST_REQUEST = '@department/DEPARTMENT_LIST_REQUEST';
export const DEPARTMENT_LIST_SUCCESS = '@department/DEPARTMENT_LIST_SUCCESS';
export const DEPARTMENT_LIST_FAIL = '@department/DEPARTMENT_LIST_FAIL';
export const DEPARTMENT_RESET = '@department/DEPARTMENT_RESET';

export const listDepartments = () => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/departments`);

    dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data?.data });
  } catch (err) {
    dispatch({ type: DEPARTMENT_LIST_FAIL, payload: err.response?.data?.errors });
  }
};
