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
  container: {
    //flex: 1,
    width: WIDTH,
    height: '100%',
    backgroundColor: 'transparent',
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
    marginTop: hp('2%'),
  },
  searchInput: {
    width: '80%',
    height: hp('6'),
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchInput2: {
    width: '80%',
    height: hp('6'),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2'),
    marginBottom:hp('2')
  },
  filtitle:{
    flexDirection: 'row', 
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: '5%',
  },
  searchIcon2: {
    width: wp('24'),
    height: hp('6'),
     marginLeft: wp('27'),
  },
  TxtInput: {
    width: '80%',
    height: hp('7'),
    fontSize: hp('2'),
    fontWeight: 'bold',
    // backgroundColor: 'red',
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
  titleView: {
    width: '85%',
    height: hp('6'),
    //backgroundColor: 'yellow',
    //marginLeft: '5%',
    marginTop: hp('2'),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: '30%',
  },
  titleTxt: {
    fontSize: hp('2.3'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    marginLeft: wp('-2'),
    //textAlign: 'center',
  },
  cardHeadTxt: {
    fontSize: hp('1.8'),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'black',
    //textAlign: 'center',
  },
  cardBodyTxt: {
    fontSize: hp('1.6'),
    fontFamily: Fonts.PoppinsMedium,
    color: 'gray',
    //textAlign: 'center',
  },
  cardFooterTxt: {
    fontSize: hp('2'),
    fontFamily: Fonts.PoppinsBold,
    color: 'rgba(44, 130, 201, 1)',
    //textAlign: 'center',
  },
  item: {
    marginBottom: 10,
    width: wp('40'),
    height: hp('30'),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    // alignItems: 'center',
    marginHorizontal: wp('2'),
    //paddingLeft: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 2,
    margin: 5,
    marginTop: hp('1.2'),
    alignSelf:'center',
  
  },
  flatlist: {
    flexGrow: 0,
   
    //marginTop: '2%',
    //backgroundColor: 'red',
    width: '88%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //padding: 3,
    //borderRadius: 10,
    // left: '8%',
  },
});
