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
  footerCardView: {
    width: "100%",
    height: hp("6"),
    backgroundColor: "white",
    borderRadius: wp("1"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    // marginBottom: hp("1"),
    // alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // alignItems: "center",
    },
    "@media (max-width: 450px)": {
      height: hp("11"),
      
      flexDirection: "column",
    },
  },

  footerCardQuoteView: {
    width: "100%",
    // height: hp("20"),
    backgroundColor: "#EBFFE8",
    borderRadius: wp("1"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    // marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    // flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // alignItems: "center",
    },
    "@media (max-width: 450px)": {
      // height: hp("13"),
      
      flexDirection: "column",
    },
  },

  footerCardNoteView: {
    width: "99%",
    // height: hp("20"),
    backgroundColor: "#F7FFF5",
    borderRadius: wp("1"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    // marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    // flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      // alignItems: "center",
      marginBottom: hp('1'),
    },
    "@media (max-width: 450px)": {
      // height: hp("10"),
      marginBottom: hp('1'),
      flexDirection: "column",
    },
  },
  // footerCardQuoteView: {
  //   width: "100%",
  //   height: hp("10"),
  //   backgroundColor: "red",
  //   backgroundColor: "white",
  //   borderRadius: wp("1"),
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.6,
  //   shadowRadius: 1,
  //   elevation: 2,
  //   // marginBottom: hp("1"),
  //   // alignSelf: "center",
  //   //justifyContent: 'center',
  //   // borderColor: 'rgba(44, 130, 201, 1)',
  //   // borderWidth: 0.5,
  //   // flexDirection: "column",
  //   "@media (max-width: 1600px) and (min-width: 450px)": {
  //     // alignItems: "center",
  //     // borderTopRightRadius: wp("1"),
  //     // borderTopLeftRadius: wp("1"),
  //     // borderBottomLeftRadius: wp("0"),
  //     // borderBottomRightRadius: wp("0"),
  //     // marginBottom: hp("0"),
  //   },
  //   "@media (max-width: 450px)": {
  //     height: hp("11"),
  //     flexDirection: "column",
  //     borderTopRightRadius: wp("1"),
  //     borderTopLeftRadius: wp("1"),
  //     borderBottomLeftRadius: wp("0"),
  //     borderBottomRightRadius: wp("0"),
  //     marginBottom: hp("0"),
  //   },
  // },

  discountView:{
    width: "100%",
    height: hp("3.2"),
    
    padding: 10,
    // backgroundColor: "#EBFFE8",
    // backgroundColor: "white",
    
    // marginBottom: hp("1"),
    borderTopRightRadius: wp("0"),
    borderTopLeftRadius: wp("0"),
    


    
    alignSelf:'center',
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("4"),
    },
    "@media (max-width: 450px)": {
      height: hp("4"),
    },

  },

  noteView:{
    width: "100%",
    height: hp("6"),
    
    padding: 10,
    // backgroundColor: "#EBFFE8",
    // backgroundColor: "white",
    
    // marginBottom: hp("1"),
    borderTopRightRadius: wp("0"),
    borderTopLeftRadius: wp("0"),
    


    
    alignSelf:'center',
    flexDirection: "row",
    "@media (max-width: 450px)": {
      padding: 5,
      height: hp("10"),
    },
  },

  discountTxt: {
    fontSize: 16,
    marginLeft: wp("1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: 12,
      marginLeft: wp("0.5"),
    },
    "@media (max-width: 450px)": {
      fontSize: 12,
      marginLeft: wp("0.5"),
    },
  },

  discountQuotedPriceView: { 
    flexDirection: "row", 
    position: "absolute", 
    right: 20, 
    top: 10,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('2'),
    },
    "@media (max-width: 450px)": {
      right: 7, 
      top: 10,
    },
  },

  cartItemTextView: {
    // width: "40%",
     height: hp("6"),
     flexDirection: "row",
     //justifyContent: "space-between",
     alignItems: "center",
     marginLeft: wp("1"),
     "@media (max-width: 1600px) and (min-width: 450px)": {
       flexBasis: "39%",
     },
     "@media (max-width: 450px)": {
       flexBasis: "50%",
       marginTop:hp('0.3')
     },
   },
   cartItemTextView2: {
     
     flexDirection: "row",
     
     justifyContent: "center",
     "@media (max-width: 1600px) and (min-width: 450px)": {
       flexBasis: "48%",
     },
     "@media (max-width: 450px)": {
       flexBasis: "50%",
       width: "80%",
        marginLeft: wp("9"),
     },
   },
   cardSubMainTxt: {
    fontSize: wp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: "2%",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: wp("3.2"),
    },
  },
  cardSubMainTxt6: {
    fontSize: hp("1.5"),
    fontFamily: Fonts.PoppinsBold,
    width: wp("8"),
    marginLeft: wp("1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginLeft: wp("3"),
      marginRight: wp("1"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.7"),
      width: wp("17"),
    },
  },
  savingsText: {
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: wp("2"),
  },
  savingssubText: {
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginRight: wp("0.5"),
    },
    "@media (max-width: 450px)": {
    },
  },
  numericTxt:{
    fontSize:hp('1.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize:hp('1.5'),
    },
    "@media (max-width: 450px)": {
      fontSize:hp('1.7'),
    },
  },
  numericView: {
    height:hp('4'),
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTxtView3: {
    width: "50%",
    //backgroundColor: 'white',
    height: hp("5"),
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtn: {
    width: "90%",
    height: hp("7"),
    backgroundColor: "rgba(44, 130, 201, 1)",
    marginTop: hp("3"),
    alignItems: "center",
    marginLeft: wp("5"),
    justifyContent: "center",
    borderRadius: 10,
  },
  BtnTxt: {
    fontSize: hp("2.1"),
    fontFamily: Fonts.PoppinsSemiBold,
    marginTop: "1%",
    color: "white",
    //textAlign: 'center',
  },
  footerTxtView2: {
    width: "90%",
    height: hp("4"),
    //backgroundColor: 'red',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fMainTxt: {
    fontSize: hp("1.6"),
    fontFamily: Fonts.PoppinsSemiBold,
    color: "black",
    //marginLeft: '2%',
  },
  fMainTxt2: {
    fontSize: hp("1.6"),
    fontFamily: Fonts.PoppinsSemiBold,
    color: "gray",
    //marginLeft: '2%',
  },
  oderTotalView: {
    width: "90%",
    height: hp("4"),
    //backgroundColor: 'red',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2"),
  },
  OMainTxt: {
    fontSize: hp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    //marginLeft: '2%',
  },
  OMainTxt2: {
    fontSize: hp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: "rgba(44, 130, 201, 1)",
    //marginLeft: '2%',
  },
  noItemTxt: {
    fontSize: hp("3"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    //marginLeft: '2%',
  },
  noItemView: {
    width: "80%",
    height: "70%",
    // backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  
  cardTxtView1: {
    
    width: "100%",
    height: hp("5"),
    justifyContent: "center",
  },

  AddView: {
    width: wp("15"),
    height: hp("6"),
    // alignItems: 'flex-end',
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '10%',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("6"),
    },
    "@media (max-width: 450px)": {
      height: hp("4"),
      marginLeft: '20%',
    },
  },
  priceOption:{
    fontSize:hp('1.5'),
  },
  PriceView: {
    width: "40%",
    height: hp("6"),
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: '6%',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("6"),
    },
    "@media (max-width: 450px)": {
      height: hp("4"),
      width: "35%",
    },
  },
  cardPriceTxt: {
    fontSize: hp("1.7"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("1"),
    fontWeight: "bold",
    "@media (max-width: 1600px) and (min-width: 450px)": {
     
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.8"),
    },
  },
  totalTxt: {
    fontSize: hp("1.5"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("2"),
    fontWeight: "bold",
  },
 
  discountCode: {
    width: "100%",
    height: hp("8.3"),
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
    },
  },
  basketRef: {
    width: "100%",
    height: hp("13"),
    marginTop: hp("1"),
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
    },
  },

  leftBox: {
    flexDirection: "column",
    width: wp("46"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      width: wp("40"),
    },
  },
  rightBox: {
    flexDirection: "column",
    width: wp("46"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      width: wp("52"),
    },
  },
  basketTotal: {
    width: "100%",
    height: hp("16"),
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: wp("2"),
    // justifyContent: 'space-around',
    alignItems: "flex-start",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
    },
  },

  checkout: {
    width: "100%",
    height: hp("5.5"),
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: wp("2"),
    marginTop: hp("1"),
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
    },
  },

  mainBox: {
    width: "94%",
    height: hp("30"),
    // borderRadius: 15,
    // flexDirection: 'row',
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: hp("2%"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginBottom: hp("2%"),
      height: hp("35"),
    },
  },

  cartItemList:{
    width: "100%", 
    height: hp("48"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      height: hp("46"),
    },
  },

  checkoutTxt: {
    fontSize: hp("1.6"),
    color: "white",
    fontFamily: Fonts.PoppinsBold,
  },

  applyTxt: {
    fontSize: hp("1.4"),
    color: colors.primaryColor,
    // justifyContent: 'center',
    fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: hp("1.2"),
    },
  },

  cardSubMainTxt5: {
    fontSize: wp("2"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
     // marginLeft: "5%",
      fontSize: wp("3.2"),
    },
  },

  
  cardTxt: {
    fontSize: hp("1.4"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginLeft: "2%",
      fontSize: hp("1.7"),
    },
  },
  unitPriceTxt:{
    fontSize: hp("1.3"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: hp("1.6"),
    },
  },
  optinsView:{
    justifyContent: "center",
  
    height:hp('6'),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      height:hp('4'),
     // marginLeft:wp('9'),
    },
  },

  noteBtnView:{
    width: wp('11'),
    paddingLeft: wp('1'),
    alignSelf: "center",
    
    "@media (max-width: 450px)": {
      // backgroundColor: "red",
    
     marginTop:wp('-3'),
    },
    
  },
  noteText: {
    color: "black",
    marginLeft: 10, 
    fontFamily: 'System',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 0.6,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: '100%',
      height: hp('5'),
      marginLeft: wp('0'), 
      fontSize: 13,
      lineHeight: 22,
      letterSpacing: 0.6,
    },
    "@media (max-width: 450px)": {
      width: '100%',
      marginLeft: wp('0.1'), 
      fontSize: 15,
      lineHeight: 22,
      letterSpacing: 0.6,
    },
  }

});
