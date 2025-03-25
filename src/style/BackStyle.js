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
  backBtn: {
    //width: wp('10'),
    backgroundColor: "transparent",
    height: hp("3"),
    borderColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    //marginTop:hp('1'),
    justifyContent: 'space-evenly',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("2.8"),
      width: 85,
      borderRadius: 5,
      borderWidth: wp("0.15%"),
    },
    "@media (max-width: 450px)": {
      height: hp("2.8"),
      width: 55,
      borderRadius: 4,
      borderWidth: wp("0.2%"),
    },
  },
  backText: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.8%"),
    marginRight:6,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5%"),
    },
    "@media (max-width: 450px)": {
      fontSize: wp("2.8%"),
    },
  },
  icnView: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backIcon: {
    resizeMode:'contain',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      aspectRatio: 0.8,
    },
    "@media (max-width: 450px)": {
      aspectRatio: 1,
    },
  },
  backView: {
    width: wp("40"),
    height: hp("3"),
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: hp("1"),
    alignSelf: "flex-start",
    marginLeft: wp("3"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:35,
    },
    "@media (max-width: 450px)": {
      height:25,
    },
  },
});
