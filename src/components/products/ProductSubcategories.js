import React, { Component } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Styles from "../../style/ProductSubcatStyle";
import { connect } from "react-redux";
import Back from "../common/Back";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
// import {getFilterData, getSelectedTileTxt} from "../actions/HomeScreenAction";
import SearchBar from "../helperComponents/SearchBar";
import { FlatGrid } from "react-native-super-grid";
import { getQrCode } from "../QROperations/QRProductScanner";
import CustomSpinner from "../common/CustomSpinner";
import { store } from '../../../configureStore';

import CustomBreadCrumb from "../helperComponents/CustomBreadCrumb";

import { showMessage } from "react-native-flash-message";

import BarCodeSection from "../BarCodeSection";
import {getSubcategories} from "../../actions/ProductCategoryAction";
const filter = require('../../assets/barcode.png');
const closeIcon = require("../../assets/close-outline.png");
const noImage = require("../../assets/noimage.png");
let widthp = wp('100');
const { ids, styles } = Styles;
class ProductSubcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategoryItems: [],
      barCodePanel: false,

      catalogue: '',
      department: '',



    };
  }

  componentDidUpdate(prevProps) {
    console.log("sub cat...");
    if (prevProps.route != this.props.route) {
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {


    const NodeAliasPath = this.props.route.params.categoryAlias.split('/');


    this.setState({ catalogue: NodeAliasPath[0] })
    this.setState({ department: NodeAliasPath[1] })
    this.setState({
      subcategoryItems: [],
    });

    store.dispatch({ type: "CustomSpinner:SHOW" });
    getSubcategories(this.props.route.params.categoryAlias, 3, false)
      .then((data) => {
        this.setState({
          subcategoryItems: data,
        });
        store.dispatch({ type: "CustomSpinner:HIDE" });
      })
      .catch((error) => {
        store.dispatch({ type: "CustomSpinner:HIDE" });
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
          this.props.navigation.navigate("productSubFilterCategory", {
            categoryName: item.name,
            subcatNodeAliasPath: item.nodeAliasPath,
          });
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

          {/* <View style={styles.searchView}> */}
            <CustomBreadCrumb
              catalogue={this.state.catalogue}
              department={this.state.department}
              upto={0} // 0 - CATLOGUE, 1 - DEPARTMENT, 2 - CATEGORY, 3 - SUB CATEGORY
            />
          {/* </View> */}


          <View style={styles.titleView}>
            <Text style={styles.titleTxt} allowFontScaling={false}>
              {/*{this.props.titleName}*/}
              {this.props.route.params.categoryName}
            </Text>
          </View>

          <View style={styles.flatlist1}>
            <View style={styles.listView}>
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
     preseasonStatus: state.checkout,
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
