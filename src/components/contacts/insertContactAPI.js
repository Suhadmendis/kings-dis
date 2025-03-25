import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();

async function insertContactAPI(data) {



  return new Promise((resolve, reject) => {


//  let   appointment = {"app_array": [], "checked": false, "email": "tddddest1@tfffffest.com", "endDate": "2022-11-28 23:59:59", "id": "1", "location": "lk", "note": "test edit", "startDate": "2022-11-28 16:36:00", "subject": "Test Edit"}


    const res = startProcess(data);
    resolve(res);
  });
}



async function startProcess(data){

  const updateRes = await sendToServer(data);

  if (updateRes.error == "") {
    const createlocal = await insertToLocal(updateRes.customerContact);
    console.log('datadatadatadatadata', createlocal);
    if (createlocal == 1) {
      return { status: "Success", body: '' };
    }else{
      return { status: "Error", body: "Something went wrong" };
    }

  }else{
    return { status: "Error", body: "Something went wrong" };
  }





}




async function sendToServer(data){

  const token = store.getState().login.loginToken;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");



  let res = [];


    var raw = JSON.stringify({
      //"CustomerContactId": 4,
      "Name": data.name,
      "AddressLine1": data.addressLine1,
      "AddressLine2": data.addressLine2,
      "AddressLine3": data.addressLine3,
      "City": data.city,
      "PostCode": data.postCode,
      "Phone": data.number,
      "Email": data.email,
      "State": data.state,
      "CountryId": data.countryId,
      "JobRole": data.jobrole,
      "Notes": data.notes,
      "IsDefault": data.checked,
      "CustomerId": data.adminCustomerID
  });



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };




    return fetch(`${getBaseUrl()}Account/AddEditCustomerContact`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {

      return response;

    })
    .catch(error => console.log(error));

}


async function insertToLocal(data){
  return new Promise((resolve, reject) => {


    db.transaction((tx) => {
      tx.executeSql(
       "INSERT INTO local_ct_customercontacts(ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, Name, ItemGUID, AddressLine1, AddressLine2, AddressLine3, City, PostCode, Phone, Email, State, CountryId, JobRole, Notes, CustomerId, IsDeleted, IsDefault, ReadyToSync, WebContactId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          data.itemCreatedBy,
          data.itemCreatedWhen,
          data.itemModifiedBy,
          data.itemModifiedWhen,
          data.name,
          data.itemGUID,
          data.addressLine1,
          data.addressLine2,
          data.addressLine3,
          data.city,
          data.postCode,
          data.phone,
          data.email,
          data.state,
          data.countryId,
          data.jobRole,
          data.notes,
          data.customerId,
          0,
          data.isDefault ? 1 : 0,
          0,
          data.itemID

        ],
        (tx, results) => {
          console.log(results.rowsAffected);
          resolve(results.rowsAffected);
        }
      );
    });
      });




}







export default insertContactAPI;



