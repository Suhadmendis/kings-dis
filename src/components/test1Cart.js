import openDatabaseService from '../offline/Config';
import { store } from '../../configureStore';
import getBaseUrl from "../url/getBaseUrl";
import { GetWorkingAsCustomerID } from '../offline/Services/UserHelper';

const db = openDatabaseService();

async function sendCartstoServer(localCart) {

  return new Promise((resolve, reject) => {




    const insertData = insertProccess(localCart);

    resolve(insertData);

  });

}



async function insertProccess(localCart){

  let cartObject = [];
  let cartObjects = [];

  for (let index = 0; index < localCart.length; index++) {

        cartObject = await sendToServer(localCart[index]);
        cartObjects.push(cartObject);

  }



    return cartObjects;




}




async function sendToServer(localCart) {




      const token = store.getState().login.loginToken;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
      myHeaders.append("WorkingAsCustomerID", GetWorkingAsCustomerID());

      // remove ShoppingCartID
      const tempLocalCart =  {
        cart: {
          ShoppingCartCurrencyID: localCart.cart.ShoppingCartCurrencyID,
          ShoppingCartCustomerID: localCart.cart.ShoppingCartCustomerID,
          ShoppingCartIsPreSeason: localCart.cart.ShoppingCartIsPreSeason == 0 ? false : true,
          ShoppingCartItems: localCart.cart.ShoppingCartItems,
          ShoppingCartNote: localCart.cart.ShoppingCartNote,
          ShoppingCartUserID: localCart.cart.ShoppingCartUserID
        }
      };

      console.log('============tempLocalCart========================');
      console.log(tempLocalCart);
      console.log('====================================');
      var raw = JSON.stringify(tempLocalCart.cart);



      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };



      return fetch(`${getBaseUrl()}Cart/AddEditSavedBasket`, requestOptions)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {


          if(response.error == "") {

            return({ status: 'Success', body: response });

          }else{
            return({ status: 'Error', body: response });
          }

        })
        .catch(error => {
          return({ status: 'Error', body: error })
        });










}






export default sendCartstoServer;






