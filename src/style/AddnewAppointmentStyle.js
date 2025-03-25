import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
//const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as colors from '../style/Common/ColorsStyle';

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

import StyleSheet from "react-native-media-query";

module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  bodyview:{
    width:wp('94'),
    height:hp('66'),
  },
  inpMainView:{
    height:hp('8'),
   // backgroundColor:'yellow',
    marginBottom:hp('1')
  },
  txtHead:{
    fontSize:hp('1.6'),
    height:hp('3'),
    color: 'black',
  },
  txtInpView:{
    height:hp('4.5'),
    backgroundColor:'white',
    borderRadius:wp('1'),
    borderColor:'#EEEEEE',
    borderWidth:wp('0.2')
  },
  inpMainView2:{
    height:hp('8'),
    marginBottom:hp('1'),
  },
  inpSubView:{
    height:hp('5'),
    flexDirection:'row',
  },
  TxtInput: {
    width: "94%",
    height: hp("4.4"),
    fontSize: hp("1.8"),
    //backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
  },
  txtInpView2:{
    height:hp('4.5'),
    width:wp('45'),
    backgroundColor:'white',
    borderRadius:wp('1'),
    borderColor:'#EEEEEE',
    borderWidth:wp('0.2')
  },
  txtInpView3:{
    height:hp('4.5'),
    flexDirection:'row',
    width:'49%',
  },
  inpMainNoteView:{
    height:hp('18'),
    marginBottom:hp('1')
  },
  txtNoteInpView:{
    height:hp('14'),
    backgroundColor:'white',
    borderRadius:wp('1'),
    borderColor:'#EEEEEE',
    borderWidth:wp('0.2')
  },
  TxtInputNote:{
    width: "94%",
    height: hp("13"),
    fontSize: hp("1.8"),
    marginLeft: wp("3"),
    color: "gray",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    
  },
  btnView:{
    width:wp('94'),
    height:hp('5'), 
    marginBottom:hp('2'),
    flexDirection:'row'
  },
  bckBtn:{
    width:wp('46'), 
    height:hp('4.5'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2'),
    borderRadius:wp('1'),
    justifyContent:'center',
    alignItems:'center'
  },
  saveBtn:{
    width:wp('46'),
    backgroundColor:'#1ED18C', 
    height:hp('4.5'), 
    marginLeft:wp('2'),
    borderRadius:wp('1'),
    justifyContent:'center',
    alignItems:'center'
  },
  bckBtnTxt:{
    fontSize:hp('1.6'),
    color:colors.primaryColor
  },
  saveBtnTxt:{
    fontSize:hp('1.6'),
    color:"white"
  },

  //drop down

  dropdown: {
    width:wp('15'),
    height: hp('4.5'),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight:wp('2'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width:wp('10'),
    },
    "@media (max-width: 450px)": {
      width:wp('15'),
    },
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'gray',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'gray',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'gray',
  },
  chckView: {
    width: wp("90"),
    marginTop: hp("1"),
    flexDirection: "row",
  },
  chckViewTxt: {
    fontSize: hp("1.6"),
    color:'black',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginTop: hp("0.2"),
    },
    "@media (max-width: 450px)": {
      marginTop: hp("1.1"),
    },
  },

});
