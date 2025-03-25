import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import getBaseUrl from '../url/getBaseUrl';

import {getQuickOrderAutoCompleteData, getQuickOrderProductCodes} from "../url/API";

import {CProc_WEB_GetProducts} from '../offline/localData/serviceData/SP';
import DataAdapter from "../offline/localData/DataAdapter";
import {GetProductPriceRange, GetProductPriceOptions, GetProductPriceRangeBySkuId} from "../offline/Services/ProductHelper";

export const getSelectedCodes = (array) => async (dispatch) => {

  dispatch({
    type: "GET_SEL_ITEM_CODES",
    payload: array,
  });
};

export const getItemsArray = (array) => async (dispatch) => {
  dispatch({
    type: "GET_ITEM_ARRAY",
    payload: array,
  });
};

async function getProduct(skuId) {
  const payload = {
    section: "PRODUCT DETAILS",
    opration: "GET PRODUCT",
    data: skuId,
  };

  console.log(payload);

  const newpro = await DataAdapter(payload);
  return newpro;
}



export const getOrderSearchCodes = async (tokn_) => {
  if (tokn_ != "") {
    try {
      // console.log("serach api - not -blank");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokn_}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `${getBaseUrl()}Order/GetQuickOrderProductCodes`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          var productResults = JSON.parse(result);
          let products = [];
          return productResults;
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      // setLoading(false);
    }
  }
}



export const getSearchCodes = async internet_ => {
  console.log('dsgosdghouds');
  if (internet_) {
    let result = await getQuickOrderProductCodes();
    return result;
  } else {
    let res = [];
    let res_SP = await CProc_WEB_GetProducts();
    if (res_SP != null || res_SP != undefined) {
      return res_SP;
    } else {
      res;
    }
  }
};


export const getProductDetailsBySelectedCode = async (internet_, code, isBarCode = false) => {
  if (internet_) {
    console.log('online order pad');
    let result = await getQuickOrderAutoCompleteData(code, isBarCode);
    console.log('online order pad 11 ',result);
    return result;
  } else {
    let res = [];
    let sWhere = '';
    let sTop = '';
    console.log('offline order pad');
    if(isBarCode){
      sWhere = `SKUBarCode = '${code}' AND SKUEnabled = 1 AND SKUAvailableItems > 0`;
    }else{
      sWhere = `REPLACE(SKUNumber, ' ', '') LIKE REPLACE('%' || '${code}' || '%', ' ', '') AND SKUEnabled = 1 AND SKUAvailableItems > 0`;
    }

    let res_SP = await CProc_WEB_GetProducts(sWhere, sTop);
    console.log('products');
    console.log(res_SP);
    if (res_SP != null || res_SP != undefined) {

      let product ;
      if (res_SP.length > 1)  {

        for (let index = 0; index < res_SP.length; index++) {
          const element = res_SP[index];
          if (element.label === code) {
            product = await getProduct(element.SKUID);
          }

        }
      }else{
        product = await getProduct(res_SP[0].SKUID);
      }



      // console.log('55555555555555555555555555555555555 ',code);
      let p_options = await GetProductPriceOptions(product[0].SKUNumber, '1');

      let availability_ = false;
      if(product[0].SKUAvailableItems > 0){
        availability_ = true;
      }

      let obj = {
        nodeId: 0,
        title: product[0].SKUName,
        description: "",
        score: 0.0,
        skuId: product[0].SKUID,
        code: product[0].SKUNumber,
        catCode: "",
        availability: availability_,
        price: "£4.45 - £33.38",
        itempriceineuro: "",
        priceOptions: p_options,
        hasproductoptions: false,
        hidebuybuttons: false,
        display: true,
        displaymessage: "",
        approxDueAvailability: "",
        approxDueValue: "",
        weight: 0.0,
        skuqtyonorder: 0,
        dueDate: "",
        availableItems: product[0].SKUAvailableItems
      }

      let productArray = [];
      productArray.push(obj);

      let mainObj = {
        iscustomerb2b: true,
        onmaincurrency: true,
        term:code,
        results :productArray
      }

      return mainObj;
    } else {
      return null;
    }
  }
};

