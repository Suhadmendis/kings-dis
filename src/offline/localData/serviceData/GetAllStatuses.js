
   
import openDatabaseService from '../../Config';


async function GetAllStatuses(data) {
  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`Select local_ct_quotestatus.ItemName from local_ct_quotes
      join local_ct_quotestatususer
      on  local_ct_quotes.ItemID = local_ct_quotestatususer.ItemQuoteID
      join local_ct_quotestatus
      on local_ct_quotestatususer.itemQuoteStatusID = local_ct_quotestatus.ItemID
      where local_ct_quotes.ItemShoppingCartID = ${data}`,[],

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


export default GetAllStatuses;