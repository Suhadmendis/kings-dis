import openDatabaseService from '../../Config';

async function AddressCountries() {
  return new Promise((resolve, reject) => {
    let data = [];
    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(`SELECT CountryID, CountryDisplayName, CountryName, CountryStateRequired FROM local_cms_country ORDER BY CountryDisplayName`, [],
          function (tx, res) {
            for (let index = 0; index < res.rows.length; index++) {
              data.push({
                id: res.rows.item(index).CountryID,
                displayName: res.rows.item(index).CountryDisplayName,
                name: res.rows.item(index).CountryName,
                stateReq: res.rows.item(index).CountryStateRequired,
              });
            }
            resolve(data);
          }, function (tx, error) {
            console.log('ExecuteSql ERROR: ' + error.message);
            resolve(data);
          })
    }, error => {
      console.log('Transaction ERROR: ' + error.message);
      resolve(data);
    });
  });
}

export default AddressCountries;

