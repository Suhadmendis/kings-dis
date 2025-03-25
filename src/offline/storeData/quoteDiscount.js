import openDatabaseService from '../Config';
import getDateTime from './../getGeneratedData/dateTime';

  

async function submitedQuoteDiscount(operation, flags) {
  
  
  const db = openDatabaseService();
  
  const tableName = 'local_temp_discount';

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      

      if (operation == 'create') {

        tx.executeSql(`CREATE TABLE IF NOT EXISTS 
        ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          quote_id INTEGER,
          lineDiscount DECIMAL(19,4),
          lineDiscountRate DECIMAL(19,4),
          quotedPrice DECIMAL(19,4),
          quotedUnitPrice DECIMAL(19,4),
          status DECIMAL(19,4)
        )`,[],
        function (tx, res) {
          resolve([{ submited_log: 'Table Created' }]);
        })

      }

 

    });
  });
}

export default submitedQuoteDiscount;

