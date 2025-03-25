import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';
import { GetWorkingAsCustomerID } from '../../Services/UserHelper';

async function SaveCartAPI({ items, preSeason, cartref, cartMode, cartId, custId }) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;

    let state = store.getState();
    let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    myHeaders.append("WorkingAsCustomerID", GetWorkingAsCustomerID());

    let ShoppingCartItems = [];

    // DEL
    // {"name": "100% Cornfield Annuals", "priceOption": "400 Grams", "productNumber": "WIL 014", "quantity": 35, "skuPackSize": "1", "unitPrice": 40.565}


    if (cartMode == 'Editing Cart') {

      if (preSeason) {
        console.log('1');
        items.map((item) => {

          if (item.skuDiscountCat == 'A') {

            ShoppingCartItems.push({
              "CartItemID": 0,// zero 0
              "SKUID": item.id,
              "SKUUnits": item.quantity,
              "CartItemText": item.priceOption,
              "CartItemUnitListPrice": item.unitPrice,
              "CartItemUnitPrice": item.unitPrice,
              "CartItemUnitDiscount": 0,
              "CartItemPrice": item.totalPrice,
              "CartItemDiscountRate": 0,
              "CartItemPriceLine": item.priceLine,
              "CartItemLineTax": item.totalTax,
              "CartItemNote": item.lineNote,
              "CartItemBackCard":  item.backingCard
            });
          }
        });



      }else{
        console.log('2');
        items.map((item) => {
          ShoppingCartItems.push({
            "CartItemID": 0,// zero 0
            "SKUID": item.id,
            "SKUUnits": item.quantity,
            "CartItemText": item.priceOption,
            "CartItemUnitListPrice": item.unitPrice,
            "CartItemUnitPrice": item.unitPrice,
            "CartItemUnitDiscount": 0,
            "CartItemPrice": item.totalPrice,
            "CartItemDiscountRate": 0,
            "CartItemPriceLine": item.priceLine,
            "CartItemLineTax": item.totalTax,
            "CartItemNote": item.lineNote,
            "CartItemBackCard":  item.backingCard
          });
        });

      }
    }else{
      if (preSeason) {

        items.map((item) => {

          if (item.skuDiscountCat == 'A') {
            ShoppingCartItems.push({
              "CartItemID": 0,// zero 0
              "SKUID": item.id,
              "SKUUnits": item.quantity,
              "CartItemText": item.priceOption,
              "CartItemUnitListPrice": item.unitPrice,
              "CartItemUnitPrice": item.unitPrice,
              "CartItemUnitDiscount": 0,
              "CartItemPrice": item.totalPrice,
              "CartItemDiscountRate": 0,
              "CartItemPriceLine": item.priceLine,
              "CartItemLineTax": item.totalTax,
              "CartItemNote": item.lineNote,
              "CartItemBackCard":  item.backingCard
            });
          }
        });

      }else{

        items.map((item) => {
          ShoppingCartItems.push({
            "CartItemID": 0,// zero 0
            "SKUID": item.id,
            "SKUUnits": item.quantity,
            "CartItemText": item.priceOption,
            "CartItemUnitListPrice": item.unitPrice,
            "CartItemUnitPrice": item.unitPrice,
            "CartItemUnitDiscount": 0,
            "CartItemPrice": item.totalPrice,
            "CartItemDiscountRate": 0,
            "CartItemPriceLine": item.priceLine,
            "CartItemLineTax": item.totalTax,
            "CartItemNote": item.lineNote,
            "CartItemBackCard":  item.backingCard
          });
          console.log(ShoppingCartItems);
        });

      }
    }




    if (cartMode == 'Editing Cart') {
      var raw = JSON.stringify({
        "ShoppingCartID": cartId, //when edit
        "ShoppingCartUserID": loggedInUserID,
        "ShoppingCartCurrencyID": 1,
        "ShoppingCartCustomerID": custId,
        "ShoppingCartNote": cartref,
        "ShoppingCartItems": ShoppingCartItems,
        "shoppingCartIsPreSeason": preSeason
      });
    }else{
      var raw = JSON.stringify({
        //"ShoppingCartID": 32971, when edit
        "ShoppingCartUserID": loggedInUserID,
        "ShoppingCartCurrencyID": 1,
        "ShoppingCartCustomerID": custId,
        "ShoppingCartNote": cartref,
        "ShoppingCartItems": ShoppingCartItems,
        "shoppingCartIsPreSeason": preSeason
      });
    }



    console.log('====================================');
    console.log(raw);
    console.log('====================================');



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
          resolve({ status: 'Success', body: response });
        }else{
          resolve({ status: 'Error', body: response });
        }

      })
      .catch(error => resolve({ status: 'Error', body: response }));


  });
}

export default SaveCartAPI;



