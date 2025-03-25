import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Styles from '../../style/ProductCatStyle';
import {connect} from 'react-redux';

import Back from '../common/Back';

import BarCodeSection from '../BarCodeSection';

import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
// import {getSelectedTileTxt} from '../actions/HomeScreenAction';
import {FlatGrid} from "react-native-super-grid";
import SearchBar from '../helperComponents/SearchBar';

import CustomSpinner from "../common/CustomSpinner";
import { store } from '../../../configureStore';

import { showMessage } from "react-native-flash-message";

import { getQrCode } from '../QROperations/QRProductScanner';
import {getSubcategories} from "../../actions/ProductCategoryAction";

const filter = require('../../assets/barcode.png');
const closeIcon = require("../../assets/close-outline.png");
const noImage = require("../../assets/noimage.png");
let widthp = wp('100');

const { ids, styles } = Styles;

class ProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryItems: [],
      barCodePanel: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    store.dispatch({ type: "CustomSpinner:SHOW" });
    getSubcategories(this.props.route.params.categoryAlias, 2, false)
      .then((data) => {
        this.setState({
          categoryItems: data,
        });
        store.dispatch({ type: "CustomSpinner:HIDE" });
      })
      .catch((error) => {
        store.dispatch({ type: "CustomSpinner:HIDE" });
      });
  }

  handleQrCode = async (e) => {
    // setQuery(e.data);
    getQrCode(e, this.props.navigation);
    this.setState({
      barCodePanel: false,
    });
    // setShow(0)
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
       
          //this.props.getSelectedTileTxt(item.name);
          //this.props.getsubCategories(this.props.loginToken, item.alias);
          // Actions.productSubcategory({categoryName: item.name, categoryAlias: item.alias});
          this.props.navigation.navigate("productSubcategories", {
            categoryName: item.name,
            categoryAlias: item.alias,
          });
        }}
        style={styles.item2}
      >
        <View
          style={{
            width: "100%",
            height: "77%",
            marginTop: "0%",
            alignItems: "center",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* <Image source={flower} style={styles.itemImage} /> */}
          <Image source={item.imageUrl == null ? noImage : { uri: item.imageUrl }} style={styles.itemImage} />
        </View>
        <View style={styles.cardMainTxtView1}>
          <View style={{ marginTop: hp("1") }}>
            <View style={styles.cardSubTxtView}>
              <Text
                numberOfLines={1}
                style={styles.cardSubMainTxt}
                allowFontScaling={false}
              >
                {item.name}
              </Text>
              <Text style={styles.cardSubTxt} allowFontScaling={false}></Text>
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
    const { preseasonStatus } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomSpinner />
          {this.state.barCodePanel ? (
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    barCodePanel: false,
                  })
                }
                style={{
                  width: wp('5'),
                  height: hp('5'),
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image source={closeIcon} style={styles.filterIcon} />
              </TouchableOpacity>
              <BarCodeSection getQrCode={this.handleQrCode} />
            </View>
          ) : null}

<View style={{width:'100%',flexDirection:'row'}}>
  <View style={{width:'50%',justifyContent:'center'}}>
  <Back />
  </View>
  <View style={{width:'65%',alignItems:'flex-end',justifyContent:'flex-end',paddingRight:10}}>
  <View style={styles.preseasonView}>
                  <Text style={styles.preseasonTxt} allowFontScaling={false}>
                    { preseasonStatus.preSeasonToggle ? 'Pre-season - On' : 'Pre-season - Off' }
                  </Text>
                </View>
  </View>

                
</View>
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
              <SearchBar />
            </View>

            <View>
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={() =>
                  this.setState({
                    barCodePanel: true,
                  })
                }
              >
                <Image source={filter} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleTxt} allowFontScaling={false}>
              {this.props.route.params.categoryName}
            </Text>
          </View>
          <View style={{ height: hp("69%") }}>
            {widthp > 450 ? (
              <FlatGrid
                itemDimension={wp("22")}
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
     preseasonStatus: state.checkout,
    // categoryItem: state.home.categoryItem,
  };
};

export default connect(
    mapStateToProps, {
      //getsubCategories,
      // getSelectedTileTxt
      getQrCode
    },
)(ProductCategories);
