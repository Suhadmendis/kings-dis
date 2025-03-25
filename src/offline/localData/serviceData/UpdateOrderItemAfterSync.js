import openDatabaseService from "../../Config";

async function UpdateOrderItemAfterSync(data) {
  console.log(data);
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE local_com_orderitem SET OrderItemOrderID = ?, WebOrderItemID = ? WHERE OrderItemID = ?`
          ,[data.webOrderID, data.webOrderItmId, data.orderItmId],
          (tx, results) => {
            resolve(results.rowsAffected);  
          }
        );
     
  
        
  
      });

    

  
  });
}

export default UpdateOrderItemAfterSync;
