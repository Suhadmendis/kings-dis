import openDatabaseService from '../../Config';


async function GetOrderStatuses() {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    

    db.transaction(tx => {
      // local_com_orderitem
      // local_com_orderaddress
      tx.executeSql(`SELECT * FROM local_com_orderstatus`,[],

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

export default GetOrderStatuses;