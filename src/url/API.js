import URL from "./baseUrl";
import { store } from '../../configureStore';
import { userLogOut } from "../actions/HomeScreenAction";
import { showMessage } from "react-native-flash-message";
import {GetWorkingAsCustomerID, GetAdminCustomerEmail} from "../offline/Services/UserHelper";
import { initialTableInspection } from "../offline/localData/serviceData/SP";



export function callAPI(sURL, oData, oCustomHeaders = {}, bAutoLogout = true) {
  return new Promise((resolve, reject) => {
    let headers = {
      ...oCustomHeaders,
      Preseason: store.getState().checkout.preSeasonToggle == 1 ? 1 : 0,
      Authorization: 'Bearer ' + store.getState().login.loginToken
    };

    URL.post(sURL, oData, {
      //method: 'POST',
      headers: headers,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
        let status = error?.response?.status;
        if (bAutoLogout && status === 401) {
          // showMessage({
          //   message: 'KINGS SEEDS',
          //   description: 'Token expired. Please login again.',
          //   type: 'info',
          //   autoHide: true,
          // });
          // userLogOut();
          store.dispatch({ type: "logout:true" });
        } else {
          reject(error.message);
        }
      });
  });
}

export function getCategories(nOffset = 0, nPageSize = 0, bIncludeSubcategories = false) { //TODO this is used by a deprecated component. remove when the component is removed.
  return callAPI('products/categories', {
    offset: nOffset,
    pagesize: nPageSize,
    incSubcat: bIncludeSubcategories
  });
}

export async function getSubcategories(sCategory, nLevel, bIncSubcat, nOffset = 0, nPageSize = 0, token) {

  let inspect = await initialTableInspection(token);

  return callAPI('products/categories', {
    category: sCategory.trim(),
    NavLevel: nLevel,
    incSubcat: bIncSubcat,
    offset: nOffset,
    pagesize: nPageSize
  });
}

export function getFilters(sNodeAliasPath, aFilters = [], sSortBy = 'SKUName', nCurrentPage = 1, nPageSize = 0, oLastFilterClicked = {}, aFiltersFromURL = []) {
  return callAPI('GetFilters', {
    NodeAliasPath: sNodeAliasPath,
    CurrentPage: nCurrentPage,
    PageSize: nPageSize,
    LastFilterClicked: oLastFilterClicked,
    Filters: aFilters,
    FiltersFromURL: aFiltersFromURL,
    SortBy: sSortBy
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

export function getFilterData(sNodeAliasPath, aFilters = [], sSortBy = 'SKUName', nCurrentPage = 1, nPageSize = 0, oLastFilterClicked = {}, aFiltersFromURL = []) {
  return callAPI('GetFilterData', {
    NodeAliasPath: sNodeAliasPath,
    CurrentPage: nCurrentPage,
    PageSize: nPageSize,
    LastFilterClicked: oLastFilterClicked,
    Filters: aFilters,
    FiltersFromURL: aFiltersFromURL,
    SortBy: sSortBy
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

export function getProductDetails(nSkuId) {
  return callAPI('products/GetProductDetails', {
    NodeSKUID: nSkuId
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

export function addAddress(data) {
  return callAPI('Address/AddEditCustomerAddress', {
    AddressLine1: data.AddressLine1,
    AddressLine2: data.AddressLine2,
    AddressLine3: data.AddressLine3,
    AddressCity: data.AddressCity,
    AddressPersonalName: data.AddressPersonalName,
    AddressCountryID: data.AddressCountryID,
    AddressZip: data.AddressZip,
    AddressLine4: data.AddressLine4,
    AddressPhone: data.AddressPhone,
    IsDefaultBilling: data.IsDefaultBilling,
    IsDefaultShipping: data.IsDefaultShipping,
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

export function getAddresses(data) {
  return callAPI('Address/GetCustomerAddresses', {
    offset: data.offset,
    pagesize: data.pagesize,
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

export function createOrder(data) {
  console.log({
    Orders: [
      {
        OrderID: data.OrderID,
        OrderShippingOptionID: data.OrderShippingOptionID,
        OrderTotalShipping: data.OrderTotalShipping,
        OrderTotalPrice: data.OrderTotalPrice,
        OrderTotalTax: data.OrderTotalTax,
        OrderDate: data.OrderDate,
        OrderStatusID: data.OrderStatusID,
        OrderCurrencyID: data.OrderCurrencyID,
        OrderCustomerID: data.OrderCustomerID,
        OrderCreatedByUserID: data.OrderCreatedByUserID,
        OrderNote: data.OrderNote,
        OrderSiteID: data.OrderSiteID,
        OrderPaymentOptionID: data.OrderPaymentOptionID,
        OrderInvoice: data.OrderInvoice,
        OrderInvoiceNumber: data.OrderInvoiceNumber,
        OrderTrackingNumber: data.OrderTrackingNumber,
        OrderLastModified: data.OrderLastModified,
        OrderTotalPriceInMainCurrency: data.OrderTotalPriceInMainCurrency,
        OrderIsPaid: data.OrderIsPaid,
        OrderCulture: data.OrderCulture,
        OrderDiscounts: data.OrderDiscounts,
        OrderGrandTotal: data.OrderGrandTotal,
        OrderGrandTotalInMainCurrency: data.OrderGrandTotalInMainCurrency,
        OrderOtherPayments: data.OrderOtherPayments,
        OrderTaxSummary: data.OrderTaxSummary,
        OrderCouponCodes: data.OrderCouponCodes,
        OrderPONumber: data.OrderPONumber,
        OrderAPayment: data.OrderAPayment,
        OrderPaymentType: data.OrderPaymentType,
        OrderDataSetID: data.OrderDataSetID,
        OrderAccountsReference: data.OrderAccountsReference,
        LastUpdate: data.LastUpdate,
        OrderPartShipment: data.OrderPartShipment,
        OrderComments: data.OrderComments,
        OrderType: data.OrderType,
        OrderInsertedToDim: data.OrderInsertedToDim,
        OrderSageVendorTxCode: data.OrderSageVendorTxCode,
        OrderReceiptInseredToDim: data.OrderReceiptInseredToDim,
        OrderAbandonedStatus: data.OrderAbandonedStatus,
        OrderQuoteID: data.OrderQuoteID,
        OrderItems: data.OrderItems,
        OrderBillingAddress: data.OrderBillingAddress,
        OrderShippingAddress: data.OrderShippingAddress,
        CustomerShippingAddress: data.CustomerShippingAddress,
        ToEmail: data.ToEmail,
        OrderRegNumber:data.OrderRegNumber,
        UnavailableItems: data.UnavailableItems,
        OrderPreseason: data.OrderPreseason,
        IsOffline: false
      }
    ]
  });
  return callAPI('sync/OrderSync', {
    Orders: [
      {
        OrderID: data.OrderID,
        OrderShippingOptionID: data.OrderShippingOptionID,
        OrderTotalShipping: data.OrderTotalShipping,
        OrderTotalPrice: data.OrderTotalPrice,
        OrderTotalTax: data.OrderTotalTax,
        OrderDate: data.OrderDate,
        OrderStatusID: data.OrderStatusID,
        OrderCurrencyID: data.OrderCurrencyID,
        OrderCustomerID: data.OrderCustomerID,
        OrderCreatedByUserID: data.OrderCreatedByUserID,
        OrderNote: data.OrderNote,
        OrderSiteID: data.OrderSiteID,
        OrderPaymentOptionID: data.OrderPaymentOptionID,
        OrderInvoice: data.OrderInvoice,
        OrderInvoiceNumber: data.OrderInvoiceNumber,
        OrderTrackingNumber: data.OrderTrackingNumber,
        OrderLastModified: data.OrderLastModified,
        OrderTotalPriceInMainCurrency: data.OrderTotalPriceInMainCurrency,
        OrderIsPaid: data.OrderIsPaid,
        OrderCulture: data.OrderCulture,
        OrderDiscounts: data.OrderDiscounts,
        OrderGrandTotal: data.OrderGrandTotal,
        OrderGrandTotalInMainCurrency: data.OrderGrandTotalInMainCurrency,
        OrderOtherPayments: data.OrderOtherPayments,
        OrderTaxSummary: data.OrderTaxSummary,
        OrderCouponCodes: data.OrderCouponCodes,
        OrderPONumber: data.OrderPONumber,
        OrderAPayment: data.OrderAPayment,
        OrderPaymentType: data.OrderPaymentType,
        OrderDataSetID: data.OrderDataSetID,
        OrderAccountsReference: data.OrderAccountsReference,
        LastUpdate: data.LastUpdate,
        OrderPartShipment: data.OrderPartShipment,
        OrderComments: data.OrderComments,
        OrderType: data.OrderType,
        OrderInsertedToDim: data.OrderInsertedToDim,
        OrderSageVendorTxCode: data.OrderSageVendorTxCode,
        OrderReceiptInseredToDim: data.OrderReceiptInseredToDim,
        OrderAbandonedStatus: data.OrderAbandonedStatus,
        OrderQuoteID: data.OrderQuoteID,
        OrderItems: data.OrderItems,
        OrderBillingAddress: data.OrderBillingAddress,
        OrderShippingAddress: data.OrderShippingAddress,
        CustomerShippingAddress: data.CustomerShippingAddress,
        ToEmail: data.ToEmail,
        OrderRegNumber:data.OrderRegNumber,
        UnavailableItems: data.UnavailableItems,
        OrderPreseason: data.OrderPreseason,
        IsOffline: false
      }
    ]
  });
}

export function updateOrderStatus(data) {
  return callAPI('sync/OrderSync', {
    Orders: [
      {
        WebOrderID: data.WebOrderID,
        OrderStatusName: data.OrderStatusName,
      }
    ]
  });
}


//bar code
export function getQrCodeApi(searchTerm) {
  return callAPI('GetSearchAutoCompleteData', {
    SearchTerm: searchTerm,
    IsBarcode: true,
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

//get stores in find store
export function getSearchStoresDetails(text, currentPage, pagesize, cusId) {
  return callAPI('Account/GetTradeAccountsStoreAddresses', {
    CurrentPage: currentPage,
    PageSize: pagesize,
    SearchTerm: text,
  }, { WorkingAsCustomerID: GetWorkingAsCustomerID() });
}

export function getQuickOrderProductCodes() {
  return callAPI('Order/GetQuickOrderProductCodes', {}, {WorkingAsCustomerID: GetWorkingAsCustomerID()});
}

export function getQuickOrderAutoCompleteData(sSearchTerm, bIsBarcode) {
  return callAPI('Order/GetQuickOrderAutoCompleteData', {
    SearchTerm: sSearchTerm,
    IsBarcode: bIsBarcode
  }, {WorkingAsCustomerID: GetWorkingAsCustomerID()});
}

export function getQuickOrderProductLineTotal(nSKUQTY, sSKUNumber, sPriceLine) {
  return callAPI('Order/GetQuickOrderProductLineTotal', {
    SKUQTY: nSKUQTY,
    SKUNumber: sSKUNumber,
    PriceLine: sPriceLine
  }, {WorkingAsCustomerID: GetWorkingAsCustomerID()});
}

export function getPictorialItems(preSeasonToggle = 0) {
  return callAPI('products/PictorialProducts', {
    offset: '0',
    pagesize: '0'
  }, {WorkingAsCustomerID: GetWorkingAsCustomerID(), Preseason: preSeasonToggle});
}

//get product images
export function getProductImages(SKUIDArray=[]) {
  return callAPI('products/GetProductImages', SKUIDArray);
}

// export function sendAppointmentEmail(obj) {
//   return callAPI('Notification/SendEmail', {
//     subject: obj.subject,
//     toEmail: obj.email,
//     fromEmail: GetAdminCustomerEmail(),
//     location: obj.location,
//     startDate: obj.startDate,
//     endDate: obj.endDate,
//     note: obj.note
//   });
// }

//download store images
export function downloadImagesApi(accCode, addressID) {
  return callAPI('Sync/GetImages', {
    AccCode:accCode,
    AddressID:addressID
  });
}
export function getReportData(report, offset, pagesize, fromDate,toDate,repUserID) {
  return callAPI('GetReportData', {
    Report: report,
    Offset: offset,
    PageSize: pagesize,
    FromDate: fromDate,
    ToDate: toDate,
    RepUserID: repUserID,
  });
}


export function getReportListResource(RepUserID) {

  return callAPI('GetReportsList', {
    RepUserID
  });
}

//store comments
export function addStoreComments(obj) {


  console.log('=====');
  console.log({
    TradeAccountID: obj.itemCode,
    Title: obj.NoteTitle,
    Comment: obj.Note,
    isDeleted: obj.isDeleted
  });
  console.log('=====');
  return callAPI('Account/AddEditStoreComment', {
    TradeAccountID: obj.itemCode,
    Title: obj.NoteTitle,
    Comment: obj.Note,
    isDeleted: obj.isDeleted
  });
}

export function editStoreComments(obj) {
  return callAPI('Account/AddEditStoreComment', {
    TradeAccountID: obj.itemCode,
    Title: obj.title,
    Comment: obj.note,
    StoreCommentID: obj.id,
    isDeleted: obj.isDeleted
  });
}

export function deleteStoreComments(obj) {
  return callAPI('Account/DeleteStoreComment', {
    StoreCommentID: obj,
  });
}

