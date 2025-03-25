import openDatabaseService from '../../src/offline/Config';
import {store} from './../../configureStore';
import getBaseUrl from '../url/getBaseUrl';
import sendAppointmentEmail from '../actions/SendAppointmentEmail';


async function AppointmentSaveAPI(object) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");


    

    // DEL
    // {"name": "100% Cornfield Annuals", "priceOption": "400 Grams", "productNumber": "WIL 014", "quantity": 35, "skuPackSize": "1", "unitPrice": 40.565}



      var raw = JSON.stringify({
        //"UserAppointmentID": 2,
        "Email": object.email,
        "Subject": object.subject,
        "Location": object.location,
        "StartDate": object.startDate,
        "EndDate": object.endDate,
        "Note": object.note,
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

        if(response.error == "") {
          

          resolve({ status: 'Success', body: response });
        }else{
          resolve({ status: 'Error', body: response });
        }

      })
      .catch(error => resolve({ status: 'Error', body: response }));


  });
}



export default AppointmentSaveAPI;



