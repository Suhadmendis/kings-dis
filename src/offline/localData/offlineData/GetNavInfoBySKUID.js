

import openDatabaseService from '../../Config';


async function GetNavInfoBySKUID(nSKUID, nSiteID=1) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_int_navigation WHERE Nav_SKUID = ${nSKUID} AND Nav_ShopID = ${nSiteID}`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {

          //  const priceRange = getPriceRange(res.rows.item(index));
            data.push(res.rows.item(index))
          }
          resolve(data);
        })
    });
  });
}



export default GetNavInfoBySKUID;
