import openDatabaseService from '../Config';
import getDateTime from './../getGeneratedData/dateTime';

  

async function submited(operation, flags) {
  
  
  const db = openDatabaseService();
  
  const tableName = 'local_sys_user_log';

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      

      if (operation == 'create') {

        tx.executeSql(`CREATE TABLE IF NOT EXISTS 
        ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT,
          user_name TEXT,
          main_operation TEXT,
          sub_operation TEXT,
          date_time TEXT,
          status TEXT,
          year TEXT,
          month TEXT,
          day TEXT
        )`,[],
        function (tx, res) {
          resolve([{ submited_log: 'Table Created' }]);
        })

      }

      
      if (operation == 'add') {

        const datetime = getDateTime();

        tx.executeSql(`insert into ${tableName} 
        (
          user_id,
          user_name,
          main_operation,
          sub_operation,
          date_time,
          status,
          year,
          month,
          day
        ) values (?,?,?,?,?,?,?,?,?)`, ['1', '1', flags.main_operation, flags.sub_operation, datetime, flags.status, '1', '1', '1'],
        function (tx, res) {
          resolve([{ submited_log: res }]);
        });
      }

      if (operation == 'read') {
        tx.executeSql(`SELECT * FROM ${tableName} `, [],
        function (tx, res) {
          resolve([{ submited_log: res }]);
        });
      }


      if (operation == 'delete') {
        tx.executeSql(`DELETE FROM ${tableName}`,[],
          (tx, res) => {
            resolve([{ submited_log: res }]);
          }
        );
      }

    });
  });
}

export default submited;

