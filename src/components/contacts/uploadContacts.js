import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();




async function uploadContacts() {
  return new Promise((resolve, reject) => {

    const res = startProcess();
    resolve(res);

  });
}





async function startProcess(){

  const contactList = await getLocalContactList();






  let deletecontactList = contactList.filter(contact => contact.IsDeleted == 1);

  if (deletecontactList.length > 0) {
    deletecontactList = deletecontactList.map(contact => {
      return {
        "Type": "ct_customercontacts", //delete or update record
        "Data": {
            "CustomerContactId": contact.ItemID, // ItemId of the record
            "Name": contact.Name, // only need if updating
            "AddressLine1": contact.AddressLine1, // only need if updating
            "AddressLine2": contact.AddressLine2, // only need if updating
            "AddressLine3": contact.AddressLine3, // only need if updating
            "City": contact.City, // only need if updating
            "PostCode": contact.PostCode, // only need if updating
            "Phone": contact.Phone, // only need if updating
            "Email": contact.Email, // only need if updating
            "State": contact.State, // only need if updating
            "CountryId": contact.CountryId, // only need if updating
            "JobRole": contact.JobRole, // only need if updating
            "Notes": contact.Notes, // only need if updating
            "IsDeleted": true, // only need if updating
            "IsDefault": contact.IsDefault, // only need if updating

        }
      }

    });

    const resdeleted = await updateserver(deletecontactList);


  }



  let newcontactList = contactList.filter(contact => contact.IsDeleted == 0);

  if(newcontactList.length > 0) {
    newcontactList = newcontactList.map(contact => {
      return {
        "Type": "ct_customercontacts", //delete or update record
        "Data": {
          "CustomerContactId": contact.ItemID, // ItemId of the record
            "Name": contact.Name, // only need if updating
            "AddressLine1": contact.AddressLine1, // only need if updating
            "AddressLine2": contact.AddressLine2, // only need if updating
            "AddressLine3": contact.AddressLine3, // only need if updating
            "City": contact.City, // only need if updating
            "PostCode": contact.PostCode, // only need if updating
            "Phone": contact.Phone, // only need if updating
            "Email": contact.Email, // only need if updating
            "State": contact.State, // only need if updating
            "CountryId": contact.CountryId, // only need if updating
            "JobRole": contact.JobRole, // only need if updating
            "Notes": contact.Notes, // only need if updating
            "IsDeleted": false, // only need if updating
            "IsDefault": contact.IsDefault, // only need if updating
            "CustomerId": contact.CustomerId,
            "ItemCreatedBy": contact.ItemCreatedBy,
            "ItemCreatedWhen": contact.ItemCreatedWhen
        }
      }

    });


    const resnew = await updateserver(newcontactList);


  }



  const updateContacts = await updateLocalContactList();



  return 'ok';




}


async function getLocalContactList(){
  return new Promise((resolve, reject) => {
    let rowsAry= [];
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_customercontacts where ReadyToSync = '1'`,[],
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
}

async function updateLocalContactList(){
  return new Promise((resolve, reject) => {
    let rowsAry= [];
    db.transaction(tx => {
      tx.executeSql(`UPDATE local_ct_customercontacts set ReadyToSync = '0' where ReadyToSync = '1'`,[],
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
}


async function updateserver(contactList){

  const token = store.getState().login.loginToken;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

console.log(contactList);

  let res = [];


    var raw = JSON.stringify({
      "Sources": [],
      "Uploads": contactList
  });



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };




    return fetch(`${getBaseUrl()}Sync/LatestSync`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {
      console.log('response',response);
      return response;
    })
    .catch(error => console.log(error));







}



export default uploadContacts;



