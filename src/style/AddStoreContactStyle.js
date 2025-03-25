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

  canves: {
    flex: 1
  },



  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  titleTxt: {
    fontSize: hp("2.2"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    //textAlign: 'center',
  },
  titleView: {
    width: "94%",
    height: hp("4.5"),
    marginTop: hp("1"),
    alignItems: "center",
    marginBottom: hp("1"),
    alignSelf: "center",
    flexDirection: "row",
  },
  cntactNameView:{
    width:'100%',
  },
  checkAreaView:{
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',

    
  
  },
  TxtInput: {
    width: "90%",
    height: hp("4.5"),
    fontSize: hp("1.5"),
    marginLeft: wp("3"),
    color: "gray",
    padding:1
  },
  itemTxt: {
    height: hp("2.3"),
    fontSize: hp("1.5"),
    color: "black",
  },

  inputView: {
    height: hp("4.5"),
    width: "100%",
    marginTop: hp("0.5"),
    borderRadius: hp("1"),
    borderWidth: hp("0.1"),
    borderColor: "#EEEEEE",
    backgroundColor: "white",
  },
  checkBoxView: {
    height: hp("5.5"),
    width: "100%",
    justifyContent: "center",
    marginLeft: hp("2"),
  },

  inputDisable: {
    height: hp("4.5"),
    width: "100%",
    marginTop: hp("0.5"),
    borderRadius: hp("1"),
    borderWidth: hp("0.1"),
    borderColor: "#CCC",
    backgroundColor: "#EEE",
  },

  inpView: {
    width:'100%',
    //marginTop:hp('1.5')
  },
  totView:{
    //height:hp('60'),
    width:'100%',
    marginTop:hp('1')
   // flexDirection:'row'
  },


  totsubview:{
    width:"100%",
    flexDirection:'row',
    height:hp('8'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexDirection:'row',
      height:hp('8'),
    },
    "@media (max-width: 450px)": {
      flexDirection:'column',
      height:hp('16'),
    },
  },
  secView1:{
    height:hp('60'),
    width:'49%',
    marginRight:'2%',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:hp('60'),
      width:'49%',
    },
    "@media (max-width: 450px)": {
      height:hp('8'),
      width:'100%',
    },
  },
  secView2:{
    height:hp('60'),
    width:'49%',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:hp('60'),
      width:'49%',
    },
    "@media (max-width: 450px)": {
      height:hp('8'),
      width:'100%',
    },
  },
  //drpdwn
  dropdown: {
    height: hp("4.5"),
    width: "100%",
    marginTop: hp("0.5"),
    borderWidth: hp('0.1'),
    borderRadius: hp("1"),
    borderColor: "#EEEEEE",
    backgroundColor: "white",
    paddingLeft: wp("2"),
    paddingRight: wp("2"),
  },
  selectedTextStyle: {
    fontSize: hp("1.5"),
    color: "#979797",
  },
  placeholderStyle:{
    fontSize: hp("1.5"),
    color: "#979797",
  },
  btnView: {
    width: "100%",
    height: hp("4.5"),
    position: "absolute",
    bottom: 0,
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      bottom: 0,
    },
    "@media (max-width: 450px)": {
      bottom: 20,
    },
  },
  backbtn:{
    width:'49.5%',
    backgroundColor: "green",
    height:hp('4.5'),
    marginRight:'1%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "#fffcfc",
    borderWidth: hp("0.14"),
    borderColor: colors.primaryColor,
    borderRadius:wp('1.2')
  },
  proceedbtn:{
    width:'49.5%',
    backgroundColor: "red",
    height:hp('4.5'),
    alignItems:'center',
    justifyContent:'center',
    borderWidth: hp("0.14"),
    borderColor: colors.primaryColor,
    borderRadius:wp('1.2'),
    backgroundColor:'#1ED18C'
  },
  backbtnTxt:{
    color:'#1ED18C',
    fontSize:hp('1.5')
  },
  proceedbtnTxt:{
   color:'white',
   fontSize:hp('1.5')
  }
});