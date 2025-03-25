import openDatabaseService from "../../Config";

async function UpdateDiscounts(data) {
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {

      const { appOrderID, webOrderID, error, orderItems, orderBillingAddress, orderShippingAddress, orderType } = data.orderResult;



      tx.executeSql(
        `UPDATE local_com_order SET WebOrderID = ? WHERE OrderID = ?`
        ,[ webOrderID, appOrderID],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );




    });
  });
}

export default UpdateDiscounts;
