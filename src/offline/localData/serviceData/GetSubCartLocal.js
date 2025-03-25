

import openDatabaseService from '../../Config';

const db = openDatabaseService();

async function GetSubCartLocal(data) {


  return new Promise((resolve, reject) => {

    db.transaction(tx => {

      tx.executeSql(`SELECT * FROM local_com_shoppingcartsku join local_com_sku on local_com_shoppingcartsku.SKUID = local_com_sku.SKUID WHERE local_com_shoppingcartsku.ShoppingCartID = ${data}`,[],
        async function (tx, res) {

          let data = [];
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }

          resolve(data);
      });

    });
  });
}





export default GetSubCartLocal;