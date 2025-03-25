
   
import openDatabaseService from '../../Config';


async function GetPictorialPackSize(id) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT SKUPictorialPackSize, SkuDiscountCat FROM local_com_sku where SKUID = ${id}`,[],

        function (tx, res) {
          let data = [];
      
          for (let index = 0; index < res.rows.length; index++) {

            data.push(res.rows.item(index).SkuDiscountCat);              
            data.push(res.rows.item(index).SKUPictorialPackSize);              

          }
          resolve(data);
        })
    });
  });
}



export default GetPictorialPackSize;