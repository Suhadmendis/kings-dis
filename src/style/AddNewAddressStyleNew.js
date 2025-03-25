import { Dimensions, Platform, PixelRatio } from 'react-native';

const React = require('react-native');
const { width: WIDTH, height: height } = Dimensions.get('window');
const { StyleSheet } = React;
import { Fonts } from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from '../style/FontSize';

module.exports = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleTxt: {
    fontSize: hp('2.2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    alignSelf:'flex-start'
    //textAlign: 'center',
  },
  contactTitle: {
    width: '55%',
    height: hp('3'),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleView: {
    width: '100%',
    height: hp('3'),
    alignSelf: 'flex-start',
    flexDirection:'row',
    marginLeft: wp('3.5'),
    marginTop:hp('0.2')
  },


 
});
