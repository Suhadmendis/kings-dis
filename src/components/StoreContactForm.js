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
  StyleSheet,
  Dimensions,
} from "react-native";
import { UpdateProfileDetails } from "../actions/MyProfileAction";
import Styles from "../style/StoreContactFormStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colors from '../style/Common/ColorsStyle';

import DataAdapter from '../offline/localData/DataAdapter';

const { width: WIDTH, height: height } = Dimensions.get('window');
const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");

async function updateContact(data){

  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'UPDATE',
    data
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}



async function addContact(data){

  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'ADD',
    data
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function searchContact(data){




  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'SEARCH',
    data
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}



const StoreContactForm = ({ navigation, editContactid,viewtype}) => {
  const [token, setToken] = useState("blank");
  const [loading, setLoading] = useState(true);

  const [vt, setVt] = useState(viewtype);



  const [editId, setEditId] = useState('');

  const [id, setId] = useState('');
  const [nameText, setNameText] = useState('');
  const [addressText, setAddressText] = useState('');
  const [numberText, setNumberText] = useState('');
  const [emailText, setEmailText] = useState('');


  const adminCustomerID = useSelector((state) => state.findStore.adminCustomerID);




  const tokn = useSelector((state) => state.login.loginToken);
  useEffect(() => {
    console.log("tokennnn---" + tokn);
    setToken(tokn);
    setNameText('fsds');



    if(editContactid != ''){
      setEditId(editContactid);


      searchContact(editContactid).then(res => {


        setNameText('fsds');
        setAddressText(res[0].address);
        setNumberText(res[0].phone);
        setEmailText(res[0].email);

      });
    }

  }, []);





  return (

      <View style={sty.container}>

        {/* <Back /> */}
        <View style={Styles.titleView}>
          <View style={Styles.contactTitle}>
            {vt == "Addcontact" ? (
              <Text style={Styles.titleTxt} allowFontScaling={false}>
                Add New Contact
              </Text>
            ) : vt == "Editcontact" ? (
              <Text style={Styles.titleTxt} allowFontScaling={false}>
                Edit Contact
              </Text>
            ) : (
              <Text style={Styles.titleTxt} allowFontScaling={false}>
                View Contact
              </Text>
            )}
          </View>
        </View>
        <View
            style={{ width: "100%", height: hp('75%')}}
          >
            <ScrollView style={{ width: "100%" }}>
              <View style={sty.cardView}>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Name:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>{
                        setNameText(text);
                      }}
                      value={nameText}

                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>{
                        setNameText(text);
                      }}
                      value={nameText}

                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}

                    >

                    </TextInput>
                  )}
                </View>

                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Contact Number:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>{
                        setNumberText(text);
                      }}
                      value={numberText}

                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>{
                        setNumberText(text);
                      }}
                      value={numberText}
                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}

                    >

                    </TextInput>
                  )}
                </View>

                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Email Address:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>{
                        setEmailText(text);
                      }}
                      value={emailText}
                      // onChangeText = {(text) => setCurrentPassword(text)}
                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>{
                        setEmailText(text);
                      }}
                      value={emailText}
                      // onChangeText = {(text) => setCurrentPassword(text)}
                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}
                      // onChangeText = {(text) => setCurrentPassword(text)}
                    >

                    </TextInput>
                  )}
                </View>
              </View>
              {vt == "Addcontact" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    height: hp("5"),
                    width: "100%",
                  }}
                >
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.clearListBtn}
                    onPress={() => {
                      navigation.navigate('storeNew', { tab: 6 ,subTabVal:""});
                    }}
                  >
                    <Text style={sty.clearListTxt} allowFontScaling={false}>
                      BACK TO CONTACT LIST
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.AddToCartBtn}
                    onPress={() => {


                      if(nameText == ''){
                        alert("Please enter Name");
                        return;
                      }

                      // if(addressText == ''){
                      //   alert("Please enter Address");
                      //   return;
                      // }

                      if(numberText == ''){
                        alert("Please enter Contact Number");
                        return;
                      }

                      if(emailText == ''){
                        alert("Please enter Email");
                        return;
                      }


                      const data = { name: nameText, address: addressText, number: numberText, email: emailText, adminCustomerID: adminCustomerID };

                      addContact(data).then(res => {

                        alert("Successfully Added");

                        setNameText('');
                        setAddressText('');
                        setNumberText('');
                        setEmailText('');


                      });



                    }}
                  >
                    <Text style={sty.checkoutTxt} allowFontScaling={false}>
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : vt == "Editcontact" ? (
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  height: hp("5"),
                  width: "100%",
                }}
                >
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.clearListBtn}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  >
                    <Text style={sty.clearListTxt} allowFontScaling={false}>
                      BACK TO CONTACT LIST
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.AddToCartBtn}
                    onPress={() => {



                      const data = { id: editId, name: nameText, address: addressText, number: numberText, email: emailText };


                      updateContact(data).then(res => {

                        res == 1 ? alert("Successfully Updateed") : alert("Something went wrong")

                      });


                    }}
                  >
                    <Text style={sty.checkoutTxt} allowFontScaling={false}>
                      UPDATE
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  height: hp("5"),
                  width: "100%",
                }}
                >
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.clearListBtn}
                    onPress={() => {
                      navigation.goBack();
                      // this.props.navigation.navigate(contacts();
                    }}
                  >
                    <Text style={sty.clearListTxt} allowFontScaling={false}>
                      BACK TO CONTACT LIST
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
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
export default connect(mapStateToProps, {})(StoreContactForm);

let widthper = wp("100%");
let crd_wdth = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("75");
} else {
  crd_wdth = wp("65");
}

const sty = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '70%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#F9F9F9'
  },
    mainBox: {
      width: wp("86"),
      height: hp("10"),
      backgroundColor: "red",
      // borderRadius: 15,
      // flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "flex-start",
      alignSelf: "center",
      marginTop: hp("-20%"),
    },
    AddToCartBtn: {
      width: wp("92") / 2,
      height: hp("4.5"),
      backgroundColor: colors.primaryColor,
      borderRadius: wp('2'),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    clearListBtn: {
      width: wp("92") / 2,
      height: hp("4.5"),
      borderRadius: wp('2'),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: wp("1"),
      backgroundColor: "#fffcfc",
      borderWidth: hp("0.14"),
      borderColor: colors.primaryColor,
    },
    clearListTxt: {
      fontSize: hp("1.5"),
      color: colors.primaryColor,
      // justifyContent: 'center',
    },
    checkoutTxt: {
      fontSize: hp("1.5"),
      color: "white",
      // justifyContent: 'center',
    },
    cardView: {

      width: wp("100"),
      height: hp("35%"),
      marginBottom: "5%",
      paddingBottom: hp("2"),
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    textView: {
      width: "92%",
      height: hp("3"),
      //backgroundColor: 'red',
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: hp("1"),
    },
    txtInputView: {
      width: "92%",
      height: hp("4.5"),
      // backgroundColor: '#EFF8FB',
      borderColor: "#e6e6e6",
      alignItems: "flex-start",
      justifyContent: "center",
      borderRadius: wp('2'),
      marginTop: hp("1%"),
      borderWidth: hp("0.1"),
    },
    TxtInput: {
      width: "80%",
      height: hp("7"),
      fontSize: hp(1.6),
      //backgroundColor: 'red',
      marginLeft: wp("3"),
      color: "gray",
    },
    itemTxt: {
      height: hp("3"),
      fontSize: hp("1.6"),
      color: "black",
      marginTop: hp("1"),
    },
    postalTxtInput: {
      width: "90%",
      height: hp("10"),
      fontSize: hp(1.8),
      //backgroundColor: 'red',
      marginLeft: wp("3"),
      color: "gray",
      justifyContent: "flex-start",
      textAlignVertical: "top",
    },
    postaltxtInputView: {
      width: "85%",
      height: hp("10"),
      // backgroundColor: '#EFF8FB',
      borderColor: "#e6e6e6",
      alignItems: "flex-start",
      justifyContent: "center",
      borderRadius: 10,
      marginTop: hp("2%"),
      borderWidth: hp("0.1"),
    },
  });
