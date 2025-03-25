import openDatabaseService from '../offline/Config';
import { store } from '../../configureStore';
import getBaseUrl from "../url/getBaseUrl";

const db = openDatabaseService();

async function sendQuotestoServer(localQuote) {
  
  return new Promise((resolve, reject) => {



    
    const insertData = insertProccess(localQuote);
   
    resolve(insertData);
    
  });

}



async function insertProccess(localQuote){

  let quoteObject = [];
  let quoteObjects = [];
    
  for (let index = 0; index < localQuote.length; index++) {
        
        quoteObject = await sendToServer(localQuote[index]);
        quoteObjects.push(quoteObject);
    
  }
  
  

   
    return quoteObjects;
  

 

}




async function sendToServer(localQuote) {
  

  
    
      const token = store.getState().login.loginToken;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
  
      var raw = JSON.stringify(localQuote.cart);
  

      
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

            return({ status: 'Success', body: response });  

          }else{
            return({ status: 'Error', body: response });
          }
  
        })
        .catch(error => {
          return({ status: 'Error', body: error })
        });
  
  
      
    

   

   

  
}






export default sendQuotestoServer;






