import { Dimensions } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const {StyleSheet} = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  newheaderView: {

    height: hp("6"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("6"),
    },
    "@media (max-width: 500px)": {
      height: hp("10"),
    },
  },
  headerView: {
    width: "100%",
    height: hp("7"),
    backgroundColor: "white",
    //marginTop: hp('2%'),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: '#F1F1F1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 1.6,
    elevation: 2,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("7"),
    },
    "@media (max-width: 500px)": {
      height: hp("7"),
    },
  },
  drawerIcon: {
    // width: 25,
    // height: 18,
    aspectRatio: 1.6,
    marginLeft: wp("3"),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      aspectRatio: 1.2,
    },
  },
  cartIcon: {
    // width: 25,
    // height: 20,
    // width: wp('5'),
    // height: hp('3.5'),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      aspectRatio: 1,
      height: hp("2.5"),
    },
  },
  logoIcon: {
    //marginTop:hp('2'),
    height: hp("3"),
    resizeMode:'contain',
    aspectRatio:6,
    "@media (max-width: 1600px) and (min-width: 500px)": {
    },
    "@media (max-width: 500px)": {
      marginLeft:wp('-2'),
      height: hp("3"),
    },
  },
  logoIconView: {
    width: wp("30"),
    height: hp("10"),
    justifyContent: "center",
  },
  store: {
    marginTop: hp("-1"),
    width: wp("24"),
    height: wp("5"),
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "@media (max-width: 1600px) and (min-width: 600px)": {
      marginLeft: wp("10"),
    },
    "@media (max-width: 600px)": {
      width: wp("30"),
      height: wp("7"),
      marginBottom: hp("0.8"),
    },
  },
  storeIcon: {
    width: wp("2"),
    height: hp("1"),
    marginLeft: wp("1"),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      marginLeft: wp("2"),
      width: wp("3"),
    },
  },
  storeText: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    paddingStart: wp("1"),
    fontSize: hp("1.5"),
    width:wp('18'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:wp('19')
    },
    "@media (max-width: 500px)": {
      width:wp('23')
    },

  },
  cartView2: {
    alignSelf: "center",
    width: wp("25"),
    height: hp("25"),
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: wp("-22"),
    marginTop: hp("30"),
  },
  modelBox: {
    //flex: 1,
    //justifyContent: "center",
    // alignItems: "center",
    marginTop: hp("4.5"),
    marginLeft: wp("45.5"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginTop: hp("3.5"),
      marginLeft: wp("42.5"),
    },
    "@media (max-width: 500px)": {
      marginTop: hp("2.8"),
      marginLeft: wp("28"),
    },
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FCFCFC",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp("38"),
    height: hp("31"),
    "@media (max-width: 1600px) and (min-width: 600px)": {},
    "@media (max-width: 600px)": {
      width: wp("55"),
      borderRadius: 8,
      height: hp("34"),
    },
  },
  detailView: {
    width: wp("35"),
    height: hp("8.5"),
    marginTop: hp("1"),
    "@media (max-width: 1600px) and (min-width: 600px)": {},
    "@media (max-width: 600px)": {
      width: wp("50"),
    },
  },
  buttonView: {

    width: wp("36"),
    height: hp("25"),
    flexDirection: "row",
    marginTop: 10,
    "@media (max-width: 1600px) and (min-width: 600px)": {},
    "@media (max-width: 600px)": {
      width: wp("50"),
      
    },
  },
  text1: {
    color: "#979797",
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.3"),
  },
  text2: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.3"),
  },
  row1: {
    // width: wp("18"),
    //marginLeft: wp("1"),

    flex: 1,
    borderColor: "#F1F1F1",
    borderRightWidth: 1.5,
    "@media (max-width: 1600px) and (min-width: 600px)": {
      borderRightWidth: 1.5,
    },
    "@media (max-width: 600px)": {
      borderRightWidth: 0.9,
    },
  },
  row2: {
    flex: 1,
    // width: wp("18"),
  },
  btn1: {
    height: hp("4"),
    borderRadius: wp("1"),
    flexDirection: "row",
    backgroundColor: "#E7FEF5",
  },
  btn3: {
    height: hp("4"),
    flexDirection: "row",
  },
  btn2: {
    height: hp("4"),
    flexDirection: "row",
    borderColor: "#F1F1F1",
    borderTopWidth: 1.5,
    "@media (max-width: 1600px) and (min-width: 600px)": {
      borderTopWidth: 1.5,
    },
    "@media (max-width: 600px)": {
      borderTopWidth: 0.9,
    },
  },
  leftBtnIcon: {
    resizeMode: 'contain',
    marginLeft: wp("2"),
    alignSelf: "center",
  },
  btnText: {
    color: colors.secColor,
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.3"),
    marginTop: hp("1"),
    marginLeft: wp("2"),
  },
  btnText1: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.3"),
    marginTop: hp("1"),
    marginLeft: wp("2"),
  },

  // new header styles
  menudrawerView:{
    width:wp('10'),
    "@media (max-width: 1600px) and (min-width: 600px)": {
      width:wp('10'),
    },
    "@media (max-width: 600px)": {
      width:wp('12')
    },
  },
  cartItemView:{
    width:wp('10'),
    "@media (max-width: 1600px) and (min-width: 600px)": {
      width:wp('10'),
    },
    "@media (max-width: 600px)": {
      width:wp('10'),
    },
  },
});