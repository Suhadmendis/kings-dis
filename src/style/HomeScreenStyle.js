import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
//const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StyleSheet from "react-native-media-query";
import * as colors from '../style/Common/ColorsStyle';
module.exports = StyleSheet.create({
  container: {
    width: WIDTH,
    height: '100%',
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchView: {
    width: '94%',
    height: hp('4'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:hp('1'),
  },
  searchInput: {
    width: '24%',
    height: hp('4'),
    backgroundColor: '#1ED18C',
    borderRadius: wp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: colors.primaryColor,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 1,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: '24%',
      marginLeft:wp('-25'),
    },
    "@media (max-width: 500px)": {
      width: '10%',
    },
  },
  searchIcon: {
    color:'white',
    height: hp('2.3'),
    width: wp('2.3'),
    resizeMode: 'contain',
    marginLeft:wp('4'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginLeft:wp('4'),
      // height: hp('1'),
      // width: wp('1'),
    },
    "@media (max-width: 500px)": {
      marginLeft:wp('-7'),
      height: hp('4'),
      width: wp('4'),
    },
  },
  searchInputView:{
    width: '21%',
    height: '100%',
    justifyContent:"center",
    alignItems:'center',

  },
  TxtInput: {
    width: '75%',
    height: hp('7'),
    fontSize: wp('2'),
    color:'white',
    marginTop:hp('5'),
    marginLeft:wp('2')

  },
  filterBtn: {
    width: wp('11'),
    height: hp('6'),
    backgroundColor: 'rgba(44, 130, 201, 1)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    width: 20,
    height: 15,
  },
  silderView: {
    marginTop: '5%',
    width: wp('90'),
    height: 150,
    borderRadius: 20,
  },
  sliderImg: {
    borderRadius: 15,
    width: '85%',
    marginTop: 5,
  },
  bodyView: {
    flexDirection: 'row',
    width: '95%',
    marginTop: '2.5%',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginLeft: '3%',
    height: hp('13'),
  },
  cardView: {
    width: wp('28'),
    height: hp('12'),
    backgroundColor: 'rgba(44, 130, 201, 0.08)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(44, 130, 201, 1)',
    borderWidth: 0.5,
  },
  cardMainView: {
    width: wp('30'),
    height: hp('18'),
    marginLeft: 10,
    borderRadius: 10,
  },
  cardTxtView: {
    width: wp('25'),
    height: hp('5.5'),
    borderRadius: 10,
    marginTop: hp('1'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTxt: {
    fontSize: hp('1.8'),
    fontFamily: Fonts.PoppinsBold,
    color: 'rgba(44, 130, 201, 1)',
    textAlign: 'center',
  },
  titleTxt: {
    fontSize: hp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp('2.5'),
    },
    "@media (max-width: 500px)": {
      fontSize: hp('2.2'),
    },
  },
  titleView: {
    width: '90%',
    height: hp('4'),
    marginTop:hp('1'),
    justifyContent: 'flex-start',
  },
  titleView1: {
    width: '100%',
    height: hp('4'),
    marginTop:hp('1'),
    justifyContent: 'flex-start',
  },
  footerCardView1: {
    width: wp('45.3'),
    height: hp('10'),
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    //marginLeft: wp('2'),
    marginTop: hp('1.2'),
    flexDirection: 'row',
  },
  footerCardView: {
    width: wp('45.3'),
    height: hp('10'),
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
   // marginLeft: wp('2'),
    marginTop: hp('2'),
    flexDirection: 'row',
  },
  phonefooterCardView1: {
    width: wp('94'),
    height: hp('12'),
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginTop: hp('1.2'),
    flexDirection: 'row',
  },
  phonefooterCardView: {
    width: wp('94'),
    height: hp('12'),
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginTop: hp('2'),
    flexDirection: 'row',
  },
  cardImgView: {
    width: wp('17'),
    height: '100%',
    marginLeft:wp('0'),
    marginRight:wp('2'),
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  phonecardImgView: {
    width: wp('40'),
    height: '100%',
    marginLeft:wp('0'),
    marginRight:wp('2'),
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  cardSubTxtView: {
    width: wp('28'),
    height: hp('4'),
    alignItems: 'flex-start',
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('28'),
      height: hp('3'),
      marginTop:hp('1')
    },
    "@media (max-width: 500px)": {
      width: wp('45'),
      height: hp('3'),
      marginTop:hp('1'),
    },
  },
  cardSubTxtViewTitle:{
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardSubTxtView2: {
    width: wp('25'),
    height: 'auto',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardSubTxtViewCart:{
    width: '100%',
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardSubTxtViewCart2:{
    width: wp('25'),
    height: 'auto',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cardSubTxtViewCart3:{
    width: wp('25'),
    height: 'auto',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cardSubTxtViewCart4:{
    marginTop:wp('1%'),
    width:'100%',
    height:hp('2.5'),
  },
  phonecardSubTxtView2: {
    width: wp('40'),
    height: 'auto',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardMainTxtView: {
    width: wp('30'),
    height: hp('10'),
    marginLeft:wp('-2'),
  },
  phonecardMainTxtView: {
    width: wp('50'),
    height: hp('12'),
  },
  cardMainTxtView1: {
    width: '89%',
    marginLeft:'2%',
    height: hp('14'),
    justifyContent: 'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      height: hp('14'),
      justifyContent: 'flex-start',
      marginTop:'6%'
    },
  },
  cardSubMainTxt: {
    fontSize: hp('1.6'),
    height: 'auto',
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    fontWeight:'bold',
    marginLeft: wp('2'),
  },

  cardSubMainTxtCart:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    //fontWeight:'bold',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp('1.5'),
    },
    "@media (max-width: 500px)": {
      fontSize: hp('1.75'),
    },
  },

  prodctCodeView:{
    marginTop: hp("1"),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginTop: hp("1"),
    },
    "@media (max-width: 500px)": {
      marginTop: 0,
    },
  },

  phonecardSubMainTxt: {
    fontSize: hp('2'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    fontWeight:'bold',
    marginLeft: wp('2'),
  },
  cardSubTxt: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.fourthiaryColor,
    marginLeft: wp('2'),
  },

  cardSubTitleTxt: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.fourthiaryColor,
  },

  phonecardSubTxt: {
    fontSize: hp('1.8'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.fourthiaryColor,
    marginLeft: wp('2'),

  },
  cardImg: {
    width: 70,
    height: 60,
  },
  cardSubImg: {
    width: wp('17'),
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius:10
  },
  phonecardSubImg: {
    width: wp('40'),
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius:10
  },
  flatlist: {
    flexGrow: 0,
    marginLeft:wp('2'),
    marginRight:wp('2'),

    //marginTop: '2%',
    //backgroundColor: 'red',
    width: '88%',
  },
  flatlist1: {
  },
  item: {
    marginBottom: 10,
    width: wp('40'),
    height: hp('30'),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: wp('2'),
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    margin: 5,
    marginTop: hp('1.2'),
    alignSelf:'center',

  },
  //bbbb
  item2: {
    marginBottom: 10,
    width: wp('29'),
    height: hp('30'),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: wp('1'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    
    margin: 5,
    alignSelf:'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('29'),
    },
    "@media (max-width: 500px)": {
      width: wp('42'),
    },
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  CardDetail: {
    alignSelf: 'center',
    marginTop: hp('15%'),
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
  },
  CardDetail1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ED18C',
    borderRadius: 20,
    marginHorizontal: 5,
    width: wp('18%'),
    marginTop:hp('-5')
  },
  CardDetail2: {
    fontFamily: Fonts.PoppinsMedium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    marginHorizontal: 5,
    width:  wp('20%'),
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
    color: "white",
    fontWeight:'bold'
  },
  title1:{
    fontSize: hp('1.5'),
    color:"#93999c",
    fontFamily: Fonts.PoppinsMedium,
    fontWeight:'bold'
  },
  title2:{
    fontSize: hp('1.8'),
    color:"#93999c",
    marginTop:hp('1'),
    fontFamily: Fonts.PoppinsBold,
    fontWeight: 'bold',
  },
  packtxt:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',
    marginTop:wp('-0.2'),
  },
  stocktxt:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'gray',

  },
  cardSubTxt1: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsRegular,
    color: 'black',
    marginLeft: '-0.8%',
  },
  cardSubTxt2: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsRegular,
    color: '#1ED18C',
    marginLeft: '1%',
  },
  cardSubTxt3: {
    fontSize: hp("1.5"),
    fontFamily: Fonts.PoppinsRegular,
    color: "red",
    marginLeft: "1%",
  },
  cart:{
    width: wp('8'),
    height: wp('4'),
    // backgroundColor:'#1ED18C',
    borderColor:'#1ED18C',
    borderWidth:wp('0.2'),
    borderRadius: 8,
    marginLeft:wp('19'),
    marginTop:wp('-4'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cartText:{
    color:'#1ED18C',
    fontFamily: Fonts.PoppinsRegular,
    paddingStart:wp('1'),
    fontSize:hp('1.5'),
  },
  priceTxt:{
    fontSize:hp('1.5'),
    color:'black',
    fontFamily:Fonts.PoppinsSemiBold,
    fontWeight:'bold'
},

});
