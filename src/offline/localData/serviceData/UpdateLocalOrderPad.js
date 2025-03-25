

import openDatabaseService from '../../Config';


async function UpdateLocalOrderPad(data) {


  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_orderpad SET qty = ?, lineTotal = ? WHERE uniqId = ?`,
        [data.qty,data.lineTotal,data.id],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );
    });
  });
}

export default UpdateLocalOrderPad;
