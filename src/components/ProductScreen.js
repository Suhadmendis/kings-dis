import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Styles from '../style/ProductScreenStyle';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Header from './common/Header';
import {SliderBox} from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';
import {
  getCategories,
  getProduct,
  getItemDescription,
  getItemImage,
  getItemName,
  getItemPrice,
  getItemWeight,
} from '../actions/HomeScreenAction';

import {BallIndicator} from 'react-native-indicators';
import Spinner from 'react-native-loading-spinner-overlay';

const search = require('../assets/search.png');
const filter = require('../assets/filterIcon.png');
const gear = require('../assets/gear.png');
const pump = require('../assets/pump.png');
const logo = require('../assets/gear.png');
const no = require('../assets/no_image.jpg');
const filter2 = require('../assets/no_image.jpg');

class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTxt: 'Hydraulic Pumps',
    };
  }

  getItemData(name, image, description, price, weight) {
    this.props.getItemName(name);
    this.props.getItemImage(image);
    this.props.getItemDescription(description);
    this.props.getItemPrice(price);
    this.props.getItemWeight(weight);
    this.props.navigation.navigate('itemDetail');
  }

  renderRow = ({item}) => {
    console.log(item.skuimageurl);
    return (
      <TouchableOpacity activeOpacity={0.9}
        style={Styles.item}
        onPress={() => {
          console.log(item);
          this.getItemData(
            item.skunumber,
            item.skuimageurl,
            item.skuname_enGB,
            item.skuprice,
            item.skuweight,
          );
        }}>
        <View
          style={{
            width: '45%',
            height: '45%',
            marginTop: '8%',
            //backgroundColor: 'green',
            alignItems: 'center',
          }}>
            {/* <Image source={no} style={Styles.itemImage} /> */}
          <Image source={{uri: item.skuimageurl}} style={Styles.itemImage} />
        </View>
        <View
          style={{
            width:'90%',
            height: 20,
            //backgroundColor: 'yellow',
            marginTop: '5%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={Styles.cardHeadTxt} allowFontScaling={false}>
            {item.skunumber}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 35,
            //backgroundColor: 'red',
            marginTop: '2%',
            alignItems: 'flex-start',
            marginBottom:'3%',
            justifyContent: 'flex-start',
          }}>
          <Text style={Styles.cardBodyTxt} allowFontScaling={false}>
            {item.skuname_enGB}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 25,
            //backgroundColor: 'red',
            marginTop: '2%',
            
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Text style={Styles.cardFooterTxt} allowFontScaling={false}>
            £ {item.skuprice}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={Styles.container}>
          
          <View style={Styles.searchView}>
            <View style={Styles.searchInput}>
              <Image source={search} style={Styles.searchIcon} />
              <TextInput
                allowFontScaling={false}
                style={Styles.TxtInput}
                placeholder={'Search'}
                placeholderTextColor="gray"
              />
            </View>
            <View style={Styles.filterBtn}>
              <Image source={filter} style={Styles.filterIcon} />
            </View>
          </View>

          <View style={Styles.searchInput2}>
              <Text style={Styles.titleTxt} allowFontScaling={false}>
              {this.props.titleName}
            </Text>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.navigate('filter');
              }}>
            <Image source={filter2} style={Styles.searchIcon2} />
            </TouchableOpacity>
            </View>
            
          <FlatList
            showsVerticalScrollIndicator={false}
            style={Styles.flatlist}
            data={this.props.productItem}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            numColumns={2}
          
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    productItem: state.home.productItem,
    titleName: state.home.titleName,
  };
};

export default connect(
  mapStateToProps,
  {
    
    getCategories,
    getProduct,
    getItemDescription,
    getItemImage,
    getItemName,
    getItemPrice,
    getItemWeight,
  },
)(ProductScreen);
