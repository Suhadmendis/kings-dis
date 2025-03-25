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
    //flex: 1,
    width: WIDTH,
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  // search view bar style start ----
  searchView: {

    zIndex: 1000,
    width: "94%",
    height: hp("3.7"),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2%"),
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
     marginTop:hp('2'),
     marginBottom:hp('1'),
     height: hp("6"),
    },
  },
  preseasonView: {
    width: '50%',
        height: hp("2.3"),
        // alignItems: "center",
        justifyContent: "center",
        // marginTop: hp("1"),
        backgroundColor: colors.primaryColor,
        // marginBottom: hp("1"),
        borderRadius: 5,
        alignSelf: "center",
      },
      preseasonTxt: {
        fontSize: hp("1.5"),
        // fontFamily: Fonts.PoppinsBold,
        color: "white",
        textAlign: 'center',
      },
  searchViewInside1:{
    width: '90%' ,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: '90%' ,
    },
    "@media (max-width: 500px)": {
      width: '85%' ,
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
    resizeMode:'contain'
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
    height: hp("3"),
    marginTop: hp("1"),
    justifyContent: "flex-start",
  },
  // search view bar style end ----
  item2: {
    marginBottom: 10,
    width: wp("22.5"),
    height: hp("19"),
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
    // marginTop: hp('-2'),
    alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("22.5"),
    },
    "@media (max-width: 500px)": {
      width: wp("45"),
    },
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cardSubMainTxt: {
    fontSize: hp("1.4"),
    // fontFamily: Fonts.PoppinsMedium,
    color: colors.primaryColor,
  },
  cardMainTxtView1: {
    width: "100%",
    height: hp("5"),
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  cardSubTxtView: {
    width: "100%",
    height: hp("4.2"),
    alignItems: "center",
    justifyContent: "center",
  },
  cardSubTxtView2: {
    width: "65%",
    height: "auto",
    borderRadius: 10,
    // marginTop: '2%',
  },
  cardSubTxt: {
    fontSize: hp("1.2"),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: "#979797",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    width: wp("13"),
    height: hp("4"),
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2%"),
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backText: {
    color: colors.primaryColor,
    // fontFamily: Fonts.PoppinsRegular,
    paddingStart: wp("1%"),
    fontSize: hp("1.8%"),
  },
  backIcon: {
    marginLeft: "12%",
  },
  backView: {
    width: wp("40"),
    height: hp("5"),
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: hp("1"),
    alignSelf: "flex-start",
    marginLeft: wp("3"),
  },
  flatlist1: {
    width: "97%",
    //marginLeft:wp('5')
  },
  // flatlist: {
  //   //flexGrow: 0,
  //   // marginLeft:wp(''),
  //   //marginRight:wp('2'),
  //   width: '100%',
  //   //marginTop: wp('20%')
  // },

  listView: {
    height: hp("69%"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("65%"),
    },
  },



  // product filter category
  filterListView:{
    width: "100%",
    height: hp("4.5"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "100%",
    },
    "@media (max-width: 500px)": {
      width: "100%",
    },
  },
  filterListBtnView:{
    //flex:1,
    width:wp('15'),
    justifyContent:'center',
    alignItems:'center'
  },
  filterListBtn:{
    width:'90%',
    height:hp('3'),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:wp('2.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      borderRadius:wp('2.5'),
    },
    "@media (max-width: 450px)": {
      borderRadius:wp('3'),
    },
  },
  filterListBtnText:{
   fontSize:hp('1.4'),
   color:colors.tertiaryColor
  },

  contentScrollView:{
    height: hp("66%"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("57%"),
    },
    "@media (max-width: 450px)": {
      height: hp("57%"),
    },
  }

});
