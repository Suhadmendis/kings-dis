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
import { Actions } from "react-native-router-flux";
import Styles from '../style/StoreStoreAllStyle';
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { connect, useDispatch, useSelector } from "react-redux";
import NumericInput from "react-native-numeric-input";

const search = require("../assets/BlueLeft.png");



export const StoreStoreAll = () => {
 
    return (
        //         <Text style={Styles.titleTxt} allowFontScaling={false}>
        //     Store All
        //   </Text>

    <View style={{width: wp('90') }}>
        <TouchableOpacity activeOpacity={0.9}
          style={Styles.footerCardView} 
        //   onPress={() => {
        //     this.props.getProductDetails(this.props.loginToken, item.skuid);
        //   }}
          >
          <View style={Styles.cardImgView}>
            {/* <Image source={{uri: item.imageurl}} style={Styles.cardSubImg} /> */}
          </View>
          <View style={Styles.cardMainTxtView}>
            <View style={Styles.cardSubTxtView}>
              <Text
                style={Styles.cardSubMainTxt}
                numberOfLines={1}
                allowFontScaling={false}>
              </Text>
            </View>
            <View>
                <Text style={Styles.packtxt} allowFontScaling={false}>1555555</Text>
            </View>
            <View style={Styles.cardSubTxtView2}>
                <Text style={Styles.cardSubTxt} allowFontScaling={false}>
                    25/02/2021 06:14:02
                </Text>
                <Text style={Styles.stocktxt} allowFontScaling={false}>
                    Order completed and consolidated
                </Text>
                <Text style={Styles.cardSubTxt2} allowFontScaling={false}>
                    In Stock
                </Text>
            </View>
          </View>
        </TouchableOpacity>
    </View>

  );
};
