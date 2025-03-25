import openDatabaseService from "../Config";
import {GetCustomerInfo} from "./CustomerInfoProvider";
import {GetInteger} from "../../utils/ValidationHelper";

export function IsAccountOnMainCurrency(sAccCode = "") {

}

export function GetTradeAccountInfo(sAccountCode) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    const db = openDatabaseService();
    db.transaction(tx => {
      let where = `ItemEnabled=1 AND ItemCode='${sAccountCode}' AND (ItemSiteID=1 OR ItemSiteID IS NULL)`;
      tx.executeSql(`SELECT * FROM local_ct_tradeaccount WHERE ${where} LIMIT 1`, [],
          function (tx, res) {
            if (res.rows.length > 0) {
              let data = res.rows.item(0);
              resolve(data);
            } else {
              reject("Trade account not found!");
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

export function GetAdminCustomerFromAccount(nAccountId) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    const db = openDatabaseService();
    db.transaction(tx => {
      let subquery = `SELECT ItemID FROM local_ct_tradeaccount WHERE ItemEnabled=1 AND local_ct_tradeaccount.ItemID=local_ct_tradeaccountcustomer.TradeAccID AND (ItemSiteID=1 OR ItemSiteID IS NULL) LIMIT 1`;
      let where = `TradeAccID=${nAccountId} AND ItemIsAdmin=1 AND EXISTS(${subquery})`;
      
      tx.executeSql(`SELECT CustomerID FROM local_ct_tradeaccountcustomer WHERE ${where} LIMIT 1`, [],
          async function (tx, res) {
            if (res.rows.length > 0) {
              try {
                let oCustomer = await GetCustomerInfo(GetInteger(res.rows.item(0).CustomerId));
                resolve(oCustomer);
              } catch (e) {
                reject(e);
              }
            } else {
              reject("Admin customer not found!");
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
