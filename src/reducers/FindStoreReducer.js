const INITIAL_STATE = {
  selItemName: "",
  adminAddress: "",
  itemCode: "", //tradeAccountId
  cusEmail: "",
  cusPhone: "",
  adminCustomerID: "",
  modalVisible: false,
  accCode: "",
  addressId: "",
  itemOnStop:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ITEM_NAME":
      return { ...state, selItemName: action.payload };
    case "GET_ADMIN_ADDRESS":
      return { ...state, adminAddress: action.payload };
    case "GET_ITEM_CODE":
      return { ...state, itemCode: action.payload };
    case "GET_ADMIN_CUS_EMAIL":
      return { ...state, cusEmail: action.payload };
    case "GET_ADMIN_CUS_PHONE":
      return { ...state, cusPhone: action.payload };
    case "GET_ADMIN_CUS_ID":
      return { ...state, adminCustomerID: action.payload };
    case "GET_ADDRESS_ID":
      return { ...state, addressId: action.payload };
    case "GET_ACC_CODE":
      return { ...state, accCode: action.payload };
    case "SET_MODAL_VISIBLITY":
      return { ...state, modalVisible: action.payload };
    case "GET_ITEM_ON_STOP":
      return { ...state, itemOnStop: action.payload };
    case 'SIGN_OUT':
      return { 
        ...state,
        selItemName: "",
        adminAddress: "",
        itemCode: "",
        cusEmail: "",
        cusPhone: "",
        adminCustomerID: "",
        modalVisible: false,
        accCode: "",
        addressId: "",
        itemOnStop:false
      };
    default:
      return state;
  }
};
