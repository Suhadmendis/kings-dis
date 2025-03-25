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
 

module.exports = StyleSheet.create({
 
  title3:{
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsMedium,
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

  
});
