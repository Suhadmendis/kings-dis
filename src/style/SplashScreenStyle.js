import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fontFirst: {
    color: 'rgba(44, 130, 201, 1)',
    fontSize: 14,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  fontSecond: {
    //paddingBottom: 5,
    color: 'black',
    fontFamily: Fonts.PoppinsSemiBold,
    //fontWeight: 'bold',
    fontSize: hp('2'),
    position:'absolute',
    color:'#019F62',
    bottom:40
  },
  bodyLogo: {
    height: '40%',
    resizeMode:"contain",
    aspectRatio:1
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
