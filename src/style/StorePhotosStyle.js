import { Dimensions, Platform, PixelRatio } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const { StyleSheet } = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import {normalize} from '../style/FontSize';
import StyleSheet from "react-native-media-query";
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
  addCustomerBtn: {
    width: wp("27"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: "1%",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      height: hp("4"),
      width: wp("28"),
    },
  },
  sendCustomerBtn: {
    width: wp("23"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: "2%",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      height: hp("4"),
    },
  },

  sendCustomerBtn1: {
    width: wp("25"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: "3%",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      height: hp("4"),
      width: wp("27"),
    },
  },
  titleView: {
    width: "100%",
    height: hp("4"),
    marginTop: hp("1"),
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: wp("4"),
  },
  footerCardView: {
    width: "92%",
    height: hp("7.5"),
    backgroundColor: "white",
    borderRadius: wp("2"),
    alignItems: "center",
    shadowOffset: { width: 0, height: hp("1") },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 2,
    marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
  },
  cardSubMainTxt: {
    fontSize: wp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: "#cacccc",
    marginLeft: "2%",
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
    width: wp("18"),
    height: hp("6"),
    alignItems: "flex-end",
    justifyContent: "center",
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
    width: wp("42%"),
    height: hp("3"),
    marginLeft: wp("1"),
    justifyContent: "center",
  },
  notesubcardTxt: {
    fontSize: hp("1.8"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
  },
  modalDelete: {
    width: "36%",
    alignSelf: "flex-end",
    height: hp("4.5"),
    backgroundColor: "#FFD8D8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("1"),
    flexDirection: "row",
    borderWidth: wp("0.3"),
    borderColor: "#F9373729",
    "@media (max-width: 1600px) and (min-width: 450)": {
      width: "33%",
    },
    "@media (max-width: 450)": {
      width: "37%",
    },
  },
  modaldelTxt: {
    fontSize: hp("1.6"),
    marginLeft: wp("3"),
    marginRight: wp("1"),
    color: "#E61538",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginLeft: wp("3"),
      marginRight: wp("1"),
    },
    "@media (max-width: 450px)": {
      marginLeft: wp("3"),
      marginRight: wp("1"),
    },
  },
});
