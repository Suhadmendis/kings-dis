import openDatabaseService from "../../Config";

async function UpdateQuoteDiscountRateType(data) {

  
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_com_shoppingcartsku SET CartItemQuoteLineDiscountType = ? WHERE CartItemID = ?`
        ,[data.type, data.cartItemID],
        (tx, results) => {
          resolve(results.rowsAffected);  
          
        }
      );
   

    });
  });
}

export default UpdateQuoteDiscountRateType;
