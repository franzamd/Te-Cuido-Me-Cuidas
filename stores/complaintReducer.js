import * as actionTypes from './complaintActions';

const complaintReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.COMPLAINT_LIST_REQUEST:
    case actionTypes.COMPLAINT_CREATE_REQUEST:
    case actionTypes.COMPLAINT_CREATE_REQUEST:
    case actionTypes.COMPLAINT_DELIVER_TO_INSTANCE_REQUEST:
    case actionTypes.COMPLAINT_DELETE_REQUEST:
      return { ...state, loading: true };
    case actionTypes.COMPLAINT_LIST_SUCCESS:
      return { loading: false, complaints: action.payload };
    case actionTypes.COMPLAINT_CREATE_SUCCESS:
      return { ...state, loading: false, createSuccess: true };
    case actionTypes.COMPLAINT_DELIVER_TO_INSTANCE_SUCCESS:
      return { loading: false, updateSuccess: true };
    case actionTypes.COMPLAINT_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case actionTypes.COMPLAINT_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        errors: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false
      };
    case actionTypes.COMPLAINT_CREATE_FAIL_OFFLINE:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.COMPLAINT_CREATE_FAIL:
    case actionTypes.COMPLAINT_LIST_FAIL:
    case actionTypes.COMPLAINT_DELIVER_TO_INSTANCE_FAIL:
    case actionTypes.COMPLAINT_DELETE_FAIL:
    case actionTypes.COMPLAINT_DELETE_FAIL_OFFLINE:
    case actionTypes.COMPLAINT_DELIVER_TO_INSTANCE_FAIL_OFFLINE:
      return { ...state, loading: false, errors: action.payload };
    case actionTypes.COMPLAINT_RESET:
      return {};
    default:
      return state;
  }
};

export default complaintReducer;
