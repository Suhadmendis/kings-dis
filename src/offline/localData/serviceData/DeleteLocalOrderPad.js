
   
import openDatabaseService from '../../Config';


async function DeleteLocalOrderPad({id}) {
  
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_orderpad where uniqId = ${id}`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });
}


export default DeleteLocalOrderPad;