const INITIAL_STATE = {
    tabValue: "",
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "GET_TAB_VALUE":
        return { ...state, tabValue: action.payload };
      case 'SIGN_OUT':
        return {
          ...state,
          tabValue: ""
        };
      default:
        return state;
    }
  };