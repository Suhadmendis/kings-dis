import { Dimensions, Platform, PixelRatio } from 'react-native';

const React = require('react-native');
const { width: WIDTH, height: height } = Dimensions.get('window');
const { StyleSheet } = React;
import { Fonts } from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from './FontSize';
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
    marginTop:hp('1.2'),
    width: wp('2.6'),
    height: wp('2.6'),
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
    alignSelf:'flex-start',
    marginTop:hp('1'),
    marginLeft:wp('-2')
    //textAlign: 'center',
  },
  titleView: {
    width: '100%',
    height: hp('5'),
    alignSelf: 'flex-start',
    flexDirection:'row',
    marginLeft: wp('3.5'),
    marginTop:hp('2')
  },
  footerCardView: {
    width: '92%',
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

  },
  cardSubMainTxt: {
    fontSize: wp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: '#cacccc',
    marginLeft: '2%',
  },
  emailTxt: {
    fontSize: wp('1.9'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
  },
  cardTxt: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('1'),
  },
  subcardTxt: {
    fontSize: wp('2.5'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    fontWeight: 'bold',
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3, 
    resizeMode: 'contain',
    // borderRadius: 1,
    //resizeMethod: 'cover',
  },
  cardTxtView1: {
    width: '70%',
    height: hp('3'),
    marginLeft: wp('1'),
    marginRight: wp('1'),
    //backgroundColor: 'red',
    justifyContent: 'center',
  },
  cartItemTextView: {
    width: '56%',
    height: hp('6'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subView: {
    width: wp('35'),
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconView: {
    width: wp('10'),
    height: hp('6'),
    alignItems: 'flex-start',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginLeft: wp('4'),
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
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('6'),
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
  },
  eyeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('6'),
    marginRight:wp('0.7'),
    height: hp('5'),
    backgroundColor: '#DEF9F6',
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
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
  },
});
