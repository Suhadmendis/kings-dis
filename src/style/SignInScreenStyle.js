import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: '100%',

  },
  bodyView: {
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: hp('12'),
    //backgroundColor: 'yellow',
  },
  fontFirst: {
    color: '#1ED18C',
    fontSize: hp('1.7'),
    fontFamily: Fonts.PoppinsMedium,
  },
  welcomeTxt: {
    fontSize: hp('2.5'),
    fontFamily: Fonts.Poppins,
  },
  signInTxt: {
    fontSize: hp('1.9'),
    fontFamily: Fonts.PoppinsMedium,
    color: '#93999c',
  },
  emailTxt: {
    height:hp('4'),
    fontSize: hp('1.7'),
    fontFamily: Fonts.PoppinsMedium,
    color: 'black',
    marginTop: hp('1'),
    
  },
  fontSecond: {
    paddingTop: hp('2'),
    color: 'black',
    fontFamily: Fonts.PoppinsBold,
    //fontWeight: 'bold',
    fontSize: hp('2.2'),
  },
  bodyLogo: {
    width: '55%',
    height: '40%',
    resizeMode:'contain'
  },
  TxtInput: {
    width: '95%',
    height: hp('5'),
    fontSize: hp('1.8'),
    color:'#93999c',
    alignItems:"center",
    //backgroundColor: 'red',
    marginLeft: wp('1.5'),
  },
  headView: {
    width: wp('140'),
    height: hp('20'),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardView: {
    alignSelf:'center',
    width: wp('75'),
   // height: hp('40'),
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: '5%',
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textView: {
    width: '85%',
    height: hp('2'),
    //backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp('3'),
  },
  textView1: {
    width: '85%',
    height: hp('2'),
    //backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp('0'),
  },
  txtInputView: {
    width: '85%',
    height: hp('5'),
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor:'#E9E9E9',
    borderWidth:1,
    marginTop: hp('1%'),
  },
  forgetView: {
    width: '85%',
    height: hp('3'),
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:hp('2')
  },
  btnView: {
    width: '85%',
    height: hp('5'),
    backgroundColor: '#1ED18C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2'),
    borderRadius: 10,
  },
  btnView2: {
    width: '85%',
    height: hp('5'),
    backgroundColor: '#1ED18C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2'),
    borderRadius: 10,
    marginBottom:hp('3')
  },
  BtnTxt: {
    fontSize: hp('1.7'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'white',
  },
  cartView2:{
    alignSelf:'center',
    width: wp('75'),
    //height: hp('22'),
    backgroundColor: 'white',
   // borderRadius: 15,
    marginTop:hp('-1'),
    //paddingTop: hp('2'),
    //paddingBottom: hp('2'),
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  // BtnForgetView:{
  //   //backgroundColor:'pink',
  //   marginTop:hp('-10')

  // }
  logoutText: {
    marginLeft:wp('3'),
    fontSize: hp('1.7'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: '#842029',
  },
  textViewLog: {
    width: '85%',
    height: hp('5'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#f8d7da',
    marginTop: hp('1.5'),
    borderRadius:wp('1'),
    borderColor:'#f5c2c7',
    borderWidth:hp('0.15'),
  },

});
