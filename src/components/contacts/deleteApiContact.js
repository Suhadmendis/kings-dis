import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();




async function deleteApiContact(id, WebContactId) {
  return new Promise((resolve, reject) => {

    const res = startProcess(id, WebContactId);
    resolve(res);

  });
}





async function startProcess(id, WebContactId){

  console.log('Starting process', id);

  let delete_id = WebContactId ? WebContactId : id;

  const updateRes = await sendToServer(delete_id);

  if (updateRes.error == "") {
    const updatelocal = await updateLocal(id);

    if (updatelocal == 1) {
      return { status: "Success", body: '' };
    }else{
      return { status: "Error", body: "Something went wrong" };
    }

  }else{
    return { status: "Error", body: "Something went wrong" };
  }





}





async function sendToServer(id){

  const token = store.getState().login.loginToken;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");



  let res = [];


    var raw = JSON.stringify({
      "CustomerContactId": id
  });



    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };




    return fetch(`${getBaseUrl()}Account/DeleteCustomerContact`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {

      return response;

    })
    .catch(error => console.log(error));







}

async function updateLocal(id){
  return new Promise((resolve, reject) => {


    db.transaction(tx => {
      tx.executeSql(`UPDATE local_ct_customercontacts set IsDeleted = '1', ReadyToSync = '0' where ItemID = '${id}'`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });

}



export default deleteApiContact;



