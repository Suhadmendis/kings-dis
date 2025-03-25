const INITIAL_STATE = {
  categoryItem: [],
  drawerCategoryItem: [],
  drawerSubcategoryItem: [],
  subcategoryItem: [],
  productItem: [],
  filterItem: [],
  filterData: [],
  itemImg: '',
  itemDescription: '',
  itemPrice: '',
  itemWeight: '',
  itemName: '',
  itemNumber: '',
  itemStore: '',
  titleName: 'Vegetable Seeds',
  newProducts: Date.now(),
  nodeAliasPath: '',
  filterOptions: {},
  sortBy: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_ITEM_USING_NAME':
      return {...state, categoryItem: action.payload};
    case 'GET_DRAWER_CATEGORY_ITEM_USING_NAME':
      return {...state, drawerCategoryItem: action.payload};
    case 'GET_SUB_CATEGORY_ITEM_USING_NAME':
      return {...state, subcategoryItem: action.payload};
    case 'GET_SUB_CATEGORY_DRAWER_ITEM_USING_NAME':
      return {...state, drawerSubcategoryItem: action.payload};
    case 'GET_PRODUCT_ITEM_USING_NAME':
      return {...state, productItem: action.payload};
    case 'GET_FILTER_USING_NAME':
      return {...state, filterItem: action.payload};
    case 'GET_FILTER_DATA_USING_NAME':
      return {
        ...state,
        filterData: action.payload,
        nodeAliasPath: action.nodeAliasPath,
        filterOptions: action.filterOptions,
        sortBy: action.sortBy,
      };
      // return { ...state, filterData: action.payload };
    case 'GET_ITEM_NAME':
      return {...state, itemName: action.payload};
    case 'GET_ITEM_IMAGE':
      return {...state, itemImg: action.payload};
    case 'GET_ITEM_DESCRIPTION':
      return {...state, itemDescription: action.payload};
    case 'GET_ITEM_PRICE':
      return {...state, itemPrice: action.payload};
    case 'GET_ITEM_WEIGHT':
      return {...state, itemWeight: action.payload};
    case 'GET_SELECTED_TITLE':
      return {...state, titleName: action.payload};
    case 'GET_ITEM_NUMBER':
      return {...state, itemNumber: action.payload};
    case 'GET_ITEM_STORE':
      return { ...state, itemStore: action.payload };
    case 'UPDATE_HOME_NEW_PRODUCTS':
      return { ...state, newProducts: action.payload };
    case 'SIGN_OUT':
      return { 
        ...state,
        categoryItem: [],
        drawerCategoryItem: [],
        drawerSubcategoryItem: [],
        subcategoryItem: [],
        productItem: [],
        filterItem: [],
        filterData: [],
        itemImg: '',
        itemDescription: '',
        itemPrice: '',
        itemWeight: '',
        itemName: '',
        itemNumber: '',
        itemStore: '',
        titleName: 'Vegetable Seeds',
        newProducts: Date.now(),
        nodeAliasPath: '',
        filterOptions: {},
        sortBy: ''
      };
    default:
      return state;
  }
};
