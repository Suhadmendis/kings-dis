import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();

async function UploadAppointments(appointmentID) {

  

  return new Promise((resolve, reject) => {

    const appointments = startProcess(appointmentID);
    resolve(appointments);
  });
}



async function startProcess(appointmentID){

  const connectionStatus = store.getState().loading.connectionStatus;


  const appointment = await getAppointments(appointmentID)
  // const appointmentsRes = 


if (appointment.length > 0) {
  
  const isSynced = appointment[0].ReadyToSync == '0';

  console.log('====================================');
  console.log(connectionStatus);
  console.log('====================================');
  if (connectionStatus) {
    if (!isSynced) {
      let appointmentResDelete = await deleteAppointmentLocal(appointmentID);
      return "Deleted";
    }else{
      let appointmentRes = await deleteAppointmentAPI(appointmentID);
      

      if (appointmentRes.error == "") {
        let appointmentResDelete = await deleteAppointmentLocal(appointmentID);
        return "Deleted";
      }

      
    }
  }else{
    if (isSynced) {

      return "You can't delete a Synced Appointment in the offline Mode";
      
    }else{
      let appointmentResDelete = await deleteAppointmentLocal(appointmentID);
      return "Deleted";
    }
  }




  
}else{
  return 'NOT FOUND';
}


}


async function getAppointments(appointmentID) {

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_userappointments where ItemID = '${appointmentID}'`,[],

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
  


async function deleteAppointmentAPI(appointmentID){

  console.log('====================================');
  console.log(appointmentID);
  console.log('====================================');
  const token = store.getState().login.loginToken;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");



  let res = [];

  
    
    var raw = JSON.stringify({
      "UserAppointmentID": appointmentID
  });



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };




    return fetch(`${getBaseUrl()}Account/DeleteUserAppointment`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {
      
      console.log('====================================');
      console.log(response);
      console.log('====================================');

      return response;
      
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

  
async function deleteAppointmentLocal(appointmentID) {
  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_ct_userappointments where ItemID = '${appointmentID}'`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });
}
  





export default UploadAppointments;



