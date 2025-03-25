import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';

import createTableSchema from '../../storeData/createTableSchema';
import createDataSchema from '../../storeData/createDataSchema';
import getBaseUrl from '../../../url/getBaseUrl';

const db = openDatabaseService();

async function IsQuoteOrdered(data) {

  return new Promise((resolve, reject) => {
   let temp = [];
   
   const createClone = performProccess(data);

  
    resolve(createClone);
   

  });
}

async function performProccess(quoteId){



  

  let quoteOrdered = await getQuoteOrderedLocal(quoteId);
  
  if (quoteOrdered.textLength > 0) {
    return true;
  }

  // quoteOrdered.textLength = await getQuoteOrderedAPI(quoteOrdered.localQuoteId);
  
  if (quoteOrdered.textLength > 0) {
    return true;
  }else{
    return false;
  }

}

async function getQuoteOrderedLocal(quoteId) {

  return new Promise((resolve, reject) => {

  
    let returnData = { textLength: 0, localQuoteId: '' };

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_quotes where ItemShoppingCartID = '${quoteId}'`,[],

        function (tx, res) {
          
          returnData.localQuoteId = res.rows.item(0).ItemID;

          tx.executeSql(`SELECT * FROM local_com_order where OrderQuoteID = '${res.rows.item(0).ItemID}'`,[],
            function (tx, res) {
              let data = [];

              returnData.textLength = res.rows.length;
              
              resolve(returnData);
          })
        })
    });
  });
}


async function getQuoteOrderedAPI(quoteId){
  const token = store.getState().login.loginToken;

  tableName = 'COM_Order';

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

  var raw = JSON.stringify({
    "Sources": [
      {
        "Source": tableName,
        "LastUpdate": null
        // "LastUpdate": "2021-09-22T00:54:12"
      }
    ]
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${getBaseUrl()}Sync/LatestSync`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response).sources)
    .then(result => {

   

      return findFromRawData(result, quoteId);

      

     
    })
    .catch(error => console.log('error', error));
}


function findFromRawData(reults, quoteId) {

  return reults[0].data.filter(element => element.orderQuoteID == quoteId).length;
 
}




export default IsQuoteOrdered;



