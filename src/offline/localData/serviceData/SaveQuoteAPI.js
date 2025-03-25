import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import getBaseUrl from '../../../url/getBaseUrl';

async function SaveQuoteAPI({ items, quoteLabel, cartMode, quoteId, custId, disObject, ReadyToSync }) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const token = store.getState().login.loginToken;
    let state = store.getState();
    let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");



    let ShoppingCartItems = [];

    let itemQuoteTotal = 0;

    let count = 0;
    items.map((item) => {

      let discountType = 'F';



      if (disObject[count]) {
        if (disObject[count].value == '%') discountType = '%';





        ShoppingCartItems.push({
          "CartItemID": 0,// zero 0
          "SKUID": item.id,
          "SKUUnits": item.quantity,
          "CartItemText": item.priceOption,
          "CartItemUnitListPrice": item.unitPrice,
          "CartItemUnitPrice": item.unitPrice,
          "CartItemUnitDiscount": 0,
          "CartItemPrice": item.totalPrice,
          "CartItemDiscountRate": disObject[count].lineDiscountRate,
          "CartItemPriceLine": item.priceLine,
          "CartItemLineTax": item.totalTax,
          "cartItemNote": item.lineNote,
          "CartItemBackCard": item.backingCard,

          "CartItemQuoteLineDiscount": disObject[count].lineDiscount,
          "CartItemQuoteLineDiscountType": discountType,
          "CartItemQuoteYourPrice": disObject[count].quotedPrice
        });

        itemQuoteTotal = itemQuoteTotal + parseFloat(disObject[count].quotedPrice) || 0;

        ++count;

      }else{
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
          "cartItemNote": item.lineNote,
          "CartItemBackCard": item.backingCard,
          "CartItemQuoteLineDiscount": 0,
          "CartItemQuoteLineDiscountType": discountType,
          "CartItemQuoteYourPrice": item.quantity * item.unitPrice
        });

        itemQuoteTotal = itemQuoteTotal + parseFloat(item.quantity * item.unitPrice) || 0;

      }





      console.log('item=-------', item);




    });




    if (ReadyToSync) {
      cartMode = 'Cart';
    }

    if (cartMode == 'Editing Quote') {

      var raw = JSON.stringify({
        "QuoteAction": "edit",
        "ShoppingCartID": quoteId,
        "ShoppingCartUserID": loggedInUserID,
        "ShoppingCartCurrencyID": 1, // ask chamila
        "ShoppingCartCustomerID": custId,
        "ShoppingCartNote": quoteLabel,
        "ShoppingCartItems": ShoppingCartItems,
        "Quote": {
          "ItemCustomerID": custId,
          "ItemQuoteTotal": itemQuoteTotal,
          "ItemQuoteDelivery": 0 // ask chamila
        }
      });

    }else{
      var raw = JSON.stringify({
        "QuoteAction": "add",
        "ShoppingCartUserID": loggedInUserID,
        "ShoppingCartCurrencyID": 1, // ask chamila
        "ShoppingCartCustomerID": custId,
        "ShoppingCartNote": quoteLabel,
        "ShoppingCartItems": ShoppingCartItems,
        "Quote": {
          "ItemCustomerID": custId,
          "ItemQuoteTotal": itemQuoteTotal,
          "ItemQuoteDelivery": 0 // ask chamila
        }
      });

    }




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
          resolve({ status: 'Success', body: response });
        }else{
          resolve({ status: 'Error', body: response });
        }

      })
      .catch(error => resolve({ status: 'Error', body: error }));


  });
}

export default SaveQuoteAPI;



