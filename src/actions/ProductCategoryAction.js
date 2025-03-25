import {store} from '../../configureStore';
import {getSubcategories as getSubcategoriesAPI} from "../url/API";
import {GetCatalogNavigation} from "../offline/localData/serviceData/GetCatalogNavigation";
import DataAdapter from "../offline/localData/DataAdapter";
import {getFilterData} from "../url/API";
import {getProductsListDataOffline} from "../offline/Services/ProductHelper";

export const getSubcategories = async (sCategory, nLevel, bIncSubcat, nOffset = 0, nPageSize = 0) => {
 
  let state = store.getState();
  let internetConnectivity = state.loading?.connectionStatus;
  let token = state.login.loginToken;

  if (internetConnectivity == true) {
    //get data from the API if has internet
    console.log("onlie 0000000000000000000000000000000000000000000000000");
    return await getSubcategoriesAPI(sCategory, nLevel, bIncSubcat, nOffset, nPageSize, token);
  } else {
    //get data from database if no internet
    console.log("offline 1.0");
    return await GetCatalogNavigation(sCategory, nLevel, bIncSubcat, nOffset, nPageSize);
  }
}

export const GetListPageProducts = async (
  subcatNodeAliasPath,
  aFilters = [],
  sortBy,
  nOffset = 1,
  nPageSize = 100,
  internetConnectivity = true
) => {
  // let state = store.getState();
  // let internetConnectivity = state.loading?.connectionStatus;
  // let token = state.login.loginToken;


  var productDetails;
  var productList = [];
  if (internetConnectivity == true) {
    //get data from the API if has internet
    productDetails = await getFilterData(
      subcatNodeAliasPath,
      aFilters,
      sortBy,
      nOffset,
      nPageSize,
    );

   
    for (let i = 0; i < productDetails.products.length; i++) {
      const item = productDetails.products[i];
  
      let dueDate = item.skuinstorefrom.split(' ')[0];
      dueDate = dueDate.replace('/', '-');
      dueDate = dueDate.replace('/', '-');
  
      let pictorial = 'B';
  
      let res = await getPictorialPackSize(item.skuid);
  
      if (res[0] == 'A') {
        pictorial = 'A';
      }
      let obj = {
        ...item,
        pictorial: pictorial,
        dueDate: dueDate,
        count: i
      };
      productList.push(obj);
     
    }
    return productList;

  } else {
    //get data from database if no internet
    let res = await getProductsListDataOffline(
      subcatNodeAliasPath,
      [],
      sortBy,
      nOffset,
      nPageSize
    );
     
   return res;
  }

  
};


async function getPictorialPackSize(skuId) {
  const payload = {
    section: "PRODUCT DETAILS",
    opration: "GET PICTORIAL PACK SIZE",
    data: skuId,
  };


  const newpro = await DataAdapter(payload);
  return newpro;
}