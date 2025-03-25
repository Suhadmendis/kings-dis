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
console.log('wppp'+ wp('100%'));

let widthper = wp('100%');
let crd_wdth=0;
let title_txt=0;
if(widthper<=500.0){
  crd_wdth = wp('94')
  title_txt=hp('2');
}else{
  crd_wdth = wp('65')
  title_txt=hp('2.2');
}


module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bodyView: {
    width: wp('100'),
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: hp('12'),
    //backgroundColor: 'yellow',
  },
  fontFirst: {
    alignSelf:'flex-start',
    color: 'rgba(44, 130, 201, 1)',
    fontSize: hp('2.5'),
    fontFamily: Fonts.PoppinsBold,
    marginLeft: wp('8'),
  },
  welcomeTxt: {
    alignSelf:'flex-start',
    fontSize: hp('2.5'),
    fontFamily: Fonts.PoppinsBold,
    marginLeft: wp('8'),
  },
  signInTxt: {
    fontSize: hp('1.6'),
    fontFamily: Fonts.PoppinsMedium,
    color: 'gray',
  },
  emailTxt: {
    height:hp('3'),
    fontSize: hp('1.6'),
    fontFamily: Fonts.PoppinsSemiBold,
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
    width: 90,
    height: 90,
  },
  TxtInput: {
    width: '80%',
    height: hp('7'),
    fontSize: hp(1.6),
    //backgroundColor: 'red',
    marginLeft: wp('3'),
    color:"#555656",
  },
  TxtInputDisable: {
    width: '80%',
    height: hp('7'),
    fontSize: hp(1.8),
    //backgroundColor: 'red',
    marginLeft: wp('3'),
    color:"#d1d1d1",
  },
  headView: {
    width: wp('100'),
    height: hp('30'),
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  staticTxt: {
    fontSize: hp('2.1'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    //marginRight: 50,
  },
  cardView: {
    width: crd_wdth,
   //  height: hp('70%'),
    backgroundColor: 'white',
    
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    // marginTop: '5%',
    marginBottom:'5%',
    paddingTop: hp('0.7'),
    paddingBottom: hp('2'),
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textView: {
    width: '85%',
    height: hp('2'),
    //backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp('1'),
  },
  txtInputView: {
    width: '85%',
    height: hp('5'),
    // backgroundColor: '#EFF8FB',
    borderColor: '#e6e6e6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp('1.1%'),
    borderWidth: hp('0.11'),
  },
  txtInputViewDisable: {
    width: '85%',
    height: hp('5'),
    backgroundColor: '#F9F9F9',
    borderColor: '#e6e6e6',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp('2%'),
    borderWidth: hp('0.11'),
  },
  forgetView: {
    width: '85%',
    height: hp('3'),
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  btnView: {
    width: '85%',
    height: hp('4.5'),
    backgroundColor: '#1ED18C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
    borderRadius: wp('1.3'),
  },
  BtnTxt: {
    fontSize: hp('1.8'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'white',
  },

  cancelBtn: {
    width: '85%',
    height: hp('4.5'),
    backgroundColor: '#F9F9F9',
    borderWidth: hp("0.14"),
    borderColor: '#1ED18C',
    borderRadius: wp('1.3'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'3%',
    marginBottom:'1%',
  },
  cancelTxt: {
    fontSize: hp('1.8'),
    color: '#1ED18C',
    // justifyContent: 'center',
    fontFamily: Fonts.PoppinsBold,
  },
  titleTxt: {
    fontSize: title_txt,
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    //textAlign: 'center',
  },
  titleView: {
    width: '94%',
    height: hp('3'),
    alignSelf: 'center',
    marginTop:hp('1'),
    marginBottom:hp('1')
  },
  logoutText: {
    marginLeft:wp('3'),
    height:hp('4'),
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: '#004085',
  },
  textViewLog: {
    width: '85%',
    height: hp('5'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#cce5ff',
    marginTop: hp('1.5'),
    borderRadius:wp('1'),
    borderColor:'#b8daff',
    borderWidth:hp('0.15'),
  },
});
