
   
import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

async function GetPictorialOrderPadDataAPI(data) {


  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;


    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

    var raw = JSON.stringify({
      //"category": "Commercial/Pictorial Packets/Broad Beans",
      "offset": 0,
      "pagesize": 0
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };



    
    return fetch(`${getBaseUrl()}products/PictorialProducts`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(result => resolve(result))
    .catch(error => console.log('error', error));
  
  
    
  });
}



export default GetPictorialOrderPadDataAPI;







// let customerName = result[index].tradeAccountName;
// // if(result[index].addressPersonalName == ''){
// //   if(result[index].adminCustomerFirstName || result[index].adminCustomerLastName){
// //     customerName = `${result[index].adminCustomerFirstName} ${result[index].adminCustomerLastName}`;
// //   }
// // }else{
// //   customerName = result[index].addressPersonalName;
// // }
// if(result[index].tradeAccountName == ''){
//   if(result[index].adminCustomerFirstName || result[index].adminCustomerLastName){
//     customerName = `${result[index].adminCustomerFirstName} ${result[index].adminCustomerLastName}`;
//   }
// }else{
//   customerName = result[index].tradeAccountName;
// }

// let customerPhone = result[index].adminCustomerPhone;

// if(result[index].addressPhone != ''){
//   customerPhone = result[index].addressPhone;
// }

// data.push({ 
//   id: result[index].tradeAccountID,
//   name: customerName,
//   address: result[index].addressDisplay,
//   phone: customerPhone,
//   email: result[index].adminCustomerEmail
// }); 