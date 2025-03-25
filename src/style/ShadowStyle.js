import {Dimensions} from 'react-native';

const React = require('react-native');
const {width: WIDTH, height: height} = Dimensions.get('window');
const {StyleSheet} = React;
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  shadowProp: {
    width: '100%',
    alignItems:'center',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  shadowPropLogin: {
    width: '100%',
    alignItems:'center',
    shadowColor: '#BEFFF5',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
  },
})