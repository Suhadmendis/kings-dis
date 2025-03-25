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
  stylesheet,
  Dimensions,
  Linking
} from "react-native";
import { UpdateProfileDetails } from "../actions/MyProfileAction";
import Styles from "../style/StoreContactsStyle";
import { useIsFocused } from "@react-navigation/native";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";

import { showMessage } from "react-native-flash-message";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colors from '../style/Common/ColorsStyle'
import Tooltip from 'rn-tooltip';
const { ids, styles } = Styles;

import {GetTradeStoresLocal_ByAdminCustomerId} from '../offline/localData/serviceData/GetTradeStoresLocal'

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/editline2xgreen.png");
//const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");
//const smsicon = require("../assets/msg-icon.png");

const telicon = require("../assets/Contacts/telephone2x.png");
const smsicon = require("../assets/Contacts/messagesquare2x.png");

import DataAdapter from "../offline/localData/DataAdapter";
import ConfirmationBox from "./common/ConfirmationBox";

import deleteLocalContact from "./contacts/deleteLocalContact";
import deleteApiContact from "./contacts/deleteApiContact";

import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";

const contactDetails_ = [
  {
    contactId: 1,
    name: "David Blackurn",
    address: "136 methl road bunabhann eeadara, hs3",
    phone: "+971 123 456 789",
    email: "davidblackun@kingsseeds.com",
  },
  {
    contactId: 2,
    name: "John Doe",
    address: "15  nethan road bunabhann eeadara, hs6",
    phone: "+971 547 555 125",
    email: "johndoe@kingsseeds.com",
  },
  {
    contactId: 3,
    name: "Claude MacMahn",
    address: "44 keels road manchester, gg1",
    phone: "+974 254 222 441",
    email: "clmacww@kingsseeds.com",
  },
];

async function initialApi(adminCustomerID) {
  const payload = {
    section: "API CONTACTS",
    opration: "STORE GET",
    data: { adminCustomerID },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function initial(adminCustomerID) {
  const payload = {
    section: "LOCAL CONTACTS",
    opration: "GET",
    data: { type: "", adminCustomerID },
  };

  const newpro = await DataAdapter(payload);
  console.log(newpro);
  return newpro;
}

async function deleteContact(id) {
  const payload = {
    section: "LOCAL CONTACTS",
    opration: "DELETE",
    data: { id },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function getCountries() {
  const payload = {
    section: "",
    opration: "ADDRESS COUNTRIES",
    data: "",
  };

  const countries_ = await DataAdapter(payload);
  return countries_;
}



async function initialLocalContacts(searchTerm) {
  let res = await GetTradeStoresLocal_ByAdminCustomerId(searchTerm,0,0)
  let contacts =[];
  if(res != []){
    for (let i = 0; i < res.length; i++) {
      const e = res[i];
      let obj = {
        name:e.tradeAccountName,
        address:e.addressDisplay,
        phone:e.addressPhone,
        email:e.adminCustomerEmail
      }
      contacts.push(obj)
    }
  }

  return contacts;
}

async function getLocalContactList() {
  let res = await GetTradeStoresLocal_ByAdminCustomerId('',0,0)

  console.log(res);
  let contacts =[];
  if(res != []){
    for (let i = 0; i < res.length; i++) {
      const e = res[i];
      let obj = {
        name:e.addressPersonalName,
        address:e.addressDisplay,
        phone:e.addressPhone,
        email:e.adminCustomerEmail
      }
      contacts.push(obj)
    }
  }

  return contacts;
}

const StoreContact = ({ navigation }) => {

  const isFocused = useIsFocused();


  const [token, setToken] = useState("blank");
  const [loading, setLoading] = useState(true);

  const [contacts, setContacts] = useState([]);

  const [apiContacts, setApiContacts] = useState([]);
  const [localContacts, setLocalContacts] = useState([]);

  const [showdialog, setShowdialog] = useState(false);
  const [deleteYes, setDeleteYes] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [contentText, setContentText] = useState("");
  const [btnName, setBtnName] = useState("");
  const [countries, setCountries] = useState([]);

  const tokn = useSelector((state) => state.login.loginToken);
  const adminCustomerID = useSelector((state) => state.findStore.adminCustomerID);

  const cusEmail = useSelector((state) => state.findStore.cusEmail);
  useEffect(() => {
    setToken(tokn);
   // store.dispatch({ type: "CustomSpinner:SHOW" });


    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    if(internetConnectivity){
      initialApi(adminCustomerID).then((res) => {

        res = addEmailToArray(res);

        setApiContacts(res);
      });
    }else{
      getLocalContactList().then((res) => {
        setApiContacts(res);
      });

    }

    getCountries().then((res) => setCountries(res));

    initial(adminCustomerID).then((res) => {
      console.log('============================================================================');

      res = refactorWithCountry(res);

      setLocalContacts(res);
     // store.dispatch({ type: "CustomSpinner:HIDE" });
    });

  }, [isFocused]);


  refactorWithCountry = (contactsArray) => {
    contactsArray = contactsArray.map(element => {
      country = countries.filter(country => country.id == element.country);
      let contact;


      if (country.length > 0) {
        element = {
          ...element,
          country: country[0].displayName
        }

      }

      return element;
    });
    return contactsArray;
  }

  // main operation - get delete
  generateDelete = (id) => {
    deleteContact(id).then((res) => {
      if (res == 1) {
        initial().then((res) => {
          setLocalContacts(res);
        });
      }
    });
  };

  addEmailToArray = (contactsArray) => {
    contactsArray.map((contact) => {

      contact.email = cusEmail;
      return contact;
    })

    return contactsArray;

  };

  onPressAdd = () => {
    navigation.navigate("storeNew", {
      tab: 6,
      subTabVal: "contactForm",
      storeContactVt: "Addcontact",
    });
  };
  onPressEdit = (id) => {
    // navigation.navigate(storeContactForm, { vt: "Editcontact", id  });
    navigation.navigate("storeNew", {
      tab: 6,
      subTabVal: "contactForm",
      storeContactVt: "Editcontact",
      editContactid: id,
    });
  };
  const onPressView = () => {
    navigation.navigate(storeContactForm, { vt: "Viewcontact" });
  };
  const onPressNotes = () => {
    navigation.navigate("contactNotes");
  };

  calculateWidth = (note) => {
    if(typeof note=='string'){
      if (note.length < 50){
        return wp('50');
      }
      if (note.length < 100){
        return wp('80');
      }
      if (note.length < 200){
        return wp('80');
      }
      if (note.length < 300){
        return wp('80');
      }
      if (note.length < 400){
        return wp('80');
      }
    }

  }


  calculateHeight = (note) => {
    if(typeof note=='string'){
      if (note.length < 50){
        return hp('4');
      }
      if (note.length < 100){
        return hp('7');
      }
      if (note.length < 200){
        return hp('10');
      }
      if (note.length < 300){
        return hp('10');
      }
      if (note.length < 400){
        return hp('10');
      }
    }

  }

  //confirmation box functions
  deleteFunction_ = (e) => {
    setDeleteItemId(e);
    // deleteOrderItem();
    setBtnName("itemDelete");
    confirmShowHide("Are you sure you want to delete this item?");
  };

  const deleteOrderItem = async () => {




    const contact = localContacts.filter(contact => contact.id == deleteItemId)[0];

    console.log('readyto sync - ', contact);



    if (contact.readyToSync == 0) {

      const res = await deleteApiContact(contact.id, contact.WebContactId);
      if (res.status == 'Success') {
        showMessage({
          message: "KINGS SEEDS",
          description: 'Contact deleted successfully',
          type: "success",
          autoHide: true,
        });
        initial(adminCustomerID).then((res) => {
          setLocalContacts(res);
        });
      }else{
        showMessage({
          message: "KINGS SEEDS",
          description: res.body,
          type: "warning",
          autoHide: true,
        });
      }
      console.log(res);
       //delete from server and local
     }else{

      const res = await deleteLocalContact(contact.id);
      // console.log(res);

      initial(adminCustomerID).then((res) => {
        setLocalContacts(res);
      });


     }

    // generateDelete(deleteItemId);
    closeConfirmation();
  };

  const clearListFunc = () => {
    clearOrders();
    closeConfirmation();
  };

  // props.deleteFunction(e.id);

  confirmShowHide = (contentTxt) => {
    setShowdialog(!showdialog);
    setContentText(contentTxt);
  };

  closeConfirmation = () => {
    setShowdialog(!showdialog);
  };
  //confirmation box functions end

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      {/* <CustomSpinner /> */}
        {btnName == "itemDelete" ? (
          <ConfirmationBox
            showHide={showdialog}
            yes={() => deleteOrderItem()}
            no={() => closeConfirmation()}
            contentText={contentText}
          />
        ) : (
          <ConfirmationBox
            showHide={showdialog}
            yes={() => clearListFunc()}
            no={() => closeConfirmation()}
            contentText={contentText}
          />
        )}
        <View style={styles.titleView}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.addCustomerBtn}
            onPress={this.onPressAdd.bind(this)}
          >
            <Image source={filter} style={styles.addIcon} />
            <Text style={styles.newContactTxt} allowFontScaling={false}>
              Add New Contact
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginBottom: hp("8%") }}
        >
          <ContactList mainData={apiContacts} platformType={"API"} />
          <ContactList
            mainData={localContacts}
            platformType={"LOCAL"}
            deleteFunction={generateDelete}
          />
        </ScrollView>
      </View>
    </View>
  );
};

function ContactList(props) {
  //let txtnote = "A while back I needed to count"
  if (props.mainData != 0) {
    return (
      <View>
        {props.mainData.map(e => (
          <View style={styles.footerCardView} key={e.id}>
            <View style={styles.cartItemTextView}>
              <View style={styles.cardTxtView1}>
                <View style={styles.fcardTxtView1main}>
                <View style={styles.fcardTxtView1}>
                  <Text
                    style={styles.cardTxt}
                    allowFontScaling={false}
                    numberOfLines={1}>
                    {e.name}
                  </Text>
                  <Text
                    style={[
                      styles.cardSubMainTxt,
                      {color: colors.color_gray},
                      e.jobRole == '' || e.jobRole == null
                        ? {display: 'none'}
                        : null,
                    ]}
                    allowFontScaling={false}
                    numberOfLines={1}>
                    {e.jobRole}
                  </Text>
                </View>
                <View style={[styles.fcardTxtView2, e.notes == '' || e.notes==null ? {display:'none'}: null]}>
                  <Tooltip
                  backgroundColor={'#ede7e7'}
                  pointerColor={'#ddd9d9'}
                  width={calculateWidth(e.notes)}
                  height={calculateHeight(e.notes)}
                  containerStyle={{borderRadius:hp('1'), borderWidth:hp('0.1'), borderColor:'#ddd9d9'}}
                  popover={
                  <View style={{height:hp('9'), justifyContent:'center'}}>
                    <Text
                    style={{fontSize:hp('1.5'), color:'#333'}}
                    numberOfLines={4}
                    >{e.notes}</Text>
                  </View>
                  }>
                    <View style={styles.tooltipBtn}>
                    <Text style={styles.fcardtxt}>i</Text>
                    </View>
                  </Tooltip>
                </View>
                </View>


                <Text
                  style={styles.cardSubMainTxt}
                  allowFontScaling={false}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {props.platformType == 'API'
                    ? e.address
                    : e.addressLine1 +
                      ' ' +
                      e.addressLine2 +
                      ' ' +
                      e.addressLine3 +
                      ' ' +
                      e.city +
                      ' ' +
                      e.state +
                      ' ' +
                      e.postCode +
                      ' ' +
                      e.country}
                </Text>
              </View>
              <View style={styles.subAllView}>
                <View style={styles.subView}>
                  <Text
                    style={styles.subcardTxt}
                    allowFontScaling={false}
                    numberOfLines={1}>
                    {e.phone}
                  </Text>
                  <Text
                    style={styles.emailTxt}
                    allowFontScaling={false}
                    numberOfLines={2}>
                    {e.email}
                  </Text>
                </View>
                <View
                  style={
                    props.platformType == 'LOCAL'
                      ? styles.iconViewLocal
                      : styles.iconViewApi
                  }>
                  {/* <TouchableOpacity activeOpacity={0.9}
                      style={styles.eyeBtn}
                       onPress={onPressView.bind(this)}
                    >
                      <Image source={viewicon} style={styles.cardImg} />
                    </TouchableOpacity> */}

                  {props.platformType == 'LOCAL' ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.eyeBtn}
                      onPress={() => {
                        this.onPressEdit(e.id);
                      }}>
                      <Image source={edticon} style={styles.cardImg} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity />
                  )}

                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.eyeBtn}
                    onPress={() => {
                      Linking.openURL(`tel:${e.phone}`);
                    }}>
                    <Image source={telicon} style={styles.cardImg} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.eyeBtn}
                    onPress={() => {
                      Linking.openURL(`sms:${e.phone}`);
                    }}>
                    <Image source={smsicon} style={styles.cardImg} />
                  </TouchableOpacity>

                  {props.platformType == 'LOCAL' ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.delBtn}
                      onPress={() => {
                        // this.setState({
                        //   deleteItemId: e.id,
                        //   btnName: "itemDelete",
                        // });

                        let state = store.getState();
                        let internetConnectivity = state.loading?.connectionStatus;


                        if (internetConnectivity) {
                          deleteFunction_(e.id);
                        }else{
                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Please check the Network Connection",
                            type: "warning",
                            autoHide: true,
                          })
                        }

                        ;
                      }}>
                      <Image source={del} style={styles.cardImg} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity />
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  } else {
    return <View></View>;
  }
}
// const ContactList = (props) => {

// }

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {})(StoreContact);

let widthper = wp("100%");
let crd_wdth = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("75");
} else {
  crd_wdth = wp("65");
}
