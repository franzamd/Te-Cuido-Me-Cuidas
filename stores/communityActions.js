import axios from 'axios';
import { API_URL } from '@env';

export const COMMUNITY_LIST_REQUEST = '@community/COMMUNITY_LIST_REQUEST';
export const COMMUNITY_LIST_SUCCESS = '@community/COMMUNITY_LIST_SUCCESS';
export const COMMUNITY_LIST_FAIL = '@community/COMMUNITY_LIST_FAIL';
export const COMMUNITY_RESET = '@community/COMMUNITY_RESET';

export const listCommunities = (departmentId, municipalityId) => async (dispatch) => {
  try {
    dispatch({ type: COMMUNITY_LIST_REQUEST });

    const res = await axios.get(`${API_URL}/api/departments/${departmentId}/municipalities/${municipalityId}/communities`);

    dispatch({ type: COMMUNITY_LIST_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    dispatch({ type: COMMUNITY_LIST_FAIL, payload: err.response?.data?.errors });
  }
};
