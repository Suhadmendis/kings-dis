import React, { Component } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "../style/ProductDetailsStyles";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { FlatGrid } from "react-native-super-grid";
import NetInfo from "@react-native-community/netinfo";
import moment from "moment";
import { getQrCode } from "./QROperations/QRProductScanner";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
// import {tsDeclareFunction} from '@babel/types';
// import { getProductDetails } from "../actions/HomeScreenAction";
// import { Image } from "react-bootstrap";
import SearchBar from "./helperComponents/SearchBar";
import getBaseUrl from "../url/getBaseUrl";
import { addToCart } from "../actions/CartActions";
import Back from "./common/Back";
import { store } from "../../configureStore";
import { getProductDetails } from "../url/API";
import CustomSpinner from "./common/CustomSpinner";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BarCodeSection from "./BarCodeSection";
import _ from "lodash";

import { RawQuery } from "../offline/Services/DataHelper";

import DataAdapter from "../offline/localData/DataAdapter";
import * as colors from '../style/Common/ColorsStyle';

import CustomBreadCrumb from "./helperComponents/CustomBreadCrumb";
import FlashMessage from "react-native-flash-message";
import { checkDiscounts } from "../utils/checkDiscounts";
import {GetProductLinePricing} from "../offline/Services/ProductHelper";
import {GetDecimal, GetInteger} from "../utils/ValidationHelper";

import { useIsFocused, useScrollToTop } from '@react-navigation/native';

const search = require("../assets/search-green.png");
const filter = require("../assets/barcode.png");
const arrow = require("../assets/left-arrow.png");
const noImg = require("../assets/noimage.png");
const rectangle1 = require("../assets/pinkRec.png");
const rectangle2 = require("../assets/blueRec.png");
const rectangle3 = require("../assets/orangeRec.png");
const closeIcon = require("../assets/close-outline.png");

const { ids, styles } = Styles;


async function checkNetworkStatus() {
  NetInfo.fetch().then(state => {

    // this.setState({ isConnected: state.isConnected });
    return state.isConnected;


  });

}




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

async function getProduct(skuId) {
  const payload = {
    section: "PRODUCT DETAILS",
    opration: "GET PRODUCT",
    data: skuId,
  };

  console.log(payload);

  const newpro = await DataAdapter(payload);
  return newpro;
}




let sowingList_ = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

let sowingListMonths_ = [
  { month: "Ja", type: 1 },
  { month: "Fb", type: 2 },
  { month: "Ma", type: 1 },
  { month: "Ap", type: 2 },
  { month: "Ma", type: 1 },
  { month: "jn", type: 2 },
  { month: "Ju", type: 1 },
  { month: "Au", type: 2 },
  { month: "Se", type: 1 },
  { month: "Oc", type: 2 },
  { month: "Nv", type: 1 },
  { month: "De", type: 2 },
];

let priceOpts_ = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const EmptyListMessage = ({ item }) => {
  return (
    // Flat List Item
    <Text style={styles.emptyListStyle}>No Items</Text>
  );
};
let widthp = wp("100");

class ProductDetails extends Component {
  qtyInputs = [];

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      myNumber1: 0,
      myNumber2: 0,
      myNumber3: 0,
      myNumber4: 0,
      myNumber5: 0,
      myNumber6: 0,
      myNumber7: 0,
      myNumber8: 0,
      myNumber9: 0,
      myNumber10: 0,

      taxNumber1: 0,
      taxNumber2: 0,
      taxNumber3: 0,
      taxNumber4: 0,
      taxNumber5: 0,
      taxNumber6: 0,
      taxNumber7: 0,
      taxNumber8: 0,
      taxNumber9: 0,
      taxNumber10: 0,

      showRelatedProduct: true,
      black: true,
      logtime: 0,

      filteredDataSet: [],
      ltoken: "blank",
      loading: true,
      resData: [],
      searchResData: [],
      offset: 0,
      pagesize: 36,
      selectedstore: 1,
      scrollBegin: false,
      quantities: {},
      productItem: null,
      pictorialPacketSize: 1,
      barCodePanel : false,



      mainPackSize: '',
      pictorialItem: false,

      defaultQty_1: '0',
      defaultQty_2: '0',
      defaultQty_3: '0',
      defaultQty_4: '0',
      defaultQty_5: '0',
      defaultQty_6: '0',
      defaultQty_7: '0',
      defaultQty_8: '0',
      defaultQty_9: '0',
      defaultQty_10: '0',

      isConnected: false,



      catalogue: '',
      department: '',
      category: '',
      group: '',
      subCategory: '',

    };
  }

  handleQrCode = async (e) => {
    // setQuery(e.data);
    getQrCode(e, this.props.navigation);
    this.setState({
      barCodePanel: false,
    });
    // setShow(0)
  };

  // handleLoadMore = () => {
  //   console.log("handle more=====" + this.state.offset);
  //   this.setState({
  //     offset: this.state.offset + this.state.pagesize,
  //   });

  //   // console.log("new offset " + this.state.offset);
  //   // this.props.getProductDetails(this.props.loginToken);
  // };

  // _onScroll = () => {
  //   console.log("handle more=====" + this.state.offset);
  //   this.setState({
  //     offset: this.state.offset + this.state.pagesize,
  //   });

  //   // console.log("new offset " + this.state.offset);
  //   // this.props.getProductDetails(this.props.loginToken);
  // };

  // isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  //   const paddingToBottom = contentSize.height - 84;
  //   console.log("higher " + layoutMeasurement.height + contentOffset.y);
  //   console.log("contect " + paddingToBottom);
  //   return (
  //     layoutMeasurement.height + contentOffset.y >=
  //     contentSize.height - paddingToBottom
  //   );
  // };

  ChangeStates() {
    console.log("compon===================");
    console.log("Value 2: ", this.state.logtime);
    this.setState({
      myNumber1: 0,
      myNumber2: 0,
      myNumber3: 0,
      myNumber4: 0,
      myNumber5: 0,
      myNumber6: 0,
      myNumber7: 0,
      myNumber8: 0,
      myNumber9: 0,
      myNumber10: 0,
      logtime: 1,
      taxNumber1: 0,
      taxNumber2: 0,
      taxNumber3: 0,
      taxNumber4: 0,
      taxNumber5: 0,
      taxNumber6: 0,
      taxNumber7: 0,
      taxNumber8: 0,
      taxNumber9: 0,
      taxNumber10: 0,
    });
    console.log("Value : ", this.state.myNumber1);
  }

  _addToCart() {


    let itemsToAdd = [];

    let hasItems = false;
    _.map(this.state.quantities, (i, j) => {

      let quantity =  GetInteger(i);

      if (this.state.mainPackSize == "") {

      }else{
        let remainder = quantity % this.state.mainPackSize;
        quantity = quantity - remainder;
      }
console.log('00000000000000000000000000000000000000 ' , this.state.productItem);

      if (quantity > 0) {
        hasItems = true;

        itemsToAdd.push({
          ...this.state.productItem,
          priceLine: GetInteger(j),
          quantity,
          totalPrice: this.state["myNumber"+j],
          totalTax: this.state["taxNumber"+j]
        });

      }
    });



    if (hasItems) {

      this.props.addToCart({
        cartItems: itemsToAdd
      });

      showMessage({
        message: "KINGS SEEDS",
        description: "Items added to cart",
        type: "success",
        autoHide: true,
      });

      // this.props.navigation.navigate('carts', { time: Date.now() })
      this.clearQuantities();
    }else{
      showMessage({
        message: "KINGS SEEDS",
        description: "Items need to be added from the price options",
        type: "info",
        autoHide: true,
      });
    }
  }

  componentDidMount() {


    this.loadData();



  }


  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {


      console.log("loading product details...");
      this.loadData();
      this.clearQuantities();

    }
    console.log("quantites.....", this.state.quantities);
  }





  async loadData() {


    store.dispatch({ type: "CustomSpinner:SHOW" });


    const nav_object = await this.getNavObject(this.props.route.params.SkuId);
    this.setPath(nav_object);


    let state = store.getState();
    let isConnected_ = state.loading?.connectionStatus;




      if (isConnected_) {


        getProductDetails(this.props.route.params.SkuId)

        .then((data) => {

          let dueDate = data.dueDate.split(' ');

          data.dueDate = dueDate[0].replace('/','-');
          data.dueDate = data.dueDate.replace('/','-');





          this.setState({
            productItem: data,
          });

          this.props.scrollRef.current.scrollTo({ offset: 0, animated: true });


          store.dispatch({ type: "CustomSpinner:HIDE" });
        })
        .catch((error) => {
          store.dispatch({ type: "CustomSpinner:HIDE" });
        });



      }else{


        getProduct(this.props.route.params.SkuId).then((res) => {
          console.log('===========================0000000000000000000000000000000===========================================');
          console.log('111111111111111111111111111111111111111111111111111111111111111111 ',res);
          console.log('===========================0000000000000000000000000000000===========================================');
         // this.props.scrollRef.current.scrollTo({ offset: 0, animated: true });

          let tempPriceOption1 = {};
          let tempPriceOption2 = {};
          let tempPriceOption3 = {};
          let tempPriceOption4 = {};
          let tempPriceOption5 = {};
          let tempPriceOption6 = {};
          let tempPriceOption7 = {};
          let tempPriceOption8 = {};
          let tempPriceOption9 = {};
          let tempPriceOption10 = {};


          console.log(res[0]);

          let finalResult = {};
          if (res[0].SKUPrice1 != 0) {
            tempPriceOption1 = {1: {label: res[0].SKUPrice1Label, price: res[0].SKUPrice, priceDisplay: `£${res[0].SKUPrice}`}};
            finalResult = Object.assign(finalResult,tempPriceOption1);
          }else{
            tempPriceOption1 = {1: null}
            finalResult = Object.assign(finalResult,tempPriceOption1);
          }

          if (res[0].SKUPrice2 != 0) {
            tempPriceOption2 = {2: {label: res[0].SKUPrice2Label, price: res[0].SKUPrice2, priceDisplay: `£${res[0].SKUPrice2}`}};
            finalResult = Object.assign(finalResult,tempPriceOption2);
          }else{
            tempPriceOption2 =  {2: null};
            finalResult = Object.assign(finalResult,tempPriceOption2);
          }

          if (res[0].SKUPrice3 != 0) {
            tempPriceOption3 = {3: {label: res[0].SKUPrice3Label, price: res[0].SKUPrice3, priceDisplay: `£${res[0].SKUPrice3}`}};
            finalResult = Object.assign(finalResult,tempPriceOption3);
          }else{
            tempPriceOption3 =  {3: null};
            finalResult = Object.assign(finalResult,tempPriceOption3);
          }

          if (res[0].SKUPrice4 != 0) {
            tempPriceOption4 = {4: {label: res[0].SKUPrice4Label, price: res[0].SKUPrice4, priceDisplay: `£${res[0].SKUPrice4}`}};
            finalResult = Object.assign(finalResult,tempPriceOption4);
          }else{
            tempPriceOption4 =  {4: null};
            finalResult = Object.assign(finalResult,tempPriceOption4);
          }


          if (res[0].SKUPrice5 != 0) {
            tempPriceOption5 = {5: {label: res[0].SKUPrice5Label, price: res[0].SKUPrice5, priceDisplay: `£${res[0].SKUPrice5}`}};
            finalResult = Object.assign(finalResult,tempPriceOption5);
          }else{
            tempPriceOption5 =  {5: null};
            finalResult = Object.assign(finalResult,tempPriceOption5);
          }


          if (res[0].SKUPrice6 != 0) {
            tempPriceOption6 = {6: {label: res[0].SKUPrice6Label, price: res[0].SKUPrice6, priceDisplay: `£${res[0].SKUPrice6}`}};
            finalResult = Object.assign(finalResult,tempPriceOption6);
          }else{
            tempPriceOption6 =  {6: null};
            finalResult = Object.assign(finalResult,tempPriceOption6);
          }



          if (res[0].SKUPrice7 != 0) {
            tempPriceOption7 = {7: {label: res[0].SKUPrice7Label, price: res[0].SKUPrice7, priceDisplay: `£${res[0].SKUPrice7}`}};
            finalResult = Object.assign(finalResult,tempPriceOption7);
          }else{
            tempPriceOption7 =  {7: null};
            finalResult = Object.assign(finalResult,tempPriceOption7);
          }


          if (res[0].SKUPrice8 != 0) {
            tempPriceOption8 = {8: {label: res[0].SKUPrice8Label, price: res[0].SKUPrice8, priceDisplay: `£${res[0].SKUPrice8}`}};
            finalResult = Object.assign(finalResult,tempPriceOption8);
          }else{
            tempPriceOption8 =  {8: null};
            finalResult = Object.assign(finalResult,tempPriceOption8);
          }


          if (res[0].SKUPrice9 != 0) {
            tempPriceOption9 = {9: {label: res[0].SKUPrice9Label, price: res[0].SKUPrice9, priceDisplay: `£${res[0].SKUPrice9}`}};
            finalResult = Object.assign(finalResult,tempPriceOption9);
          }else{
            tempPriceOption9 =  {9: null};
            finalResult = Object.assign(finalResult,tempPriceOption9);
          }


          if (res[0].SKUPrice10 != 0) {
            tempPriceOption10 = {10: {label: res[0].SKUPrice10Label, price: res[0].SKUPrice10, priceDisplay: `£${res[0].SKUPrice10}`}};
            finalResult = Object.assign(finalResult,tempPriceOption10);
          }else{
            tempPriceOption10 =  {10: null};
            finalResult = Object.assign(finalResult,tempPriceOption10);
          }

          // console.log('----------------------p opt-----------------------');
          // console.log(finalResult);
          // console.log('----------------------p opt-----------------------');


          // let priceOptions = {
          // 1: {label: "25 Grams", price: 9.23, priceDisplay: "£9.23"},
          // 10: {label: "250 Grams", price: 69.19, priceDisplay: "£69.19"},
          // 2: {label: "50 Grams", price: 16.14, priceDisplay: "£16.14"},
          // 3: {label: "75 Grams", price: 24.45, priceDisplay: "£24.45"},
          // 4: {label: "100 Grams", price: 31.37, priceDisplay: "£31.37"},
          // 5: {label: "125 Grams", price: 36.9, priceDisplay: "£36.90"},
          // 6: {label: "150 Grams", price: 43.82, priceDisplay: "£43.82"},
          // 7: {label: "175 Grams", price: 50.28, priceDisplay: "£50.28"},
          // 8: {label: "200 Grams", price: 56.27, priceDisplay: "£56.27"},
          // 9: {label: "225 Grams", price: 62.27, priceDisplay: "£62.27"}};


          // {"SKUAnalysis": "FLOWER", "SKUAvailableInDays": null, "SKUAvailableItems": 0, "SKUBarCode": null, "SKUBrandID": null, "SKUBundleInventoryType": "REMOVEBUNDLE", "SKUBundleItemsCount": null, "SKUCatNumber": null, "SKUClassCode": "cd.stock", "SKUClassTable": "cd_stock", "SKUCollectionID": null, "SKUConversionName": null, "SKUConversionValue": "0", "SKUCreated": "2021-09-21T16:08:07", "SKUCustomData": null, "SKUDataSetID": 1, "SKUDelMonth": null, "SKUDepartmentID": null, "SKUDepth": null, "SKUDescription": null, "SKUEnabled": 1, "SKUEproductFilesCount": null, "SKUFeatures": null, "SKUGUID": "b2e672d8-3c5a-4f66-9404-6723735c9cfe", "SKUHeight": null, "SKUID": 9489, "SKUImageLocation": "/CMS/no-image.png", "SKUImagePath": null, "SKUInStoreFrom": null, "SKUInternalStatusID": null, "SKULastModified": "2022-02-14T13:13:32.9159913", "SKUManufacturerID": null, "SKUMaxItemsInOrder": null, "SKUMembershipGUID": null, "SKUMinItemsInOrder": null, "SKUName": "ANTIRRHINUM  Sonnet Orange Scarlet F1", "SKUNeedsShipping": 1, "SKUNumber": "ANT 376", "SKUOptionCategoryID": null, "SKUOrder": null, "SKUPackSize": "F1", "SKUParentSKUID": null, "SKUPictorialPackSize": null, "SKUPrice": 7.25, "SKUPrice10": 0, "SKUPrice10Label": "1000 Seeds", "SKUPrice1Label": "250 Seeds", "SKUPrice2": 0, "SKUPrice2Label": "1000 Seeds", "SKUPrice3": 0, "SKUPrice3Label": "1000 Seeds", "SKUPrice4": 0, "SKUPrice4Label": "1000 Seeds", "SKUPrice5": 0, "SKUPrice5Label": "1000 Seeds", "SKUPrice6": 0, "SKUPrice6Label": "1000 Seeds", "SKUPrice7": 0, "SKUPrice7Label": "1000 Seeds", "SKUPrice8": 0, "SKUPrice8Label": "1000 Seeds", "SKUPrice9": 0, "SKUPrice9Label": "1000 Seeds", "SKUProductType": "PRODUCT", "SKUPublicStatusID": null, "SKUReorderAt": null, "SKURetailPrice": null, "SKUSellOnlyAvailable": 1, "SKUShortDescription": null, "SKUSiteID": null, "SKUSupplierID": null, "SKUTaxClassID": null, "SKUTrackInventory": "ByProduct", "SKUValidFor": null, "SKUValidUntil": null, "SKUValidity": null, "SKUWeight": 0, "SKUWidth": null, "SkuDiscountCat": "C", "priceOptions": {"1": {"label": "250 Seeds", "price": 5.73, "priceDisplay": "£5.73"}, "10": null, "2": null, "3": null, "4": null, "5": null, "6": null, "7": null, "8": null, "9": null}}

          let availableForSale = false;

          if(res[0].SKUEnabled == '1'){
            if (res[0].SKUAvailableItems) {
              availableForSale = true;
            }else{
              availableForSale = false;
            }
          }else{
            availableForSale = false;
          }

          let rel_products = [];
          let pob_products = [];


          if(res[0].relatedProducts!= []){

            for (let i = 0; i < res[0].relatedProducts.length; i++) {
              const element = res[0].relatedProducts[i];

              let chkAvailable = false;
              if(element.SKUAvailableItems > 0){
                chkAvailable = true;
              }

              let obj = {
                imageURL : null,
                availability: chkAvailable,
                code: element.SKUNumber,
                name: element.SKUName,
                skuId:element.SKUID,
                packSize: element.SKUPackSize,
                price: element.SKUPrice,
              }

              rel_products.push(obj)
            }


          }


          if(res[0].alsoBoughtProducts!= []){

            for (let i = 0; i < res[0].alsoBoughtProducts.length; i++) {
              const element = res[0].alsoBoughtProducts[i];

              let chkAvailable = false;
              if(element.SKUAvailableItems > 0){
                chkAvailable = true;
              }

              let obj = {
                imageURL : null,
                availability: chkAvailable,
                code: element.SKUNumber,
                name: element.SKUName,
                skuId:element.SKUID,
                packSize: element.SKUPackSize,
                price: element.SKUPrice,
              }

              pob_products.push(obj)
            }


          }


          let dueDate = res[0].SKUInStoreFrom == null ? '' : this.getFormattedDate(res[0].SKUInStoreFrom);

          dueDate = dueDate == 'undefined-undefined-' ? null : dueDate;

          console.log(dueDate);

          let tempProduct = {
              alsoBoughtProducts: pob_products,
              barcode: "",
              beeLogo: "",
              dueDate: res[0].SKUInStoreFrom == null ? '' : this.getFormattedDate(res[0].SKUInStoreFrom),
              currencySymbol: "£",
              imagesMain: [
                {"imageID": "image", "imageNumber": res[0].SKUNumber, "imagePath": "https://sop.kingsseeds.com/CMS/no-image.png", "skuName": res[0].SKUName}],
              imagesThumb: [
                  {"imageID": "image", "imageNumber": res[0].SKUNumber, "imagePath": "https://sop.kingsseeds.com/CMS/no-image.png", "skuName": res[0].SKUName}],
              isOrderingDisabled: res[0].isOrderingDisabled,
              isSKUAvailableForSale: false,
              // priceDisplay: "£9.23 - £69.19",
              priceDisplay: "HC",
             // priceOptions: finalResult,
              priceOptions: res[0].priceOptions,
              propagationData: res[0].propagationData,
               relatedProducts: rel_products,
              skuDescription: "",
              skuDiscountCat: res[0].SkuDiscountCat,
              skuFeatures: "",
              skuAvailableItems: res[0].SKUAvailableItems,
              skuName: res[0].SKUName,
              skuNumber: res[0].SKUNumber,
              skuPackSize: "Op",
              skuWeight: 0,
              skuid: res[0].SKUID,
          }

          console.log('-----------------------------fffff---');
          console.log(tempProduct.propagationData.notes);
          this.setState({
            productItem: tempProduct,
          });

          this.props.scrollRef.current.scrollTo({ offset: 0, animated: true });
        });

      }










      getPictorialPackSize(this.props.route.params.SkuId).then((res) => {
        // this.setState({ pictorialPacketSize: res });

        console.log('----------------------------sdgsd-');

        console.log(res);

        if (res[0] == "A") {
          this.setState({ pictorialItem: true });
        }else{
          this.setState({ pictorialItem: false });
        }

        this.setState({ mainPackSize: res[1] });



      });


  }


  getNavObject = async (id) => {

    const res = await RawQuery(`SELECT Nav_Navigation from local_int_navigation where Nav_SKUID = '${id}'`);

    if(res.length > 0) {
      return res.item(0).Nav_Navigation;
    }else{
      return "";
    }

  }

  setPath = async (navObject) => {


    const NodeAliasPath = navObject.split('/');

    this.setState({ catalogue: NodeAliasPath[0] })
    this.setState({ department: NodeAliasPath[1] })
    this.setState({ category: NodeAliasPath[2] })
    this.setState({ group: NodeAliasPath[3] })
    this.setState({ subCategory: NodeAliasPath[4] })

  }



  getFormattedDate(dueDate){

    let d_date = dueDate.replace("/","-");
    d_date = d_date.replace("/","-");
    d_date = d_date.split("T");
    d_date = d_date[0].split("-");
    d_date = d_date[2] + "-" + d_date[1] + "-" + d_date[0];
    return d_date;

  }

  componentWillUnmount() {
    this.clearQuantities();
  }

  clearQuantities() {
    this.setState({
      myNumber1: 0,
      myNumber2: 0,
      myNumber3: 0,
      myNumber4: 0,
      myNumber5: 0,
      myNumber6: 0,
      myNumber7: 0,
      myNumber8: 0,
      myNumber9: 0,
      myNumber10: 0,
      subTotal: 0.0,
      quantities: {},
      taxNumber1: 0,
      taxNumber2: 0,
      taxNumber3: 0,
      taxNumber4: 0,
      taxNumber5: 0,
      taxNumber6: 0,
      taxNumber7: 0,
      taxNumber8: 0,
      taxNumber9: 0,
      taxNumber10: 0,
      defaultQty_1: '0',
      defaultQty_2: '0',
      defaultQty_3: '0',
      defaultQty_4: '0',
      defaultQty_5: '0',
      defaultQty_6: '0',
      defaultQty_7: '0',
      defaultQty_8: '0',
      defaultQty_9: '0',
      defaultQty_10: '0',
    });
    this.qtyInputs.map((i, j) => {


      if (this.qtyInputs[j] != null) {
        this.qtyInputs[j].clear();
      }


    });
  }



  checkShowingTime = (type, month) => {
    //console.log(this.state.productItem.priceOptions['1']);

    if (type === "sow") {
      var data = this.state.productItem.propagationData.sow
        ? this.state.productItem.propagationData.sow.split(",")
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    } else if (type === "plant") {
      var data = this.state.productItem.propagationData.plant
        ? this.state.productItem.propagationData.plant.split(",")
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    } else if (type === "harvest") {
      var data = this.state.productItem.propagationData.harvest
        ? this.state.productItem.propagationData.harvest.split(",")
        : null;

      if (data !== null) {
        return data.includes(month);
      } else {
        return false;
      }
    }
  };

  getSubTotal() {
    return (
      this.state.myNumber1 +
      this.state.myNumber2 +
      this.state.myNumber3 +
      this.state.myNumber4 +
      this.state.myNumber5 +
      this.state.myNumber6 +
      this.state.myNumber7 +
      this.state.myNumber8 +
      this.state.myNumber9 +
      this.state.myNumber10
    );
  }

  getTotalTax() {
    return (
        this.state.taxNumber1 +
        this.state.taxNumber2 +
        this.state.taxNumber3 +
        this.state.taxNumber4 +
        this.state.taxNumber5 +
        this.state.taxNumber6 +
        this.state.taxNumber7 +
        this.state.taxNumber8 +
        this.state.taxNumber9 +
        this.state.taxNumber10
    );
  }

  // onChanged(text) {
  //   let newText = '';
  //   let numbers = '0123456789';

  //   for (var i = 0; i < text.length; i++) {
  //     if (numbers.indexOf(text[i]) > -1) {
  //       newText = newText + text[i];
  //     }
  //     else {
  //       // your call back function
  //       alert("please enter numbers only");
  //     }
  //   }
  //   this.setState({ myNumber: newText });
  //   this.setState({ myNumber2: newText });
  //   this.setState({ myNumber3: newText });
  // }

  renderRow2 = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.relproductsButton}
        onPress={() => {
          this.props.navigation.navigate('productDetails', {SkuId: item.skuId});
        }}>
        <View style={styles.item2}>
          <View
            style={{
              width: '100%',
              height: '45%',
              // marginTop: '%',
              alignItems: 'center',
            }}>
            {/* <Image source={no} style={styles.itemImage} /> */}
            {item.imageURL == null ? (
              <Image source={noImg} style={styles.itemImage} />
            ) : (
              <Image source={{uri: item.imageURL}} style={styles.itemImage} />
            )}
          </View>
          <View style={styles.cardMainTxtView1}>
            <View style={{marginTop: hp('-1%')}}>
              <View style={styles.cardSubTxtView}>
                <Text
                  // numberOfLines={1}
                  style={styles.cardSubMainTxt}
                  allowFontScaling={false}
                  numberOfLines={2}>
                  {item.name.length < 38
                    ? `${item.name}`
                    : `${item.name.substring(0, 38)}...`}
                </Text>
              </View>
              <View style={styles.cardSubTxtView2}>
                <Text style={styles.cardSubTxt} allowFontScaling={false}>
                  Code : {item.code}
                </Text>
              </View>
              {/*<View style={styles.cardSubTxtView4}>
                <Text style={styles.packtxt} allowFontScaling={false}>
                  Pack Size :
                </Text>
                <Text style={styles.cardSubTxt1} allowFontScaling={false}>
                  {item.packSize}
                </Text>
              </View>*/}
              <View style={styles.cardSubTxtView5}>
                <Text style={styles.stocktxt} allowFontScaling={false}>
                  Stock :
                </Text>
                {item.availability === true ? (
                  <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                    In Stock
                  </Text>
                ) : (
                  <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                    Out of Stock
                  </Text>
                )}
              </View>
              <View style={styles.cardSubTxtView3}>
                <Text style={styles.priceTxt} allowFontScaling={false}>
                  {item.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderRow3 = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.relproductsButton}
        onPress={() =>
          this.props.navigation.navigate('productDetails', { SkuId: item.skuId })
        }
      >
        <View style={styles.item2}>
          <View
            style={{
              width: "100%",
              height: "45%",
              // marginTop: '%',
              //backgroundColor: 'green',
              alignItems: "center",
            }}
          >
            {/* <Image source={no} style={styles.itemImage} /> */}
            {item.imageURL == null ? (
              <Image source={noImg} style={styles.itemImage} />
            ) : (
              <Image source={{uri: item.imageURL}} style={styles.itemImage} />
            )}
          </View>
          <View style={styles.cardMainTxtView1}>
            <View style={{ marginTop: hp("-1%") }}>
              <View style={styles.cardSubTxtView}>
                <Text
                  // numberOfLines={1}
                  style={styles.cardSubMainTxt}
                  allowFontScaling={false}
                >
                  {item.name.length < 38
                    ? `${item.name}`
                    : `${item.name.substring(0, 38)}...`}
                </Text>
              </View>
              <View style={styles.cardSubTxtView2}>
                <Text style={styles.cardSubTxt} allowFontScaling={false}>
                  Code : {item.code}
                </Text>
              </View>
              {/*<View style={styles.cardSubTxtView4}>
                <Text style={styles.packtxt} allowFontScaling={false}>
                  Pack Size :
                </Text>
                <Text style={styles.cardSubTxt1} allowFontScaling={false}>
                  {item.packSize}
                </Text>
              </View>*/}
              <View style={styles.cardSubTxtView5}>
                <Text style={styles.stocktxt} allowFontScaling={false}>
                  Stock :
                </Text>
                {item.availability === true ? (
                    <Text style={styles.cardSubTxt2} allowFontScaling={false}>
                      In Stock
                    </Text>
                ) : (
                    <Text style={styles.cardSubTxt3} allowFontScaling={false}>
                      Out of Stock
                    </Text>
                )}
              </View>
              <View style={styles.cardSubTxtView3}>
                <Text style={styles.priceTxt} allowFontScaling={false}>
                  {item.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  async priceCalculation(text, num) {
    //update total price and quantities object in state
    console.log(text + "E/" + num);
    if (text == "") {
      text = 0;
    }

    if (/^[-+]?[0-9]+$/.test(text)) {
      let tot = GetDecimal(this.state.productItem.priceOptions[num].price) * GetInteger(text); // fallback
      let tax = 0; // fallback
      try {

        console.log('linePricing======================f==========');
        let linePricing = await GetProductLinePricing(this.state.productItem.skuNumber, num, text);

        console.log('linePricing================================');
        console.log(linePricing);
        tot = linePricing.LinePrice;
        tax = linePricing.LineTax;
      } catch (e) {
        console.log("GetProductLinePricing Error... ", e);
      }

      console.log(text, this.state.quantities);
      switch (num) {
        case "1":
          this.setState((prevState) => ({
            myNumber1: tot,
            taxNumber1: tax,
            quantities: {
              ...prevState.quantities,
              1: GetDecimal(text),
            },
          }));
          break;
        case "2":
          this.setState((prevState) => ({
            myNumber2: tot,
            taxNumber2: tax,
            quantities: {
              ...prevState.quantities,
              2: GetDecimal(text),
            },
          }));
          break;
        case "3":
          this.setState((prevState) => ({
            myNumber3: tot,
            taxNumber3: tax,
            quantities: {
              ...prevState.quantities,
              3: GetDecimal(text),
            },
          }));
          break;
        case "4":
          this.setState((prevState) => ({
            myNumber4: tot,
            taxNumber4: tax,
            quantities: {
              ...prevState.quantities,
              4: GetDecimal(text),
            },
          }));
          break;
        case "5":
          this.setState((prevState) => ({
            myNumber5: tot,
            taxNumber5: tax,
            quantities: {
              ...prevState.quantities,
              5: GetDecimal(text),
            },
          }));
          break;
        case "6":
          this.setState((prevState) => ({
            myNumber6: tot,
            taxNumber6: tax,
            quantities: {
              ...prevState.quantities,
              6: GetDecimal(text),
            },
          }));
          break;
        case "7":
          this.setState((prevState) => ({
            myNumber7: tot,
            taxNumber7: tax,
            quantities: {
              ...prevState.quantities,
              7: GetDecimal(text),
            },
          }));
          break;
        case "8":
          this.setState((prevState) => ({
            myNumber8: tot,
            taxNumber8: tax,
            quantities: {
              ...prevState.quantities,
              8: GetDecimal(text),
            },
          }));
          break;
        case "9":
          this.setState((prevState) => ({
            myNumber9: tot,
            taxNumber9: tax,
            quantities: {
              ...prevState.quantities,
              9: GetDecimal(text),
            },
          }));
          break;
        case "10":
          this.setState((prevState) => ({
            myNumber10: tot,
            taxNumber10: tax,
            quantities: {
              ...prevState.quantities,
              10: GetDecimal(text),
            },
          }));
          break;
      }
    } else {
      alert("please enter numbers only");
    }
  }



  render() {
    const { preseasonStatus } = this.props;



    return (
      <SafeAreaView  style={{flex: 1}}>
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
                }}>
                <Image source={closeIcon} style={styles.filterIcon} />
              </TouchableOpacity>
              <BarCodeSection getQrCode={this.handleQrCode} />
            </View>
          ) : null}
          {/* <Header/> */}

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


          <CustomBreadCrumb
              catalogue={this.state.catalogue}
              department={this.state.department}
              category={this.state.category}
              group={this.state.group}
              subCategory={this.state.subCategory}
              upto={3} // 0 - CATLOGUE, 1 - DEPARTMENT, 2 - CATEGORY, 3 - SUB CATEGORY
            />

          <View style={{height: '100%'}}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}
              ref={this.props.scrollRef}
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}
              // onMomentumScrollEnd={({nativeEvent}) => {
              //   if (this.isCloseToBottom(nativeEvent)) {
              //     this._onScroll();
              //   }
              // }}
              scrollEventThrottle={400}>
              {this.state.productItem !== null && (
                <View>
                  <View style={styles.row}>
                    <View style={[styles.box, styles.box1]}>
                      <View style={styles.mainImage}>
                        <View style={styles.imageView}>
                          <Image
                            source={{
                              uri: this.state.productItem.imagesMain[0]
                                .imagePath,
                            }}
                            style={styles.itemImage}
                            resizeMode="cover"
                          />
                        </View>

                      </View>


                      <View style={styles.detailBox}>
                          <View style={styles.insideBox}>
                            <View style={{marginTop: hp('-1%')}}>
                              <View style={styles.titleView}>
                                <Text
                                  // numberOfLines={1}
                                  style={styles.titleTxt}
                                  allowFontScaling={false}>
                                  {this.state.productItem.skuName}
                                </Text>
                              </View>
                            </View>
                            <View style={{marginTop: hp('1')}}>
                              <View style={styles.subView}>
                                <Text
                                  style={styles.productNum}
                                  allowFontScaling={false}>
                                  Code :
                                </Text>
                                <Text
                                  style={styles.subTxt}
                                  allowFontScaling={false}>
                                  {this.state.productItem.skuNumber}
                                </Text>
                              </View>
                              {/*<View style={styles.sizeView}>
                                <Text
                                  style={styles.packtxt2}
                                  allowFontScaling={false}
                                >
                                  Pack Size:
                                </Text>
                                <Text
                                  style={styles.sizeTxt}
                                  allowFontScaling={false}
                                >
                                  {this.state.productItem.skuPackSize}
                                </Text>
                              </View>*/}
                              <View style={styles.stockView}>
                                <Text
                                  style={styles.stocktxt2}
                                  allowFontScaling={false}>
                                  Stock :
                                </Text>
                                <Text
                                  style={styles.storeTxt}
                                  allowFontScaling={false}>
                                  {/* {
                                    this.state.pictorialItem == true && this.state.productItem.isSKUAvailableForSale==true? (
                                      <Text style={{color:'#1ED18C'}}>{this.state.productItem.skuAvailableItems} Itmes</Text>
                                    ) :
                                    (
                                      <Text style={{color:'red'}}>0</Text>
                                    )
                                  } */}

                                  {this.state.productItem
                                    .skuAvailableItems != 0 ? (
                                    <Text style={{color: '#1ED18C'}}>
                                      {this.state.pictorialItem == true
                                        ? this.state.productItem
                                            .skuAvailableItems + ' Items'
                                        : 'In Stock'}
                                    </Text>
                                  ) : (
                                    <Text style={{color: 'red'}}>
                                      {this.state.pictorialItem == true
                                        ? 'Out of Stock'
                                        : 'Out of Stock'}
                                    </Text>
                                  )}
                                </Text>
                              </View>


                            {this.state.productItem.skuAvailableItems != 0
                                 && this.state.pictorialItem == true && this.state.pictorialItem.dueDate != null ? (
                              <View style={styles.stockDateView}>
                                  <Text
                                    style={styles.stocktxt2}
                                    allowFontScaling={false}>
                                Due :
                              </Text>
                              <Text
                                    style={styles.storeTxt}
                                    allowFontScaling={false}>
                                    <Text style={{color: '#1ED18C'}}>
                                      {this.state.productItem.dueDate}
                                    </Text>
                                  </Text>
                            </View>
                            ) : null}



                            </View>
                          </View>
                        </View>

                      {this.state.productItem.propagationData.notes != 'null' && this.state.productItem.propagationData.notes !== null && this.state.productItem.propagationData.notes.trim() !== '' && (
                          <View style={styles.notes}>
                            <Text
                              style={styles.notesTxt}
                              allowFontScaling={false}>
                              {this.state.productItem.propagationData.notes}
                            </Text>
                          </View>
                        )}

                      {this.state.productItem.propagationData.sow == '' ||
                      (this.state.productItem.propagationData.sow == null &&
                        this.state.productItem.propagationData.plant == '') ||
                      (this.state.productItem.propagationData.sow == null &&
                        this.state.productItem.propagationData.notes == '') ||
                      this.state.productItem.propagationData.sow ==
                        null ? null : (
                        <View style={styles.showBox}>
                          <View style={styles.showBox2}>
                            <View style={styles.showBoxView1}>
                              <Text
                                // numberOfLines={1}
                                style={styles.topicTxt}
                                allowFontScaling={false}>
                                Sowing & Harvest Times
                              </Text>
                            </View>
                            <View style={styles.showBoxView2}>
                              <Image
                                source={rectangle1}
                                style={styles.recImg}
                              />
                              <Text
                                // numberOfLines={1}
                                style={styles.text1}
                                allowFontScaling={false}>
                                Sow
                              </Text>
                              <Image
                                source={rectangle2}
                                style={styles.recImg}
                              />
                              <Text
                                // numberOfLines={1}
                                style={styles.text1}
                                allowFontScaling={false}>
                                Plant
                              </Text>
                              <Image
                                source={rectangle3}
                                style={styles.recImg}
                              />
                              <Text
                                // numberOfLines={1}
                                style={styles.text1}
                                allowFontScaling={false}>
                                Harvest
                              </Text>
                              {/*<Image source={rectangle1} style={styles.recImg}/>*/}
                              {/*<Text*/}
                              {/*    // numberOfLines={1}*/}
                              {/*    style={styles.text1}*/}
                              {/*    allowFontScaling={false}*/}
                              {/*>*/}
                              {/*  Notes*/}
                              {/*</Text>*/}
                            </View>
                          </View>

                          <View style={styles.showBox3}>
                            {/* <Image source={calander} style={styles.calImg} /> */}
                            <View style={styles.calBox1}>
                              <View style={styles.rowCal}>
                                {sowingListMonths_.map((e, index) =>
                                  e.type === 1 ? (
                                    <View style={styles.boxCal}>
                                      <Text
                                        style={styles.month1}
                                        allowFontScaling={false}>
                                        {e.month}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View style={styles.boxCal1}>
                                      <Text
                                        style={styles.month2}
                                        allowFontScaling={false}>
                                        {e.month}
                                      </Text>
                                    </View>
                                  ),
                                )}
                              </View>
                            </View>
                            {/* sow */}
                            <View style={styles.calBox2}>
                              <View style={styles.rowSow}>
                                {sowingList_.map((elementInArray, index) => (
                                  <View style={styles.sowBox}>
                                    {this.checkShowingTime(
                                      'sow',
                                      elementInArray,
                                    ) ? (
                                      <View style={styles.sow}></View>
                                    ) : (
                                      <View />
                                    )}
                                  </View>
                                ))}
                              </View>
                            </View>
                            {/* plant */}
                            <View style={styles.calBox3}>
                              <View style={styles.rowPlant}>
                                {sowingList_.map((elementInArray, index) => (
                                  <View style={styles.plantBox}>
                                    {this.checkShowingTime(
                                      'plant',
                                      elementInArray,
                                    ) ? (
                                      <View style={styles.plant}></View>
                                    ) : (
                                      <View />
                                    )}
                                  </View>
                                ))}
                              </View>
                            </View>
                            {/* harvest */}
                            <View style={styles.calBox4}>
                              <View style={styles.rowHarves}>
                                {sowingList_.map((elementInArray, index) => (
                                  <View style={styles.harvesBox}>
                                    {this.checkShowingTime(
                                      'harvest',
                                      elementInArray,
                                    ) ? (
                                      <View style={styles.harves}></View>
                                    ) : (
                                      <View />
                                    )}
                                  </View>
                                ))}
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>



                    <View style={[styles.box, styles.box2]}>
                      <View style={styles.listView}>
                      {
                          this.state.productItem != null && this.state.productItem.priceOptions != null ? (
                            <View style={styles.mainListView}>
                            <View style={styles.rowView1}>
                              <Text
                                style={[styles.topicTxt, {marginLeft: 15}]}
                                allowFontScaling={false}>
                                Price Options
                              </Text>
                            </View>
                            {/* {this.state.productItem.priceOptions['1'] !== null ? 'view': ''}  */}
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['1'] == null
                                  ? {backgroundColor: 'green'}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['1'] !== null
                                  ? this.state.productItem.priceOptions['1'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['1'] !== null
                                  ? this.state.productItem.priceOptions['1']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['1'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['1'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[0] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_1: text});
                                    this.priceCalculation(text, '1');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_1 == "0") {
                                      console.log(this.state.defaultQty_1);
                                      this.setState({ defaultQty_1: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_1 == '') {
                                      this.setState({defaultQty_1: '0' });
                                    }



                                    const runningValue =
                                      parseInt(this.state.defaultQty_1) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        let bal_val = 0
                                        let value=0
                                        if (runningValue < this.state.mainPackSize) {
                                          bal_val =
                                          runningValue % this.state.mainPackSize;
                                          bal_val = this.state.mainPackSize - bal_val
                                          if (bal_val > 0) {
                                            showMessage({
                                              message: 'KINGS SEEDS',
                                              description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Increased By - ${bal_val}`,
                                              type: 'warning',
                                              autoHide: true,
                                            });
                                          }
                                          value = runningValue + bal_val;
                                        }else{
                                         bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                         value = runningValue - bal_val;
                                        }


                                        this.setState({
                                          defaultQty_1: value.toString(),
                                        });
                                        this.priceCalculation(value, '1');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_1: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '1');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_1}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}

                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['1'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['1'] !== null
                                  ? this.state.myNumber1.toFixed(2)
                                  : ''}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['2'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['2'] !== null
                                  ? this.state.productItem.priceOptions['2'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['2'] !== null
                                  ? this.state.productItem.priceOptions['2']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['2'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>

                              {this.state.productItem.priceOptions['2'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[1] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_2: text});
                                    this.priceCalculation(text, '2');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_2 == "0") {
                                      console.log(this.state.defaultQty_2);
                                      this.setState({ defaultQty_2: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_2 == '') {
                                      this.setState({defaultQty_2: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_2) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_2: value.toString(),
                                        });
                                        this.priceCalculation(value, '2');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_2: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '2');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_2}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}

                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['2'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['2'] !== null
                                  ? this.state.myNumber2.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber2} */}
                                {/* {(this.state.productItem.priceOptions["2"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['3'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['3'] !== null
                                  ? this.state.productItem.priceOptions['3'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['3'] !== null
                                  ? this.state.productItem.priceOptions['3']
                                      .priceDisplay
                                  : ''}
                              </Text>

                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['3'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['3'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[2] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_3: text});
                                    this.priceCalculation(text, '3');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_3 == "0") {
                                      console.log(this.state.defaultQty_3);
                                      this.setState({ defaultQty_3: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_3 == '') {
                                      this.setState({defaultQty_3: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_3) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_3: value.toString(),
                                        });
                                        this.priceCalculation(value, '3');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_3: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '3');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_3}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['3'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['3'] !== null
                                  ? this.state.myNumber3.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber3} */}
                                {/* £{(this.state.productItem.priceOptions["3"].price) * this.state.myNumber3} */}
                                {/* £{(this.state.productItem.priceOptions["3"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['4'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['4'] !== null
                                  ? this.state.productItem.priceOptions['4'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['4'] !== null
                                  ? this.state.productItem.priceOptions['4']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['4'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['4'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[3] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_4: text});
                                    this.priceCalculation(text, '4');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_4 == "0") {
                                      console.log(this.state.defaultQty_4);
                                      this.setState({ defaultQty_4: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_4 == '') {
                                      this.setState({defaultQty_4: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_4) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_4: value.toString(),
                                        });
                                        this.priceCalculation(value, '4');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_4: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '4');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_4}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {/* £{this.state.myNumber4} */}
                                {this.state.productItem.priceOptions['4'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['4'] !== null
                                  ? this.state.myNumber4.toFixed(2)
                                  : ''}
                                {/* £{(this.state.productItem.priceOptions["4"].price) * this.state.myNumber4} */}
                                {/* £ {(this.state.productItem.priceOptions["4"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['5'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['5'] !== null
                                  ? this.state.productItem.priceOptions['5'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['5'] !== null
                                  ? this.state.productItem.priceOptions['5']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['5'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['5'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[4] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_5: text});
                                    this.priceCalculation(text, '5');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_5 == "0") {
                                      console.log(this.state.defaultQty_5);
                                      this.setState({ defaultQty_5: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_5 == '') {
                                      this.setState({defaultQty_5: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_5) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_5: value.toString(),
                                        });
                                        this.priceCalculation(value, '5');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_5: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '5');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_5}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['5'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['5'] !== null
                                  ? this.state.myNumber5.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber5} */}
                                {/* £{(this.state.productItem.priceOptions["5"].price) * this.state.myNumber5} */}
                                {/* £ {(this.state.productItem.priceOptions["5"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['6'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['6'] !== null
                                  ? this.state.productItem.priceOptions['6'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['6'] !== null
                                  ? this.state.productItem.priceOptions['6']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['6'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['6'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[5] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_6: text});
                                    this.priceCalculation(text, '6');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_6 == "0") {
                                      console.log(this.state.defaultQty_6);
                                      this.setState({ defaultQty_6: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_6 == '') {
                                      this.setState({defaultQty_6: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_6) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_6: value.toString(),
                                        });
                                        this.priceCalculation(value, '6');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_6: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '6');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_6}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['6'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['6'] !== null
                                  ? this.state.myNumber6.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber6} */}
                                {/* £{(this.state.productItem.priceOptions["6"].price) * this.state.myNumber6} */}
                                {/* £{(this.state.productItem.priceOptions["6"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['7'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['7'] !== null
                                  ? this.state.productItem.priceOptions['7'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['7'] !== null
                                  ? this.state.productItem.priceOptions['7']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['7'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['7'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[6] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_7: text});
                                    this.priceCalculation(text, '7');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_7 == "0") {
                                      console.log(this.state.defaultQty_7);
                                      this.setState({ defaultQty_7: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_7 == '') {
                                      this.setState({defaultQty_7: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_7) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_7: value.toString(),
                                        });
                                        this.priceCalculation(value, '7');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_7: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '7');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_7}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['7'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['7'] !== null
                                  ? this.state.myNumber7.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber7} */}
                                {/* £{(this.state.productItem.priceOptions["7"].price) * this.state.myNumber7} */}
                                {/* £{(this.state.productItem.priceOptions["7"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['8'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['8'] !== null
                                  ? this.state.productItem.priceOptions['8'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['8'] !== null
                                  ? this.state.productItem.priceOptions['8']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['8'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['8'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[7] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_8: text});
                                    this.priceCalculation(text, '8');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_8 == "0") {
                                      console.log(this.state.defaultQty_8);
                                      this.setState({ defaultQty_8: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_8 == '') {
                                      this.setState({defaultQty_8: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_8) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_8: value.toString(),
                                        });
                                        this.priceCalculation(value, '8');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_8: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '8');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_8}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['8'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['8'] !== null
                                  ? this.state.myNumber8.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber8} */}
                                {/* £{(this.state.productItem.priceOptions["8"].price) * this.state.myNumber8} */}
                                {/* £{(this.state.productItem.priceOptions["8"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['9'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['9'] !== null
                                  ? this.state.productItem.priceOptions['9'].label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['9'] !== null
                                  ? this.state.productItem.priceOptions['9']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['9'] !== null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['9'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[8] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_9: text});
                                    this.priceCalculation(text, '9');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_9 == "0") {
                                      console.log(this.state.defaultQty_9);
                                      this.setState({ defaultQty_9: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_9 == '') {
                                      this.setState({defaultQty_9: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_9) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_9: value.toString(),
                                        });
                                        this.priceCalculation(value, '9');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_9: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '9');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_9}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['9'] !== null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['9'] !== null
                                  ? this.state.myNumber9.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber9} */}
                                {/* £{(this.state.productItem.priceOptions["9"].price) * this.state.myNumber9} */}
                                {/* £{(this.state.productItem.priceOptions["9"].price)} */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.rowView1,
                                this.state.productItem.priceOptions['10'] == null
                                  ? {height: 0}
                                  : null,
                              ]}>
                              <Text
                                style={styles.rowTxt1}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['10'] !==
                                null
                                  ? this.state.productItem.priceOptions['10']
                                      .label
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt2}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['10'] !==
                                null
                                  ? this.state.productItem.priceOptions['10']
                                      .priceDisplay
                                  : ''}
                              </Text>
                              <Text
                                style={styles.rowTxt3}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['10'] !==
                                null
                                  ? 'Qty'
                                  : ''}
                              </Text>
                              {this.state.productItem.priceOptions['10'] !==
                                null && (
                                <TextInput
                                  // ref={input => {
                                  //   this.qtyInputs[9] = input;
                                  // }}
                                  style={styles.qtyInput}
                                  allowFontScaling={false}

                                  placeholderTextColor="black"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    this.setState({defaultQty_10: text});
                                    this.priceCalculation(text, '10');
                                  }}
                                  onFocus={() => {
                                    if (this.state.defaultQty_10 == "0") {
                                      console.log(this.state.defaultQty_10);
                                      this.setState({ defaultQty_10: "" });
                                    }


                                  }}
                                  onBlur={() => {

                                    if (this.state.defaultQty_10 == '') {
                                      this.setState({defaultQty_10: '0' });
                                    }
                                    const runningValue =
                                      parseInt(this.state.defaultQty_10) || 0;

                                    if (runningValue > 0) {
                                      // if (this.state.pictorialItem) {
                                        const bal_val =
                                          runningValue % this.state.mainPackSize;
                                        if (bal_val > 0) {
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `These items sold in multiples of ${this.state.mainPackSize} packets. Quantity Reduced By - ${bal_val}`,
                                            type: 'warning',
                                            autoHide: true,
                                          });
                                        }
                                        const value = runningValue - bal_val;
                                        this.setState({
                                          defaultQty_10: value.toString(),
                                        });
                                        this.priceCalculation(value, '10');
                                      // } else {
                                      //   this.setState({
                                      //     defaultQty_10: runningValue.toString(),
                                      //   });
                                      //   this.priceCalculation(runningValue, '10');
                                      // }
                                    }
                                  }}
                                  value={this.state.defaultQty_10}
                                  maxLength={3} //setting limit of input
                                  selectTextOnFocus
                                />
                              )}
                              <Text
                                style={styles.rowTxt4}
                                allowFontScaling={false}>
                                {this.state.productItem.priceOptions['10'] !==
                                null
                                  ? '£'
                                  : ''}
                                {this.state.productItem.priceOptions['10'] !==
                                null
                                  ? this.state.myNumber10.toFixed(2)
                                  : ''}
                                {/* £{this.state.myNumber10} */}
                                {/* £{(this.state.productItem.priceOptions["10"].price) * this.state.myNumber10} */}
                                {/* £ {(this.state.productItem.priceOptions["10"].price)} */}
                              </Text>
                            </View>
                            <View style={[styles.addtoBasketView]}>
                              <TouchableOpacity
                                activeOpacity={0.9}
                                style={
                                  this.state.productItem.skuAvailableItems != 0
                                    ? styles.AddBtn
                                    : styles.AddBtnDisabled
                                }
                                disabled={skuAvailableItems = 0 ? true :false }
                                onPress={() => {

                                  Keyboard.dismiss()
                                  // Actions.filter();
                                  setTimeout(() => {
                                  if (this.props.adminCustomerID != '') {
                                    if (checkDiscounts()) {
                                        this._addToCart();
                                    }
                                  } else {
                                    showMessage({
                                      message: 'KINGS SEEDS',
                                      description:
                                        'Select a store before continuing',
                                      type: 'warning',
                                      autoHide: true,
                                    });
                                  }
                                },1000)
                                  // if (checkDiscounts()) {
                                  //   if(this.props.adminCustomerID !=''){
                                  //     this._addToCart();
                                  //   }else{
                                  //     showMessage({
                                  //       message: "KINGS SEEDS",
                                  //       description: "Select a store before continuing",
                                  //       type: "warning",
                                  //       autoHide: true,
                                  //     });
                                  //   }

                                  // }
                                }}>
                                <Text style={styles.addBtn1}>ADD TO BASKET</Text>
                              </TouchableOpacity>
                              <View style={styles.total}>
                                <View style={styles.totalColum1}>
                                  <Text style={styles.addTxt1}>Sub total</Text>
                                </View>
                                <View style={styles.totalColum2}>
                                  <Text style={styles.addTotal}>
                                    £ {this.getSubTotal().toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          ) : null
                        }

                      </View>
                    </View>
                  </View>

                  <View style={styles.bodyView}>
                    <View style={styles.CardDetail}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={
                          this.state.showRelatedProduct
                            ? styles.CardDetail1
                            : styles.CardDetail2
                        }
                        onPress={() => {
                          // this.props.navigation.navigate('filter');
                          // this._addToCart()
                          this.setState({
                            showRelatedProduct: true,
                          });
                          // this.props.navigation.navigate("carts");
                        }}>
                        <View style={styles.detailContent}>
                          <Text
                            style={
                              this.state.showRelatedProduct
                                ? styles.title
                                : styles.title1
                            }>
                            Related Products
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={
                          !this.state.showRelatedProduct
                            ? styles.CardDetail1
                            : styles.CardDetail2
                        }
                        onPress={() => {
                          this.setState({
                            showRelatedProduct: false,
                          });
                        }}>
                        <View style={styles.detailContent}>
                          <Text
                            style={
                              !this.state.showRelatedProduct
                                ? styles.title
                                : styles.title1
                            }>
                            People also Bought
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {this.state.showRelatedProduct ? (
                    <View
                      style={{
                        height: '33%',
                        width: wp('94'),
                        alignSelf: 'center',
                      }}>
                      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}
                        showsHorizontalScrollIndicator={false}
                        style={{height: hp('50')}}>
                        <FlatList
                          keyboardShouldPersistTaps={'handled'}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={styles.flatlist1}
                          data={this.state.productItem.relatedProducts}
                          renderItem={item => this.renderRow2(item)}
                          keyExtractor={item => item.skuid}
                          onEndReachedThreshold={0}
                          ListEmptyComponent={EmptyListMessage}
                        />
                        {/* <FlatGrid
                                 horizontal
                                showsVerticalScrollIndicator={false}
                                itemDimension={wp("30")}
                                data={this.state.productItem.relatedProducts}
                                style={styles.gridView}
                                ListEmptyComponent={EmptyListMessage}
                                spacing={hp("1")}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(item) => this.renderRow2(item)}
                            /> */}
                      </KeyboardAwareScrollView>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: '33%',
                        width: wp('94'),
                        alignSelf: 'center',
                      }}>
                      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}
                        showsHorizontalScrollIndicator={false}
                        style={{height: hp('50')}}>
                        <FlatList
                          horizontal
                          keyboardShouldPersistTaps={'handled'}
                          showsHorizontalScrollIndicator={false}
                          style={styles.flatlist1}
                          data={this.state.productItem.alsoBoughtProducts}
                          renderItem={item => this.renderRow3(item)}
                          keyExtractor={item => item.skuid}
                          onEndReachedThreshold={0}
                          ListEmptyComponent={EmptyListMessage}
                        />
                        {/* <FlatGrid
                               horizontal
                              showsVerticalScrollIndicator={false}
                              itemDimension={wp("30")}
                              data={this.state.productItem.relatedProducts}
                              style={styles.gridView}
                              ListEmptyComponent={EmptyListMessage}
                              spacing={hp("1")}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={(item) => this.renderRow2(item)}
                          /> */}
                      </KeyboardAwareScrollView>
                    </View>

                    // <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} style={{ height: "100%", marginBottom: hp("9") }}>
                    //   <View style={{ height: hp("100%") }}>
                    //     <FlatGrid
                    //       showsVerticalScrollIndicator={false}
                    //       itemDimension={wp("30")}
                    //       data={this.state.productItem.alsoBoughtProducts}
                    //       style={styles.gridView}
                    //       ListEmptyComponent={EmptyListMessage}
                    //       spacing={hp("1")}
                    //       renderItem={(item) => this.renderRow3(item)}
                    //       keyExtractor={(item) => item.id}
                    //     />
                    //   </View>
                    // </KeyboardAwareScrollView>
                  )}
                </View>
              )}
            </KeyboardAwareScrollView>
          </View>

          {/* <Footer/> */}
        </View>
      </SafeAreaView>
    );
  }
}

function ProductDetailsWrapper(props) {
  const isFocused = useIsFocused();

  const ref = React.useRef(null);

  useScrollToTop(ref);

  return <ProductDetails {...props} scrollRef={ref} isFocused={isFocused} />;

}

const mapStateToProps = (state) => {
  return {
     loginToken: state.login.loginToken,
     preseasonStatus: state.checkout,
    // productItem: state.home.productItem,
    // itemImg: state.home.itemImg,
    // itemStore: state.home.itemStore,
    // itemPrice: state.home.itemPrice,
    // itemNumber: state.home.itemNumber,
    // filterData: state.home.filterData,
    adminCustomerID: state.findStore.adminCustomerID,
  };
};



export default connect(mapStateToProps, {
  // getProductDetails,
  addToCart,
})(ProductDetailsWrapper);
