

import openDatabaseService from '../../Config';


async function QrProductOrderPad(data) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {


    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_sku where SKUBarCode = ${data}`,[],

        function (tx, res) {

          if (res.rows.length > 0) {
            // for (let index = 0; index < res.rows.length; index++) {

              resolve({status: 1, data: res.rows.item(0).SKUNumber });

            // }
          }else{
            resolve({status: 0 });
          }


        })
    });


  });
}


export default QrProductOrderPad;
