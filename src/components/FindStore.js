import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  PermissionsAndroid,
  Modal,
} from "react-native";
import Styles from "../style/FindStoreStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Back from "./common/Back";
import { useIsFocused } from "@react-navigation/native";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";

import NetInfo from "@react-native-community/netinfo";

// import Geocoder from "react-native-geocoding";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import Geolocation from 'react-native-geolocation-service';
import { ConfirmDialog } from "react-native-simple-dialogs";

import { showMessage } from "react-native-flash-message";

const remove = require("../assets/delete.png");
const edit = require("../assets/mappin1.png");
const map_user = require("../assets/pinpoint2x.png");
const map_cur = require("../assets/Group82x.png");
const search = require("../assets/search-green.png");
const searchCloseBtn = require("../assets/search-close-btn.png");

import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";

// import Geocoder from '@timwangdev/react-native-geocoder';

const filter = require("../assets/barcode.png");
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAdminAddress,
  getItemCode,
  getItemName,
  getAdminCustomerEmail,
  getAdminCustomerPhone,
  getAdminCustomerId,
  getAddressId,
  getAccCode,
  getItemOnStop,
  getStoresDetails, //get stores
} from "../actions/FindStoreAction";

import { clearCart } from "../actions/CartActions";
import DataAdapter from "../offline/localData/DataAdapter";
import { RawQuery } from "../offline/Services/DataHelper";

const NO_IMG = require("../assets/noimage.png");
const locations = [
  {
    id: 1,
    latitude: 28.57966,
    longitude: 77.32111,
  },
  {
    id: 2,
    latitude: 26.57966,
    longitude: 79.32111,
  },
  {
    id: 3,
    latitude: 28.74,
    longitude: 76.55,
  },
];

let widthper = wp("100%");
let txt_length = 0;
if (widthper <= 500.0) {
  txt_length = 50;
} else {
  txt_length = 0;
}

async function getAccNote(code_) {
  console.log("codee" + code_);
  const payload = {
    section: "",
    opration: "ACCOUNT NOTES DETAILS",
    data: code_,
  };
  console.log(payload);
  const acc_notes = await DataAdapter(payload);
  return acc_notes;
}

async function getTradeaccountsLocal() {
  const payload = {
    section: "LOCAL TRADE ACCOUNT",
    opration: "GET",
  };
  const accounts = await DataAdapter(payload);
  return accounts;
}

class FindStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredDataSet: [],
      ltoken: "blank",
      loading: true,
      resData: [],
      searchResData: [],
      searchOffset: 1,
      searchPagesize: 10,
      searchText: "",
      searching: false,
      offset: 1,
      pagesize: 500,
      selectedstore: 1,
      scrollBegin: false,
      no_search_items: false,
      setLoading: false,
      //location related
      currentLat: 0.0,
      currentLon: 0.0,
      addressList: [],
      latlonList: [],
      //dialogbox
      dialogVisible: false,
      //propstatessaveing
      titleState: "",
      addressState: "",
      emailState: "",
      phoneState: "",
      cusIdState: "",
      itmcdState: "",
      accCode: "",
      addressID: "",
      itemOnStop: false,
    };
  }

  async componentDidMount() {
    const TOKEN_ = this.props.loginToken;

    this.getStoresDetailsFromApi(TOKEN_);

    // setTimeout(() => {
    //   this.setState({ resData: [] })
    // }, 3000)
  }

  // getcurrentLocation = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         console.log(position.coords.latitude);
  //         console.log(position.coords.longitude);
  //         this.setState({
  //           currentLat: position.coords.latitude,
  //           currentLon: position.coords.longitude,
  //         });
  //       },
  //       error => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   }
  // };

  isCloseToBottom = async ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 500;
    const a_ = layoutMeasurement.height + contentOffset.y;
    const b_ = contentSize.height - paddingToBottom;
    console.log("a==" + a_ + " b==" + b_);
    if (a_ >= b_) {
      console.log("scroll");
      this.setState({
        setLoading: true,
      });
      return true;
    }
    console.log("not scroll");
    this.setState({
      setLoading: false,
    });
    return false;
  };

  setStoreDetails(
    title,
    address,
    email,
    phone,
    cusId,
    itmcd,
    accCode,
    addressID,
    itemOnStop
  ) {
    this.setState({
      titleState: title,
      addressState: address,
      emailState: email,
      phoneState: phone,
      cusIdState: cusId,
      itmcdState: itmcd,
      dialogVisible: true,
      accCode: accCode,
      addressID: addressID,
      itemOnStop: itemOnStop,
    });
  }

  _onScroll = async () => {
    this.setState({
      setLoading: false,
    });
    if (this.state.searching) {
      let sn_ = this.state.searchOffset + 1;

      this.setState({
        searchOffset: sn_,
      });
      console.log("handle more=====search " + sn_);

      this.getSearchStoresDetailsFromApi(
        this.props.loginToken,
        this.state.searchText,
        sn_
      );
    } else {
      let n_ = this.state.offset + 1;

      this.setState({
        offset: n_,
      });
      console.log("new offset " + n_);

      this.getStoresDetailsFromApi(this.props.loginToken, n_);
    }
  };

  async searchKeyPress(text) {
    console.log(text);
    this.setState({
      heName: text,
    });
    if (text.length >= 3) {
      this.setState({
        searching: true,
        searchText: text,
        // searchResData: [],
      });
      //   this.getSearchStoresDetailsFromApi(this.props.loginToken, text);

      this.getSearchStoresDetailsFromApi(this.props.loginToken, text);

      if (this.state.searchResData.length == 0) {
        this.setState({
          no_search_items: true,
        });
      } else {
        this.setState({
          no_search_items: false,
        });
      }
    } else {
      this.setState({
        searching: false,
        searchOffset: 1,
        no_search_items: false,
      });
      this.setState({
        searchResData: [],
      });
    }
  }

  getSearchStoresDetailsFromApi = async (tokn_, text, searchOS = 1) => {
    if (tokn_ != "blank") {
      try {
        let results = await getStoresDetails(
          text,
          searchOS,
          this.state.searchPagesize
        );

        this.setState({
          searchResData: results.slice(0, 10),
        });
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    }
  };

  getStoresDetailsFromApi = async (tokn_, n = 1) => {
    // store.dispatch({type: 'CustomSpinner:SHOW'});
    if (tokn_ != "blank") {
      try {
        let accinfo = this.props.accountInfo;

        let results = await getStoresDetails("", n, 0, accinfo.customerUserID); //accinfo.customerUserID,




        this.setState({
          // resData: results.slice(0, 10),
        });
        // console.log(productResults);
        let dnum = this.state.offset;
        //console.log("res data" + this.state.resData[dnum].tradeAccountName);

        // store.dispatch({type: 'CustomSpinner:HIDE'});
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    }
  };

  clearFromcrossSearch() {
    this.setState({
      resData: [],
      searchResData: [],
      offset: 1,
      no_search_items: false,
      searchText: "",
    });
    this.getStoresDetailsFromApi(this.props.loginToken);
  }

  addNewAddressestoState(Addresslist_) {
    this.setState({
      addressList: this.state.addressList.concat(Addresslist_),
    });
    var _list = this.state.addressList;
    var newArray = [];
    var newArray = _list.filter(function (elem, pos) {
      return _list.indexOf(elem) == pos;
    });
    this.setState({
      addressList: newArray,
    });
    this.getLatLong();
    console.log(this.state.addressList);
  }

  async getLatLong() {
    //  const position = { lat: 1.2, lng: -3.4 };
    //  await Geocoder.geocodePosition(position);
    let cordsarray_ = [];
    for (let index = 0; index < this.state.addressList.length; index++) {
      try {
        // const element = this.state.addressList[index];
        // const cord = await Geocoder.geocodeAddress(element, {
        //   //locale: 'fr',
        //   maxResults: 2,
        // });
        // console.log(cord);

        let lat_ = cord[0].position.lat;
        let lon_ = cord[0].position.lng;

        const position = { lat: lat_, lng: lon_ };
        cordsarray_.push(position);
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    this.setState({
      latlonList: cordsarray_,
    });
  }

  renderRow = ({ item }) => {
    return (
      <View style={{ width: wp("92%") }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.footerCardView}
          onPress={() => {
            this.setStoreDetails(
              item.tradeAccountName,
              item.addressDisplay,
              item.adminCustomerEmail,
              item.adminCustomerPhone,
              item.adminCustomerID,
              item.tradeAccountID,
              item.accCode,
              item.addressID,
              item.accOnStop
            );
          }}
        >
          <View style={styles.cardImgView}>
            <Image source={NO_IMG} style={styles.cardSubImg} />
          </View>
          <View style={styles.cardMainTxtView}>
            <View style={styles.cardSubTxtView}>
              <Text
                //  numberOfLines={2}
                style={Styles.cardSubMainTxt}
                allowFontScaling={false}
              >
                {item.tradeAccountName}
              </Text>
            </View>
            <View style={styles.cardSubTxtView2}>
              <Text
                style={Styles.cardSubTxt}
                numberOfLines={2}
                allowFontScaling={true}
              >
                {item.addressDisplay}
              </Text>
            </View>
            <View style={styles.cardSubTxtView4}>
              <Text style={Styles.cardSubTxt2} allowFontScaling={false}>
                {item.adminCustomerEmail}
              </Text>
            </View>
            <View style={styles.cardSubTxtView3}>
              <Text style={Styles.cardSubTxt3} allowFontScaling={false}>
                {item.adminCustomerPhone}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  setmodalclose() {
    this.setState({ dialogVisible: false });
  }

  async setStorepersist() {
    if (this.props.adminCustomerID != this.state.cusIdState) {
      if (this.props.cartItems.length !== 0) {


        store.dispatch({
          type: 'SET_BILLING_INFO',
          payload: {
              shippingAddress: null,
              billingAddress: null,
              deliveryOption: null
          }
      });
        // this.props.clearCart();



        this.props.clearCart();
        showMessage({
          message: "KINGS SEEDS",
          description: "Items in your cart has been cleared",
          type: "info",
          autoHide: true,
        });
      }
      const res1 = await RawQuery(`delete from local_orderpad`);
      console.log("Clearing Orderpad", res1);
    }
    //  this.props.clearCart();

    this.props.getAdminAddress(this.state.addressState);
    this.props.getItemName(this.state.titleState);
    this.props.getAdminCustomerEmail(this.state.emailState);
    this.props.getAdminCustomerPhone(this.state.phoneState);
    this.props.getItemCode(this.state.itmcdState);
    console.log("clicked--1" + this.props.selItemName);
    this.props.getAdminCustomerId(this.state.cusIdState);
    // this.props.getAdminCustomerId('');
    // console.log("clicked--item co--" + itmcd);
    this.props.getAddressId(this.state.addressID);
    this.props.getAccCode(this.state.accCode);
    this.props.getItemOnStop(this.state.itemOnStop);
    this.setmodalclose();
    this.setState({
      heName: "",
      searchText: "",
    });

    store.dispatch({
      type: "SET_BILLING_INFO",
      payload: {
        unavailableItems: "CLEAR",
      },
    });

    this.clearFromcrossSearch();
    showMessage({
      message: "KINGS SEEDS",
      description:
        "Store successfully selected, We recommend you do a product sync",
      type: "success",
      autoHide: true,
    });
    // TODO: set discounts here
    getAccNote(this.state.itmcdState || "").then((res) => {
      console.log(res.ItemDiscGroup3);
      let itm1 = "";
      let itm2 = "";
      let itm3 = "";
      if (res.ItemDiscGroup1 !== null) {
        itm1 = res.ItemDiscGroup1;
      }
      if (res.ItemDiscGroup2 !== null) {
        itm2 = res.ItemDiscGroup2;
      }
      if (res.ItemDiscGroup3 !== null) {
        itm3 = res.ItemDiscGroup3;
      }
      if (res.ItemDiscGroup4 !== null) {
        itm4 = res.ItemDiscGroup4;
      }
      // this.setState({
      //   acc_details: res,
      //   pict_discount: itm1,
      //   opn_discount: itm2,
      //   f1f2_discount: itm3,
      // });
      this.props.setDiscounts(itm1, itm2, itm3, itm4);
    });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>
          <Back />
          {/* <CustomSpinner /> */}
          <Modal
          visible={this.state.dialogVisible}
          animationType={'fade'}
          transparent={true}
          >

            <View
                style={
                  {
                  backgroundColor:'rgba(0,0,0,0.5)',
                    flex:1,
                    width:'100%',
                    borderRadius: 10,
                    alignSelf: "center",
                    justifyContent:'center'
                  }
                 }
            >

            <View style={[
                  {
                    backgroundColor: "#fff",
                    width: wp("70"),
                    maxHeight: hp("22"),
                    borderRadius: 10,
                    padding:10,
                    alignSelf: "center",
                    justifyContent:'center'
                  },
                  this.props.cartItems.length != 0 &&
                  this.props.adminCustomerID != this.state.cusIdState
                    ? { height: hp("22") }
                    : { height: hp("20") },
                ]}>

              <Text style={{color:'green',textAlign: "left",
              fontSize: hp("2"),}}>Confirm</Text>

              {this.props.cartItems.length != 0 &&
              this.props.adminCustomerID != this.state.cusIdState ? (
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: hp("1.6"),
                    color: "black",
                  }}
                >
                  You have an active cart. If you select another account , cart
                  will be cleared.
                </Text>
              ) : null}
              <Text
                style={{
                  textAlign: "left",
                  fontSize: hp("1.6"),
                  color: "black",
                }}
              >
                Are you sure you want to select{" "}
                <Text style={{ color: "#1ED18C" }}>
                  {this.state.titleState}
                </Text>{" "}
                as your store?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp("1"),
                  width:'100%',
                  padding:5,
                  alignItems: "center",
                  justifyContent:'space-between'
                }}
              >
                <TouchableOpacity
                  style={{
                    height: hp("4.5"),
                    width:'50%',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFD8D8",
                    marginRight: "1%",
                    borderRadius: 5,
                  }}
                  activeOpacity={0.9}
                  onPress={() => this.setState({ dialogVisible: false })}
                >
                  <Text style={{ fontSize: hp("1.5"), color: "#E61538" }}>
                    NO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: hp("4.5"),
                    width:'50%',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DEF9F6",
                    marginLeft: "1%",
                    borderRadius: 5,
                  }}
                  activeOpacity={0.9}
                  onPress={() => {{this.setStorepersist()
                    this.setState ({dialogVisible: false}) }}}
                >
                  <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>
                    YES
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>

          {/* <ConfirmDialog
            title="Confirm"
            titleStyle={{
              color: "green",
              textAlign: "left",
              fontSize: hp("2"),
            }}
            animationType="fade"
            dialogStyle={[
              {
                backgroundColor: "#fff",
                width: wp("70"),
                maxHeight: hp("22"),
                borderRadius: 10,
                alignSelf: "center",
              },
              this.props.cartItems.length != 0 &&
              this.props.adminCustomerID != this.state.cusIdState
                ? { height: hp("22") }
                : { height: hp("20") },
            ]}
            buttonsStyle={{

              color: "red",
            }}
            buttons={{
              title: "YES",
            }}
            visible={this.state.dialogVisible}
            onTouchOutside={() => this.setState({ dialogVisible: false })}

          >
            <View style={styles.modalView}>


              {this.props.cartItems.length != 0 &&
              this.props.adminCustomerID != this.state.cusIdState ? (
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: hp("1.6"),
                    color: "black",
                  }}
                >
                  You have an active cart. If you select another account , cart
                  will be cleared.
                </Text>
              ) : null}
              <Text
                style={{
                  textAlign: "left",
                  fontSize: hp("1.6"),
                  color: "black",
                }}
              >
                Are you sure you want to select{" "}
                <Text style={{ color: "#1ED18C" }}>
                  {this.state.titleState}
                </Text>{" "}
                as your store?
              </Text>

              <KeyboardAvoidingView
                style={{
                  flexDirection: "row",
                  marginTop: hp("1"),
                  width:'100%',
                  padding:5,
                  alignItems: "center",
                  justifyContent:'space-between'
                }}
              >
                <TouchableOpacity
                  style={{
                    height: hp("4.5"),
                    width:'50%',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFD8D8",
                    marginRight: "1%",
                    borderRadius: 5,
                  }}
                  activeOpacity={0.9}
                  onPress={() => this.setState({ dialogVisible: false })}
                >
                  <Text style={{ fontSize: hp("1.5"), color: "#E61538" }}>
                    NO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: hp("4.5"),
                    width:'50%',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                    marginLeft: "1%",
                    borderRadius: 5,
                  }}
                  activeOpacity={0.9}
                  onPress={() => {{this.setStorepersist()
                    this.setState ({dialogVisible: false}) }}}
                >
                  <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>
                    YES
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </ConfirmDialog> */}
          <View style={Styles.titleView}>
            <Text style={Styles.titleTxt} allowFontScaling={false}>
              Find & Select a Store
            </Text>
            {/* <TouchableOpacity activeOpacity={0.9} style={{ width: wp("3"), height: hp("2") }}>
              <Text>click</Text>
            </TouchableOpacity> */}
          </View>

          <View style={Styles.searchView}>
            <View style={Styles.searchInput}>
              <View style={Styles.searchIconView}>
                <Image source={search} style={styles.searchIcon} />
              </View>

              <TextInput
                onChangeText={(text) => this.searchKeyPress(text)}
                value={this.state.heName}
                // onKeyPress={this.searchKeyPress}
                allowFontScaling={false}
                style={Styles.TxtInput}
                placeholder="Type at least three characters"
                placeholderTextColor="#93999c"
              />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  this.setState({
                    heName: "",
                  });

                  if (
                    this.state.searchResData.length != 0 ||
                    this.state.no_search_items == true
                  ) {
                    this.clearFromcrossSearch();
                  }
                }}
              >
                <Image source={searchCloseBtn} style={styles.searchCloseIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", marginBottom: hp("1%") }}>
            <ScrollView
              keyboardShouldPersistTaps={"always"}
              // nestedScrollEnabled={true}
              // showsVerticalScrollIndicator={false}
              style={{
                width: "100%",
                height: hp("40%"),
                marginBottom: hp("1%"),
              }}
              // onMomentumScrollEnd={({nativeEvent}) => {
              //   if (this.isCloseToBottom(nativeEvent)) {
              //     if (this.state.setLoading == true) {
              //       this._onScroll();
              //     }
              //   }
              // }}
              //  scrollEventThrottle={1000}
              // onScroll={this._onScroll}
              // contentContainerStyle={{flex: 1}}
            >
              {this.props.isFocused ? (
                <View style={{ marginTop: hp("1") }}>
                  {this.state.searchResData.length === 0 &&
                  this.state.no_search_items === false ? (
                    <FlatList
                      keyboardShouldPersistTaps="always"
                      showsVerticalScrollIndicator={false}
                      extraData={this.state}
                      style={Styles.flatlist}
                      data={this.state.resData}
                      renderItem={this.renderRow}
                      keyExtractor={(item, index) => String(index)}
                      initialNumToRender={12}
                      windowSize={20}
                      // Performance settings
                      // removeClippedSubviews={true} // Unmount components when outside of window
                      // initialNumToRender={1} // Reduce initial render amount
                      // maxToRenderPerBatch={1} // Reduce number in each render batch
                      // updateCellsBatchingPeriod={2000} // Increase time between renders
                      // windowSize={2} // Reduce the window size
                      // onEndReached={this.handleLoadMore.bind(this)}
                      // onEndReachedThreshold={0.4}
                    />
                  ) : this.state.searchResData.length === 0 &&
                    this.state.no_search_items === true ? (
                    <View style={{ width: wp("92%") }}>
                      <View style={Styles.footerCardViewno}>
                        <Text
                          style={Styles.cardSubTxtno}
                          allowFontScaling={false}
                        >
                          No items to display
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <FlatList
                      keyboardShouldPersistTaps={"always"}
                      showsVerticalScrollIndicator={false}
                      extraData={this.state}
                      style={Styles.flatlist}
                      data={this.state.searchResData}
                      renderItem={this.renderRow}
                      keyExtractor={(item, index) => String(index)}
                      // onEndReached={() => this.handleLoadMore}
                      initialNumToRender={12}
                      windowSize={20}
                    />
                  )}
                </View>
              ) : null}
            </ScrollView>

            <MapView
              provider={PROVIDER_GOOGLE}
              style={Styles.map}
              showsUserLocation
              region={{
                // temporarily lat lng
                latitude: 51.848643,
                longitude: 0.687392,

                // correct lat lng
                // latitude: this.state.currentLat,
                // longitude: this.state.currentLon,

                // latitude: 51.721143,
                // longitude: 0.133049,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              <Marker
                coordinate={{
                  // temporarily lat lng
                  latitude: 51.848643,
                  longitude: 0.687392,

                  // correct lat lng
                  // latitude: this.state.currentLat,
                  // longitude: this.state.currentLon,
                }}
                title={"Your location"}
                description={"Your current location"}
              >
                <Image source={map_cur} style={{ height: 40, width: 40 }} />
              </Marker>
              {this.state.latlonList.map((e) => (
                <Marker
                  coordinate={{
                    latitude: e.lat,
                    longitude: e.lng,
                  }}
                  title={"Store"}
                  description={"Store Description"}
                >
                  <Image source={map_user} style={{ height: 40, width: 40 }} />
                </Marker>
              ))}
            </MapView>
          </View>

          {/* <Footer /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const { ids, styles } = StyleSheet.create({
  searchCloseIcon: {
    width: wp("2.5"),
    height: hp("2.5"),
    marginLeft: wp("2"),
    resizeMode: "contain",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("2.5"),
      height: hp("2.5"),
    },
    "@media (max-width: 450px)": {
      width: wp("3.5"),
      height: hp("3.5"),
    },
  },
  searchIcon: {
    width: wp("5.5"),
    height: hp("2.5"),
    resizeMode: "contain",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("5.5"),
    },
    "@media (max-width: 450px)": {
      width: wp("6.5"),
    },
  },

  footerCardView: {
    width: "100%",
    height: hp("11"),
    backgroundColor: "white",
    //marginLeft: 10,
    borderRadius: wp("2"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    marginLeft: "4%",
    marginTop: hp("1"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("11"),
    },
    "@media (max-width: 450px)": {
      height: hp("12"),
    },
  },

  cardImgView: {
    width: wp("20"),
    height: hp("11"),
    marginLeft: wp("0"),
    marginRight: wp("2"),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderBottomLeftRadius: wp("2"),
    borderTopLeftRadius: wp("2"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("11"),
    },
    "@media (max-width: 450px)": {
      height: hp("12"),
    },
  },
  cardSubImg: {
    width: wp("20"),
    height: hp("11"),
    borderBottomLeftRadius: wp("2"),
    borderTopLeftRadius: wp("2"),
    // width: 60,
    // height: 60,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("11"),
    },
    "@media (max-width: 450px)": {
      height: hp("12"),
    },
  },
  cardMainTxtView: {
    width: wp("70"),
    height: hp("11"),
    justifyContent: "center",
    marginBottom: wp("3"),
    marginTop: wp("2"),
    paddingRight: wp("2%"),
    backgroundColor: "white",
  },

  cardSubTxtView: {
    width: "100%",
    height: hp("4.2"),
    // paddingTop: 5,
    // paddingBottom: 5,
    //borderRadius: 10,
    //marginTop: '2%',
    alignItems: "flex-start",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp("4.2"),
    },
    "@media (max-width: 450px)": {
      height: hp("3.5"),
    },
  },
  cardSubTxtView2: {
    width: "100%",
    //height: hp('6'),
    height: "auto",
    marginTop: "-1%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  cardSubTxtView4: {
    width: "80%",
    //height: hp('6'),
    height: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  cardSubTxtView3: {
    width: "100%",
    //height: hp('6'),
    height: "auto",
    marginTop: "-3%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    "@media (max-width: 450px)": {
      marginTop: "0%",
    },
  },

  modalBody: {
    height: hp("6"),
    justifyContent: "center",
    // "@media (max-width: 1600px) and (min-width: 500px)": {
    //   height: hp("6"),
    // },
    // "@media (max-width: 500px)": {
    //   height: hp("6"),
    // },
  },
  modalView: {
    paddingBottom: hp("1"),
    height: hp("12"),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      marginTop: hp("-2"),
      height: hp("13"),
    },
  },
  modalViewCart: {
    paddingBottom: hp("1"),
    height: hp("12"),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      marginTop: hp("-2"),
      height: hp("13"),
    },
  },
});

function FindStoreWrapper(props) {
  const isFocused = useIsFocused();
  return <FindStore {...props} isFocused={isFocused} />;
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    adminCustomerID: state.findStore.adminCustomerID,
    itemCode: state.findStore.itemCode,
    cartItems: state.cart.items,
    accountInfo: state.login.accountInfo,
  };
};

export default connect(mapStateToProps, {
  getAdminAddress,
  getItemCode,
  getItemName,
  getAdminCustomerEmail,
  getAdminCustomerPhone,
  getAdminCustomerId,
  getAddressId,
  getAccCode,
  getItemOnStop,
  clearCart,
  setDiscounts:
    (pictorialPacketDiscount, openPollinatedDiscount, f1f2Discount, mail_order) =>
    (dispatch) =>
      dispatch({
        type: "SET_DISCOUNTS",
        payload: {
          pictorialPacketDiscount,
          openPollinatedDiscount,
          f1f2Discount,
          mail_order,
        },
      }),
})(FindStoreWrapper);
