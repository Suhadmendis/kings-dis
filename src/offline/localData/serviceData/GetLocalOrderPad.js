

import openDatabaseService from '../../Config';
import {RawQuery} from '../../Services/DataHelper';
import {GetBoolean, GetInteger} from '../../../utils/ValidationHelper';


async function GetLocalOrderPad(data) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {


    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_orderpad`,[],

        async function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            let availability;
            let availableItems;
            let sku = await RawQuery(`SELECT SKUEnabled, SKUAvailableItems FROM local_com_sku WHERE SKUID = ${res.rows.item(index).id}`);
            if (sku != "") {
              availability = GetBoolean(sku.item(0).SKUEnabled) && GetInteger(sku.item(0).SKUAvailableItems) > 0;
              availableItems = GetInteger(sku.item(0).SKUAvailableItems);
            } else {
              availability = false;
              availableItems = 0;
            }

            let qty = res.rows.item(index).qty;

            data.push({
              id: res.rows.item(index).id,
              uniqId: res.rows.item(index).uniqId,
              title: res.rows.item(index).title,
              des: res.rows.item(index).des,
              code: res.rows.item(index).code,
              packSize: JSON.parse(res.rows.item(index).packSize),
              priceOptions: JSON.parse(res.rows.item(index).priceOptions),
              qty: qty.toString(),
              unitPrice: res.rows.item(index).unitPrice,
              lineTotal: res.rows.item(index).lineTotal,
              availability: availability,
              availableItems: availableItems
            });

          }
          resolve(data);
        })
    });


  });
}


export default GetLocalOrderPad;
