import * as actionTypes from './establishmentActions';

const establishmentReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ESTABLISHMENT_LIST_REQUEST:
      return { ...state, loading: true };
    case actionTypes.ESTABLISHMENT_LIST_SUCCESS:
      return { loading: false, establishments: action.payload };
    case actionTypes.ESTABLISHMENT_LIST_FAIL:
    case actionTypes.ESTABLISHMENT_RESET:
      return {};
    default:
      return state;
  }
};

export default establishmentReducer;
