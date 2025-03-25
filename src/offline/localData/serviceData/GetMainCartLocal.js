
   
import openDatabaseService from '../../Config';

const db = openDatabaseService();

async function GetMainCartLocal(data) {
  

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      
      tx.executeSql(`select * from local_com_shoppingcart where ShoppingCartID = ${data}`,[],
        async function (tx, res) {

          let data = [];
          for (let index = 0; index < res.rows.length; index++) {          
            data.push(res.rows.item(index));
          }

          resolve(data);
      });
      
    });
  });
}





export default GetMainCartLocal;