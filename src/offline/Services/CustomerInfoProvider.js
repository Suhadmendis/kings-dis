import openDatabaseService from "../Config";

export function GetCustomerInfo(nCustomerId) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_customer WHERE CustomerID=${nCustomerId} LIMIT 1`, [],
          function (tx, res) {
            if (res.rows.length > 0) {
              let data = res.rows.item(0);
              resolve(data);
            } else {
              reject("Customer not found!");
            }
          }, function (tx, error) {
            sOut = 'ExecuteSql ERROR: ' + error.message;
            console.log(sOut);
            reject(sOut);
          })
    }, error => {
      sOut = 'Transaction ERROR: ' + error.message;
      console.log(sOut);
      reject(sOut);
    });
  });
}
