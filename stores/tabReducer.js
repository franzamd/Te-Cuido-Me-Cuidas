import * as actionTypes from "./tabActions";

const initialState = {
  selectedTab: "Inicio",
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_TAB:
      return { selectedTab: action.payload };
    default:
      return state;
  }
};

export default tabReducer;
