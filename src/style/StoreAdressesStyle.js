import { Dimensions, Platform, PixelRatio } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const { StyleSheet } = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";
// import {normalize} from '../style/FontSize';
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  subcardTxt: {
    fontSize: wp("2.5"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    fontWeight: "bold",
    marginRight: 20,
  },
  emailTxt: {
    fontSize: wp("1.9"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
  },
  contactTitle: {
    width: "55%",
    height: hp("6"),
    flexDirection: "row",
    alignItems: "flex-start",
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
  titleTxt: {
    fontSize: hp("2.5"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    //textAlign: 'center',
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
  titleView: {
    width: "92%",
    height: hp("4"),
    marginTop: hp("1"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerCardView: {
    width: "92%",
    height: 100,
    backgroundColor: "white",
    borderRadius: wp("2"),
    alignItems: "center",
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
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      height: 70,
    },
    //textAlign: 'center',
  },
  cardSubMainTxt: {
    fontSize: wp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: "#cacccc",
    marginLeft: "2%",
    "@media (max-width: 450px)": {
      fontSize: wp("2.3"),
    },
  },
  cardTxt: {
    fontSize: hp("1.6"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("1"),
  },
  deleteView: {
    width: wp("7"),
    height: hp("6"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("3"),
  },

  subView: {
    marginLeft: wp("8"),
    width: wp("24"),
    height: hp("6"),
    alignItems: "flex-end",
    justifyContent: "center",
  },

  addCustomerBtn: {
    width: wp("28"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: "1%",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      height: hp("4"),
      width: wp("30"),
    },
  },
  // contact form

  noteItemTextView: {
    width: "52%",
    height: hp("6"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notecardIconView1: {
    width: wp("10%"),
    height: hp("6"),
    marginLeft: wp("1"),
    justifyContent: "center",
  },
  mapIcon: {
    width: wp("7"),
    height: wp("7"),
    marginLeft: wp("1"),
  },
  ashBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("2"),
    height: hp("6"),
  },
  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("5"),
    marginRight: wp("0.8"),
    height: hp("4"),
    backgroundColor: "#f8d1d9",
    borderRadius: wp("1.2"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: 45,
      height: 45,
    },
    "@media (max-width: 450px)": {
      width: 35,
      height: 35,
      marginRight: 20,
    },
  },
  // cardImg: {
  //   aspectRatio: 0.6,
  //   resizeMode: "contain",
  // },
  ashBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("2"),
    height: hp("6"),
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: "contain",
  },

  notecardTxtView1: {
    width: wp("38%"),
    // height: hp("3"),
    marginLeft: wp("0"),
    justifyContent: "center",
  },
  notesubcardTxt: {
    fontSize: hp("1.8"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
  },
});
