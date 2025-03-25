import openDatabaseService from '../offline/Config';
import { store } from '../../configureStore';
import getBaseUrl from "../url/getBaseUrl";

const db = openDatabaseService();

async function getQuotesDataSet() {

  return new Promise((resolve, reject) => {




    const insertData = insertProccess();

    resolve(insertData);

  });

}



async function insertProccess(){



    let quoteObject = getCartData('QUOTE');

    let serverInsertion = sendToServer(quoteObject)
    // for (let index = 0; index < getCartRows.length; index++) {
    //   const element = getCartRows[index].ShoppingCartID;
    //   db.transaction(tx => {
    //     tx.executeSql(`SELECT * FROM local_com_shoppingcartsku where ShoppingCartID = '${element}'`,[],

    //       function (tx, res) {
    //         let data = [];

    //         for (let index = 0; index < res.rows.length; index++) {
    //           data.push(res.rows.item(index));
    //         }
    //         console.log('====================================');
    //         console.log(data);
    //         console.log('====================================');
    //       })
    //   });
    //   console.log('====================================');
    //   console.log(element);
    //   console.log('====================================');
    // }
    // getCartRows = getCartRows.map(async row => {
    //   row.cartItems = await getCartItems(row.ShoppingCartID);

    //   return row;
    // })


    return serverInsertion;




}



async function getCartData() {
  const ress = new Promise((resolve, reject) => {
    let rowsAry = [];
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_shoppingcart where AppShoppingCartSaveFlag = 'QUOTE' and ReadyToSync = '1'`,[],

      async function (tx, res)  {

          if (res.rows.length != 0) {
            for (let index1 = 0; index1 < res.rows.length; index1++) {



              tx.executeSql(`SELECT * FROM local_ct_quotes where ItemShoppingCartID = '${res.rows.item(index1).ShoppingCartID}'`,[],

              async  function (tx, ress) {

                           console.log('================ress.rows.item(0)====================');
                           console.log(`SELECT * FROM local_ct_quotes where ItemShoppingCartID = '${res.rows.item(index1).ShoppingCartID}'`);
                           console.log('====================================');
console.log(ress.rows.item(0));

                      let Quote = {
                          ItemCustomerID: ress.rows.item(0).ItemCustomerID,
                          ItemQuoteTotal: ress.rows.item(0).ItemQuoteTotal,
                          ItemQuoteDelivery: ress.rows.item(0).ItemQuoteDelivery
                      };
                      let cart = {
                          QuoteAction: 'Add',
                          ShoppingCartID: res.rows.item(index1).ShoppingCartID,
                          ShoppingCartUserID: res.rows.item(index1).ShoppingCartUserID,
                          ShoppingCartCurrencyID: res.rows.item(index1).ShoppingCartCurrencyID,
                          ShoppingCartCustomerID: res.rows.item(index1).ShoppingCartCustomerID,
                          ShoppingCartNote: res.rows.item(index1).ShoppingCartNote,
                          Quote
                      }

                      rowsAry.push({ cart });


                      let subRowsAry = [];
                      tx.executeSql(`SELECT * FROM local_com_shoppingcartsku where ShoppingCartID = '${rowsAry[index1].cart.ShoppingCartID}'`,[],

                      async function (tx, resss) {




                          for (let index = 0; index < resss.rows.length; index++) {
                              subRowsAry.push(resss.rows.item(index));
                          }

                          rowsAry[index1].cart.ShoppingCartItems = subRowsAry;



                          let len = res.rows.length -1;

                          if (index1 == len ) {
                            console.log('=============d=======================');
                            console.log(rowsAry);
                            console.log('====================================');
                              resolve(rowsAry);
                          }
                      })
              })







            }

          }else{
            resolve(rowsAry);
          }






        })









    });
  });



  return ress;
}






async function sendToServer(quoteObject) {
  return new Promise((resolve, reject) => {


   resolve(quoteObject)

  });
}


export default getQuotesDataSet;
