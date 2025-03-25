import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';
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
    marginTop:hp('0.7'),
    width: '95%',
    height: hp('3.4'),
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
    height: wp('6'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2%'),
    borderRadius: 8,
    marginLeft: wp('48'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  AddressBtn1:{
    marginTop: hp('1%'),
    width: wp('23'),
    height: wp('6'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2%'),
    borderRadius: 8,
    marginLeft: wp('75'),
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
    paddingStart:wp('0.4%'),
    fontSize:hp('1.7%'), 
  },
  
  searchView: {
    width: '86%',
    height: hp('6'),
    marginTop: hp('5%'),
  },

  searchViews: {
    width: '90%',
    height: hp('5'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  bodyView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 5,
    marginLeft: '5%',
    // marginRight: '3%',
    height: hp('10'),
  },

  CardDetail: {
    alignSelf: 'center',
    marginTop: hp('15%'),
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    paddingRight:'10%',
    // justifyContent: 'center',
  },

  CardDetail1: {
    // justifyContent: 'center',
    alignItems: 'center',
     backgroundColor: '#1ED18C',
    borderRadius: 20,
    // marginLeft:-40,
    // marginHorizontal: -30,
    width: wp('13%'),
    marginTop:hp('-5'),
  },

  CardDetail2: {
    fontFamily: Fonts.PoppinsMedium,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED18C',
    borderRadius: 20,
    marginHorizontal: 5,
    width:  wp('20%'),
  },
  detailContent: {
    margin: (10,0,10,0),
    alignItems: 'center',
  },
  title:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
    backgroundColor: '#f6f6f6',
    fontWeight:'bold'
  },
  title1:{
    fontSize: hp('1.5'),
    backgroundColor: '#f6f6f6',
    fontFamily: Fonts.PoppinsMedium,
    fontWeight:'bold'
  },

  bodyView1: {
    flexDirection: 'row',
    width: '95%',
    marginTop: '-1%',
    justifyContent: 'space-between',
    //marginLeft: '10%',
    // backgroundColor: 'red',
    //paddingRight: 10,
    //marginLeft: '5%',
    //paddingLeft: 10,
    //paddingHorizontal: 10,
    height: hp('4'),
  },

  detailContent1: {
    margin: 10,
    alignItems: 'center',
  },


  CardDetail3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED18C',
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp('18%'),
    marginTop:hp('-5')
  },
  CardDetail4: {
    fontFamily: Fonts.PoppinsMedium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    marginHorizontal: 5,
    width:  wp('20%'),
  },

  title3:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
    color: "white",
    fontWeight:'bold'
  },
  title4:{
    fontSize: hp('1.5'),
    color:"#93999c",
    fontFamily: Fonts.PoppinsMedium,
    fontWeight:'bold'
  },
  title5:{
    fontSize: hp('1.8'),
    color:"#93999c",
    marginTop:hp('1'),
    fontFamily: Fonts.PoppinsBold,
    fontWeight: 'bold',
  },

  FillterBtn:{
    width: wp('12'),
    height: wp('6'),
    borderColor:'#1ED18C',
    borderWidth:wp('0.2%'),
    borderRadius: 8,
    marginLeft: wp('9'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
});
