import openDatabaseService from "../Config";

async function updateTradeAccountData(tableName, data) {
  
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
 
 


      db.transaction(tx => {
        data.map(dataset => {
          tx.executeSql(
            `UPDATE ${tableName} SET IsSynced = ? WHERE ItemID = ?`,
            ['1',dataset.data.TradeAccountID],
            (tx, results) => {
              
            }
          );
      });

      tx.executeSql(`SELECT * FROM ${tableName} where IsSynced = 0`,[],

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

export default updateTradeAccountData;