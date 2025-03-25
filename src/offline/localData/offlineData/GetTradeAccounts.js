
   
import openDatabaseService from '../../Config';


async function GetTradeAccounts() {
  

  

  const db = openDatabaseService();


  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM local_ct_tradeaccount`,
        [],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            data.push({
              ItemID: res.rows.item(index).ItemID,
              ItemName: res.rows.item(index).ItemName,
              adminCustomerFirstName: res.rows.item(index).ItemAdminFirstName,
            });
          }
          resolve(data);
        }
      );
    });
  });

  // return new Promise((resolve, reject) => {

  //   const productsLimit = 10;

  //   db.transaction(tx => {
  //     tx.executeSql(`SELECT * FROM local_ct_tradeaccount`,[],

  //       function (tx, res) {
  //         let data = [];
      
  //         for (let index = 0; index < res.rows.length; index++) {h({ 
  //             ItemID: res.rows.item(index).ItemID,
  //             ItemName: res.rows.item(index).ItemName,
  //             ItemAdminFirstName: res.rows.item(index).ItemAdminFirstName,
  //             //image: require('../../../assets/noimage.png')
  //           });              

  //         }
  //         resolve(data);
  //       })
  //   });
  // });
}



export default GetTradeAccounts;