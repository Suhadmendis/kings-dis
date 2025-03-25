

import openDatabaseService from '../../Config';


async function GetSkuSearch(q) {




  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_sku WHERE SKUName LIKE '%${q}%' order by SKUCreated`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {

          //  const priceRange = getPriceRange(res.rows.item(index));



            data.push({
              code: res.rows.item(index).SKUNumber,
              id: res.rows.item(index).SKUID,
              title: res.rows.item(index).SKUName,
              name: res.rows.item(index).SKUName,
              count: index,
              packSize:res.rows.item(index).SKUSellOnlyAvailable,
              price:res.rows.item(index).SKUPrice
            });

          }
          resolve(data);
        })
    });
  });
}



export default GetSkuSearch;
