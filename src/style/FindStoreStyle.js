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
 
  cardSubTxtno: {
    fontSize: hp('1.5'),
    // fontFamily: Fonts.PoppinsSemiBold,
    color: colors.fourthiaryColor,
    marginLeft: '2%',
  },
  footerCardViewno: {
    width: '100%',
    height: hp('11'),
    borderRadius: wp('2'),
    alignItems: 'center',
    marginLeft: '4%',
    marginTop: hp('1'),
    justifyContent:'center',
    flexDirection: 'row',
  },
    container: {
        flex: 1,
        width: WIDTH,
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      searchView: {
        width: '93%',
        height: hp('6'),
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('0.5%'),
        marginLeft:wp('-1')
      },
      searchInput: {
        width: '100%',
        height: hp('5'),
        backgroundColor: '#F6F6F6',
        borderRadius:wp('2') ,
        flexDirection: 'row',
        alignItems: 'center',
      },
      
     
      searchIconView:{
        width: wp('9.5'),
        height: hp('2.5'),
        alignItems:'center'
      },
      TxtInput: {
        width: '80%',
        height: hp('6'),
        fontSize: hp(2),
        color:'#9C9C9C',
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
        fontSize: hp('2.5'),
        // fontFamily: Fonts.PoppinsBold,
        color: 'black',
        fontWeight: 'bold',
        //textAlign: 'center',
      },
      titleView: {
        width: '94%',
        height: hp('4'),
        marginTop:hp('2'),
        alignSelf: 'center',
      },
      
      
      cardSubMainTxt: {
        fontSize: hp('1.8'),
        // fontFamily: Fonts.PoppinsBold,
        color: 'black',
        fontWeight:'bold',
        marginLeft: '2%',
      },
      
      cardSubTxt: {
        fontSize: hp('1.5'),
        // fontFamily: Fonts.PoppinsSemiBold,
        color: '#5A5A5A',
        marginLeft: '2%',
        
      },
      cardSubTxt2: {
        fontSize: hp('1.5'),
        // fontFamily: Fonts.PoppinsSemiBold,
        color: '#1ED18C',
        marginLeft: '2%',
        
      },
      cardSubTxt3: {
        fontSize: hp('1.7'),
        // fontFamily: Fonts.PoppinsSemiBold,
        color: '#1ED18C',
        marginLeft: '2%',
        fontWeight:'bold'
        
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
      mapcontainer:{
        borderColor: '#F6F6F6',
        borderWidth: 3,
        borderRadius: wp('2'),
        height:hp('25'),
        width:wp('93%'),
        alignSelf:'center',
        overflow: 'hidden',
        marginBottom:hp('6%')
      },
      map:{
        borderRadius: wp(2),
        height:hp('28'),
        width:wp('94'),
        alignSelf:'center'
      },

})