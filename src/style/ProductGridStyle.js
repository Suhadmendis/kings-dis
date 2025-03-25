import { Dimensions } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const {StyleSheet} = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    // width: WIDTH,
    // height: '100%',
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  TxtInput: {
    width: "80%",
    height: hp("7"),
    fontSize: hp(2),
    fontWeight: "bold",
    // backgroundColor: 'red',
  },
  filterBtn: {
    width: wp("7"),
    height: hp("4.5"),
    backgroundColor: colors.primaryColor,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
    marginLeft: 5,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("7"),
      height: hp("4.5"),
      borderRadius: 6,
    },
    "@media (max-width: 500px)": {
      width: wp("12"),
      height: hp("6"),
      borderRadius: 5,
    },
  },
  filterIcon: {
    resizeMode: "contain",
  },
  titleTxt: {
    fontSize: hp("2.2"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    width: wp("75"),
    //textAlign: 'center',
    "@media (max-width: 500px)": {
      fontSize: hp("2"),
    },
  },

  titleView: {
    width: "50%",
    height: hp("4"),
    justifyContent: "center",
    marginTop:hp('1')
  },

  titleTxtMain: {
    fontSize: hp("2.2"),
    // fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
    //textAlign: 'center',
  },
  titleViewMain: {
    width:'94%'
  },
  // search view bar style end ----

  CardDetail: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: wp("30"),
    marginTop: hp("1"),
  },
  CardDetail1: {
    // alignSelf: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp("10"),
    height: wp("5"),
  },
  CardDetail2: {
    // fontFamily: Fonts.PoppinsMedium,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp("12%"),
    height: wp("5%"),
  },
  detailContent: {
    margin: 8,
    alignItems: "center",
  },
  title: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsMedium,
    color: "white",
    fontWeight: "bold",
  },
  bodyView: {
    flexDirection: "row",
    width: "94%",
    marginTop: "2%",
    justifyContent: "space-between",
    //marginLeft: '10%',
    alignItems: "center",
    //paddingLeft: 10,
    //paddingHorizontal: 10,
    height: hp("4"),
  },
  listViewButton: {
    width: wp("5"),
    height: wp("5"),
    backgroundColor: colors.primaryColor,
    marginLeft: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
  },
  gridBtnActive: {
    width: wp("6"),
    height: wp("6"),
    backgroundColor: colors.primaryColor,
    marginLeft: wp("4%"),
    alignItems: "center",
    borderRadius: 6,
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("6"),
      height: wp("6"),
      borderRadius: 6,
    },
    "@media (max-width: 500px)": {
      width: wp("7"),
      height: wp("7"),
      borderRadius: 5,
    },
  },
  gridBtn: {
    width: wp("6"),
    height: wp("6"),
    backgroundColor: "#f0f0f0",
    marginLeft: wp("4%"),
    alignItems: "center",
    borderRadius: 6,
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("6"),
      height: wp("6"),
      borderRadius: 6,
    },
    "@media (max-width: 500px)": {
      width: wp("7"),
      height: wp("7"),
      borderRadius: 5,
    },
  },
  gridIcon: {
    width: wp("2"),
    height: wp("2"),
  },
  listBtnActive: {
    width: wp("6"),
    height: wp("6"),
    marginLeft: wp("1"),
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("6"),
      borderRadius: 6,
      height: wp("6"),
    },
    "@media (max-width: 500px)": {
      width: wp("7"),
      height: wp("7"),
      borderRadius: 5,
    },
  },
  listBtn: {
    width: wp("6"),
    height: wp("6"),
    marginLeft: wp("1"),
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("6"),
      borderRadius: 6,
      height: wp("6"),
    },
    "@media (max-width: 500px)": {
      width: wp("7"),
      height: wp("7"),
      borderRadius: 5,
    },
  },
  listIcon: {
    width: wp("7"),
    height: wp("7"),
    resizeMode: "contain",
  },
  filter: {
    width: wp("12"),
    height: wp("6"),
    // backgroundColor:'#1ED18C',

    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("11"),
      height: wp("6"),
    },
    "@media (max-width: 500px)": {
      width: wp("16"),
      height: wp("7"),
    },
  },
  filterText: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    paddingStart: wp("1"),
    fontSize: hp("1.5"),
    marginLeft: "3%",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginLeft: "3%",
    },
    "@media (max-width: 500px)": {
      marginLeft: "10%",
    },
  },
  filIcon: {
    marginLeft: "12%",
    height: wp("2"),
    width: wp("2"),
    resizeMode: "contain",
  },
  item2: {
    marginBottom: 10,
    width: "32%",
    height: hp("30"),
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    // alignItems: 'center',
    //paddingLeft: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    shadowColor: "#000",
    elevation: 2,
    margin: 5,
    // marginTop: hp('-2'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "32%",
      height: 400,
    },
    "@media (max-width: 500px)": {
      width: "31%",
    },
  },
  itemImage: {
    width: "100%",
    height: "99%",
    borderRadius: 10,
  },
  cardMainTxtView1: {
    width: wp("26"),
    height: hp("12"),
    marginLeft: wp("-1"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("12"),
    },
    "@media (max-width: 500px)": {
      height: hp("13"),
    },
  },
  List: {
    width: "95%",
    height: hp("5"),
    alignItems: "flex-start",
    justifyContent: "center",
    // height:'auto',
    //backgroundColor:"red"
  },

  cardSubTxtView2: {
    marginTop: wp("-0.4"),
    width: "100%",
    height: wp("3"),
   // marginRight: wp("-2"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: wp("3"),
    },
    "@media (max-width: 500px)": {
      height: wp("4"),
    },
  },
  cardSubTxtView4: {
    marginTop: wp("-0.4"),
    width: "100%",
    height: wp("3"),
    flexDirection: "row",
    height: wp("3"),
    marginRight: wp("-2"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: wp("3"),
    },
    "@media (max-width: 500px)": {
      height: wp("4"),
    },
  },
  cardSubTxtView5: {
    width: "100%",
    height: wp("3"),
    flexDirection: "row",
    //backgroundColor:"yellow"
    height: wp("3"),
    marginRight: wp("-2"),
    alignItems:'flex-end',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: wp("3"),
    },
    "@media (max-width: 500px)": {
      height: wp("4"),
    },
  },
  cardSubTxtView3: {
    marginTop: wp("1"),
    width: "102%",
    height: hp("1.8"),
    marginLeft: wp("0.5"),
  },
  cardSubMainTxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: colors.primaryColor,
    fontWeight: "bold",
    marginLeft: "2%",
    marginTop: "3%",
    marginBottom: "1%",
    height:hp('4')
  },
  cardSubTxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#9C9C9C",
    marginLeft: wp("1"),
  },
  cardSubTxt1: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: "black",
    marginLeft: "-0.8%",
  },
  cardSubTxt2: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: colors.primaryColor,
    marginLeft: "1%",
  },
  cardSubTxt2List: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: colors.primaryColor,
    marginLeft: "1%",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5"),
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.3"),
    },
  },
  cardSubTxt3: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: "red",
    marginLeft: "1%",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5"),
    },
    "@media (max-width: 450px)": {
      fontSize: wp("2.5"),
    },
  },
  packtxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#9C9C9C",
    marginLeft: wp("0.8"),
    marginTop: hp("-0.1"),
  },
  stocktxt: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#9C9C9C",
    marginLeft: wp("0.8"),
  },
  flatlist: {
    flexGrow: 0,
  },
  gridPallet: {
    height: "76%",
    marginLeft: wp("2"),
    marginRight: wp("2"),
    width: "95%",
    marginTop: "3%",
    justifyContent: "space-between",
  },
  priceTxt: {
    fontSize: hp("1.3"),
    color: "black",
    // fontFamily: Fonts.PoppinsSemiBold,
   // marginLeft: "2%",
    fontWeight: "bold",
  },
  cart: {
    width: wp("8"),
    height: wp("4"),
    // backgroundColor:'#1ED18C',
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: 8,
    marginLeft: wp("17"),
    marginTop: wp("-3.5"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cartIcon: {
    marginLeft: "12%",
  },
  cartText: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    paddingStart: wp("1"),
    fontSize: hp("1.5"),
    marginLeft: wp("0.5"),
  },
  backBtn: {
    //width: wp('10'),
    backgroundColor: "transparent",
    height: hp("3"),
    borderColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    //marginTop:hp('1'),
    justifyContent: 'space-evenly',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:35,
      width: 85,
      borderRadius: 5,
      borderWidth: wp("0.15%"),
    },
    "@media (max-width: 450px)": {
      height:25,
      width: 55,
      borderRadius: 4,
      borderWidth: wp("0.2%"),
    },
  },
  backText: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.8%"),
    marginRight:6,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5%"),
    },
    "@media (max-width: 450px)": {
      fontSize: wp("2.8%"),
    },
  },
  icnView: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backIcon: {
    resizeMode:'contain',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      aspectRatio: 0.8,
    },
    "@media (max-width: 450px)": {
      aspectRatio: 1,
    },
  },
  backView: {
    width: wp("40"),
    height: hp("3"),
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: hp("1"),
    alignSelf: "flex-start",
    marginLeft: wp("3"),
    marginBottom:hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:35,
    },
    "@media (max-width: 450px)": {
      height:25,
    },
  },

  packsizeItems: {
    flex: 0.6,
    justifyContent: "flex-end",
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      justifyContent: "center",
    },
  },

  footerCardViewList: {
    marginLeft: 5,
    width: "98%",
    height: hp("12"),
    //marginLeft: 10,
    borderRadius: 15,
    alignItems: "center",
    //shadowColor: 'red',
    // borderWidth:0.2,
    marginBottom: 3,
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    shadowColor: "#000",
    elevation: 2,
    backgroundColor: "white",
    // justifyContent: 'center',
  },

  cardImgView: {
    width: wp("20"),
    height: hp("12"),
    marginLeft: wp("0.1"),
    marginRight: wp("2"),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  cardSubImg: {
    width: wp("20"),
    height: hp("11.9"),
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    // width: 60,
    // height: 60,
  },

  cardMainTxtView: {
    width: "73%",
    //backgroundColor:"green"
  },

  cardSubTxtViewList: {
    // width: '100%',
    // height: 'auto',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    width: "95%",
    height: hp("3"),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardSubMainTxtList: {
    width: "100%",
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: colors.primaryColor,
    fontWeight: "bold",
    marginLeft: wp("1"),
    // backgroundColor:"orange"
    // fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsRegular,
    // // height:'auto',
    // color: '#1ED18C',
    // marginLeft: '2%',
  },

  packtxtList: {
    fontSize: hp("1.3"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#9C9C9C",
  },

  cardSubTxt3View: {
    fontSize: hp("1.3"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "black",
  },
  cardSubTxtView2List: {
    marginTop: wp("-1.6"),
    width: "100%",
    height: hp("3"),
    //backgroundColor:"blue"
  },
  cardSubTxtView: {
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#9C9C9C",
    marginLeft: "2%",
    fontSize: hp("1.5"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: 60,
    },
    "@media (max-width: 500px)": {},
  },

  stocktxtView: {
    fontSize: hp("1.3"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#9C9C9C",
  },

  cardSubTxt2View: {
    fontSize: hp("1.3"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryColor,
  },
  cardSubTxtView3View: {
    marginTop: wp("-1%"),
    width: "100%",
    height: hp("3.2"),
    //backgroundColor:"yellow"
  },

  priceTxtView: {
    fontSize: hp("1.6"),
    color: "black",
    // fontFamily: Fonts.PoppinsSemiBold,
    fontWeight: "bold",
    marginLeft: "2%",
  },
  // search view bar style start ----
  searchView: {
    zIndex: 1000,
    width: "94%",
    height: hp("3.7"),
   //  backgroundColor: 'red',
    flexDirection: "row",
    marginTop:'2%',
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
     marginTop:hp('2'),
     marginBottom:hp('1'),
     height: hp("6"),
    },
  },
  searchViewInside1: {
    width: "90%",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "90%",
    },
    "@media (max-width: 500px)": {
      width: "85%",
    },
  },
  searchInput: {
    width: "85%",
    height: hp("5"),
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: "5%",
  },
  searchbox: {
   borderColor:'#EEEEEE',
   borderWidth:hp('0.1'),
   backgroundColor:'#F6F6F6',
   borderRadius:hp('0.7'),
   height:hp('4.5'),
    elevation:0,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height:hp('4.5'),
    },
    "@media (max-width: 500px)": {
      height:hp('6'),
    },
  },
  warningtxtView:{
    backgroundColor:'#cce5ff',
    borderColor:'#b8daff',
    borderWidth:2,
    height:hp('3.8'),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:wp('0.8'),
    width:wp('80'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:wp('80'),
    },
    "@media (max-width: 500px)": {
      width:wp('75'),
    },
  },
  warningtitleTxt: {
    fontSize: hp("1.3"),
    // fontFamily: Fonts.PoppinsBold,
    color: "#004085",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp("1.3"),
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.6"),
    //textAlign: 'center',
    }
  },
});
