import openDatabaseService from '../Config';

export default async function findNewUser() {

  const db = openDatabaseService();

  const tableName = 'local_sys_user_log';
  
  
  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'  `, [],
      function (tx, res) {
        const length = res.rows.length;
        
        if (length == 0) {
          resolve(true);  
        }else{
          resolve(false);
        }
        
      });

    });
  });
}

  

  
  