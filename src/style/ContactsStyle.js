import { Dimensions, Platform, PixelRatio } from 'react-native';

const React = require('react-native');
const { width: WIDTH, height: height } = Dimensions.get('window');
import StyleSheet from "react-native-media-query";
import { Fonts } from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from '../style/FontSize';
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

module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'white'
  },
  flatlist: {
    flex:1,
    marginBottom: '2%',
    width: '100%',
  },
  cardSubTxtno: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: colors.fourthiaryColor,
    marginLeft: '2%',
  },
  footerCardViewno: {
    width: '100%',
    height: hp('11'),
    borderRadius: wp('2'),
    alignItems: 'center',
    marginLeft: '4%',
    marginTop: hp('1'),
    justifyContent:'center',
    flexDirection: 'row',
  },
  searchCloseIcon: {
    width: wp('2.5'),
    height: hp('2.5'),
    marginRight:wp('3'),
    resizeMode:'contain',
  },

  searchView: {
    width: '94%',
    height: hp('5'),
 //   backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1'),
    marginBottom: hp('1.5'),
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
  TxtInputSearch: {
    width: '90%',
    height: hp('7'),
    fontSize: hp('1.6'),
    color:colors.color_gray,
    marginLeft:wp('2')
    // fontWeight: 'bold',
    // backgroundColor: 'red',
  },
  searchIcon: {
    width: wp('3.5'),
    height: hp('2.5'),
    marginLeft: '2%',
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
    marginTop:hp('1.2'),
    width: wp('2.6'),
    height: wp('2.6'),
  },
  titleTxt: {
    fontSize: hp('2.2'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    alignSelf:'flex-start'
    //textAlign: 'center',
  },
  newContactTxt: {
    fontSize: wp('2.3'),
    // fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    alignSelf:'flex-start',
    marginTop:hp('1'),
    marginLeft:wp('-2')
    //textAlign: 'center',
  },
  titleView: {
    width: '100%',
    height: hp('3'),
    alignSelf: 'flex-start',
    flexDirection:'row',
    marginLeft: wp('3.5'),
    marginTop:hp('1')
  },
  footerCardView: {
    width: '94%',
    height: hp('9'),
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
      height: hp('9'),
    },
    "@media (max-width: 500px)": {
      height: hp('11'),
    },

  },
  cardSubMainTxt: {
    fontSize: hp('1.4'),
    // fontFamily: Fonts.PoppinsBold,
    color: colors.fourthiaryColor,
    marginLeft: '2%',
    width:wp('35'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginLeft: '2%',
      width:wp('35'),
    },
    "@media (max-width: 500px)": {
      fontSize: hp('1.5'),
      marginLeft:  wp('2'),
      width:wp('88'),
    },
  },
  emailTxt: {
    fontSize: hp('1.3'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp('1.3'),
    },
    "@media (max-width: 500px)": {
      fontSize: hp('1.5'),
    },
  },
  cardTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('1'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp('1.5'),
      marginLeft: wp('1'),
    },
    "@media (max-width: 500px)": {
      fontSize: hp('1.6'),
      marginLeft: wp('2'),
    },
  },
  subcardTxt: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    fontWeight: 'bold',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp('1.5'),
    },
    "@media (max-width: 500px)": {
      fontSize: hp('1.6'),

    },
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4,
    resizeMode: 'contain',
    // borderRadius: 1,
    //resizeMethod: 'cover',
  },
  cardTxtView1: {
    width: '70%',
    height: hp('6'),
    marginLeft: wp('1'),
    marginRight: wp('1'),
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: '70%',
    },
    "@media (max-width: 500px)": {
      width: '100%',
    },
  },

  subcontainView:{
    width:wp('55'),
    flexDirection:'row',
    height:hp('6'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width:wp('55'),
    },
    "@media (max-width: 500px)": {
      width:wp('94'),
      height:hp('4'),
    },
  },

  cartItemTextView: {
    width: '56%',
    height: hp('6'),
    flexDirection: 'row',
    alignItems: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    "@media (max-width: 500px)": {
      flexDirection: 'column',
      width: '100%',
      height: hp('12'),
    },
  },
  subView: {
    width: wp('35'),
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('35'),
    },
    "@media (max-width: 500px)": {
      width: wp('70'),
      height: hp('4'),
      alignItems: 'flex-start',
      marginLeft:wp('2')
    },
  },
  iconView: {
    width: wp("15"),
    height: hp("6"),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: wp("4"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginLeft: wp("4"),
      height: hp("6"),
    },
    "@media (max-width: 500px)": {
      marginLeft: wp("1"),
      height: hp("4"),
    },
  },
  delBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('6'),
    marginRight:wp('0.7'),
    height: hp('5'),
    backgroundColor: '#f8d1d9',
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
  },
  ashBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("6"),
    marginRight: wp("0.7"),
    height: hp("4"),
    backgroundColor: "#e9e9e9",
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
    },
    "@media (max-width: 500px)": {
      width: wp("8"),
    },
  },
  eyeBtnLeft: {
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
      marginRight:wp('1')
    },
    "@media (max-width: 500px)": {
      width: wp("8"),
      marginRight:wp('2')
    },
  },
  addCustomerBtn:{
    width: wp('27'),
    height: hp('4.5'),
    backgroundColor: 'white',
    borderColor:'#1ED18C',
    borderWidth:wp('0.2'),
    borderRadius: wp('1.5'),
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: '10%'
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
    // fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
  },
});
