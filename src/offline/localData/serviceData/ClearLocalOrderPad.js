
   
import openDatabaseService from '../../Config';


async function DeleteLocalOrderPad(data) {
  
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_orderpad`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });
}


export default DeleteLocalOrderPad;