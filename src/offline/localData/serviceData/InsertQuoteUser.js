import openDatabaseService from "../../Config";
import createTableSchema from '../../storeData/createTableSchema';
import createDataSchema from '../../storeData/createDataSchema';


const db = openDatabaseService();

async function InsertQuoteUser(data) {
  
  const tableName = 'local_ct_quotestatususer';

  const tableSchema = createTableSchema(tableName);


  const dataSchema = createDataSchema(tableName, data.body);
  
  console.log(data);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(tableSchema, dataSchema,
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
    });
  });


}

export default InsertQuoteUser;
