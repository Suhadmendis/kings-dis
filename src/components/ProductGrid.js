import React, { Component } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "../style/ProductGridStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
// import { getProductDetails } from "../actions/HomeScreenAction";
import DeviceInfo from "react-native-device-info";
import FilterDrawer from "./FilterDrawer";
import Drawer from "react-native-drawer";
import SearchBar from "./helperComponents/SearchBar";
import getBaseUrl from "../url/getBaseUrl";
import { getFilterData, getFilters } from "../url/API";
import { store } from "../../configureStore";
import CustomSpinner from "./common/CustomSpinner";
import BarCodeSection from "./BarCodeSection";
import { showMessage } from "react-native-flash-message";
import DataAdapter from "../offline/localData/DataAdapter";
import { getQrCode } from "./QROperations/QRProductScanner";
import {GetListPageProducts} from '../actions/ProductCategoryAction'
import CustomBreadCrumb from "./helperComponents/CustomBreadCrumb";
import * as colors from '../style/Common/ColorsStyle';

const search = require("../assets/search-green.png");

const filter = require("../assets/barcode.png");
const gridActive = require("../assets/gridView.png");
const grid = require("../assets/girdList.png");
const listActive = require("../assets/list-outline2xwhite.png");
const list = require("../assets/list-outline2x.png");
const btnFilter = require("../assets/filter.png");
const cart = require("../assets/cartGreen.png");
const arrow = require("../assets/left-arrow.png");
const closeIcon = require("../assets/close-outline.png");

const noimg = require('../assets/noimage.png')

const { ids, styles } = Styles;

let widthp = wp("100");

async function getPictorialPackSize(skuId) {
  const payload = {
    section: "PRODUCT DETAILS",
    opration: "GET PICTORIAL PACK SIZE",
    data: skuId,
  };

  console.log(payload);

  const newpro = await DataAdapter(payload);
  return newpro;
}

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    // this.state = {};


    this.state = {
      filteredDataSet: [],
      ltoken: "blank",
      loading: true,
      resData: [],
      searchResData: [],
      offset: 0,
      pagesize: 36,
      selectedstore: 1,
      scrollBegin: false,
      viewType: "GRID",
      columnCount: 3,
      sortBy: 'SKUName',
      filterDataState: [],

      barCodePanel : false,

      catalogue: '',
      department: '',
      category: '',
    };
    console.log('route....', this.props.route)
  }

  componentDidUpdate(prevProps) {


    //     console.log(this.props.filterData);
    //     store.dispatch({ type: "CustomSpinner:SHOW" });
    //     getFilterData(this.props.subcatNodeAliasPath, [], "ct.SKUName", 1, 100)
    //       .then((data) => {
    //         store.dispatch({
    //           type: "GET_FILTER_DATA_USING_NAME",
    //           payload: data.products,
    //           nodeAliasPath: this.props.subcatNodeAliasPath,
    //           filterOptions: [],
    //           sortBy: "ct.SKUName",

    if (prevProps.route != this.props.route) {
      this.loadData();
    }

  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    store.dispatch({ type: "CustomSpinner:SHOW" });

    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    const NodeAliasPath = this.props.route.params.subcatNodeAliasPath.split('/');


    
    this.setState({ catalogue: NodeAliasPath[0] })
    this.setState({ department: NodeAliasPath[1] })
    this.setState({ category: NodeAliasPath[2] })

    GetListPageProducts(this.props.route?.params?.subcatNodeAliasPath, [], this.state.sortBy, 1, 100, internetConnectivity).then((data)=>{
      console.log('----------------------------------'); 
      console.log(data.length);
      console.log('----------------------------------'); 
        this.setState({
          filterDataState: data
        })
    })

    // let promises = [
    // //  getFilters(this.props.route?.params?.subcatNodeAliasPath, [], this.state.sortBy, 1, 100),
    //   getFilterData(this.props.route?.params?.subcatNodeAliasPath, [], this.state.sortBy, 1, 100),
    // ];
    // Promise.all(promises)
    //   .then((data) => {
    //     let products = [];

    //     for (let i = 0; i < data[1].products.length; i++) {
    //       const item = data[1].products[i];

    //       let dueDate = item.skuinstorefrom.split(' ')[0];
    //       dueDate = dueDate.replace('/','-');
    //       dueDate = dueDate.replace('/','-');
      
    //       let pictorial ="B";
    //       getPictorialPackSize(item.skuid).then((res) => {
    //         if (res[0] == "A") {
    //           console.log('loop ='+ res[0]);
    //           pictorial = "A";
    //         }
    //       });

    //       let obj = {
    //         ...item,
    //         pictorial : pictorial,
    //         dueDate: dueDate
    //       } 

    //       products.push(obj)
    //     }

    //     this.setState({
    //       filterDataState: products
    //     })
    //     store.dispatch({
    //       type: "GET_FILTER_DATA_USING_NAME",
    //       payload: products,
    //       nodeAliasPath: this.props.route?.params?.subcatNodeAliasPath,
    //       filterOptions: data[0],
    //       sortBy: this.state.sortBy,
    //     });
    //     store.dispatch({ type: "CustomSpinner:HIDE" });
    //   })
    //   .catch((error) => {
    //     store.dispatch({ type: "CustomSpinner:HIDE" });

    //   });
  }

  componentWillUnmount() {
    // clear data. otherwise we can see this data while loading a different subcategory.
    store.dispatch({
      type: "GET_FILTER_DATA_USING_NAME",
      payload: [],
      nodeAliasPath: this.props.route?.params?.subcatNodeAliasPath,
      filterOptions: {},
      sortBy: this.state.sortBy,
    });
  }

  renderRowGrid = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.item2}
        key={item.count}
        onPress={() =>
          this.props.navigation.navigate('productDetails', { SkuId: item.skuid })
        }
      >
        <View
          style={{
            width: "100%",
            height: "55%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* <Image source={no} style={styles.itemImage} /> */}
          {
            item.imageurl == '' ? ( <Image source={noimg} style={styles.itemImage} />) : ( <Image source={{ uri: item.imageurl }} style={styles.itemImage} />)
          }
         
        </View>
        <View style={styles.cardMainTxtView1}>
          <View>
            <View style={styles.cardSubTxtView}>
              <Text
                numberOfLines={2}
                style={styles.cardSubMainTxt}
                allowFontScaling={false}
              >
                {item.name}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: hp("0.1%") }}>
            <View style={styles.cardSubTxtView2}>
              <Text style={styles.cardSubTxt} allowFontScaling={false}>
                Code: {item.code}
              </Text>
            </View>
            {/*<View style={styles.cardSubTxtView4}>
              <Text style={styles.packtxt} allowFontScaling={false}>
                Pack Size:{" "}
              </Text>
              <Text style={styles.cardSubTxt1} allowFontScaling={false}>
                {item.packsize}
              </Text>
            </View>*/}
            <View style={styles.cardSubTxtView5}>
              <Text style={styles.stocktxt} allowFontScaling={false}>
                Stock:{" "}
              </Text>
              {item.availability === true ? (
                item.pictorial === "A" ? (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                  {item.skuavailableitems} {wp('100')>450 ?'Items' : null }
                 </Text>
                ): (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                  In stock
                 </Text>
                )
               
              ) : (
                <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                  {
                    item.pictorial === "A" ? ('0') : ('Out of Stock')
                  }
                </Text>
              )}
              
            </View>

            {item.availability === false && item.pictorial === "A" ? (
              <View style={styles.cardSubTxtView5}>
              <Text style={styles.stocktxt} allowFontScaling={false}>
                Due:{" "}
              </Text>
              <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                 {item.dueDate}
                </Text>
              
            </View>

            ) : (
                null
              )}

            
            {/* <View style={[styles.cardSubTxtView2, (pictorial == true && item.availability == false) ? null : {display:'none'}]}>
              <Text style={styles.cardSubTxt} allowFontScaling={false}>
                Due: {item.approxDueAvailability}
              </Text>
            </View> */}
            <View style={styles.cardSubTxtView3}>
              <Text style={styles.priceTxt} allowFontScaling={false}>
                {item.skuprice1extax} 
              </Text>
              {/* <TouchableOpacity activeOpacity={0.9}
                style={styles.cart}
                onPress={() => {
                  this.props.getProductDetails(this.props.loginToken, item.skuid);
                }}
              >
                <Text style={styles.cartText}>View</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderRowList = ({ item }) => {
    return (
      <View
        style={{
          width: "100%",
          marginTop: hp("1"),
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.footerCardViewList}
          onPress={() => {
            // Actions.currentScene !== "productDetails"
            //   ? Actions.productDetails({ SkuId: item.skuid })
            //   : {}
            this.props.navigation.navigate('productDetails', { SkuId: item.skuid });
          }}
        >
          <View style={styles.cardImgView}>
            {
              item.imageurl == '' ? (<Image source={noimg} style={styles.cardSubImg} />) : (<Image source={{ uri: item.imageurl }} style={styles.cardSubImg} />)
            }
            
          </View>
          <View style={styles.cardMainTxtView}>
            <View style={styles.cardSubTxtViewList}>
              <Text
                style={styles.cardSubMainTxtList}
                numberOfLines={1}
                allowFontScaling={false}
              >
                {item.name}
              </Text>
            </View>

            <View
              style={{ width: "100%", height: hp("3"), flexDirection: "row", marginTop: hp('1') }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.cardSubTxtView} allowFontScaling={false}>
                  Code: {item.code}
                </Text>
              </View>
              <View
                style={styles.packsizeItems}
              >
                {/*<View style={{ flexDirection: "row" }}>
                  <Text style={styles.stocktxt} allowFontScaling={false}>
                    Pack Size:{" "}
                  </Text>
                  <Text style={styles.cardSubTxt3View} allowFontScaling={false}>
                    {item.packsize}
                  </Text>
                </View>*/}

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.stocktxt} allowFontScaling={false}>
                    Stock:{" "}
                    {item.availability === true ? (
                          item.pictorial == "A" ? (
                            <Text style={styles.cardSubTxt2List} allowFontScaling={false}>
                              {item.skuavailableitems} {wp('100')>450 ?'Items' : null }
                            </Text>
                          ) :(
                            <Text style={styles.cardSubTxt2List} allowFontScaling={false}>
                             In Stock
                            </Text>
                          )
                  ) : (
                    <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                      {
                        item.pictorial == "A" ? ('0') :('Out of Stock') 
                      }
                     
                    </Text>
                  )}
                  </Text>

                  {item.availability == false && item.pictorial == "A" ? (
                      <Text style={[styles.stocktxt, (item.availability == false) ? null  :{display:'none'} ]} 
                      allowFontScaling={false}>
                         Due: {item.dueDate}
                      </Text>
                    ) : (
                      null
                      )}
                </View>
              </View>
            </View>
            <Text style={styles.priceTxtView} allowFontScaling={false}>
              {item.skuprice1extax}
            </Text>
            {/* <View
              style={{ width: "100%", height: hp("3"), backgroundColor: "red" }}
            >
              <View>
                <Text style={styles.packtxtList} allowFontScaling={false}>
                  Pack Size:{" "}
                </Text>
                <Text style={styles.cardSubTxt3View} allowFontScaling={false}>
                  {item.skuPackSize}
                </Text>
              </View>
              <View>
                <Text style={styles.stocktxtView} allowFontScaling={false}>
                  Stock :
                </Text>
                <Text style={styles.cardSubTxt2View} allowFontScaling={false}>
                  In Stock
                </Text>
              </View>
            </View> */}

            {/* <View style={styles.cardSubTxtView2List}>
              <Text style={styles.cardSubTxtView} allowFontScaling={false}>
                Code : {item.code}
              </Text>
            </View>
            <View style={styles.cardSubTxtView3View}>
              <Text style={styles.priceTxtView} allowFontScaling={false}>
                {item.skuprice1extax}
              </Text> */}
            {/* <TouchableOpacity activeOpacity={0.9}
              style={styles.cart}
              onPress={() => {
                this.props.getProductDetails(this.props.loginToken, item.skuid);
              }}
            >
              {/* <Image source={cart} style={styles.cartIcon} />
              <Text style={styles.cartText}>
                View
              </Text>

              {/* <TextInput
                allowFontScaling={false}
                style={styles.cartText}
                placeholder={'Add'}
                placeholderTextColor="#1ED18C"
              />
              </TouchableOpacity> */}
            {/* </View> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };


  handleQrCode = async (e) => {
    // setQuery(e.data);
    getQrCode(e, this.props.navigation);
    this.setState({
      barCodePanel: false,
    });
    // setShow(0)
  };

  
  render() {
    const { preseasonStatus } = this.props;
    return (
      <Drawer
        ref={(ref) => (this._drawer = ref)}
        type="overlay"
        content={<FilterDrawer fDrawer={this._drawer} />}
        tapToClose={true}
        side="right"
        openDrawerOffset={0.5} // 60% gap on the right side of drawer
        styles={drawerstyles}
      >
        {this.renderScreen(preseasonStatus)}
      </Drawer>
    );
  }

  renderScreen(preseasonStatus) {
    let isTablet = DeviceInfo.isTablet();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomSpinner />
          {/* <Header /> */}

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
            <View style={styles.searchViewInside1}>
              <SearchBar />
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.filterBtn}
                onPress={() =>
                  this.setState({
                    barCodePanel: true,
                  })
                }
                // onPress={() => {
                //   Actions.filter();
                // }}
              >
                <Image source={filter} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.searchView}> */}
            <CustomBreadCrumb  
              catalogue={this.state.catalogue} 
              department={this.state.department} 
              category={this.state.category} 
              upto={2} // 0 - CATLOGUE, 1 - DEPARTMENT, 2 - CATEGORY, 3 - SUB CATEGORY
            />
          {/* </View> */}
          <View style={styles.bodyView}>
            <View style={styles.titleView}>
              <Text style={styles.titleTxt} allowFontScaling={false}>
                {/*{this.props.titleName}*/}
                {this.props.route.params.subcatName}
              </Text>
            </View>

            <View style={styles.CardDetail}>
              {/* <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail1}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title}>All</Text>
                  </View>
                </TouchableOpacity> */}

              {/* <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail2}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title1}>Collections</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail2}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title1}>Best Sellers</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail2}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title1}>Brands</Text>
                  </View>
                </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.filter}
                onPress={() => {
                  this._drawer.open();
                }}
              >
                <Image source={btnFilter} style={styles.filIcon} />
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>

              {/* grid view button */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  this.state.viewType == "GRID"
                    ? styles.gridBtnActive
                    : styles.gridBtn
                }
                delayPressIn={0}
                onPress={() => {
                  // Actions.productList();
                  this.setState({ viewType: "GRID", columnCount: 3 });
                }}
              >
                <Image
                  source={this.state.viewType == "GRID" ? gridActive : grid}
                  style={styles.gridIcon}
                />
              </TouchableOpacity>

              {/* list view button */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  this.state.viewType == "LIST"
                    ? styles.listBtnActive
                    : styles.listBtn
                }
                delayPressIn={0}
                onPress={() => {
                  // Actions.productList();
                  this.setState({ viewType: "LIST", columnCount: 1 });
                }}
              >
                <Image
                  source={this.state.viewType == "LIST" ? listActive : list}
                  style={
                    this.state.viewType == "LIST"
                      ? styles.gridIcon
                      : styles.listIcon
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.gridPallet}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.flatlist}
              //data={this.props.filterData}
              data={this.state.filterDataState}
              renderItem={
                this.state.viewType == "GRID"
                  ? this.renderRowGrid
                  : this.renderRowList
              }
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              numColumns={this.state.columnCount}
              key={this.state.columnCount}
            />
          </View>

          {/* <ScrollView style={{height: '200%', width:'100%', marginTop:wp('-8'),marginBottom:hp('10')}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            data={this.props.filterData}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            numColumns={3}
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

const drawerstyles = {
  drawer: { shadowColor: colors.secColor, shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

const mapStateToProps = (state) => {
  return {
     loginToken: state.login.loginToken,
    // productItem: state.home.productItem,
    // titleName: state.home.titleName,
    preseasonStatus: state.checkout,
    filterData: state.home.filterData,
  };
};

export default connect(mapStateToProps, {
  // getProductDetails,
})(ProductGrid);
