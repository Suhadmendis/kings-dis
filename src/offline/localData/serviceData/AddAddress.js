import openDatabaseService from "../../Config";

async function AddAddress(data) {
  const db = openDatabaseService();
  console.log("-------------trade account--------------------");
  console.log(data);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO local_com_address (AddressID, AddressName, AddressLine1, AddressLine2, AddressCity, AddressZip, AddressPhone, AddressCustomerID, AddressCountryID, AddressStateID, AddressPersonalName, AddressGUID, AddressLastModified, AddressLine4, AddressLine3, AddressEnabled, AddressIsBilling, AddressIsShipping, AddressWebOnly, AddressIsDefault, AddressAccCode, AddressCode, AddressDataSetID, Address_SyncStatus, LastUpdate, AddressContactTitle, AddressFirstName, AddressLastName, AddressUploadKey, AddressOldID, DisplayOrder, ReadyToSync, WebAddressID ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [data.addressID, data.addressName, data.addressLine1, data.addressLine2, data.addressCity, data.addressZip, data.addressPhone, data.addressCustomerID, data.addressCountryID, data.addressStateID, data.addressPersonalName, data.addressGUID, data.addressLastModified, data.addressLine4, data.addressLine3, data.addressEnabled, data.addressIsBilling, data.addressIsShipping, data.addressWebOnly, data.addressIsDefault, data.addressAccCode, data.addressCode, data.addressDataSetID, data.address_SyncStatus, data.lastUpdate, data.addressContactTitle, data.addressFirstName, data.addressLastName, data.addressUploadKey, data.addressOldID, data.displayOrder, data.readyToSync, data.webAddressID],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );
    });
  });
}

export default AddAddress;
