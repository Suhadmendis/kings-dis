import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';

import createTableSchema from '../../storeData/createTableSchema';
import createDataSchema from '../../storeData/createDataSchema';
import getBaseUrl from '../../../url/getBaseUrl';

const db = openDatabaseService();

async function QuoteClone({ items, quoteId }) {



  return new Promise((resolve, reject) => {
   let temp = [];

   const createClone = performProccess(items, quoteId);


    resolve(createClone);


  });
}

async function performProccess(items, quoteId){


  let status = { status: '', msg: '' };


  const newQuoteLabel = await getNewQuoteLabel(quoteId);
  const quoteMainTuple = await getQuoteMainTuple(quoteId);
  console.log(quoteMainTuple);
  const quoteCreated = await createQuoteOnServer(items, newQuoteLabel, quoteMainTuple[0]);

  if(quoteCreated.status != "Success") {
    status = { status: 'Error', msg: '' };

    return  status;
  }else{
    status = { status: 'Success', msg: '' };
  }

  const quoteCreatedOnLocal = await createQuoteOnLocal(quoteCreated.body);



  return status;
}





async function getQuoteMainTuple(quoteId) {

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_shoppingcart where ShoppingCartID = '${quoteId}'`,[],

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


// tx.executeSql(`SELECT ItemQuoteLabel FROM local_ct_quotes where ItemQuoteLabel like '%${firstLetters}%'`,[],

// function (tx, res) {
//   let stringArray = [];
//   for (let index = 0; index < res.rows.length; index++) {
//     stringArray.push(res.rows.item(index).slice(-1));
//     console.log(res.rows.item(index).slice(-1));
//   }
// });

async function getNewQuoteLabel(quoteId) {

  return new Promise((resolve, reject) => {



    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_quotes where ItemShoppingCartID like '${quoteId}'`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {

            let nameValue = res.rows.item(index).ItemQuoteLabel;

            const last2 = nameValue.slice(-2);



            if (last2[0] == '-') {
              const firstLetters = nameValue.slice(0, nameValue.length-1);


              tx.executeSql(`SELECT ItemQuoteLabel FROM local_ct_quotes where ItemQuoteLabel like '%${firstLetters}%'`,[],

              function (tx, ress) {
                  let max = 0;

                  console.log(ress.rows);
                  for (let index = 0; index < ress.rows.length; index++) {
                    const intEndValue = parseInt(ress.rows.item(index).ItemQuoteLabel.slice(-1));
                    if (intEndValue > max) {
                      max = intEndValue;
                    }

                  }

                  let valueAry = nameValue.split("-");

                  data.push(`${valueAry[0]}-${max+1}`);
                  resolve(`${valueAry[0]}-${max+1}`);

                // resolve(selectedLabel);
              })


            }else{
              data.push(res.rows.item(index).ItemQuoteLabel);

              let selectedLabel = data[data.length-1];

              selectedLabel = selectedLabel + "-1";
              resolve(selectedLabel);
            }



          }





        })
    });
  });
}





async function createQuoteOnServer(items, newQuoteLabel, quoteMainRow){
  const token = store.getState().login.loginToken;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

  let ShoppingCartItems = [];

  // DEL
  // {"name": "100% Cornfield Annuals", "priceOption": "400 Grams", "productNumber": "WIL 014", "quantity": 35, "skuPackSize": "1", "unitPrice": 40.565}
  let itemQuoteTotal = 0;

  items.map((item) => {

    ShoppingCartItems.push({
      "CartItemID": 0,// zero 0
      "SKUID": item.SKUID,
      "SKUUnits": item.SKUUnits,
      "CartItemText": item.CartItemText,
      "CartItemUnitListPrice": item.CartItemUnitListPrice,
      "CartItemUnitPrice": item.CartItemUnitPrice,
      "CartItemUnitDiscount": item.CartItemUnitDiscount,
      "CartItemPrice": item.CartItemPrice,
      "CartItemDiscountRate": item.CartItemDiscountRate,
      "CartItemQuoteLineDiscount": item.CartItemQuoteLineDiscount,
      "CartItemQuoteLineDiscountType": item.CartItemQuoteLineDiscountType,
      "CartItemQuoteYourPrice": item.CartItemQuoteYourPrice
    });

    itemQuoteTotal = itemQuoteTotal + item.CartItemQuoteYourPrice;

  });






  var raw = JSON.stringify({
    "QuoteAction": "add",
    "ShoppingCartUserID": quoteMainRow.ShoppingCartUserID,
    "ShoppingCartCurrencyID": 1, // ask chamila
    "ShoppingCartCustomerID": quoteMainRow.ShoppingCartCustomerID,
    "ShoppingCartNote": newQuoteLabel,
    "ShoppingCartItems": ShoppingCartItems,
    "Quote": {
      "ItemCustomerID": quoteMainRow.ShoppingCartCustomerID,
      "ItemQuoteTotal": itemQuoteTotal,
      "ItemQuoteDelivery": 0 // ask chamila
    }
});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${getBaseUrl()}Cart/AddEditQuote`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {





      if(response.error == "") {

        return { status: 'Success', body: response };
      }else{
        return { status: 'Error', body: response };
      }

    })
    .catch(error => resolve({ status: 'Error', body: response }));
}




async function createQuoteOnLocal({ cart, quote, quoteStatusUser }){



  const cartInserted = await insertCartData(cart);
  const quoteInserted = await insertQuoteData(quote);
  const quoteStatusInserted = await insertQuoteStatusData(quoteStatusUser);


  console.log(quoteStatusInserted);

  return cartInserted;
}




async function insertCartData(cartObject) {

  return new Promise((resolve, reject) => {


    const tableName = 'local_com_shoppingcart';
    const subTableName = 'local_com_shoppingcartsku';



    const tableSchema = createTableSchema(tableName);
    const subTableSchema = createTableSchema(subTableName);


    const cart = cartObject;
    const shoppingCartItems = cartObject.shoppingCartItems;


    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{



      const dataSchema = createDataSchema(tableName, cart, '', 'QUOTE');
      db.transaction(
        (tx) => {
          tx.executeSql(tableSchema, dataSchema,
          function (tx, res) {
            if(res.rowsAffected == 1){
              let count = 0;
              shoppingCartItems.map((item) =>{
                const subDataSchema = createDataSchema(subTableName, item);
                tx.executeSql(subTableSchema, subDataSchema,
                  function (tx, res) {

                    count = count + 1;
                    if(res.rowsAffected != 1){
                      resolve('Error');
                    }

                    if(count == shoppingCartItems.length){

                      resolve('Success');
                    }

                });
              });

            }else{
              resolve('Error');
            }
          });



        }
      );




    }




  });
}




async function insertQuoteData(quoteObject) {

  return new Promise((resolve, reject) => {

    const tableName = 'local_ct_quotes';

    const tableSchema = createTableSchema(tableName);

    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{

      const dataSchema = createDataSchema(tableName, quoteObject);
      db.transaction(
        (tx) => {
          tx.executeSql(tableSchema, dataSchema,
          function (tx, res) {
            if(res.rowsAffected == 1){
              resolve('Success');



            }else{
              resolve('Error');
            }
          });



        }
      );


    }

  });
}


async function insertQuoteStatusData(quoteStatusUser) {

  return new Promise((resolve, reject) => {

    const tableName = 'local_ct_quotestatususer';

    const tableSchema = createTableSchema(tableName);

    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{

      const dataSchema = createDataSchema(tableName, quoteStatusUser);
      db.transaction(
        (tx) => {
          tx.executeSql(tableSchema, dataSchema,
          function (tx, res) {
            if(res.rowsAffected == 1){
              resolve('Success');



            }else{
              resolve('Error');
            }
          });



        }
      );


    }

  });
}






export default QuoteClone;



