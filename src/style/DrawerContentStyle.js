//import {StyleSheet} from 'react-native';
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    width:"100%",
    margin: '5%',
    marginTop: '10%',
    flexDirection:'row',
  },
  container1: {
    width:"100%",
    margin: '1%',
    flexDirection:'row',
    alignItems:'center'
  },
  iosDiscountSwitch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
  },
  mainContainer: {
    flex:1,
     height: '100%',
    // width: wp('46'),
    backgroundColor: 'white',

  },
  subContainer: {
    //flex:1,
    position: 'absolute',
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    //backgroundColor: 'red',
  },
  preTxt: {
    color: '#9E9E9E',
  },
  toggleView: {
    marginTop:hp('1'),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    position: 'absolute',
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  logo: {
    width: "60%",
    height: "60%",
    borderRadius: 40,
    marginLeft: '3%',
  },
  profileImage: {
    width: wp('10%'),
    height: hp('10%'),
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
  },
  nameView: {
    width: '89%',
    height: hp('8'),
    marginTop:hp('2'),
    marginLeft:wp('3'),
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  TxtView: {
    width: '80%',
    height: 50,
    //backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginTop: '2%',
    marginLeft: '10%',
    flexDirection: 'row',
  },
  TxtView2: {
    width: '70%',
    height: 50,
    //backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1.5'),
    marginLeft: '5%',
    flexDirection: 'row',
  },
  menuItemContainer: {
    // marginLeft: '2%',
    padding: 8,
    flexDirection: 'row',
  },
  menuItemText: {
    fontSize: hp('1.2'),
    color: 'black',
    // fontFamily: Fonts.PoppinsSemiBold,
  },
  menuItemTextDisabled: {
    color: 'rgba(255,255,255,0.5)',
  },
  selectedBar: {
    borderLeftWidth: 3,
    borderLeftColor: '#48b1b3',
    height: '100%',
    marginRight: 10,
  },
  profileInfoContainer: {
    margin: 20,
  },
  line: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    marginTop: '6%',
    marginBottom: '10%',
    width: '100%',
  },
  Title: {
    fontSize: hp('2'),
    //marginLeft: '5%',
    color: '#1ED18C',
    //marginTop: '5%',
    // fontFamily: Fonts.PoppinsBold,
  },
  TitleTxt: {
    // fontSize: hp('1.5'),
    // //marginLeft: '5%',
    // color: 'black',
    // marginTop: '2%',
    // //marginLeft: wp('-5'),
    // //fontWeight: '500',
    fontFamily: Fonts.PoppinsSemiBold,

    fontSize: hp('1.5'),
    //marginLeft: '5%',
    color: 'black',
    marginTop: '2%',
   // marginLeft: wp('-1'),
    //fontWeight: '500',
    // fontFamily: Fonts.PoppinsSemiBold,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.7'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.8'),
    },
  },
  HomeTxt: {
    fontSize: hp('1.6'),
    //marginLeft: '5%',
    color: '#1ED18C',
    marginLeft: wp('2.5'),
    alignSelf:'center',
    //fontWeight: '500',
    // fontFamily: Fonts.PoppinsSemiBold,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.7'),
      marginLeft: wp('2.5'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.8'),
      marginLeft: wp('4'),
    },
  },
  TitleTxt2: {
    fontSize: hp('1.6'),
    //marginLeft: '5%',
    color: 'black',
    marginTop: '3%',
    //marginLeft: '4%',
    //fontWeight: '500',
    // fontFamily: Fonts.PoppinsSemiBold,
  },
  homeIcon:{
    height: hp('5'),
    width:wp('2.4'),
    marginLeft: wp('3.1'),
    resizeMode: 'contain',
    "@media (max-width: 1600px) and (min-width:450px)": {
      height: hp('5'),
      width:wp('2.6'),
    },
    "@media (max-width:450px)": {
      height: hp('5'),
      width:wp('4'),
    },
  },

  SubTitle: {
    fontSize: hp('1.6'),
    marginLeft: '5%',
    color: 'black',
    //textAlign: 'center',
    // fontFamily: Fonts.PoppinsSemiBold,
    paddingTop: 5,
    paddingBottom: 5,
  },
  SubTitle2: {
    fontSize: hp('1.6'),
    marginLeft: '5%',
    //textAlign: 'center',
    // fontFamily: Fonts.PoppinsSemiBold,
    paddingTop: 5,
    paddingBottom: 5,
  },
  footView: {
    marginLeft: '2%',
    padding: 10,
    flexDirection: 'row',
  },
  txt1: {
    fontSize: hp('1.6'),
    color: 'gray',
    marginRight: 10,
    marginLeft: '4%',
    // fontFamily: Fonts.PoppinsSemiBold,
  },
  subFoot: {
    height: '10%',
    marginLeft: '2%',
  },
  subFoot2: {
    marginLeft: '2%',
    padding: 4,
    flexDirection: 'row',
  },
  txt2: {
    fontSize: hp('1.6'),
    color: 'gray',
    marginRight: 10,
    marginLeft: '4%',
    // fontFamily: Fonts.Poppins,
  },
  wrapperCollapsibleList: {
    //flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    backgroundColor: 'yellow',
  },
  button: {
    width: wp('25'),
    height: hp('5'),
    backgroundColor: '#1ED18C',
    borderRadius: 10,
    marginTop: '15%',
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  buttonHome: {
    width: wp('46'),
    height: hp('5'),

    backgroundColor: '#E7FFF5',
    // backgroundColor: 'red',
    borderRadius: 12,
    borderWidth:wp('0.02'),
    borderColor:'#61F8BE',
    flexDirection:'row',
    alignItems: 'flex-start',
    alignSelf:'center',
    "@media (max-width: 1600px) and (min-width:450px)": {
      borderRadius: 12,
    },
    "@media (max-width:450px)": {
      width: wp('65'),
      borderRadius: 6,
    },
  },
  btnTxt: {
    fontSize: hp('1.8'),
    //marginLeft: '5%',
    color: 'white',
    //textAlign: 'center',
    // fontFamily: Fonts.PoppinsSemiBold,
  },


  // ----   box ----

  subTopicBox:{
    flex: 1,
    margin: 13,
    marginTop: hp('1'),
    //height: 560,
    //width:"100%",
    height: hp('62'),
    "@media (max-width: 1600px) and (min-width:450px)": {
      height: hp('62'),
    },
    "@media (max-width:450px)": {
      height: hp('60'),
    },
  },
  buttonBox:{
    //width: wp('40%'),
    height: hp('4%'),
   // marginTop: hp('1.6%'),
   marginLeft:'6%',
   "@media (max-width: 1600px) and (min-width:450px)": {
    marginLeft:'6%',
  },
  "@media (max-width:450px)": {
    marginLeft:'3.8%',
  },
  },
  buttonBox1:{
    //width: wp('40%'),
    height: hp('4%'),
   // marginTop: hp('1.6%'),
   backgroundColor:'pink',
  },
  rowBox:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  iconBox:{
    width: wp('5.5%'),
    justifyContent:'center',
    height: hp('4%'),
    resizeMode: 'contain',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp('5.5%'),
    },
    "@media (max-width:450px)": {
      width: wp('5%'),
    },
  },
  textBox:{
    width: wp('33'),
    height: hp('4%'),
    marginTop: wp('0.5'),
    "@media (max-width: 1600px) and (min-width:450px)": {
      marginTop: wp('0.5'),
    },
    "@media (max-width:450px)": {
      marginRight: wp('6'),
      marginLeft:wp('0'),
    },
  },
  arrowBox:{
    width: wp('8'),
    height: hp('4%'),
    marginRight: wp('7'),
    justifyContent:'center',
    "@media (max-width: 1600px) and (min-width:450px)": {
      marginRight: wp('7'),
    },
    "@media (max-width:450px)": {
      marginRight: wp('0'),
      alignItems:'center',
      marginLeft:wp('2')
    },
  },
  minusBtn:{
    width: wp('1'),
    justifyContent:'center'
  },
  iconImg:{
    //width: wp('2.5%'),
     height: hp('2.4%'),
    // marginLeft: wp('1'),
    aspectRatio: 0.9,
    resizeMode: 'contain',

  },
  iconImg2:{
    //width: wp('5'),
    height: hp('1.6'),
    marginLeft: wp('1'),
    marginTop: hp('1'),
  },
  minusBtn1:{
    aspectRatio: 0.5,
    height: hp('3%'),
    resizeMode: 'contain',
  },
  arrowBtn:{
    // width: 16,
    // height: 16,
    // marginLeft: wp('1.5'),
    // marginTop: hp('1'),
    aspectRatio: 0.5,
    height: hp('2.5%'),
    resizeMode: 'contain',
    // width: 16,
    // height: 16,
    // marginRight:wp('3'),
    // marginTop: hp('1'),
  },
  lineMarg:{
    height:hp('0.06'),
    width:wp('48'),
    opacity: 0.5,
    backgroundColor:'#61F8BE',
    alignSelf:'center',
    "@media (max-width: 1600px) and (min-width:450px)": {
      height:hp('0.0612'),

    },
    "@media (max-width:450px)": {
      height:hp('0.052'),
      width:wp('65'),
    },
  },
  endBox:{
    position:'absolute',
    bottom:0,
    width:"100%",
    height: hp('20%'),
    backgroundColor:"#E7FEF5",
  },
  endBoxMain:{
    position:'absolute',
    bottom:0,
    width:"100%",
    height: hp('13%'),
    backgroundColor:"#E7FEF5",
  },
  endBox1:{
    width: wp('40%'),
    // height: hp('6%'),
    justifyContent:'center',
    flex:2
  },
  endBox2:{
    width: wp('40%'),
    // height: hp('6%'),
    justifyContent:'center',
    flex:2
  },
  endBox3:{
    width: wp('40%'),
  //  height: hp('4%'),
     flex:1.2,
    //  backgroundColor: 'red',
     marginBottom:hp('1.5'),
    "@media (max-width:450px)": {
      flex:1,
      marginBottom:hp('1.5'),
    },
  },
  rowEndBox:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  rowEndBoxend:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('10'),

  },
  iconBox2:{
    width: wp('10'),
    height:'100%',
    marginLeft: wp('1'),
    justifyContent:'center',
    alignItems:'center',
    "@media (max-width: 1600px) and (min-width:450px)": {
      marginLeft: wp('1'),
    },
    "@media (max-width:450px)": {
      marginLeft: wp('1.5'),
    },
  },
  iconBox3:{
    width: wp('30'),
    height: '100%',
    justifyContent:'center'
  },
  iconImg3:{
    width: wp('2.4'),
    height: hp('2'),
    aspectRatio: 0.9,
    resizeMode: 'contain',
  },
  iconImg4:{
    width: wp('3'),
    height: hp('2'),
    marginLeft: wp('1'),
    aspectRatio: 0.9,
    resizeMode: 'contain',
  },
  logOutTxt:{
    fontSize: hp('1.7'),
    color: '#E61538',
    // fontFamily: Fonts.PoppinsRegular,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.7'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.5'),
      marginLeft: '3%',
    },
  },
  profileTxt:{
    fontSize: hp('1.7'),
    color: '#1ED18C',
    // fontFamily: Fonts.PoppinsRegular,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.7'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.5'),
      marginLeft: '3%',
    },
  },
  versionBox1:{
   // width: wp('15%'),
   height: hp('3'),
    marginTop:hp('1.2'),
    marginLeft:wp('3'),
    "@media (max-width: 1600px) and (min-width:450px)": {
      marginLeft:wp('1.5'),
    },
    "@media (max-width:450px)": {
      marginLeft:wp('1.5'),
    },
  },
  versionBox2:{
    width: wp('35'),
    height: hp('2'),
    marginTop:hp('1.2'),
  },
  privecyTxt:{
    fontSize: hp('1.3'),
    marginLeft: wp('3'),
    color: '#1ED18C',
    // fontFamily: Fonts.PoppinsRegular,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.3'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.5'),
    },
  },
  versionTxt:{
    marginLeft:wp('3'),
    fontSize: hp('1.3'),
    marginLeft: wp('3'),
    color: 'black',
    // fontFamily: Fonts.PoppinsRegular,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.3'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.5'),
    },
  },
  versionTxt1:{
    color: 'black',
    fontWeight:'bold',
    // fontFamily: Fonts.PoppinsRegular,
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize: hp('1.4'),
    },
    "@media (max-width:450px)": {
      fontSize: hp('1.6'),
    },
  },
  Title2:{
    color:'#979797',
    fontSize: hp('1.3')
  },
  envBox: {
    borderRadius: 5,
    marginLeft: wp('2'),
    height: hp('3'),
    width: wp('10'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,

  },
  envText: {
    color: 'white',
  },

  subBox1:{

    width: '80%',
    //height: hp('10'),
    // flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',

  },
  subBoxBody:{
    width: '95%',
    height: hp('3'),
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft:wp('7'),
    "@media (max-width: 1600px) and (min-width:450px)": {

    },
    "@media (max-width:450px)": {
      marginLeft:wp('10'),
    },
  },
  txtBody:{
    width: '100%',
    marginLeft:wp('1.6'),
    //height: hp('10'),
    //backgroundColor: 'red',
    //justifyContent: 'space-between',
    alignItems: 'flex-start',
    color:'#1ED18C',
    //marginTop: hp('2%'),
    fontSize:hp('1.5'),
    "@media (max-width: 1600px) and (min-width:450px)": {
      fontSize:hp('1.5'),
    },
    "@media (max-width:450px)": {
      fontSize:hp('1.6'),
    },
  },
  tokenBox:{
    height: hp('4'),
    flexDirection: 'row',
  },
  tokenBoxName:{
    width: wp('19'),
    height: hp('4'),
    marginLeft: wp('2'),
    justifyContent:'center',
    "@media (max-width: 1600px) and (min-width:450px)": {
      width: wp('19'),
    },
    "@media (max-width:450px)": {
      width: wp('25'),
    },
  },
  tokenTxt:{
    fontSize: hp('1.4'),
    color: 'black',
    // fontFamily: Fonts.PoppinsRegular,
    marginLeft: wp('5')
  },
  tokenBoxDate:{
    width: wp('58'),
    //backgroundColor: 'green',
    height: hp('4'),
    justifyContent:'center',
  },
  tokenTxt2:{
    fontSize: hp('1.4'),
    marginLeft: wp('1'),
    color: '#1ED18C',
    // fontFamily: Fonts.PoppinsRegular,
  },
  catItemView:{
    width:'94%',
    height:hp('4.5'),
    alignItems:'center',
    alignSelf:'flex-end',
    flexDirection:'row',
    "@media (max-width: 1600px) and (min-width:450px)": {
      width:'94%',
    },
    "@media (max-width:450px)": {
      width:'97%',
    },
  },
  catItemTxt:{
   fontSize: hp('1.6'),
   width:wp('28'),
   color:'black',
   "@media (max-width: 1600px) and (min-width:450px)": {
    width:wp('28'),
  },
  "@media (max-width:450px)": {
    width:wp('45'),
    marginLeft:wp('3')
  },
  },

});
