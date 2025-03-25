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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      searchView: {
        width: '86%',
        height: hp('6'),
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('1%'),
      },
      searchInput: {
        width: '100%',
        height: hp('6'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      searchIcon: {
        width: wp('3.5'),
        height: hp('2.5'),
        marginLeft: '3%',
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
        marginLeft: '5%'
       
      },
      filterIcon: {
        width: 30,
        height: 20,
      },
      titleTxt: {
        fontSize: hp('2'),
        marginBottom:hp('1'),
        fontFamily: Fonts.PoppinsBold,
        color: 'black',
        fontWeight: 'bold',
        //textAlign: 'center',
      },
      titleView: {
        width: '94%',
       // height: hp('5'),
        marginTop:hp('1'),
        alignSelf: 'center',
      },
      footerCardView: {
        width: '100%',
        height: hp('14'),
        backgroundColor: 'white',
        //marginLeft: 10,
        borderRadius: 15,
        alignItems: 'center',
        //shadowColor: 'red',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 1,
        elevation: 2,
        margin: 8,
        marginLeft: '5%',
        marginTop: hp('2'),
        //justifyContent: 'center',
        // borderColor: 'rgba(44, 130, 201, 1)',
        // borderWidth: 0.5,
        flexDirection: 'row',
        // justifyContent: 'center',
      },
      cardImgView: {
        width: wp('20'),
        height: hp('14'),
        marginLeft:wp('0'),
        marginRight:wp('2'),
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
      },
      cardSubImg: {
        width: wp('20'),
        height: hp('14'),
        borderBottomLeftRadius: 10,
        borderTopLeftRadius:10
        // width: 60,
        // height: 60,
      },
      cardMainTxtView: {
        width: wp('100'),
        height: hp('12'),
        justifyContent: 'center',
        marginBottom:wp('3'),
        marginTop:wp('2')
        //backgroundColor: 'red',
      },
      cardSubTxtView: {
        width: '65%',
        height: hp('4.2'),
        // paddingTop: 5,
        // paddingBottom: 5,
        //backgroundColor: 'red',
        //borderRadius: 10,
        //marginTop: '2%',
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      cardSubMainTxt: {
        fontSize: hp('1.8'),
        fontFamily: Fonts.PoppinsBold,
        color: 'black',
        fontWeight:'bold',
        marginLeft: '2%',
      },
      cardSubTxtView2: {
        width: '65%',
        //height: hp('6'),
        height: 'auto',
        //backgroundColor: 'yellow',
        borderRadius: 10,
        //marginTop: '2%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      cardSubTxtView3: {
        width: '65%',
        //height: hp('6'),
        height: 'auto',
        //backgroundColor: 'yellow',
        borderRadius: 10,
        //marginTop: '2%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft:wp('-5')
      },
      cardSubTxt: {
        fontSize: hp('1.5'),
        fontFamily: Fonts.PoppinsSemiBold,
        color: 'gray',
        marginLeft: '2%',
        
      },
      cardSubTxt2: {
        fontSize: hp('1.5'),
        fontFamily: Fonts.PoppinsSemiBold,
        color: '#1ED18C',
        marginLeft: '2%',
        
      },
      cardSubTxt3: {
        fontSize: hp('1.7'),
        fontFamily: Fonts.PoppinsSemiBold,
        color: '#1ED18C',
        marginLeft: '2%',
        fontWeight:'bold'
        
      },
      flatlist: {
        flexGrow: 0,
        marginLeft:wp('2'),
        marginRight:wp('2'),
       
        //marginTop: '2%',
        //backgroundColor: 'red',
        width: '100%',
      },
      mapcontainer:{
        borderColor: '#F6F6F6',
        borderWidth: 3,
        borderRadius: 10,
        height:hp('65'),
        width:wp('94'),
        alignSelf:'flex-start',
        overflow: 'hidden'
      },
      map:{
        borderRadius: 10,
        height:hp('65'),
        width:wp('94')
      },
      addressView: {
        width:wp('94'),
        height: hp('10'),
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
        marginTop:hp('1'),
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'flex-start',
      },
      savingsTextView: {
        width: '100%',
        height: hp('2.1'),
        flexDirection: 'row',
        //backgroundColor: 'red',
        // justifyContent: 'center',
      },
      cardTxt2: {
        fontSize: hp('1.5'),
        fontFamily: Fonts.PoppinsBold,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: wp('2'),
      },
      applyView: {
        width: '100%',
        height: hp('6'),
        marginLeft: wp('1'),
        //backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
      },
      applyInput: {
        width: '60%',
        height: hp('5'),
        backgroundColor: 'white',
        borderColor: '#F6F6F6',
        borderWidth: 3,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      TxtInput1: {
        fontSize: hp('1.4'),
        fontFamily: Fonts.PoppinsBold,
        color:colors.fourthiaryColor,
        marginLeft: wp('1'),
        // fontWeight: 'bold',
        // backgroundColor: 'red',
      },
      locationView:{
          width:wp('55'),
          alignItems:'flex-start',
      },
      applyBtn: {
        width: wp('12'),
        height: hp('5'),
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: '#1ED18C',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp('2')
    
    
      },
      telTxt: {
        fontSize: hp('1.8'),
        color: '#1ED18C',
        // justifyContent: 'center',
        fontWeight: 'bold',
        fontFamily: Fonts.PoppinsBold,
        marginBottom:hp('2'),
        marginLeft:wp('5')
      },
})