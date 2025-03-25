const INITIAL_STATE = {
    ViewType_: "",
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "GET_CONTACT_VIEW_TYPE":
        return { ...state, ViewType_: action.payload };
      case 'SIGN_OUT':
        return { 
          ...state,
          ViewType_: ""
        };
      default:
        return state;
    }
  };