import openDatabaseService from "../../Config";

async function AddLocalAppointments(data) {
  const db = openDatabaseService();
console.log('====data================================');
console.log(data);
console.log('====================================');
  return new Promise((resolve, reject) => {
    console.log('uypdated----------------');
    db.transaction((tx) => {
      tx.executeSql(

        
       "INSERT INTO local_ct_userappointments (ItemID, Email, Subject, ItemCreatedBy, Location, StartDate, EndDate, Note, ReadyToSync) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          data.maxID,data.email,data.subject,data.userInfo,data.location,data.startDate,data.endDate,data.note, data.ReadyToSync
        ],
        (tx, results) => {
          // console.log('====================================');
          // console.log('fdsfdsfsdfsdfsd');
          // console.log(results.rowsAffected);
          // console.log('====================================');
          resolve(results.rowsAffected);
        }, function (tx, error) {
          // console.log('====================================');
          // console.log(error);
          // console.log(tx);
          // console.log('====================================');
        }
      );
    });
  });
}

export default AddLocalAppointments;

