

import openDatabaseService from '../../Config';


async function UpdatePackSizeLocalOrderPad(data) {


  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_orderpad SET packSize = ?, lineTotal = ? WHERE uniqId = ?`,
        [JSON.stringify(data.packSize),data.lineTotal,data.id],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );
    });
  });
}

export default UpdatePackSizeLocalOrderPad;
