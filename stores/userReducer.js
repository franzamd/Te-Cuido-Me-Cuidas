import * as actionTypes from './userActions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_ROLE_INSTANCE_LIST_REQUEST:
      return { loading: true };
    case actionTypes.USER_ROLE_INSTANCE_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case actionTypes.USER_ROLE_INSTANCE_LIST_FAIL:
      return { loading: false, errors: action.payload };
    case actionTypes.USER_RESET:
      return {};
    default:
      return state;
  }
};

export default userReducer;
