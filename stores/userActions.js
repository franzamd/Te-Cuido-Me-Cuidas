import axios from 'axios';
import { config } from '../constants';

export const USER_ROLE_INSTANCE_LIST_REQUEST = '@user/USER_ROLE_INSTANCE_LIST_REQUEST';
export const USER_ROLE_INSTANCE_LIST_SUCCESS = '@user/USER_ROLE_INSTANCE_LIST_SUCCESS';
export const USER_ROLE_INSTANCE_LIST_FAIL = '@user/USER_ROLE_INSTANCE_LIST_FAIL';
export const USER_RESET = '@user/USER_RESET';

const { API_URL } = config

export const listUsersWithRoleInstance = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ROLE_INSTANCE_LIST_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/users/role/instance`, config);

    dispatch({ type: USER_ROLE_INSTANCE_LIST_SUCCESS, payload: res?.data?.data });
  } catch (err) {
    dispatch({
      type: USER_ROLE_INSTANCE_LIST_FAIL,
      payload: err.response?.data?.errors
    });
  }
};
