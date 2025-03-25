
   
import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

async function GetApiContacts(data) {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;


    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    myHeaders.append("WorkingAsCustomerID", data.adminCustomerID);

    
    
    var raw = JSON.stringify({
      "offset": 0,
      "pagesize": 0
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    

    
    return fetch(`${getBaseUrl()}Address/GetCustomerAddresses`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(result => {

      let data = [];
      
          
          for (let index = 0; index < result.addresses.length; index++) {

        
            data.push({ 
              id: result.addresses[index].addressID,
              name: result.addresses[index].addressPersonalName,
              address: result.addresses[index].addressDisplay,
              phone: result.addresses[index].addressPhone,
              email: ''
            });    

          }
          resolve(data);

    })
    .catch(error => console.log('error', error));
  
  
    
  });
}



export default GetApiContacts;