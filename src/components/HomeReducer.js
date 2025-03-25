const INITIAL_STATE = {
  categoryItem: [],
  subcategoryItem: [],
  productItem: [],
  filterItem: [],
  filterData:[],
  itemImg: '',
  itemDescriptipn: '',
  itemPrice: '',
  itemWeight: '',
  itemName: '',
  itemNumber: '',
  itemStore: '',
  cartArray: [],
  titleName: 'Vegetable Seeds',
  loginName:'',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_ITEM_USING_NAME':
      return { ...state, categoryItem: action.payload };
    case 'GET_SUB_CATEGORY_ITEM_USING_NAME':
      return { ...state, subcategoryItem: action.payload };
    case 'GET_PRODUCT_ITEM_USING_NAME':
      return { ...state, productItem: action.payload };
    case 'GET_FILTER_USING_NAME':
      return { ...state, filterItem: action.payload };
    case 'GET_FILTER_DATA_USING_NAME':
      return { ...state, filterData: action.payload };
    case 'GET_ITEM_NAME':
      return { ...state, itemName: action.payload };
    case 'GET_ITEM_IMAGE':
      return { ...state, itemImg: action.payload };
    case 'GET_ITEM_DESCRIPTION':
      return { ...state, itemDescriptipn: action.payload };
    case 'GET_ITEM_PRICE':
      return { ...state, itemPrice: action.payload };
    case 'GET_ITEM_WEIGHT':
      return { ...state, itemWeight: action.payload };
    case 'ADD_ITEM_TO_CART':
      return { ...state, cartArray: action.payload };
    case 'GET_SELECTED_TITLE':
      return { ...state, titleName: action.payload };
    case 'GET_ITEM_NUMBER':
      return { ...state, itemNumber: action.payload };
    case 'GET_ITEM_STORE':
      return { ...state, itemStore: action.payload };
    case 'GET_LOGIN_NAME':
      return { ...state, loginName: action.payload };
    default:
      return state;
  }
};
