import openDatabaseService from '../../Config';


async function FindPictorial(id) {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_sku where SKUID = ${id}`,[],

        function (tx, res) {
          let data = [];
      
          for (let index = 0; index < res.rows.length; index++) {

            data.push(res.rows.item(index));              

          }
          resolve(data);
        })
    });
  });
}


export default FindPictorial;