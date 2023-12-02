import * as actionTypes from './authActions';

const initialState = {
  loading: true,
  userInfo: null,
  errors: null,
  info: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
    case actionTypes.USER_LOAD_REQUEST:
    case actionTypes.USER_LOGOUT_REQUEST:
      return { ...state, loading: true };
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loadingUpdate: true };
    case actionTypes.USER_DELETE_ACCOUNT_REQUEST:
      return { ...state, loadingDelete: true };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.USER_REGISTER_SUCCESS:
    case actionTypes.USER_LOAD_FROM_STORAGE_SUCCESS:
    case actionTypes.USER_LOAD_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, errors: null };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loadingUpdate: false, userInfo: action.payload, errors: null, updateSuccess: true };
    case actionTypes.USER_LOGIN_FAIL:
    case actionTypes.USER_REGISTER_FAIL:
    case actionTypes.USER_LOGOUT_FAIL:
    case actionTypes.USER_LOGIN_FAIL_OFFLINE:
    case actionTypes.USER_REGISTER_FAIL_OFFLINE:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.USER_UPDATE_PROFILE_FAIL:
    case actionTypes.USER_UPDATE_PROFILE_FAIL_OFFLINE:
      return { ...state, loadingUpdate: false, errors: action.payload, updateSuccess: false };
    case actionTypes.USER_DELETE_ACCOUNT_FAIL:
    case actionTypes.USER_DELETE_ACCOUNT_FAIL_OFFLINE:
      return { ...state, loading: false, errors: action.payload, loadingDelete: false, loadingDelete: false };
    case actionTypes.USER_CLEAR_ERRORS:
      return { ...state, loading: false, errors: null };
    case actionTypes.USER_PROFILE_CLEAR_ERRORS:
      return { ...state, errors: null, loadingUpdate: false, updateSuccess: false };
    case actionTypes.USER_LOGOUT:
    case actionTypes.USER_LOAD_FAIL:
    case actionTypes.USER_DELETE_ACCOUNT_SUCCESS:
    case actionTypes.USER_LOGOUT_SUCCESS_OFFLINE:
      return { loading: false, userInfo: null, errors: null, info: null };
    default:
      return state;
  }
};

export default authReducer;
