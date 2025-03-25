//TODO this component not in use anymore. remove later.
import React, { Component } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Styles from "../style/ProductSubcatStyle";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
// import {getFilterData, getSelectedTileTxt} from "../actions/HomeScreenAction";
import SearchBar from "./helperComponents/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import { getSubcategories } from "../url/API";
import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { Actions } from "react-native-router-flux";
import getBaseUrl from "../url/getBaseUrl";
const search = require("../assets/search-green.png");
import { getQrCode } from "./QROperations/QRProductScanner";
import BarCodeSection from "./BarCodeSection";

const filter = require("../assets/barcode.png");
const arrow = require("../assets/left-arrow.png");
const flower = require('../assets/calendars.jpg');
let widthp = wp('100');
const closeIcon = require("../assets/close-outline.png");
const { ids, styles } = Styles;
class ProductSubcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategoryItems: [],
      barCodePanel : false
    };
  }

  componentDidUpdate(prevProps) {
    console.log('sub cat...')
    if (prevProps.route != this.props.route) {
      this.loadData()
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    store.dispatch({ type: 'CustomSpinner:SHOW' });
    getSubcategories(this.props.route.params.categoryAlias)
      .then((data) => {
        this.setState({
          subcategoryItems: data
        });
        store.dispatch({ type: 'CustomSpinner:HIDE' });
      })
      .catch((error) => {
        store.dispatch({ type: 'CustomSpinner:HIDE' });
      });
  }

  // getItemData(nodeAlias) {
  //   this.props.getFilterData(this.props.loginToken, nodeAlias);
  //   // setTimeout(() => {
  //   //   console.log('mmm : ' + this.props.filterDataSkuid);
  //   //   this.props.getProduct(this.props.loginToken, this.props.filterDataSkuid);
  //   //   }, 1000);

  // }

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
        activeOpacity={0.9}
        style={styles.item2}
        onPress={() => {
          // Actions.productGrid({subcatName: item.name, subcatNodeAliasPath: item.nodeAliasPath});
          this.props.navigation.navigate('productGrid', { subcatName: item.name, subcatNodeAliasPath: item.nodeAliasPath })

        }}
      >
        <View
          style={{
            width: "100%",
            height: "77%",
            marginTop: "0%",
            //backgroundColor: 'green',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* <Image source={flower} style={styles.itemImage} /> */}
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
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
          <Back />
          {/* <View style={styles.backView}>
        <TouchableOpacity activeOpacity={0.9}
          style={styles.backBtn}
          onPress={() => {
            Actions.productCategory();
          }}
        >
          <Image source={arrow} style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View> */}
          <View style={styles.searchView}>
            {/* <View style={styles.searchInput}>
              <Image source={search} style={styles.searchIcon} />
              <TextInput
                allowFontScaling={false}
                style={styles.TxtInput}
                placeholderTextColor="#93999c"
              />
            </View>
            <TouchableOpacity activeOpacity={0.9}
              style={styles.filterBtn}
            // onPress={() => {
            //   Actions.filter();
            // }}
            >
              <Image source={filter} style={styles.filterIcon} />
            </TouchableOpacity> */}
            <View style={styles.searchViewInside1}>
              <SearchBar />
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.filterBtn}
                // onPress={() => {
                //   Actions.filter();
                // }}
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
              {/*{this.props.titleName}*/}
              {this.props.route.params.categoryName}
            </Text>
          </View>

          <View style={styles.flatlist1}>
            <View style={{ height: hp("69%") }}>
              {widthp > 450 ? (
                <FlatGrid
                  itemDimension={wp("22")}
                  data={this.state.subcategoryItems}
                  style={sty.gridView}
                  spacing={hp("1")}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderRow}
                />
              ) : (
                <FlatGrid
                  itemDimension={150}
                  data={this.state.subcategoryItems}
                  style={sty.gridView}
                  spacing={hp("1")}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderRow}
                />
              )}
            </View>

            {/* <ScrollView style={{ height: '100%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.subcategoryItem}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              numColumns={4}

            />
          </ScrollView> */}
          </View>
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

const mapStateToProps = (state) => {
  return {
     loginToken: state.login.loginToken,
    // subcategoryItem: state.home.subcategoryItem,
    // titleName: state.home.titleName,
    // filterDataSkuid: state.home.filterDataSkuid,
  };
};

export default connect(mapStateToProps, {
  // getProduct,
  // getSelectedTileTxt,
  // getFilterData,
})(ProductSubcategory);
