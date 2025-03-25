import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const token = store.getState().login.loginToken;

const db = openDatabaseService();

async function getLocalAddresses() {
  
  return new Promise((resolve, reject) => {
    
    const insertData = insertProccess();
    
    resolve(insertData);
    
  });

}



async function insertProccess(){


    
    let localAddressesList = await localAddresses();
  
    
  let serverInsertion;
  let wokingIDs= [];

  for (let index = 0; index < localAddressesList.length; index++) {
    serverInsertion = await sendToServer(localAddressesList[index]);
    wokingIDs.push({ oldID: localAddressesList[index].AddressID, newID: serverInsertion.addressID });
  }
  
  let updateAddressesList = [];
  for (let index = 0; index < wokingIDs.length; index++) {
    let response = await updateAddresses(wokingIDs[index]);
    updateAddressesList.push(response); 
  }


  console.log('Address Updated...');
  console.log(updateAddressesList);

  return updateAddressesList;

}



async function localAddresses() {
  const ress = new Promise((resolve, reject) => {
    let rowsAry = [];
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_address where ReadyToSync = '1'`,[],
      async function (tx, res)  {
          if (res.rows.length != 0) {
            for (let index1 = 0; index1 < res.rows.length; index1++) {
              rowsAry.push(res.rows.item(index1));
            }
            resolve(rowsAry);
          }else{
            resolve(rowsAry);
          }
          
        })

    });
  });
  return ress;
}






async function sendToServer(localAddressesList) {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    myHeaders.append("WorkingAsCustomerID", localAddressesList.AddressCustomerID);
    


    var raw = JSON.stringify({
      AddressLine1: localAddressesList.AddressLine1,
      AddressLine2: localAddressesList.AddressLine2,
      AddressLine3: localAddressesList.AddressLine3,
      AddressCity: localAddressesList.AddressCity,
      AddressPersonalName: localAddressesList.AddressPersonalName,
      AddressCountryID: localAddressesList.AddressCountryID,
      AddressZip: localAddressesList.AddressZip,
      AddressLine4: localAddressesList.AddressLine4,
      AddressPhone: localAddressesList.AddressPhone,
      IsDefaultBilling: localAddressesList.IsDefaultBilling,
      IsDefaultShipping: localAddressesList.IsDefaultShipping,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    
    return fetch(`${getBaseUrl()}Address/AddEditCustomerAddress`, requestOptions)
    .then(response => response.text())
    .then(response => resolve(JSON.parse(response).address))

  });
}



async function updateAddresses(ids) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE local_com_address SET AddressID = ?, ReadyToSync = ? WHERE AddressID = ?`
        ,[ids.newID, '0', ids.oldID],
        (tx, results) => {
          resolve(results.rowsAffected);  
        }
      );
   

    });

  });
}


export default getLocalAddresses;
