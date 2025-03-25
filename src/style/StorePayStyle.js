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
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  titleText: {
    fontSize: hp("1.6"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
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

  addCustomerBtn: {
    width: wp("32"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: "1%",
    position:'absolute',
    right:0,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      height: hp("4"),
    },
  },
  addIcon: {
    alignSelf:'center',
    marginLeft:wp('2'),
    width:wp('3'),
    height: hp('2.9'),
    resizeMode:"contain",
    "@media (max-width: 1600px) and (min-width: 500px)": {
    },
    "@media (max-width: 500px)": {
    },
  },

  newContactTxt: {
    fontSize: wp('2.3'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    alignSelf:'center',
    marginRight:wp('2'),
    marginLeft:wp('2'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
    },
    "@media (max-width: 500px)": {
      marginLeft:wp('1'),
      fontSize: wp('2.6'),
    },
    //textAlign: 'center',
  },
 
  contentView1:{
    width:wp('94'),
    height:hp('9'),
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      flexDirection:'row',
      height:hp('9'),
    },
    "@media (max-width: 500px)": {
      flexDirection:'column',
      height:hp('18'),
    },
  },
  contentSubView1:{
    width:'49%',
    height:hp('9'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:'49%',
    },
    "@media (max-width: 500px)": {
      width:'100%',
    },
  },
  contentSubView2:{
    width:'49%',
    height:hp('8'),
    marginLeft:'2%',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:'49%',
      marginLeft:'2%'
    },
    "@media (max-width: 500px)": {
      width:'100%',
      marginLeft:'0%'
    },
  },

  contentView2:{
    width:wp('94'),
    height:hp('9'),
  },
  contentView3:{
    width:wp('94'),
    height:hp('20'),
  },

  TxtInput: {
    width: "90%",
    height: hp("4.5"),
    fontSize: hp("1.5"),
    //backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
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
  inputAreaView: {
    height: hp("15"),
    width: "100%",
    marginTop: hp("0.5"),
    borderRadius: hp("1"),
    borderWidth: hp("0.1"),
    borderColor: "#EEEEEE",
    backgroundColor: "white",
  },
  TxtInputArea: {
    width: "94%",
    height: hp("15"),
    fontSize: hp("1.5"),
   // backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
    textAlignVertical: "top",
   // alignItems: "flex-start",
  },
  buttonView:{
    marginTop: hp("5"),
    width:wp('94'),
    height:hp('8'),
    position:'relative',
    bottom:hp('7'),
    flexDirection:'row',
    alignItems:'center'
  },
  backBtn:{
    width:'49%',
    backgroundColor:'white',
    height:hp('4.5'),
    marginRight:'2%',
    borderRadius:wp('1'),
    borderWidth:wp('0.2'),
    borderColor: colors.primaryColor,
    justifyContent:'center',
    alignItems:'center'
  },
  saveBtn:{
    width:'49%',
    backgroundColor:colors.primaryColor,
    height:hp('4.5'),
    borderRadius:wp('1'),
    justifyContent:'center',
    alignItems:'center'
  },
  btntxt:{
    fontSize:hp('1.6')
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
//drp dwon end
  
});