import openDatabaseService from '../../../src/offline/Config';
import {store} from './../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';

const db = openDatabaseService();




async function deleteLocalContact(id) {
  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`UPDATE local_ct_customercontacts set IsDeleted = '1', ReadyToSync = '1' where ItemID = '${id}'`,[],

        function (tx, res) {
          resolve(res.rowsAffected);
        })
    });
  });
}
  






export default deleteLocalContact;



