import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';



async function deleteAbondandOrders(id) {

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
          "Orders": [
              // {
              //     "WebOrderID": 158139,
              //     "OrderStatusName": "inprogress"
              // },
              {
                  "WebOrderID": id,
                  "Delete": true
              }
          ]
      });
    


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch(`${getBaseUrl()}Sync/OrderSync`, requestOptions)
      .then(response => response.text())
      .then(response => JSON.parse(response))
      .then(response => {
console.log(response[0]);
        // if(response.error == "") {
          
        resolve(response[0])

        //   resolve({ status: 'Success', body: response });
        // }else{
        //   resolve({ status: 'Error', body: response });
        // }

      })
      .catch(error => resolve({ status: 'Error', body: response }));


  });
}



export default deleteAbondandOrders;



