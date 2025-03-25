
   
import openDatabaseService from '../../Config';


async function GetOrdersLocal(data) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      // tx.executeSql(`SELECT * FROM local_com_order where OrderCustomerID = ${data.adminCustomerID}`,[],
      tx.executeSql(`SELECT * FROM local_sys_user_log`,[],

        function (tx, res) {

          let data = [];
          
          for (let index = 0; index < res.rows.length; index++) {
            
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });
}


export default GetOrdersLocal;