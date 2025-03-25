import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

let state = store.getState();

async function DeleteImageAPI(AccCode, AddressID, fileName) {

  let token = state.login.loginToken;

  



  // const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

    var raw = JSON.stringify({
      "AccCode": AccCode,
      "AddressID": AddressID,
      "Images": [fileName]
  });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${getBaseUrl()}Sync/DeleteImages`, requestOptions)
      .then(response => response.text())
      .then(result => resolve(result))
      .catch(error => reject(error));
      });
}

export default DeleteImageAPI;