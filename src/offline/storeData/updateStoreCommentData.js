import openDatabaseService from "../Config";

async function updateStoreCommentData(tableName, data) {
  
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
 
 


      db.transaction(tx => {
        data.map(dataset => {
          tx.executeSql(
            `UPDATE ${tableName} SET ReadyToSync = ? WHERE ItemID = ?`,
            ['0',data.itemID],
            (tx, results) => {
              
            }
          );
      });

      tx.executeSql(`SELECT * FROM ${tableName} where ReadyToSync = 1`,[],

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

export default updateStoreCommentData;