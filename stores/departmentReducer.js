import * as actionTypes from './departmentActions';

const departmentReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DEPARTMENT_LIST_REQUEST:
      return { ...state, loading: true };
    case actionTypes.DEPARTMENT_LIST_SUCCESS:
      return { loading: false, departments: action.payload };
    case actionTypes.DEPARTMENT_LIST_FAIL:
    case actionTypes.DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export default departmentReducer;
