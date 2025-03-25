
   
import openDatabaseService from '../../Config';


async function DeleteAddress({id}) {
  
console.log('=======data.id}=============================');
console.log(id);
console.log('====================================');
  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_com_address where AddressID = '${id}'`,[],

        function (tx, res) {
          console.log('====================================');
          console.log(res.rowsAffected);
          console.log('====================================');
          resolve(res.rowsAffected);
        }, function (tx, error){
          console.log('====================================');
          console.log(tx);
          console.log(error);
          console.log('====================================');
        })
    });
  });
}


export default DeleteAddress;