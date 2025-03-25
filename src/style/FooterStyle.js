import { Dimensions } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const { StyleSheet } = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  footericonstore: {
    flex: 1,
    aspectRatio: 0.9,
    resizeMode: "contain",
  },
  footericonmap: {
    flex: 1,
    aspectRatio: 0.9,
    resizeMode: "contain",
  },
  footericoncal: {
    flex: 1,
    aspectRatio: 0.9,
    resizeMode: "contain",
  },
  footericoncon: {
    flex: 1,
    aspectRatio: 0.9,
    resizeMode: "contain",
  },
  title2: {
    fontSize: hp("1.2"),
    color: "#979797",
    fontWeight: "normal",
    fontFamily: Fonts.PoppinsBold,
  },
  synctitle: {
    fontSize: hp("1.2"),
    color: "white",
    fontWeight: "normal",
    fontFamily: Fonts.PoppinsBold,
    marginTop:hp('0.3'),
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      display: 'none'
    },

  },
  title3: {
    fontSize: hp("1.5"),
    color: "white",
    marginBottom: hp("1"),
    fontFamily: Fonts.PoppinsBold,
  },
  dialogbox:{
    width: wp("70"),
    height: hp("19"),
    maxHeight: hp("30"),
    borderRadius: 10,
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("18.5"),
    },
    "@media (max-width: 450px)": {
      height: hp("18.5"),
      width: wp("75"),
    },
  },
  footericonSyncView: {
    width: hp("5.5"),
    height: hp("5.5"),
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    borderRadius: hp("15") / 2,
    backgroundColor: "#2CDC0B",
    marginTop: hp("-0.5"),
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: hp("0.3"),
  },
  footericonSyncView_off: {
    width: hp("5.5"),
    height: hp("5.5"),
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    borderRadius: hp("15") / 2,
    backgroundColor: "#808080",
    marginTop: hp("-0.5"),
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: hp("0.3"),
  },

  footericonSyncView_sync: {
    width: hp("5.5"),
    height: hp("5.5"),
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    borderRadius: hp("15") / 2,
    backgroundColor: "#FFBF00",
    marginTop: hp("-0.5"),
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: hp("0.3"),
  },

  //correct styles
  // footericonSyncView: {
  //   width: hp("7"),
  //   height: hp("7"),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   // padding: 10,
  //   borderRadius: hp("15") / 2,
  //   backgroundColor: "#2CDC0B",
  //   marginTop: hp("-1.5"),
  //   shadowColor: "black",
  //   shadowOffset: { width: 1, height: 2 },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 1,
  //   elevation: hp("0.3"),
  // },
  // footericonSyncView_off: {
  //   width: hp("7"),
  //   height: hp("7"),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   // padding: 10,
  //   borderRadius: hp("15") / 2,
  //   backgroundColor: "#808080",
  //   marginTop: hp("-1.5"),
  //   shadowColor: "black",
  //   shadowOffset: { width: 1, height: 2 },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 1,
  //   elevation: hp("0.3"),
  // },

  // footericonSyncView_sync: {
  //   width: hp("7"),
  //   height: hp("7"),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   // padding: 10,
  //   borderRadius: hp("15") / 2,
  //   backgroundColor: "#FFBF00",
  //   marginTop: hp("-1.5"),
  //   shadowColor: "black",
  //   shadowOffset: { width: 1, height: 2 },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 1,
  //   elevation: hp("0.3"),
  // },
  footericonSync: {
    flex: 1,
    aspectRatio: 0.6,
    resizeMode: "contain",

    // width: hp('3%'),
    // height: hp('3%'),
    marginTop: hp("1"),
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  // button: {
  //   width: "85%",
  //   height: hp("4.5"),
  //   borderColor: colors.primaryColor,
  //   borderWidth: 1,
  //   borderRadius: 100,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   alignSelf: "center",
  //   justifyContent: "flex-start",
  //   paddingLeft: 25,
  //   "@media (max-width: 1600px) and (min-width: 500px)": {
  //     paddingLeft: 18,
  //     height: hp("4.5"),
  //   },
  //   "@media (max-width: 500px)": {
  //     paddingLeft: 30,
  //     height: hp("5"),
  //   },
  // },
  buttonfullsync: {
    width: "85%",
    height: hp("4.5"),
    borderColor: colors.primaryColor,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    paddingLeft: 25,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      paddingLeft: 30,
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      paddingLeft: 30,
      height: hp("5"),
    },
  },
  buttonTextfullsync: {
    fontSize: hp("1.4"),
    color: colors.primaryColor,
    marginLeft: 8,
    fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp("1.4"),
      marginLeft: 8,
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.6"),
      marginLeft: 10,
    },
  },

  // buttonIcon: {
  //   width: 20,
  //   height: 20,
  //   resizeMode: "contain",
  // },

  buttonText: {
    fontSize: hp("1.4"),
    color: colors.primaryColor,
    marginLeft: 8,
    fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp("1.4"),
      marginLeft: 8,
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.6"),
      marginLeft: 10,
    },
  },

  //sync options
  syncView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: hp("6"),
    backgroundColor: "white",
    padding: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: -3,
    shadowRadius: 2,
    elevation: hp("3"),
    height: hp("7"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("7"),
      alignItems: "center",
      paddingBottom: 10,
    },
    "@media (max-width: 500px)": {
      height: hp("15"),
      paddingTop: 10,
      paddingBottom: 5,
    },
  },
  secView: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      flexDirection: "row",
    },
    "@media (max-width: 500px)": {
      flexDirection: "column",
    },
  },

  synccard: {
    margin: "1%",
    backgroundColor: "white",
    alignSelf: "center",
    width: wp("60"),
    height: hp("10"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: wp("1.5"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      margin: "1%",
      width: wp("65"),
      height: hp("12"),
    },
    "@media (max-width: 500px)": {
      width: wp("94"),
      height: hp("15"),
    },
  },
  headView: {
    margin: "1%",
    width: wp("60"),
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      margin: "1%",
      width: wp("60"),
      marginTop: hp("6"),
    },
    "@media (max-width: 500px)": {
      width: wp("94"),
      marginTop: hp("3"),
    },
  },
  syncOptionsText: {
    marginTop: 10,
    fontSize: hp("2.5"),
    fontWeight: "bold",
    color: colors.primaryColor,
  },
  button: {
    width: "35%",
    height: "80%",
  //  borderColor: colors.primaryColor,
    // borderWidth: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: "90%",
      paddingTop:hp('1'),
    },
    "@media (max-width: 500px)": {
      height: "70%",
    },
  },
  buttonIcon: {
    // width: wp('10'),
    height: hp("6"),
    aspectRatio:1,
    resizeMode: "contain",
  },
  buttonIconfull:{
    height: hp("6"),
    resizeMode: "contain",
    aspectRatio: 0.5,
  },
  syncTypeText: {
    fontSize: hp("1.5"),
    color: colors.primaryColor,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: "70%",
      fontSize: hp("1.5"),
    },
    "@media (max-width: 500px)": {
      height: "70%",
      fontSize: hp("1.8"),
    },
  },

  synccardDetails: {
    height: "79%",
    marginRight:'4%',
    width: "65%",
    alignSelf:"center",
    paddingLeft:wp('1'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
    },
    "@media (max-width: 500px)": {
      marginTop:hp('1.3'),
    },
  },
  syncItemDetail:{
    fontSize:hp('1.5'),
    color:colors.fourthiaryColor,
    textAlign:'right'
  },
  syncItemDetailsub:{
    marginTop:hp('1.5'),
    fontSize:hp('1.3'),
    alignSelf:'flex-end',
    position:"absolute",
    bottom:0,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginTop:hp('1.5'),
      fontSize:hp('1.3'),
    },
    "@media (max-width: 500px)": {
      marginTop:hp('2.5'),
      fontSize:hp('1.3'),
    },
  }
});
