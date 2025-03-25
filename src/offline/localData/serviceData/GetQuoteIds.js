
   
import openDatabaseService from '../../Config';


async function GetQuoteIds() {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT ItemShoppingCartID FROM local_ct_quotes order by ItemModifiedWhen desc`,[],

        function (tx, res) {

          
          let data = [];
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index).ItemShoppingCartID);
          }

          resolve(data);
          
          
        })

    });
  });
}


export default GetQuoteIds;