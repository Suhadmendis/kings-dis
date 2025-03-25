import openDatabaseService from '../../Config';
import {RawQuery} from "../../Services/DataHelper";
import {executeSqlAsync} from "../../SQLiteAsync";


async function GetFullOrdersLocal(dataSet) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {

      let data = {mainObject: null, subObject: null, billingAddress: null, shippingAddress: null};
      tx.executeSql(`SELECT * FROM local_com_order where OrderID = ${dataSet.orderId}`, [],
          function (tx, res) {

            for (let index = 0; index < res.rows.length; index++) {
              data.mainObject = res.rows.item(index);
            }

            let searchById = data.mainObject.OrderID;
            if (data.mainObject.WebOrderID != null) {
              searchById = data.mainObject.WebOrderID;
            }

            tx.executeSql(`SELECT * FROM local_com_orderitem where OrderItemOrderID = ${searchById}`, [], //OrderItemID
                async function (tx, res) {

                  let preSubObject = [];
                  for (let index = 0; index < res.rows.length; index++) {
                    let orderItem;


                    let sku = await RawQuery(`SELECT SKUNumber,SKUPackSize,SKUEnabled,SKUAvailableItems,Nav_Navigation,SkuDiscountCat 
                    FROM local_com_sku 
                    INNER JOIN local_int_navigation 
                    ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID 
                    WHERE SKUID=${res.rows.item(index).OrderItemSKUID}`);
                    if (sku != "") {
                      orderItem = {...res.rows.item(index), ...sku.item(0)};
                    } else {
                      orderItem = {
                        ...res.rows.item(index),
                        SKUNumber: "",
                        SKUPackSize: "",
                        SKUEnabled: false,
                        SKUAvailableItems: 0,
                        Nav_Navigation: ""
                      };
                    }

                    preSubObject.push(orderItem);
                  }

                  data.subObject = preSubObject;

                  // use executeSqlAsync here
                  // because tx(transaction) is expired by now
                  // because we used async await above
                  let res1 = await executeSqlAsync(db, `SELECT * FROM local_com_orderaddress where AddressOrderID = ${dataSet.orderId}`, []);
                  for (let index = 0; index < res1.rows.length; index++) {
                    if (res1.rows.item(index).AddressType === 1) {
                      data.billingAddress = res1.rows.item(index);
                    } else if (res1.rows.item(index).AddressType === 2) {
                      data.shippingAddress = res1.rows.item(index);
                    }
                  }

                  resolve(data);

                });

          });

    });

  });
}


export default GetFullOrdersLocal;
