import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import authReducer from './authReducer';
import communityReducer from './communityReducer';
import establishmentReducer from './establishmentReducer';
import municipalityReducer from './municipalityReducer';
import tabReducer from './tabReducer';
import complaintReducer from './complaintReducer';
import userReducer from './userReducer';
import departmentReducer from './departmentReducer';

export default combineReducers({
  theme: themeReducer,
  userLogin: authReducer,
  community: communityReducer,
  establishment: establishmentReducer,
  municipality: municipalityReducer,
  tab: tabReducer,
  complaint: complaintReducer,
  user: userReducer,
  department: departmentReducer
});
