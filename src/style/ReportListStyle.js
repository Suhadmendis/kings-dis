//import {StyleSheet} from 'react-native';
import { Fonts } from "../utils/Fonts";
import { Dimensions, Platform, PixelRatio } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";
import * as colors from "../style/Common/ColorsStyle";


let btn_size = wp('6.5')
if (widthper <= 500.0) {
  txt_size = hp("1.6");
  btn_size=  wp('8');
} else {
  txt_size = hp("1.4");
  btn_size = wp('6.5')
}
let widthper = wp("100%");
let crd_wdth = 0;
let txt_size = 0;
let date_height = 0;
let date_txt = hp("1");
let date_pl = hp("1.2");
if (widthper <= 500.0) {
  crd_wdth = wp("75");
  txt_size = wp("3");
  date_height = hp("3.9");
  (date_txt = hp("1.5")), (date_pl = hp("1.5"));
} else {
  crd_wdth = wp("65");
  txt_size = wp("2.1");
  date_height = hp("3.5");
  (date_txt = hp("1")), (date_pl = hp("1.2"));
}
module.exports = StyleSheet.create({
  // container: {
  //   width:"94%",
  //   marginLeft: '3%',
  //   marginRight: '3%',
  //   marginTop: '2%',
  //   flexDirection:'row',
  // },
  container: {
    flex: 1,

    // paddingTop: 30,
    // backgroundColor: "#fff",
     marginTop: 10,
     width: '94%',
    marginLeft: '3%',
    marginRight: '3%'
  },
  listItem: {
    padding: 10,
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
// alignItems: 'center',
  },
  tablewrapper: {
    width: '100%',
    // padding: 15,
    backgroundColor: "#E7FFF5",
    borderRadius: 10,
  },
  table: {
    borderRadius: 1,
    overflow: 'hidden',
    width: 1800, // Adjust the width as needed
    // backgroundColor: "#fff",
  },
  head: {
    height: 40,
    backgroundColor: "#E7FFF5",
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    margin: 6,
    fontSize: 12,
    color:'#FFFFFF',
  },
  dataTableHeader:{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,

  },
  dataTableColumn :{
    alignItems: 'center',
  },
  insideView1:{
    paddingLeft:10,
    width:'50%',
    alignItems:'flex-start',
    justifyContent:'center',
  },
  insideView2:{
  paddingRight:10,
    width:'50%',
    alignItems:'flex-end',
    justifyContent:'center',
    backgroundColor:'red'
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4, 
    resizeMode: 'contain',
    // borderRadius: 1,
    //resizeMethod: 'cover',
  },
  iconView: {
    flex:0.7,
    width:wp('15'),
    height: hp('6'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: wp('1.5'),
  },
  eyeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width:wp('8'),
    height: hp('4'),
    marginRight:wp('1.5'),
    backgroundColor: '#DEF9F6',
    borderRadius: wp('1.2'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
  },
  titleView: {
    marginTop:hp('1.5'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft:wp('3')
  },
  titleTxt: {
    fontSize: hp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
  },
  dateView:{
    width: '100%',
    height:60,
    marginTop:20,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  dateBtn:{
    width: '45%',
    height: date_height,
    justifyContent: 'center',
    borderRadius: wp('1'),
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#1ED18C',
    borderWidth: wp('0.2'),
    flexDirection: 'row',
  },
  insideTitle:{
    fontSize:16,
    fontWeight: '600',
    color:colors.primaryColor,
  },
});
