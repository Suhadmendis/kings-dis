
   
import openDatabaseService from '../../Config';


async function GetLocalContacts({id}) {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_ct_customercontacts where ItemID = ${id}`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });
}


export default GetLocalContacts;