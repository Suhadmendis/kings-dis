
   
import openDatabaseService from '../../Config';


async function GetQuoteRefsAndIdsLocal(data) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_quotes where ItemCustomerID = '${data.custId}' order by ItemCreatedWhen DESC`,[],

        function (tx, res) {
          let data = [];
          
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push({ id: res.rows.item(index).ItemShoppingCartID, label: res.rows.item(index).ItemQuoteLabel });
          }
          resolve(data);
        })
    });
  });
}


export default GetQuoteRefsAndIdsLocal;