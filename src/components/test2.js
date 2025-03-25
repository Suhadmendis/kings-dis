import openDatabaseService from '../offline/Config';
import { store } from '../../configureStore';
import getBaseUrl from "../url/getBaseUrl";









const db = openDatabaseService();

async function deleteFromLocal(localQuote) {

  return new Promise((resolve, reject) => {




    const deleteData = deleteProccess(localQuote);

    resolve(deleteData);

  });

}




async function deleteProccess(localQuote){

  let quoteObject = [];
  let quoteObjects = [];

  for (let index = 0; index < localQuote.length; index++) {

        quoteObject = await deletequote(localQuote[index]);
        quoteObjects.push(quoteObject);

  }




    return quoteObjects;




}








async function deletequote(localQuote) {

  const db = openDatabaseService();


console.log('=====================dffff===============');
console.log(localQuote.cart.ShoppingCartID);
console.log('====================================');
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_com_shoppingcart where ShoppingCartID = '${localQuote.cart.ShoppingCartID}'`,[],

      function (tx, res) {

        tx.executeSql(`DELETE FROM local_com_shoppingcartsku where ShoppingCartID = '${localQuote.cart.ShoppingCartID}'`,[],

        function (tx, ress) {
          tx.executeSql(`DELETE FROM local_ct_quotes where ItemShoppingCartID = '${localQuote.cart.ShoppingCartID}'`,[],

            function (tx, resss) {
              console.log('===================fd=================');
              console.log(resss);
              console.log('====================================');
              return resss.rowsAffected;
            })

        })

      },
      function (error) {
        console.log('===================gshs=================');
        console.log(error);
        console.log('====================================');

      })
    });

}







export default deleteFromLocal;






