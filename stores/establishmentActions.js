import axios from 'axios';
import { API_URL } from '@env';

export const ESTABLISHMENT_LIST_REQUEST = '@establishment/ESTABLISHMENT_LIST_REQUEST';
export const ESTABLISHMENT_LIST_SUCCESS = '@establishment/ESTABLISHMENT_LIST_SUCCESS';
export const ESTABLISHMENT_LIST_FAIL = '@establishment/ESTABLISHMENT_LIST_FAIL';
export const ESTABLISHMENT_RESET = '@establishment/ESTABLISHMENT_RESET';

export const listEstablishments = (departmentId, municipalityId) => async (dispatch) => {
  try {
    dispatch({ type: ESTABLISHMENT_LIST_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/departments/${departmentId}/municipalities/${municipalityId}/establishments`);

    dispatch({ type: ESTABLISHMENT_LIST_SUCCESS, payload: data?.data });
  } catch (err) {
    dispatch({ type: ESTABLISHMENT_LIST_FAIL, payload: err.response?.data?.errors });
  }
};
