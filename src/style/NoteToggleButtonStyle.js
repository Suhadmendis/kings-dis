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

module.exports = StyleSheet.create({
  toggleButtonViewArea: {
    // borderColor:'#1FD18C',
    // borderWidth: 1,
    borderRadius: wp('1'),
    height: hp('4'),
    width: wp('9'),
     justifyContent:'center',
     alignItems:'center',
   // padding: wp('0.7'),
    flexDirection: 'row',

    "@media (max-width: 450px)": {
      
      height: hp('4'),
      width: wp('15'),
     
    },
  },
  toggleButtonIconArea: {
    
   // margin: 5,
    
  //  flex: 1
  },
  toggleButtonArrowArea: {
    
    margin: 5,
    flex: 1,
  },
  toggleButtonNoteIcon: {
    resizeMode: 'contain',
    height:hp('1.7'),
    aspectRatio:1.5,
  },
  toggleButtonArrowIcon: {
    resizeMode: 'contain',
    width: wp("2"),
    height: hp("1"),
    marginTop: hp("0.4"),
    
  }
});
