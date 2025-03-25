
   
import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

async function GetApiContacts(data) {
  

  console.log(data);


  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;


    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

    var raw = JSON.stringify({
      "CurrentPage": data.currentPage,
      "PageSize": data.pagesize,
      "SearchTerm": data.searchTerm
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    
    return fetch(`${getBaseUrl()}Account/GetTradeAccountsStoreAddresses`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(result => {
      

      let data = [];
      
          
          for (let index = 0; index < result.length; index++) {

            let customerName = result[index].tradeAccountName;
            // if(result[index].addressPersonalName == ''){
            //   if(result[index].adminCustomerFirstName || result[index].adminCustomerLastName){
            //     customerName = `${result[index].adminCustomerFirstName} ${result[index].adminCustomerLastName}`;
            //   }
            // }else{
            //   customerName = result[index].addressPersonalName;
            // }
            if(result[index].tradeAccountName == ''){
              if(result[index].adminCustomerFirstName || result[index].adminCustomerLastName){
                customerName = `${result[index].adminCustomerFirstName} ${result[index].adminCustomerLastName}`;
              }
            }else{
              customerName = result[index].tradeAccountName;
            }

            let customerPhone = result[index].adminCustomerPhone;
            
            if(result[index].addressPhone != ''){
              customerPhone = result[index].addressPhone;
            }

            data.push({ 
              id: result[index].tradeAccountID,
              name: customerName,
              address: result[index].addressDisplay,
              phone: customerPhone,
              email: result[index].adminCustomerEmail
            });    

          }
          resolve(data);

    })
    .catch(error => console.log('error', error));
  
  
    
  });
}



export default GetApiContacts;