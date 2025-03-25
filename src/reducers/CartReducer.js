import _ from 'lodash';
import { showMessage } from "react-native-flash-message";

const INITIAL_STATE = {
  items: [],
  carts: {}, // DO NOT reset at logout
  pictorialPacketDiscount: null,
  openPollinatedDiscount: null,
  f1f2Discount: null,
  mail_order: null,
  discountSW: false,
  discountPerNum: '0'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      // showMessage({
      //   message: "KINGS SEEDS",
      //   description: "Items added to the cart",
      //   type: "success",
      //   autoHide: true,
      // });

      console.log("ADD_ITEM_TO_CART");
      state.carts[action.payload.user + "_" + action.payload.store] = [...action.payload.cartItems]; // keep active carts per user per store
      return {...state, items: [...action.payload.cartItems], carts: {...state.carts}}; //recreate item array and carts object to avoid the redux store mutating without and re renders

      case "UPDATE_ITEM_QTY_CART":
        console.log("UPDATE_ITEM_QTY_CART");

        state.carts[action.payload.user + "_" + action.payload.store] = [...action.payload.cartItems]; // keep active carts per user per store
        return {...state, items: [...action.payload.cartItems], carts: {...state.carts}}; //recreate item array and carts object to avoid the redux store mutating without and re renders

      case "UPDATE_ITEM_TAX_CART":
        console.log("UPDATE_ITEM_TAX_CART");
        state.carts[action.payload.user + "_" + action.payload.store] = [...action.payload.cartItems]; // keep active carts per user per store
        return {...state, items: [...action.payload.cartItems], carts: {...state.carts}}; //recreate item array and carts object to avoid the redux store mutating without and re renders

    case "REMOVE_ITEM_FROM_CART":
      console.log("REMOVE_ITEM_FROM_CART");
      state.carts[action.payload.user + "_" + action.payload.store] = [...action.payload.cartItems]; // keep active carts per user per store
      return {...state, items: [...action.payload.cartItems], carts: {...state.carts}}; //recreate item array and carts object to avoid the redux store mutating without and re renders

    case "RECALCULATE_CART":
      console.log("RECALCULATE_CART");
      state.carts[action.payload.user + "_" + action.payload.store] = [...action.payload.cartItems]; // keep active carts per user per store
      return {...state, items: [...action.payload.cartItems], carts: {...state.carts}}; //recreate item array and carts object to avoid the redux store mutating without and re renders

    case "CLEAR_CART":
      console.log("CLEAR_CART");
      state.carts[action.payload.user + "_" + action.payload.store] = [];
      return {...state, items: [], carts: {...state.carts}, discountSW: false, discountPerNum: '0'};

    case "SET_DISCOUNTS":
      console.log('@@@@ setting discounts')
      return {
        ...state,
        pictorialPacketDiscount: action.payload.pictorialPacketDiscount,
        openPollinatedDiscount: action.payload.openPollinatedDiscount,
        f1f2Discount: action.payload.f1f2Discount,
        mail_order: action.payload.mail_order
      }

    case "SET_STORE_DISCOUNT_OVERRIDE":
      console.log('SET_STORE_DISCOUNT_OVERRIDE')
      return {
        ...state,
        discountSW: action.payload.discountSW,
        discountPerNum: action.payload.discountPerNum
      }

    case 'SIGN_OUT':
      return {
        ...state,
        items: [],
        pictorialPacketDiscount: null,
        openPollinatedDiscount: null,
        f1f2Discount: null,
        mail_order: null,
        discountSW: false,
        discountPerNum: '0'
      };

    default:
      return state;
  }
};
