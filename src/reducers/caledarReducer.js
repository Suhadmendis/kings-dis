const INITIAL_STATE = {
  appointmentsAdded: [],
  appointmentsObj: [],
  back:''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ADDED_APPS":
      return { ...state, appointmentsAdded: action.payload };
    case "GET_ADDED_OBJ":
      return { ...state, appointmentsObj: action.payload };
    case "GET_BACK":
      return { ...state, back: action.payload };
    // case 'SIGN_OUT':
    //   return { 
    //     ...state,
    //     appointmentsAdded: [],
    //     appointmentsObj: [],
    //     back:''
    //   };
    default:
      return state;
  }
};
