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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  // search view bar style start ----
  searchView: {
    width: '86%',
    height: hp('6'),
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  searchInput: {
    width: '85%',
    height: hp('5'),
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: '5%',
  },
  TxtInput: {
    width: '80%',
    height: hp('7'),
    fontSize: hp(2),
    fontWeight: 'bold',
    // backgroundColor: 'red',
  },
  filterBtn: {
    width: wp('11'),
    height: hp('5'),
    backgroundColor: '#1ED18C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  filterIcon: {
    width: 30,
    height: 20,
  },
  titleTxt: {
    fontSize: hp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    //textAlign: 'center',
  },
  titleView: {
    width: '90%',
    height: hp('5'),
    marginTop: hp('1'),
    justifyContent: 'flex-start',
  },
  // search view bar style end ----

  CardDetail: {
    alignSelf: 'flex-start',
    marginTop: hp('4'),
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'flex-start',
     //backgroundColor: "#009387",
  },
  CardDetail1: {
    // alignSelf: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#1ED18C',
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp('10'),
    height: hp('4'),
  },
  CardDetail2: {
    fontFamily: Fonts.PoppinsMedium,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp('12'),
    height: hp('4'),
  },
  detailContent: {
    margin: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
    color: 'white',
    fontWeight: 'bold',
  },
  bodyView: {
    flexDirection: 'row',
    width: '95%',
    marginTop: '1%',
    justifyContent: 'space-between',
    //marginLeft: '10%',
    //backgroundColor: 'red',
    paddingRight: 10,
    marginLeft: '12%',
    //paddingLeft: 10,
    //paddingHorizontal: 10,
    height: hp('20'),
  },
  gridBtn:{
    width: wp('5'),
    height: hp('4'),
    marginLeft:wp('4'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcon:{
      width:wp('2.5'),
      height:hp('2'),
  },
  listBtn:{
    width: wp('5'),
    height: hp('4'),
    marginLeft:wp('2'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#1ED18C',
  },
  listIcon:{
      width:wp('2.5'),
      height:hp('2'),
  },
  filter:{
    width: wp('12'),
    height: hp('4'),
    // backgroundColor:'#1ED18C',
    borderColor:'#1ED18C',
    borderWidth:wp('0.2'),
    borderRadius: 8,
    marginLeft:wp('58'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  filterText:{
    color:'#1ED18C',
    fontFamily: Fonts.PoppinsRegular,
    paddingStart:wp('1'),
    fontSize:hp('1.5'),
  },
  filIcon:{
    marginLeft: '12%',
  },
  footerCardView: {
    width: '97%',
    height: hp('12'),
    backgroundColor: 'white',
    //marginLeft: 10,
    borderRadius: 15,
    alignItems: 'center',
    //shadowColor: 'red',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 2.1,
    shadowColor: "#000",
    elevation: 5,
    margin: 8,
    marginLeft: '2%',
    marginTop: hp('1'),
    //justifyContent: 'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  cardImgView: {
    width: wp('20'),
    height: hp('12'),
    marginLeft:wp('0'),
    marginRight:wp('2'),
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  cardSubImg: {
    width: wp('20'),
    height: hp('12'),
    borderBottomLeftRadius: 10,
    borderTopLeftRadius:10
    // width: 60,
    // height: 60,
  },
  cardMainTxtView: {
    width: wp('65'),
    //backgroundColor:"green"
  },
  cardSubMainTxt: {
    width: '100%',
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsRegular,
    color: '#1ED18C',
    marginLeft: wp('1'),
   // backgroundColor:"orange"
    // fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsRegular,
    // // height:'auto',
    // color: '#1ED18C',
    // marginLeft: '2%',
  },
  cardSubTxtView: {
    // width: '100%',
    // height: 'auto',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
     marginTop:wp('-1'),
    width: '95%',
    height: hp('5'),
    alignItems: 'flex-start',
    justifyContent: 'center',
    //backgroundColor:"orange"
  },
  cardSubTxtView2: {
    marginTop:wp('-1.6'),
    width:'100%',
    height:hp('3'),
     //backgroundColor:"blue"
  },
  cardSubTxtView3: {
    marginTop:wp('-1%'),
    width:'100%',
    height:hp('3.2'),
    //backgroundColor:"yellow"
  },
  cardSubTxt: {
    fontSize: hp('1.3'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft: '2%',
  },
  stocktxt:{
    fontSize: hp('1.3'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft:wp('49'),
    marginTop:hp('-2'),
  },
  packtxt:{
    fontSize: hp('1.3'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginLeft:wp('45'),
    marginTop:hp('-3.5'),
  },
  cardSubTxt2: {
    fontSize: hp('1.3'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: '#1ED18C',
    marginLeft:wp('55'),
    marginTop:hp('-2'),
  },
  cardSubTxt3: {
    fontSize: hp('1.3'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'black',
    marginLeft:wp('54'),
    marginTop:hp('-2'),
  },
  
  priceTxt:{
    fontSize:hp('1.6'),
    color:'black',
    fontFamily:Fonts.PoppinsSemiBold,
    marginLeft: '2%',
    marginTop:hp('1')
},
cart:{
  width: wp('9'),
  height: hp('3'),
  // backgroundColor:'#1ED18C',
  borderColor:'#1ED18C',
  borderWidth:wp('0.2'),
  borderRadius: 8,
  marginLeft:wp('53'),
  marginTop:wp('-2.6'),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
cartIcon:{
  marginLeft: '12%',
},
cartText:{
  color:'#1ED18C',
  fontFamily: Fonts.PoppinsRegular,
  paddingStart:wp('1'),
  fontSize:hp('1.5'),
  marginLeft:wp('1')
},
backBtn:{
  width: wp('13'),
  height: hp('4'),
  borderColor:'#1ED18C',
  borderWidth:wp('0.2'),
  borderRadius: 5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
backText:{
  color:'#1ED18C',
  fontFamily: Fonts.PoppinsRegular,
  paddingStart:wp('1'),
  fontSize:hp('1.8'),
},
backIcon:{
  marginLeft: '12%',
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

viewcolumn:{
  backgroundColor:'red',
  // marginTop: hp('-5'),
}

  
});
