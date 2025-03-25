import openDatabaseService from '../Config';


async function inspectTable(tableName) {
  
  const db = openDatabaseService();
  

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM sqlite_master WHERE name ='${tableName}' and type='table'`,[],
        function (tx, res) {
          resolve([{ tableName: tableName, inspected: res.rows.length }]);
        })
    });
  });
}

export default inspectTable;

