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
 containerView:{
  width: "100%",
  height: hp('75'), 
  justifyContent:'center'
 },
  synccard: {
    margin: "1%",
    backgroundColor: "white",
    alignSelf: "center",
    width: wp("60"),
    height: 'auto',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: wp("2"),
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:hp('2'),
    paddingTop:hp('2'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      margin: "1%",
      width: wp("65"),
      height: 'auto',
    },
    "@media (max-width: 500px)": {
      width: wp("94"),
      height: 'auto',
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
    fontSize: hp("2.5"),
    fontWeight: "bold",
    color: colors.primaryColor,
  },
  cardInside:{
    width:'70%',
    //height:hp('45')
  },
  orderTitle:{
    fontSize:hp('2'),
    fontWeight:'bold',
    textAlign:'center'
  },
  imgContainer:{
    width:'100%',
    height:hp('20'),
    justifyContent:'center',
    alignItems:'center'
  },
  buttonIconfull:{
    resizeMode:'contain',
    height:300,
    aspectRatio:1,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height:300,
    },
    "@media (max-width: 500px)": {
      height:200,
    },
  },
  greyTxt:{
    alignSelf:'center',
    fontSize:hp('1.5'),
    textAlign:'center',
    marginTop:hp('0.5'),
    color:'#979797'
  },
  grnTxt:{
    alignSelf:'center',
    width:'90%',
    fontSize:hp('1.7'),
    textAlign:'center',
    marginTop:hp('0.5'),
    color:'#2CDC0B'
  },
  dateTxt:{
    alignSelf:'center',
    width:'90%',
    fontSize:hp('1.7'),
    textAlign:'center',
    marginTop:hp('0.5'),
    color:'black'
  },
  ordersBtn:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:hp('1'),
    width:'75%',
    height:hp('4.5'),
    backgroundColor:'#1ED18C',
    borderRadius:wp('1.4')
  },
  ordersTxt:{
    fontSize:hp('1.5'),
    color:'white'
  }

  
});
