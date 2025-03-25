

import openDatabaseService from '../../Config';
import {GetInteger} from "../../../utils/ValidationHelper";
import {GetProductPriceRange, GetProductPriceOptions} from "../../Services/ProductHelper";
import GetProductImages, { getProductImages } from '../../../url/API'
import {store} from '../../../../configureStore';
import _ from "lodash";

import { GetLoggedInAccountCode } from "../../Services/UserHelper";

import { CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination, CProc_WEB_GetAlsoBoughtProducts } from "./SP";
const db = openDatabaseService();

import GetNavInfoBySKUID from './../offlineData/GetNavInfoBySKUID'

async function GetProduct(skuid) {

  

  return new Promise((resolve, reject) => {

    
    const dataset = fetchingProccess(skuid);

    resolve(dataset);
    
  });
}

async function fetchingProccess(skuid){

  let product = await getProduct(skuid);

  var nav_data = await GetNavInfoBySKUID(skuid);

  var nav_navigation = nav_data[0].Nav_Navigation;
  var Nav_SKUID = nav_data[0].Nav_SKUID;

  
   const priceOptionsProduct = await GetProductPriceOptions(product[0].SKUNumber);

    var relatedProducts = await CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination(
        GetLoggedInAccountCode(),
        6,
        1,
        "local_com_sku.SKUEnabled = 1 AND Nav_Navigation || '/' LIKE '"+ nav_navigation +"/%' AND local_com_sku.SKUID != "+Nav_SKUID+"",
        "local_com_sku.SKUName",
        0
    );

    var POB_products = await CProc_WEB_GetAlsoBoughtProducts(skuid);


    // console.log(nav_data.Nav_ItemData3);
    // console.log(nav_data.Nav_ItemData2);
    // console.log(nav_data.Nav_ItemData1);
    // console.log(nav_data.Nav_ItemData4);
    // let harvest_ = '';
    // if(nav_data.Nav_ItemData3 !== null){
    //   harvest_ = nav_data.Nav_ItemData3
    // }
    // let notes_ = '';
    // if(nav_data.Nav_ItemData4 !== null){
    //   notes_ = nav_data.Nav_ItemData4
    // }
    // let plant_ = '';
    // if(nav_data.Nav_ItemData3 !== null){
    //   plant_ = nav_data.Nav_ItemData3
    // }
    // let sow_ = '';
    // if(nav_data.Nav_ItemData1 !== null){
    //   sow_ = nav_data.Nav_ItemData1
    // }

    let prop_data = {
      harvest: nav_data[0].Nav_ItemData3 == null ? ('') : nav_data[0].Nav_ItemData3,
      notes: nav_data[0].Nav_ItemData4 == null ? ('') : nav_data[0].Nav_ItemData4,
      plant: nav_data[0].Nav_ItemData2 == null ? ('') : nav_data[0].Nav_ItemData2,
      sow: nav_data[0].Nav_ItemData1 == null ? ('') : nav_data[0].Nav_ItemData1,
    };
 

    product[0].priceOptions = priceOptionsProduct;
    product[0].relatedProducts = relatedProducts;
    product[0].alsoBoughtProducts = POB_products;
    product[0].propagationData = prop_data;


    return product;
}



async function getProduct(skuid) {

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_sku WHERE SKUID=${skuid}`,[],

        async function (tx, res) {
          let data = [];
          

          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });
}



// async function getProductPriceOptions(SKUNumber) {


//   console.log('======product==============================');
//   console.log(product);
//   console.log('====================================');
//   // return new Promise((resolve, reject) => {
    
//   //   db.transaction(tx => {
//   //     tx.executeSql(`SELECT * FROM local_com_sku WHERE SKUID=${skuid}`,[],

//   //       async function (tx, res) {
//   //         let data = [];
          

//   //         for (let index = 0; index < res.rows.length; index++) {
//   //           data.push(res.rows.item(index));
//   //         }
//   //         resolve(data);
//   //       })
//   //   });
//   // });
// }



export default GetProduct;
