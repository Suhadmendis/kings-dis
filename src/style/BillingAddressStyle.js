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
    // height: "100%",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  titleTxt: {
    fontSize: hp("2"),
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

  //Add new button
  addCustomerBtn: {
    width: wp("28"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-start",
    position: "absolute",
    right: 0,
    marginLeft: "1%",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 450px)": {
      height: hp("4"),
      width: wp("30"),
    },
  },
  newContactTxt: {
    fontSize: wp("2.3"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    alignSelf: "center",
    marginRight: wp("2"),
    marginLeft: wp("2"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginLeft: wp("1"),
      fontSize: wp("2.6"),
    },
    //textAlign: 'center',
  },
  addIcon: {
    alignSelf: "center",
    marginLeft: wp("2"),
    width: wp("3"),
    height: hp("2.9"),
    resizeMode: "contain",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {},
  },

  //inside container
  emailAddressTypeView: {
    flexDirection: 'row',
    width: "100%",
    // marginBottom: hp("2"),
  },

  addressTypeView1: {
    width: "100%",
    marginBottom: hp("2"),
    marginTop: hp("2"),
  },
  emailDropdownArea: {
    // backgroundColor: 'red',
    flex: 6,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      
    },
    "@media (max-width: 450px)": {
      flex: 8,
    },
  },
  addressTypeView2: {
    width: "100%",
    marginBottom: hp("3"),
  },
  addressTypeView3: {
    width: "100%",
    marginBottom: hp("1"),
  },

  titleSub: {
    fontSize: hp("1.6"),
    fontWeight: "bold",
    color:'black'
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
  alertView: {
    height: hp("4.5"),
    width: "100%",
    borderWidth: hp('0.1'),
    borderRadius: hp("1"),
    borderColor: "#f5c6cb",
    backgroundColor: "#f8d7da",
    justifyContent: "center",
    marginTop: hp("2"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 450px)": {
      height: hp("5.5"),
    },
  },
  alerttxt: {
    fontSize: hp("1.5"),
    textAlign: "center",
    color: "#721c24",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.6"),
    },
  },
  chckView: {
    width: wp("90"),
    marginTop: hp("1"),
    flexDirection: "row",
  },
  chckViewTxt: {
    fontSize: hp("1.6"),
    color:'black',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("0.2"),
    },
    "@media (max-width: 450px)": {
      marginTop: hp("1.1"),
      fontSize: hp("1.5"),
    },
  },
  deliveryOptTxt: {
    fontSize: hp("1.6"),
    marginTop: hp("1"),
    color:'black'
  },
  RBtnGroup: {
    flexDirection: "row",
    marginTop: hp("1"),
    marginLeft: wp("-1"),
  },
  radiobtnTxt: {
    fontSize: hp("1.6"),
    marginRight: wp("6"),
    color:colors.color_gray,

    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("-0.2"),
    },
    "@media (max-width: 450px)": {
      marginTop:hp('0.1'),
      maxWidth:wp('50'),
      height:hp('5')
    },
  },
  //drpdwn
  dropdown: {
    height: hp("4.5"),
    width: "100%",
    // marginTop: hp("0.5"),
    borderWidth: hp('0.1'),
    borderRadius: hp("1"),
    borderColor: "#EEEEEE",
    backgroundColor: "white",
    paddingLeft: wp("2"),
    paddingRight: wp("2"),
  },
  selectedTextStyle: {
    fontSize: hp("1.6"),
    color: "#979797",
  },
  placeholderStyle:{
    fontSize: hp("1.6"),
    color: "#979797",
  },
  btnView: {
    width: "100%",
    height: hp("4.5"),
    
    // position: "absolute",
    // bottom: 0,
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // bottom: 0,
    },
    "@media (max-width: 450px)": {
      // bottom: hp('4'),
    },
  },
  backbtn:{
    width:'49.5%',
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
    height:hp('4.5'),
    alignItems:'center',
    justifyContent:'center',
    borderWidth: hp("0.14"),
    borderColor: colors.primaryColor,
    borderRadius:wp('1.2'),
    backgroundColor:'#1ED18C'
  },
  proceedbtn_disabled:{
    width:'49.5%',
    height:hp('4.5'),
    alignItems:'center',
    justifyContent:'center',
    borderWidth: hp("0.14"),
    borderColor: "grey",
    borderRadius:wp('1.2'),
    backgroundColor:'grey'
  },
  backbtnTxt:{
    color:'#1ED18C',
    fontSize:hp('1.5')
  },
  proceedbtnTxt:{
   color:'white',
   fontSize:hp('1.5')
  },
  link:{
    color: "blue",
    textDecorationLine: "underline"
  },
  termandConditionView: {
    flexDirection:'row',
    height:hp('5'),
    width: wp('94'),
    // position:'absolute',
    // bottom:hp('5'),
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // bottom:hp('5'),
    },
    "@media (max-width: 450px)": {
      // bottom:hp('9'),
    },
  },
  orderNotesView:{
    width:'100%',
    height:hp('20'),
  },
  orderNotesText:{
    color:'black',
    fontSize:hp('1.5'),
    marginBottom:hp('1')
  },
  orderNotesTextInput:{
    borderColor:'black',
    width:'100%',
    height:hp('15'),
    borderWidth:hp('0.2'),
    borderRadius:hp('1'),
    borderColor:'#EEEEEE',
    backgroundColor:'white',
    textAlignVertical: "top",
    padding:hp('1.5'),
    color:colors.color_gray,
    fontSize:hp('1.3')
  },
  contentView:{
    width: "94%",
    // height: hp("73"),
    marginBottom: hp('2.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // height: hp("73"),
    },
    "@media (max-width: 450px)": {
      // height: hp("77"),
    },
  },
  disPerSymbol: { 
    fontSize: wp('2.5'), 
    marginLeft: 20,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginTop: -10,
      marginLeft: 10,
      fontSize: wp('5'), 
    },
  },
  addContactForm: {
    // height: 400,
    width: '100%'
  },
  attributeBox: {
    marginTop: hp('2'),
  },
  attributeName: {
    fontSize: hp("1.6"),
    fontWeight: "bold",
    color:'black',
    
    marginBottom: hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: wp('2'),
    },
    "@media (max-width: 450px)": {
     
      marginBottom: hp('2'),
    },
  },
  attributeRegNumber: {
    fontSize: hp("1.6"),
    fontWeight: "bold",
    color:'black',
    marginBottom: hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: wp('2'),
    },
    "@media (max-width: 450px)": {
      
      marginBottom: hp('2'),
    },
  },
  attributeBox1: {
    marginTop: hp('2'),
  },
  attributeName: {
    fontSize: wp('2'),
    marginBottom: hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: wp('2'),
    },
    "@media (max-width: 450px)": {
      fontSize: wp('3'),
      marginBottom: hp('2'),
    },
  },
  attributeInput: {
    height: 50,
    // margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e3e3e3',
    backgroundColor: 'white',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      
    },
    "@media (max-width: 450px)": {
      marginTop: -10,
      height: 40,
    },
  },


});
