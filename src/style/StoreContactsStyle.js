import { Dimensions, Platform, PixelRatio } from 'react-native';

const React = require('react-native');
const { width: WIDTH, height: height } = Dimensions.get('window');
//const { StyleSheet } = React;
import { Fonts } from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from './FontSize';
import StyleSheet from "react-native-media-query";
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
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchView: {
    width: '92%',
    height: hp('6'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  searchInput: {
    width: '100%',
    height: hp('5'),
    backgroundColor: '#F6F6F6',
    borderRadius: wp("1.5"),
    flexDirection: 'row',
    borderColor:"#EEEEEE",
    borderWidth: hp('0.1'),
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  searchIcon: {
    width: wp('3.5'),
    height: hp('2.5'),
    marginLeft: '3%',
    resizeMode: 'contain',
  },
  TxtInput: {
    width: '80%',
    height: hp('7'),
    fontSize: hp(1.7),
    // fontWeight: 'bold',
    // backgroundColor: 'red',
  },

  
  addIcon: {
    alignSelf:'center',
    marginLeft:wp('2'),
    width:wp('3'),
    height: hp('2.9'),
    resizeMode:"contain",
    "@media (max-width: 1600px) and (min-width: 500px)": {
    },
    "@media (max-width: 500px)": {
    },
  },


  titleTxt: {
    fontSize: hp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    alignSelf:'flex-start'
    //textAlign: 'center',
  },
  newContactTxt: {
    fontSize: wp('2.3'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    alignSelf:'center',
    marginRight:wp('2'),
    marginLeft:wp('2'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
    },
    "@media (max-width: 500px)": {
      marginLeft:wp('1'),
      fontSize: wp('2.6'),
    },
    //textAlign: 'center',
  },
  titleView: {
    width: '93%',
    height: hp('5'),
    alignSelf: 'flex-start',
    justifyContent:'flex-end',
    flexDirection:'row',
    marginLeft: wp('3.5'),
    marginTop:hp('1'),
    marginBottom:hp('1')
  },
  footerCardView: {
    width: '92%',
    height: hp('8'),
    backgroundColor: 'white',
    borderRadius: wp('2'),
    alignItems: 'center',
    shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    marginBottom: hp('1'),
    alignSelf: 'center',
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: 'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp('8'),
    },
    "@media (max-width: 500px)": {
      height: hp('11'),
    },

  },
  cardSubMainTxt: {
    fontSize: hp('1.4'),
    fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft:  wp('2'),
  },
  emailTxt: {
    fontSize: hp('1.4'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
  },
  cardTxt: {
    fontSize: hp('1.6'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('2'),
    "@media (max-width: 450px)": {
      maxWidth:wp('60')
    },
  },
  
  subcardTxt: {
    fontSize: hp('1.6'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    fontWeight: 'bold',
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4, 
    resizeMode: 'contain',
    //resizeMethod: 'cover',
  },
  cardTxtView1: {
    width: '56%',
    height: hp('3'),
    marginLeft: wp('1'),
    marginRight: wp('1'),
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp('6'),
    },
    "@media (max-width: 500px)": {
      flexDirection: 'column',
      height: hp('5'),
      width: '98%',
    },
  },
  fcardtxt:{
    //color:'#004085',
    fontSize:hp('1.5'),
    //fontStyle:'italic',
    fontWeight: '800',
    color: '#FFF',
  },
  fcardTxtView2:{
   //width:wp('5'),
   //height:wp('5'),
   justifyContent:'center',
   alignItems:'center',
   "@media (max-width: 450px)": {
    width:wp('5.5'),
    height:wp('5.5'),
  },
  },
  tooltipBtn:{
    width:wp('3'),
    height:wp('3'),
    justifyContent:'center',
    borderColor:'#333',
    borderWidth:wp('0.2'),
    alignItems:'center',
    borderRadius:wp('5')/2,
    backgroundColor:"#444",
    "@media (max-width: 450px)": {
      width:wp('5'),
      height:wp('5'),
    },
  },
  fcardTxtView1:{
    width:'90%',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexDirection: 'column',
      width:'85%',
    },
    "@media (max-width: 450px)": {
      flexDirection: 'row',
      width:'90%',
    },
  },
  fcardTxtView1main:{
    flexDirection:'row'
   },
  cartItemTextView: {
    width: '56%',
    height: hp('6'),
    flexDirection: 'row',
    alignItems: 'center',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      flexDirection: 'row',
      height: hp('6'),
    },
    "@media (max-width: 450px)": {
      flexDirection: 'column',
      height: hp('11'),
      width: '100%',
    },
    
  },
  subView: {
    width: wp('25'),
    height: hp('5'),
    alignItems: 'center',
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('25'),
    },
    "@media (max-width: 500px)": {
      width: wp('44'),
      alignItems: 'flex-start',
    },
  },
  iconViewLocal: {
    width: wp('35'),
    height: hp('5'),
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('35'),
    },
    "@media (max-width: 500px)": {
      width: wp('44'),
    },
  //  marginLeft: wp('-5'),
  },
  iconViewApi: {
    width: wp('35'),
    height: hp('5'),
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
  //  marginLeft: wp('4'),
  "@media (max-width: 1600px) and (min-width: 500px)": {
    width: wp('35'),
  },
  "@media (max-width: 500px)": {
    width: wp('44'),
  },
  },
  delBtn: {
    backgroundColor: '#f8d1d9',
    alignItems: "center",
    justifyContent: "center",
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("4"),
    borderRadius: wp("1.2"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("7"),
    },
    "@media (max-width: 500px)": {
      width: wp("8"),
    },
    
  },
  ashBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('7.5'),
    marginRight:wp('0.7'),
    height: hp('5'),
    backgroundColor: '#e9e9e9',
    borderRadius: wp('1.2'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('7.5'),
      height: hp('4.5'),
      marginRight:wp('1.5'),
    },
    "@media (max-width: 500px)": {
      width: wp('8'),
      height: hp('4'),
      marginRight:wp('1.5'),
    },
  },
  eyeBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("4"),
    backgroundColor: "#DEF9F6",
    borderRadius: wp("1.2"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp("7"),
      marginRight: wp("1"),
    },
    "@media (max-width: 500px)": {
      width: wp("8"),
      marginRight: wp("1.5"),
    },
  },
  addCustomerBtn: {
      width: wp("27"),
      height: hp("4.5"),
      backgroundColor: "#F9F9F9",
      borderColor: colors.primaryColor,
      borderWidth: wp("0.2"),
      borderRadius: wp("1.5"),
      flexDirection: "row",
      alignItems: "flex-start",
      marginLeft: "1%",
      "@media (max-width: 1600px) and (min-width: 500px)": {
        height: hp("4.5"),
      },
      "@media (max-width: 500px)": {
        width: wp("30"),
        height: hp("4"),
      },
    },
  contactTitle: {
    width: '55%',
    height: hp('6'),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // contact form

  noteItemTextView: {
    width: '52%',
    height: hp('6'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },

  notecardTxtView1: {
    width: wp('60%'),
    height: hp('3'),
    marginLeft: wp('1'),
    justifyContent: 'center',
  },
  notesubcardTxt: {
    fontSize: hp('1.8'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
  },

  subAllView:{
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
    
    },
    "@media (max-width: 500px)": {
      width:'95%'
    },
  }
});
