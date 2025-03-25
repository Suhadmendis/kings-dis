import URL from '../url/baseUrl';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {store} from "../../configureStore";
import { NavigationContext } from '@react-navigation/native';
import * as RootNavigation from '../navigation/RootNavigation';

const contextType = NavigationContext;

export const getCategories = (text) => async dispatch => {
  // console.log(text);
  let obj = {
    offset: '0',
    pagesize: '150'
  };
  await URL.post('products/categories', obj, {
    //method: 'POST',
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
      // console.log(response.data);
      dispatch({
        type: 'GET_CATEGORY_ITEM_USING_NAME',
        payload: response.data,
      });
      setTimeout(() => {
        RootNavigation.navigate('productCategory');
      }, 10);
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};

export const getDrawerCategories = (text) => async dispatch => {

  let obj = {
    offset: '0',
    pagesize: '150'
  };
  await URL.post('products/categories', obj, {
    //method: 'POST',
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
      // console.log(response.data);
      dispatch({
        type: 'GET_DRAWER_CATEGORY_ITEM_USING_NAME',
        payload: response.data,
      });
      // setTimeout(() => {
      //   RootNavigation.navigate('drawerContent');
      // }, 1000);
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};

export const getsubCategories = (text, type) => async dispatch => {
  let obj = {
    offset: '0',
    pagesize: '150',
    category: type,
  };



  await URL.post('products/categories', obj, {
    //method: 'POST',
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
      //console.log(response.data);
      dispatch({
        type: 'GET_SUB_CATEGORY_ITEM_USING_NAME',
        payload: response.data,
      });
      setTimeout(() => {
        RootNavigation.navigate('productSubcategory');
      }, 10);
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};

export const getsubCategoriesDrawer = (text, type) => async dispatch => {
  let obj = {
    offset: '0',
    pagesize: '150',
    category: type,
  };
  await URL.post('products/categories', obj, {
    //method: 'POST',
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
      // console.log(response.data);
      dispatch({
        type: 'GET_SUB_CATEGORY_DRAWER_ITEM_USING_NAME',
        payload: response.data,
      });
      // setTimeout(() => {
      //   RootNavigation.navigate('vegetableSeed');
      // }, 1000);
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};

export const getProductDetails = (text, type) => async dispatch => {
  // console.log('pro detail type : '+type);
  let obj = {
    NodeSKUID: type,
  };
  await URL.post('products/GetProductDetails', obj, {
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
     //console.log(response.data);
      dispatch({
        type: 'GET_PRODUCT_ITEM_USING_NAME',
        payload: response.data,
      });
      setTimeout(() => {
        RootNavigation.navigate('productDetails');
      }, 10);
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};

export const getFilters = (text, type) => async dispatch => {
  // console.log(text);
  let obj = {
    NodeAliasPath: type,
    CurrentPage: '1',
    PageSize: '150',
    LastFilterClicked: {},
    FiltersFromURL: [],
    SortBy: 'ct.SKUName'
  };
  await URL.post('GetFilters', obj, {
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
      // console.log(response.data);
      dispatch({
        type: 'GET_FILTER_USING_NAME',
        payload: response.data,
      });
      // setTimeout(() => {
      // RootNavigation.navigate('productGrid');
      // Load Filter Screen
      // }, 1000);
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};


export const getFilterData = (text, type, name = '', filters = [], SortBy='ct.SKUName', isFilterData = false) => async dispatch => {
  let obj = {
    NodeAliasPath: type,
    CurrentPage: '1',
    PageSize: '150',
    LastFilterClicked: {},
    Filters: filters,
    FiltersFromURL: [],
    SortBy: SortBy
  };
  await URL.post('GetFilterData', obj, {
    headers: {
      Authorization: 'Bearer ' + text,
    },
  })
    .then(response => {
      dispatch({
        type: 'GET_FILTER_DATA_USING_NAME',
        payload: response.data.products,
        nodeAliasPath: type,
        filterOptions: filters,
        sortBy: SortBy
      });

      if (!isFilterData) {
        setTimeout(() => {
          RootNavigation.navigate('productGrid',{ subcatName: name, subcatNodeAliasPath: type });
        }, 10);
      }
    })
    .catch(function (error) {
      // console.log(error.message);
      var status = error.response.status;
      if (status == 401) {
        tokenLogOut();
      }
    });
};

export const addItemToCart = array => async dispatch => {
  dispatch({
    type: 'ADD_ITEM_TO_CART',
    payload: array,
  });
};

export const getSelectedTileTxt = text => async dispatch => {
  dispatch({
    type: 'GET_SELECTED_TITLE',
    payload: text,
  });
};


export const userLogOut = async () => {
  // console.log('userLogOut');

  try {
    store.dispatch({ type: "SIGN_OUT" });
    // await AsyncStorage.removeItem('Token');
    // await AsyncStorage.removeItem("UserToken");
    // await AsyncStorage.removeItem("Customer");
    // await AsyncStorage.clear();


    store.dispatch({type:'CustomSpinner:HIDE'}); // hide spinner if its active
    // RootNavigation.navigate('loading');
    // RootNavigation.navigate('signIn');
    // Actions.reset("signIn");
    RootNavigation.navigate('signIn');
  } catch (error) {}
};

export const tokenLogOut = async () => {
  // console.log('tokenLogOut');
  // AsyncStorage.setItem('Logout', 'Token Expired');
  try {
    store.dispatch({ type: "SIGN_OUT" });
    // await AsyncStorage.removeItem('Token');
    // await AsyncStorage.removeItem("UserToken");
    // await AsyncStorage.removeItem("Customer");
    // await AsyncStorage.clear();

    store.dispatch({type:'CustomSpinner:HIDE'}); // hide spinner if its active

    // Actions.reset("signIn");
    RootNavigation.navigate('signIn');
  } catch (error) {}
};
