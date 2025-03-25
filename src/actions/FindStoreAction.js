
import URL from "../url/baseUrl";
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

import {store} from '../../configureStore';
import {getSearchStoresDetails} from "../url/API";
import {GetTradeStoresLocal} from "../offline/localData/serviceData/GetTradeStoresLocal";

export const getStoresDetails = async (sSearchTerm='', nCurrentPage = 0, nPageSize = 0, cusId='') => {
  let state = store.getState();
  let internetConnectivity = state.loading?.connectionStatus;

  if (internetConnectivity) {
    //get data from the API if has internet
    // console.log('online========================');
    // console.log('search :'+sSearchTerm+ ' current page: '+nCurrentPage+' pagesize: '+nPageSize);
    return await getSearchStoresDetails(sSearchTerm, nCurrentPage, nPageSize, cusId);
  } else {
    //get data from database if no internet
    return await GetTradeStoresLocal(sSearchTerm, nCurrentPage, nPageSize);
  }
}


export const getItemName = (text) => async (dispatch) => {
  // console.log(text);
  dispatch({
    type: "GET_ITEM_NAME",
    payload: text,
  });
};

export const getItemCode = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ITEM_CODE",
    payload: text,
  });
};

export const getAdminAddress = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ADMIN_ADDRESS",
    payload: text,
  });
};

export const getAdminCustomerEmail = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ADMIN_CUS_EMAIL",
    payload: text,
  });
};

//adminCustomerID
export const getAdminCustomerId = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ADMIN_CUS_ID",
    payload: text,
  });
};


export const getAdminCustomerPhone = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ADMIN_CUS_PHONE",
    payload: text,
  });
};

export const getAddressId = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ADDRESS_ID",
    payload: text,
  });
};
export const getAccCode = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ACC_CODE",
    payload: text,
  });
};

export const getItemOnStop = (text) => async (dispatch) => {
  dispatch({
    type: "GET_ITEM_ON_STOP",
    payload: text,
  });
};


// import URL from "../url/baseUrl";
// import { Actions } from "react-native-router-flux";
// import { AsyncStorage } from "react-native";
// import { showMessage } from "react-native-flash-message";

// export const getItemName = (text) => async (dispatch) => {
//   console.log(text);
//   dispatch({
//     type: "GET_ITEM_NAME",
//     payload: text,
//   });
// };

// export const getItemCode = (text) => async (dispatch) => {
//   dispatch({
//     type: "GET_ITEM_CODE",
//     payload: text,
//   });
// };

// export const getAdminAddress = (text) => async (dispatch) => {
//   dispatch({
//     type: "GET_ADMIN_ADDRESS",
//     payload: text,
//   });
// };

// export const getAdminCustomerEmail = (text) => async (dispatch) => {
//   dispatch({
//     type: "GET_ADMIN_CUS_EMAIL",
//     payload: text,
//   });
// };

// //adminCustomerID
// export const getAdminCustomerId = (text) => async (dispatch) => {
//   dispatch({
//     type: "GET_ADMIN_CUS_ID",
//     payload: text,
//   });
// };


// export const getAdminCustomerPhone = (text) => async (dispatch) => {
//   dispatch({
//     type: "GET_ADMIN_CUS_PHONE",
//     payload: text,
//   });
// };

