import { Dimensions, Platform, PixelRatio } from 'react-native';

const React = require('react-native');
const { width: WIDTH, height: height } = Dimensions.get('window');
const { StyleSheet } = React;
import { Fonts } from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as colors from '../style/Common/ColorsStyle';

let widthper = wp("100%");
let txt_size = 0;
let btn_size = wp('6.5')
if (widthper <= 500.0) {
  txt_size = hp("1.6");
  btn_size=  wp('8');
} else {
  txt_size = hp("1.4");
  btn_size = wp('6.5')
}
module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '99%',
    backgroundColor: '#F9F9F9',
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
    marginTop:hp('1.2'),
    width: wp('2.6'),
    height: wp('2.6'),
  },
  titleTxt: {
    fontSize: hp('2'),
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
    
    alignSelf: 'flex-start',
    flexDirection:'row',
    marginLeft: wp('3.5'),
    marginTop:hp('0.2')
  },
  footerCardView: {
    width: '92%',
    height: hp('7'),
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
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: '#cacccc',
    marginLeft: '3%',
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
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
  },
  subcardTxtPrice: {
    fontSize: txt_size+2,
    fontFamily: Fonts.PoppinsBold,
    color:'black',
    fontWeight: 'bold',
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4, 
    resizeMode: 'contain',
    // borderRadius: 1,
    //resizeMethod: 'cover',
  },
  cardTxtView1: {
     flex:1.3,
    height: hp('6'),
    marginLeft: wp('1'),
    marginRight: wp('1'),
   
    justifyContent: 'center',
  },
  cartItemTextView: {
    width: '98%',
    height: hp('6'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subView: {
   flex:0.8,
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  iconView: {
    flex:0.7,
    width:wp('15'),
    height: hp('6'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: wp('1.5'),
  },
 
  priceView: {
    flex:0.7,
    height: hp('6'),
    alignItems: 'center',
    
    justifyContent: 'flex-end',
    marginLeft: wp('1.5'),
    
  },
  priceView1: {
    flex:0.9,
    height: hp('6'),
    alignItems: 'flex-end',
  //  flexDirection:'row',
    justifyContent: 'center',
    marginLeft: wp('1'),
    marginRight:wp('1')
    
  },
 
  ashBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: btn_size,
    height: hp('4'),
    backgroundColor: '#e9e9e9',
    borderRadius: wp('1.2'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffsetshadowColor: "#000",
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
    width:btn_size,
    height: hp('4'),
    marginRight:wp('1.5'),
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
