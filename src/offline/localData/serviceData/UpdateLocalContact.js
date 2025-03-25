import openDatabaseService from "../../Config";

async function UpdateLocalContact(data) {
  console.log(data);
  const db = openDatabaseService();


  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log(data);

      if (data.isDefault == 1) {
        tx.executeSql(
          `UPDATE local_ct_customercontacts SET IsDefault = ?, ReadyToSync = ? where customerID = ? and IsDefault = ?`,
          [
            0,
            1,
            data.adminCustomerID,
            1
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
        `UPDATE local_ct_customercontacts SET Name = ?, Phone = ?, Email = ?, AddressLine1 = ?, AddressLine2 = ?, AddressLine3 = ?, City = ?, PostCode = ?, State = ?, CountryId = ?, JobRole = ?, Notes = ?, IsDefault = ?, ReadyToSync = ? WHERE ItemID = ?`,
        [
          data.name,
          data.number,
          data.email,
          data.addressLine1,
          data.addressLine2,
          data.addressLine3,
          data.city,
          data.postCode,
          data.state,
          data.countryId,
          data.jobrole,
          data.notes,
          data.isDefault,
          1,
          data.id
        ],
        (tx, results) => {
          resolve(results.rowsAffected);
        },
        (err, er) => {
          console.log(err);
          console.log(er);
        }
      );
    });
  });
}

export default UpdateLocalContact;
