//import {StyleSheet} from 'react-native';
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({

  mainContainer: {
    height: '100%',
    // width: wp('70'),
    backgroundColor: '#fff',
  },
  subContainer: {
    position: 'absolute',
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  button: {
    width: wp('45'),
    height: hp('4.5'),
    backgroundColor: '#1ED18C',
    borderRadius: 10,
    marginTop: '15%',
    marginBottom: 20,
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: hp('1.5'),
    color: 'white',
    fontFamily: Fonts.PoppinsSemiBold,
  },
  closeView:{
      flexDirection:'row',
      height:hp('4'),
      width:wp('48'),
      marginTop:hp('2'),
      alignItems:'flex-start',
      justifyContent: 'space-between',
  },
  titleView:{
    marginLeft:wp('3'),
    marginTop:hp('2')
  },
  subtitleView:{
    marginLeft:wp('3'),
    
  },
  sortbyView:{
    marginLeft:wp('3'),
  },
  titleText:{
    fontSize: hp('1.7'),
    color: 'black',
    fontFamily: Fonts.PoppinsSemiBold,
    fontWeight:'bold'
  },
  radioText:{
    fontSize: hp('1.2'),
    color: 'black',
    fontFamily: Fonts.PoppinsSemiBold,
    marginLeft:wp('2'),
    "@media (max-width: 1600px) and (min-width: 600px)": {
      fontSize: hp('1.2'),
    },
    "@media (max-width: 600px)": {
      fontSize: hp('1.5'),
    },
  },
  iconView:{
    alignItems:'center',
  },
  closeIcon:{
    height:hp('2'),
    width:wp('2'),
    resizeMode:'contain'
  },
  radioView:{
      marginLeft:wp('3'),
      "@media (max-width: 600px)": {
        height: hp('4'),
      },
  },
  applyView:{
    position:'absolute',
    bottom:2,
    width:"100%",
    backgroundColor:'white',
    alignItems:'center',
    shadowColor: '#BEFFF5',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  scrollStyle:{
    maxHeight:hp('15'), width:'100%',
    "@media (max-width: 600px)": {
      maxHeight:hp('10')
    },
  },
  checkbxfont:{
    fontSize:12,
    "@media (max-width: 500px)": {
      fontSize:12
    },
  },
  borderstyle:{
    flex: 1,
    width:'85%',
    borderColor: "#D6D6D6",
    borderBottomWidth: 1,
    alignSelf:'center'
  },
  cardView: {
    width: wp('44'),
    height: hp('3'),
//    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp('2%'),
    marginLeft:wp('1')
  },
  cardTxt: {
    fontSize: hp('1.4'),
    fontWeight:'bold',
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'black',
    //textAlign: 'center',
    "@media (max-width: 600px)": {
      fontSize: hp('1.6'),
    },
  },
  dwonArrow: {
    // marginLeft:wp('-100'),
    height:hp('2'),
    width:wp('2'),
    resizeMode:'contain'
    // justifyContent:'space-between'
  },
  dwonArrow1: {
    marginLeft:wp('45'),
    marginTop:hp('2')
  },
  dwonArrow2: {
    marginLeft:wp('43'),
    marginTop:hp('1')
  },
  cardBodyView: {
    width: '95%',
    height: 'auto',
    //backgroundColor: 'yellow',
    // flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardSubView: {
    width: '100%',
    marginLeft:wp('3'),
    //height: hp('10'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'flex-start',
    //marginTop: hp('2%'),
  },
});
