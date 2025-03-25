import openDatabaseService from '../../Config';


async function TestTable() {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    console.log("Check Tables");
    db.transaction(tx => {
      // local_com_orderitem
      // local_com_orderaddress
      tx.executeSql(`SELECT * FROM local_ct_userappointments'`,[],

        function (tx, res) {
          let data = [];
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
             
          }
          resolve(data);
       },
       function (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
     }
       )
    });
  });
}

export default TestTable;