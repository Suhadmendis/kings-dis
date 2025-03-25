import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Styles from "../../style/BackStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import StyleSheet from "react-native-media-query";
import { Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/core'

// import { jsxAttribute } from "@babel/types";
const arrow = require("../../assets/left-arrow.png");

const { ids, styles } = Styles;

const WarningMessage = () => {
  return (
    <View
    style={{
      backgroundColor: "#fff3cd",
      height: hp("4.5"),
      width: wp("94"),
      marginTop: hp("2"),
      alignSelf: "center",
      borderRadius: wp("1"),
      borderColor: "#ffecb5",
      borderWidth: wp("0.2"),
      justifyContent: "center",
      alignItems:'center'
    }}
  >
    <Text style={{ color: "#664d03", fontSize:hp('1.6') }}>No results found</Text>
  </View>
  );
}


const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(WarningMessage);
