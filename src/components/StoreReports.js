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

import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { connect, useDispatch, useSelector } from "react-redux";
import NumericInput from "react-native-numeric-input";

const search = require("../assets/BlueLeft.png");



export const StoreReports = () => {
 
  return (
    <View style={{alignItems:'center',justifyContent:'center',width:'100%',flex:1}}>
  <Text style={{color:'#000',fontSize:25}} allowFontScaling={false}>
            View s
          </Text>
    </View>
              

  );
};
