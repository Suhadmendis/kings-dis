import { GetLoggedInAccountCode, GetWorkingAsCustomer, GetWorkingAsCustomerID } from "./UserHelper";
import { GetAdminCustomerFromAccount, GetTradeAccountInfo } from "./TradeAccountInfoProvider";
import { GetDecimal, GetInteger } from "../../utils/ValidationHelper";
import { GetAddressInfo } from "./AddressInfoProvider";
import { RawQuery } from "./DataHelper";
import { store } from "../../../configureStore";
import openDatabaseService from '../Config';
import { CProc_INT_GetPrice_V2 } from "../localData/serviceData/SPv2";

const db = openDatabaseService();

export async function GetProductLinePricing_V2(items, disableStdDiscount = 1, overrideDiscount = null, discountObject = [], bWithTax = false) {
  let dOut = {};

  let accCode = GetLoggedInAccountCode();

  let oPriceRows = await GetCustomPriceRow_V2(items, accCode, disableStdDiscount, overrideDiscount, discountObject);
  if (oPriceRows != null) {
    for (let rowKey in oPriceRows) {
      let oPriceRow = oPriceRows[rowKey];

      if (dOut[rowKey] == undefined) {
        dOut[rowKey] = {
          LinePrice: 0,
          LineTax: 0,
          UnitPrice: 0,
          UnitTax: 0,
          QuotePrice: 0,
          QuoteTax: 0
        };
      }

      dOut[rowKey].LinePrice = (bWithTax) ? GetDecimal(oPriceRow["LinePriceNetOfDiscountIncTax"]) : GetDecimal(oPriceRow["LinePriceNetOfDiscount"]);
      dOut[rowKey].LineTax = GetDecimal(oPriceRow["LineTaxValue"]);
      dOut[rowKey].UnitPrice = (bWithTax) ? GetDecimal(oPriceRow["UnitPriceNetOfDiscountIncTax"]) : GetDecimal(oPriceRow["UnitPriceNetOfDiscount"]);
      dOut[rowKey].UnitTax = GetDecimal(oPriceRow["UnitTaxValue"]);
      dOut[rowKey].QuotePrice = (bWithTax) ? GetDecimal(oPriceRow["QuotePriceIncTax"]) : GetDecimal(oPriceRow["QuotePrice"]);
      dOut[rowKey].QuoteTax = GetDecimal(oPriceRow["QuoteTaxValue"]);
    }
  }

  return dOut;
}

export async function GetCustomPriceRow_V2(items, sTradeAccCode = "", disableStdDiscount = 1, overrideDiscount = null, discountObject = []) {
  let oPriceRows = null;
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

    let oDs = null;

    try {

      oDs = await CProc_INT_GetPrice_V2(
        items,
        sAccountCode,
        nDataSetId,
        1,
        (nAddCountryID == 0) ? 492 : nAddCountryID,
        disableStdDiscount,
        overrideDiscount,
        discountObject
      );
    } catch (e) {
      console.log(e);
    }

    if (oDs != null) {
      oPriceRows = oDs;
    }

  } catch (e) {
    console.log(e);
  }

  return oPriceRows;
}
