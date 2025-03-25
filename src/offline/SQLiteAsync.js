export function executeSqlAsync(db, sqlStatement, args = []) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
          tx.executeSql(sqlStatement, args,
              function (tx, res) {
                resolve(res);
              }, function (tx, error) {
                reject(Error('ExecuteSql ERROR: ' + error.message));
              });
        },
        error => {
          reject(Error('Transaction ERROR: ' + error.message));
        });
  });
}
