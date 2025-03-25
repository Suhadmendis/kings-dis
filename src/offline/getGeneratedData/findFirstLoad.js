import openDatabaseService from '../Config';
import getDateTime from './dateTime';

export default async function findFirstLoad() {

  const db = openDatabaseService();

  let datetime = getDateTime();
//   console.log(datetime);
  const tableName = 'local_sys_user_log';

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${tableName} order by id desc limit 1`, [],
      function (tx, res) {
        let user_last_date = res.rows['_array'][0].date_time;
        
        // formating to 2021-11-12
        user_last_date = user_last_date.substring(0, 10);
        datetime = datetime.substring(0, 10);

        // if this two dates are different, it means this is not the first load up in this day
        if (datetime != user_last_date) {
          resolve(true);  
        }else{
          resolve(false);
        }
        
      });

    });
  });
}

  

  
  