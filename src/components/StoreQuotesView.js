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
  Alert,
} from "react-native";
import Styles from "../style/StoreCartsStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/CartActions";
import StyleSheet from "react-native-media-query";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Fonts } from "../utils/Fonts";
import { ConfirmDialog } from "react-native-simple-dialogs";
import {Dropdown} from "react-native-element-dropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ConfirmationBox from "./common/ConfirmationBox";
import {GetCustomFormattedValue, GetProductLinePricing} from '../offline/Services/ProductHelper';
import insertContactAPI from "./contacts/insertContactAPI";

import { useIsFocused } from '@react-navigation/native';

import DataAdapter from "../offline/localData/DataAdapter";
import {GetBoolean, GetDecimal, GetInteger} from '../utils/ValidationHelper';
import { showMessage } from "react-native-flash-message";
import * as colors from '../style/Common/ColorsStyle';
import { TruncateTo2 } from "../utils/ValidationHelper";
import {RawQuery} from '../offline/Services/DataHelper';
import { checkUserRole, IsQuoteCreatedbyAdmin, IsUserAnySOP } from "../offline/Services/UserHelper";
import { EmailValidation, ContactNumberValidation } from "../utils/ValidationHelper";
import _ from "lodash";
import NoteToggleButton from "./helperComponents/NoteToggleButoon";
import sendConEmail from './contact/sendEmail';

const carticn = require("../assets/cartplus2xWhite.png");
const edticon = require("../assets/editline2xgreen.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const approved = require('../assets/StoreQuotes/requestquote2x.png')

const emailIcon = require("../assets/StoreQuotes/email2x.png");
const copyicn = require("../assets/StoreQuotes/clone2x.png");
const chkicn = require("../assets/StoreQuotes/checkbox2x.png");

const contactDetails_ = [
  {
    contactId: 1,
    name: "Cabbage Caraflex F1 (RHS Aws png)",
    num: "10125",
    grams: "25g",
    packs: "20 packs",
    price: "£5100.65",
  },
  {
    contactId: 2,
    name: "Cabbage Caraflex F2 (RHS Aws png)",
    num: "14022",
    grams: "20g",
    packs: "20 packs",
    price: "£5100.65",
  }
];


const StoreQuotesView = (props) => {
  const isFocused = useIsFocused();

  const { navigation, quoteId, quoteName } = props;
// console.log('====================================');
// console.log(quoteId,quoteName);
// console.log('====================================');

  const [token, setToken] = useState("blank");
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");




  const [subQuotes, setSubQuotes] = useState([]);

  const dispatch = useDispatch();

  //dialog box
  const [showdialog, setShowdialog] = useState(false);
  const [deleteYes, setDeleteYes] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [contentText, setContentText] = useState("");
  const [btnName, setBtnName] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSop, setIsSop] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");


  const [isDeletable, setIsDeletable] = useState(true);

  const [changed, setChanged] = useState(true);

  const [totalDis, setTotalDis] = useState(true);




  const [emailDropdownVisibility, setEmailDropdownVisibility] = useState(false);
  const [addContactFormVisibility, setAddContactFormVisibility] = useState(false);

  const [customerEmails, setCustomerEmails] = useState(null);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState(null);


  const [quoteCustomerEmail, setQuoteCustomerEmail] = useState('');




  const [quoteCreatedByUserID, setQuoteCreatedByUserID] = useState('');

  const [isQuoteCreatedByAdmin, setIsQuoteCreatedByAdmin] = useState(false);





  const [allStatuses, setAllStatuses] = useState([]);


  const [emailedAproved, setEmailedAproved] = useState(false);

  const [orderedQuote, setOrderedQuote] = useState(false);


  const [readyToSync, setReadyToSync] = useState(false);


  const adminCustomerID = useSelector((state) => state.findStore.adminCustomerID);
  const tokn = useSelector((state) => state.login.loginToken);
  const { connectionStatus } = useSelector((s) => s.loading);
  const cartItems = useSelector(s => s.cart.items);

  const noteVisibility = (visibility, id) => {



       let ei = _.findIndex(subQuotes, {
      CartItemID: id,
    });



    let val =  subQuotes[ei].noteExpand;


    subQuotes[ei].noteExpand = !val;
    let c_ = changed;
    setChanged(!c_)


    setSubQuotes(subQuotes);
  }


  useEffect(() => {
    console.log('quoteId', quoteId);

    setToken(tokn);

    getQuoteEmail();

    if (props.status == "Ordered") {
      setOrderedQuote(true);
    }



    initialMainCart(quoteId).then(res => {
      // setCart(res);
      // setOrderCreatedByUserID

      setQuoteCreatedByUserID(res[0].ShoppingCartUserID);

      console.log('test', res[0].ShoppingCartUserID);

      checkQuoteCreatedRoles(res[0].ShoppingCartUserID).then(res => {

        setIsQuoteCreatedByAdmin(res);
      });
      console.log('-------------------------------- ',res);


      if(res != []){if (res[0].ReadyToSync == 1) {
        setReadyToSync(true);
      }}

    });

    getEmails();
    initial(quoteId).then(res => {

      let array= [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        let obj = {
          ...element,
          noteExpand: true
        }
        array.push(obj)
      }


      let totalDiscount = 0;

      array.map(obj => {
        totalDiscount += parseFloat(obj.CartItemQuoteLineDiscount) || 0;

      })

      setTotalDis(totalDiscount);



      setSubQuotes(array);


    });



    getAllStatuses(quoteId).then(res => {
      setAllStatuses(res);




      checkEmailedApproved(res);
    });


    checkEmailedApproved = (allStatuses) => {


      let isEmailed = false;
      let isApproved = false;

      allStatuses.map(statuses => {

        if (statuses.ItemName == "emailed") {
          isEmailed = true;
        }
        // if (statuses == "emailed") {
        //   isEmailed = true;
        // }
      })

      if (isEmailed) {
        setEmailedAproved(true);
      }

    }


    if (connectionStatus) {
      // if this is false, we prevent reorder button
      isQuoteOrdered(quoteId).then(res =>

        setIsDeletable(!res)
      );

    }


    async function checkRoles(role){
      const isUserExist = await checkUserRole(role);
      return isUserExist;
    }

    async function checkRoleSop(){

      const isUserExist = IsUserAnySOP();
      return isUserExist;
    }

    async function checkQuoteCreatedRoles(userId){
      console.log('quoteCreatedByUserID-----------', userId);
      const isQuoteCreated = await IsQuoteCreatedbyAdmin(userId);
      console.log('quoteCreatedByUserID-----------', isQuoteCreated);
      return isQuoteCreated;
    }



    checkRoles('quoteadmin').then(res => setIsAdmin(res));
    checkRoleSop().then(res => setIsSop(res));



    triggerStatus();

    // updateQuoteEmail();

    // sendChangeStatus(2);
  }, [isFocused]);



  triggerStatus = () => {
    getStatus(quoteId).then(res => {
      setStatus(res);


      if (res == "approved") {
        setIsApproved(true);
      }else{
        setIsApproved(false);
      }

    });
  }


  async function initialMainCart(cartId){

    const payload = {
      section: 'CART',
      opration: 'GET MAIN CART',
      data: cartId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }



  async function getEmails(){

    let id = 1;
    let contactsAry = []
    getCustomerAddresses().then(res => {

      res.map(element => {
        console.log(element);
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

        console.log('customerEmails',contactsAry);
        setSelectedCustomerEmail(contactsAry[0]);
        setCustomerEmails(contactsAry);

      });






    })
  }

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




  // main operation - get data
  async function initial(quoteId){

    const payload = {
      section: 'QUOTE',
      opration: 'GET SUB QUOTES',
      data: quoteId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  async function getAllStatuses(quoteId){

    const payload = {
      section: 'QUOTE',
      opration: 'GET ALL STATUSES',
      data: quoteId,
    }


    const newpro = await DataAdapter(payload);
    return newpro;
  }

  async function sendContact(data, token) {


    const newpro = await sendConEmail(data, token);
    return newpro;
  }


  async function isQuoteOrdered(quoteId){

    const payload = {
      section: 'QUOTE',
      opration: 'IS QUOTE ORDERED',
      data: quoteId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  async function getStatus(quoteId){

    const payload = {
      section: 'QUOTE',
      opration: 'GET QUOTE STATUS',
      data: quoteId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  async function addContactAPI(data) {


    const newpro = await insertContactAPI(data);
    console.log(newpro);
    return newpro;
  }


  async function performAction(quoteId, quoteAction, email){

    const payload = {
      section: 'QUOTE',
      opration: 'QUOTE ACTIONS',
      data: { quoteId, quoteAction, email },
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  async function cloneItem(quoteId){

    const payload = {
      section: 'QUOTE',
      opration: 'QUOTE CLONE',
      data: { items: subQuotes, quoteId },
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  async function insertQuoteUser(quoteId, body){

    const payload = {
      section: 'QUOTE',
      opration: 'INSERT QUOTE USER',
      data: { quoteId, body },
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  confirmShowHide = (contentTxt) => {

    setShowdialog(!showdialog);
    setContentText(contentTxt);
  };
  getQuoteEmail = async () => {
    console.log(quoteId);
    let query = await RawQuery(`SELECT * FROM local_com_shoppingcart WHERE ShoppingCartID = '${quoteId}'`);

    setQuoteCustomerEmail(query.item(0).ToEmail)

    console.log('query');
    console.log(query.item(0).ToEmail);
    console.log('query');
  }

  updateQuoteEmail = async () => {
    console.log(quoteId);
    // let query = await RawQuery(`SELECT * FROM local_com_shoppingcart WHERE ShoppingCartID = '${quoteId}'`);
    let query = await RawQuery(`UPDATE local_com_shoppingcart SET ToEmail = '${selectedCustomerEmail.email}' WHERE ShoppingCartID = '${quoteId}'`);
    console.log('query');
    // console.log(query.item(0));
    console.log('query');
  }

  sendChangeStatus = (type) => {
    // closeConfirmation();


    let checked = checkActionButton(type);


    if (checked) {
      const quoteActions = ['request_approval', 'approve', 'email_client'];

      performAction(quoteId, quoteActions[type], selectedCustomerEmail.email).then(res => {



        if (res.status == 'Success') {
          // closeConfirmation();


          insertQuoteUser(quoteId, res.body.quoteStatusUser).then(res => {
            if (res == 1) {
              // closeConfirmation();
              // updateQuoteEmail()


              if (quoteActions[type] == 'request_approval') {
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Quote admin notified successfully",
                  type: "success",
                  autoHide: true,
                });
              }

              if (quoteActions[type] == 'approve') {
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Successfully approved",
                  type: "success",
                  autoHide: true,
                });
                // setEmailedAproved(true);
              }

              if (quoteActions[type] == 'email_client') {
                updateQuoteEmail();
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Quotation submitted to customer",
                  type: "success",
                  autoHide: true,
                });
                setEmailedAproved(true);

              }

              // showMessage({
              //   message: "KINGS SEEDS",
              //   description: "Status changed",
              //   type: "success",
              //   autoHide: true,
              // });

            }

            triggerStatus();
          });

        }else{
          showMessage({
            message: "KINGS SEEDS",
            description: res.body.error,
            type: "warning",
            autoHide: true,
          });
        }

      });
    }

    closeConfirmation()

  }

  checkActionButton = (type) => {


    if (type == 0) {
      if (status == 'draft') {

        return true;
      }

      if (status == 'edited') {

        return true;
      }
      if (status == 'new') {
        return true;
      }else{
        if (status == 'requested') {
          showMessage({
            message: "KINGS SEEDS",
            description: 'Already requested',
            type: "warning",
            autoHide: true,
          });
          return false;
        }

        if (status == 'approved') {
          showMessage({
            message: "KINGS SEEDS",
            description: "Already approved",
            type: "warning",
            autoHide: true,
          });
          return false;
        }
      }
    }

    if (type == 1) {

      if (status == 'edited') {
        return true;

      }

      if (status == 'requested') {
        return true;

      }else{
        if (status == 'draft') {
          return true;
        }


        if (status == 'approved') {
          showMessage({
            message: "KINGS SEEDS",
            description: "Already approved",
            type: "warning",
            autoHide: true,
          });

          return false;
        }
      }
    }


    if (type == 2) {

      if (status == 'draft') {
        showMessage({
          message: "KINGS SEEDS",
          description: "This is a draft Quote - (change this)",
          type: "warning",
          autoHide: true,
        });

        return false;
      }

      if (status != 'approved') {

        showMessage({
          message: "KINGS SEEDS",
          description: "Please send this quotation for approval before mailing",
          type: "warning",
          autoHide: true,
        });

        return false;
      }

      return true;


    }
  }



  addToEditingMode = async () => {



      let isEditingMode = false;


      cartItems.map((cartItem => {
        if (cartItem.actionMode == 'EDITING QUOTE') {
          isEditingMode = true;
        }
      }));


      let isOrderingMode = false;

      cartItems.map((cartItem => {

        if (cartItem.actionMode == 'ORDER QUOTE') {
          isOrderingMode = true;
        }
      }));




      if (isEditingMode) {
        showMessage({
          message: "KINGS SEEDS",
          description: "There's another quote already loaded on to the shopping cart for editing, please complete that first",
          type: "warning",
          autoHide: true,
        });
      }else if (isOrderingMode) {
        showMessage({
          message: "KINGS SEEDS",
          description: "There's another quote already loaded on to the shopping cart for ordering, please complete that first",
          type: "warning",
          autoHide: true,
        });
      }else{
        if (status != 'approved') {

          let itemsToAdd = [];
          let unavailableItems = [];

          for (let i = 0; i < subQuotes.length; i++) {
            let subQuote = subQuotes[i];

            let availability;
            let sku = await RawQuery(`SELECT SKUEnabled, SKUAvailableItems FROM local_com_sku WHERE SKUID = ${subQuote.SKUID}`);
            if (sku != "") {
              availability = GetBoolean(sku.item(0).SKUEnabled) && GetInteger(sku.item(0).SKUAvailableItems) > 0;
            } else {
              availability = false;
            }

            let bc = false;
            if(parseInt(subQuote.CartItemBackCard) == '1'){
              bc= true
            }


            if (availability) {
              const product = {
                skuid: subQuote.SKUID,
                skuName: subQuote.SKUName,
                skuNumber: subQuote.SKUNumber,
                skuPackSize: subQuote.SKUPackSize,
                priceOptions: {},
                actionMode: 'EDITING QUOTE',
                quoteId: quoteId,
                quoteName: quoteName,
                cartItemID: subQuote.CartItemID,
                priceLine: subQuote.CartItemPriceLine,
                quantity: subQuote.SKUUnits,
                totalPrice: subQuote.SKUUnits * subQuote.CartItemUnitPrice,
                totalTax: subQuote.CartItemLineTax,
                cartItemDiscountRate: subQuote.CartItemDiscountRate,
                cartItemQuoteLineDiscount: subQuote.CartItemQuoteLineDiscount,
                cartItemQuoteLineDiscountType: subQuote.CartItemQuoteLineDiscountType,
                cartItemQuoteYourPrice: subQuote.CartItemQuoteYourPrice,
                skuDiscountCat: subQuote.SkuDiscountCat,
                cartItemNote: subQuote.CartItemNote,
                backCard: bc,
                ReadyToSync: readyToSync
              };
              product.priceOptions[subQuote.CartItemPriceLine] = {
                label: subQuote.CartItemText,
                price: subQuote.CartItemUnitPrice,
                priceDisplay: await GetCustomFormattedValue(subQuote.CartItemUnitPrice)
              }





              itemsToAdd.push(product);
            } else {
              unavailableItems.push(subQuote.SKUID);
            }
          }

          if (unavailableItems.length === subQuotes.length) {
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
            props.addToCart({
              cartItems: itemsToAdd
            });

            closeConfirmation();
            navigation.navigate("carts");
          }

        }else{
          showMessage({
            message: "KINGS SEEDS",
            description: "Already approved",
            type: "warning",
            autoHide: true,
          });

        }

      }



  }






  addItemsToCart = async () => {



    if (status == 'draft') {



        showMessage({
          message: 'KINGS SEEDS',
          description: `This is a draft Quote - (change this)`,
          type: 'warning',
          autoHide: true,
        });
        return;
    }
      let isEditingMode = false;

    cartItems.map((cartItem => {
      if (cartItem.actionMode == 'EDITING QUOTE') {
        isEditingMode = true;
      }
    }));


    let isOrderingMode = false;

    cartItems.map((cartItem => {

      if (cartItem.actionMode == 'ORDER QUOTE') {
        isOrderingMode = true;
      }
    }));




    if (isEditingMode) {
      showMessage({
        message: "KINGS SEEDS",
        description: "There's another quote already loaded on to the shopping cart for editing, please complete that first",
        type: "warning",
        autoHide: true,
      });
    }else if (isOrderingMode) {
      showMessage({
        message: "KINGS SEEDS",
        description: "There's another quote already loaded on to the shopping cart for ordering, please complete that first",
        type: "warning",
        autoHide: true,
      });
    }else{

        let itemsToAdd = [];
        let unavailableItems = [];

        for (let i = 0; i < subQuotes.length; i++) {
          let subQuote = subQuotes[i];

          let availability;
          let sku = await RawQuery(`SELECT SKUEnabled, SKUAvailableItems FROM local_com_sku WHERE SKUID = ${subQuote.SKUID}`);
          if (sku != "") {
            availability = GetBoolean(sku.item(0).SKUEnabled) && GetInteger(sku.item(0).SKUAvailableItems) > 0;
          } else {
            availability = false;
          }

          let bc = false;
          if(parseInt(subQuote.CartItemBackCard) == '1'){
            bc= true
          }

          if (availability) {
            let tot = GetDecimal(subQuote.CartItemUnitPrice) * GetInteger(subQuote.SKUUnits); // fallback
            let tax = 0; // fallback
            let uPrice = GetDecimal(subQuote.CartItemUnitPrice); // fallback
            try {
              let linePricing = await GetProductLinePricing(subQuote.SKUNumber, subQuote.CartItemPriceLine, subQuote.SKUUnits);
              tot = linePricing.LinePrice;
              tax = linePricing.LineTax;
              uPrice = linePricing.UnitPrice;
            } catch (e) {
              console.log("GetProductLinePricing Error... ", e);
            }



            const product = {
              skuid: subQuote.SKUID,
              skuName: subQuote.SKUName,
              skuNumber: subQuote.SKUNumber,
              skuPackSize: subQuote.SKUPackSize,
              priceOptions: {},
              actionMode: 'ORDER QUOTE',
              quoteId: quoteId,
              quoteName: quoteName,
              cartItemID: subQuote.CartItemID,
              priceLine: subQuote.CartItemPriceLine,
              quantity: subQuote.SKUUnits,
              totalPrice: tot,
              totalTax: tax,
              skuDiscountCat: subQuote.SkuDiscountCat,
              cartItemDiscountRate: subQuote.CartItemDiscountRate,
              cartItemQuoteLineDiscount: subQuote.CartItemQuoteLineDiscount,
              cartItemQuoteLineDiscountType: subQuote.CartItemQuoteLineDiscountType,
              cartItemQuoteYourPrice: subQuote.CartItemQuoteYourPrice,
              skuDiscountCat: subQuote.SkuDiscountCat,
              cartItemNote: subQuote.CartItemNote,
              backCard:bc
            };
            product.priceOptions[subQuote.CartItemPriceLine] = {
              label: subQuote.CartItemText,
              price: uPrice,
              priceDisplay: await GetCustomFormattedValue(uPrice)
            }

            itemsToAdd.push(product);
          } else {
            unavailableItems.push(subQuote.SKUID);
          }
        }

        if (unavailableItems.length === subQuotes.length) {
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
        } else {
          showMessage({
            message: "KINGS SEEDS",
            description: "Items added to cart",
            type: "success",
            autoHide: true,
          });
        }

        if (itemsToAdd.length > 0) {
          props.addToCart({
            cartItems: itemsToAdd
          });

          closeConfirmation();
          navigation.navigate("carts");
        }

        // subQuotes.map(subQuote => {
        //
        //
        //   const product = {
        //     skuid: subQuote.SKUID,
        //     imagesMain: [
        //       {
        //         imageID: "image",
        //         imageNumber: subQuote.SKUNumber,
        //         imagePath: "https://sop.kingsseeds.com/CMS/no-image.png",
        //         skuName: subQuote.SKUName,
        //       },
        //     ],
        //     skuPackSize: "",
        //     priceOptions: { 1: {"label": subQuote.SKUPrice1Label, "price": subQuote.CartItemUnitPrice / subQuote.SKUUnits, "priceDisplay": `£${subQuote.CartItemText}`} },
        //
        //
        //
        //   };
        //   const qtys = { 1: subQuote.SKUUnits };
        //
        //   dispatch({ type: 'ADD_ITEM_TO_CART', payload: {
        //     ...product,
        //     quantityPerOptions: qtys,
        //   } });
        //   showMessage({
        //     message: "KINGS SEEDS",
        //     description: "Quote is ready for ordering",
        //     type: "success",
        //     autoHide: true,
        //   });
        //
        //
        // })
      }





  }


  copyItems = () => {

    cloneItem(quoteId).then(res => {

      if (res.status == 'Success') {
        showMessage({
          message: "KINGS SEEDS",
          description: "A copy has been created successfully without the discounts",
          type: "success",
          autoHide: true,
        });
        // Alert.alert(
        //   "",
        //   "A copy has been created successfully without the discounts",
        //   [
        //     { text: "OK", onPress: () => console.log("OK Pressed") }
        //   ]
        // );


      }else{
        showMessage({
          message: "KINGS SEEDS",
          description: "Something went wrong",
          type: "danger",

          autoHide: true,
        });
      }



    });

  }


  checkEditbutton = () => {



    if(status == 'draft'){

      if (isAdmin) {
        return true;
        // if (isQuoteCreatedByAdmin) {
        //   return false;
        // }else{
        //   return true;
        // }

      }else{
        return false;
      }
    }

    if(status != 'approved'){

      if (isAdmin) {
        let requested = false;
        allStatuses.map((status) => {

          if (status.ItemName == 'requested') {
            requested = true;
          }

        });


        console.log('requested', requested);
        if (requested) {
          return false;
        }else{
          if (isQuoteCreatedByAdmin) {
            return false;
          }else{
            return true;
          }

        }
      }

    }




    if (status == 'edited') {
      if(totalDis > 0){

      }else{
        return false;
      }

    }







    if(status == 'requested' || status == 'edited'){

      if (isAdmin) {
        return false;
      }else{
        return true;
      }
    }


    if(status == 'approved'){
      return true;
    }
    return false;

  }


  checkRequestbutton = () => {

    // console.log('==================================================');
    // console.log('==================================================');
    // console.log(status);
    // console.log(isAdmin);
    // console.log(isQuoteCreatedByAdmin);

    // console.log('==================================================');
    // console.log('==================================================');

    if(status == 'draft'){

      if (isAdmin) {
        if (isQuoteCreatedByAdmin) {
          return false;
        }else{
          return true;
        }


      }else{
        return false;
      }
    }

    if (isAdmin || status == 'emailed' || status == 'requested') {

      return true;
// if (isQuoteCreatedByAdmin) {
//   return false;
// }else{
//   return true;
// }


    }else{

      if(totalDis > 0){
        return true;
      }else{
        return false;
      }


    }
  }

  checkOrderButton = () => {



    if (orderedQuote) {
      return true;
    }

    if (!emailedAproved) {
      return true;
    }

    if(isAdmin || status == 'requested' || status == 'emailed' || status == 'draft' || status == 'edited'){
      if(isAdmin){
        if (isQuoteCreatedByAdmin) {
          return false;
        }else{
          return true;
        }
      }else{
        if(status == 'emailed'){
          return false;
        }else{
          return true;
        }

      }

    }


  }

  checkCloneButton = () => {
    return !isAdmin || isQuoteCreatedByAdmin;
  }

  checkDeleteButton = () => {
    return !isAdmin || isQuoteCreatedByAdmin;
  }

  deleteQuote = () => {


    let isEditingMode = false;
    let isQuoteIDExsist = '';

      cartItems.map((cartItem => {
        if (cartItem?.quoteId) {
          if (cartItem.quoteId != '') {
            isQuoteIDExsist = cartItem.quoteId;
          }
        }

        if (cartItem.actionMode == 'EDITING QUOTE') {
          isEditingMode = true;
        }
      }));


      let isOrderingMode = false;

      cartItems.map((cartItem => {

        if (cartItem.actionMode == 'ORDER QUOTE') {
          isOrderingMode = true;
        }
      }));



      closeConfirmation();

      if (quoteId == isQuoteIDExsist) {

        if (isEditingMode) {
          showMessage({
            message: "KINGS SEEDS",
            description: "Sorry, you cannot delete this cart / quote as it is been uploaded to the live cart!",
            type: "warning",
            autoHide: true,
          });
        }

        if (isOrderingMode) {
          showMessage({
            message: "KINGS SEEDS",
            description: "Sorry, you cannot delete this cart / quote as it is been uploaded to the live cart!",
            type: "warning",
            autoHide: true,
          });
        }



      }else{



        deleteCartFromDb(quoteId).then(res => {

          if (res > 0) {
            // if deleted
            navigation.navigate('storeNew', { tab: 3, subTabVal: "" });
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




  }


  getQuoteTotal = () => {

    let tot = 0.00;
    subQuotes.map(subQuote => {

      tot = tot + parseFloat(subQuote.CartItemQuoteYourPrice);
    });

    return tot;
  }



   // main operation - get data
   async function deleteCartFromDb(quoteId){

    const payload = {
      section: 'QUOTE',
      opration: 'DELETE LOCAL',
      data: quoteId,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }



  closeConfirmation= ()=> {
    // if (condition) {

    // }
    setShowdialog(false)
  }





  return (
    <View style={Styles.container}>


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

                  if (contactName) {

                  }

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
                  this.sendChangeStatus(2);
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





          {/* confirmation box appreing without a content */}
            {
              btnName == 'quoteDelete' ? (
                <ConfirmationBox
                showHide={showdialog}
                yes={() => deleteQuote()}
                no={() => closeConfirmation()}
                contentText={contentText}
              />
              ) : btnName == 'quoteClone' ? (
                <ConfirmationBox
                showHide={showdialog}
                yes={() => closeConfirmation()}
                no={() => closeConfirmation()}
                contentText={contentText}
              />
              ) : btnName == 'quoteRequest' ? (
                <ConfirmationBox
                showHide={showdialog}
                yes={() => this.sendChangeStatus(0)}
                no={() => closeConfirmation()}
                contentText={contentText}
              />
              ) : btnName == 'quoteApprove' ? (
                <ConfirmationBox
                showHide={showdialog}
                yes={() => this.sendChangeStatus(1)}
                no={() => closeConfirmation()}
                contentText={contentText}
              />
              ) : btnName == 'quoteEmail' ? (
                <ConfirmationBox
                showHide={showdialog}
                yes={() => this.sendChangeStatus(2)}
                no={() => closeConfirmation()}
                contentText={contentText}
              />
              ) : null
            }




      <View style={Styles.titleView}>
        <Text style={Styles.titleTxt} allowFontScaling={false}>
          {quoteName}
        </Text>
      </View>


{/* pass */}


      <View style={{ width: "100%", height: "72%", marginTop: hp("1") }}>
        <ScrollView style={{ width: "100%", marginBottom: hp("1") }}>
          {subQuotes.map((e) => (
            <View style={[styles.footerCardView, e.noteExpand == true ? styles.footerCardViewExpanded : null]} key={e.CartItemID}>
              <View style={[styles.cartItemTextView]}>
                <View style={styles.cardTxtView1}>
                  <Text
                    style={styles.cardTxt}
                    allowFontScaling={false}
                    numberOfLines={1}
                  >
                    {e.SKUName}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={Styles.cardSubMainTxt}
                      allowFontScaling={false}
                    >
                      Code: {e.SKUNumber}
                    </Text>
                    {
                      parseInt(e.CartItemBackCard) == '1' ? (<Text style={styles.seedsTxt}>Backing Card</Text> ) : null
                    }
                  </View>
                </View>

                <View style={styles.itemSecView}>
                  <View style={styles.subView1}>
                    <Text style={styles.subcardTxt} allowFontScaling={false}>
                      {e.CartItemText}
                    </Text>
                  </View>
                  <View style={styles.noteBtnView}>
                  <NoteToggleButton noteVisibility={noteVisibility} itemId={e.CartItemID} />
                  </View>
                  <View style={styles.subView}>
                    <Text
                      style={styles.subcardTxtPacks}
                      allowFontScaling={false}
                    >
                      {e.SKUUnits}
                    </Text>
                  </View>
                  <View style={styles.priceView1}>
                    <Text
                      style={styles.subcardTxtUnitPrice}
                      allowFontScaling={false}
                    >
                      Unit Price £
                      <Text style={{ fontWeight: "bold" }}>
                        {(e.CartItemUnitPrice).toFixed(2)}
                      </Text>
                    </Text>
                    <Text
                      style={styles.subcardTxtPrice}
                      allowFontScaling={false}
                    >
                      £{(e.SKUUnits * e.CartItemUnitPrice).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: wp("90"),
                  height: hp("4"),
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                  paddingLeft: wp("1.3"),
                }}
              >
                <Text
                  style={styles.discountTxt}
                >
                  Line Discount:{" "}
                </Text>

                { e.CartItemQuoteLineDiscountType == 'F' ? (
                  <Text style={[styles.discountTxt, {color:'black'}]}> £ { e.CartItemQuoteLineDiscount } </Text>
                ) : (
                  <Text style={[styles.discountTxt, {color:'black'}]}> { e.CartItemDiscountRate }% (£ { e.CartItemQuoteLineDiscount }) </Text>
                )}


                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    right: 4,
                  }}
                >
                  <Text style={[styles.discountTxt, {color:'black'}]}>
                    Quoted Price:{" "}
                  </Text>
                  <Text style={styles.discountTxt}>
                    £ { e.CartItemQuoteYourPrice.toFixed(2) }
                  </Text>
                </View>
              </View>
              {e.noteExpand == true ? (
                <View style={[styles.noteView]}>
                  <TextInput
                    style={styles.noteText}
                    multiline
                    numberOfLines={3}
                    value={e.CartItemNote}
                    editable={false}
                    // style={styles.input}
                    placeholder="Note..."
                  />
                </View>
              ) : null}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.allDetailsView}>
        <View style={styles.priceDetailsView}>
        <View style={styles.priceDetailsView1}>
        { quoteCustomerEmail != '' ? (
          <View
          style={{

            height: "55%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.quoteTxt}>Quote Sent to</Text>


          <View style={styles.quoteTxt2View}>
            <Text style={styles.quoteTxt2}>
              { quoteCustomerEmail }
            </Text>
          </View>
        </View>
        ) : null}

            <View
              style={{

                height: "55%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.quoteTxt}>Quote Total (Ex. VAT)</Text>


              <View style={styles.quoteTxt2View}>
                <Text style={styles.quoteTxt2}>
                  £{this.getQuoteTotal().toFixed(2)}
                </Text>
              </View>
            </View>
            {/* <View
                  style={{
                    height: "40%",
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

                { checkEditbutton() || status == 'emailed'  ? null : (
                  <View style={styles.priceBtnView}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.edtCartbtn}
                    onPress={() => this.addToEditingMode()}
                  >
                    <Image source={edticon} style={Styles.cardImg} />
                  </TouchableOpacity>
                </View>
                )}






                {checkRequestbutton() ? null : (

                  <View style={[styles.priceBtnView, status == 'requested' ? { opacity: 0.3 } : null ]}>
                    <TouchableOpacity
                      onPress={() => {

                        // setEmailDropdownVisibility(true);

                        if (connectionStatus) {
                          if (readyToSync == 0) {
                            confirmShowHide(isAdmin ? 'Do you want to update the quote?' : 'Do you want the Quote Admin to be notified?');
                            setBtnName("quoteRequest");
                            setShowdialog(true);
                          }else{
                            showMessage({
                              message: "KINGS SEEDS",
                              description: "Please initiate a full sync to perform this action, because this quote was created offline",
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
                      }}
                      activeOpacity={0.9}
                      style={styles.edtCartbtn}
                    >
                      <Image source={approved} style={Styles.cardImg} />
                    </TouchableOpacity>
                  </View>

                )}


              {/* { !isAdmin || status == 'requested' || status == 'approved' || status == 'emailed' ?  null : ( */}
              { !isAdmin || status == 'requested' || status == 'approved' || status == 'emailed' || totalDis == 0 ?  null : (
                  <View style={styles.priceBtnView}>
                  <TouchableOpacity
                    onPress={() => {

                      if (connectionStatus) {
                        confirmShowHide("Are you ok to approve this quote?");
                        setBtnName("quoteApprove");
                        setShowdialog(true);
                      }else{
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Please check the Network Connection",
                          type: "warning",
                          autoHide: true,
                        });
                      }

                    }}
                    activeOpacity={0.9}
                    style={styles.edtCartbtn}
                  >
                    <Image source={chkicn} style={Styles.cardImg} />
                  </TouchableOpacity>
                </View>
                ) }

                { isApproved ? (
                  <View style={styles.priceBtnView}>
                  <TouchableOpacity
                    onPress={() => {

                      setEmailDropdownVisibility(true);

                      // confirmShowHide("This will email the quote to the customer?");
                      // setBtnName("quoteEmail");
                      // setShowdialog(true);
                    }}
                    activeOpacity={0.9}
                    style={styles.edtCartbtn}
                  >
                    <Image source={emailIcon} style={Styles.cardImg} />
                  </TouchableOpacity>
                </View>

                ) : null }


                  { checkOrderButton() ? null : (
                  <View style={styles.priceBtnView}>
                  <TouchableOpacity
                    onPress={() => this.addItemsToCart()}
                    activeOpacity={0.9}
                    style={styles.cartbtn}
                  >
                    <Image source={carticn} style={Styles.cardImg} />
                  </TouchableOpacity>
                </View>
                  )}

                  { checkCloneButton()  ? (
                    <View style={styles.priceBtnView}>
                    <TouchableOpacity
                      onPress={() => {
                        if (connectionStatus) {
                          this.copyItems()
                        }else{
                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Please check the Network Connection",
                            type: "warning",
                            autoHide: true,
                          });
                        }

                      }}
                      activeOpacity={0.9}
                      style={styles.edtCopybtn}
                    >
                      <Image source={copyicn} style={Styles.cardImg} />
                    </TouchableOpacity>
                  </View>
                  ) : null }


{/* setIsQuoteCreatedAdmin */}
                { checkDeleteButton()  ? (
                   <View style={styles.priceBtnView}>
                   <TouchableOpacity
                     onPress={() => {

                       if (connectionStatus) {
                         if (isDeletable) {
                           confirmShowHide("Are you sure you want to delete this quote?");
                           setBtnName("quoteDelete");
                           setShowdialog(true);
                         }else{
                           showMessage({
                             message: "KINGS SEEDS",
                             description: "This quote has been converted to an order. You cannot delete this quote",
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

                     }}
                     activeOpacity={0.9}
                     style={styles.dltCartbtn}
                   >
                     <Image source={del} style={styles.cardImg} />
                   </TouchableOpacity>
                 </View>
                ) : null}


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
})(StoreQuotesView);

let widthper = wp("100%");
let crd_wdth = 0;
let txt_size = 0;
if (widthper <= 450.0) {
  txt_size = hp("1.6");
} else {
  txt_size = hp("1.4");
}

const {ids, styles} = StyleSheet.create({
  discountTxt: {
    color: '#1ED18C',
    fontSize: txt_size,
    // "@media (max-width: 1600px) and (min-width: 500px)": {
    //   fontSize: hp("1.4"),
    // },
    // "@media (max-width: 500px)": {
    //   fontSize: hp("1.6"),
    // },
  },
  itemSecView: {
    width: wp('50'),
    flexDirection: 'row',
    '@media (max-width: 1600px) and (min-width: 500px)': {
      width: wp('50'),
    },
    '@media (max-width: 500px)': {
      width: wp('90'),
    },
  },
  footerCardView: {
    width: '92%',
    height: hp('10'),
    backgroundColor: '#EBFFE8',
    borderRadius: wp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: hp('1'),
    alignSelf: 'center',
    //  alignItems:'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    // flexDirection: 'row',
    '@media (max-width: 1600px) and (min-width: 500px)': {
      height: hp('10'),
    },
    '@media (max-width: 500px)': {
      height: hp('14'),
    },
  },
  footerCardViewExpanded: {
    backgroundColor: colors.color_light_green,
    '@media (max-width: 1600px) and (min-width: 450px)': {
      height: hp('16'),
    },
    '@media (max-width: 450px)': {
      height: hp('22'),
    },
  },

  noteexpandedView: {
    // width: '100%',
    backgroundColor: 'white',
    borderRadius: wp('2'),
    shadowColor: '#000',
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
    height: hp('6'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: wp('2'),
    '@media (max-width: 1600px) and (min-width: 500px)': {
      height: hp('6'),
      flexDirection: 'row',
      // marginLeft:wp('0.5')
      paddingRight: wp('1.5'),
      paddingLeft: wp('1.4'),
    },
    '@media (max-width: 500px)': {
      // marginTop:hp("1"),
      height: hp('10'),
      flexDirection: 'column',
      paddingTop: hp('1'),
      paddingRight: wp('1.5'),
    },
  },
  allDetailsView: {
    width: '97%',
    height: hp('17'),
    alignItems: 'flex-end',
  },
  priceDetailsView: {
    width: '60%',
    height: hp('12'),
    //flexDirection: "row",
    '@media (max-width: 1600px) and (min-width: 500px)': {
      width: '60%',
    },
    '@media (max-width: 500px)': {
      width: '96%',
      height: hp('12'),
    },
  },
  priceBtnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceDetailsView2: {
    width: '60%',
    height: hp('4.5'),
    alignSelf: 'flex-end',
    marginTop: hp('1'),
    flexDirection: 'row',
    '@media (max-width: 1600px) and (min-width: 500px)': {
      width: '90%',
      height: hp('4.5'),
    },
    '@media (max-width: 500px)': {
      width: '70%',
      height: hp('5'),
    },
  },
  priceDetailsView1: {
    backgroundColor: 'white',
    borderRadius: wp('1'),
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
  },
  dltCartbtn: {
    alignItems: 'center',
    height: '88%',
    width: '88%',
    backgroundColor: '#FFD8D8',
    borderRadius: wp('1'),
  },
  cardTxt: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('1'),
    '@media (max-width: 1600px) and (min-width: 500px)': {
      marginLeft: wp('1'),
    },
    '@media (max-width: 500px)': {
      marginLeft: wp('2.5'),
    },
  },
  backTmpbtn: {
    alignItems: 'center',
    height: '88%',
    width: wp('60'),
    backgroundColor: '#1ED18C',
    borderRadius: wp('1'),
    marginRight: wp('65'),
    justifyContent: 'center',
    '@media (max-width: 1600px) and (min-width: 500px)': {
      marginRight: wp('65'),
      width: wp('58'),
    },
    '@media (max-width: 500px)': {
      marginRight: wp('50'),
      width: wp('53'),
    },
  },
  backTmpbtntxt: {
    fontSize: hp('1.5'),
    color: 'white',
    '@media (max-width: 1600px) and (min-width: 500px)': {
      fontSize: hp('1.7'),
    },
    '@media (max-width: 500px)': {
      fontSize: hp('1.9'),
    },
  },
  cartbtn: {
    alignItems: 'center',
    height: '88%',
    width: '88%',
    backgroundColor: '#1ED18C',
    borderRadius: wp('1'),
  },
  edtCartbtn: {
    alignItems: 'center',
    height: '88%',
    width: '88%',
    backgroundColor: 'white',
    borderWidth: wp('0.2'),
    borderColor: '#1ED18C',
    borderRadius: wp('1'),
  },

  edtCopybtn: {
    alignItems: 'center',
    height: '88%',
    width: '88%',
    backgroundColor: '#EEEEEE',
    borderRadius: wp('1'),
  },
  cardTxtView1: {
    flex: 1.8,
    height: hp('6'),
    marginLeft: wp('0'),
    marginRight: wp('1'),
    justifyContent: 'center',
    '@media (max-width: 1600px) and (min-width: 500px)': {},
    '@media (max-width: 500px)': {
      width: wp('90'),
    },
  },
  subcardTxtUnitPrice: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    textAlign: 'right',
  },
  subcardTxt: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    '@media (max-width: 1600px) and (min-width: 500px)': {
      fontSize: txt_size,
    },
    '@media (max-width: 500px)': {
      fontSize: txt_size + 1,
    },
  },
  subcardTxtPacks: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    '@media (max-width: 1600px) and (min-width: 500px)': {
      fontSize: txt_size,
    },
    '@media (max-width: 500px)': {
      fontSize: txt_size + 1,
    },
  },
  seedsTxt: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    marginLeft: wp('1'),
  },
  priceView1: {
    flex: 0.9,
    height: hp('6'),
    alignItems: 'flex-end',
    //  flexDirection:'row',
    justifyContent: 'center',
    marginLeft: wp('1.5'),
  },
  subcardTxtPrice: {
    fontSize: txt_size + 2,
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
  },
  subView1: {
    flex: 0.5,
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView: {
    flex: 0.8,
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  quoteTxt: {
    marginLeft: wp('2'),
    flex: 1,
    fontSize: txt_size + 2,
    fontFamily: Fonts.PoppinsBold,
    color: '#cacccc',
  },
  quoteTxt2: {
    width: '100%',
    fontSize: txt_size + 1,
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    marginRight: wp('1.5'),
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
  quoteTxt2View: {
    flex: 0.5,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: 'contain',
    //resizeMethod: 'cover',
  },
  noteBtnView: {
    width: wp('6'),
    paddingLeft: wp('1'),
    alignSelf: 'center',
    '@media (max-width: 450px)': {
      // backgroundColor: "red",
      width: wp('17'),
      //  marginTop:wp('-3'),
    },
  },
  noteText: {
    color: 'black',
  },

  noteView: {
    width: '100%',
    height: hp('6'),
    padding: 10,
    // backgroundColor: "#EBFFE8",

    // marginBottom: hp("1"),
    borderTopRightRadius: wp('0'),
    borderTopLeftRadius: wp('0'),
    alignSelf: 'center',
    flexDirection: 'row',
    '@media (max-width: 450px)': {
      padding: 5,
      height: hp('10'),
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
      height: hp("17.5"),
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
    width: wp("50"),
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
