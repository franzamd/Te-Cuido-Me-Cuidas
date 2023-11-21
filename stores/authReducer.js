import * as actionTypes from './authActions';

const initialState = {
  loading: true,
  userInfo: null,
  errors: null,
  info: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
    case actionTypes.USER_LOAD_REQUEST:
    case actionTypes.USER_LOGOUT_REQUEST:
      return { ...state, loading: true };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.USER_REGISTER_SUCCESS:
    case actionTypes.USER_LOAD_FROM_STORAGE_SUCCESS:
    case actionTypes.USER_LOAD_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, errors: null };
    case actionTypes.USER_LOGIN_FAIL:
    case actionTypes.USER_REGISTER_FAIL:
    case actionTypes.USER_LOGOUT_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.USER_CLEAR_ERRORS:
      return { ...state, loading: false, errors: null };
    case actionTypes.USER_LOGOUT:
    case actionTypes.USER_LOAD_FAIL:
      return { loading: false, userInfo: null, errors: null, info: null };
    default:
      return state;
  }
};

export default authReducer;
