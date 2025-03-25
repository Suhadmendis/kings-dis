const INITIAL_STATE = {
    selItemCodes: [],
    itemsArray: [],
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "GET_SEL_ITEM_CODES":
        return { ...state, selItemCodes: action.payload };
      case "GET_ITEM_ARRAY":
        return { ...state, itemsArray: action.payload };
      case 'SIGN_OUT':
        return {
          ...state,
          selItemCodes: [],
          itemsArray: []
        };
      default:
        return state;
    }
  };