import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

async function AddNotesAPI(data) {

  const db = openDatabaseService();


  // console.log('====================fff================');
  // console.log(data);
  // console.log('====================================');
  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");


    var raw = JSON.stringify({
      "TradeAccountID": 24,
      "Notes": "Test 123"
    });
    


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch(`${getBaseUrl()}Account/UpdateTradeAccountNotes`, requestOptions)
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

export default AddNotesAPI;


