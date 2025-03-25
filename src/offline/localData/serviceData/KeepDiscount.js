import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import createTableSchema from '../../storeData/createTableSchema';
import createDataSchema from '../../storeData/createDataSchema';


const db = openDatabaseService();


async function KeepDiscount({ quoteId, item }) {
  

  


  return new Promise((resolve, reject) => {

    const insertData = startProccess(quoteId, item);
    
    resolve(insertData);
    
  });
}


async function startProccess(quoteId, item){

  const discounts = await checkDiscounts();


  if (discounts.length == 0) {
    const discounts = await insertDiscounts(quoteId, item);
  }


  return discounts;

}




async function checkDiscounts() {

  return new Promise((resolve, reject) => {

    

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_temp_discount`,[],
        async function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          
          resolve(data);

        })
    });
  });

}

async function insertDiscounts(quoteId, item) {

  return new Promise((resolve, reject) => {

    

    // db.transaction(tx => {
    //   tx.executeSql(`SELECT * FROM local_temp_discount`,[],
    //     async function (tx, res) {
    //       let data = [];

    //       for (let index = 0; index < res.rows.length; index++) {
    //         data.push(res.rows.item(index));
    //       }
          
    //       resolve(data);

    //     })
    // });

  });

}


export default KeepDiscount;



