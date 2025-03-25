import openDatabaseService from '../../Config';


async function AddressStates() {
  
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT StateID, StateDisplayName,CountryID, StateName, StateCode FROM local_cms_state`,[],
        function (tx, res) {
          let data = [];
          for (let index = 0; index < res.rows.length; index++) {
            
            data.push({ 
              id: res.rows.item(index).StateID,
              displayName: res.rows.item(index).StateDisplayName,
              stateName: res.rows.item(index).StateName,
              stateCode: res.rows.item(index).StateCode,
              countryID: res.rows.item(index).CountryID,
            });            

          }
          resolve(data);
        })
    });
  });
}

export default AddressStates;

// StateID INTEGER PRIMARY KEY,
//       StateDisplayName VARCHAR(100),
//       StateName VARCHAR(100),
//       StateCode VARCHAR(10),
//       CountryID INTEGER,
//       StateGUID VARCHAR(70),
//       StateLastModified VARCHAR(70)