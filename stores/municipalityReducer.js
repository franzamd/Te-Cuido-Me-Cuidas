import * as actionTypes from './municipalityActions';

const municipalityReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.MUNICIPALITY_LIST_REQUEST:
      return { ...state, loading: true };
    case actionTypes.MUNICIPALITY_LIST_SUCCESS:
      return { loading: false, municipalities: action.payload };
    case actionTypes.MUNICIPALITY_LIST_FAIL:
    case actionTypes.MUNICIPALITY_RESET:
      return {};
    default:
      return state;
  }
};

export default municipalityReducer;
