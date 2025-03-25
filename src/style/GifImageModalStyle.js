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
import _ from "lodash";
import * as colors from './Common/ColorsStyle';

module.exports = StyleSheet.create({
 
  applyView: {
    width: "100%",
    height: hp("3.5"),
    //marginLeft: wp("1"),
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginTop: hp("0%"),
    },
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(225,249,166,0.4)",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: hp('2'),
    width:wp('50'),
    backgroundColor:'white',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1
  },
  button: {
    height:hp('3.8'),
    padding: 10,
    width:wp('15'),
    borderRadius:wp('1'),
    backgroundColor:colors.primaryColor
  },
  buttonOpen: {
    backgroundColor: colors.primaryColor
  },
  buttonClose: {
    backgroundColor: colors.primaryColor
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize:hp('1.5')
  },
  modalTextTitle: {
    marginBottom: hp('1'),
    textAlign: "center",
    color: colors.primaryColor,
    fontSize:hp('2.2'),
    fontWeight: "bold",
  },
  modalText1: {
    marginBottom: hp('2'),
    marginTop:hp('1'),
    textAlign: "center",
    fontSize:hp('1.6'),
    color: colors.color_gray
  },
  gifView:{
      height:hp('20'),
      width:wp('30'),
      justifyContent:'center',
      alignItems:'center'
  },
  cardImgCheck:{
      aspectRatio:0.8,
      height:hp('20'),
      resizeMode:'contain',
  }


});
