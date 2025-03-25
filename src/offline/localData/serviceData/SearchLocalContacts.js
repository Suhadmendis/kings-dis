import openDatabaseService from "../../Config";

async function GetLocalContacts(id) {
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM local_ct_customercontacts where ItemID = ${id}`,
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
              city: res.rows.item(index).City,
              postCode: res.rows.item(index).PostCode,
              state: res.rows.item(index).State,
              country: res.rows.item(index).Country,
              countryId: res.rows.item(index).CountryId,
              jobRole: res.rows.item(index).JobRole,
              notes: res.rows.item(index).Notes,
              isDefault: res.rows.item(index).IsDefault

            });
          }
          resolve(data);
        }
      );
    });
  });
}

export default GetLocalContacts;
