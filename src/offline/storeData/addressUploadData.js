import openDatabaseService from '../Config';


async function addressUploadData(tableName) {

  const db = openDatabaseService();


  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * from ${tableName} where ReadyToSync = 1`,[],
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

export default addressUploadData;

