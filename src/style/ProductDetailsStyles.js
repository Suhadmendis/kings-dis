import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
//const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    // width: WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  // search view bar style start ----
  searchView: {
    zIndex: 1000,
    width: '94%',
    height: hp('3.7'),
    // marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:"center",
    marginTop: hp("1"),
    marginBottom:hp('1'),
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
  searchInput: {
    width: '85%',
    height: hp('5'),
    // backgroundColor: '#F6F6F6',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: '5%',
  },
  TxtInput: {
    width: '85%',
    height: hp('7'),
    fontSize: hp(2),
    fontWeight: 'bold',
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
    fontSize: hp('2.2'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    //textAlign: 'center',
  },
  titleView: {
    width: '90%',
    height: hp('5'),
    marginTop: hp('1'),
    justifyContent: 'flex-start',
  },
  // search view bar style end ----
  row: {
    flex: 1,
    height:'100%',
    marginBottom: 30,
    marginTop: 10,

    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexDirection: 'row',
     width:wp('94'),
     marginLeft:wp('2.1')
    },
    //padding:10,
  },

  box: {
    flex: 1,
  //  width:wp('100'),
  },
  box1: {
     "@media (max-width: 1600px) and (min-width: 450px)": {
      flexBasis: "48%",
    },
    "@media (max-width: 450px)": {
      flexBasis: "100%",
    },
  },
  box2: {
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexBasis: "49%",
    },
    "@media (max-width: 450px)": {
      flexBasis: "100%",
      maxHeight:hp('55'),
    },
  },

  relproductsButton:{
    width: wp("31"),
    marginRight: wp("2"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("31"),
    },
    "@media (max-width: 450px)": {
      width: wp("40"),
    },
  },
  CardDetail: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-start',
    // backgroundColor: "#009387",
  },
  CardDetail1: {
    // alignSelf: 'center', 1ED18C
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED18C',
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp('25'),
    height:hp('3.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('25'),
    },
    "@media (max-width: 450px)": {
      width: wp('40'),
      height:hp('3.5'),
    },
  },
  CardDetail2: {
    // fontFamily: Fonts.PoppinsMedium,
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp('25'),
    height:hp('3.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('25'),
    },
    "@media (max-width: 450px)": {
      width: wp('40'),
      height:hp('3.5'),
    },
  },
  detailContent: {
    margin: 8,
    alignItems: 'center',
    height:hp('3'),
    justifyContent:'center'
  },
  title: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsMedium,
    color: 'white',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp('1.5'),
    },
    "@media (max-width: 450px)": {
      fontSize: wp('3'),
    },
  },
  title1: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsMedium,
    color: '#979797',
    "@media (max-width: 1600px) and (min-width: 450px)": {
     fontSize: hp('1.5'),
    },
    "@media (max-width: 450px)": {
      fontSize: wp('3'),
    },
  },
  bodyView: {
    flexDirection: 'row',
    width: '94%',
    marginTop: '-1%',
    alignSelf:'center',
    justifyContent: 'space-between',
    //marginLeft: '10%',
    //paddingRight: 10,
    //marginLeft: '5%',
    //paddingLeft: 10,
    //paddingHorizontal: 10,
    height: hp('4'),
  },
  flatlist: {
    //flexGrow: 0,
    //marginLeft:wp('-2'),
    //marginRight:wp('2'),
    width: '100%',
    //marginTop: wp('20%')
  },
  item2: {
    marginBottom: 10,
    width: "100%",
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
      width: "100%",
      height: 400,
    },
    "@media (max-width: 500px)": {
      width: "100%",
      height: hp("30"),
    },
  },
  gridView: {
    width: wp("97%"),
    flex: 1,
    height: hp("30%"),
  },
  cardMainTxtView1: {
    width: '96%',
    height: hp('15'),
    justifyContent: 'center',
    //marginLeft:wp('2'),
    // marginTop:hp('-1%'),
  },
  cardSubTxtView2: {
    marginTop: wp('-1'),
    width: '100%',
    height: wp('4'),
    // backgroundColor:'blue'
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,

    // hadowColor: "#000",
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 1,


    //padding: 3,
    //borderRadius: 10,
    // left: '8%',
  },
  cardSubTxtView: {
    width: '95%',
    height: hp('5'),
    alignItems: 'flex-start',
    justifyContent: 'center'
    // width: '100%',
    // //height: 'auto',
    // // paddingTop: 5,
    // // paddingBottom: 5,
    // //backgroundColor: 'yellow',
    // //borderRadius: 10,
    // //marginTop: '-%',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  cardSubMainTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: '#1ED18C',
    fontWeight: 'bold',
    marginLeft: wp('1'),

  },
  cardSubTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft: '2%',
  },
  cardSubTxtView4: {
    marginTop: wp('-0.4'),
    width: '100%',
    height: wp('3.5'),
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  packtxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft: wp('0.8'),
    marginTop: wp('-0.2'),
  },
  cardSubTxtView3: {
    marginTop: wp('1'),
    width: '100%',
    height: wp('3'),
    "@media (max-width: 1600px) and (min-width: 450px)": {

    },
    "@media (max-width: 450px)": {
      height: wp('3.5'),
    },
    //backgroundColor: 'red',
  },
  cardSubTxtView5: {
    marginTop: wp('-0.4%'),
    width: '100%',
    height: wp('4'),
    flexDirection: 'row',
    // backgroundColor:"blue"
  },
  stocktxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft: wp('0.8'),
  },
  priceTxt: {
    fontSize: hp('1.5'),
    color: 'black',
    // fontFamily: Fonts.PoppinsSemiBold,
    marginLeft: wp('1'),
    fontWeight: 'bold',
  },
  cart: {
    width: wp('9'),
    height: wp('5'),
    // backgroundColor:'#1ED18C',
    borderColor: '#1ED18C',
    borderWidth: wp('0.2'),
    borderRadius: 8,
    marginLeft: wp('19'),
    marginTop: wp('-4'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cartIcon: {
    marginLeft: '12%',
  },
  cartText: {
    color: '#1ED18C',
    // fontFamily: Fonts.PoppinsRegular,
    paddingStart: wp('1'),
    fontSize: hp('1.5'),
    marginLeft: wp('1'),
  },
  cardSubTxt1: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'black',
    marginLeft: '-0.8%',
  },
  cardSubTxt2: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: '#1ED18C',
    marginLeft: '1%',
  },
  cardSubTxt3: {
    fontSize: hp("1.5"),
    // fontFamily: Fonts.PoppinsRegular,
    color: "red",
    marginLeft: "1%",
  },
  mainImage: {
    marginBottom: 2,
    width: wp('47'),
    height: hp('37'),
    // backgroundColor: 'red',
    // alignItems: 'center',
    // alignItems: 'center',
    marginHorizontal: wp('1'),
    margin: 5,
    // marginTop: hp('-2'),
    alignSelf: 'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('37'),
    
      width: wp('46.4'),
      alignItems: 'center',
    },
    "@media (max-width: 450px)": {
      width: wp('95'),
      height: hp('60'),
      alignItems: 'center',
    },
  },

  listView: {
    marginBottom: 5,
    width: wp('50%'),
    borderRadius: 10,
    backgroundColor: '#FCFBFB',
    alignItems: 'center',
    // alignItems: 'center',
    //paddingLeft: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
     marginLeft: "2%",
    alignSelf: 'center',
    borderWidth: hp('0.1'),
    borderColor: '#ECE7E7',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width:'98%',
    },
    "@media (max-width: 450px)": {
      width: wp('94%'),
      maxHeight:hp('55'),
      height:'auto',
    },
  },
  imageView: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
        "@media (max-width: 1600px) and (min-width: 450px)": {
          width: '95%',
          height: '100%',
        },
        "@media (max-width: 450px)": {
          width: '95%',
          height: '100%',
        },
  },
  detailBox: {
    width: '94%',
    height: hp('15'),
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('15'),
    },
    "@media (max-width: 450px)": {
      height: hp('12'),
    },
  },
  // ---- main image inside details styles-----
  insideBox: {
    width: '100%',
    height: hp('15'),
    justifyContent: 'center',
  },
  titleView: {
    width: '100%',
    height:'auto',
    //height: hp('3.8'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: hp('1.6'),
    marginLeft:wp('1'),
    // fontFamily: Fonts.PoppinsRegular,
    color: '#090909',
    fontWeight: 'bold',
  },
  subView: {
    marginTop: wp('-1'),
    width: '100%',
    height: wp('4'),
    // backgroundColor:'blue' ,
    flexDirection: 'row',
  },
  subTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: '#1ED18C',
    marginLeft: '1%',
  },
  packtxt2: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginLeft: wp('0.8'),
    marginTop: wp('-0.2'),
  },
  sizeTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: '#1ED18C',
    marginLeft: '2%',
  },
  productNum: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginLeft: wp('0.8'),
    marginTop: wp('-0.2'),
  },
  sizeView: {
    marginTop: wp('-0.4'),
    width: '100%',
    height: wp('3.5'),
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  stockDateView: {
    marginTop: wp('-0.4'),
    width: '100%',
    height: wp('4'),
    flexDirection: 'row',
    // backgroundColor:"blue"
  },
  stockView: {
    marginTop: wp('-0.4'),
    width: '100%',
    height: wp('4'),
    flexDirection: 'row',
    // backgroundColor:"blue"
  },
  stocktxt2: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft: wp('0.8'),
  },
  storeTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: '#138B13',
    marginLeft: '1%',
  },
  showBox: {
    marginBottom: 10,
    width: wp('43'),
    height: hp('15'),
    alignItems: 'flex-end',
    alignSelf: 'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('43'),
    },
    "@media (max-width: 450px)": {
      width: wp('94'),
    },
  },
  showBox2: {
    marginBottom: 10,
    width: wp('43'),
    height: hp('6'),
    borderRadius: 10,
    alignItems: 'flex-start',
    // alignItems: 'center',
    marginHorizontal: wp('1'),
    marginTop: hp('-1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('43'),
    },
    "@media (max-width: 450px)": {
      width: wp('94'),
    },
  },
  showBox3: {
    marginBottom: 10,
    width: wp('43'),
    height: hp('9'),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    // alignItems: 'center',
    marginHorizontal: wp('1'),
    padding: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
    margin: 5,
    marginTop: hp('-1'),
    alignSelf: 'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('45'),
    },
    "@media (max-width: 450px)": {
      width: wp('94'),
    },
  },
  calImg: {
    // height: hp('17%'),
    marginTop: '2%',
    // marginBottom:'5%'
  },
  showBoxView1: {
    width: '100%',
    height: hp('3'),
    alignItems: 'flex-start',
    justifyContent: 'center',
    //backgroundColor:"blue"
  },
  showBoxView2: {
    width: '100%',
    height: hp('2.6'),
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor:"yellow" ,
    flexDirection: 'row',
  },
  topicTxt: {
    fontSize: hp('1.7'),
    // fontFamily: Fonts.PoppinsMedium,
    color: '#1ED18C',
    marginLeft: '2%',
  },
  text1: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginTop: hp('-4'),
    marginLeft: '2%',
  },
  recImg: {
    marginLeft: '2%',
    marginBottom: '2%',
  },
  // ---- list view ---------
  mainListView: {
    width: '100%',
    height: hp('53.8'),
    borderRadius: 10,
    "@media (max-width: 450px)": {
      maxHeight: hp('55.8'),
      height:'auto',
      marginBottom:hp('1')
    },
  },
  topicBox: {
    marginTop: hp('1'),
    marginLeft: wp('1'),
  },
  rowView1: {
    marginTop: hp('0.6'),
    width: '100%',
    height: hp('4.8'),
    flexDirection: 'row',
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('3.5'),
    },
    "@media (max-width: 450px)": {
      maxHeight: hp('4'),
      height:'auto',
    },
  },
  rowTxt1: {
    fontSize: hp('1.4'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginLeft: wp('1.5'),
    justifyContent: 'center',
    width:'22%',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width:'20%',
    },
    "@media (max-width: 450px)": {
      width:'22%',
      height:'auto',
    },
  },
  rowTxt2: {
    fontSize: hp('1.4'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginLeft: wp('1'),
    width:'21%',
    "@media (max-width: 450px)": {
      marginLeft: wp('12'),

    },
  },
  rowTxt3: {
    fontSize: hp('1.4'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    width:'8%',
    "@media (max-width: 450px)": {
      height:'auto'
    },
  },
  rowTxt4: {
    fontSize: hp('1.4'),
    // fontFamily: Fonts.PoppinsRegular,
    color: '#1ED18C',
    marginLeft: wp('1.5'),
    width:'26%',
    textAlign:'right',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginLeft: wp('0.5'),
      fontSize: hp('1.4'),
      width:'26%',
    },
    "@media (max-width: 450px)": {
      marginLeft: wp('1.5'),
      fontSize: hp('1.4'),
      width:'20%',
      height:'auto'
    },
  },
  qtyInput: {
    width: wp('8'),
    padding:1,
    height: hp('3.7'),
    fontSize: hp(1.5),
    marginLeft: wp('1'),
    borderRadius: hp('1'),
    borderWidth: hp('0.2'),
    borderColor: '#ECE7E7',
    backgroundColor: 'white',
    textAlign: 'center',
    color:'black',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('7'),
      height: hp('3'),
    },
    "@media (max-width: 450px)": {
      width: wp('10'),
      maxHeight: hp('3.7'),
      height:'auto'
    },
  },
  rowView2: {
    width: '100%',
    height: wp('7'),
    marginTop:hp('2'),
   // backgroundColor: 'white',
   backgroundColor:'#FCFBFB' ,
    flexDirection: 'row',
  },
  AddBtn: {
    marginTop:hp('6'),
    height: hp('4'),
    backgroundColor: '#1ED18C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3%',
    marginRight: '2%',
    flex:1,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop:hp('0'),
    },
    "@media (max-width: 450px)": {
      marginTop:hp('0'),
    },
  },
  AddBtnDisabled: {
    marginTop:hp('6'),
    height: hp('4'),
    backgroundColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3%',
    marginRight: '2%',
    flex:1,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop:hp('0'),
    },
    "@media (max-width: 450px)": {
      marginTop:hp('0'),
    },
  },
  total: {
    flex:0.9,
    height: hp('3'),
    flexDirection: 'column',
    alignItems:'center',
    marginTop:hp('6'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop:hp('0'),
      height: hp('4'),
    },
    "@media (max-width: 450px)": {
      height: hp('4'),
      flex:0.5,
      marginTop:hp('0'),
    },
  },
  addBtn1: {
    fontSize: hp('1.4'),
    // fontFamily: Fonts.PoppinsMedium,
    color: 'white',
    alignItems: 'center',

  },

  totalColum1: {
    width: '100%',
    height: hp('2.2'),
    //backgroundColor:'pink'
  },
  totalColum2: {
    width: '100%',
    height: wp('3'),
    marginTop:hp('0.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('3'),
    },
    "@media (max-width: 450px)": {
      height: hp('2.5'),
      marginTop:hp('0'),
    },
  },
  addTxt1: {
    fontSize: hp('1.8'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: 'black',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign:'center'
  },
  addTotal: {
    fontSize: hp('1.6'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: '#1ED18C',
    // alignItems: 'baseline',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign:'center'
  },
  //----- 100g-----
  rowTxt22: {
    fontSize: hp('1.7'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginLeft: wp('3.1'),
  },
  rowTxt23: {
    fontSize: hp('1.7'),
    // fontFamily: Fonts.PoppinsRegular,
    color: 'gray',
    marginLeft: wp('4.5'),
  },
  //----- calander box -----
  calBox1: {
    width: wp('43'),
    height: hp('2.5'),
    marginTop: hp('1.6'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('43'),
    },
    "@media (max-width: 450px)": {
      width: wp('90'),
    },
  },
  calBox2: {
    width: wp('43'),
    height: hp('1'),
    marginTop: hp('-1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('43'),
    },
    "@media (max-width: 450px)": {
      width: wp('90'),
    },
  },
  calBox3: {
    width: wp('43'),
    height: hp('1'),
    marginTop: hp('0.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('43'),
    },
    "@media (max-width: 450px)": {
      width: wp('90'),
    },
  },
  calBox4: {
    width: wp('43'),
    height: hp('1'),
    marginTop: hp('0.5'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('43'),
    },
    "@media (max-width: 450px)": {
      width: wp('90'),
    },
  },
  calBox5: {
    width: wp('43'),
    height: hp('1'),
    marginTop: hp('1.5'),
  },
  rowCal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxCal: {
    flex: 1,
    height: hp('2.5'),
    marginTop:hp('-1.7'),

  },
  boxCal1: {
    flex: 1,
    backgroundColor: '#EFFFF9',
    height: hp('2.5'),
    marginTop:hp('-1.7'),
  },
  month1: {
    fontSize: hp('1.13'),
    // fontFamily: Fonts.PoppinsMedium,
    color: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  month2: {
    fontSize: hp('1.13'),
    // fontFamily: Fonts.PoppinsMedium,
    color: '#1ED18C',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  //------ sow row
  rowSow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  sowBox: {
    flex: 1,
    height: hp('1'),
  },
  sow: {
    backgroundColor: '#FBD7F9',
    height: hp('1'),
    borderColor: '#F6AFF2',
    borderWidth: hp('0.2'),
  },
  // ------ plant row -------
  rowPlant: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plantBox: {
    flex: 1,
    height: hp('1'),
  },
  plant: {
    backgroundColor: '#D5FDFE',
    height: hp('1'),
    borderColor: '#A3FDFE',
    borderWidth: hp('0.2'),
  },
  //------ harves row-----
  rowHarves:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  harvesBox: {
    flex: 1,
    height: hp('1'),
  },
  harves: {
    backgroundColor: '#FCF2DA',
    height: hp('1'),
    borderColor: '#FCDA8B',
    borderWidth: hp('0.2%'),
  },
  notes: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: hp('0.1%'),
    marginBottom: 10,
    width: wp('45'),
    borderRadius: 6,
    alignItems: 'center',
    // alignItems: 'center',
    padding: 5,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.4,
    // shadowRadius: 1,
    // elevation: 2,
    marginTop: hp('-1'),
    alignSelf: 'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('45'),
      marginBottom:hp('0.5'),
    },
    "@media (max-width: 450px)": {
      width: wp('94'),
    },
  },
  notesTxt: {
    fontSize: hp('1.5'),
    color:'#155724',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp('1.2'),
    },
    "@media (max-width: 450px)": {
      fontSize: hp('1.5'),
    },
  },
  backBtn:{
    width: wp('13'),
    height: hp('4'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2'),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backText:{
    color:'#1ED18C',
    // fontFamily: Fonts.PoppinsRegular,
    paddingStart:wp('1'),
    fontSize:hp('1.8'),
  },
  backIcon:{
    marginLeft: '12%',
  },
  backView:{
    width: wp('40'),
    height: hp('5'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp('1'),
    alignSelf:'flex-start',
    marginLeft:wp('3')
  },
  relatedView:{
    height: 'auto',
    width:'96%',
    marginTop:hp('1'),
    alignSelf:'center',
    justifyContent:'space-between'
  },
  relatedView2:{
    height: 'auto',
    width:'100%',
    marginTop:hp('1'),
    alignSelf:'flex-start',
  },
  emptyListStyle:{
    padding: 10,
    textAlign: 'center',
    marginTop:hp('2'),
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsMedium,
    color: '#979797',
    width:wp('94'),
    height:hp('5'),
  },
  addtoBasketView:{
    marginTop: hp('0.6'),
    width: '100%',
    height:hp('8'),
    flexDirection: 'row',
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:hp('8'),
      position:'absolute',
       bottom:0
    },
    "@media (max-width: 450px)": {
      maxHeight: hp('4'),
      height:'auto',
    },
  }
});

