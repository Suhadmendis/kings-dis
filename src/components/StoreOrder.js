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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResetPasswordDetails } from "../actions/MyProfileAction";
// import Styles from "../style/ProfileStyle";
import Styles from "../style/ProductDetailsStyles";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import NumericInput from "react-native-numeric-input";

const search = require("../assets/BlueLeft.png");

export const StoreOrderFunc = ({ token, tab }) => {
  

 

  

 

  return (
    <ScrollView style={{ height: hp("70%") }}>
      <View style={Styles.cardView}>
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Current Password:
          </Text>
        </View>
        

        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            New Password:
          </Text>
        </View>
       
        <View style={Styles.textView}>
          <Text style={Styles.emailTxt} allowFontScaling={false}>
            Confirm Password:
          </Text>
        </View>
        

        <View style={Styles.textView}>
          <Text style={Styles.logoutText} allowFontScaling={false}>
            App will be automatically logged out once the password is changed
          </Text>
        </View>

 
      </View>
    </ScrollView>
  );
};
