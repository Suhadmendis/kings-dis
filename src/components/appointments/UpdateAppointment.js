import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();

async function UpdateAppointments(appointment) {

  

  return new Promise((resolve, reject) => {

 
//  let   appointment = {"app_array": [], "checked": false, "email": "tddddest1@tfffffest.com", "endDate": "2022-11-28 23:59:59", "id": "1", "location": "lk", "note": "test edit", "startDate": "2022-11-28 16:36:00", "subject": "Test Edit"}


    const appointments = startProcess(appointment);
    resolve(appointments);
  });
}



async function startProcess(appointment){

  const connectionStatus = store.getState().loading.connectionStatus;

  const appointments = await getAppointments(appointment.id)
  // const appointmentsRes = 

  if (appointments[0].ReadyToSync == 1) {
    const updateResponse = await updateAppointmentsLocal(appointment, 1, 1);
  }else{
    if (connectionStatus) {
      const updateRes = await updateAppointmentsAPI(appointment);
      const updateResponse = await updateAppointmentsLocal(appointment, 0, 0);
    }else{
      const updateResponse = await updateAppointmentsLocal(appointment, 0, 1);
    }
    
  }

  return 'UPDATED';


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

async function updateAppointmentsAPI(appointment){

  const token = store.getState().login.loginToken;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");



  let res = [];

  console.log('====================================');
  console.log(appointment);
  console.log('====================================');
    
    var raw = JSON.stringify({
      "UserAppointmentID": appointment.id,
      "Email": appointment.email,
      "Subject": appointment.subject,
      "Location": appointment.location,
      "StartDate": new Date(appointment.startDate),
      "EndDate": new Date(appointment.endDate),
      "Note": appointment.note,
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


  
async function updateAppointmentsLocal(appointment, ReadyToSync, ReadyToUpdate) {


  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_ct_userappointments SET Email = ?, Subject = ?, Location = ?, StartDate = ?, EndDate = ?, Note = ?, ReadyToSync = ?, ReadyToUpdate = ? WHERE ItemID = ?`
        ,[appointment.email, appointment.subject, appointment.location, new Date(appointment.startDate), new Date(appointment.endDate), appointment.note, ReadyToSync, ReadyToUpdate, appointment.id],
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
  





export default UpdateAppointments;



