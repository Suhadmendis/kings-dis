import {CProc_API_GetTradeAccountsStoreAddresses} from "./SP";
import {GetBoolean} from "../../../utils/ValidationHelper";
import {checkUserRole} from "../../Services/UserHelper";
import {GetAddressDisplay} from '../../Services/AddressInfoProvider'
import {store} from "../../../../configureStore";

export async function GetTradeStoresLocal(
    sSearchTerm = '',
    nCurrentPage = 0,
    nPageSize = 0
) {
  let resData = [];

  let userRole_ = await checkUserRole("sopadmin");

  try {
    let state = store.getState();
    let userID = state.login.accountInfo.customerUserID;

    let cusid = state.findStore.adminCustomerID




    let nOffset = nPageSize > 0 && nCurrentPage > 0 ? nPageSize * (nCurrentPage - 1) : 0;

    const response1 = await CProc_API_GetTradeAccountsStoreAddresses(
        userRole_  ? 0 : userID,
        nOffset,
        nPageSize,
        sSearchTerm,
    );

    for (let i = 0; i < response1.length; i++) {
      const e = response1[i];
      let adDisplay = GetAddressDisplay(e.AddressLine1, e.AddressLine2, e.AddressLine3, e.AddressLine4, e.AddressCity, e.AddressZip, e.AddressCountry);
      let obj = {
        tradeAccountID: e.TradeAccountID,
        tradeAccountName: e.TradeAccountName,
        accCode: e.AccCode,
        accOnStop: GetBoolean(e.AccOnStop),
        adminCustomerID: e.AdminCustomerID,
        adminCustomerFirstName: e.AdminCustomerFirstName,
        adminCustomerLastName: e.AdminCustomerLastName,
        adminCustomerEmail: e.AdminCustomerEmail,
        adminCustomerPhone: e.AdminCustomerPhone,
        addressID: e.AddressID,
        addressCustomerID: e.AddressCustomerID,
        addressPersonalName: e.AddressPersonalName,
        addressDisplay: adDisplay,
        addressPhone: e.AddressPhone
      };

      resData.push(obj);
    }

  } catch (error) {
    console.log(error);
  }

  return resData;
}


export async function GetTradeStoresLocal_ByAdminCustomerId(
  sSearchTerm = '',
  nCurrentPage = 0,
  nPageSize = 0
) {
let resData = [];

let userRole_ = await checkUserRole("sopadmin");

try {
  let state = store.getState();
  let userID = state.login.accountInfo.customerUserID;

  let cusid = state.findStore.adminCustomerID


  console.log('----------------------------------/////////////////////////');
  console.log(cusid);
  console.log('----------------------------------/////////////////////////');

  let nOffset = nPageSize > 0 && nCurrentPage > 0 ? nPageSize * (nCurrentPage - 1) : 0;

  var sWhere = ` local_com_customer.CustomerID=${cusid}`;

  const response1 = await CProc_API_GetTradeAccountsStoreAddresses(
      userRole_  ? 0 : userID,
      nOffset,
      nPageSize,
      sSearchTerm,
      sWhere
  );

  for (let i = 0; i < response1.length; i++) {
    const e = response1[i];
    let adDisplay = GetAddressDisplay(e.AddressLine1, e.AddressLine2, e.AddressLine3, e.AddressLine4, e.AddressCity, e.AddressZip, e.AddressCountry);
    let obj = {
      tradeAccountID: e.TradeAccountID,
      tradeAccountName: e.TradeAccountName,
      accCode: e.AccCode,
      accOnStop: GetBoolean(e.AccOnStop),
      adminCustomerID: e.AdminCustomerID,
      adminCustomerFirstName: e.AdminCustomerFirstName,
      adminCustomerLastName: e.AdminCustomerLastName,
      adminCustomerEmail: e.AdminCustomerEmail,
      adminCustomerPhone: e.AdminCustomerPhone,
      addressID: e.AddressID,
      addressCustomerID: e.AddressCustomerID,
      addressPersonalName: e.AddressPersonalName,
      addressDisplay: adDisplay,
      addressPhone: e.AddressPhone
    };

    resData.push(obj);
  }

} catch (error) {
  console.log(error);
}

return resData;
}


