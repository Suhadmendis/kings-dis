
   
import openDatabaseService from '../../Config';



async function UpdateLocalStoreCommentIsDeleted(data) {
  console.log(data);
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_ct_storecomments SET IsDeleted = 1, ReadyToSync = 1 WHERE itemID = ?`,
        [data],
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
   

    });
  });
}

export default UpdateLocalStoreCommentIsDeleted;