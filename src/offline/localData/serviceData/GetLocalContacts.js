import openDatabaseService from "../../Config";

 async function GetLocalContacts(data) {
  const db = openDatabaseService();

  let query = "";

  if (data.type == "ALL") {
    query = `SELECT * FROM local_ct_customercontacts`;
  } else {
    query = `SELECT * FROM local_ct_customercontacts where customerID = '${data.adminCustomerID}' and isDeleted == '0'`;
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            data.push({
              id: res.rows.item(index).ItemID,
              name: res.rows.item(index).Name,
              phone: res.rows.item(index).Phone,
              email: res.rows.item(index).Email,
              addressLine1: res.rows.item(index).AddressLine1,
              addressLine2: res.rows.item(index).AddressLine2,
              addressLine3: res.rows.item(index).AddressLine3,
              address:
                res.rows.item(index).AddressLine1 +
                " " +
                res.rows.item(index).AddressLine2 +
                " " +
                res.rows.item(index).AddressLine3 +
                " " +
                res.rows.item(index).City +
                " " +
                res.rows.item(index).State +
                " " +
                res.rows.item(index).PostCode,
              city: res.rows.item(index).City,
              postCode: res.rows.item(index).PostCode,
              state: res.rows.item(index).State,
              country: res.rows.item(index).CountryId,
              jobRole: res.rows.item(index).JobRole,
              notes: res.rows.item(index).Notes,
              isDeleted: res.rows.item(index).IsDeleted,
              isDefault: res.rows.item(index).IsDefault,
              readyToSync: res.rows.item(index).ReadyToSync,
              WebContactId: res.rows.item(index).WebContactId,
            });
          }
          resolve(data);
        }
      );
    });
  });
}

export default GetLocalContacts;
