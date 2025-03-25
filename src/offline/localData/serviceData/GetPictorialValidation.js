
   
import openDatabaseService from '../../Config';


async function GetPictorialValidation() {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT SKUID, SkuDiscountCat FROM local_com_sku where SkuDiscountCat = 'A'`,[],

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


export default GetPictorialValidation;