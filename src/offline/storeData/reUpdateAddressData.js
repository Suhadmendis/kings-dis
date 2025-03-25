import openDatabaseService from '../Config';


async function reUpdateAddressData(addressResponse) {
  
  const db = openDatabaseService();
  

  return new Promise((resolve, reject) => {
    db.transaction(tx => {

      let check = [];
      
      addressResponse.map((element) => {
        tx.executeSql(
          `UPDATE local_com_address SET AddressID = ?, WebAddressID = ?, ReadyToSync = ? WHERE AddressID = ?`
          ,[element.webAddressID, element.webAddressID, 0, element.appAddressID],
          (tx, results) => {
            check.push(results.rowsAffected);
          }
        );
      });
      
      tx.executeSql(`SELECT * FROM local_com_address where ReadyToSync = 1`,[],

        async function (tx, res) {
          
          resolve({ inserted: check, ReadyToSyncCount: res.rows.length });
        })

      
   

    });
  });
}

export default reUpdateAddressData;

