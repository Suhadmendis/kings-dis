import openDatabaseService from "../Config";
import {RawQuery} from "./DataHelper";
import {updateOrderStatus} from "../../url/API";

export async function updateOrderStatuses(sStatusName, nAppOrderID = 0, nWebOrderID = 0) {
  if (nAppOrderID > 0) {
    let orderStatus = await getStatusByName(sStatusName);
    await RawQuery(`UPDATE local_com_order
          SET OrderStatusID = ${orderStatus.StatusID}
          WHERE OrderID = ${nAppOrderID}`);
  }
  if (nWebOrderID > 0) {
    await updateOrderStatus({WebOrderID: nWebOrderID, OrderStatusName: sStatusName});
  }
}

export function getStatusByName(sName) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_orderstatus WHERE StatusName='${sName}' LIMIT 1`, [],
          function (tx, res) {
            if (res.rows.length > 0) {
              let data = {
                StatusID: res.rows.item(0).StatusID,
                StatusName: res.rows.item(0).StatusName,
                StatusDisplayName: res.rows.item(0).StatusDisplayName
              };
              resolve(data);
            } else {
              reject("Status not found!");
            }
          }, function (tx, error) {
            sOut = 'ExecuteSql ERROR: ' + error.message;
            console.log(sOut);
            reject(sOut);
          })
    }, error => {
      sOut = 'Transaction ERROR: ' + error.message;
      console.log(sOut);
      reject(sOut);
    });
  });
}

export function createOrderLocal(data) {
  return new Promise((resolve, reject) => {
    let sOut = "";

    let query = `INSERT INTO local_com_order (
                        OrderShippingOptionID,
                        OrderTotalShipping,
                        OrderTotalPrice,
                        OrderTotalTax,
                        OrderDate,
                        OrderStatusID,
                        OrderCurrencyID,
                        OrderCustomerID,
                        OrderCreatedByUserID,
                        OrderNote,
                        OrderSiteID,
                        OrderPaymentOptionID,
                        OrderInvoice,
                        OrderInvoiceNumber,
                        OrderTrackingNumber,
                        OrderLastModified,
                        OrderTotalPriceInMainCurrency,
                        OrderIsPaid,
                        OrderCulture,
                        OrderDiscounts,
                        OrderGrandTotal,
                        OrderGrandTotalInMainCurrency,
                        OrderOtherPayments,
                        OrderTaxSummary,
                        OrderCouponCodes,
                        OrderPONumber,
                        OrderAPayment,
                        OrderPaymentType,
                        OrderDataSetID,
                        OrderAccountsReference,
                        LastUpdate,
                        OrderPartShipment,
                        OrderComments,
                        OrderType,
                        OrderInsertedToDim,
                        OrderSageVendorTxCode,
                        OrderReceiptInseredToDim,
                        OrderAbandonedStatus,
                        OrderQuoteID,
                        OrderToEmail,
                        OrderRegNumber,
                        UnavaiableItems,
                        OrderPreseason
                        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(query, [
            data.OrderShippingOptionID,
            data.OrderTotalShipping,
            data.OrderTotalPrice,
            data.OrderTotalTax,
            data.OrderDate,
            data.OrderStatusID,
            data.OrderCurrencyID,
            data.OrderCustomerID,
            data.OrderCreatedByUserID,
            data.OrderNote,
            data.OrderSiteID,
            data.OrderPaymentOptionID,
            data.OrderInvoice,
            data.OrderInvoiceNumber,
            data.OrderTrackingNumber,
            data.OrderLastModified,
            data.OrderTotalPriceInMainCurrency,
            data.OrderIsPaid,
            data.OrderCulture,
            data.OrderDiscounts,
            data.OrderGrandTotal,
            data.OrderGrandTotalInMainCurrency,
            data.OrderOtherPayments,
            data.OrderTaxSummary,
            data.OrderCouponCodes,
            data.OrderPONumber,
            data.OrderAPayment,
            data.OrderPaymentType,
            data.OrderDataSetID,
            data.OrderAccountsReference,
            data.LastUpdate,
            data.OrderPartShipment,
            data.OrderComments,
            data.OrderType,
            data.OrderInsertedToDim,
            data.OrderSageVendorTxCode,
            data.OrderReceiptInseredToDim,
            data.OrderAbandonedStatus,
            data.OrderQuoteID,
            data.OrderToEmail,
            data.OrderRegNumber,
            data.UnavailableItems,
            data.OrderPreseason
          ],
          function (tx, res) {
            sOut = res.insertId;
            resolve(sOut);
          }, function (tx, error) {
            sOut = 'ExecuteSql ERROR: ' + error.message;
            console.log(sOut);
            reject(sOut);
          })
    }, error => {
      sOut = 'Transaction ERROR: ' + error.message;
      console.log(sOut);
      reject(sOut);
    });
  });
}

export function createLocalOrderAddress(data) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    let query = `INSERT INTO local_com_orderaddress (
          AddressLine1,
          AddressLine2,
          AddressCity,
          AddressZip,
          AddressPhone,
          AddressCountryID,
          AddressStateID,
          AddressPersonalName,
          AddressGUID,
          AddressLastModified,
          AddressOrderID,
          AddressType,
          AddressLine3,
          AddressLine4,
          CustomerAddressID,
          LocalCustomerAddressID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(query, [
            data.AddressLine1,
            data.AddressLine2,
            data.AddressCity,
            data.AddressZip,
            data.AddressPhone,
            data.AddressCountryID,
            data.AddressStateID,
            data.AddressPersonalName,
            data.AddressGUID,
            data.AddressLastModified,
            data.AddressOrderID,
            data.AddressType,
            data.AddressLine3,
            data.AddressLine4,
            data.CustomerAddressID,
            data.LocalCustomerAddressID,
          ],
          function (tx, res) {
            sOut = res.insertId;
            resolve(sOut);
          }, function (tx, error) {
            sOut = 'ExecuteSql ERROR: ' + error.message;
            console.log(sOut);
            reject(sOut);
          })
    }, error => {
      sOut = 'Transaction ERROR: ' + error.message;
      console.log(sOut);
      reject(sOut);
    });
  });
}

export function createLocalOrderItem(data) {
  return new Promise((resolve, reject) => {
    let sOut = "";

    let query = `INSERT INTO local_com_orderitem (
                        OrderItemOrderID,
                        OrderItemSKUID,
                        OrderItemSKUName,
                        OrderItemUnitPrice,
                        OrderItemUnitCount,
                        OrderItemCustomData,
                        OrderItemGuid,
                        OrderItemParentGuid,
                        OrderItemLastModified,
                        OrderItemValidTo,
                        OrderItemBundleGUID,
                        OrderItemTotalPriceInMainCurrency,
                        OrderItemSendNotification,
                        OrderItemText,
                        OrderItemProductDiscounts,
                        OrderItemDiscountSummary,
                        OrderItemTotalPrice,
                        OrderItemUnitListPrice,
                        OrderItemUnitDiscount,
                        OrderItemDiscountRate,
                        OrderItemDataSetID,
                        OrderItemAccountsReference,
                        OrderItemOrderInvoiceNumber,
                        OrderItemQtyDelivered,
                        OrderItemQtyInvoiced,
                        OrderInvoiceNumber,
                        OrderInsertedToDim,
                        od_OHID_DSID,
                        BatchName,
                        OrderItemPriceLine,
                        orderItemNote,
                        orderItemBackCard
                        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(query, [
            data.orderItemOrderID,
            data.orderItemSKUID,
            data.orderItemSKUName,
            data.orderItemUnitPrice,
            data.orderItemUnitCount,
            data.orderItemCustomData,
            data.orderItemGuid,
            data.orderItemParentGuid,
            data.orderItemLastModified,
            data.orderItemValidTo,
            data.orderItemBundleGUID,
            data.orderItemTotalPriceInMainCurrency,
            data.orderItemSendNotification,
            data.orderItemText,
            data.orderItemProductDiscounts,
            data.orderItemDiscountSummary,
            data.orderItemTotalPrice,
            data.orderItemUnitListPrice,
            data.orderItemUnitDiscount,
            data.orderItemDiscountRate,
            data.orderItemDataSetID,
            data.orderItemAccountsReference,
            data.orderItemOrderInvoiceNumber,
            data.orderItemQtyDelivered,
            data.orderItemQtyInvoiced,
            data.orderInvoiceNumber,
            data.orderInsertedToDim,
            data.od_OHID_DSID,
            data.batchName,
            data.orderItemPriceLine,
            data.orderItemNote,
            data.orderItemBackCard
          ],
          function (tx, res) {
            sOut = res.insertId;
            resolve(sOut);
          }, function (tx, error) {
            sOut = 'ExecuteSql ERROR: ' + error.message;
            console.log(sOut);
            reject(sOut);
          })
    }, error => {
      sOut = 'Transaction ERROR: ' + error.message;
      console.log(sOut);
      reject(sOut);
    });
  });
}
