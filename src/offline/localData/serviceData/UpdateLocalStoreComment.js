
   
import openDatabaseService from '../../Config';



async function UpdateLocalStoreComment(data) {
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_ct_storecomments SET ItemModifiedWhen = ?, ItemTitle = ?, ItemComment = ?, ReadyToSync = 1, IsDeleted = 0 WHERE itemID = ?`,
        [data.date,data.title,data.note,data.id],
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
   

    });
  });
}

export default UpdateLocalStoreComment;

