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
import Styles from '../style/ProductListStyle';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getProductDetails} from '../actions/HomeScreenAction';
import * as colors from '../style/Common/ColorsStyle';


const search = require('../assets/search-green.png');

const filter = require('../assets/barcode.png');
const grid = require('../assets/girdList.png');
const list = require('../assets/whiteList.png');
const btnFilter = require('../assets/filter.png');
const cart = require('../assets/cartGreen.png');
const arrow = require('../assets/left-arrow.png');


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderRow = ({item}) => {

    return (
      <View style={{width: wp('90') }}>
        <TouchableOpacity activeOpacity={0.9}
          style={Styles.footerCardView}
          onPress={() => {
            this.props.getProductDetails(this.props.loginToken, item.skuid);
          }}>
          <View style={Styles.cardImgView}>
            <Image source={{uri: item.imageurl}} style={Styles.cardSubImg} />
          </View>
          <View style={Styles.cardMainTxtView}>
            <View style={Styles.cardSubTxtView}>
              <Text
                style={Styles.cardSubMainTxt}
                numberOfLines={1}
                allowFontScaling={false}>
                {item.name}
              </Text>

            </View>
            <View>
            <Text style={Styles.packtxt} allowFontScaling={false}>Pack Size: {' '}</Text>
              <Text style={Styles.cardSubTxt3} allowFontScaling={false}>
              {item.skuPackSize}</Text>
              </View>
            <View style={Styles.cardSubTxtView2}>
              <Text style={Styles.cardSubTxt} allowFontScaling={false}>
              Code : {item.code}
              </Text>
              <Text style={Styles.stocktxt} allowFontScaling={false}>Stock :</Text>
              <Text style={Styles.cardSubTxt2} allowFontScaling={false}>
              In Stock
            </Text>
            </View>
            <View style={Styles.cardSubTxtView3}>
              <Text style={Styles.priceTxt} allowFontScaling={false}>
              {item.skuprice1extax}
              </Text>
              {/* <TouchableOpacity activeOpacity={0.9}
              style={Styles.cart}
              onPress={() => {
                this.props.getProductDetails(this.props.loginToken, item.skuid);
              }}
            >
              {/* <Image source={cart} style={Styles.cartIcon} />
              <Text style={Styles.cartText}>
                View
              </Text>

              {/* <TextInput
                allowFontScaling={false}
                style={Styles.cartText}
                placeholder={'Add'}
                placeholderTextColor="#1ED18C"
              />
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>

    </View>
    );
  };
  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={Styles.container}>
          
          <View style={Styles.backView}>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.backBtn}
              onPress={() => {
                this.props.navigation.navigate('productSubcategory');
              }}>
              <Image source={arrow} style={Styles.backIcon} />
              <Text style={Styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.searchView}>
            <View style={Styles.searchInput}>
              <Image source={search} style={Styles.searchIcon} />
              <TextInput
                allowFontScaling={false}
                style={Styles.TxtInput}
                placeholderTextColor="#93999c"
              />
            </View>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.filterBtn}
              // onPress={() => {
              //   this.props.navigation.navigate('filter');
              // }}
            >
              <Image source={filter} style={Styles.filterIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.bodyView}>
            <View style={Styles.titleView}>
              <Text style={Styles.titleTxt} allowFontScaling={false}>
              {this.props.titleName}
              </Text>
            </View>

            <View style={Styles.CardDetail}>
              {/* <TouchableOpacity activeOpacity={0.9} style={Styles.CardDetail1}>
                <View style={Styles.detailContent}>
                  <Text style={Styles.title}>All</Text>
                </View>
              </TouchableOpacity> */}

              {/* <TouchableOpacity activeOpacity={0.9} style={Styles.CardDetail2}>
                <View style={Styles.detailContent}>
                  <Text style={Styles.title1}>Collections</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={Styles.CardDetail2}>
                <View style={Styles.detailContent}>
                  <Text style={Styles.title1}>Best Sellers</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={Styles.CardDetail2}>
                <View style={Styles.detailContent}>
                  <Text style={Styles.title1}>Brands</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity activeOpacity={0.9}
              style={Styles.filter}
              // onPress={() => {
              //   this.props.navigation.navigate('filter');
              // }}
            >
              <Image source={btnFilter} style={Styles.filIcon} />
              <TextInput
                allowFontScaling={false}
                style={Styles.filterText}
                placeholder={'Filter'}
                placeholderTextColor={colors.primaryColor}
              />
              {/* <Text style={Styles.filterText} >Filter</Text> */}
            </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9}
              style={Styles.gridBtn}
              onPress={() => {
                this.props.navigation.navigate('productGrid');
              }}
            >
              <Image source={grid} style={Styles.gridIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9}
              style={Styles.listBtn}
              onPress={() => {
                this.props.navigation.navigate('productList');
              }}
            >
              <Image source={list} style={Styles.listIcon} />
            </TouchableOpacity>
            </View>

          </View>
          <ScrollView style={{height: '100%', marginTop:wp('-15'),marginBottom:hp('12')}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={Styles.flatlist}
            data={this.props.filterData}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
          </ScrollView>

          
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    productItem: state.home.productItem,
    titleName: state.home.titleName,
    filterData: state.home.filterData,
  };
};

export default connect(mapStateToProps, {
  getProductDetails,
})(ProductList);
