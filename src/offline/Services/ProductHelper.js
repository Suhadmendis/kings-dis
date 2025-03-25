import {GetLoggedInAccountCode, GetWorkingAsCustomer, GetWorkingAsCustomerID} from "./UserHelper";
import {GetAdminCustomerFromAccount, GetTradeAccountInfo} from "./TradeAccountInfoProvider";
import {GetDecimal, GetInteger} from "../../utils/ValidationHelper";
import {GetAddressInfo} from "./AddressInfoProvider";
import {RawQuery} from "./DataHelper";
import {CProc_INT_GetPrice, CProc_WEB_GetProductsForListV1_WithPrice, CProc_API_GetProductsByCategory} from "../localData/serviceData/SP";
import {store} from "../../../configureStore";
import {CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination, CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination_v2} from '../localData/serviceData/SP';
import GetPictorialPackSize from "../localData/serviceData/GetPictorialPackSize";

import openDatabaseService from '../Config';
import  { CheckQuntities, CheckQuntitiesOffline } from "../../components/CartOperation/CheckQuntities";
const db = openDatabaseService();

export async function GetCustomFormattedValue(nPrice = 0, bShowOrig = true, bShowValueInMainCurrency = true, AccCode = "") {
  return "£" + nPrice.toFixed(2); //TODO: update function with correct logic. This function must be async because we will need to access database
}

export async function GetProductPriceRange(sSkuNumber, nQty = 1) {
  let dOut = "";

  if (sSkuNumber != null && sSkuNumber != "" && nQty > 0) {
    let accCode = GetLoggedInAccountCode();
    let oPriceRow = await GetCustomPriceRow(sSkuNumber, nQty, accCode);

    if (oPriceRow != null) {
      dOut = oPriceRow["PriceRange"];
    }
  }

  return dOut;
}



export const checkQty = async (items) => {
  let ids = items.map((item) =>{
    return item.productNumber;
  })


  ids = await CheckQuntities(ids);


  ids = ids.map((element) => {
    const pro = items.filter((item) => item.productNumber == element.code);



    let balanceQty = element.availableQty - pro[0].quantity;
    if (element.availability == false) {
      return {
        ...element,
        balanceQty

      }
    }else{
      return {
        ...element,
        balanceQty,
        availability: balanceQty < 0 ? false : true
      }
    }

  })



  return ids;




}


const getItemQty = async (ids) => {
  let state = store.getState();
  const { connectionStatus } = state.loading;



  if (connectionStatus) {
    ids = await CheckQuntities(ids);

  }else{
    ids = await CheckQuntitiesOffline(ids);


  }


  return ids;
}


export const checkOrderQty = async (items) => {


  let ids = items.map((item) => item.SKUNumber )

console.log('checking order', ids);


  ids = await getItemQty(ids);




  // ids = ids.map((element) => {

  //   const pro = items.filter((item) => item.SKUNumber == element.code);



  //   let balanceQty = element.availableQty - pro[0].OrderItemUnitCount;
  //   if (element.availability == false) {
  //     return {
  //       ...element,
  //       balanceQty

  //     }
  //   }else{
  //     return {
  //       ...element,
  //       balanceQty,
  //       availability: balanceQty < 0 ? false : true
  //     }
  //   }

  // })

  console.log('CheckQuntities', ids);

  return ids;




}

export const checkCartQty = async (items) => {

  let ids = items.map((item) =>{

    return item.SKUNumber;
  })


  ids = await CheckQuntities(ids);



  ids = ids.map((element) => {

    const pro = items.filter((item) => item.SKUNumber == element.code);



    let balanceQty = element.availableQty - pro[0].SKUUnits;
    if (element.availability == false) {
      return {
        ...element,
        balanceQty

      }
    }else{
      return {
        ...element,
        balanceQty,
        availability: balanceQty < 0 ? false : true
      }
    }

  })



  return ids;




}




export async function isSKUAvailableForSale(id){


  let query = `Select SKUNumber, SKUEnabled, SKUAvailableItems from local_com_sku where SKUNumber = '${id}'`;
  const res = await RawQuery(query);

  const item = res.item(0);

  console.log('Item--------------');
  console.log(item);
  console.log('Item--------------');
  let avaiable = false;

  if (item.SKUEnabled == 1) {
    if (item.SKUAvailableItems > 0) {
      avaiable = true
    }
  }


  return avaiable;

}







export async function GetProductPriceRangeBySkuId(sSkuid) {
  let dOut = "";

  let product = await getProduct(sSkuid);


  let priceList = [];

  for (let i = 1; i <= 10; i++) {
    let objname
    if(i!=1){
       objname = "SKUPrice"+i;
    }else{
       objname = "SKUPrice";
    }

    let obj = product[0]


    if(obj[objname] != 0){
      priceList.push(obj[objname])
    }

  }

  const pict = await GetPictorialPackSize(sSkuid);

  if (priceList.length != 0) {
    if(pict[0] == 'A'){
      dOut = '£'+priceList[0].toFixed(2)
    }else{
      let firstElement = priceList[0];
      let lastElement = priceList[priceList.length - 1];

      dOut = '£'+firstElement.toFixed(2)+' - '+lastElement.toFixed(2);
    }

  }else{
    dOut = '£'+'0.00';
  }


  return dOut;
}




export async function GetProductPriceOptions(sSkuNumber, nQty = 1) {
  let dOut = "";
  if (sSkuNumber != null && sSkuNumber != "" && nQty > 0) {
    let accCode = GetLoggedInAccountCode();
    let oPriceRow = await GetCustomPriceRow(sSkuNumber, nQty, accCode);
    if (oPriceRow != null) {
      let finalResult = {};

      for (var i = 1; i <= 10; i++) {

        var obj = {};

        let price = GetDecimal(oPriceRow["Priceline" + i]);
        obj[i] = null;
        if (i == 1 || price > 0) {

          obj[i] = { label: oPriceRow["Priceline" + i + "label"], price: price, priceDisplay: await GetCustomFormattedValue(price) };
        }

        finalResult = Object.assign(finalResult, obj);

      }
      dOut = finalResult;
    }
  }

  return dOut;
}



export async function GetTaxByCustomPrice(sSkuNumber, nCustomPrice, disableStdDiscount = 1, overwriteDiscount = null) {
  let nTax = 0;

  if (sSkuNumber != null && sSkuNumber != "") {
    let oAdd = null;
    let nAddCountryID = 0;
    let nDataSetId = 0;
    let oCust = null;
    let sAccountCode = "";

    let state = store.getState();
    let authenticatedUserID = GetInteger(state.login?.accountInfo?.customerUserID ?? 0);

    try {
      let sTradeAccCode = GetLoggedInAccountCode();
      if (sTradeAccCode != null && sTradeAccCode != "") {
        sAccountCode = sTradeAccCode;
        try {
          let oAcc = await GetTradeAccountInfo(sTradeAccCode);
          oCust = await GetAdminCustomerFromAccount(oAcc.ItemID);
        } catch (e) {
          console.log(e);
        }
      } else {
        if (GetWorkingAsCustomerID() > 0) {
          try {
            oCust = await GetWorkingAsCustomer();
          } catch (e) {
            console.log(e);
          }
        }
      }

      if (oCust != null) {
        if (sAccountCode == null || sAccountCode == "") {
          sAccountCode = oCust.CustomerAccCode;
        }

        if (GetInteger(oCust.CustomerDefaultPaymentAddressID) > 0) {
          try {
            oAdd = await GetAddressInfo(GetInteger(oCust.CustomerDefaultPaymentAddressID));
          } catch (e) {
            console.log(e);
          }
        }
      }

      if (oAdd == null) {
        if (sAccountCode != null && sAccountCode != "") {
          let customerDefaultPaymentAddressIDRes = await RawQuery(`SELECT CustomerDefaultPaymentAddressID FROM local_com_customer WHERE CustomerAccCode='${sAccountCode}' AND CustomerUserID=${authenticatedUserID} AND CustomerEnabled=1 LIMIT 1`);
          if (customerDefaultPaymentAddressIDRes != "") {
            let dfltPaymentAddressId = GetInteger(customerDefaultPaymentAddressIDRes.item(0).CustomerDefaultPaymentAddressID);
            try {
              oAdd = await GetAddressInfo(dfltPaymentAddressId);
            } catch (e) {
              console.log(e);
            }
          }
        }

        if (oAdd == null) {
          let addressIDRes = await RawQuery(`SELECT AddressID FROM local_com_address WHERE AddressAccCode='${sAccountCode}' AND AddressIsBilling=1 LIMIT 1`);
          if (addressIDRes != "") {
            let dfltAddressID = GetInteger(addressIDRes.item(0).AddressID);
            try {
              oAdd = await GetAddressInfo(dfltAddressID);
            } catch (e) {
              console.log(e);
            }
          }
        }
      }

      if (oAdd != null) {
        nAddCountryID = oAdd.AddressCountryID;
      }

      nDataSetId = 1;

      let oDs = null;
      try {
        oDs = await CProc_INT_GetPrice(
          sAccountCode,
          sSkuNumber,
          1,
          nDataSetId,
          1,
          (nAddCountryID == 0) ? 492 : nAddCountryID,
          1,
          nCustomPrice,
          disableStdDiscount,
          overwriteDiscount
        );
      } catch (e) {
        console.log(e);
      }

      if (oDs != null) {
        nTax = GetDecimal(oDs[0]["LineTaxValue"]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return nTax;
}



export async function GetProductLinePricing(sSkuNumber, nPriceLine, nQty = 1, disableStdDiscount = 0, overwriteDiscount = null,bWithTax = false) {
  let dOut = {
    LinePrice: 0,
    LineTax: 0,
    UnitPrice: 0
  };


  if (sSkuNumber != null && sSkuNumber != "") {
    let accCode = GetLoggedInAccountCode();



    let oPriceRow = await GetCustomPriceRow(sSkuNumber, nQty, accCode, nPriceLine, disableStdDiscount, overwriteDiscount);



    if (oPriceRow != null) {

      dOut.LinePrice = (bWithTax) ? GetDecimal(oPriceRow["LinePriceNetOfDiscountIncTax"]) : GetDecimal(oPriceRow["LinePriceNetOfDiscount"]);
      dOut.LineTax = GetDecimal(oPriceRow["LineTaxValue"]);
      dOut.UnitPrice = (bWithTax) ? GetDecimal(oPriceRow["UnitPriceNetOfDiscountIncTax"]) : GetDecimal(oPriceRow["UnitPriceNetOfDiscount"]);

    }
  }

  return dOut;
}

export async function GetCustomPriceRow(sStockCode, nUnits, sTradeAccCode = "", nPriceLine = 0, disableStdDiscount = 0, overwriteDiscount = null) {
  let oPriceRow = null;
  let oAdd = null;
  let nAddCountryID = 0;
  let nDataSetId = 0;
  let oCust = null;
  let sAccountCode = "";


  let state = store.getState();
  let authenticatedUserID = GetInteger(state.login?.accountInfo?.customerUserID ?? 0);

  try {
    let loggedInAccountCode = GetLoggedInAccountCode();
    sTradeAccCode = (sTradeAccCode == null || sTradeAccCode == "") ? loggedInAccountCode : sTradeAccCode;







    if (sTradeAccCode != null && sTradeAccCode != "") {
      sAccountCode = sTradeAccCode;
      try {

        let oAcc = await GetTradeAccountInfo(sTradeAccCode);

        oCust = await GetAdminCustomerFromAccount(oAcc.ItemID);




      } catch (e) {
        console.log(e);
      }
    } else {
      if (GetWorkingAsCustomerID() > 0) {
        try {
          oCust = await GetWorkingAsCustomer();
        } catch (e) {
          console.log(e);
        }
      }
    }



    if (oCust != null) {
      if (sAccountCode == null || sAccountCode == "") {
        sAccountCode = oCust.CustomerAccCode;
      }

      if (GetInteger(oCust.CustomerDefaultPaymentAddressID) > 0) {
        try {
          oAdd = await GetAddressInfo(GetInteger(oCust.CustomerDefaultPaymentAddressID));
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (oAdd == null) {
      if (sAccountCode != null && sAccountCode != "") {
        let customerDefaultPaymentAddressIDRes = await RawQuery(`SELECT CustomerDefaultPaymentAddressID FROM local_com_customer WHERE CustomerAccCode='${sAccountCode}' AND CustomerUserID=${authenticatedUserID} AND CustomerEnabled=1 LIMIT 1`);
        if (customerDefaultPaymentAddressIDRes != "") {
          let dfltPaymentAddressId = GetInteger(customerDefaultPaymentAddressIDRes.item(0).CustomerDefaultPaymentAddressID);
          try {
            oAdd = await GetAddressInfo(dfltPaymentAddressId);
          } catch (e) {
            console.log(e);
          }
        }
      }

      if (oAdd == null) {
        let addressIDRes = await RawQuery(`SELECT AddressID FROM local_com_address WHERE AddressAccCode='${sAccountCode}' AND AddressIsBilling=1 LIMIT 1`);
        if (addressIDRes != "") {
          let dfltAddressID = GetInteger(addressIDRes.item(0).AddressID);
          try {
            oAdd = await GetAddressInfo(dfltAddressID);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }

    if (oAdd != null) {
      nAddCountryID = oAdd.AddressCountryID;
    }

    nDataSetId = 1;

    if (sStockCode != null && sStockCode != "" && nUnits > 0) {
      let oDs = null;

      if (nPriceLine > 0) {
        try {


          oDs = await CProc_INT_GetPrice(
              sAccountCode,
              sStockCode,
              nUnits,
              nDataSetId,
              1,
              (nAddCountryID == 0) ? 492 : nAddCountryID,
              nPriceLine,
              0,
              disableStdDiscount,
              overwriteDiscount
          );


        } catch (e) {
          console.log(e);
        }
      } else {
        try {
         // oDs = null

          oDs = await CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination_v2(
              sAccountCode,
              1,
              1,
              `local_com_sku.SKUNumber='${sStockCode}'`,
              "",
              (nAddCountryID == 0) ? 492 : nAddCountryID
          );

          console.log(oDs);
        } catch (e) {
          console.log(e);
        }
      }

      if (oDs != null) {
        oPriceRow = oDs[0];
      }
    }
  } catch (e) {
    console.log(e);
  }

  return oPriceRow;
}

export async function GetProductsDataByCategory(nCategoryLvl, sTradeAccCode = "", sCategoryPath = "", nOffset = 0, nPageSize = 0, sWhere = "", sOrderBy = "") {
  let productsRows = null;

  let sAccountCode = "";
  let oAdd = null;
  let oCust = null;
  let nAddCountryID = 0;

  let state = store.getState();
  let authenticatedUserID = GetInteger(state.login?.accountInfo?.customerUserID ?? 0);

  try {
    let loggedInAccountCode = GetLoggedInAccountCode();
    sTradeAccCode = (sTradeAccCode == null || sTradeAccCode == "") ? loggedInAccountCode : sTradeAccCode;

    if (sTradeAccCode != null && sTradeAccCode != "") {
      sAccountCode = sTradeAccCode;
      try {
        let oAcc = await GetTradeAccountInfo(sTradeAccCode);
        oCust = await GetAdminCustomerFromAccount(oAcc.ItemID);
      } catch (e) {
        console.log(e);
      }
    } else {
      if (GetWorkingAsCustomerID() > 0) {
        try {
          oCust = await GetWorkingAsCustomer();
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (oCust != null) {
      if (sAccountCode == null || sAccountCode == "") {
        sAccountCode = oCust.CustomerAccCode;
      }

      if (GetInteger(oCust.CustomerDefaultPaymentAddressID) > 0) {
        try {
          oAdd = await GetAddressInfo(GetInteger(oCust.CustomerDefaultPaymentAddressID));
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (oAdd == null) {
      if (sAccountCode != null && sAccountCode != "") {
        let customerDefaultPaymentAddressIDRes = await RawQuery(`SELECT CustomerDefaultPaymentAddressID FROM local_com_customer WHERE CustomerAccCode='${sAccountCode}' AND CustomerUserID=${authenticatedUserID} AND CustomerEnabled=1 LIMIT 1`);
        if (customerDefaultPaymentAddressIDRes != "") {
          let dfltPaymentAddressId = GetInteger(customerDefaultPaymentAddressIDRes.item(0).CustomerDefaultPaymentAddressID);
          try {
            oAdd = await GetAddressInfo(dfltPaymentAddressId);
          } catch (e) {
            console.log(e);
          }
        }
      }

      if (oAdd == null) {
        let addressIDRes = await RawQuery(`SELECT AddressID FROM local_com_address WHERE AddressAccCode='${sAccountCode}' AND AddressIsBilling=1 LIMIT 1`);
        if (addressIDRes != "") {
          let dfltAddressID = GetInteger(addressIDRes.item(0).AddressID);
          try {
            oAdd = await GetAddressInfo(dfltAddressID);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }

    if (oAdd != null) {
      nAddCountryID = oAdd.AddressCountryID;
    }

    let oDs = null;

    try {
      oDs = await CProc_API_GetProductsByCategory(
        nCategoryLvl,
        sAccountCode,
        sCategoryPath,
        nOffset,
        nPageSize,
        sWhere,
        sOrderBy,
        0,
        (nAddCountryID == 0) ? 492 : nAddCountryID
      );
    } catch (e) {
      console.log(e);
    }

    if (oDs != null) {
      productsRows = oDs;
    }
  } catch (e) {
    console.log(e);
  }

  return productsRows;
}


export async function getProductsListDataOffline(
  subcatNodeAliasPath,
      aFilters=[],
      sortBy='',
      nOffset=0,
      nPageSize=100,
){

    var pro_list = await CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination(
        GetLoggedInAccountCode(),
        100,
        0,
        "local_com_sku.SKUEnabled = 1 AND Nav_Navigation || '/' LIKE '"+ subcatNodeAliasPath +"/%' AND local_com_sku.SKUID != ''",
        "",
        0
    );
      let result = [];

      console.log(pro_list);

      for (let i = 0; i < pro_list.length; i++) {
        const itm = pro_list[i];

        let availability = true;
        if(itm.SKUAvailableItems <= 0){
          availability = false;
        }

        let obj = {
          name : itm.ItemName,
          skuid: itm.SKUID,
          code:itm.ItemCode,
          imageurl:'',
          availability: availability,
          pictorial: itm.ItemCatCode,
          skuavailableitems: itm.SKUAvailableItems,
          duedate: '',
          skuprice1extax: itm.PriceRange
        }

        result.push(obj);

      }


    return result;
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
