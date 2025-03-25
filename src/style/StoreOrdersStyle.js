import { Dimensions, Platform, PixelRatio } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
import StyleSheet from "react-native-media-query";
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import * as colors from '../style/Common/ColorsStyle';
let widthper = wp("100%");
let txt_size = 0;
let btn_size = wp("6.5");
let tabwidth_ = "72%";
if (widthper <= 500.0) {
  txt_size = wp("2.8");
  btn_size = wp("8");
  tabwidth_ = "100%";
} else {
  txt_size = wp("2.1");
  tabwidth_ = "40%";
  let btn_size = wp("6.5");
}
module.exports = StyleSheet.create({

  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  emptyAlertBox: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  container: {
    //flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchView: {
    width: "92%",
    height: hp("6"),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
  },
  searchInput: {
    width: "100%",
    height: hp("5"),
    backgroundColor: "#F6F6F6",
    borderRadius: wp("1.5"),
    flexDirection: "row",
    borderColor: "#EEEEEE",
    borderWidth: hp("0.1"),
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchIcon: {
    width: wp("3.5"),
    height: hp("2.5"),
    marginLeft: "3%",
    resizeMode: "contain",
  },
  TxtInput: {
    width: "80%",
    height: hp("7"),
    fontSize: hp(1.7),
    // fontWeight: 'bold',
    // backgroundColor: 'red',
  },
  addIcon: {
    marginTop: hp("1.2"),
    width: wp("2.6"),
    height: wp("2.6"),
  },
  titleTxt: {
    fontSize: hp("2.2"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    //textAlign: 'center',
  },
  newContactTxt: {
    fontSize: wp("2.3"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    alignSelf: "flex-start",
    marginTop: hp("1"),
    marginLeft: wp("-2"),
    //textAlign: 'center',
  },
  titleView: {
    width: "100%",
    height: hp("4"),
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: wp("3.5"),
    marginTop: hp("0.2"),
  },
  buttonView: {
    width: tabwidth_,
    height: hp("4"),
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  dateView: {
    height: hp("4"),
    alignSelf: "flex-start",
    flexDirection: "row",
    width: wp("25"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("25"),
      position: "absolute",
      right: 0,
      height: hp("3.5"),
    },
    "@media (max-width: 500px)": {
      width: wp("92"),
      marginTop: hp("1"),
    },
  },
  buttonView1: {
    flex: 1,
    height: hp("5"),
    alignSelf: "flex-start",
  },
  titleButtonView: {
    width: "92%",
    height: hp("4"),
    alignSelf: "flex-start",
    marginLeft: wp("3.5"),
    marginTop: hp("2"),
    marginBottom: hp("1"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      flexDirection: "row",
      height: hp("4"),
    },
    "@media (max-width: 500px)": {
      flexDirection: "column",
      height: hp("10"),
    },
  },
  footerCardView: {
    width: "92%",
    height: hp("7"),
    backgroundColor: "white",
    borderRadius: wp("2"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",

    "@media (max-width: 500px)": {

      height: hp("9"),
    },

  },
  cardSubMainTxt: {
    fontSize: txt_size,
    // fontFamily: Fonts.PoppinsBold,
    color: "#cacccc",
    marginLeft: "2%",
  },
  emailTxt: {
    fontSize: wp("1.9"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
  },
  cardTxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("1"),
  },
  subcardTxt: {
    fontSize: txt_size,
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
  },
  subcardTxtPrice: {
    fontSize: txt_size + 2,
    // fontFamily: Fonts.PoppinsBold,
   // color: colors.primaryColor,
    fontWeight: "bold",
    color:'black'
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4,
    resizeMode: "contain",
    // borderRadius: 1,
    //resizeMethod: 'cover',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      aspectRatio: 0.4,
    },
    "@media (max-width: 450px)": {
      aspectRatio: 0.5,
    },
  },
  listViewArea: {
    width: "100%",
    height:'67%',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height:'84%',
    },
    "@media (max-width: 450px)": {

    },
  },
  cardImgcross: {
   // flex: 1,
   // aspectRatio: 0.4,
    height:hp('2'),
    width:wp('2'),
    resizeMode:'contain',
    //resizeMethod: 'cover',
  },

  cardTxtView1: {
    flex: 1.3,
    height: hp("6"),
    marginLeft: wp("1"),
    marginRight: wp("1"),
    justifyContent: "center",
  },
  cartItemTextView: {
    width: "98%",
    height: hp("6"),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subView: {
    flex: 1,
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
  },
  iconView: {
    flex: 0.7,
    height: hp("6"),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: wp("1.5"),
  },
  checkboxView: {
    width: 50,
    height: 50,
    justifyContent:'center',
    alignItems:'center'
  },
  ashBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: btn_size,
    height: hp("4"),
    marginRight: wp("0.7"),
    backgroundColor: "#e9e9e9",
    borderRadius: wp("1.2"),
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
  },
  grnBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: btn_size,
    height: hp("4"),
    marginRight: wp("0.7"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp("1.2"),
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
  },
  eyeBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: btn_size,
    height: hp("4"),
    marginRight: wp("1.5"),
    backgroundColor: "#DEF9F6",
    borderRadius: wp("1.2"),
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
  },
  addCustomerBtn: {
    width: wp("27"),
    height: hp("4.5"),
    backgroundColor: "white",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginLeft: "10%",
  },
  contactTitle: {
    width: "55%",
    height: hp("6"),
    flexDirection: "row",
    alignItems: "flex-start",
  },

  // contact form

  noteItemTextView: {
    width: "52%",
    height: hp("6"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1%"),
  },

  notecardTxtView1: {
    width: wp("60%"),
    height: hp("3"),
    marginLeft: wp("1"),
    justifyContent: "center",
  },
  notesubcardTxt: {
    fontSize: hp("1.8"),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
  },







//drop down



  dropdown: {
    height: hp('4'),
    borderColor: '#E1E2E2',
    borderWidth: wp('0.1'),
    borderRadius: wp('1'),
    paddingHorizontal: 8,
    backgroundColor:'white',
    width:wp('36'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("36"),
    },
    "@media (max-width: 500px)": {
      width: wp("50"),

    },
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: hp('1.5'),
    color:'gray'
  },
  placeholderStyle: {
    fontSize: hp('1.5'),
    color:'gray'
  },
  selectedTextStyle: {
    fontSize: hp('1.5'),
    color:'gray'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: hp('1.5'),
  },
  downloadButton: {
    width: wp("25"),
    height: hp("4"),
    position: "absolute",
    right: 0,
    borderRadius:wp('1'),
    borderWidth:wp('0.1'),
    borderColor:'#1ED18C',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      width: wp("22"),


    },
  },
  updateButton: {
    width: wp("15"),
    height: hp("4"),
    position: "absolute",
    marginRight:10,
    right: 130,
    borderRadius:wp('1'),
    borderWidth:wp('0.1'),
    borderColor:'#1ED18C',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      width: wp("18"),
      right: 75,

    },
  }
});
