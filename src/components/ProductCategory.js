//TODO this component not in use anymore. remove later.
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Styles from '../style/ProductCatStyle';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';
import Back from './common/Back';
import getBaseUrl from "../url/getBaseUrl";
import BarCodeSection from "./BarCodeSection";

import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
// import {getSelectedTileTxt} from '../actions/HomeScreenAction';
import {FlatGrid} from "react-native-super-grid";
import SearchBar from './helperComponents/SearchBar';
import {getCategories} from "../url/API";
import CustomSpinner from "./common/CustomSpinner";
import {store} from '../../configureStore';

import { getQrCode } from '../actions/BarcodeAction.js';

const search = require('../assets/search-green.png');
const filter = require('../assets/barcode.png');
const flower = require('../assets/pd-flower6.png');
const closeIcon = require("../assets/close-outline.png");

const { ids, styles } = Styles;

let widthp = wp('100');

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryItems: [],
      barCodePanel : false
    };
  }

  componentDidMount() {
    console.log(this.props);
    store.dispatch({type:'CustomSpinner:SHOW'});
    getCategories()
        .then((data) => {
          this.setState({
            categoryItems: data
          });
          store.dispatch({type:'CustomSpinner:HIDE'});
        })
        .catch((error) => {
          store.dispatch({type:'CustomSpinner:HIDE'});
        });
  }



  
   

  renderRow = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item);
          //this.props.getSelectedTileTxt(item.name);
          //this.props.getsubCategories(this.props.loginToken, item.alias);
          // Actions.productSubcategory({categoryName: item.name, categoryAlias: item.alias});
          this.props.navigation.navigate('productSubcategory', { categoryName: item.name, categoryAlias: item.alias })
        }}
        style={styles.item2}>
        <View
          style={{
            width: '100%',
            height: '77%',
            marginTop: '0%',
            alignItems: 'center',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            overflow: "hidden",
          }}>
          {/* <Image source={flower} style={styles.itemImage} /> */}
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        </View>
        <View style={styles.cardMainTxtView1}>
          <View style={{ marginTop: hp('1') }}>
            <View style={styles.cardSubTxtView}>
              <Text
                numberOfLines={1}
                style={styles.cardSubMainTxt}
                allowFontScaling={false}>
                {item.name}
              </Text>
              <Text style={styles.cardSubTxt} allowFontScaling={false}>

              </Text>
            </View>
          </View>


        </View>

      </TouchableOpacity>
    );
  };

  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomSpinner/>
        {
          this.state.barCodePanel ? ( 
          <View >
            <TouchableOpacity
            onPress={()=> this.setState({
              barCodePanel: false
            })}
             style={{
              width:wp('5'), 
              position:'absolute',  
              height:hp('5'),
              right:0,
              alignItems:'center',
              justifyContent:'center'
            }}
            >
              <Image source={closeIcon} style={styles.filterIcon} />
            </TouchableOpacity>
             <BarCodeSection getQrCode={this.handleQrCode} />
          </View>
         
          ) : null  
        }

         
          <Back />
          <View style={styles.searchView}>
            {/* <View style={styles.searchInput}>
              <Image source={search} style={styles.searchIcon} />
              <TextInput
                allowFontScaling={false}
                style={styles.TxtInput}
                placeholderTextColor="#93999c"
              />
            </View> */}
              <View style={styles.searchViewInside1}>
                <SearchBar/>
              </View>


              <View >
                <TouchableOpacity
                  style={styles.filterBtn}
                  onPress={()=> this.setState({
                    barCodePanel : true
                  })}
                >
                  <Image source={filter} style={styles.filterIcon} />
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt} allowFontScaling={false}>
              Product Categories
            </Text>
          </View>
          <View style={{ height: hp("69%")}}>
          {widthp > 450 ? (
                <FlatGrid
                itemDimension={wp('22')}
               data={this.state.categoryItems}
               style={sty.gridView}
               spacing={hp("1")}
               keyExtractor={(item, index) => index.toString()}
               renderItem={this.renderRow}
             />
              ) : (
                <FlatGrid
                itemDimension={150}
               data={this.state.categoryItems}
               style={sty.gridView}
               spacing={hp("1")}
               keyExtractor={(item, index) => index.toString()}
               renderItem={this.renderRow}
               />
              )}

          </View>

          {/* <ScrollView style={{ height: '100%', width:'94%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist1}
              data={this.props.categoryItem}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              numColumns={4}

            />
          </ScrollView> */}
          
        </View>
      </SafeAreaView>

    );
  }
}

const sty = StyleSheet.create({
  gridView: {
    width: wp("97%"),
    flex: 1,
    height: hp("70%"),
  },
});


const mapStateToProps = state => {
  return {
     loginToken: state.login.loginToken,
    // categoryItem: state.home.categoryItem,
  };
};

export default connect(
    mapStateToProps, {
      //getsubCategories,
      // getSelectedTileTxt
      getQrCode
    },
)(ProductCategory);
