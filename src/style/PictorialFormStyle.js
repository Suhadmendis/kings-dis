import { Dimensions, Platform, PixelRatio } from "react-native";

const React = require("react-native");
const { width: WIDTH, height: height } = Dimensions.get("window");
//const { StyleSheet } = React;
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colors from '../style/Common/ColorsStyle';
import StyleSheet from "react-native-media-query";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: '#F9F9F9',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },

  titleTxt: {
    fontSize: hp('2.2'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('3'),
    marginTop: hp('1'),
    marginBottom: hp('1'),
    //textAlign: 'center',
  },
  titleView: {
    width: '100%',
    height: hp('5'),
    marginTop: hp('1'),
    alignSelf: 'center',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  preSeasonToggleArea: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: wp('3'),
  },
  preSeasonText: {
  fontSize: hp('1.4'),
  marginRight: wp('1'),
  },
  preSeasonToggle: {

  },
  dropdownPallet: {
    width: '94%',
    marginLeft: wp('3'),
    marginRight: wp('3'),
    marginBottom: wp('2'),
    backgroundColor: '#f7fff5',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,

  },

  dropdownView: {
    backgroundColor: 'white',
    width: '100%',
    height: hp('5'),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,


    padding: 5,
    borderRadius: 8,
  },
  contentView: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
    width: '100%',


  },
  dropdownText: {
    alignSelf: 'center',
    position: 'absolute',
    left: wp('3'),
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp('2')
  },
  dropdownImage: {
    width: wp('3'),
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    right: wp('3'),
  },




  itemPallet: {

  },
  itemVeiw: {
    paddingLeft: wp('4'),
    paddingRight: wp('4'),



  },
  lineOne: {
    marginTop: hp('2'),
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: hp('0.8'),
  },


  productNameText: {
    fontSize: hp('1.3'),
    // fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',

    // backgroundColor: 'red',
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: hp('1.3'),
      width: wp('70'),
    },
    '@media (max-width: 450px)': {
      fontSize: hp('1.5'),
      width: wp('60'),
    },
  },
  productpackSizeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp('1.3'),
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: hp('1.3'),
    },
    '@media (max-width: 450px)': {
      fontSize: hp('1.5'),
    },
  },
  lineTwo: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: hp('0.8'),

  },
  productCodeText: {
    fontSize: hp('1.3'),
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: hp('1.3'),
    },
    '@media (max-width: 450px)': {
      fontSize: hp('1.5'),
    },

  },
  productUnitPriceText: {
    fontWeight: 'bold',
    fontSize: hp('1.3'),
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: hp('1.3'),
    },
    '@media (max-width: 450px)': {
      fontSize: hp('1.5'),
    },

  },
  lineThree: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: hp('2'),

  },
  productQtyText: {
    height: 35,
    width: 60,
    borderRadius: 8,
    borderColor: '#ebebeb',
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',

    fontSize: hp('1.5'),
    textAlign: 'center',
    color:'gray',
    '@media (max-width: 1600px) and (min-width: 450px)': {

    },
    '@media (max-width: 450px)': {

    },

  },
  productLineTotalText: {
    fontWeight: 'bold',
    fontSize: hp('1.3'),
    color: '#1ed18c',
    alignSelf: 'center',
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: hp('1.3'),
    },
    '@media (max-width: 450px)': {
      fontSize: hp('1.5'),
    },

  },

  breakLine: {
    width: '100%',
    height: hp('0.15'),
    backgroundColor: '#30dd10',
  },

  buttonPallet: {
    width: '100%',
    height: hp('8'),
    flexDirection: 'row',
  },

  clearBtn: {
    flex: 1,
    margin: 12,
    width: wp('90') / 3,
    height: hp('5'),
    backgroundColor: '#1ED18C',
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('1'),
    backgroundColor: '#e8fcf4',
    borderWidth: hp('0.1'),
    borderColor: '#1ED18C',
  },

  clearTxt: {
    fontSize: hp('1.6'),
    color: '#1ED18C',
    // justifyContent: 'center',
    // fontFamily: Fonts.PoppinsBold,
  },

  AddToCartBtn: {
    flex: 1,
    margin: 12,
    width: wp('90') / 3,
    height: hp('5'),
    backgroundColor: '#1ED18C',
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutTxt: {
    fontSize: hp('1.6'),
    color: 'white',
    // justifyContent: 'center',
    // fontFamily: Fonts.PoppinsBold,
  },

});
