import _ from "lodash";
import {GetDecimal, GetInteger} from "../utils/ValidationHelper";
import {GetCustomFormattedValue, GetProductLinePricing} from '../offline/Services/ProductHelper';
import { showMessage } from "react-native-flash-message";
import { GetProductLinePricing_V2 } from "../offline/Services/ProductHelperv2";


export const addToCart = (payload) => async (dispatch, getState) => {
  let state = getState();
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  let itemsArray = [...state.cart.items];

  let disableStdDiscount = 1;
  if (state.cart.discountSW === true) {
    disableStdDiscount = 0;
  }

  let overrideDiscount = parseFloat(state.cart.discountPerNum) || 0;

  let isOrderingMode = false;

  itemsArray.map((cartItem => {
    // console.log(cartItem.actionMode);
    if (cartItem.actionMode == 'ORDER QUOTE') {
      isOrderingMode = true;
    }
  }));

  if (!isOrderingMode) {
    for (let index = 0; index < payload.cartItems.length; index++) {
      let i = payload.cartItems[index];

      if (i.quantity > 0) {

        let bc = false;
        if(i.backCard == true){
          bc= true
        }

        let existingItemIndex = _.findIndex(itemsArray, {skuid: i.skuid, priceLine: i.priceLine});
        if (existingItemIndex < 0) {
          itemsArray.push({
            id: i.skuid,
            actionMode: i?.actionMode,
            preSeason: i?.preSeason,
            name: i.skuName,
            productNumber: i.skuNumber,
            skuPackSize: i.skuPackSize,
            priceOption: i.priceOptions[i.priceLine]?.label,
            unitPrice: i.priceOptions[i.priceLine]?.price,
            backingCard:bc,
            ...i
          })

        } else {

          itemsArray[existingItemIndex].quantity = GetInteger(itemsArray[existingItemIndex].quantity) + GetInteger(i.quantity);


          let tot = GetDecimal(itemsArray[existingItemIndex].priceOptions[i.priceLine].price) * GetInteger(itemsArray[existingItemIndex].quantity); // fallback
          let tax = GetDecimal(itemsArray[existingItemIndex].totalTax); // fallback
          let uPrice = GetDecimal(itemsArray[existingItemIndex].priceOptions[i.priceLine].price); // fallback


          itemsArray[existingItemIndex].totalPrice = tot;
          itemsArray[existingItemIndex].totalTax = tax;
          itemsArray[existingItemIndex].unitPrice = uPrice;
          itemsArray[existingItemIndex].priceOptions[i.priceLine].price = uPrice;
          itemsArray[existingItemIndex].priceOptions[i.priceLine].priceDisplay = await GetCustomFormattedValue(uPrice);
        }
      }
    }

    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< new logic <<<<<<<<<<<<<<<<<<<<<<< */
    if (itemsArray.length > 0) {
      // try {


      linePricing = await GetProductLinePricing_V2(itemsArray, disableStdDiscount, overrideDiscount);

      console.log('-------------------------------------------------------------fffff---');
      console.log(linePricing);
      // } catch (error) {
      //   console.error("Error getting product line pricing: ", error);


      // }



      for (let i = 0; i < itemsArray.length; i++) {
        let item = itemsArray[i];

        if (linePricing[item.skuNumber + "_" + item.priceLine] != undefined) {
          let priceObj = linePricing[item.skuNumber + "_" + item.priceLine];

          console.log('---------------sdgsg-------------------------------------------------');
          console.log(priceObj);
          item.totalPrice = priceObj.LinePrice;
          item.totalTax = priceObj.LineTax;
          item.unitPrice = priceObj.UnitPrice;
          item.priceOptions[item.priceLine].price = priceObj.UnitPrice;
          item.priceOptions[item.priceLine].priceDisplay = await GetCustomFormattedValue(priceObj.UnitPrice);
        }
      }
    }
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end new logic >>>>>>>>>>>>>>>>>>>>>>> */

    dispatch({type: 'SET_ORDER_NOTES', payload: payload.orderNotes});
    dispatch({type: 'ADD_ITEM_TO_CART', payload: {cartItems: itemsArray, user: loggedInUserID, store: customerId}});

  }else{
    showMessage({
      message: "KINGS SEEDS",
      description: "Sorry, there is an active quote in ordering mode, please complete it first / exit from quote mode",
      type: "warning",
      autoHide: true,
    });
  }

  return true;
}

export const removeItem = (indexArray) => async (dispatch, getState) => {
  let state = getState();
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  let itemsArray = [...state.cart.items];

  _.pullAt(itemsArray, indexArray);

  dispatch({type: 'REMOVE_ITEM_FROM_CART', payload: {cartItems: itemsArray, user: loggedInUserID, store: customerId}})
}

export const updateQty = (cartItem) => async (dispatch, getState) => {



  let state = getState();
  let temp = state.cart.items;


  let disableStdDiscount = 1;
  if (state.cart.discountSW === true) {
    disableStdDiscount = 0;
  }


  let overwriteDiscount = parseFloat(state.cart.discountPerNum) || 0;
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;


  let itemsArray = [...state.cart.items];



  let existingItemIndex = _.findIndex(itemsArray, {
    skuid: cartItem.skuid,
    priceLine: cartItem.priceLine
  });







  if (existingItemIndex >= 0) {


    // console.log(itemsArray[existingItemIndex].quantity, cartItem.quantity);
    let qty = GetInteger(cartItem.quantity);
    if (qty > 0) {
      itemsArray[existingItemIndex].quantity = qty;
      // calculate new price according to new quantity


      let tot = GetDecimal(itemsArray[existingItemIndex].priceOptions[cartItem.priceLine].price) * GetInteger(itemsArray[existingItemIndex].quantity); // fallback
      let tax = GetDecimal(itemsArray[existingItemIndex].totalTax); // fallback
      let uPrice = GetDecimal(itemsArray[existingItemIndex].priceOptions[cartItem.priceLine].price); // fallback



      try {


        let linePricing = await GetProductLinePricing(itemsArray[existingItemIndex].skuNumber, itemsArray[existingItemIndex].priceLine, itemsArray[existingItemIndex].quantity, disableStdDiscount, overwriteDiscount);

        tot = linePricing.LinePrice;
        tax = linePricing.LineTax;
        uPrice = linePricing.UnitPrice;
      } catch (e) {
        console.log("GetProductLinePricing Error... ", e);
      }

      const ff = await GetCustomFormattedValue(uPrice);

      itemsArray[existingItemIndex].totalPrice = tot;
      itemsArray[existingItemIndex].totalTax = tax;
      itemsArray[existingItemIndex].unitPrice = uPrice;
      itemsArray[existingItemIndex].priceOptions[cartItem.priceLine].price = uPrice;
      itemsArray[existingItemIndex].priceOptions[cartItem.priceLine].priceDisplay = await GetCustomFormattedValue(uPrice);
    } else {
      _.pullAt(itemsArray, existingItemIndex);
    }
  }



  dispatch({type: 'UPDATE_ITEM_QTY_CART', payload: {cartItems: itemsArray, user: loggedInUserID, store: customerId}})

  return true;
}

export const clearCart = () => async (dispatch, getState) => {
  let state = getState();
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  dispatch({type: 'CLEAR_CART', payload: {user: loggedInUserID, store: customerId}})
}

export const recalculateCart = (cartDisableStdDiscount, cartOverwriteDiscount, discountObject = []) => async (dispatch, getState) => {
   let disableStdDiscount = 1;
  if (cartDisableStdDiscount == true) {
    disableStdDiscount = 0;
  }

  let overrideDiscount = parseFloat(cartOverwriteDiscount) || 0;

  let state = getState();
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  let itemsArray = [...state.cart.items];

  for (let index = 0; index < itemsArray.length; index++) {
    let i = itemsArray[index];

    // calculate new price according to new quantity
    let tot = GetDecimal(itemsArray[index].priceOptions[itemsArray[index].priceLine].price) * GetInteger(itemsArray[index].quantity); // fallback
    let tax = GetDecimal(itemsArray[index].totalTax); // fallback
    let uPrice = GetDecimal(itemsArray[index].priceOptions[itemsArray[index].priceLine].price); // fallback

    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< old logic <<<<<<<<<<<<<<<<<<<<<<< */
    // try {
    //   let linePricing = await GetProductLinePricing(itemsArray[index].skuNumber, itemsArray[index].priceLine, itemsArray[index].quantity, disableStdDiscount, overrideDiscount);
    //   tot = linePricing.LinePrice;
    //   tax = linePricing.LineTax;
    //   uPrice = linePricing.UnitPrice;
    // } catch (e) {
    //   console.log("GetProductLinePricing Error... ", e);
    // }
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end old logic >>>>>>>>>>>>>>>>>>>>>>> */

    itemsArray[index].totalPrice = tot;
    itemsArray[index].totalTax = tax;
    itemsArray[index].unitPrice = uPrice;
    itemsArray[index].priceOptions[itemsArray[index].priceLine].price = uPrice;
    itemsArray[index].priceOptions[itemsArray[index].priceLine].priceDisplay = await GetCustomFormattedValue(uPrice);
  }

  /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< new logic <<<<<<<<<<<<<<<<<<<<<<< */
  if (itemsArray.length > 0) {
    let linePricing = await GetProductLinePricing_V2(itemsArray, disableStdDiscount, overrideDiscount, discountObject);

    for (let i = 0; i < itemsArray.length; i++) {
      let item = itemsArray[i];

      if (linePricing[item.skuNumber + "_" + item.priceLine] != undefined) {
        let priceObj = linePricing[item.skuNumber + "_" + item.priceLine];

        item.totalPrice = priceObj.LinePrice;
        item.totalTax = priceObj.LineTax;
        item.unitPrice = priceObj.UnitPrice;
        item.priceOptions[item.priceLine].price = priceObj.UnitPrice;
        item.priceOptions[item.priceLine].priceDisplay = await GetCustomFormattedValue(priceObj.UnitPrice);

        if (priceObj.QuotePrice > 0) {
          item.totalTax = priceObj.QuoteTax;
        }
      }
    }
  }
  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end new logic >>>>>>>>>>>>>>>>>>>>>>> */

  dispatch({ type: 'RECALCULATE_CART', payload: { cartItems: itemsArray, user: loggedInUserID, store: customerId } })

  return true;
}

export const updateBackingCard = (cartItem) => async (dispatch, getState) => {
  let state = getState();
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  let itemsArray = [...state.cart.items];

  let existingItemIndex = _.findIndex(itemsArray, {
    skuid: cartItem.skuid,
    priceLine: cartItem.priceLine
  });


  if(existingItemIndex >=0){
    itemsArray[existingItemIndex].backingCard = cartItem.checkVal;
  }

  dispatch({type: 'UPDATE_ITEM_QTY_CART', payload: {cartItems: itemsArray, user: loggedInUserID, store: customerId}})
}


export const updateTax = (cartItem) => async (dispatch, getState) => {
  let state = getState();
  let customerId = state.findStore?.adminCustomerID ?? null;
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  let itemsArray = [...state.cart.items];

  let existingItemIndex = _.findIndex(itemsArray, {
    skuid: cartItem.skuid,
    priceLine: cartItem.priceLine
  });

  // console.log(cartItem.totalTax);
  if(existingItemIndex >=0){
    itemsArray[existingItemIndex].totalTax = cartItem.totalTax;
  }

  dispatch({type: 'UPDATE_ITEM_QTY_CART', payload: {cartItems: itemsArray, user: loggedInUserID, store: customerId}})
}

export const updateStoreDiscountOverride = (discountSW, discountPerNum) => async (dispatch, getState) => {
  dispatch({ type: 'SET_STORE_DISCOUNT_OVERRIDE', payload: { discountSW, discountPerNum } })
}
