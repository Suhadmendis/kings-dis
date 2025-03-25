
   
import openDatabaseService from '../../Config';


async function DeleteLocalContactNote({id}) {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_int_contactnotes where id = ${id}`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });
}


export default DeleteLocalContactNote;