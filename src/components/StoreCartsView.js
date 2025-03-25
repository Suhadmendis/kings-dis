import React, { Component, useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Styles from "../style/StoreCartsStyle";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/CartActions";
import StyleSheet from "react-native-media-query";
import {Dropdown} from "react-native-element-dropdown";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import _ from "lodash";
import { useIsFocused } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { ConfirmDialog } from "react-native-simple-dialogs";

import DataAdapter from "../offline/localData/DataAdapter";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import NoteToggleButton from "./helperComponents/NoteToggleButoon";
import ConfirmationBox from "./common/ConfirmationBox";
import {GetCustomFormattedValue, GetProductLinePricing, checkCartQty} from '../offline/Services/ProductHelper';
import {GetBoolean, GetDecimal, GetInteger} from '../utils/ValidationHelper';
import {RawQuery} from '../offline/Services/DataHelper';
import { checkAdminRole } from '../offline/Services/UserHelper';
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../offline/Services/UserHelper";
import insertContactAPI from "./contacts/insertContactAPI";
import * as colors from '../style/Common/ColorsStyle';
import sendEmail from './savedCart/sendEmail';
import sendConEmail from './contact/sendEmail';
import { EmailValidation, ContactNumberValidation } from "../utils/ValidationHelper";
import { CheckQuntities } from "./CartOperation/CheckQuntities";


const carticn = require("../assets/cartplus2xWhite.png");
const edticon = require("../assets/editline2xgreen.png");
const emailicon = require("../assets/StoreQuotes/email.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const noteIcon = require("../assets/notesIcon.png");



const StoreCartsView = (props) => {


  const { navigation, cartId, cartName } = props;

  const [token, setToken] = useState("blank");
  const [changed, setChanged] = useState(true);

  const dispatch = useDispatch();

  const [subCarts, setSubCarts] = useState([]);
  const [cart, setCart] = useState([]);
  const [allow, setAllow] = useState(false);
  // const [cartId, setCartId] = useState([]);

//dialog box
  const [showdialog, setShowdialog] = useState(false);
  const [deleteYes, setDeleteYes] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [contentText, setContentText] = useState("");
  const [btnName, setBtnName] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [emailDropdownVisibility, setEmailDropdownVisibility] = useState(false);
  const [addContactFormVisibility, setAddContactFormVisibility] = useState(false);

  const [customerEmails, setCustomerEmails] = useState(null);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState(null);

  const [unavailableItemsDialogBoxVisibility, setUnavailableItemsDialogBoxVisibility] = useState(false);
  const [unavailableItems, setUnavailableItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const tokn = useSelector((state) => state.login?.loginToken);

  const userId = useSelector((state) => state.login?.accountInfo?.customerUserID);

  const cartItems = useSelector(s => s.cart.items);

  const adminCustomerID = useSelector((state) => state.findStore?.adminCustomerID);

  const { connectionStatus } = useSelector((s) => s.loading);

  const noteVisibility = (visibility, id) => {
       let ei = _.findIndex(subCarts, {
      CartItemID: id,
    });

    let val =  subCarts[ei].noteExpand;

    subCarts[ei].noteExpand = !val;
    let c_ = changed;
    setChanged(!c_)
    // console.log(subCarts);
    setSubCarts(subCarts)
  }

  useEffect(() => {
    setToken(tokn);
    setSubCarts([]);
    getEmails();
    checkRoles();

    initialMainCart(cartId).then(res => {
       setCart(res);
    });

    initial(cartId).then(res => {
      let array= [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        let obj ={
          ...element,
          noteExpand: true
        }
        array.push(obj)
      }
      console.log(array.length);
      setSubCarts(array);

   });


  }, [isFocused]);

  useEffect(() => {

  }, [changed]);

  async function checkRoles(){
    const isUserExist = await checkAdminRole();

    if(isUserExist){
      setAllow(true)
    }
  }


  async function getEmails(){

    let id = 1;
    let contactsAry = []
    getCustomerAddresses().then(res => {

      res.map(element => {
        contactsAry.push({
          id,
          email: element.CustomerEmail
        })
        ++id;
      })

      getCustomerContacts(adminCustomerID).then(ress => {
        ress.map(element => {
          contactsAry.push({
            id,
            email: element.email
          })
          ++id;
        })

        // console.log('customerEmails',contactsAry);
        setSelectedCustomerEmail(contactsAry[0]);
        setCustomerEmails(contactsAry);

      });






    })
  }


  getCartItemTotal = () => {

    let total = 0;
    cartItems.map(item => {
      total = total + item.totalPrice;
    });

    return total;
  }

  addToEditingMode = async () => {
    let itemsToAdd = [];
    let unavailableItems = [];

    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< new logic <<<<<<<<<<<<<<<<<<<<<<< */
    let skuValidity = {};
    let skuIds = [];
    for (let i = 0; i < subCarts.length; i++) {
      let subCart = subCarts[i];

      if (!skuIds.includes(subCart.SKUID)) {
        skuIds.push(subCart.SKUID);
      }

      skuValidity[subCart.SKUID] = {
        availability: false,
        allowCategory: false
      };
    }

    let sku = await RawQuery(`SELECT SKUID,SKUEnabled,SKUAvailableItems,Nav_Navigation
    FROM local_com_sku
    INNER JOIN local_int_navigation
    ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
    WHERE SKUID IN (${skuIds.join()})`);
    if (sku != "") {
      for (let i = 0; i < sku.length; i++) {
        skuValidity[sku.item(i).SKUID].availability = GetBoolean(sku.item(i).SKUEnabled) && GetInteger(sku.item(i).SKUAvailableItems) > 0;
        skuValidity[sku.item(i).SKUID].allowCategory = IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => sku.item(i).Nav_Navigation.includes(cat));
      }
    }

    for (let i = 0; i < subCarts.length; i++) {
      let subCart = subCarts[i];

      if (skuValidity[subCart.SKUID].availability && skuValidity[subCart.SKUID].allowCategory) {
        let tot = GetDecimal(subCart.CartItemUnitPrice) * GetInteger(subCart.SKUUnits); // fallback
        let tax = 0; // fallback
        let uPrice = GetDecimal(subCart.CartItemUnitPrice); // fallback

        let bc = false;
        if (parseInt(subCart.CartItemBackCard) == '1') {
          bc = true;
        }

        const product = {
          skuid: subCart.SKUID,
          skuName: subCart.SKUName,
          skuNumber: subCart.SKUNumber,
          skuPackSize: subCart.SKUPackSize,
          priceOptions: {},
          preSeason: GetBoolean(cart[0].AppShoppingCartPreSeason),
          actionMode: 'EDITING CART',
          cartId: cartId,
          cartName: cartName,
          skuDiscountCat: subCart.SkuDiscountCat,
          cartItemNote: subCart.CartItemNote,
          priceLine: subCart.CartItemPriceLine,
          quantity: subCart.SKUUnits,
          totalPrice: tot,
          totalTax: tax,
          backCard: bc,
          ReadyToSync: cart[0].ReadyToSync
        };
        product.priceOptions[subCart.CartItemPriceLine] = {
          label: subCart.CartItemText,
          price: uPrice,
          priceDisplay: await GetCustomFormattedValue(uPrice)
        }

        itemsToAdd.push(product);
      } else {
        unavailableItems.push(subCart.SKUID);
      }
    }
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end new logic >>>>>>>>>>>>>>>>>>>>>>> */

    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< old logic <<<<<<<<<<<<<<<<<<<<<<< */
    // for (let i = 0; i < subCarts.length; i++) {
    //   let subCart = subCarts[i];


    //   let availability;
    //   let allowCategory;
    //   let sku = await RawQuery(`SELECT SKUEnabled,SKUAvailableItems,Nav_Navigation
    //   FROM local_com_sku
    //   INNER JOIN local_int_navigation
    //   ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
    //   WHERE SKUID = ${subCart.SKUID}`);
    //   if (sku != "") {
    //     availability = GetBoolean(sku.item(0).SKUEnabled) && GetInteger(sku.item(0).SKUAvailableItems) > 0;
    //     allowCategory = IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => sku.item(0).Nav_Navigation.includes(cat));
    //   } else {
    //     availability = false;
    //     allowCategory = false;
    //   }

    //   if (availability && allowCategory) {
    //     let tot = GetDecimal(subCart.CartItemUnitPrice) * GetInteger(subCart.SKUUnits); // fallback
    //     let tax = 0; // fallback
    //     let uPrice = GetDecimal(subCart.CartItemUnitPrice); // fallback
    //     try {
    //       let linePricing = await GetProductLinePricing(subCart.SKUNumber, subCart.CartItemPriceLine, subCart.SKUUnits);
    //       tot = linePricing.LinePrice;
    //       tax = linePricing.LineTax;
    //       uPrice = linePricing.UnitPrice;
    //     } catch (e) {
    //       console.log("GetProductLinePricing Error... ", e);
    //     }

    //     let bc = false;
    //     if(parseInt(subCart.CartItemBackCard) == '1'){
    //       bc= true
    //     }
    //     const product = {
    //       skuid: subCart.SKUID,
    //       skuName: subCart.SKUName,
    //       skuNumber: subCart.SKUNumber,
    //       skuPackSize: subCart.SKUPackSize,
    //       priceOptions: {},
    //       preSeason: GetBoolean(cart[0].AppShoppingCartPreSeason),
    //       actionMode: 'EDITING CART',
    //       cartId: cartId,
    //       cartName: cartName,
    //       skuDiscountCat: subCart.SkuDiscountCat,
    //       cartItemNote: subCart.CartItemNote,
    //       priceLine: subCart.CartItemPriceLine,
    //       quantity: subCart.SKUUnits,
    //       totalPrice: tot,
    //       totalTax: tax,
    //       backCard: bc,
    //       ReadyToSync: cart[0].ReadyToSync
    //     };
    //     product.priceOptions[subCart.CartItemPriceLine] = {
    //       label: subCart.CartItemText,
    //       price: uPrice,
    //       priceDisplay: await GetCustomFormattedValue(uPrice)
    //     }
    //     console.log("product... ", product);

    //     itemsToAdd.push(product);
    //   } else {
    //     unavailableItems.push(subCart.SKUID);
    //   }
    // }
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end old logic >>>>>>>>>>>>>>>>>>>>>>> */


    if (unavailableItems.length === subCarts.length) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'All the items are unavailable and not added to the cart.',
        type: 'warning',
        autoHide: true,
      });
    } else if (unavailableItems.length > 0) {
      showMessage({
        message: 'KINGS SEEDS',
        description: `${unavailableItems.length} items are unavailable and not added to the cart.`,
        type: 'warning',
        autoHide: true,
      });
    }

    if (itemsToAdd.length > 0) {
      // can use 'await props.addToCart' if we want to wait till addToCart is completed
      props.addToCart({
        cartItems: itemsToAdd
      });

      navigation.navigate("carts");
    }

    closeConfirmation();
  }

  checkUnavailableItems = async () => {

    let itemsToAdd = [];
    let unavailableItems = [];

    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< new logic <<<<<<<<<<<<<<<<<<<<<<< */
    let skuValidity = {};
    let skuIds = [];
    for (let i = 0; i < subCarts.length; i++) {
      let subCart = subCarts[i];

      if (!skuIds.includes(subCart.SKUID)) {
        skuIds.push(subCart.SKUID);
      }

      skuValidity[subCart.SKUID] = {
        availability: false,
        allowCategory: false
      };
    }

    // let sku = await RawQuery(`SELECT SKUID,SKUEnabled,SKUAvailableItems,Nav_Navigation
    // FROM local_com_sku
    // INNER JOIN local_int_navigation
    // ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
    // WHERE SKUID IN (${skuIds.join()})`);
    // if (sku != "") {
    //   console.log('sku', sku);
    //   for (let i = 0; i < sku.length; i++) {

    //     skuValidity[sku.item(i).SKUID].availability = GetBoolean(sku.item(i).SKUEnabled) && GetInteger(sku.item(i).SKUAvailableItems) > 180;
    //     skuValidity[sku.item(i).SKUID].allowCategory = IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => sku.item(i).Nav_Navigation.includes(cat));
    //   }
    // }

    for (let i = 0; i < subCarts.length; i++) {
      let subCart = subCarts[i];

      if ((IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => subCart.Nav_Navigation.includes(cat))) &&
      GetBoolean(subCart.SKUEnabled) && GetInteger(subCart.SKUAvailableItems) > 0) {


        let tot = GetDecimal(subCart.CartItemUnitPrice) * GetInteger(subCart.SKUUnits); // fallback
        let tax = 0; // fallback
        let uPrice = GetDecimal(subCart.CartItemUnitPrice); // fallback

        let bc = false;
        if (parseInt(subCart.CartItemBackCard) == '1') {
          bc = true;
        }

        const product = {
          skuid: subCart.SKUID,
          skuName: subCart.SKUName,
          skuNumber: subCart.SKUNumber,
          skuPackSize: subCart.SKUPackSize,
          priceOptions: {},
          preSeason: false,
          skuDiscountCat: subCart.SkuDiscountCat,
          priceLine: subCart.CartItemPriceLine,
          quantity: subCart.SKUUnits,
          totalPrice: tot,
          totalTax: tax,
          cartItemNote: subCart.CartItemNote,
          backCard: bc
        };
        product.priceOptions[subCart.CartItemPriceLine] = {
          label: subCart.CartItemText,
          price: uPrice,
          priceDisplay: await GetCustomFormattedValue(uPrice)
        }

        itemsToAdd.push(product);
      } else {
        unavailableItems.push(subCart.SKUID);
      }
    }








    if (connectionStatus) {
      unavailableItems = [];


      let checkedQty = await checkCartQty(subCarts);
      unavailableItems = checkedQty.filter(item => item.availability == false);


      // const product_availability = await CheckQuntities(subCarts);
      // const checkBalance = product_availability.map(availabilityElements => {
      //   const getItem = subCarts.filter(element => element.SKUNumber == availabilityElements.code);

      //   let balanceQty = availabilityElements.availableQty - getItem[0].SKUUnits;
      //   if (availabilityElements.availability == false) {
      //     return {
      //       ...availabilityElements,
      //       balanceQty
      //     };
      //   }else{
      //     return {
      //       ...availabilityElements,
      //       balanceQty: balanceQty < 0 ? false : true
      //     }
      //   }
      // });
      // const filteredUnavailableItems = product_availability.filter(availabilityElements => availabilityElements.availability == false);
      // const filteredUnavailableItemIds = filteredUnavailableItems.map(unAvailabilityElements => unAvailabilityElements.code);

      // setUnavailableItems(filteredUnavailableItemIds);
    }else{
      setUnavailableItems(unavailableItems);
    }



setUnavailableItems(unavailableItems);


    return unavailableItems;
  }

  getOnlyIds = () => {
    const ids = subCarts.map(item => item.SKUNumber);
    return ids;
  }




  addItemsToCart = async () => {
    let itemsToAdd = [];
    let collectUnavailableItems = [];


    if (connectionStatus) {
      const ids = getOnlyIds();
      const itemsAvailability = await CheckQuntities(ids);


      for (let i = 0; i < subCarts.length; i++) {
        let subCart = subCarts[i];



        const availability = itemsAvailability.filter(unavailabilityElement => unavailabilityElement.code == subCart.SKUNumber);
        if (availability[0].availability) {

          let qty = 0;
          if (availability[0].availableQty - subCart.SKUUnits >= 0) {
            qty = subCart.SKUUnits;
          }else{
            qty = availability[0].availableQty;
          }


          let tot = GetDecimal(subCart.CartItemUnitPrice) * GetInteger(subCart.SKUUnits); // fallback
          let tax = 0; // fallback
          let uPrice = GetDecimal(subCart.CartItemUnitPrice); // fallback

          let bc = false;
          if (parseInt(subCart.CartItemBackCard) == '1') {
            bc = true;
          }

          const product = {
            skuid: subCart.SKUID,
            skuName: subCart.SKUName,
            skuNumber: subCart.SKUNumber,
            skuPackSize: subCart.SKUPackSize,
            priceOptions: {},
            preSeason: false,
            skuDiscountCat: subCart.SkuDiscountCat,
            priceLine: subCart.CartItemPriceLine,
            quantity: qty,
            totalPrice: tot,
            totalTax: tax,
            cartItemNote: subCart.CartItemNote,
            backCard: bc
          };
          product.priceOptions[subCart.CartItemPriceLine] = {
            label: subCart.CartItemText,
            price: uPrice,
            priceDisplay: await GetCustomFormattedValue(uPrice)
          }

          itemsToAdd.push(product);
        } else {
          collectUnavailableItems.push(subCart.SKUID);
        }
      }




    }else{
      let skuValidity = {};
      let skuIds = [];
      for (let i = 0; i < subCarts.length; i++) {
        let subCart = subCarts[i];

        if (!skuIds.includes(subCart.SKUID)) {
          skuIds.push(subCart.SKUID);
        }

        skuValidity[subCart.SKUID] = {
          availability: false,
          allowCategory: false
        };
      }

      let sku = await RawQuery(`SELECT SKUID,SKUEnabled,SKUAvailableItems,Nav_Navigation
      FROM local_com_sku
      INNER JOIN local_int_navigation
      ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
      WHERE SKUID IN (${skuIds.join()})`);
      if (sku != "") {
        for (let i = 0; i < sku.length; i++) {
          skuValidity[sku.item(i).SKUID].availability = GetBoolean(sku.item(i).SKUEnabled) && GetInteger(sku.item(i).SKUAvailableItems) > 0;
          skuValidity[sku.item(i).SKUID].allowCategory = IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => sku.item(i).Nav_Navigation.includes(cat));
        }
      }

      for (let i = 0; i < subCarts.length; i++) {
        let subCart = subCarts[i];

        if (skuValidity[subCart.SKUID].availability && skuValidity[subCart.SKUID].allowCategory) {
          let tot = GetDecimal(subCart.CartItemUnitPrice) * GetInteger(subCart.SKUUnits); // fallback
          let tax = 0; // fallback
          let uPrice = GetDecimal(subCart.CartItemUnitPrice); // fallback

          let bc = false;
          if (parseInt(subCart.CartItemBackCard) == '1') {
            bc = true;
          }

          const product = {
            skuid: subCart.SKUID,
            skuName: subCart.SKUName,
            skuNumber: subCart.SKUNumber,
            skuPackSize: subCart.SKUPackSize,
            priceOptions: {},
            preSeason: false,
            skuDiscountCat: subCart.SkuDiscountCat,
            priceLine: subCart.CartItemPriceLine,
            quantity: subCart.SKUUnits,
            totalPrice: tot,
            totalTax: tax,
            cartItemNote: subCart.CartItemNote,
            backCard: bc
          };
          product.priceOptions[subCart.CartItemPriceLine] = {
            label: subCart.CartItemText,
            price: uPrice,
            priceDisplay: await GetCustomFormattedValue(uPrice)
          }

          itemsToAdd.push(product);
        } else {
          collectUnavailableItems.push(subCart.SKUID);
        }
      }
    }
    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< new logic <<<<<<<<<<<<<<<<<<<<<<< */

    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end new logic >>>>>>>>>>>>>>>>>>>>>>> */


    /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< old logic <<<<<<<<<<<<<<<<<<<<<<< */
    // for (let i = 0; i < subCarts.length; i++) {
    //   let subCart = subCarts[i];


    //   let availability;
    //   let allowCategory;
    //   let sku = await RawQuery(`SELECT SKUEnabled,SKUAvailableItems,Nav_Navigation
    //   FROM local_com_sku
    //   INNER JOIN local_int_navigation
    //   ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
    //   WHERE SKUID = ${subCart.SKUID}`);
    //   if (sku != "") {
    //     availability = GetBoolean(sku.item(0).SKUEnabled) && GetInteger(sku.item(0).SKUAvailableItems) > 0;
    //     allowCategory = IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => sku.item(0).Nav_Navigation.includes(cat));
    //   } else {
    //     availability = false;
    //     allowCategory = false;
    //   }

    //   if (availability && allowCategory) {
    //     let tot = GetDecimal(subCart.CartItemUnitPrice) * GetInteger(subCart.SKUUnits); // fallback
    //     let tax = 0; // fallback
    //     let uPrice = GetDecimal(subCart.CartItemUnitPrice); // fallback
    //     try {
    //       let linePricing = await GetProductLinePricing(subCart.SKUNumber, subCart.CartItemPriceLine, subCart.SKUUnits);
    //       tot = linePricing.LinePrice;
    //       tax = linePricing.LineTax;
    //       uPrice = linePricing.UnitPrice;
    //     } catch (e) {
    //       console.log("GetProductLinePricing Error... ", e);
    //     }

    //     let bc = false;
    //     if(parseInt(subCart.CartItemBackCard) == '1'){
    //       bc= true
    //     }

    //     const product = {
    //       skuid: subCart.SKUID,
    //       skuName: subCart.SKUName,
    //       skuNumber: subCart.SKUNumber,
    //       skuPackSize: subCart.SKUPackSize,
    //       priceOptions: {},
    //       preSeason: false,
    //       skuDiscountCat: subCart.SkuDiscountCat,
    //       priceLine: subCart.CartItemPriceLine,
    //       quantity: subCart.SKUUnits,
    //       totalPrice: tot,
    //       totalTax: tax,
    //       cartItemNote: subCart.CartItemNote,
    //       backCard: bc
    //     };
    //     product.priceOptions[subCart.CartItemPriceLine] = {
    //       label: subCart.CartItemText,
    //       price: uPrice,
    //       priceDisplay: await GetCustomFormattedValue(uPrice)
    //     }
    //     console.log("product... ", product);

    //     itemsToAdd.push(product);
    //   } else {
    //     collectUnavailableItems.push(subCart.SKUID);
    //   }
    // }
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end old logic >>>>>>>>>>>>>>>>>>>>>>> */

    if (collectUnavailableItems.length === subCarts.length) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'All the items are unavailable and not added to the cart.',
        type: 'warning',
        autoHide: true,
      });
    } else if (collectUnavailableItems.length > 0) {
      showMessage({
        message: 'KINGS SEEDS',
        description: `${collectUnavailableItems.length} items are unavailable and not added to the cart.`,
        type: 'warning',
        autoHide: true,
      });
    } else {
      showMessage({
        message: "KINGS SEEDS",
        description: "Items added to cart",
        type: "success",
        autoHide: true,
      });
    }

    if (itemsToAdd.length > 0) {
      // can use 'await props.addToCart' if we want to wait till addToCart is completed
      props.addToCart({
        cartItems: itemsToAdd
      });

      navigation.navigate("carts");
      setUnavailableItemsDialogBoxVisibility(false)
    }

    closeConfirmation();
  }


  deleteCart = () => {


    let isEditingMode = false;
    let isCartIDExsist = '';

      cartItems.map((cartItem => {
        if (cartItem?.cartId) {
          if (cartItem.cartId != '') {
            isCartIDExsist = cartItem.cartId;
          }
        }
        console.log(cartItem);
        if (cartItem.actionMode == 'EDITING CART') {
          isEditingMode = true;
        }
      }));

      closeConfirmation();

      if (cartId == isCartIDExsist) {

        if (isEditingMode) {
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Sorry, you cannot delete this cart / quote as it is been uploaded to the live cart!",
                  type: "warning",
                  autoHide: true,
                });
        }





      }else{
          deleteCartFromDb(cartId).then(res => {

                if (res > 0) {
                  // if deleted
                  navigation.navigate('storeNew', { tab: 4, subTabVal: "" });
                }else{
                  // something went wrong
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "something went wrong",
                    type: "warning",
                    autoHide: true,
                  });
                }

              });

      }






    // navigation.navigate('storeNew', { tab: 4 });


  }

  getCartTotal = () => {

    let tot = 0.00;
    subCarts.map(subCart => {
      tot = tot + parseFloat(subCart.CartItemPrice);
    });

    return tot;
  }

//  "CartItemPrice": 74.3925
//  "ShoppingCartID": 33127 Du
//  "SKUID": 9859,
//  "SKUUnits": 30,
//  "CartItemUnitPrice": 83.265,
//  , "CartItemText": "35 Kg



async function getCustomerAddresses() {

  const payload = {
    section: 'ADDRESS',
    opration: 'GET CUSTOMER ADDRESS EMAILS',
    data: ''
  }

  const states_ = await DataAdapter(payload);
  return states_;
}


async function getCustomerContacts(adminCustomerID) {

  const payload = {
    section: "LOCAL CONTACTS",
    opration: "GET",
    data: { type: "", adminCustomerID },
  };

  const states_ = await DataAdapter(payload);
  return states_;
}


async function addContactAPI(data) {


  const newpro = await insertContactAPI(data);
  console.log(newpro);
  return newpro;
}

  // main operation - get data
  async function initialMainCart(cartId){

    const payload = {
      section: 'CART',
      opration: 'GET MAIN CART',
      data: cartId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }

    // main operation - get data
    async function initial(cartId){

      const payload = {
        section: 'CART',
        opration: 'GET SUB CARTS',
        data: cartId,
      }

      const newpro = await DataAdapter(payload);
      return newpro;
    }


  // main operation - get data
  async function deleteCartFromDb(cartId){

    const payload = {
      section: 'CART',
      opration: 'DELETE LOCAL',
      data: cartId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  async function sendContact(data, token) {


    const newpro = await sendConEmail(data, token);
    return newpro;
  }


  async function send(email){

   setLoading(true);

      const res = await sendEmail(cartId, userId, tokn, email);

      console.log(cartId);

      console.log('fnadsojgnfam');

      console.log(res.error);

      if (res.error == '') {
        setLoading(false)
        showMessage({
          message: "KINGS SEEDS",
          description: "Email Sent Successfully",
          type: "success",
          autoHide: true,
        });
      }else{
        showMessage({
          message: "KINGS SEEDS",
          description: "Something went wrong",
          type: "warning",
          autoHide: true,
        });
      }


      closeConfirmation()


  }



  //confirmation box functions
  deleteFunction_ = (e) => {
    setDeleteItemId(e);
    setBtnName("itemDelete");
    confirmShowHide("Are you sure you want to delete this item?");
  };

  const deleteOrderItem = () => {
    deleteCart();
    closeConfirmation();
  };


  confirmShowHide = (contentTxt) => {
    // console.log(
    //   "----------------------------------------------------------------------------"
    // );
    setShowdialog(!showdialog);
    setContentText(contentTxt);
  };

  closeConfirmation = () => {
    setShowdialog(!showdialog);
    // setContentText(`No Content`);
  };
  //confirmation box functions end


  return (
    <View style={Styles.container}>

<OrientationLoadingOverlay
                  visible={loading}
                  color="white"
                  indicatorSize="large"
                  messageFontSize={24}
                  message="Loading..."
                  />


<ConfirmDialog
        title="Unavailable Items"
        titleStyle={{
          color: "black",
          textAlign: "left",
          fontSize: hp("2"),
          // marginTop:hp('1')
        }}
        animationType="fade"
        dialogStyle={styles.expandedDialogbox}
        buttonsStyle={{
          // backgroundColor:'red',
          color: "red",
        }}
        buttons={{
          title: "YES",
        }}
        visible={unavailableItemsDialogBoxVisibility}
        onTouchOutside={() => setUnavailableItemsDialogBoxVisibility(false)}
      >
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ marginBottom: 20 }}>Below items are not available to order, please press reorder button to proceed without them</Text>


        <ScrollView style={styles.scrollUnavailableList}>
        {
          subCarts.map(item => {


            let exists = unavailableItems.filter(element => element.code == item.SKUNumber);



            if (exists.length > 0) {
              const color = exists[0].balanceQty < 0 ? '#b5b3b3'  : 'black';
              return (
                <View style={{
                  flexDirection: 'row',
                }}>
                  <Text style={{
                  margin: 10, width: 100, color
                  }}>
                    {item.SKUNumber}
                  </Text>
                  <Text style={{
                  margin: 10, color
                  }}>
                    {item.SKUName}
                  </Text>
                </View>
              )
            }



          })
        }

        </ScrollView>

        </View>



          <View style={{ flexDirection: "row", marginTop: hp("1"), zIndex: 1000 }}>
            <TouchableOpacity
              style={{
                height: hp("4.5"),
                width: "49%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f2f2",
                marginRight: "1%",
                borderRadius: 5,
              }}
              onPress={() => {
                setUnavailableItemsDialogBoxVisibility(false)
                // setEmailDropdownVisibility(false);
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "black" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: hp("4.5"),
                width: "49%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DEF9F6",
                marginLeft: "1%",
                borderRadius: 5,
              }}
              onPress={() => {
console.log('finished');
setUnavailableItemsDialogBoxVisibility(false)
                if (cartItems.length > 0) {
                  setBtnName('activeCartAdd');
                  setShowdialog(true);
                  setContentText(
                    `Please confirm you would like to proceed with adding saved cart items to the active cart with${
                      cartItems.length
                    } items`,
                  );
                } else {
                  addItemsToCart();
                  setShowdialog(false);
                }
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>



      </ConfirmDialog>













    <ConfirmDialog
        title="Choose an E-mail Address"
        titleStyle={{
          color: "black",
          textAlign: "left",
          fontSize: hp("2"),

          // marginTop:hp('1')
        }}
        animationType="fade"
        dialogStyle={addContactFormVisibility ? styles.expandedDialogbox : styles.dialogbox}
        buttonsStyle={{
          // backgroundColor:'red',
          color: "red",
        }}
        buttons={{
          title: "YES",
        }}
        visible={emailDropdownVisibility}
        onTouchOutside={() => setEmailDropdownVisibility(false)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.disTextinput}>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={_.filter(customerEmails, (i) => i.email)}
                search={false}
                // selectedTextProps={{ numberOfLines: 1 }}
                activeColor="#e6fff0"
                // maxHeight={
                //   customerEmails.length || 1 * hp("9")
                // }
                labelField="email"
                valueField="id"
                // placeholder={!isFocus2 ? "Select address" : "..."}
                searchPlaceholder="Search..."
                value={selectedCustomerEmail?.id ?? null}
                // onFocus={() => setIsFocus2(true)}
                // onBlur={() => setIsFocus2(false)}
                onChange={(item) => {
                 console.log('fsdfds');
                 console.log(selectedCustomerEmail);
                  setSelectedCustomerEmail({ id: item.id, email: item.email });
                  // console.log("billing...", item);
                  // setIsFocus2(false);
                  // setSelectedBillingAddress(item);
                }}
              />
          </View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity
                style={{
                  height: hp("4.5"),
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#DEF9F6",
                  marginRight: "1%",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setAddContactFormVisibility(!addContactFormVisibility);
                }}
              >
                <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>ADD</Text>
              </TouchableOpacity>
          </View>

        </View>

       { addContactFormVisibility ? (
         <View style={styles.addContactForm}>

            <View style={styles.attributeBox}>
              <Text style={styles.attributeName}>Contact Name</Text>
              <TextInput
                style={styles.attributeInput}
                value={contactName}
                onChangeText={(txt) => setContactName(txt)}
              />
            </View>
            <View style={styles.attributeBox}>
              <Text style={styles.attributeName}>Contact Number</Text>
              <TextInput
                style={styles.attributeInput}
                value={contactNumber}
                onChangeText={(txt) => setContactNumber(txt)}
                keyboardType="numeric"
                maxLength={25}
              />
            </View>
            <View style={styles.attributeBox}>
              <Text style={styles.attributeName}>Email Adddress</Text>
              <TextInput
                style={styles.attributeInput}
                value={contactEmail}
                onChangeText={(txt) => setContactEmail(txt)}
              />
            </View>
            <View style={styles.attributeBox}>
              <TouchableOpacity
                style={{
                  height: hp("4.5"),
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#DEF9F6",
                  marginLeft: "1%",
                  borderRadius: 5,
                }}
                onPress={() => {


                  if (contactName == "") {
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Contact name cannot be empty",
                      type: "warning",
                      autoHide: true,
                    });
                    return;
                  }

                  if (contactNumber == "") {
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Contact number cannot be empty",
                      type: "warning",
                      autoHide: true,
                    });
                    return;
                  }

                  if(contactNumber!= ''){

                    if(!ContactNumberValidation(contactNumber)){
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Contact number is not valid",
                        type: "warning",
                        autoHide: true,
                      });
                      return;
                    }
                  }

                  if(contactEmail != ''){
                    if(!EmailValidation(contactEmail)){
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Email is not valid",
                        type: "warning",
                        autoHide: true,
                      });
                      return;
                    }
                  }

                  let ReadyToSync = 0;
                  if (!connectionStatus) {
                    ReadyToSync = 1;
                  }

                  const data = {
                    name: contactName,
                    number: contactNumber,
                    itemCreatedBy: "",
                    email: contactEmail,
                    addressLine1: "",
                    addressLine2: "",
                    addressLine3: "",
                    city: "",
                    postCode: "",
                    state: "",
                    country: "",
                    countryId: "",
                    jobrole: "",
                    notes: "",
                    adminCustomerID,
                    ReadyToSync

                  };


                  console.log(data);

                  if (connectionStatus) {
                    addContactAPI(data).then(res => {
                      console.log(res);
                      if (res.status == "Success") {
                        sendContact(data, tokn).then((res) => {

                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Contact Added Successfully",
                            type: "success",
                            autoHide: true,
                          });




                          setAddContactFormVisibility(false);

                          let defaultSelection = false;
                          getEmails(defaultSelection, contactEmail);


                          setContactName('');
                          setContactNumber('');
                          setContactEmail('');

                        //   setContactName("");
                        // setAddLine1("");
                        // setAddLine2("");
                        // setAddLine3("");
                        // setCity("");
                        // setState("");
                        // setPostCode("");
                        // setContactNumber("");
                        // setEmail("");
                        // setDrpChenged(false);
                        // setJobrole('');
                        // setNotes('');



                        })
                      }


                   })
                  }

                }}
              >
                <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>Add Contact</Text>
              </TouchableOpacity>
            </View>


         </View>
       ) : null }


          <View style={{ flexDirection: "row", marginTop: hp("1"), zIndex: 1000 }}>
            <TouchableOpacity
              style={{
                height: hp("4.5"),
                width: "49%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f2f2",
                marginRight: "1%",
                borderRadius: 5,
              }}
              onPress={() => {
                setEmailDropdownVisibility(false);
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "black" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: hp("4.5"),
                width: "49%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DEF9F6",
                marginLeft: "1%",
                borderRadius: 5,
              }}
              onPress={() => {
                if (connectionStatus) {
                  console.log(selectedCustomerEmail);
                  console.log(selectedCustomerEmail.email);
                  send(selectedCustomerEmail.email);
                  setEmailDropdownVisibility(false);
                }else{

                  showMessage({
                    message: "KINGS SEEDS",
                    description: "Please check the Network Connection",
                    type: "warning",
                    autoHide: true,
                  })

                }
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>SEND</Text>
            </TouchableOpacity>
          </View>



      </ConfirmDialog>


      {btnName == 'activeCartEdit' ? (
        <ConfirmationBox
          showHide={showdialog}
          yes={() => addToEditingMode()}
          no={() => closeConfirmation()}
          contentText={contentText}
        />
      ) : btnName == 'activeCartAdd' ? (
        <ConfirmationBox
          showHide={showdialog}
          yes={() => this.addItemsToCart()}
          no={() => closeConfirmation()}
          contentText={contentText}
        />
      ) : btnName == 'email' ? (
          <ConfirmationBox
            showHide={showdialog}
            yes={() => send()}
            no={() => closeConfirmation()}
            contentText={contentText}
          />
      ) : contentText != '' ? (
        <ConfirmationBox
          showHide={showdialog}
          yes={() => deleteOrderItem()}
          no={() => closeConfirmation()}
          contentText={contentText}
        />
      ) : null}

      <View style={Styles.titleView}>
        <Text style={Styles.titleTxt} allowFontScaling={false}>
          {cartName}
        </Text>
      </View>
      <View style={{width: '100%', height: '93%', marginTop: hp('1')}}>

        <FlatList
          data={subCarts}
          keyExtractor={(item) => item.CartItemID.toString()}
          contentContainerStyle={{ width: '100%', marginBottom: hp('1') }}
          windowSize={10} // Render 10 screens worth of items
          maxToRenderPerBatch={10} // Render 10 items at a time
          renderItem={({ item }) => (
            <View
              style={[
                styles.footerCardView,
                item.noteExpand ? styles.footerCardViewExpanded : null,
              ]}
            >
              <View
                style={[
                  styles.cartItemTextView,
                  item.noteExpand ? styles.noteexpandedView : null,
                ]}
              >
                <View style={styles.cardTxtView1}>
                  <Text
                    style={styles.cardTxt}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {item.SKUName}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.cardSubMainTxt} allowFontScaling={false}>
                      Code: {item.SKUNumber}
                    </Text>
                    {parseInt(item.CartItemBackCard) === 1 && (
                      <Text style={styles.seedsTxt}>Backing Card</Text>
                    )}
                  </View>
                </View>
                <View style={styles.itemSecView}>
                  <View style={styles.subView1}>
                    <Text style={styles.subcardTxt} allowFontScaling={false}>
                      {item.CartItemText}
                    </Text>
                  </View>
                  <View style={styles.noteBtnView}>
                    <NoteToggleButton
                      noteVisibility={noteVisibility}
                      itemId={item.CartItemID}
                    />
                  </View>
                  <View style={styles.subView}>
                    <Text style={styles.subcardTxtPacks} allowFontScaling={false}>
                      {item.SKUUnits}
                    </Text>
                  </View>
                  <View style={Styles.priceView1}>
                    {/* Unit Price */}
                    <Text style={styles.subcardTxtUnitPrice} allowFontScaling={false}>
                      Unit Price: £{item.CartItemUnitPrice.toFixed(2)}
                    </Text>

                    {/* Subtotal */}
                    <Text style={styles.subcardTxtPrice} allowFontScaling={false}>
                      £{item.CartItemPrice.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              {item.noteExpand && (
                <View style={styles.noteView}>
                  <TextInput
                    style={styles.noteText}
                    multiline
                    numberOfLines={3}
                    editable={false}
                    value={item.CartItemNote}
                    placeholder="Note..."
                  />
                </View>
              )}
            </View>
          )}
        />

        <View style={styles.allDetailsView}>
          <View style={styles.priceDetailsView}>
            <View style={styles.priceDetailsView1}>
              <View
                style={{
                  height: '55%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.quoteTxt}>Cart Total (Ex. VAT)</Text>
                <View style={styles.quoteTxt2View}>
                  <Text style={styles.quoteTxt2}>
                    £ {this.getCartTotal().toFixed(2)}
                  </Text>
                </View>
              </View>
              {/* <View
                  style={{
                    height: "40%",    £{(e.CartItemPrice).toFixed(2)}
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.quoteTxt}>
                    Estimate Delivery (Inc. VAT)
                  </Text>
                  <View style={styles.quoteTxt2View}>
                    <Text style={styles.quoteTxt2}>£1.15</Text>
                  </View>
                </View> */}
            </View>
            <View style={styles.priceDetailsView2}>
            <View style={styles.priceBtnView}>
              <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.edtCartbtn}
                  onPress={() => {
                    if (cartItems.length > 0) {
                      setBtnName('activeCartEdit');
                      setShowdialog(true);
                      setContentText(
                        `Please confirm you would like to proceed with adding saved cart items to the active cart with ${
                          cartItems.length
                        } items`,
                      );
                    } else {
                      addToEditingMode();
                      setShowdialog(false);
                    }
                  }}>
                  <Image source={edticon} style={Styles.cardImg} />
                </TouchableOpacity>
              </View>

              <View style={styles.priceBtnView}>
              <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.edtCartbtn}
                  onPress={() =>  {
                    if (connectionStatus) {
                      if (cart[0].ReadyToSync == "0") {

                          setEmailDropdownVisibility(true);



                        // please ask this from suranga

                        // setBtnName('email');
                        // setShowdialog(true);
                        // setContentText(
                        //   `Are you sure you want to email this cart to the store?`,
                        // );

                      }else{
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Please run a full sync before this cart can be emailed. This cart was created when the device was offline",
                          type: "warning",
                          autoHide: true,
                        });
                      }

                    }else{
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Please check the Network Connection",
                        type: "warning",
                        autoHide: true,
                      });
                    }
                  }}>
                  <Image source={emailicon} style={Styles.cardImg} />
                </TouchableOpacity>
              </View>


              <View style={styles.priceBtnView}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.cartbtn}
                  onPress={() => {



                    this.checkUnavailableItems().then((unavailableItems) =>{

                      console.log('Unavailable items', unavailableItems);
                      if (subCarts.length == unavailableItems.length) {


                        // if (subCarts.length == 1) {
                        //   showMessage({
                        //     message: 'KINGS SEEDS',
                        //     description: 'Item is unavailable and not added to the cart',
                        //     type: 'warning',
                        //     autoHide: true,
                        //   });
                        // }else{

                        // }

                        showMessage({
                          message: 'KINGS SEEDS',
                          description: 'All the items are unavailable and not added to the cart',
                          type: 'warning',
                          autoHide: true,
                        });


                      }else{


                        if (unavailableItems.length > 0) {
                          setUnavailableItemsDialogBoxVisibility(true)
                        }else{

                          if (cartItems.length > 0) {
                            setBtnName('activeCartAdd');
                            setShowdialog(true);
                            setContentText(
                              `Please confirm you would like to proceed with adding saved cart items to the active cart with ${
                                cartItems.length
                              } items`,
                            );
                          } else {
                            addItemsToCart();
                            setShowdialog(false);
                          }
                        }
                      }

                    });



                  }}>
                  <Image source={carticn} style={Styles.cardImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.priceBtnView}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.dltCartbtn}
                  // onPress={() => this.deleteCart()}

                  onPress={() => {
                    deleteFunction_();
                  }}>
                  <Image source={del} style={styles.cardImg} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {
  addToCart
})(StoreCartsView);

let widthper = wp("100%");
let crd_wdth = 0;
let txt_size = 0;
if (widthper <= 500.0) {
  txt_size = hp("1.6");
} else {
  txt_size = hp("1.4");
}

const { ids, styles } = StyleSheet.create({
  itemSecView:{
    width:wp('50'),
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:wp('50'),
    },
    "@media (max-width: 500px)": {
      width:wp('90'),
    },
  },
  footerCardView: {
    width: '92%',
    height: hp('7'),
    backgroundColor: 'white',
    borderRadius: wp('2'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: hp('1'),
    alignSelf: 'center',
    alignItems:'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
   // flexDirection: 'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp('7'),
    },
    "@media (max-width: 500px)": {
      height: hp('11'),
    },
  },

  footerCardViewExpanded: {
    backgroundColor:colors.color_light_green,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('13'),
    },
    "@media (max-width: 450px)": {
      height: hp('20'),
    },
  },
  scrollUnavailableList:{ width: '100%', height: 300 },
  noteexpandedView: {
   // width: '100%',
    backgroundColor: 'white',
    borderRadius: wp('2'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
  },

  cartItemTextView: {
    width: '100%',
    height: hp('7'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:wp('2'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp('7'),
      flexDirection: 'row',
     // marginRight:wp('1')
    },
    "@media (max-width: 500px)": {
    //  marginTop:hp("1"),
      height: hp('11'),
      flexDirection: 'column',
    },
  },
  allDetailsView: {
    width: "97%",
    height:hp('17'),
    paddingTop: hp('1'),
    alignItems: "flex-end",
  },
  priceDetailsView: {
    width: "60%",
    height: hp('12'),
    //flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "60%",
    },
    "@media (max-width: 500px)": {
      width: "96%",
      height: hp('12'),
    },
  },
  priceBtnView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  priceDetailsView2: {
    width: "50%",
    height: hp('4.5'),
    alignSelf: "flex-end",
    marginTop: hp("1"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "50%",
      height: hp('4.5'),
    },
    "@media (max-width: 500px)": {
      width: "46%",
      height: hp('5'),
    },
  },
  priceDetailsView1: {
    backgroundColor: "white",
    borderRadius: wp("1"),
    width: "100%",
    height: "35%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
  },
  noteText:{
    color:'black'
  },
  dltCartbtn: {
    alignItems: "center",
    height: "88%",
    width: "88%",
    backgroundColor: "#FFD8D8",
    borderRadius: wp("1"),
  },
  cardTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('1'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginLeft: wp('1'),
    },
    "@media (max-width: 500px)": {
      marginLeft: wp('2.5'),
    },
  },
  backTmpbtn: {
    alignItems: "center",
    height: "88%",
    width: wp("60"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp("1"),
    marginRight: wp("65"),
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginRight: wp("65"),
      width: wp("58"),
    },
    "@media (max-width: 500px)": {
      marginRight: wp("50"),
      width: wp("53"),
    },
  },
  backTmpbtntxt: {
    fontSize: hp("1.5"),
    color: "white",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp("1.7"),
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.9"),
    },
  },
  cartbtn: {
    alignItems: "center",
    height: "88%",
    width: "88%",
    backgroundColor: colors.primaryColor,
    borderRadius: wp("1"),
  },
  edtCartbtn: {
    alignItems: "center",
    height: "88%",
    width: "88%",
    backgroundColor: "white",
    borderWidth: wp("0.2"),
    borderColor: colors.primaryColor,
    borderRadius: wp("1"),
  },
  cardTxtView1: {
    flex: 1.8,
    height: hp("6"),
    marginLeft: wp("0"),
    marginRight: wp("1"),
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      width:wp('90')
    },
  },
  subcardTxtUnitPrice: {
    fontSize: txt_size,
    // fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    textAlign:'right'
  },
  subcardTxt: {
    fontSize: txt_size,
    // fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: txt_size,
    },
    "@media (max-width: 500px)": {
      fontSize: txt_size+1,
    },
  },
  subcardTxtPacks: {
    fontSize: txt_size,
    // fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: txt_size,
    },
    "@media (max-width: 500px)": {
      fontSize: txt_size+1,
    },
  },
  seedsTxt: {
    fontSize: txt_size,
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("1"),
  },
  priceView1: {
    flex:0.9,
    height: hp('6'),
    alignItems: 'flex-end',
  //  flexDirection:'row',
    justifyContent: 'center',
    marginLeft: wp('1.5'),

  },
  subcardTxtPrice: {
    fontSize: txt_size + 2,
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
  },
  subView1: {
    flex: 0.6,
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
  },
  subView: {
    flex: 0.5,
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
  },


  quoteTxt: {
    marginLeft: wp("2"),
    flex: 1,
    fontSize: txt_size + 2,
    // fontFamily: Fonts.PoppinsBold,
    //color: colors.primaryColor,
  },
  quoteTxt2: {
    fontSize: txt_size + 1,
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginRight: wp("1.5"),
    fontWeight: "bold",
  },
  quoteTxt2View: {
    flex: 0.4,
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: "contain",
    //resizeMethod: 'cover',
  },
  noteBtnView:{
    width: wp('6'),
    paddingLeft: wp('1'),
    alignSelf: "center",
    "@media (max-width: 450px)": {
      // backgroundColor: "red",
      width: wp('17'),
    //  marginTop:wp('-3'),
    },

  },

  toggleButtonViewArea: {
    // borderColor:'#1FD18C',
     borderWidth: 1,
    borderRadius: wp('1'),
    height: hp('4'),
    width: wp('9'),
     justifyContent:'center',
     alignItems:'center',
   // padding: wp('0.7'),
    flexDirection: 'row',

    "@media (max-width: 450px)": {

      height: hp('4'),
      width: wp('15'),

    },
  },
  toggleButtonIconArea: {

   // margin: 5,

  //  flex: 1
  },
  toggleButtonArrowArea: {

    margin: 5,
    flex: 1,
  },
  toggleButtonNoteIcon: {
    resizeMode: 'contain',
    height:hp('1.7'),
    aspectRatio:1.5,
  },
  toggleButtonArrowIcon: {
    resizeMode: 'contain',
    width: wp("2"),
    height: hp("1"),
    marginTop: hp("0.4"),

  },
  noteView:{
    width: "100%",
    height: hp("6"),
    padding: 10,
    // backgroundColor: "#EBFFE8",
    // backgroundColor: "green",

    // marginBottom: hp("1"),
    borderTopRightRadius: wp("0"),
    borderTopLeftRadius: wp("0"),
    alignSelf:'center',
    flexDirection: "row",
    "@media (max-width: 450px)": {
      padding: 5,
      height: hp("10"),
    },
  },
  dialogbox:{
    backgroundColor: 'white',
    width: wp("50"),
    height: hp("19"),
    // maxHeight: hp("30"),
    borderRadius: 10,
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("20.5"),
      // backgroundColor: 'red',
    },
    "@media (max-width: 450px)": {
      height: hp("22"),
      width: wp("75"),
    },
  },
  disTextinput: {
    flex: 6,
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      flex: 8,
    },
  },
  expandedDialogbox:{
    backgroundColor: 'white',
    width: wp("60"),
    // height: hp("19"),
    // maxHeight: hp("30"),
    borderRadius: 10,
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // height: hp("17.5"),
    },
    "@media (max-width: 450px)": {
      // height: hp("21"),
      width: wp("75"),
    },
  },
  disTextinput: {
    flex: 6,
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      flex: 8,
    },
  },
  discountInput: {
    height: 50,
    // margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e3e3e3',
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      marginTop: -10,
      height: 40,
    },
  },
  disPerSymbol: {
    fontSize: wp('2.5'),
    marginLeft: 20,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginTop: -10,
      marginLeft: 10,
      fontSize: wp('5'),
    },
  },
  addContactForm: {
    // height: 400,
    width: '100%'
  },
  attributeBox: {
    marginTop: hp('2'),
  },
  attributeName: {
    fontSize: wp('2'),
    marginBottom: hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: wp('2'),
    },
    "@media (max-width: 450px)": {
      fontSize: wp('3'),
      marginBottom: hp('2'),
    },
  },
  attributeInput: {
    height: 50,
    // margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e3e3e3',
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      marginTop: -10,
      height: 40,
    },
  },




});
