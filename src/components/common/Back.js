import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Styles from "../../style/BackStyle";
import { Actions } from "react-native-router-flux";
import { connect, useSelector } from "react-redux";
import StyleSheet from "react-native-media-query";
import { Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/core'
import * as colors from '../../style/Common/ColorsStyle';
import isTokenExpired from "./TokenOperation";
import { store } from "../../../configureStore";
import { tokenLogOut } from "../../actions/HomeScreenAction";
// import { jsxAttribute } from "@babel/types";
const arrow = require("../../assets/left-arrow.png");

const { ids, styles } = Styles;

const Back = () => {


  const navigation = useNavigation();
  return (
    <View
      style={Styles.fullStyles.backView}
      dataSet={{ media: Styles.ids.backView }}
    >
      <TouchableOpacity activeOpacity={0.9}
        style={styles.backBtn}
        dataSet={{ media: styles.backBtn }}
        onPress={() => {

          const tokenExpired = isTokenExpired();
          if (tokenExpired) {
            tokenLogOut();
          }else{
            navigation.goBack();
          }

        }}
      >
        <View style={styles.icnView}>
          <Image source={arrow} style={Styles.fullStyles.backIcon} />
        </View>
        <Text style={styles.backText} dataSet={{ media: styles.backText }}>
          Back
        </Text>
        {/* <Image source={arrow} style={Styles.fullStyles.backIcon} />


          <Text style={styles.backText} dataSet={{ media: styles.backText }}>
            Back
          </Text> */}
      </TouchableOpacity>
    </View>
  );
}

// const { ids, styles } = StyleSheet.create({
//   backBtn: {
//     // width: wp('10'),
//     // height: hp('3'),
//     borderColor: "#1ED18C",
//     borderWidth: wp("0.2%"),
//     borderRadius: 5,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     "@media (max-width: 1600px) and (min-width: 800px)": {
//       width: wp("10"),
//       height: hp("5"),
//     },
//     "@media (max-width: 800px)": {
//       width: wp("8"),
//       height: hp("1"),
//     },
//   },
//   container: {
//     flex: 1,
//     flexWrap: "wrap",
//     flexDirection: "row",
//     justifyContent: "center",
//     "@media (max-width: 1600px) and (min-width: 800px)": {},
//     "@media (max-width: 800px)": {},
//   },
//   box: {
//     "@media (max-width: 1600px) and (min-width: 800px)": {
//       flexBasis: "46%",
//     },
//     "@media (max-width: 800px)": {
//       flexBasis: "94%",
//     },
//     backgroundColor: "red",
//     borderWidth: 1,
//     borderColor: "black",
//     height: 40,
//     margin: "1%",
//   },
// });

// const { ids, sty} = StyleSheet.create({
//   backBtn:{
//     // width: wp('10'),
//    // height: hp('3'),
//     borderColor:'#1ED18C',
//     borderWidth:wp('0.2%'),
//     borderRadius: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     "@media (max-width: 1600px) and (min-width: 800px)": {
//       width: wp('10'),
//       height: hp('5'),
//     },
//     "@media (max-width: 800px)": {
//       width: wp('8'),
//       height: hp('1'),
//     },
//   },
// });

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Back);
