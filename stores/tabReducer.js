import * as actionTypes from "./tabActions";

const initialState = {
  selectedTab: "Inicio",
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_TAB:
      return { selectedTab: action.payload };
    case actionTypes.RESET_SELECTED_TAB:
      return { selectedTab: 'Inicio' };
    default:
      return state;
  }
};

export default tabReducer;
