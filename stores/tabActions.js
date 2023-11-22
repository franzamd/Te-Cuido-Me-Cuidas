export const SET_SELECTED_TAB = "@tab/SET_SELECTED_TAB";

export const setSelectedTab = (selectedTab) => dispatch => {
  dispatch({ type: SET_SELECTED_TAB, payload: selectedTab });
}
