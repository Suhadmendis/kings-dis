import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

async function SaveCartAPI({ quoteId, quoteAction, email }) {
  
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {
   
    const token = store.getState().login.loginToken;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    

    var raw;

    console.log('============fsdgsdgsd====================');
    console.log(quoteAction);
    console.log(quoteId);
    console.log(email);
    console.log('================================');
    raw = JSON.stringify({
      "QuoteAction": quoteAction,
      "ShoppingCartID": quoteId,
      "ToEmail": email
    });

    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch(`${getBaseUrl()}Cart/AddEditQuote`, requestOptions)
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

export default SaveCartAPI;



