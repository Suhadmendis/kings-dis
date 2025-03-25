import React, { Component } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "../style/ProductGridStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { getProductDetails } from '../actions/HomeScreenAction';
import DeviceInfo from "react-native-device-info";
import FilterDrawer from "./FilterDrawer";
import { Searchbar } from "react-native-paper";
import Drawer from "react-native-drawer";
import getBaseUrl from "../url/getBaseUrl";
import BarCodeSection from "./BarCodeSection";
import { getQrCode } from "./QROperations/QRProductScanner";
import ProductSearchAPI from "../offline/localData/serviceData/ProductsSearchAPI";
import getValidToken from "../offline/Token";

const search = require("../assets/search-green.png");

const filter = require("../assets/barcode.png");
const gridActive = require("../assets/gridView.png");
const grid = require("../assets/girdList.png");
const listActive = require("../assets/list-outline2xwhite.png");
const list = require("../assets/list-outline2x.png");
const btnFilter = require("../assets/filter.png");
const cart = require("../assets/cartGreen.png");
const arrow = require("../assets/left-arrow.png");

const noImage = require("../assets/noimage.png");
const closeIcon = require("../assets/close-outline.png");
import DataAdapter from "../offline/localData/DataAdapter"
import NetInfo from "@react-native-community/netinfo";
import * as colors from '../style/Common/ColorsStyle';

import {CProc_WEB_GetProductsForSearchForAutoCompleteV1} from '../offline/localData/serviceData/SP';
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../offline/Services/UserHelper";
import {GetInteger} from "../utils/ValidationHelper";

const { ids, styles } = Styles;

async function getPictorialPackSize(skuId) {
  const payload = {
    section: "PRODUCT DETAILS",
    opration: "GET PICTORIAL PACK SIZE",
    data: skuId,
  };
  const newpro = await DataAdapter(payload);
  return newpro;
}

async function initial(query,accno_,token) {

  let isConnected_ = false;
  let newpro= []

  let s_ = await NetInfo.fetch();

  isConnected_ = s_.isConnected;

  if(isConnected_ == true){
    
    newpro = await ProductSearchAPI(token, query);
  }
  else{
    // const payload = {
    //   section: 'SKU SEARCH',
    //   opration: 'GET',
    //   data:query
    // }
   // newpro = await DataAdapter(payload);

   let sWhere = "";
   if (!IsUserAnySOP()) {
     sWhere = CategoriesNotAvailableForEndUsers()
       .map(cat => {
         return "Nav_Navigation NOT LIKE '" + cat + "/%' ";
       })
       .join(" AND ");
   }
    const obj_ = await CProc_WEB_GetProductsForSearchForAutoCompleteV1(query, query, false, accno_, sWhere);

    for (let i = 0; i < obj_.length; i++) {
      const element = obj_[i];
      
      let obj = {
        count: i,
        name: element.SKUName,
        id: element.SKUID,
        code: element.SKUNumber,
        packSize: element.SKUPackSize,
        price: element.PriceRange,
        dueDate: element.SKUInStoreFrom,
        availability: GetInteger(element.SKUAvailableItems) > 0,
        skuavailableitems: element.SKUAvailableItems
      }

      newpro.push(obj)
    }
  }

  let array = [];
  for (let index = 0; index < newpro.length; index++) {
    const element = newpro[index];

    let pict = await getPictorialPackSize(element.id);
    
    let obj = {
      ...element,
      pictorial: pict[0]
    }
    array.push(obj)
  }
  
  return array;

 // return newpro;
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
      searchQuery: '',
      products: [],
      barCodePanel : false
    };
  }

  // _onScroll = () => {
  //   console.log("handle more=====" + this.state.offset);
  //   this.setState({
  //     offset: this.state.offset + this.state.pagesize,
  //   });
  //
  //   console.log("new offset " + this.state.offset);
  //   this.getProductDetails(this.props.loginToken, item.skuidn);
  // };

  // handleLoadMore = () => {
  //   console.log("handle more=====" + this.state.offset);
  //   this.setState({
  //     offset: this.state.offset + this.state.pagesize,
  //   });
  //
  //   console.log("new offset " + this.state.offset);
  //   this.getProductDetails(this.props.loginToken);
  // };

  handleQrCode = async (e) => {
    // setQuery(e.data);
    getQrCode(e, this.props.navigation);
    this.setState({
      barCodePanel: false,
    });
    // setShow(0)
  };



  getFormattedDate(dueDate){

    if (dueDate == null) {
      return null;
    }
    let d_date = dueDate.replace("/","-");
    d_date = d_date.replace("/","-");
    d_date = d_date.split("T");
    d_date = d_date[0].split("-");
    d_date = d_date[0] + "-" + d_date[1] + "-" + d_date[2];
    
    
    return d_date;
  
    
  }



  renderRowGrid = ({ item }) => {
    
    let dueDate="";
    if(item.dueDate != null){
      dueDate = item.dueDate.split(' ')[0];
      dueDate = dueDate.replace('/','-');
      dueDate = dueDate.replace('/','-');
    }

    let pictorial =false;
    
    if(item.pictorial == 'A'){
      pictorial =true
    }

    
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.item2}
        onPress={() =>
          this.props.navigation.navigate("productDetails", {
            SkuId: item.id,
          })
        }
      >
        <View
          style={{
            width: "100%",
            height: "55%",
            //backgroundColor: 'green',
            alignItems: "center",
          }}
        >
          {/* <Image source={no} style={styles.itemImage} /> */}
          <Image source={noImage} style={styles.itemImage} />
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
          <View style={{ marginTop: hp("1%") }}>
            <View style={styles.cardSubTxtView2}>
              <Text style={styles.cardSubTxt} allowFontScaling={false}>
                Code : {item.code} 
              </Text>
            </View>
            {/*<View style={styles.cardSubTxtView4}>
              <Text style={styles.packtxt} allowFontScaling={false}>
                Pack Size:{" "}
              </Text>
              <Text style={styles.cardSubTxt1} allowFontScaling={false}>
                {item.packSize}
              </Text>
            </View>*/}
            <View style={styles.cardSubTxtView5}>
              <Text style={styles.stocktxt} allowFontScaling={false}>
                Stock:{" "}
              </Text>
              {item.availability === true ? (
                pictorial == true ? (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                  {item.skuavailableitems} {wp('100')>450 ?'Items' : null }
                 </Text>
                ): (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                   In Stock
                 </Text>
                )
               
              ) : (
                <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                  {
                    pictorial == true ? ('0') : ('Out of Stock')
                  }
                </Text>
              )}
              
            </View>



            {item.availability === false && pictorial == true ? (
              <View style={styles.cardSubTxtView5}>
              <Text style={styles.stocktxt} allowFontScaling={false}>
                Due:{" "}
              </Text>
              <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                 {dueDate}
                </Text>
              
            </View>

            ) : (
                null
              )}

            
            <View style={styles.cardSubTxtView3}>
              <Text style={styles.priceTxt} allowFontScaling={false}>
                {item.price}
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
    let dueDate="";
    if(item.dueDate != null){
      dueDate = item.dueDate.split(' ')[0];
      dueDate = dueDate.replace('/','-');
      dueDate = dueDate.replace('/','-');
    }
    let pictorial =false;
    
    if(item.pictorial == 'A'){
      pictorial =true
    }
    return (
      <View
        style={{
          width: '100%',
          marginTop: hp('1'),
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.footerCardViewList}
          onPress={() =>
            this.props.navigation.navigate('productDetails', {
              SkuId: item.id,
            })
          }>
          <View style={styles.cardImgView}>
            <Image source={noImage} style={styles.cardSubImg} />
          </View>
          <View style={styles.cardMainTxtView}>
            <View style={styles.cardSubTxtViewList}>
              <Text
                style={styles.cardSubMainTxtList}
                numberOfLines={1}
                allowFontScaling={false}>
                {item.name}
              </Text>
            </View>

            <View
              style={{width: '100%', height: hp('3'), flexDirection: 'row'}}>
              <View style={{flex: 1.1}}>
                <Text style={styles.cardSubTxtView} allowFontScaling={false}>
                  Code: {item.code}
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                {/*<View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Text style={styles.packtxtList} allowFontScaling={false}>
                    Pack Size:{" "}
                  </Text>
                  <Text style={styles.cardSubTxt3View} allowFontScaling={false}>
                    {item.packSize}
                  </Text>
                </View>*/}
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.stocktxtView} allowFontScaling={false}>
                    Stock:{' '}
                  </Text>
                  {item.availability === true ? (
                    pictorial == true ? (
                      <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                        {item.skuavailableitems}{' '}
                        {wp('100') > 450 ? 'Items' : null}
                      </Text>
                    ) : (
                      <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                        In Stock
                      </Text>
                    )
                  ) : (
                    <>
                      <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                        {pictorial == true ? '0' : 'Out of Stock'}
                      </Text>
                    </>
                  )}
                </View>

                {item.availability === false && pictorial == true ? (
                  <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.stocktxtView} allowFontScaling={false}>
                    Due:{' '}
                  </Text>
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                    {this.getFormattedDate(item.dueDate)}
                  </Text>
                </View>
                ) : (
                  null
                )}
              </View>
            </View>
            <Text style={styles.priceTxtView} allowFontScaling={false}>
              {/* {item.skuprice1extax} */}
              {item.price}
            </Text>

            {/* <View>
            <Text style={styles.packtxtList} allowFontScaling={false}>Pack Size: {item.packSize}</Text>
              <Text style={styles.cardSubTxt3View} allowFontScaling={false}>
              {item.skuPackSize}</Text>
              </View>
            <View style={styles.cardSubTxtView2List}>
              <Text style={styles.cardSubTxtView} allowFontScaling={false}>
              Code : {item.code}
              </Text>
              <Text style={styles.stocktxtView} allowFontScaling={false}>Stock :</Text>
              <Text style={styles.cardSubTxt2View} allowFontScaling={false}>
              In Stock
            </Text>
            </View>
            <View style={styles.cardSubTxtView3View}>
              <Text style={styles.priceTxtView} allowFontScaling={false}>
              {item.price}
              </Text>
             */}

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

  componentDidMount() {
    this.findProducts(this.props.route.params.searchQuery);
    //this.ChangeStates();
    this.setState({ searchQuery: this.props.route.params.searchQuery });
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.findProducts(this.props.route.params.searchQuery);
    }
  }

  findProducts = (text) => {
    this.setState({ searchQuery: text });

    if (text?.length > 2) {
      this.getProducts(text);
    } else {
      this.setState({ products: [] });
    }
  };

  getProducts = (text) => {
    let accno_ = this.props.accno;
    initial(text, accno_, this.props.loginToken).then((res) => {
      console.log(res);
      this.setState({ products: res });
    });
  };

  render() {
    return this.renderScreen();
  }

  renderScreen() {
    let isTablet = DeviceInfo.isTablet();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
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
          <View style={styles.backView}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.backBtn}
              onPress={() => {
                // this.props.navigation.navigate('vegetableSeed');
                this.props.navigation.goBack();
              }}
            >
              <Image source={arrow} style={styles.backIcon} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleViewMain}>
            <Text style={styles.titleTxtMain} allowFontScaling={false}>
              Search Results 
            </Text>
          </View>
          <View style={styles.searchView}>
            <View style={styles.searchViewInside1}>
              <Searchbar
                autoCorrect={false}
                autoCapitalize={false}
                // icon={({ size, color }) => (
                //   null
                // )}
                // clearIcon={({ size, color }) => (
                //   null
                // )}
                selectionColor="black"
                iconColor={colors.primaryColor}
                style={styles.searchbox}
                placeholder="Search"
                onChangeText={(text) => this.findProducts(text)}
                value={this.state.searchQuery}
              />
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
                //   this.props.navigation.navigate(filter();
                // }}
              >
                <Image source={filter} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bodyView}>
            <View style={styles.titleView}>
              {this.state.searchQuery?.length < 3 ? (
                <View style={styles.warningtxtView}>
                  <Text style={styles.warningtitleTxt} allowFontScaling={false}>
                    Please insert three or more characters
                  </Text>
                </View>
              ) : (
                <Text style={styles.titleTxt} allowFontScaling={false}>
                  Searching for "
                  <Text style={{ color: colors.primaryColor }}>
                    {this.state.searchQuery}
                  </Text>
                  "
                </Text>
              )}
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
              {/* <TouchableOpacity activeOpacity={0.9}
                  style={styles.filter}
                  onPress={() => {
                    this._drawer.open();
                  }}>
                  <Image source={btnFilter} style={styles.filIcon} />
                  <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
                 */}
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
                  this.setState({ viewType: "GRID" });
                  this.setState({ columnCount: 3 });
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
                  // this.props.navigation.navigate(productList();
                  this.setState({ viewType: "LIST" });
                  this.setState({ columnCount: 1 });
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
            {this.state.products.length != 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                data={this.state.products}
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
            ) : (
              <View
                style={{
                  backgroundColor: "#fff3cd",
                  height: hp("5"),
                  width: wp("94"),
                  marginTop: hp("2"),
                  alignSelf: "center",
                  borderRadius: wp("1"),
                  borderColor: "#ffecb5",
                  borderWidth: wp("0.2"),
                  justifyContent: "center",
                  alignItems:'center'
                }}
              >
                <Text style={{ color: "#664d03", fontSize:hp('1.6') }}>No results found</Text>
              </View>
            )}
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

const drawerStyles = {
  drawer: { shadowColor: colors.secColor, shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

const mapStateToProps = (state) => {
  return {
     loginToken: state.login.loginToken,
    // productItem: state.home.productItem,
    // titleName: state.home.titleName,
    // filterData: state.home.filterData,
    accno : state.findStore.accCode
  };
};

export default connect(mapStateToProps, {
  // getProductDetails,
})(ProductGrid);
