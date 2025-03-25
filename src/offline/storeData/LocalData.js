

import openDatabaseService from '../Config';


async function getLocalDataSet(tableName) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    // const productsLimit = 10;

    db.transaction(tx => {
      tx.executeSql(`SELECT ItemID, ItemDiscGroup1, ItemDiscGroup2, ItemDiscGroup3, ItemDiscGroup4 FROM ${tableName} where IsSynced = '0'`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            if (res.rows.item(index).ItemDiscGroup1) {
              data.push(res.rows.item(index));
            }
          }
          resolve(data);
        })
    });
  });
}


export default getLocalDataSet;