import {RawQuery} from "./DataHelper";
import {IsCustomerB2B} from "./UserHelper";
import openDatabaseService from "../Config";

export async function getValidPaymentOptions(oSelectedShippingOption, sAccCode, bPaymentOptionAllowIfNoShipping = false) {
  let data = {
    paymentOptions: []
  };

  if (oSelectedShippingOption != null || bPaymentOptionAllowIfNoShipping) {
    let sWhere = `PaymentOptionEnabled=1 AND (PaymentOptionSiteID=1 OR PaymentOptionSiteID IS NULL)`;

    if (oSelectedShippingOption == null) {
      sWhere += ` AND PaymentOptionAllowIfNoShipping=1`;
    } else if (oSelectedShippingOption.itemPriceLabel === "TBC") {
      let isCreditAccount = IsCustomerB2B(sAccCode);
      if (isCreditAccount) {
        sWhere += ` AND PaymentOptionName='onaccount'`;
      } else {
        sWhere += ` AND PaymentOptionName='invoicepayment'`;
      }
    } else {
      let isCreditAccount = IsCustomerB2B(sAccCode);
      if (isCreditAccount) {
        sWhere += ` AND (PaymentOptionName='onaccount' OR PaymentOptionName='sagepay')`;
      } else {
        sWhere += ` AND (PaymentOptionName='invoicepayment' OR PaymentOptionName='sagepay')`;
      }
    }

    let paymentOptionRes = await RawQuery(`SELECT * FROM local_com_paymentoption WHERE ${sWhere}`);
    if (paymentOptionRes != "") {
      for (let i = 0; i < paymentOptionRes.length; i++) {
        data.paymentOptions.push(paymentOptionRes.item(i));
      }
    }
  }

  return data;
}

export function GetPaymentOptionByName(sName) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_paymentoption WHERE PaymentOptionName='${sName}' LIMIT 1`, [],
          function (tx, res) {
            if (res.rows.length > 0) {
              let data = res.rows.item(0);
              resolve(data);
            } else {
              reject("Payment option not found!");
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
