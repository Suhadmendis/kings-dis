import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

async function sendEmail(data, token) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

    var raw = JSON.stringify([
     
      {
          "Type": "Contact.New",
          "Data": {
            Name: data.name,
            AddressLine1: data.addressLine1,
            AddressLine2: data.addressLine2,
            AddressLine3: data.addressLine3,
            City: data.city,
            PostCode: data.PostCode,
            Phone: data.number,
            Email: data.email,
            State: data.state,
            CountryId: data.countryId,
            JobRole: data.jobrole,
            Notes: data.notes,
            CustomerId: data.adminCustomerID
        }
      }
  ]);


  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${getBaseUrl()}Notification/SendEmail`, requestOptions)
      .then(response => response.text())
      .then(result => resolve(JSON.parse(result)[0]))
      .catch(error => reject(error));

      });
}

export default sendEmail;