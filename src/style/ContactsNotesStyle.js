import { Dimensions, Platform, PixelRatio } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const { StyleSheet } = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { normalize } from "./FontSize";
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
// const {
//   width: SCREEN_WIDTH,
//   height: SCREEN_HEIGHT,
// } = Dimensions.get('window');

// // based on iphone 5s's scale
// const scale = SCREEN_WIDTH / 320;

// export function normalize(size) {
//   const newSize = size * scale
//   if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize))
//   } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
//   }
// }

let widthper = wp("100%");
let txt_size_btn = 0;
let txt_size = 0;
if (widthper <= 500.0) {
  txt_size = wp("2.6");
 txt_size_btn = wp("2.8");
} else {
  txt_size = wp("2.1");
 txt_size_btn = wp("2.6");
}

module.exports = StyleSheet.create({
  saveView:{
    height: hp("5.5"),
                    width: wp("89.5"),
                    // backgroundColor: "#f8d7da",
                    marginLeft: "2%",
                    marginTop: "2%",
                    justifyContent: "center",
                    alignItems: "center",

  },

  itemsNotesView:{
    maxHeight: "50%",
    width: "100%",
    alignItems: "center",
    marginTop: hp("1.5"),
    minHeight:'20%',
  //  marginBottom: hp("1.5"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      minHeight:'20%',
      maxHeight: "50%",
    },
    "@media (max-width: 450px)": {
      minHeight:'20%',
      maxHeight: "45%",
    },
  },
  fieldsView:{
    height: hp('33'),
    width: "100%",
    marginTop: hp("1.5"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('33'),
    },
    "@media (max-width: 450px)": {
      height: hp('51'),
    },
  },
  accountNotes: {
    height: "70%",
    width: "50%",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexBasis: "49%",
      marginLeft:'1%'
    },
    "@media (max-width: 450px)": {
      flexBasis: "100%",
     // marginLeft:'1%'
    },
  },
  accountNotes2: {
    height: "74%",
    width: "50%",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexBasis: "49%",
      height: "125%",
    },
    "@media (max-width: 450px)": {
      flexBasis: "100%",
      height: "85%",
    },
  },
  detailsBox: {
    flexWrap: "wrap",
    height: "70%",
    width: "100%",
    flexDirection: "row",
  },
  contentBox: {
    height: "40%",
    width: "94%",
    marginTop: hp("1.5"),
    marginBottom: hp("1.5"),
  },
  postaltxtScrollView: {
    width: "99%",
   // height: hp("21.5"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("27"),
      width: "100%",
    },
    "@media (max-width: 450px)": {
      height: hp("14"),
    },
  },
  postaltxtInputView: {
    width: "100%",
    height: hp("21.5"),
    backgroundColor: "#FFFFFF",
    borderColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: wp("1.3"),
    marginTop: hp("0.3%"),
    borderWidth: hp("0.1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("27"),
      marginLeft:'1%',
      width: "102%",
    },
    "@media (max-width: 450px)": {
      height: hp("14"),
    },
  },
  postalTxtInput: {
    width: "98%",
    fontSize: hp('1.5'),
    color: colors.tertiaryColor,
    justifyContent: "flex-start",
    alignSelf:'center',
    textAlignVertical: "top",
    "@media (max-width: 1600px) and (min-width: 450px)": {
    },
    "@media (max-width: 450px)": {
      marginLeft:wp('2')
    },
  },
  textView: {
    width: "98%",
    height: hp("3"),
    alignItems: "flex-start",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("1"),
      width: "98%",
      height: hp("3"),
    },
    "@media (max-width: 450px)": {
      width: "99%",
      height: hp("3"),
    },
  },
  textViewdis: {
    width: "98%",
    height: hp("3"),
    alignItems: "flex-start",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("1"),
      width: "98%",
      height: hp("3"),
    },
    "@media (max-width: 450px)": {
      width: "80%",
      height: hp("4"),
    },
  },
  TxtInput: {
    width: "93%",
    height: hp("4.5"),
    fontSize: hp(1.5),
    marginLeft: wp("1.5"),
    color: colors.tertiaryColor,
    padding:1,
  },
  itemTxt: {
    height: hp("3"),
    fontSize: hp("1.5"),
    color: "black",
    textAlign:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("1"),
    },
    "@media (max-width: 450px)": {
      marginTop: hp("1"),
    },
  },
  itemTxtdis: {
    fontSize: hp("1.5"),
    color: "black",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("1"),
      fontSize: hp("1.5"),
    },
    "@media (max-width: 450px)": {
      fontSize: hp("1.4"),
    },
  },
  txtInputView: {
    width: "100%",
    height: hp("4.5"),
    //backgroundColor: 'red',
    borderColor: "#e6e6e6",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: hp("1"),
    marginTop: hp("0.1%"),
    borderWidth: hp("0.1"),
  },
  txtInputDiscountView: {
    width: "79%",
    height: hp("4.5"),
    //backgroundColor: 'red',
    borderColor: "#e6e6e6",
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: hp("1"),
    marginTop: hp("0.4%"),
    borderWidth: hp("0.1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: "73%",
    },
    "@media (max-width: 450px)": {
      width: "70%",
    },
  },
  InputDiscountContainerView: {
    width: "100%",
    height: hp("4.5"),
    flexDirection: "row",
  },
  TxtInputDiscount: {
    width: "93%",
    height: hp("4.5"),
    fontSize: hp(1.5),
    color: "gray",
    textAlign:'center',
    padding:1
  },
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor:'#F9F9F9'
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

  addIcon: {
    width: wp("2.6"),
    height: wp("2.6"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
    },
    "@media (max-width: 450px)": {
      marginTop:hp('0.1'),
      width: wp("3.5"),
      height: wp("3.5"),
    },
  },
  titleTxt: {
    fontSize: hp("2.2"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    //textAlign: 'center',
  },
  newContactTxt: {
    fontSize: hp("1.5"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    marginLeft: wp("-3"),
    textAlign: "center",
  },
  titleView: {
    width: "94%",
    height: hp("4"),
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleView1: {
    width: "100%",
    height: hp("4"),
    marginTop: hp("4"),
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerCardView: {
    width: "100%",
    height: hp("7.5"),
    backgroundColor: "white",
    borderRadius: wp("2"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: hp("1"),
    alignSelf: "center",
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("8"),
    },
    "@media (max-width: 450px)": {

    },
  },
  cardSubMainTxt: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: "#cacccc",
    marginLeft: "2%",
  },
  emailTxt: {
    fontSize: wp("1.9"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
  },
  cardTxt: {
    fontSize: hp("1.7"),
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("1"),
  },
  subcardTxt: {
    fontSize: hp("2.5"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    fontWeight: "bold",
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: "contain",
    // borderRadius: 1,
    //resizeMethod: 'cover',
  },
  cardTxtView1: {
    width: "56%",
    height: hp("3"),
    marginLeft: wp("1"),
    marginRight: wp("1"),
    //backgroundColor: 'red',
    justifyContent: "center",
  },
  cartItemTextView: {
    width: "56%",
    height: hp("6"),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subView: {
    width: wp("25"),
    height: hp("6"),
    alignItems: "flex-end",
    justifyContent: "center",
  },
  subView1: {
    width: wp("26"),
    height: hp("6"),
    alignItems: "flex-end",
    justifyContent: "center",

  },
  iconView: {
    width: wp("10"),
    height: hp("6"),
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: wp("1.5"),
  },
  delBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("5"),
    backgroundColor: "#f8d1d9",
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
  ashBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("5"),
    backgroundColor: "#e9e9e9",
    borderRadius: wp("1.2"),
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: hp("1") },
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
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("5"),
    backgroundColor: "#DEF9F6",
    borderRadius: wp("1.2"),
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: hp("1") },
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
    width: wp("25"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    "@media (max-width: 1600px) and (min-width: 450px)": {
    },
    "@media (max-width: 450px)": {
      width: wp("29"),
    },
  },
  newSaveTxt: {
    fontSize: hp("1.8"),
    fontFamily: Fonts.PoppinsBold,
    color: "white",
    alignSelf: "center",
    //textAlign: 'center',
  },

  saveBtn: {
    width: wp("89.5"),
    height: hp("4.5"),
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: wp("1.5"),
    // marginTop: hp("4.4"),
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
  },

  notecardTxtView1: {
    width: wp("60%"),
    height: hp("3"),
    marginLeft: wp("1"),
    justifyContent: "center",
  },
  notesubcardTxt: {
    fontSize: hp("1.7"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
  },
});
