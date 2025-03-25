import openDatabaseService from "../../Config";

async function GetLocalContacts(data) {
  const db = openDatabaseService();

  console.log(data);
  return new Promise((resolve, reject) => {
    console.log('uypdated----------------');
    db.transaction((tx) => {
      if (data.isDefault == 1) {
        tx.executeSql(
          `UPDATE local_ct_customercontacts SET IsDefault = ? where customerID = ?`,
          [
            0,
            data.adminCustomerID
          ],
          (tx, results) => {
            resolve(results.rowsAffected);
          },
          (err, er) => {
            console.log(err);
            console.log(er);
          }
        );
      }
      tx.executeSql(
       "INSERT INTO local_ct_customercontacts(Name, ItemCreatedBy, AddressLine1, AddressLine2, AddressLine3, City, PostCode, Phone, Email, State, CountryId, JobRole, Notes, CustomerId, IsDeleted, IsDefault, ReadyToSync) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          data.name,
          data.itemCreatedBy,
          data.addressLine1,
          data.addressLine2,
          data.addressLine3,
          data.city,
          data.postCode,
          data.number,
          data.email,
          data.state,
          // data.country,
          data.countryId,
          data.jobrole,
          data.notes,
          data.adminCustomerID,
          0,
          data.isDefault ? 1 : 0,
          data.ReadyToSync

        ],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );
    });
  });
}

export default GetLocalContacts;

