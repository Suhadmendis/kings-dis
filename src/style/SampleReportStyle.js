//import {StyleSheet} from 'react-native';
import { Fonts } from "../utils/Fonts";
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
    // padding: 10,
    paddingTop: 10,
    // backgroundColor: "#fff",
  },
  tableArea: {
    height: hp('65'),
  },
  tablewrapper: {
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
  dateView:{
    width: '100%',
    height:60,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBtn:{
    width: '45%',
    marginBottom:5,
    height: date_height,
    justifyContent: 'center',
    borderRadius: wp('1'),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#1ED18C',
    borderWidth: wp('0.3'),
    flexDirection: 'row',
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4,
    resizeMode: 'contain',
    // borderRadius: 1,
    //resizeMethod: 'cover',
  },
});
