import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import authReducer from './authReducer';
import communityReducer from './communityReducer';
import establishmentReducer from './establishmentReducer';
import municipalityReducer from './municipalityReducer';
import tabReducer from './tabReducer';

export default combineReducers({
  theme: themeReducer,
  userLogin: authReducer,
  community: communityReducer,
  establishment: establishmentReducer,
  municipality: municipalityReducer,
  tab: tabReducer
});
