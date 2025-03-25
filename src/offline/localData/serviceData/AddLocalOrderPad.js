
   
import openDatabaseService from '../../Config';


async function AddLocalOrderPad(data) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const uniqId = Math.floor(Math.random() * 100000000000);
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO local_orderpad (id, uniqId, title, des, code, packSize, priceOptions, qty, unitPrice, lineTotal) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [data.id, uniqId, data.title, data.des, data.code, JSON.stringify(data.packSize), JSON.stringify(data.priceOptions), data.qty, data.unitPrice, data.lineTotal],
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
    });
  });
}


export default AddLocalOrderPad;