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
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  // search view bar style start ----
  searchView: {
    zIndex: 1000,
    width: "94%",
    height: hp("3.7"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2%"),
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
     marginTop:hp('2'),
     marginBottom:hp('1'),
     height: hp("6"),
    },
  },
  preseasonView: {
    width: '50%',
        height: hp("2.3"),
        // alignItems: "center",
        justifyContent: "center",
        // marginTop: hp("1"),
        backgroundColor: colors.primaryColor,
        // marginBottom: hp("1"),
        borderRadius: 5,
        alignSelf: "center",
      },
      preseasonTxt: {
        fontSize: hp("1.5"),
        // fontFamily: Fonts.PoppinsBold,
        color: "white",
        textAlign: 'center',
      },
  searchInput: {
    width: "85%",
    height: hp("5"),
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: "5%",
  },
  TxtInput: {
    width: "80%",
    height: hp("7"),
    fontSize: hp(2),
    fontWeight: "bold",
    // backgroundColor: 'red',
  },
  filterBtn: {
    width: wp("7"),
    height: hp("4.5"),
    backgroundColor: colors.primaryColor,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
    marginLeft: 5,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("7"),
    height: hp("4.5"),
    borderRadius: 6,
    },
    "@media (max-width: 500px)": {
      width: wp("12"),
      height: hp("6"),
      borderRadius: 5,
    },
  },
  searchViewInside1:{
    width: '90%' ,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: '90%' ,
    },
    "@media (max-width: 500px)": {
      width: '85%' ,
    },
  },
  filterIcon: {
    resizeMode:'contain'
  },
  titleTxt: {
    fontSize: hp("2.2"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    //textAlign: 'center',
  },
  titleView: {
    width: "94%",
    height: hp("3"),
    marginTop: hp("1"),
    justifyContent: "flex-start",
  },
  // search view bar style end ----
  item2: {
    marginBottom: 10,
     width: wp("22.5"),
    height: hp("19"),
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    // alignItems: 'center',
    marginHorizontal: wp("1"),
    //paddingLeft: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    shadowColor: "#000",
    elevation: 2,
    margin: 5,
    // marginTop: hp('-2'),
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("22.5"),
    },
    "@media (max-width: 500px)": {
      width: wp("45"),
    },
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardSubMainTxt: {
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsMedium,
    color: colors.primaryColor,
  },
  cardMainTxtView1: {
    width: "100%",
    height: hp("5"),
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  cardSubTxtView: {
    width: "100%",
    height: hp("4.2"),
    alignItems: "center",
    justifyContent: "center",
  },
  cardSubTxtView2: {
    width: "65%",
    height: "auto",
    borderRadius: 10,
    // marginTop: '2%',
  },
  cardSubTxt: {
    fontSize: hp("1.2"),
    fontFamily: Fonts.PoppinsSemiBold,
    color: "#979797",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist1: {},
});
