
   
import openDatabaseService from '../../Config';


async function checkDb() {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    let checked = 0;
    
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM sqlite_master where type ='table'`,[],

        
        function (tx, res) {
          let data = [];
      
          if(res.rows.length > 30){     //30
            checked = 1;
          }
          
          resolve(checked);
        })
    });
  });
}

export default checkDb;