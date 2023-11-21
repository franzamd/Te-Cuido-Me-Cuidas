import * as actionTypes from './communityActions';

const communityReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.COMMUNITY_LIST_REQUEST:
      return { ...state, loading: true };
    case actionTypes.COMMUNITY_LIST_SUCCESS:
      return { loading: false, communities: action.payload };
    case actionTypes.COMMUNITY_LIST_FAIL:
    case actionTypes.COMMUNITY_RESET:
      return {};
    default:
      return state;
  }
};

export default communityReducer;
