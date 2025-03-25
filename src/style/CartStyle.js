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
  searchView: {
    width: "94%",
    height: hp("6"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2%"),
  },
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

  applyViewCart: {
    width: "100%",
    height: hp("3.5"),
    //marginLeft: wp("1"),

    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginTop: hp("0%"),
      width: "100%",
    },
  },

  searchInput: {
    width: "90%",
    height: hp("4.5"),
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  applyInput: {
    width: "66%",
    height: hp("3.5"),
    backgroundColor: "white",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 3,
      width: "84.5%",
    },
  },
  applyInput1: {
    width: "90%",
    height: hp("3.5"),
    backgroundColor: "white",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 3,
      width: "30%",
    },
  },
  applyInput2: {
    width: "98%",
    height: hp("3.5"),
    backgroundColor: "white",
    borderColor: "#EEEEEE",
   borderWidth:1,
    borderRadius: 8,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      borderRadius: 3,
      width: "100%",
    },
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: "5%",
  },
  TxtInput: {
    width: "90%",
    height: hp("3.5"),
    fontSize: hp(1.5),
    padding: 1,
    color: "black",
    marginLeft: wp("2"),
    // fontWeight: 'bold',
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: hp(1.3),
    },
  },
  filterBtn: {
    width: wp("7"),
    height: hp("4.5"),
    backgroundColor: colors.primaryColor,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtn: {
    width: wp("12"),
    height: hp("3.5"),
    backgroundColor: "white",
    borderWidth: hp("0.1"),
    borderColor: colors.primaryColor,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("2"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginLeft: wp("1"),
      borderRadius: 3,
    },
  },
  filterIcon: {
    resizeMode: "contain",
  },
  titleTxt: {
    fontSize: hp("2.5"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    //textAlign: 'center',
  },

  preseasonTxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsBold,
    color: "white",
    textAlign: 'center',
  },
  topArea: {
    // backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: wp("3"),
    paddingRight: wp("3"),
  },
  discountViewArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: "50%",
    height: hp("5"),
    // marginTop: hp("1"),
    // backgroundColor: 'red',
    // marginBottom: hp("1"),
    // alignSelf: "center",
    // backgroundColor: 'red',
  },
  discountTxtline: {
    fontSize: hp("1.5"),
    // backgroundColor: 'green',
    // color: "black",
  },
  discountSwitch: {
    marginLeft: wp('2'),
  },
  iosDiscountSwitch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
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
  oDiscountArea: {
    marginLeft: wp('2'),
    height: hp('3'),
    padding: wp('0.4'),
    paddingLeft: wp('2'),
    paddingRight: wp('2'),
    borderRadius: 5,
    // width: wp('3'),
    backgroundColor: '#f2f2f2',
    // backgroundColor: '#ffffff',
    shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.05,
   shadowRadius: 3,
   elevation: 1,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {

    },
  },
  oDiscountTxt: {
    fontSize: wp('2.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: wp('3.5'),
      marginTop: hp('0.2')
    },
  },
  fadingContainer: {

  },
  disTextinput: {
    flex: 6,
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      flex: 8,
    },
  },
  titleView: {
    width: "25%",
    // height: hp("5"),
    // marginTop: hp("1"),
    // backgroundColor: 'red',
    // marginBottom: hp("1"),
    alignSelf: "center",
  },
  preseasonView: {
    width: "50%",
    height: hp("2.3"),
    // alignItems: "center",
    justifyContent: "center",
    // marginTop: hp("1"),
    backgroundColor: colors.primaryColor,
    // marginBottom: hp("1"),
    borderRadius: 5,
    alignSelf: "center",
  },
  dialogbox:{
    backgroundColor: 'white',
    width: wp("50"),
    height: hp("19"),
    maxHeight: hp("30"),
    borderRadius: 10,
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("17.5"),
    },
    "@media (max-width: 450px)": {
      height: hp("21"),
      width: wp("75"),
    },
  },
  discountInput: {
    height: 50,
    // margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#e3e3e3',
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      marginTop: -10,
      height: 40,
    },
  },
  cardcontainView: {
    flexDirection: "row",
    width: "100%",
    height: hp("6"),
    backgroundColor:'white',
    borderRadius:wp('2'),
    shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3,
   elevation: 1,
    "@media (max-width: 450px)": {
      height: hp("12"),
    },
  },
  footerCardView: {
    width: "100%",
    height: hp("6"),
    backgroundColor: "white",
    borderRadius: wp("2"),
   // alignItems: "center",
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3,
   elevation: 1,
    // marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      height: hp("12"),
    },
  },

  footerCardViewQuote: {
    width: "100%",
    // height: hp("11"),
    backgroundColor: "#EBFFE8",
    borderRadius: wp("2"),
   // alignItems: "center",
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3,
   elevation: 1,
    // marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    //flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      // height: hp("17"),
    },
  },

  footerNoteView: {
    width: "94%",
    // height: hp("11"),
    backgroundColor: "#EBFFE8",
    borderRadius: wp("2"),
   // alignItems: "center",
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3,
   elevation: 1,
    marginBottom: hp("2"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    //flexDirection: "row",

    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      // height: hp("20"),
    },
  },


  footerCardView2: {
    width: "90%",
    paddingTop: 20,
    height: hp("28"),
    backgroundColor: "white",
    //marginLeft: 10,
    borderRadius: 15,
    alignItems: "center",
    //shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 2,
    margin: 8,
    marginLeft: "5%",
    marginTop: hp("6"),
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    //flexDirection: 'row',
    // justifyContent: 'center',
  },
  cardSubMainTxt: {
    fontSize: hp("1.3"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: wp("0.5"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: hp("1.4"),
    },
  },
  cardSubMainTxt6: {
    fontSize: hp("1.4"),
    // fontFamily: Fonts.PoppinsBold,
    width: wp("13"),
    textAlign: "center",
    marginLeft: wp("1"),
    color:'black',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginLeft: wp("0"),
      marginRight: wp("1"),
      width: wp("13"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.5"),
      width: wp("19"),
      textAlign: "left",
    },
  },
  savingsText: {
    fontSize: hp("1.4"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: wp("2"),
  },
  savingssubText: {
    fontSize: hp("1.4"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginRight: wp("0.5"),
    },
    "@media (max-width: 450px)": {},
  },
  cardTxt: {
    fontSize: hp("1.4"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("0.5"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.4"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.6"),
    },
  },
  cardTxt2: {
    fontSize: hp("1.6"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
  },
  cardSubTxt: {
    fontSize: hp("1.6"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "gray",
    marginLeft: "2%",
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: "contain",
  },

  cardImgIcn: {
    flex: 1,
    aspectRatio: 0.5,
    resizeMode: "contain",
    marginLeft: wp("-1.5"),
  },
  cardSubImg: {
    // width: wp('15'),
    // height: hp('10'),
    width: 60,
    height: 60,
  },
  headerView: {
    width: "85%",
    height: hp("5"),
    marginTop: hp("5%"),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  drawerIcon: {
    width: 25,
    height: 18,
  },
  cartIcon: {
    width: 35,
    height: 25,
  },
  removeIcon: {
    width: 25,
    height: 25,
    //position: 'absolute',
    //marginLeft: '5%',
  },
  removeIconView: {
    width: wp("12"),
    height: hp("15"),
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    //backgroundColor: 'yellow',
    marginLeft: wp("80"),
  },
  cardImgView: {
    width: "30%",
    marginLeft: wp("-3"),
    height: hp("15"),
    alignItems: "center",
    justifyContent: "center",
  },
  cardTxtView: {
    width: "70%",
    //backgroundColor: 'yellow',
    height: hp("15"),
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: wp("1"),
  },
  cardTxtView1: {
    width: "84%",
    height: hp("3"),
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("6"),
    },
    "@media (max-width: 450px)": {
      height: hp("6"),
      width: "85%",
    },
  },

  gramsView: {
    width: "30%",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("6"),
      width: "25%",
    },
    "@media (max-width: 450px)": {
      height: hp("6"),
      width: "20%",

    },
  },

  totalTextView: {
    width: "97%",
    height: hp("3"),
    flexDirection: "row",
    marginTop: hp("1"),
    position: 'absolute',
    bottom:1,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("1"),
    },
    "@media (max-width: 450px)": {
      marginTop: hp("0"),
    },
  },

  cartItemsubView1: {
    width: "43%",
    height: hp("6"),

    //  justifyContent: "center",
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "45%",
    },
    "@media (max-width: 450px)": {
      width: "100%",
    },
  },
  cartItemsubView2: {
    width: "56%",
    height: hp("6"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "56%",
    },
    "@media (max-width: 450px)": {
      width: "100%",
    },
  },
  cartItemTextView: {
    width: "94%",
    height: hp("6"),
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginLeft: wp("1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginLeft: wp("1"),
    },
    "@media (max-width: 450px)": {
      marginLeft: wp("0"),
      flexDirection: "column",
      height: hp("12"),
    },
  },

  savingsTextView: {
    width: "100%",
    height: hp("2"),
    flexDirection: "row",
    alignItems: "flex-start",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      display: "none",
    },
    // justifyContent: 'center',
  },
  savingsbtnView: {
    width: "100%",
    height: hp("4"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("0.7"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "100%",
    },
    "@media (max-width: 450px)": {
      width: "50%",
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
  toggleView: {
    width: "60%",
    height: hp("4"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  },
  cardTxtView2: {
    width: "100%",
    height: hp("5"),
    //backgroundColor: 'green',
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  preTxt: {
    fontSize: hp("1.3"),
    marginLeft: wp("1"),
    color: colors.primaryColor,
  },
  numericView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height:hp('5')
    //     width: '80%',
    //     backgroundColor: '#f2f3f4',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 10
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
    // fontFamily: Fonts.PoppinsSemiBold,
    marginTop: "1%",
    color: "white",
    //textAlign: 'center',
  },
  footerTxtView2: {
    width: "90%",
    height: hp("4"),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fMainTxt: {
    fontSize: hp("1.6"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "black",
    //marginLeft: '2%',
  },
  fMainTxt2: {
    fontSize: hp("1.6"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "gray",
    //marginLeft: '2%',
  },
  oderTotalView: {
    width: "90%",
    height: hp("4"),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2"),
  },
  OMainTxt: {
    fontSize: hp("2"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    //marginLeft: '2%',
  },
  OMainTxt2: {
    fontSize: hp("2"),
    // fontFamily: Fonts.PoppinsBold,
    color: "rgba(44, 130, 201, 1)",
    //marginLeft: '2%',
  },
  noItemTxt: {
    fontSize: hp("3"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    //marginLeft: '2%',
  },
  noItemView: {
    width: "80%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  AddView: {
    width: wp("10"),
    height: hp("6"),
    // alignItems: 'flex-end',
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("10"),
    },
    "@media (max-width: 450px)": {
      width: wp("16"),
    },
  },
  PriceView: {
    width: "40%",
    height: hp("6"),

    alignItems: "flex-end",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {

      width: "27%",

    },
    "@media (max-width: 450px)": {
      width: "40%",
      alignItems: "center",
    },
    //marginLeft: '5%'
  },
  cardUnitPriceTxt: {
    fontSize: hp("1.4"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: wp("1"),
    marginRight: wp("1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.4"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.5"),
    },
  },
  cardPriceTxt: {
    textAlign: "right",
    fontSize: hp("1.6"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("1"),
    marginRight: wp("1"),
    fontWeight: "bold",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.6"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.6"),
    },
  },
  totalTxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("2"),
    fontWeight: "bold",
  },
  DeleteView: {
    width: wp("5"),
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "6%",
  },
  DeleteViewNew: {
    width: wp("5"),
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      justifyContent: "flex-start",
      marginLeft: wp("1"),
      marginRight: wp("2"),
      height: hp("11"),
    },
  },
  delBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("4"),
    backgroundColor: "#f8d1d9",
    borderRadius: wp("1"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("6"),
    },
    "@media (max-width: 450px)": {
      width: wp("8"),
    },
  },
  discountCode: {
    width: "100%",
    height: hp("8.3"),
    backgroundColor: 'white',
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
      height: hp("5.5"),
    },
  },

  cartIns: {
    marginTop: hp("1"),
    width: "96%",
    flexDirection: "column",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexDirection: "column",
      marginLeft: "2%",
    },
    "@media (max-width: 450px)": {
      flexDirection: "row",
      marginTop: hp("0"),
      width: "48%",
      marginLeft: "2%",
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
      height: hp("5.5"),
      flexDirection: "row",
      width: "100%",
    },
  },

  leftBox: {
    flexDirection: "column",
    width: wp("46"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      width: wp("94"),
    },
  },
  rightBox: {
    flexDirection: "column",
    width: wp("46"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      width: wp("94"),
      marginTop: hp("1"),
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
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("16"),
    },
    "@media (max-width: 450px)": {
      borderRadius: 4,
      marginLeft: wp("0"),
      height: hp("13"),
    },
  },

  checkout: {
    width: "100%",
    height: hp("5.5"),
    backgroundColor: colors.primaryColor,
    tintColor: 'gray',
    // tintColor: "#2d3436",
    // opacity: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: wp("2"),
    marginTop: hp("1"),
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
      height: hp("4.5"),
      marginLeft: wp("0"),
    },
  },


  checkout_diabled: {
    width: "100%",
    height: hp("5.5"),
    backgroundColor: colors.primaryColor,
    tintColor: 'gray',
    // tintColor: "#2d3436",
    opacity: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: wp("2"),
    marginTop: hp("1"),
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
      height: hp("4.5"),
      marginLeft: wp("0"),
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
    //marginTop: hp("2%"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      minHeight: hp("30"),
    },
    "@media (max-width: 450px)": {
      marginBottom: hp("2%"),
      height: hp("33"),
      flexDirection: "column",
    },
  },

  cartItemList: {
    width: "100%",
    height: hp("47"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      height: hp("33"),
    },
  },

  checkoutTxt: {
    fontSize: hp("1.6"),
    color: "white",
    // fontFamily: Fonts.PoppinsBold,
  },

  applyTxt: {
    fontSize: hp("1.4"),
    color: colors.primaryColor,
    // justifyContent: 'center',
    // fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: hp("1.2"),
    },
  },

  cardSubMainTxt5: {
    fontSize: wp("2"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      marginLeft: "2%",
      fontSize: wp("2.2"),
    },
  },

  updateFields: {
    width: "48%",
    alignSelf: "center",
    height: hp("4.5"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "48%",
      marginTop:hp('0.5'),
    },
    "@media (max-width: 450px)": {
      width: "100%",
    },
  },
  updateBtn: {
    width: "49%",
    alignSelf: "flex-start",
    height: hp("4"),
    backgroundColor: "#FFD8D8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("1"),
  },
  emptyCartBtn: {
    width: "49%",
    marginLeft: "2%",
    height: hp("4"),
    backgroundColor: "#FFD8D8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("1"),
  },
  updateTxt: {
    fontSize: hp("1.5"),
    color: "white",
  },
  emptyTxt: {
    fontSize: hp("1.5"),
    color: "#E61538",
  },
  cartItmsHeader: {
    width: "94%",
    height: hp("3"),
    alignSelf: "center",
    marginBottom: hp("0.5"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      display: "none",
    },
  },
  cartItmsDlt: {
    width: "10%",
    height: hp("3"),
    alignItems: "flex-start",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      display: "none",
    },
  },
  cartHTxtView: {
    width: "15%",
    height: hp("3"),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("29"),
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      display: "none",
    },
  },



  discountTxt:{
    color: colors.primaryColor,
    fontSize: hp("1.5"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp("1.5"),
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.7"),
    },
  },

  discountView:{
    alignItems: "center",
    width: "97%",

    marginTop: hp('1'),
    marginBottom: hp('1'),



    // height: hp("5"),
    alignSelf:'center',
    flexDirection: "row",
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

  noteBtnView:{
    width: wp('11'),
    paddingLeft: wp('1'),
    alignSelf: "center",
    "@media (max-width: 450px)": {
      width: wp('17'),
    //  marginTop:wp('-3'),
    },

  },


  lineDiscountView:{
    marginLeft:wp('1'),
    width:wp('18'),
    height:hp('3.5'),
    borderRadius:wp('0.8'),
    borderWidth:wp('0.2'),
    flexDirection:'row',
    borderColor:'#E1E2E2',
    backgroundColor:'white',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:wp('18'),
    },
    "@media (max-width: 500px)": {
      width:wp('25'),
    },
  },

  TxtInput: {
    width: "90%",
    height: hp("3.5"),
    fontSize: hp('1.5'),
    padding: 0.5,
    color: "balck",
    textAlign:"center",
    //marginLeft: wp("2"),
    // fontWeight: 'bold',
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      fontSize: hp('1.5'),
    },
  },

  TxtInputq:{
    width: "90%",
    height: hp("3.5"),
    fontSize: hp('1.5'),
    padding: 0.5,
    color: "balck",
    marginLeft:wp('5'),
    //marginLeft: wp("2"),
    // fontWeight: 'bold',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "90%",
      marginLeft:wp('2'),
    },
    "@media (max-width: 450px)": {
      fontSize: hp('1.5'),
    },
  },

  carriageTxtView:{
    width:'96%',
    height:hp('3'),
    alignSelf:'center',
    backgroundColor:'#CFE2FF',
   // marginTop: hp("1.5"),
    borderRadius:wp('1'),
    borderWidth:wp('0.1'),
    borderColor:'#B6D4FE',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:hp('4'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
     // marginTop: hp("1.5"),
     bottom:hp('4'),
    },
    "@media (max-width: 450px)": {
      marginTop: hp("0"),
      //marginBottom:hp('0')
    },
  },
  carriageTxt:{
    fontSize:hp('1.1'),
    color:'#084298',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize:hp('1.1'),
    },
    "@media (max-width: 450px)": {
      fontSize:hp('1.3'),
    },
  },

  updateFieldsView:{
    width: "94%",
    alignSelf: "center",
    height: hp("5"),
    flexDirection:'row',
    justifyContent:'flex-start',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("5"),
      flexDirection:'row'
    },
    "@media (max-width: 450px)": {
      flexDirection:'column',
      height: 'auto',
      marginBottom:hp('0.5')
    },
  },
  updateNote:{
    width: "50%",
    alignSelf: "center",
    height: hp("3.5"),
    backgroundColor:'#FFF3CD',
    borderColor:'#FFECB5',
    borderWidth:wp('0.1'),
    borderRadius:wp('1'),
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "49%",
      marginLeft:'3%',
    },
    "@media (max-width: 450px)": {
      width: "100%",
    },
  },

  cartItemQuantity:{
    width: 50,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ededed',
    padding: 10 ,
    textAlign:'center',
    color:"gray",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: 80,
    },
    "@media (max-width: 450px)": {
      height:hp('4.5'),
      padding: hp('0.1') ,
    },
  },




dropdown: {
  height: hp("3.5"),
  width: "100%",
  paddingLeft: wp("2"),
  paddingRight: wp("2"),
},
selectedTextStyle: {
  fontSize: hp("1.5"),
  color: "black",
},
placeholderStyle:{
  fontSize: hp("1.5"),
  color: "black",
},

  // fieldsView:{
  //   height: "53%",
  //   width: "94%",
  //   marginTop: hp("1.5"),
  //   "@media (max-width: 1600px) and (min-width: 450px)": {
  //     height: "35%",
  //   },
  //   "@media (max-width: 450px)": {
  //     height: "60%",
  //   },
  // },
  // fieldsSubView1: {
  //   height: "30%",
  //   width: "50%",
  //   alignItems: "center",
  //   backgroundColor:"green",
  //   "@media (max-width: 1600px) and (min-width: 450px)": {
  //     flexBasis: "49%",
  //   },
  //   "@media (max-width: 450px)": {
  //     flexBasis: "100%",
  //   },
  // },
  // fieldsSubView2: {
  //   height: "30%",
  //   width: "50%",
  //   alignItems: "center",
  //   backgroundColor:"yellow",
  //   "@media (max-width: 1600px) and (min-width: 450px)": {
  //     flexBasis: "49%",
  //   },
  //   "@media (max-width: 450px)": {
  //     flexBasis: "100%",
  //   },
  // },

  keyboardView: {
    width: "100%",
    height: hp("82"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("80"),
    },
    "@media (max-width: 450px)": {
      height: hp("75"),
    },
  },


  notepallet: {
    width: "94%",
    height: hp("6"),
    padding: 10,
    backgroundColor: "white",
    borderRadius: wp("1"),
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 5,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3,
   elevation: 1,
   marginTop: hp("-0.9"),
   marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      height: hp("6"),
    },
  }

});
