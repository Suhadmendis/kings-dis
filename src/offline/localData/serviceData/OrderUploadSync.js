

import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

const db = openDatabaseService();

async function OrderUploadSync(dataSet) {

  return new Promise((resolve, reject) => {



    const token = store.getState().login.loginToken;



    const { adminCustomerID, ordersSync } = dataSet;


    const dataset = fetchingProccess(ordersSync, adminCustomerID, token);


    resolve(dataset);






  });
}


async function fetchingProccess(data, adminCustomerID, token){

  const order = await getOrder(data);
  const orderItems = await getOrderItems(data);
  const orderAddress = await getOrderAddress(data);

  let apiObject = order;

  apiObject[0]['OrderItems'] = orderItems;
  apiObject[0]['OrderBillingAddress'] = orderAddress[0];
  apiObject[0]['OrderShippingAddress'] = orderAddress[1];

  const response = await callApi(apiObject, adminCustomerID, token);


  return response;

}


async function getOrder(dataSet) {

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_order where OrderID = ${dataSet}`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {

            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });
}


async function getOrderItems(dataSet) {

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_orderitem where OrderItemOrderID = ${dataSet}`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });
}




async function getOrderAddress(dataSet) {

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_orderaddress where AddressOrderID = ${dataSet}`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });
}




async function callApi(apiObject, adminCustomerID, token) {


  return new Promise((resolve, reject) => {

          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);
          myHeaders.append("Content-Type", "application/json");

          console.log(apiObject[0].OrderType);


          var raw = JSON.stringify({
            "Orders": [
              {
                "orderID": apiObject[0].OrderID,
                "orderShippingOptionID": apiObject[0].OrderShippingOptionID,
                "orderTotalShipping": apiObject[0].OrderTotalShipping,
                "orderTotalPrice": apiObject[0].OrderTotalPrice,
                "orderTotalTax": apiObject[0].OrderTotalTax,
                "orderDate": apiObject[0].OrderDate,
                "orderStatusID": apiObject[0].OrderStatusID,
                "orderCurrencyID": apiObject[0].OrderCurrencyID,
                "orderCustomerID": apiObject[0].OrderCustomerID,
                "orderCreatedByUserID": apiObject[0].OrderCreatedByUserID,
                "orderNote": apiObject[0].OrderNote,
                "orderSiteID": apiObject[0].OrderSiteID,
                "orderPaymentOptionID": apiObject[0].OrderPaymentOptionID,
                "orderInvoice": apiObject[0].OrderInvoice,
                "orderInvoiceNumber": apiObject[0].OrderInvoiceNumber,
                "orderTrackingNumber": apiObject[0].OrderTrackingNumber,
                "orderCustomData": apiObject[0].OrderCustomData,
                "orderPaymentResult": apiObject[0].OrderPaymentResult,
                "orderGUID": apiObject[0].OrderGUID,
                "orderLastModified": apiObject[0].OrderLastModified,
                "orderTotalPriceInMainCurrency": apiObject[0].OrderTotalPriceInMainCurrency,
                "orderIsPaid": apiObject[0].OrderIsPaid,
                "orderCulture": apiObject[0].OrderCulture,
                "orderDiscounts": apiObject[0].OrderDiscounts,
                "orderGrandTotal": apiObject[0].OrderGrandTotal,
                "orderGrandTotalInMainCurrency": apiObject[0].OrderGrandTotalInMainCurrency,
                "orderOtherPayments": apiObject[0].OrderOtherPayments,
                "orderTaxSummary": apiObject[0].OrderTaxSummary,
                "orderCouponCodes": apiObject[0].OrderCouponCodes,
                "orderPONumber": apiObject[0].OrderPONumber,
                "orderAPayment": apiObject[0].OrderAPayment,
                "orderPaymentType": apiObject[0].OrderPaymentType,
                "orderBillingAddressID": apiObject[0].OrderBillingAddressID,
                "orderShippingAddressID": apiObject[0].OrderShippingAddressID,
                "orderDataSetID": apiObject[0].OrderDataSetID,
                "orderAccountsReference": apiObject[0].OrderAccountsReference,
                "lastUpdate": apiObject[0].LastUpdate,
                "orderPartShipment": apiObject[0].OrderPartShipment,
                "orderComments": apiObject[0].OrderComments,
                "orderType": apiObject[0].OrderType,
                "orderInsertedToDim": apiObject[0].OrderInsertedToDim,
                "orderSageVendorTxCode": apiObject[0].OrderSageVendorTxCode,
                "orderReceiptInseredToDim": apiObject[0].OrderReceiptInseredToDim,
                "orderAbandonedStatus": apiObject[0].OrderAbandonedStatus,
                "orderQuoteID": apiObject[0].OrderQuoteID,
                "UnavailableItems": apiObject[0].UnavaiableItems,
                "OrderItems": apiObject[0].OrderItems,
                "OrderBillingAddress": apiObject[0].OrderBillingAddress,
                "OrderShippingAddress": apiObject[0].OrderShippingAddress,
                "OrderToEmail": apiObject[0].OrderToEmail,
                "OrderRegNumber": apiObject[0].OrderRegNumber,
                "OrderPreseason": apiObject[0].OrderPreseason,
                "IsOffline": true
              }
            ]
          });

          console.log('-----------------------------3462-----------------------------------');
          console.log(apiObject[0]);
          console.log('----------------------------------------------------------------');
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          return fetch(`${getBaseUrl()}Sync/OrderSync`, requestOptions)
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(result => {


              console.log(result);

              resolve(result[0]);


            })
            .catch(error => console.log('error', error));










  });
}




// async function OrderUploadSync(dataSet) {

//   const db = openDatabaseService();

//   return new Promise((resolve, reject) => {

//     const token = store.getState().login.loginToken;



//       const { adminCustomerID, ordersSync } = dataSet;







//           var myHeaders = new Headers();
//           myHeaders.append("Authorization", `Bearer ${token}`);
//           myHeaders.append("Content-Type", "application/json");

//           var raw = JSON.stringify({
//             "Orders": [
//               {
//                 "orderID": ordersSync,
//                 "orderShippingOptionID": 1,
//                 "orderTotalShipping": 1.6,
//                 "orderTotalPrice": 2.42,
//                 "orderTotalTax": 0,
//                 "orderDate": "2021-06-09T13:59:03.9512858",
//                 "orderStatusID": 13,
//                 "orderCurrencyID": 1,
//                 "orderCustomerID": 104904,
//                 "orderCreatedByUserID": 96528,
//                 "orderNote": "",
//                 "orderSiteID": 1,
//                 "orderPaymentOptionID": 3,
//                 "orderInvoice": "<table border=\"0\" cellpadding=\"5\" cellspacing=\"5\" width=\"700px\" align=\"center\" style=\"font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size:14px; margin-top:2%; margin-bottom:2%; box-shadow:0px 0px 5px #ccc;\">\r\n  <tbody style=\"background: #f9f9f9;\">\r\n    <tr>\r\n      <td colspan=\"2\" height=\"50px\" style=\"padding: 0px\" valign=\"bottom\">\r\n        <table width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" style=\"border-spacing: 0px;\">\r\n          <tbody>\r\n            <tr style=\"background: #000; color: #fff;\">\r\n              <td style=\"text-align: left; vertical-align: middle;\"><span style=\"font-size: 24px; margin-left:15px; font-weight:600;\">Your order</span></td>\r\n              <td style=\"text-align: right; vertical-align: middle; padding: 8px 20px\"><img alt=\"Logo\" src=\"/kings/media/images/common/kings_seeds_logo.png\" width=\"200px\"/></td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td style=\"text-align: left; padding: 8px\">\r\n        <table style=\"width: 287px; height: 23px\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; color:#019f62; font-weight:bold;\">Invoice number</td>\r\n              <td style=\"text-align: right; padding-right: 10px; padding: 8px\">156889</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n      <td style=\"text-align: left; padding: 8px\">\r\n        <table width=\"100%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; color:#019f62; font-weight:bold;\">Order date:</td>\r\n              <td style=\"text-align: right; padding: 8px\">09/06/2021 13:59:03</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td style=\"text-align: left; vertical-align: top; padding: 8px\" width=\"50%\"><span style=\"color:#019f62; font-weight:bold\">Billing Address</span><br />\r\n        <p style=\"line-height: 18px;\">Ben1x TEST22<br/>New1<br/>New1<br/>IP2 8LL<br/>United Kingdom<br/>01473 000000<br/></p>\r\n      </td>\r\n      <td style=\"text-align: left; vertical-align: top; padding: 8px\" width=\"50%\"><span style=\"color:#019f62; font-weight:bold\">Delivery Address</span><br />\r\n        <p style=\"line-height: 18px;\">Ben1x TEST22<br/>New1<br/>New1<br/>IP2 8LL<br/>United Kingdom<br/>01473 000000<br/></p>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td colspan=\"2\">\r\n        <table width=\"100%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\"><span style=\"color:#019f62; font-weight:bold\">Payment method:</span></td>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\">Secure Credit / Debit Cards Payments</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td colspan=\"2\">\r\n        <table width=\"100%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\"><span style=\"color:#019f62; font-weight:bold\">Delivery Option:</span></td>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\">Standard Delivery</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n     <tr>\r\n      <td colspan=\"2\">\r\n        <table width=\"100%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\"><span style=\"color:#019f62; font-weight:bold\">Enable Part-shipment:</span></td>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\"> Yes</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n      <tr>\r\n      <td colspan=\"2\">\r\n        <table width=\"100%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\"><span style=\"color:#019f62; font-weight:bold\">Order type:</span></td>\r\n              <td style=\"text-align: left; padding: 8px\" width=\"50%\"> &nbsp;KA</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <td colspan=\"2\" style=\"text-align: left; padding: 8px\"><table class=\"productsList\" width=\"100%\" cellspacing=\"0\" cellpadding=\"5\" style=\"text-align: right; margin-top: 20px; margin-bottom:20px;\">\n  <thead>\n    <tr>\n      <th style=\"text-align: left; padding-top: 10px; color:#019f62; vertical-align: top;\" width=\"20%\">Department</th>\n      <th style=\"text-align: center; padding: 10px 5px 10px 5px; color:#019f62;\" width=\"15%\">Product Part #</th>\n      <th style=\"text-align: left; padding: 10px 5px 10px 5px; color:#019f62; vertical-align: top;\" width=\"30%\">Item</th>\n      <th style=\"text-align: right; padding-top: 10px; color:#019f62;\" width=\"12%\">Price (Inc. VAT)</th>\n      <th style=\"text-align: center; padding-top: 10px; color:#019f62; vertical-align: top;\" width=\"11%\">Qty</th>\n      \n        <th style=\"text-align: center; padding-top: 10px; color:#019f62; vertical-align: top;\">Unit Discount</th>\n      \n      <th style=\"text-align: right; padding-top: 10px; color:#019f62;\" width=\"12%\">Total (Inc. VAT)</th>\n    </tr>\n  </thead>\n  <tbody><tr>\n  <td style=\"text-align: left; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px;\n    line-height: 30px;\">\n      Seeds\n  </td>\n  <td style=\"text-align: center; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px;\n    line-height: 30px;\">\n    10101\n  </td>\n  <td style=\"text-align: left; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px;\n    line-height: 30px;\">\n    Artichoke  Green Globe<p class='__cart-prod-desc'>Dark green heads of a good size, the attractive foliage makes it suitable for the flower border. Crowns benefit from protection during the winter.&...</p>\n  </td>  \n  <td style=\"text-align: right; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px;\n    line-height: 30px;\">\n    £1.65\n  </td>\n  <td style=\"text-align: center; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px;\n    line-height: 30px;\">\n    1\n  </td>\n  \n  \n  <td style='text-align: center; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px;line-height: 30px;'>£0.83</td>\n  \n  \n  <td style=\"text-align: right; vertical-align: top;border-bottom:1px #e0e0e0 solid;font-family: 'Montserrat',Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 13px;color: #212121; height: 25px; \n    line-height: 30px;\">\n    £0.82\n  </td>\n</tr>\n</tbody>\n</table>\r\n        <hr size=\"1\" style=\"border-top: 1px dashed #e8e8e8;\" />\r\n        <table cellpadding=\"5\" style=\"float: right;\" width=\"60%\">\r\n          <tbody>\r\n            <tr>\r\n                <td style=\"text-align:right\">Other Savings:</td>\r\n                <td style=\"text-align: right; padding-right: 5px\">£0.00</td>\r\n            </tr>\r\n            <tr>\r\n              <td style=\"text-align:right\">Sub total (inc. vat):</td>\r\n              <td style=\"text-align: right; padding-right: 5px\">£0.82</td>\r\n            </tr>\r\n            <!--<tr>\r\n              <td colspan=\"2\" style=\"padding: 0; text-align: right;\"></td>\r\n            </tr>-->            \r\n            <tr>\r\n              <td style=\"text-align:right\">Delivery (inc. vat):</td>\r\n              <td style=\"text-align: right; padding-right: 5px\">£1.60</td>\r\n            </tr>            \r\n            <!--<tr>\r\n              <td colspan=\"2\" style=\"padding: 0; text-align: right;\"></td>\r\n            </tr>-->\r\n            <tr>\r\n              <td style=\"text-align:right\"><span style=\"color: #019f62; font-weight:bold\">TOTAL (inc. vat):</span></td>\r\n              <td style=\"text-align: right; padding-right: 5px; color: #019f62; font-weight:bold\">£2.42</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n      <tr>\r\n      <td colspan=\"2\">\r\n        <table width=\"50%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 8px;\"><span style=\"color:#019f62; font-weight:bold\">Order &amp; Delivery Note</span></td>\r\n            </tr>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 0px 8px 5px 8px;\">\r\n                \r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n      <tr>\r\n      <td colspan=\"2\">\r\n        <table width=\"50%\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 8px;\"><span style=\"color:#019f62; font-weight:bold\">Comments/Additional Instructions</span></td>\r\n            </tr>\r\n            <tr>\r\n              <td style=\"text-align: left; padding: 0px 8px 5px 8px;\">              \r\n                \r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table>",
//                 "orderInvoiceNumber": "156889",
//                 "orderTrackingNumber": null,
//                 "orderCustomData": "",
//                 "orderPaymentResult": null,
//                 "orderGUID": "42bfa1c9-3aec-4baf-9b0d-6e50ca98edac",
//                 "orderLastModified": "2021-06-16T08:00:10.2468386",
//                 "orderTotalPriceInMainCurrency": 2.42,
//                 "orderIsPaid": null,
//                 "orderCulture": "en-GB",
//                 "orderDiscounts": "<Summary />",
//                 "orderGrandTotal": 2.42,
//                 "orderGrandTotalInMainCurrency": 2.42,
//                 "orderOtherPayments": "<Summary />",
//                 "orderTaxSummary": "<Summary />",
//                 "orderCouponCodes": "<CouponCodes />",
//                 "orderPONumber": null,
//                 "orderAPayment": null,
//                 "orderPaymentType": null,
//                 "orderBillingAddressID": null,
//                 "orderShippingAddressID": null,
//                 "orderDataSetID": null,
//                 "orderAccountsReference": null,
//                 "lastUpdate": null,
//                 "orderPartShipment": true,
//                 "orderComments": "",
//                 "orderType": null,
//                 "orderInsertedToDim": null,
//                 "orderSageVendorTxCode": null,
//                 "orderReceiptInseredToDim": null,
//                 "orderAbandonedStatus": "7",
//                 "OrderItems": [
//                   {
//                     "orderItemID": 1102483,
//                     "orderItemOrderID": 156889,
//                     "orderItemSKUID": 11025,
//                     "orderItemSKUName": "Artichoke  Green Globe",
//                     "orderItemUnitPrice": 0.82,
//                     "orderItemUnitCount": 1,
//                     "orderItemCustomData": "<CustomData><CartItemDiscountRate>0.0000</CartItemDiscountRate><CartItemPrice>0.8200</CartItemPrice><CartItemUnitDiscount>0.0000</CartItemUnitDiscount><CartItemUnitListPrice>1.6500</CartItemUnitListPrice><CartItemUnitPrice>1.6500</CartItemUnitPrice></CustomData>",
//                     "orderItemGuid": "f37fabb0-e199-4395-8005-c8d4c0236eae",
//                     "orderItemParentGuid": null,
//                     "orderItemLastModified": "2021-06-09T13:59:04.1075362",
//                     "orderItemValidTo": null,
//                     "orderItemBundleGUID": null,
//                     "orderItemTotalPriceInMainCurrency": 0.82,
//                     "orderItemSendNotification": null,
//                     "orderItemText": "",
//                     "orderItemProductDiscounts": "<Summary><Item><Name>KA017 - User discount</Name><Value>0.83</Value></Item></Summary>",
//                     "orderItemDiscountSummary": "<Summary />",
//                     "orderItemTotalPrice": 0.82,
//                     "orderItemUnitListPrice": 1.65,
//                     "orderItemUnitDiscount": null,
//                     "orderItemDiscountRate": 0,
//                     "orderItemDataSetID": null,
//                     "orderItemAccountsReference": null,
//                     "orderItemOrderInvoiceNumber": null,
//                     "orderItemQtyDelivered": null,
//                     "orderItemQtyInvoiced": null,
//                     "orderInvoiceNumber": "156889",
//                     "orderInsertedToDim": null,
//                     "od_OHID_DSID": null,
//                     "batchName": null
//                   }
//                 ],
//                 "OrderBillingAddress": {
//                   "AddressID": 2,
//                   "AddressLine1": "Orchard Cottage",
//                   "AddressLine2": null,
//                   "AddressCity": "Dereham",
//                   "AddressZip": "NR20 4EH",
//                   "AddressPhone": null,
//                   "AddressCountryID": 492,
//                   "AddressStateID": null,
//                   "AddressPersonalName": "Peter Walker",
//                   "AddressGUID": null,
//                   "AddressLastModified": "2019-11-22 11:01:15.1165714",
//                   "AddressOrderID": 156889,
//                   "AddressType": 1,
//                   "AddressLine3": null,
//                   "AddressLine4": null,
//                   "CustomerAddressID": null
//                 },
//                 "OrderShippingAddress": {
//                   "AddressID": 10,
//                   "AddressLine1": "328 High Street",
//                   "AddressLine2": null,
//                   "AddressCity": "Cottenham",
//                   "AddressZip": "CB24 8TX",
//                   "AddressPhone": null,
//                   "AddressCountryID": 492,
//                   "AddressStateID": null,
//                   "AddressPersonalName": "M P Jane Heath",
//                   "AddressGUID": null,
//                   "AddressLastModified": "2020-02-02 13:28:57.7720545",
//                   "AddressOrderID": 156889,
//                   "AddressType": 2,
//                   "AddressLine3": null,
//                   "AddressLine4": null,
//                   "CustomerAddressID": null
//                 }
//               }
//             ]
//           });

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//           };

//           return fetch(`${getBaseUrl()}Sync/OrderSync`, requestOptions)
//             .then(response => response.text())
//             .then(response => JSON.parse(response))
//             .then(result => {


//               resolve(result[0]);


//             })
//             .catch(error => console.log('error', error));










//   });
// }


export default OrderUploadSync;