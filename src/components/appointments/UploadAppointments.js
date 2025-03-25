import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();

async function UploadAppointments() {

  

  return new Promise((resolve, reject) => {

    const appointments = startProcess();
    resolve(appointments);
  });
}



async function startProcess(){

  const appointments = await getAppointments()
  // const appointmentsRes = 

  if (appointments.length > 0) {
    let appointmentsRes = [];
    for (let index = 0; index < appointments.length; index++) {
      appointmentsRes.push(await sendAppointments(appointments[index]))
      
      
    }
    
    console.log('====================================');
      console.log(appointmentsRes);
      console.log('====================================');
      const deleteLocal = await deleteAppointments(appointments, appointmentsRes);
      
      for (let index = 0; index < deleteLocal.length; index++) {
        await deleteLocalAppointments(deleteLocal[index]);
        
      }
      return 'ok';
  }

  return 'ok';

}


async function getAppointments(){

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_userappointments where ReadyToSync = '1'`,[],

        function (tx, res) {
          let data = [];
      
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });

}
  


async function sendAppointments(appointment){

  const token = store.getState().login.loginToken;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");



  let res = [];

  
    
    var raw = JSON.stringify({
      //"UserAppointmentID": 2,
      "Email": appointment.Email,
      "Subject": appointment.Subject,
      "Location": appointment.Location,
      "StartDate": new Date(appointment.StartDate),
      "EndDate": new Date(appointment.EndDate),
      "Note": appointment.Note,
      "TradeAccountID": 24
    });



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };




    return fetch(`${getBaseUrl()}Account/AddEditUserAppointment`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {
      
      return response.userAppointment;
      
    })
    .catch(error => console.log(error));

  


  

 
}

async function deleteAppointments(oldAppointments, newAppointments) {
  console.log('====================================');
  let deleteRecords = []
  for (let index = 0; index < oldAppointments.length; index++) {
    
    deleteRecords.push({ oldID: oldAppointments[index].ItemID, newID: newAppointments[index].itemID })
    
  }
  
  return deleteRecords;
  
  
  }

  
async function deleteLocalAppointments(appointment) {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_ct_userappointments SET ItemID = ?, ReadyToSync = ? WHERE ItemID = ?`
        ,[appointment.newID, '0', appointment.oldID],
        (tx, results) => {
          console.log('====================================');
          console.log(results.rowsAffected);
          console.log('====================================');
          resolve(results.rowsAffected);  
        }
      );
  

    });
  });

   
}
  





export default UploadAppointments;



