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
    flex: 1,
    // width: WIDTH,
    // height: '100%',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  //  --- back button ---- 
  backBtn:{
    width: wp('13'),
    height: hp('4'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2%'),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flatlist: {
    flex:1,
    //flexGrow: 0,
   // marginLeft:wp('1'),
  //  marginRight:wp('2'),
    marginBottom: '2%',
    //backgroundColor: 'red',
    width: '100%',
  },
  backText:{
    color:'#1ED18C',
    fontFamily: Fonts.PoppinsRegular,
    paddingStart:wp('1%'),
    fontSize:hp('1.8%'),
  },
  backIcon:{
    marginLeft: '12%',
  },
  titleView: {
    width: '90%',
    height: hp('5'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleTxt: {
    fontSize: hp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
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
  AddressBtn:{
    width: wp('23'),
    height: wp('4'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2%'),
    borderRadius: 8,
    marginLeft: wp('55'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  addIcon:{
    marginLeft: wp('1'),
  },
  addText:{
    color:'#1ED18C',
    fontFamily: Fonts.PoppinsRegular,
    paddingStart:wp('1%'),
    fontSize:hp('1.5%'), 
  },
  cart:{
    width: '90%',
    height: hp('8'),
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    margin: 8,
    marginTop: hp('-2'),
    alignSelf: 'center',
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: 'row',
  },
  topicView:{
    width: '90%',
    height: hp('5'),
    justifyContent: 'flex-start',
    marginTop:hp('1')
  },
  topicTxt:{
    fontSize: hp('1.6'),
    fontFamily: Fonts.PoppinsMedium,
    color: 'black',
  },
  cart1: {
    width: '90%',
    height: hp('8'),
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 2,
    margin: 8,
    alignSelf: 'center',
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: 'row',

    marginTop: hp('1'),
  },
  cart2: {
    width: '90%',
    height: hp('5'),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
    margin: 8,
    alignSelf: 'center',
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: 'row',

    marginTop: hp('-1'),
  },
  cart3: {
    width: '90%',
    height: hp('5'),
    backgroundColor: '#FFD8D8',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    margin: 8,
    alignSelf: 'center',
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: 'row',

    marginTop: hp('-1'),
  },
  checkbox: {
    alignSelf: 'center',
    width: wp('2'),
    height: hp('1.5'),
    marginTop: hp('-3'),
    borderWidth: wp('0.1'),
    borderColor: '#1ED18C',
  },
  checkboxView: {
    width: '90%',
    height: hp('5'),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop:hp('-3'),
  },
  labelTxt: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsRegular,
    color: 'black',
    marginLeft:wp('1')
  },
  noticeTxt: {
    fontSize: hp('1.4'),
    fontFamily: Fonts.PoppinsMedium,
    color: '#E61538',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('10'),
  },
  buttonView: {
    width: '90%',
    height: hp('5'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop:hp('2')
  },
  Btn1: {
    width: wp('43'),
    height: wp('6'),
    borderColor: '#1ED18C',
    borderWidth: wp('0.2%'),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Btn2: {
    width: wp('43'),
    height: wp('6'),
    borderColor: '#1ED18C',
    borderWidth: wp('0.2%'),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#1ED18C'
  },
  BtnTxt:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
    color: '#1ED18C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnTxt2:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartView:{
    width: wp('87'),
    height: hp('7'),
    marginLeft:wp('1'),
  },
  addreesName:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'black',
    marginLeft: wp('2'),
    marginTop:hp('1'),
    width: wp('70'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  addreestxt:{
    fontSize: hp('1.4'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft: wp('2'),
  },
  addreesNumber:{
    fontSize: hp('1.4'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: '#1ED18C',
    marginLeft: wp('2'),
  },
  selectBtn:{
    width: wp('5'),
    height: hp('4'),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    //backgroundColor: 'blue',
    marginLeft:wp('7'),
    marginTop:hp('-0.8')
  },
  addressBtnView:{
    width: wp('87'),
    height: hp('3'),
    flexDirection: 'row',
    marginTop:hp('-0.5'),

  },
  radioView:{
    width: wp('87'),
    height: hp('5'),
    marginLeft:wp('1'),
    marginTop:hp('2'),
    flexDirection: 'row',
  },
  radioText:{
    width: wp('25'),
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsRegular,
    color: 'black',
    
  },
  addressCardScreen:{
    height:'20%',
    width:'90%',
    marginTop:hp('-2'),
    //backgroundColor:'pink'
  }

 
});