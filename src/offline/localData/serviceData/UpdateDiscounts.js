import openDatabaseService from "../../Config";

async function UpdateDiscounts(data) {

  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_ct_tradeaccount SET ItemDiscGroup1 = ?, ItemDiscGroup2 = ?, ItemDiscGroup3 = ?, ItemDiscGroup4 = ?, IsSynced = ? WHERE ItemID = ?`
        ,[data.ItemDiscGroup1, data.ItemDiscGroup2, data.ItemDiscGroup3, data.ItemDiscGroup4, data.IsSynced, data.ID],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );


    });
  });
}

export default UpdateDiscounts;
