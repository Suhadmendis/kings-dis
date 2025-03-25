import React from "react";
import NewProducts from "./serviceData/NewProducts";
import GetProduct from "./serviceData/GetProduct";

import TestTable from "./serviceData/TestTable";
import checkDb from "./serviceData/checkDb";

import ProductsSearchAPI from "./serviceData/ProductsSearchAPI";

import GetCartLocal from "./serviceData/GetCartLocal";
import GetSubCartLocal from "./serviceData/GetSubCartLocal";
import GetMainCartLocal from "./serviceData/GetMainCartLocal";
import SaveCartAPI from "./serviceData/SaveCartAPI";
import SaveCartLocal from "./serviceData/SaveCartLocal";
import GetCartRefsLocal from "./serviceData/GetCartRefsLocal";
import GetCartRefsAndIdsLocal from "./serviceData/GetCartRefsAndIdsLocal";
import GetQuoteRefsAndIdsLocal from "./serviceData/GetQuoteRefsAndIdsLocal";
import DeleteCartLocal from "./serviceData/DeleteCartLocal";



import GetSyncLocal from "./serviceData/GetSyncLocal";

import GetLocalAppointments from "./serviceData/GetLocalAppointments";
import AddLocalAppointments from "./serviceData/AddLocalAppointments";

import GetOrdersLocal from "./serviceData/GetOrdersLocal";
import GetFullOrdersLocal from "./serviceData/GetFullOrdersLocal";
import OrderUploadSync from "./serviceData/OrderUploadSync";
import DeleteAddress from "./serviceData/DeleteAddress";

import UpdateOrderAfterSync from "./serviceData/UpdateOrderAfterSync";
import GetOrderStatuses from "./serviceData/GetOrderStatuses";
import UpdateOrderItemAfterSync from "./serviceData/UpdateOrderItemAfterSync";

import GetQuoteLocal from "./serviceData/GetQuoteLocal";
import GetQuoteOrderedRefs from "./serviceData/GetQuoteOrderedRefs";

import GetSubQuoteLocal from "./serviceData/GetSubQuoteLocal";
import SaveQuoteAPI from "./serviceData/SaveQuoteAPI";
import SaveQuoteLocal from "./serviceData/SaveQuoteLocal";
import GetQuoteRefsLocal from "./serviceData/GetQuoteRefsLocal";
import DeleteQuoteLocal from "./serviceData/DeleteQuoteLocal";
import QuoteActions from "./serviceData/QuoteActions";
import QuoteClone from "./serviceData/QuoteClone";
import IsQuoteOrdered from "./serviceData/IsQuoteOrdered";


import InsertQuoteUser from "./serviceData/InsertQuoteUser";
import GetQuoteStatus from "./serviceData/GetQuoteStatus";
import GetQuoteDiscount from "./serviceData/GetQuoteDiscount";
import UpdateQuoteDiscountRateType from "./serviceData/UpdateQuoteDiscountRateType";
import GetQuoteIds from "./serviceData/GetQuoteIds";
import GetAllStatuses from "./serviceData/GetAllStatuses";
import KeepDiscount from "./serviceData/KeepDiscount";


import GetApiContacts from "./serviceData/GetApiContacts";
import GetStoreApiContacts from "./serviceData/GetStoreApiContacts";

import AddressCountries from "./serviceData/AddressCountries";
import AddressStates from "./serviceData/AddressStates";
import AccNoteDetails from "./serviceData/AccNoteDetails";
import GetCustomerAddresses from '../../components/GetCustomerAddresses';


import AddNote from "./serviceData/AddNote";
import AddNoteAPI from "./serviceData/AddNoteAPI";

import GetLocalContacts from "./serviceData/GetLocalContacts";
import DeleteLocalContact from "./serviceData/DeleteLocalContact";
import AddLocalContact from "./serviceData/AddLocalContact";
import GetLocalContactNote from "./serviceData/GetLocalContactNote";
import SearchLocalContacts from "./serviceData/SearchLocalContacts";
import UpdateDiscounts from "./serviceData/UpdateDiscounts";
import UpdateLocalContact from "./serviceData/UpdateLocalContact";
import GetAddresses from "./serviceData/GetAddresses";
import GetCustomerAddressEmails from "./serviceData/GetCustomerAddressEmails";
import GetPictorialValidation from "./serviceData/GetPictorialValidation";
import AddLocalOrderPad from "./serviceData/AddLocalOrderPad";
import GetLocalOrderPad from "./serviceData/GetLocalOrderPad";
import UpdateLocalOrderPad from "./serviceData/UpdateLocalOrderPad";
import UpdatePackSizeLocalOrderPad from "./serviceData/UpdatePackSizeLocalOrderPad";
import DeleteLocalOrderPad from "./serviceData/DeleteLocalOrderPad";
import ClearLocalOrderPad from "./serviceData/ClearLocalOrderPad";
import QrProductOrderPad from "./serviceData/QrProductOrderPad";
import FindPictorial from "./serviceData/FindPictorial";
import FindPictorials from "./serviceData/FindPictorials";
import GetPictorialPackSize from "./serviceData/GetPictorialPackSize";

import GetPictorialOrderPadDataAPI from "./serviceData/GetPictorialOrderPadDataAPI";




import AddAddress from "./serviceData/AddAddress";

import DeleteLocalContactNote from "./serviceData/DeleteLocalContactNote";
import UpdateLocalContactNote from "./serviceData/UpdateLocalContactNote";
import GetPaymentsLocal from "./serviceData/GetPaymentsLocal";

import GetTradeAccounts from './offlineData/GetTradeAccounts';
import GetSkuSearch from './offlineData/GetSkuSearch';
import AddLocalStoreComments from "./serviceData/AddLocalStoreComments";
import GetAllLocalStoreComments from "./serviceData/GetAllLocalStoreComments";

import UpdateLocalStoreComment from "./serviceData/UpdateLocalStoreComment";
import UpdateLocalStoreCommentIsDeleted from "./serviceData/UpdateLocalStoreCommentIsDeleted";

import { CProc_WEB_GetProductsForSearchForAutoCompleteV1 } from "./serviceData/SP";

async function DataAdapter(payload) {
  const { section, opration, data } = payload;

  if (opration == "NEW PRODUCTS") {
    const newProducts = await NewProducts();
    return newProducts;
  }

  if (opration == "ADDRESS COUNTRIES") {
    const addressCountries = await AddressCountries();
    return addressCountries;
  }

  if (opration == "ADDRESS STATES") {
    const addressStates = await AddressStates();
    return addressStates;
  }

  if (opration == "PRODUCTS SEARCH") {
    const newProducts = await ProductsSearchAPI();
    return newProducts;
  }
  if (opration == "ACCOUNT NOTES DETAILS") {
    const accNoteDetails = await AccNoteDetails(data);
    return accNoteDetails;
  }
  if (opration == "UPDATE DISCOUNTS") {
    const updateDiscounts = await UpdateDiscounts(data);
    return updateDiscounts;
  }

  if (section == "LOCAL CONTACT NOTES") {
    if (opration == "SAVE API") {
      const addNote = await AddNoteAPI(data);
      return addNote;
    }

    if (opration == "ADD") {
      const addNote = await AddNote(data);
      return addNote;
    }

    if (opration == "GET") {
      const getNote = await GetLocalContactNote(data);
      console.log('getNote ',getNote);
      return getNote;
    }
    if (opration == "DELETE") {
      const n = await DeleteLocalContactNote(data);
      console.log(n);
      return n;
    }
    if (opration == "UPDATE") {
      const update = await UpdateLocalContactNote(data);
      return update;
    }

  }

  if (section == "API CONTACTS") {
    if (opration == "GET") {
      const newProducts = await GetApiContacts(data);
      return newProducts;
    }
    if (opration == "STORE GET") {
      const newProducts = await GetStoreApiContacts(data);
      return newProducts;
    }
  }

  if (section == "TEST") {
    if (opration == "SYNC") {
      const newProducts = await TestTable(data);
      return newProducts;
    }
  }

  if (section == "APPOINTMENTS") {
    if (opration == "GET") {
      const newProducts = await GetLocalAppointments(data);
      return newProducts;
    }

    if (opration == "ADD LOCAL") {
      const newProducts = await AddLocalAppointments(data);
      return newProducts;
    }
  }

  if (section == "SYNC") {
    if (opration == "SYNC CHECK DB") {
      const newProducts = await checkDb();
    return newProducts;
    }
  }




  if (section == "LOCAL CONTACTS") {
    if (opration == "GET") {
      const contacts = await GetLocalContacts(data);
      return contacts;
    }

    if (opration == "ADD") {
      const contacts = await AddLocalContact(data);
      return contacts;
    }

    if (opration == "UPDATE") {
      const contacts = await UpdateLocalContact(data);
      return contacts;
    }

    if (opration == "DELETE") {
      const contacts = await DeleteLocalContact(data);
      return contacts;
    }

    if (opration == "SEARCH") {
      const contacts = await SearchLocalContacts(data);
      return contacts;
    }
  }


  if (section == "PRODUCT DETAILS") {
    if (opration == "GET PICTORIAL PACK SIZE") {
      const contacts = await GetPictorialPackSize(data);
      return contacts;
    }

    if (opration == "GET PRODUCT") {
      const newProducts = await GetProduct(data);
      return newProducts;
    }


  }

  if (section == "ORDER PAD") {

    if (opration == "ADD") {
      const order = await AddLocalOrderPad(data);
      return order;
    }

    if (opration == "GET") {
      const contacts = await GetLocalOrderPad();
      return contacts;
    }

    if (opration == "QR PRODUCT FETCH") {
      const contacts = await QrProductOrderPad(data);
      return contacts;
    }

    if (opration == "FIND PICTORIAL") {
      const contacts = await FindPictorial(data);
      return contacts;
    }
    if (opration == "FIND PICTORIALS") {
      console.log(data);
      const contacts = await FindPictorials(data);
      return contacts;
    }

    if (opration == "UPDATE QTY") {
      const contacts = await UpdateLocalOrderPad(data);
      return contacts;
    }

    if (opration == "UPDATE PACK SIZE") {
      const contacts = await UpdatePackSizeLocalOrderPad(data);
      return contacts;
    }

    if (opration == "DELETE") {
      const contacts = await DeleteLocalOrderPad(data);
      return contacts;
    }
    if (opration == "CLEAR") {
      const contacts = await ClearLocalOrderPad(data);
      return contacts;
    }

    // if (opration == "DELETE") {
    //   const contacts = await DeleteLocalContact(data);
    //   return contacts;
    // }

    // if (opration == "SEARCH") {
    //   const contacts = await SearchLocalContacts(data);
    //   return contacts;
    // }
  }

  if (section == "CART") {
    if (opration == "GET REFS") {
      const contacts = await GetCartRefsLocal();
      return contacts;
    }

    if (opration == "GET REFS AND IDS") {
      const contacts = await GetCartRefsAndIdsLocal();
      return contacts;
    }

    if (opration == "GET") {
      const contacts = await GetCartLocal(data);
      return contacts;
    }

    if (opration == "SAVE API") {
      const cart = await SaveCartAPI(data);
      return cart;
    }

    if (opration == "SAVE LOCAL") {
      const cart = await SaveCartLocal(data);
      return cart;
    }

    if (opration == "DELETE LOCAL") {
      const cart = await DeleteCartLocal(data);
      return cart;
    }

    if (opration == "PICTORIAL VALIDATION") {
      const cart = await GetPictorialValidation(data);
      return cart;
    }

    if (opration == "GET SUB CARTS") {
      const contacts = await GetSubCartLocal(data);
      return contacts;
    }

    if (opration == "GET MAIN CART") {
      const contacts = await GetMainCartLocal(data);
      return contacts;
    }
  }

  if (section == "QUOTE") {
    if (opration == "GET REFS") {
      const contacts = await GetQuoteRefsLocal(data);
      return contacts;
    }

    if (opration == "GET IDS") {
      const contacts = await GetQuoteIds();
      return contacts;
    }

    if (opration == "GET REFS AND IDS") {
      const contacts = await GetQuoteRefsAndIdsLocal(data);
      return contacts;
    }

    if (opration == "GET ALL STATUSES") {
      const contacts = await GetAllStatuses(data);
      return contacts;
    }

    if (opration == "GET") {
      const contacts = await GetQuoteLocal(data);
      return contacts;
    }

    if (opration == "GET QUOTE ORDERED REFS") {
      const contacts = await GetQuoteOrderedRefs();
      return contacts;
    }

    if (opration == "GET SUB QUOTES") {
      const contacts = await GetSubQuoteLocal(data);
      return contacts;
    }

    if (opration == "SAVE API") {
      const res = await SaveQuoteAPI(data);
      return res;
    }

    if (opration == "QUOTE CLONE") {
      const cart = await QuoteClone(data);
      return cart;
    }

    if (opration == "SAVE LOCAL") {
      const cart = await SaveQuoteLocal(data);
      return cart;
    }

    if (opration == "DELETE LOCAL") {
      const cart = await DeleteQuoteLocal(data);
      return cart;
    }

    if (opration == "QUOTE ACTIONS") {
      const cart = await QuoteActions(data);
      return cart;
    }

    if (opration == "INSERT QUOTE USER") {
      const cart = await InsertQuoteUser(data);
      return cart;
    }

    if (opration == "GET QUOTE STATUS") {
      const cart = await GetQuoteStatus(data);
      return cart;
    }

    if (opration == "GET QUOTE DISCOUNT") {
      const cart = await GetQuoteDiscount(data);
      return cart;
    }

    if (opration == "UPATE QUOTE DISCOUNT RATE TYPE") {
      const cart = await UpdateQuoteDiscountRateType(data);
      return cart;
    }

    if (opration == "KEEP DISCOUNT") {
      const cart = await KeepDiscount(data);
      return cart;
    }

    if (opration == "IS QUOTE ORDERED") {
      const cart = await IsQuoteOrdered(data);
      return cart;
    }

  }

  if (section == "ORDERS") {
    if (opration == "GET") {
      const contacts = await GetOrdersLocal(data);
      return contacts;
    }

    if (opration == "GET FULL ORDER") {
      const contacts = await GetFullOrdersLocal(data);
      return contacts;
    }


    if (opration == "SYNC UPLOAD") {
      const contacts = await OrderUploadSync(data);
      return contacts;
    }

    if (opration == "UPDATE ORDER AFTER UPLOAD") {
      const updateDiscounts = await UpdateOrderAfterSync(data);
      return updateDiscounts;
    }

    if (opration == "GET ORDER STATUSES") {
      const newProducts = await GetOrderStatuses(data);
      return newProducts;
    }

    if (opration == "UPDATE ORDER ITEM AFTER UPLOAD") {
      const updateDiscounts = await UpdateOrderItemAfterSync(data);
      return updateDiscounts;
    }

  }

  if (section == "PAYMENTS") {
    if (opration == "GET") {
      return await GetPaymentsLocal(data);
    }
  }

  if (section == "SYNC") {
    if (opration == "GET LAST UPDATES") {
      const contacts = await GetSyncLocal(data);
      return contacts;
    }


  }

  if (section == "ADDRESS") {
    if (opration == "GET") {
      return await GetAddresses(data);
    }

    if (opration == "GET CUSTOMER ADDRESSES") {
      return await GetCustomerAddresses(data);
    }

    if (opration == "ADD") {
      return await AddAddress(data);
    }

    if (opration == "DELETE ADDRESS") {
      return await DeleteAddress(data);
    }



    if (opration == "GET CUSTOMER ADDRESS EMAILS") {
      return await GetCustomerAddressEmails(data);
    }


  }

  if (section == "LOCAL TRADE ACCOUNT") {

    if (opration == "GET") {
      console.log('step 2-------------------------');
      const tradeaccounts = await GetTradeAccounts();
      console.log(tradeaccounts);
      return tradeaccounts;
    }

  }



  if (section == "SKU SEARCH") {
    if(opration == "GET"){
      const skuSearch = await GetSkuSearch(data);

      //const skuSearch = await CProc_WEB_GetProductsForSearchForAutoCompleteV1(data);
      return skuSearch;
    }
  }


  if (section == "PICTORIAL ORDER PAD") {
    if(opration == "GET"){
      const skuSearch = await GetPictorialOrderPadDataAPI(data);

      //const skuSearch = await CProc_WEB_GetProductsForSearchForAutoCompleteV1(data);
      return skuSearch;
    }
  }


  if (section == "LOCAL STORE COMMENTS") {
    if (opration == "ADD") {
      const addNote = await AddLocalStoreComments(data);
      return addNote;
    }

    if (opration == "GET ALL") {
      const cmnts = await GetAllLocalStoreComments(data);
      return cmnts;
    }

    if (opration == "UPDATE") {
      const cmnts = await UpdateLocalStoreComment(data);
      return cmnts;
    }

    if (opration == "DELETE") {
      const cmnts = await UpdateLocalStoreCommentIsDeleted(data);
      return cmnts;
    }




  }
}

export default DataAdapter;
