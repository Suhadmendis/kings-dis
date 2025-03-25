import { Dimensions, Platform, PixelRatio } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
let widthper = wp("100%");
let txt_size = 0;
let btn_size = wp("6.5");
if (widthper <= 500.0) {
  txt_size = hp("1.6");
  btn_size = wp("8");
} else {
  txt_size = hp("1.4");
  btn_size = wp("6.5");
}
module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  addIcon: {
    marginTop: hp("1.2"),
    width: wp("2.6"),
    height: wp("2.6"),
  },
  titleTxt: {
    fontSize: hp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    height: hp("3"),
    alignSelf: "center",
    //textAlign: 'center',
  },
  titleView: {
    width: wp("94"),
    height: hp("5"),
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1"),
  },

  addIcon: {
    alignSelf: "center",
    marginLeft: wp("2"),
    width: wp("3"),
    height: hp("2.9"),
    resizeMode: "contain",
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {},
  },

  newContactTxt: {
    fontSize: wp("2.3"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    alignSelf: "center",
    marginRight: wp("2"),
    marginLeft: wp("2"),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      marginLeft: wp("1"),
      fontSize: wp("2.6"),
    },
    //textAlign: 'center',
  },
  addCustomerBtn: {
    width: wp("33"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    marginLeft: "1%",
    position: "absolute",
    right: 0,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      width: wp("35"),
      height: hp("4"),
    },
  },
  containView: {
    marginTop: hp("1"),
    height: hp("67"),
    width: wp("95"),
  },
  footerCardView: {
    width: "99%",
    height: hp("6"),
    backgroundColor: "white",
    borderRadius: wp("1"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: hp("1"),
    alignSelf: "center",
    justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      alignItems: "center",
    },
    "@media (max-width: 450px)": {
      height: hp("6.5"),
      flexDirection: "column",
    },
  },
  cardInsideMain:{
    width: "95%",
    height: hp("5"),
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexDirection:'row',
      height: hp("5"),
    },
    "@media (max-width: 450px)": {
      flexDirection: "column",
      height: hp("6"),
      alignSelf:'center'
    },
  },
  cardInside1:{
    width: "36%",
    height: hp("5"),
    justifyContent:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "36%",
      height: hp("5"),
    },
    "@media (max-width: 450px)": {
      width: "100%",
      height: hp("3"),
      flexDirection:'row',
      alignItems:'flex-end'
    },
  },
  cardInside2:{
    width: "64%",
    height: hp("5"),
    flexDirection:'row',
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "64%",
      height: hp("5"),
    },
    "@media (max-width: 450px)": {
      width: "100%",
      height: hp("3"),
      flexDirection:'row',
      alignItems:'flex-start'
    },
  },
  paymentRefTxt:{
    fontSize:hp('1.5'),
    color:colors.primaryColor,
    "@media (max-width: 450px)": {
     position:'absolute',
     left:0,
     fontSize:hp('1.6'),
     width:wp('60')
    },
  },
  paymentDateTxt:{
    fontSize:hp('1.2'),
    color:colors.fourthiaryColor,
    "@media (max-width: 450px)": {
      position:'absolute',
      right:0,
      fontSize:hp('1.4'),
     },
  },
  paymentPriceTxt:{
    fontSize:hp('1.6'),
    color:colors.primaryColor,
    position:'absolute',
    right:0,
    fontWeight:'bold'
  },
  paymentStatusTxt:{
    fontSize:hp('1.4'),
    color:'black',
    marginLeft:wp('3'),
    width:wp('35'),
    "@media (max-width: 450px)": {
      marginLeft:wp('0'),
      fontSize:hp('1.5'),
      width:wp('60')
     },
  }
});
