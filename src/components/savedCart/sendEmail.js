import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';
import { GetWorkingAsCustomerID } from '../../offline/Services/UserHelper';

async function sendEmail(cartId, userId, token, email) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    myHeaders.append("WorkingAsCustomerID", GetWorkingAsCustomerID());

    var raw = JSON.stringify([

      {
          "Type": "Savedcart.Store",
          "Data": {
              "CartID": cartId,
              "SOPUserID": userId,
              "ToEmail": email
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