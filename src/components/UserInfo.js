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
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { UpdateProfileDetails } from "../actions/MyProfileAction";
import Styles from "../style/ProfileStyle";
import { Actions } from "react-native-router-flux";


import getBaseUrl from "../url/getBaseUrl";
import { useIsFocused } from "@react-navigation/native";

import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { connect, useDispatch, useSelector } from "react-redux";
import NumericInput from "react-native-numeric-input";
import { pinchHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/PinchGestureHandler";

const search = require("../assets/BlueLeft.png");

export const UserInfoFunc = ({ l_Token, userDetails_, tab, navigation, time }) => {
  const [usernameinfo, setUsernameinfo] = useState();
  const [fnameinfo, setFnameinfo] = useState(null);
  const [lnameinfo, setLnameinfo] = useState(null);
  const [emailinfo, setEmailinfo] = useState(null);
  const [phoneinfo, setPhoneinfo] = useState(null);


  const { connectionStatus } = useSelector((s) => s.loading);
  
  const login = useSelector((state) => state.login);

  const [tabval, setTabVal] = useState(1);

  const isFocused = useIsFocused();

  const update_user = () => {
    console.log(fnameinfo);
    UpdateProfileDetails(
      l_Token,
      usernameinfo,
      fnameinfo,
      lnameinfo,
      emailinfo,
      phoneinfo
    );
   
  };


  const getProfileDetailsFromApi = async () => {
    console.log("get profile details");
    if (l_Token != "blank") {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${l_Token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `${getBaseUrl()}Account/GetProfile`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            var productResults = JSON.parse(result);
            let products = [];
            let username =  productResults["username"];
            let email = productResults["email"];
            let fname = productResults["firstName"];
            let lname = productResults["lastName"];
            let phone = productResults["userPhone"];
            setUsernameinfo(username)
            setEmailinfo(email);
            setFnameinfo(fname);
            setLnameinfo(lname);
            setPhoneinfo(phone);

          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const getProfileDetailsFromState = async () => {
    
    setUsernameinfo(login.accountInfo.customerEmail)
    setEmailinfo(login.accountInfo.customerEmail);
    setFnameinfo(login.accountInfo.customerFirstName);
    setLnameinfo(login.accountInfo.customerLastName);
    setPhoneinfo(login.accountInfo.customerPhone);

    

  };


  useEffect(() => {
    
    if (connectionStatus) {
      getProfileDetailsFromApi();  
    }else{
      getProfileDetailsFromState();  
    }
   

    setTabVal(tab)
    
  },[tabval != tab, isFocused])

  // useEffect(() => {
  //   alert('render!');

  //   getProfileDetailsFromApi();
  //   setTabVal(tab)
    
  // },[navigation])

  const cancel_user = () => {
    setFnameinfo(userDetails_.fname.toString());
    setLnameinfo(userDetails_.lname.toString());
    setPhoneinfo(userDetails_.phone.toString());
  };

  return (
    <ScrollView style={{ height: hp("73%") }}>
      <KeyboardAvoidingView style={Styles.cardView}>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Username:
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            allowFontScaling={false}
            style={Styles.TxtInputDisable}
            placeholderTextColor="gray"
            editable={false}
            onChangeText={(text) => setUsernameinfo(text)}
          >
            {emailinfo}
            {/* {userDetails_.email} */}
          </TextInput>
        </View>

        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            First Name:<Text style={{color:'red'}}>*</Text>
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            allowFontScaling={false}
            style={Styles.TxtInput}
            placeholderTextColor="gray"
            onChangeText={(text) => setFnameinfo(text)}
          >
            {fnameinfo}
            {/* {userDetails_.fname} */}
          </TextInput>
        </View>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Last Name:<Text style={{color:'red'}}>*</Text>
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            allowFontScaling={false}
            style={Styles.TxtInput}
            placeholderTextColor="gray"
            onChangeText={(text) => setLnameinfo(text)}
          >
            {lnameinfo}
            {/* {userDetails_.lname} */}
          </TextInput>
        </View>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Email:
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            allowFontScaling={false}
            style={Styles.TxtInputDisable}
            placeholderTextColor="gray"
            onChangeText={(text) => setEmailinfo(text)}
            editable={false}
          >
            {emailinfo}
            {/* {userDetails_.email} */}
          </TextInput>
        </View>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Phone:<Text style={{color:'red'}}>*</Text>
          </Text>
        </View>
        <View style={Styles.txtInputView}>
          <TextInput
            allowFontScaling={false}
            style={Styles.TxtInput}
            placeholderTextColor="gray"
            onChangeText={(text) => setPhoneinfo(text)}
          >
            {phoneinfo}
            {/* {userDetails_.phone} */}
          </TextInput>
        </View>
        <View style={Styles.textViewLog}>
          <Text style={Styles.logoutText} allowFontScaling={false}>
          Please contact Kings Seeds to change your email or username
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={Styles.btnView} onPress={() => update_user()}>
          <Text style={Styles.BtnTxt} allowFontScaling={false}>
            UPDATE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9}
          style={Styles.cancelBtn}
          onPress={() => cancel_user()}
        >
          <Text style={Styles.cancelTxt} allowFontScaling={false}>
            CLEAR
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    width: wp("65"),
    height: hp("4.5"),
    backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
  },
  btnTab: {
    width: wp(65) / 2,
    borderWidth: 0.5,
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
    borderColor: "#EFF8FB",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textTab: {
    fontSize: hp(1.7),
    color: "#20d48c",
  },
  textTabActive: {
    fontSize: hp(1.7),
    color: "#fff",
    alignItems: "center",
  },
  btnTabActive: {
    backgroundColor: "#20d48c",
  },
});
