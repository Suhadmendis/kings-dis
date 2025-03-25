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

import * as colors from '../style/Common/ColorsStyle'
module.exports = StyleSheet.create({
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
    fontFamily: Fonts.PoppinsBold,
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

  //addres details
  addressDetails:{
    width:'100%',
    flexDirection:'row'
  },

  addressDetailsShipping:{
    width:'48%',
    height:hp('18'),
    marginRight:'4%'
  },
  addressDetailsDelivery:{
    width:'48%',
    height:hp('18'),
  },
  shippingsub:{
    height:hp('14'), 
    width:'100%', 
    backgroundColor:'#F6FFFE',
    borderRadius:wp('1.5'),
    padding:hp('2'),
    borderColor:'#DEF9F6',
    borderWidth:hp('0.1')
  },

  addTitle:{
    fontSize:hp('1.7'),
    marginBottom:hp('1'),
    color:colors.color_gray
  },
  addname:{
    fontSize:hp('1.6'),
    fontWeight:'bold',
    color:'#1ED18C',
    marginBottom:hp('0.5')
  },
  addDetails:{
    fontSize:hp('1.4'),
    color:colors.fourthiaryColor,
    marginBottom:hp('0.5')
  },
  addcontact:{
    fontSize:hp('1.6'),
    fontWeight:'bold',
    color:'#1ED18C'
  },

  titleSub: {
    fontSize: hp("1.8"),
    fontWeight: "bold",
  },
  inputView: {
    height: hp("4.5"),
    width: "100%",
    marginTop: hp("0.5"),
    borderWidth: 2,
    borderRadius: wp("1"),
    borderColor: "#EEEEEE",
    backgroundColor: "white",
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
      bottom: 15,
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
  },
  contentScroll:{ width: "100%", height: hp("36.2"),
  "@media (max-width: 1600px) and (min-width: 450px)": {
    height: hp("36.2")
  },
  "@media (max-width: 450px)": {
    height: hp("28") //34
  },
},

  //checkout box
  basketTotal: {
    width: "49.5%",
    height: hp("13"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor:'white',
    marginTop:hp('0.1'),
    // justifyContent: 'space-around',
    alignItems: "flex-start",
    alignSelf:'flex-end',
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
      width: "100%",
    },
  },
  savingsTextView3: {
    width: wp("45"),
    height: hp("3"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("45"),
    },
    "@media (max-width: 450px)": {
      width: wp("91"),
    },
  },
  savingsText: {
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: wp("2"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.4"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.6"),
    },
  },
  savingssubText: {
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.4"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.6"),
    },
  },
  totalTextView: {
    width: "97%",
    height: hp("3"),
    flexDirection: "row",
    position:'absolute',
    bottom:1
  },
  totalTxt: {
    fontSize: hp("1.5"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("2"),
    fontWeight: "bold",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.9"),
    },
  },

  mainCheckoutbox:{
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5"),
    },
    "@media (max-width: 450px)": {
      flexDirection:'column',
    },
  },
  orderNotesView: {
    width: "49.5%",
    height: hp("13"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor:'white',
    marginTop:hp('0.1'),
    // justifyContent: 'space-around',
    alignItems: "flex-start",
    alignSelf:'flex-end',
    padding:hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginRight:'1%',
    },
    "@media (max-width: 450px)": {
      //borderColor:colors.color_light_gray_border,
      backgroundColor:'#F6FFFE',
      borderColor:'#DEF9F6',
      borderWidth:hp('0.1'),
      width: "100%",
      height: 'auto',
      marginBottom:hp('0.5'),
      borderRadius: 4,
    },
  },
  orderNotesViewDisplay: {
    // display: 'none',
    width: "49.5%",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginRight:'1%',
    },
    "@media (max-width: 450px)": {
      //borderColor:colors.color_light_gray_border,
   
    },
  },
  noteTitle:{
    color:'black',
    fontWeight:'bold',
    fontSize:hp('1.5')
  },
  noteContent:{
    color:colors.color_gray,
    fontSize:hp('1.3')
  },
  accordianView:{
    width:wp('43'),
    backgroundColor:'#F6FFFE',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width:wp('43'),
    },
    "@media (max-width: 450px)": {
      width:wp('85'),
      marginLeft:wp('-2'),
      height:hp('4'),
      alignItems:'center'
    },
  },
  cardImg:{
    resizeMode:'contain',
    aspectRatio:0.7,
    height:hp('3')
  },
  imageNotesView:{
    width:wp('8'),
    height:hp('3'),
    alignSelf:'center',
    marginTop:hp('-1'),
    justifyContent:'center',
    alignItems:'center'
  }
});
