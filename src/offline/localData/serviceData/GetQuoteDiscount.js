
   
import openDatabaseService from '../../Config';

const db = openDatabaseService();

async function GetQuoteDiscount(data) {
  

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      
      tx.executeSql(`SELECT * FROM local_com_shoppingcartsku WHERE CartItemID = ${data.id}`,[],
      // tx.executeSql(`SELECT * FROM local_com_shoppingcart`,[],
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





export default GetQuoteDiscount;