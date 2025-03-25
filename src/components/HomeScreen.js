import React, {Component} from "react";
import { BackHandler, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from "../style/HomeScreenStyle";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
//import {getCategories} from "../actions/HomeScreenAction";
import {BallIndicator} from "react-native-indicators";
import Spinner from "react-native-loading-spinner-overlay";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";
import DeviceInfo from "react-native-device-info";
import SearchBarPallet from "./SearchBarPallet";
import DataAdapter from '../offline/localData/DataAdapter';
import { showMessage } from "react-native-flash-message";
import LogoutModal from "./common/LogoutModal";




import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'

import OpayoConfig from "../../src/config/opayo.js";
import { DrawerActions, useIsFocused } from '@react-navigation/native';
import { DeleteDirectory, configDirectory } from "./DiskManagement/CommonOperations";
import { GetProductPriceOptions } from "../offline/Services/ProductHelper";
// import OpayoConfig from "../config/opayo.json";

import {
  getDrawerCategories,
} from "../actions/HomeScreenAction";
import { RawQuery } from "../offline/Services/DataHelper";
import { compareVersions } from "./common/AppVersion";

const { ids, styles } = Styles;

let widthper = wp("100%");

const search = require('../assets/search.png');
const store = require('../assets/find-store.jpg');
const map = require('../assets/view-map.jpg');
const calendar2 = require('../assets/calendars.jpg');
const order = require('../assets/HomeScreen/orderNew.jpg');
const catalogue = require('../assets/HomeScreen/browse-cat.jpg');
const contacts = require('../assets/contacts.jpg');

const img_ = 'https://thumbs.dreamstime.com/z/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg';

async function getPictorialPackSize(skuId) {
  const payload = {
    section: "PRODUCT DETAILS",
    opration: "GET PICTORIAL PACK SIZE",
    data: skuId,
  };
  const newpro = await DataAdapter(payload);
  return newpro;
}


async function initial(){

  const payload = {
    section: '',
    opration: 'NEW PRODUCTS',
    data: ''
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}


async function checkDb(){

  const payload = {
    section: 'SYNC',
    opration: 'SYNC CHECK DB',
    data: ''
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}


async function initialTest() {
  const payload = {
    section: "TEST",
    opration: "SYNC",
    data: '',
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}



async function DEL_TEST() {


  const newpro = await GetProductPriceOptions('GOU 097');
  return newpro;
}
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.sample = this.sample.bind(this);
    this.state = {
      searchBarPalletOpen: false,
      newProducts: 'NOT',

    };
  }

  componentDidMount() {


    this.handleToggle();

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    DEL_TEST().then(res => {

    });



    if(this.props.drawerCategoryItem.length == 0) {
      this.props.getDrawerCategories(this.props.loginToken);
    }



    checkDb().then(res => {

      if(res == 0){
        this.props.navigation.dispatch(DrawerActions.openDrawer);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        this.props.navigation.navigate("sync");
        DeleteDirectory();
      }else{
        compareVersions().then(isEqual => {
          console.log('isEqual', isEqual);
          if (!isEqual) {
            this.props.navigation.dispatch(DrawerActions.openDrawer);
            this.props.navigation.dispatch(DrawerActions.closeDrawer());


            this.props.navigation.navigate("sync");
          }
        });
      }

      // CheckDirectory();
    });

    this.getnNewProducts();


  }


  async componentDidUpdate(prevProps, prevState) {
    this.handleToggle()
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({
        searchBarPalletOpen: false,
      })
     this.getnNewProducts();
    }

    compareVersions().then(isEqual => {
      if (!isEqual) {
        console.log('isEqual', isEqual);
        this.props.navigation.dispatch(DrawerActions.openDrawer);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());


        this.props.navigation.navigate("sync");
      }
    });





  }


  componentWillUnmount() {
    // Remove the event listener
    this.handleToggle()
    this.backHandler.remove();
    console.log('componentWillUnmount');
  }


  clearCustomIntervals = (object) => {
    clearInterval(object);
  }

  handleBackPress = () => {

    // Perform any checks or cleanup operations before leaving the screen
    // For example, ask for confirmation before leaving

    // If you want to prevent leaving the screen, return true
    // return true;

    // If you want to allow leaving the screen, return false or nothing

  };

  handleToggle = async () => {
    console.log('handleToggle-------33---------', this.props.isFocused);
    await RawQuery(`UPDATE local_info SET isHomeScreen = ${this.props.isFocused ? 1 : 0}`);
  }

  getFormattedDate(dueDate){

    let d_date = dueDate.replace("/","-");
    d_date = d_date.replace("/","-");
    d_date = d_date.split("T");
    d_date = d_date[0].split("-");
    d_date = d_date[2] + "-" + d_date[1] + "-" + d_date[0];
    return d_date;

  }

  getnNewProducts = async() => {

    initial().then(res => {
      console.log(res);
      this.setState({ newProducts: res });
    });

  }

  renderRow2 = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.item2}
        onPress={() => {
          //         if(Actions.currentScene !== 'productDetails') {
          //           Actions.productDetails({SkuId: item.id});
          //         }

          this.props.navigation.navigate('productDetails', {
            SkuId: item.id,
            product: item.code,
          });
        }}>
        <View
          style={{
            width: '100%',
            height: '50%',
            marginTop: '0%',
            //backgroundColor: 'green',
            alignItems: 'center',
          }}>
          <Image source={item.image} style={styles.itemImage} />
        </View>
        <View style={styles.cardMainTxtView1}>
          <View>
            <View style={styles.cardSubTxtViewTitle}>
              <Text
                //numberOfLines={1}
                style={styles.cardSubMainTxtCart}
                allowFontScaling={false}>
                {item.title.length < 23
                  ? `${item.title}`
                  : `${item.title.substring(0, 23)}...`}
              </Text>
            </View>
          </View>
          <View style={styles.prodctCodeView}>
            <View style={styles.cardSubTxtViewCart}>
              <Text style={styles.cardSubTitleTxt} allowFontScaling={false}>
                Code: {item.subtitle}
              </Text>
            </View>
            {/*<View style={styles.cardSubTxtViewCart2}>
              <Text style={styles.packtxt} allowFontScaling={false}>
                Pack Size:{" "}
              </Text>
              <Text style={styles.cardSubTxt1} allowFontScaling={false}>
                {item.size}
              </Text>
            </View>*/}
            <View style={styles.cardSubTxtViewCart3}>
              <Text style={styles.stocktxt} allowFontScaling={false}>
                Stock:{' '}
              </Text>
              {item.stock > 0 ? (
                item.pictorial == 'A' ? (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                    {item.stock} Items
                  </Text>
                ) : (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                    In stock
                  </Text>
                )
              ) : (
                item.pictorial == 'A' ? (
                  <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                  0
                </Text>
                ) : (
                  <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                  Out of Stock
                </Text>
                )

              )}
            </View>

            {item.pictorial == 'A' && item.stock <= 0 ? (
              <View style={[styles.cardSubTxtViewCart3]}>
                <Text style={styles.stocktxt} allowFontScaling={false}>
                  Due:{' '}
                </Text>
                <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                  {this.getFormattedDate(item.dueDate)}
                </Text>
              </View>
            ) : null}

            <View style={styles.cardSubTxtViewCart4}>
              {/* <Text style={styles.cardSubTxt} allowFontScaling={false}>
                {item.stock}
              </Text> */}
              <Text style={styles.priceTxt} allowFontScaling={false}>
                {item.skuprice}
              </Text>
              {/* <TouchableOpacity activeOpacity={0.9}
                 style={Styles.cart}
                onPress={() => {
                  p
                }}

               >
                 <Text style={styles.cartText}>View</Text>
              </TouchableOpacity>  */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {

    const { isFocused } = this.props;


    let isTablet = DeviceInfo.isTablet();


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        {/* <View style={{ width: '100%', height: 110, zIndex: 10, position: 'absolute', marginTop:hp('1')}}>
          <SearchBarPallet palletOpen={this.state.searchBarPalletOpen} />
        </View> */}
        <SearchBarPallet palletOpen={this.state.searchBarPalletOpen} token={this.props.loginToken} />
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            size={"large"}
            animation={"fade"}
            overlayColor={"rgba(0, 0, 0, 0.4)"}
            customIndicator={<BallIndicator color="white" />}
          />

          <View style={styles.searchView}>
            <View style={styles.titleView}>
              <Text style={styles.titleTxt} allowFontScaling={false}>
                Welcome to Kings Seeds SOP
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                  this.setState({ searchBarPalletOpen: true });
              }}
              style={styles.searchInput}
            >
              <View style={styles.searchInputView}>
                <Image source={search} style={styles.searchIcon} />
              </View>
              {/* <Image source={search} style={styles.searchIcon} /> */}
              {/* <TextInput
                allowFontScaling={false}
                style={styles.TxtInput}
                placeholder={'Product Search'}
                placeholderTextColor="white"
                onChangeText={() => {
                  this.setState({ searchBarPalletOpen: true });
                }}
              /> */}
              {widthper > 500 ? (
                <Text style={styles.TxtInput}>Product Search</Text>
              ) : null}
            </TouchableOpacity>
          </View>
          <ScrollView style={{ width: "100%" }}>
            {isTablet === true ? (
              <View
                style={{
                  flexDirection: "row",
                  width: "94%",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {



                      this.props.navigation.navigate("findstore");

                    }}
                    style={styles.footerCardView1}
                  >
                    <View style={styles.cardImgView}>
                      <Image source={store} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Find & Select a Store
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}
                        >
                          Search a store and select to work with
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* <TouchableOpacity activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate('store');
                    }}
                    style={styles.footerCardView}>
                    <View style={styles.cardImgView}>
                      <Image source={store} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}>
                          Stores
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}>
                          Lorem ipsum dolor sit amet, consectetur
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate("mapview");
                    }}
                    style={styles.footerCardView}
                  >
                    <View style={styles.cardImgView}>
                      <Image source={map} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Map View
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}
                        >
                          UK map with store locations
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.footerCardView}
                    onPress={() => {
                       this.props.navigation.navigate('calendar');
                      // this.props.navigation.navigate('store');

                    }}
                  >
                    <View style={styles.cardImgView}>
                      <Image source={calendar2} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Calendar
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}
                        >
                          Access your calendar here
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: "50%",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      // this.props.navigation.navigate('addressScreen');
                      // this.props.navigation.navigate('store');
                      if(this.props.adminCustomerID != ''){
                        this.props.navigation.navigate("orderPad");
                      }else{
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Select a store before continuing",
                          type: "warning",
                          autoHide: true,
                        });
                      }
                    }}
                    style={styles.footerCardView1}
                  >
                    <View style={styles.cardImgView}>
                      <Image source={order} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          New Order
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}
                        >
                          Start a new order for the selected store
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate('productCategories', {categoryAlias: "commercial", categoryName: "Commercial"})

                      // this.props.getCategories(this.props.loginToken);

                        // this.props.navigation.navigate("productMainCategory");
                    }}
                    style={styles.footerCardView}
                  >
                    <View style={styles.cardImgView}>
                      <Image source={catalogue} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={[styles.cardSubTxtView, {marginTop:hp('0.5')}]}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Browse Catalogue
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}
                        >
                          Browse our commercial and mail order catalogues
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate("contacts");
                    }}
                    style={styles.footerCardView}
                  >
                    <View style={styles.cardImgView}>
                      <Image source={contacts} style={styles.cardSubImg} />
                    </View>
                    <View style={styles.cardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Contacts
                        </Text>
                      </View>
                      <View style={styles.cardSubTxtView2}>
                        <Text
                          style={styles.cardSubTxt}
                          allowFontScaling={false}
                        >
                          All your customer contacts are here
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ marginLeft: wp("3%") }}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {

                      this.props.navigation.navigate("findstore");
                    }}
                    style={styles.phonefooterCardView1}
                  >
                    <View style={styles.phonecardImgView}>
                      <Image source={store} style={styles.phonecardSubImg} />
                    </View>
                    <View style={styles.phonecardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.phonecardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Find & Select a Store
                        </Text>
                      </View>
                      <View style={styles.phonecardSubTxtView2}>
                        <Text
                          style={styles.phonecardSubTxt}
                          allowFontScaling={false}
                        >
                          Search a store and select to work with
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate("mapview");
                    }}
                    style={styles.phonefooterCardView}
                  >
                    <View style={styles.phonecardImgView}>
                      <Image source={map} style={styles.phonecardSubImg} />
                    </View>
                    <View style={styles.phonecardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.phonecardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Map View
                        </Text>
                      </View>
                      <View style={styles.phonecardSubTxtView2}>
                        <Text
                          style={styles.phonecardSubTxt}
                          allowFontScaling={false}
                        >
                         UK map with store locations
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate('calendar');
                     // this.props.navigation.navigate('store');

                   }}
                    style={styles.phonefooterCardView}
                  >
                    <View style={styles.phonecardImgView}>
                      <Image
                        source={calendar2}
                        style={styles.phonecardSubImg}
                      />
                    </View>
                    <View style={styles.phonecardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.phonecardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Calendar
                        </Text>
                      </View>
                      <View style={styles.phonecardSubTxtView2}>
                        <Text
                          style={styles.phonecardSubTxt}
                          allowFontScaling={false}
                        >
                          Access your calendar here
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.phonefooterCardView}
                    onPress={() => {
                      if(this.props.adminCustomerID != ''){
                        this.props.navigation.navigate("orderPad");
                      }else{
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Select a store before continuing",
                          type: "warning",
                          autoHide: true,
                        });
                      }
                    }}
                  >
                    <View style={styles.phonecardImgView}>
                      <Image source={order} style={styles.phonecardSubImg} />
                    </View>
                    <View style={styles.phonecardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.phonecardSubMainTxt}
                          allowFontScaling={false}
                        >
                          New Order
                        </Text>
                      </View>
                      <View style={styles.phonecardSubTxtView2}>
                        <Text
                          style={styles.phonecardSubTxt}
                          allowFontScaling={false}
                        >
                          Start a new order for the selected store
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate('productCategories', {categoryAlias: "commercial", categoryName: "Commercial"})

                      // this.props.getCategories(this.props.loginToken);

                        // this.props.navigation.navigate("productMainCategory");
                    }}
                    style={styles.phonefooterCardView}
                  >
                    <View style={styles.phonecardImgView}>
                      <Image
                        source={catalogue}
                        style={styles.phonecardSubImg}
                      />
                    </View>
                    <View style={styles.phonecardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.phonecardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Browse Catalogue
                        </Text>
                      </View>
                      <View style={styles.phonecardSubTxtView2}>
                        <Text
                          style={styles.phonecardSubTxt}
                          allowFontScaling={false}
                        >
                          Browse our commercial and mail Order catalogues
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate("contacts");
                    }}
                    style={styles.phonefooterCardView}
                  >
                    <View style={styles.phonecardImgView}>
                      <Image source={contacts} style={styles.phonecardSubImg} />
                    </View>
                    <View style={styles.phonecardMainTxtView}>
                      <View style={styles.cardSubTxtView}>
                        <Text
                          //  numberOfLines={2}
                          style={styles.phonecardSubMainTxt}
                          allowFontScaling={false}
                        >
                          Contacts
                        </Text>
                      </View>
                      <View style={styles.phonecardSubTxtView2}>
                        <Text
                          style={styles.phonecardSubTxt}
                          allowFontScaling={false}
                        >
                          All your customer contacts are here
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.bodyView}>
              <View style={styles.titleView1}>
                <Text style={styles.titleTxt} allowFontScaling={false}>
                  New Products
                </Text>

                <View>
                  {this.state.newProducts == "NOT" ? (
                    <View
                      style={{
                        width: wp("94"),
                        backgroundColor: "#d4edda",
                        height: hp("4"),
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor:"#c3e6cb",
                        borderWidth:wp('0.2'),
                        borderRadius:wp('1'),
                        marginTop:hp('1')
                      }}
                    >
                      <Text style={{
                        color:'#155724',
                        fontSize:hp('1.5')
                      }}>Run a Full Sync before you start using the App</Text>
                    </View>
                  ) : null}
                </View>
              </View>

              {/* <View style={Styles.CardDetail}> */}
              {/* <TouchableOpacity activeOpacity={0.9} style={Styles.CardDetail1}>
                  <View style={Styles.detailContent}>
                    <Text style={Styles.title}>Best Seller</Text>

                  {/* </View> */}
              {/* </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail2}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title1}>Clearance</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail2}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title1}>Promotions</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.CardDetail2}>
                  <View style={styles.detailContent}>
                    <Text style={styles.title1}>New</Text>
                  </View>
                </TouchableOpacity>  */}

              {/* </View> */}
            </View>

            <View
              style={{
                marginLeft: wp("2"),
                marginTop: hp("-8"),
                marginBottom: hp("5"),
                paddingRight: wp(2),
              }}
            >
              <ScrollView
                horizontal={true}
                style={{ flexDirection: 'row' }}
                showsHorizontalScrollIndicator={false}>
                <NewProductsList dataset={this.state.newProducts} renderRow={this.renderRow2} handleMore={this.handleLoadMore} />
              </ScrollView>
            </View>

            <View style={{ height: 20, width: 100 }} />
          </ScrollView>

          {/* <Footer getnNewProducts={this.getnNewProducts}/> */}
        </View>
      </SafeAreaView>
    );
  }
}

function NewProductsList(props) {

  if (props.dataset != 'NOT') {
    return (
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        style={Styles.flatlist1}
        data={props.dataset}
        renderItem={props.renderRow}
        keyExtractor={(item) => item.id}
        onEndReached={props.handleMore}
        onEndReachedThreshold={0}
      />
    );
  }else{
    return (
      <Text></Text>
    );
  }
}



function HomeScreenWrapper(props) {
  const isFocused = useIsFocused();
  return <HomeScreen {...props} isFocused={isFocused} />;


}

const mapStateToProps = (state) => {
  return {
    //loginToken: state.login.loginToken,
    expiryDate: state.login.expiryDate,
    newProducts: state.home.newProducts,
    loginToken: state.login.loginToken,
    drawerCategoryItem: state.home.drawerCategoryItem,
    adminCustomerID: state.findStore.adminCustomerID,
  };
};

export default connect(mapStateToProps, {
  //getCategories,
  getDrawerCategories
})(HomeScreenWrapper);
