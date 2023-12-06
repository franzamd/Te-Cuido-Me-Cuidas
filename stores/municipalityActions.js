import axios from 'axios';
import { config } from '../constants';

export const MUNICIPALITY_LIST_REQUEST = '@municipality/MUNICIPALITY_LIST_REQUEST';
export const MUNICIPALITY_LIST_SUCCESS = '@municipality/MUNICIPALITY_LIST_SUCCESS';
export const MUNICIPALITY_LIST_FAIL = '@municipality/MUNICIPALITY_LIST_FAIL';
export const MUNICIPALITY_RESET = '@municipality/MUNICIPALITY_RESET';

const { API_URL } = config

export const listMunicipalities = (departmentId) => async (dispatch) => {
  try {
    dispatch({ type: MUNICIPALITY_LIST_REQUEST });

    const res = await axios.get(`${API_URL}/api/departments/${departmentId}/municipalities`);

    dispatch({ type: MUNICIPALITY_LIST_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    dispatch({ type: MUNICIPALITY_LIST_FAIL, payload: err.response?.data?.errors });
  }
};
