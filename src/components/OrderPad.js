import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Picker,
  FlatList,
  Alert,
  Keyboard
} from "react-native";
import Styles from "../style/OrderPadStyle";
import { addToCart } from "../actions/CartActions";
import { connect } from "react-redux";
import NumericInput from "react-native-numeric-input";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { RawQuery } from "../offline/Services/DataHelper";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const search = require("../assets/search-green.png");
import { getItemsArray ,getSearchCodes, getProductDetailsBySelectedCode} from "../actions/OrderPadAction";
import getBaseUrl from "../url/getBaseUrl";
import ConfirmationBox from "./common/ConfirmationBox";

import * as colors from '../style/Common/ColorsStyle';

import { Searchbar } from "react-native-paper";
import stylesheet from "react-native-media-query";
import { showMessage } from "react-native-flash-message";
import { Dropdown } from "react-native-element-dropdown";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OrderPadBarCodeSection from "../components/OrderPadBarCodeSection";
import { store } from "../../configureStore";


// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
//   BluetoothTscPrinter,
// } from "@types/tp-react-native-bluetooth-printer";

import DataAdapter from "../offline/localData/DataAdapter";
import { checkDiscounts } from "../utils/checkDiscounts";
import {GetDecimal, GetInteger} from "../utils/ValidationHelper";
import {GetCustomFormattedValue, GetProductLinePricing} from '../offline/Services/ProductHelper';
import {getQuickOrderAutoCompleteData, getQuickOrderProductCodes} from "../url/API";
import { useIsFocused } from "@react-navigation/native";

const filter = require("../assets/barcode.png");
const menu = require("../assets/menu.png");
const cart = require("../assets/BlueLeft.png");
const del = require("../assets/del.png");
const remove = require("../assets/delete.png");

const { ids, styles } = Styles;
//main data
//productCodesArr: codes_,
//filtered data
//filteredCodesArr: [
//    {
//      label: "",
//      value: "",
//      skuid: 0,
//    },
//  ],
//selected data
// selectedCodesArr: {},

//let codeArr = ["ONS 06", "MAR 240", "LWC 014", "PEA 03"];

async function addToLocal(data) {
  const payload = {
    section: "ORDER PAD",
    opration: "ADD",
    data,
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function initial() {
  const payload = {
    section: "ORDER PAD",
    opration: "GET",
    data: "",
  };

  const newpro = await DataAdapter(payload);

  return newpro;
}


async function FindPictorial(id) {
  const payload = {
    section: "ORDER PAD",
    opration: "FIND PICTORIAL",
    data: id,
  };


  const newpro = await DataAdapter(payload);
  return newpro;
}


async function FindPictorials(ids) {
  const payload = {
    section: "ORDER PAD",
    opration: "FIND PICTORIALS",
    data: ids,
  };



  const newpro = await DataAdapter(payload);
  return newpro;
}

async function qrFetch(data) {
  const payload = {
    section: "ORDER PAD",
    opration: "QR PRODUCT FETCH",
    data,
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function deleteFromLocal(id) {
  const payload = {
    section: "ORDER PAD",
    opration: "DELETE",
    data: { id },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function clearOrders() {

  const payload = {
    section: "ORDER PAD",
    opration: "CLEAR",
    data: "",
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function getLinePrice(skuNumber, priceOption, quantity) {
  let tot = GetDecimal(priceOption.price) * GetInteger(quantity); // fallback
  let tax = 0; // fallback
  let uPrice = GetDecimal(priceOption.price); // fallback
  try {
    let linePricing = await GetProductLinePricing(skuNumber, priceOption.priceLine, quantity);
    tot = linePricing.LinePrice;
    tax = linePricing.LineTax;
    uPrice = linePricing.UnitPrice;
  } catch (e) {
    console.log("GetProductLinePricing Error... ", e);
  }
  return {tot, tax, uPrice};
}


let scrn_width = wp("100");
let codeArr = [];
class OrderPad extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      query: "",
      selectedItem: null,

      itemList_: [],

      searchItemList_: [],
      productCodes: [],
      filteredDataSet: [],
      value: 1,
      selectedcat: "",
      selValuesInItems: [],
      searchQuery: "",
      data: [],

      //confirmation dialog
      showdialog: false,
      deleteYes: false,
      deleteItemId: "",
      contentText: "",
      btnName: "",



      typingText: '',
      prevQty: 0,

      barCodePanel: false,
    };
  }



  async updateQty(itemIndex, qty, element) {
    let itemArray = this.state.itemList_;

    let price = await getLinePrice(itemArray[itemIndex].code, itemArray[itemIndex].packSize, qty);

    console.log('');
    console.log(price);
console.log('updateQty', element);
    itemArray[itemIndex].lineTotal = price.tot;
    this.setState({itemList_: itemArray});

    const payload = {
      section: "ORDER PAD",
      opration: "UPDATE QTY",
      data: {id: itemArray[itemIndex].uniqId, qty: qty, lineTotal: price.tot}
    };

    const newpro = await DataAdapter(payload);
    return newpro;
  }

  async updatePackSize(itemIndex, priceOption) {
    let itemArray = this.state.itemList_;

    let {tot, tax, uPrice} = await getLinePrice(itemArray[itemIndex].code, priceOption, itemArray[itemIndex].qty);

    itemArray[itemIndex].lineTotal = tot;
    this.setState({itemList_: itemArray});

    const payload = {
      section: "ORDER PAD",
      opration: "UPDATE PACK SIZE",
      data: {id: itemArray[itemIndex].uniqId, packSize: priceOption, lineTotal: tot},
    };

    const newpro = await DataAdapter(payload);
    return newpro;
  }

  //confirmation box functions
  deleteOrderItem() {
    let templistArry = [];

    this.state.itemList_.map((item) => {
      if (item.uniqId != this.state.deleteItemId) templistArry.push(item);
    });

    this.setState({
      itemList_: templistArry,
    });
    deleteFromLocal(this.state.deleteItemId);
    this.closeConfirmation();
  }

  clearListFunc() {

    this.setState({ itemList_: [] });
    clearOrders();
    this.closeConfirmation();
  }

  confirmShowHide(contentTxt) {

    this.setState({
      showdialog: !this.state.showdialog,
      contentText: contentTxt,
    });
  }

  closeConfirmation() {
    this.setState({
      showdialog: !this.state.showdialog,
    });
  }
  //confirmation box functions end

  async componentDidMount() {
    // main operation - get data from db

    // let query = await RawQuery(`Select * from local_orderpad`);
    // console.log(query.item(0));

    this.mounted();


    if (this.props.selItemCodes != []) {
      codeArr = this.props.selItemCodes;
    }
    if (this.props.itemsArray != []) {
      this.setState({
        selValuesInItems: this.props.itemsArray,
      });
    }
    this.getDetailsBySelectedCodes();


    setTimeout(() => {
      this.myRef.current.blur();
      this.myRef.current.focus();

    }, 500);


  }



  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getOrderSearchCodes();
      this.mounted();
    }






  }



  async mounted () {
    initial().then((res) => {

      this.setState({ itemList_: res.reverse() });

      this.getPictorialItems();

    });
  }

  // onChangeSearch = (query) => {
  //   this.setState({ searchQuery: "" });
  //   if (query.length > 3) {
  //     getSearchList(query);
  //   } else {
  //     this.setState({ data: [] });
  //   }
  // };


  getQrCode = (e) => {
    this.closeQrCode();

    qrFetch(e.data).then((res) => {


      if (res.status == 1) {

        let product = this.state.productCodes.filter(c => c.label == res.data);




        if (product.length > 0) {
          if (product[0].availability) {
            this.pickItem(res.data);

          }else{
            showMessage({
              message: 'KINGS SEEDS',
              description: `Item is Unavailable`,
              type: 'warning',
              autoHide: true,
            });


            store.dispatch({
              type: 'SET_BILLING_INFO',
              payload: {
                unavailableItems: product[0].label,
              }
            });
          }
        }else{
          showMessage({
            message: 'KINGS SEEDS',
            description: `Item is Unavailable`,
            type: 'warning',
            autoHide: true,
          });


          store.dispatch({
            type: 'SET_BILLING_INFO',
            payload: {
              unavailableItems: res.data,
            }
          });
        }





         // skunumber

      }else{
        showMessage({
          message: "KINGS SEEDS",
          description:"Item is unavailable",
          type: "warning",
          autoHide: true,
        });
      }

    });

  };

  closeQrCode = () => {
    this.setState({ barCodePanel: false });
  }

  // SQLITE

  async pickItem(item) {
    this.setState({
      query: "",
    });

    const itemDetails = await this.getItemDetails(item);

  }

  getItemDetails = async (code) => {
    // console.log("code =" + code + " indx =" + code);
    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;
    console.log(' internetConnectivity =' + internetConnectivity);
    getProductDetailsBySelectedCode(internetConnectivity, code) //edit123
          .then((productResults) => {

            console.log('productResults.results', productResults.results);
            if(productResults.results != null){

            let product = this.createItem(productResults.results[0]);


            // clear the search bar
            this.setState({ searchQuery: "" });

            // find duplicated products
            let duplicated = 0; // user can add duplicate skuids


            if (duplicated == 0) {
              // add to state
              let templistArry = [];
              // let templistArry = this.state.itemList_;
              console.log(product);
              templistArry.push(product);
              this.state.itemList_.map((item, index) => {
                templistArry.push(item);
              })
              this.setState({ itemList_: templistArry });



              // main operation - add to local db
              const result = addToLocal(product);

              this.mounted();



              // setTimeout(() => {
              //   this.myRef.current.blur();
              //   this.myRef.current.focus();
              // }, 500);

              // setTimeout(() => {
              //   this.myRef.current.blur();
              //   this.myRef.current.focus();
              // }, 500);



            }

            if (duplicated == 1) {
              showMessage({
                message: "KINGS SEEDS",
                description: "Items are already added",
                type: "warning",
                autoHide: true,
              });
            }

            this.getPictorialItems();
            return productResults;

          } else {
            showMessage({
              message: 'KINGS SEEDS',
              description: 'Item is unavailable.',
              type: 'warning',
              autoHide: true,
            });
          }
          })
          .catch((error, er) => console.log("error", er));

  };

  createItem(apiObject) {
    const priceOptions = this.getPriceOptions(apiObject.priceOptions);

    let unitPrice = "";
    if (apiObject.priceOptions != null) {
      unitPrice = apiObject.priceOptions["1"].price;
    } else {
      unitPrice = "";
    }

    let product = {
      id: apiObject.skuId,
      title: apiObject.title,
      des: apiObject.title,
      code: apiObject.code,
      packSize: priceOptions[0],
      priceOptions: priceOptions,
      qty: "1",
      unitPrice: priceOptions[0].price,
      lineTotal: priceOptions[0].price,
      availability: apiObject.availability,
      availableItems: apiObject.availableItems
    };

    return product;
  }

  getPriceOptions(prices) {
    let priceOptions = [];

    if (prices["1"]) priceOptions.push({...prices["1"], priceLine: 1});

    if (prices["2"]) priceOptions.push({...prices["2"], priceLine: 2});

    if (prices["3"]) priceOptions.push({...prices["3"], priceLine: 3});

    if (prices["4"]) priceOptions.push({...prices["4"], priceLine: 4});

    if (prices["5"]) priceOptions.push({...prices["5"], priceLine: 5});

    if (prices["6"]) priceOptions.push({...prices["6"], priceLine: 6});

    if (prices["7"]) priceOptions.push({...prices["7"], priceLine: 7});

    if (prices["8"]) priceOptions.push({...prices["8"], priceLine: 8});

    if (prices["9"]) priceOptions.push({...prices["9"], priceLine: 9});

    if (prices["10"]) priceOptions.push({...prices["10"], priceLine: 10});

    if (prices["11"]) priceOptions.push({...prices["11"], priceLine: 11});

    return priceOptions;
  }



  async getDetailsBySelectedCodes() {
    const TOKEN_ = this.props.loginToken;
    if (codeArr != []) {
      let i_arr = [];
      i_arr = this.state.selValuesInItems;

      for (let index = 0; index < codeArr.length; index++) {
        if (codeArr[index] !== "") {
          console.log(codeArr[index]);
          const itm_vals = {
            inx: index,
            item_code: codeArr[index],
            num_sel: 1,
            drp_dwn_sel: 1,
            tot_price: 0,
          };

          i_arr.push(itm_vals);
          this.setState({
            selValuesInItems: i_arr,
          });

          //await this.getItemDetailsbyCode(codeArr[index], TOKEN_, index);
        }
      }
    }
    this.getOrderSearchCodes(TOKEN_);
  }



  getOrderSearchCodes = async (tokn_) => {

    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    let productResults =  await getSearchCodes(internetConnectivity);

         let thisArray = [];
            for (let index = 0; index < productResults.length; index++) {
              console.log(productResults[index]);

              thisArray.push(productResults[index]);
            }

            this.setState({
              productCodes: thisArray,
            });
        // getQuickOrderProductCodes()
        //   .then((productResults) => {
        //     let thisArray = [];
        //     for (let index = 0; index < productResults.length; index++) {
        //       thisArray.push(productResults[index]);
        //     }
        //     this.setState({
        //       productCodes: thisArray,
        //     });
        //   })
        //   .catch((error) => console.log("error", error));

  };


  addToCart = async () => {




const validatedList = this.state.itemList_.map((item) => {

  if (item.SkuDiscountCat == "A") {
    if (item.qty < item.SKUPictorialPackSize) {
      item.qty = item.SKUPictorialPackSize;
    }else{
      const remaining = item.qty % item.SKUPictorialPackSize;
      item.qty = item.qty - remaining;

    }
  }

  return item;

})



    // return;



    if (validatedList.length > 0) {

      let itemsToAdd = [];
      let unavailableItems = [];


//      for (let index = 0; index < this.state.itemList_.length; index++) {
  //      let item = this.state.itemList_[index];


      for (let index = 0; index < validatedList.length; index++) {
        let item = validatedList[index];




        if (item.availability) {
          let tot = GetDecimal(item.packSize.price) * GetInteger(item.qty); // fallback
          let tax = 0; // fallback
          let uPrice = GetDecimal(item.packSize.price); // fallback
          try {
            let linePricing = await GetProductLinePricing(item.code, item.packSize.priceLine, item.qty);

            tot = linePricing.LinePrice;
            tax = linePricing.LineTax;
            uPrice = linePricing.UnitPrice;
          } catch (e) {
            console.log("GetProductLinePricing Error... ", e);
          }

          const product = {
            skuid: item.id,
            skuName: item.title,
            skuNumber: item.code,
            skuPackSize: "",
            priceOptions: {},
            preSeason: false,
            skuDiscountCat: item.SkuDiscountCat,
            priceLine: item.packSize.priceLine,
            quantity: item.qty,
            totalPrice: tot,
            totalTax: tax
          };
          product.priceOptions[item.packSize.priceLine] = {
            label: item.packSize.label,
            price: uPrice,
            priceDisplay: await GetCustomFormattedValue(uPrice)
          }



          itemsToAdd.push(product);
        } else {
          unavailableItems.push(item.uniqId);
        }
      }



      if (unavailableItems.length === validatedList.length) {
        showMessage({
          message: 'KINGS SEEDS',
          description: 'All the items are unavailable and not added to the cart.',
          type: 'warning',
          autoHide: true,
        });
      } else if (unavailableItems.length > 0) {
        showMessage({
          message: 'KINGS SEEDS',
          description: `${unavailableItems.length} items are unavailable and not added to the cart.`,
          type: 'warning',
          autoHide: true,
        });
      } else {
        showMessage({
          message: "KINGS SEEDS",
          description: "Items added to cart",
          type: "success",
          autoHide: true,
        });
      }


      if (itemsToAdd.length > 0) {
        this.props.addToCart({
          cartItems: itemsToAdd
        });

        this.setState({itemList_: []});
        clearOrders();
      }


    } else {
      showMessage({
        message: "KINGS SEEDS",
        description: "Order pad is empty",
        type: "warning",
        autoHide: true,
      });
    }
  };



  // updatePriceAfterChange_numInput(itmCode, num) {
  //   // console.log(itmCode);
  //   // console.log(num);

  //   let cus_valItems = [];

  //   if (this.state.selValuesInItems != []) {
  //     const indexa = this.state.selValuesInItems
  //       .map(function (x) {
  //         return x.item_code;
  //       })
  //       .indexOf(itmCode);
  //     // let matches = this.state.selValuesInItems.filter((v) => v.name.toLowerCase().includes(val));
  //     // console.log(matches);
  //     cus_valItems = this.state.selValuesInItems;

  //     // console.log("num=" + num + ", index=" + indexa + ", code=" + itmCode);
  //     cus_valItems[indexa].num_sel = num;
  //     this.setState({
  //       selValuesInItems: cus_valItems,
  //     });
  //     this.priceUpdate(
  //       itmCode,
  //       this.state.selValuesInItems[indexa].drp_dwn_sel,
  //       num,
  //       indexa
  //     );
  //     //itemsvalues update in persist
  //     this.props.getItemsArray(this.state.selValuesInItems);
  //   }
  // }

  // updatePriceAfterChange_drpdwn(itmCode, val) {
  //   let cus_valItems = [];
  //   console.log(this.state.selectedcat);
  //   this.setState({
  //     selectedcat: val,
  //   });
  //   console.log("code " + itmCode + " val " + val);
  //   if (this.state.selValuesInItems != []) {
  //     const indexa = this.state.selValuesInItems
  //       .map(function (x) {
  //         return x.item_code;
  //       })
  //       .indexOf(itmCode);
  //     // let matches = this.state.selValuesInItems.filter((v) => v.name.toLowerCase().includes(val));
  //     // console.log(matches);
  //     cus_valItems = this.state.selValuesInItems;

  //     cus_valItems[indexa].drp_dwn_sel = val;
  //     this.setState({
  //       selValuesInItems: cus_valItems,
  //     });
  //     this.priceUpdate(itmCode, val, cus_valItems[indexa].num_sel, indexa);
  //     //itemsvalues update in persist
  //     this.props.getItemsArray(this.state.selValuesInItems);
  //     console.log(this.props.itemsArray);
  //   }
  // }

  // showPrice(itmCode, price) {
  //   const indexa = this.state.selValuesInItems
  //     .map(function (x) {
  //       return x.item_code;
  //     })
  //     .indexOf(itmCode);

  //   // console.log(itmCode);
  //   // console.log(price);

  //   if (this.state.selValuesInItems != "") {
  //     if (this.state.selValuesInItems[indexa].tot_price != 0) {
  //       let value = this.state.selValuesInItems[indexa].tot_price || 0;
  //       return value;
  //     } else {
  //       // return price.toFixed(2); ask akila
  //       return price;
  //     }
  //   } else {
  //     const zero = 0;
  //     //  return zero.toFixed(2); ask akila
  //     return zero;
  //   }
  // }

  // showUnitPrice(itmCode, price) {
  //   const indexa = this.state.selValuesInItems
  //     .map(function (x) {
  //       return x.item_code;
  //     })
  //     .indexOf(itmCode);

  //   const added_qty = this.state.selValuesInItems[indexa].num_sel || 1;
  //   const total_price = this.state.selValuesInItems[indexa].tot_price || 0;

  //   if (total_price == 0) {
  //     // return price.toFixed(2); //ask akila
  //     return price;
  //   } else {
  //     // return (total_price / added_qty).toFixed(2);  ask akila
  //     return total_price / added_qty;
  //   }
  // }

  // priceUpdate(itmCode, drpdown, num_input, index_) {
  //   console.log("price update");
  //   console.log("code:" + itmCode + " drp:" + drpdown + " num:" + num_input);
  //   try {
  //     let tokn_ = this.props.loginToken;
  //     var myHeaders = new Headers();
  //     myHeaders.append("Authorization", `Bearer ${tokn_}`);
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

  //     var raw = JSON.stringify({
  //       SKUQTY: num_input,
  //       SKUNumber: itmCode,
  //       PriceLine: drpdown.toString(),
  //     });

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(
  //       `${getBaseUrl()}Order/GetQuickOrderProductLineTotal`,
  //       requestOptions
  //     )
  //       .then((response) => response.text())
  //       .then((result) => {

  //         var productResults = JSON.parse(result);
  //         let products = [];
  //         console.log(productResults);
  //         let cus_valItems = [];
  //         cus_valItems = this.state.selValuesInItems;
  //         // let numb = productResults.linetotal.toFixed(2); ask akila
  //         let numb = productResults.linetotal;
  //         console.log(numb);
  //         cus_valItems[index_].tot_price = numb;
  //         this.setState({
  //           selValuesInItems: cus_valItems,
  //         });
  //         console.log(this.state.selValuesInItems);
  //       })
  //       .catch((error) => console.log("error", error));
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // }

  // getNumericInpVal(itmCode) {
  //   const indexa = this.state.selValuesInItems
  //     .map(function (x) {
  //       return x.item_code;
  //     })
  //     .indexOf(itmCode);
  //   if (this.state.selValuesInItems != "") {
  //     return this.state.selValuesInItems[indexa].num_sel;
  //   } else {
  //     return 1;
  //   }
  // }

  // getItemDetailsbyCode = async (code, tokn_, index) => {
  //   console.log("code =" + code + " indx =" + code);

  //       getQuickOrderAutoCompleteData(code, false)
  //         .then((productResults) => {

  //           let products = [];
  //           const obj_ = [];

  //           productResults.results[0].nodeId = index;
  //           if (productResults.results[0].priceOptions != null) {
  //             obj_.push(productResults.results[0].priceOptions);
  //             productResults.results[0].price =
  //               productResults.results[0].priceOptions["1"].price;
  //             // console.log('price['+productResults.results[0].price );
  //           } else {
  //             productResults.results[0].price = "";
  //           }

  //           productResults.results[0].tempQty = "1";

  //           let preProducts = productResults.results[0];

  //           this.setState({
  //             itemList_: this.state.itemList_.concat(preProducts),
  //           });
  //           console.log('----pre products---------------');
  //             console.log(this.state.itemList_);

  //         })
  //         .catch((error) => console.log("error", error));

  // };

  // onValueChangeCat(value) {
  //   this.setState({ selectedcat: value });
  // }

  findProduct = (q) => {  //get products when change texts in search
    this.setState({ searchQuery: q });

    // Method called every time when we change the value of the input

    if (q) {
      const filter_productcodes = this.state.productCodes.filter(
        (cds) => {

          // console.log(cds);

          let label = removeSpaces(cds.label);
          if(cds.barcode != "" && cds.barcode == q.trim()){
            if (cds.availability) {
              this.pickItem(cds.value);
              this.setState({filteredDataSet: []});
            }else{
              showMessage({
                message: 'KINGS SEEDS',
                description: `Item is Unavailable`,
                type: 'warning',
                autoHide: true,
              });


              store.dispatch({
                type: 'SET_BILLING_INFO',
                payload: {
                  unavailableItems: cds.skuid,
                }
              });
            }



            // return true;
          }else if(label.toLowerCase().includes(q.trim().toLowerCase())) {
            return true;
          }else{
            return cds.label.toLowerCase().includes(q.trim().toLowerCase())
          }


        }
      );

      let re_filteredproductCodes = [];
      let c = 0;
      if (filter_productcodes.length >= 10) {
        for (let index = 0; index < 10; index++) {
          re_filteredproductCodes.push(filter_productcodes[index]);
        }
      } else {
        for (let index = 0; index < filter_productcodes.length; index++) {
          re_filteredproductCodes.push(filter_productcodes[index]);
        }
      }



      this.setState({
        filteredDataSet: re_filteredproductCodes,
        query: q,
      });
    } else {
      // If the q is null then return blank
      this.setState({
        filteredDataSet: [],
        query: q,
      });
    }
  };

  textChange(text) {
    this.setState({ query: text });
    this.findProduct(text);
  }

  // generatePickerItems(arr) {
  //   const list_ = [];
  //   Object.keys(arr).forEach((key) => {
  //     if (arr[key] != null) {
  //       list_.push(arr[key].label);
  //     }
  //     // console.log(productResults.results[0].priceOptions[key])
  //   });
  //   return list_.map((x, i) => {
  //     return <Picker.Item label={x} key={i} value={i} />;
  //   });
  // }

  // rendersearchlist = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.9}
  //       onPress={() => this.setState({ query: item.label })}
  //     >
  //       <Text style={styles.itemText}>{item.label}</Text>
  //     </TouchableOpacity>
  //   );
  // };



  _renderItem = (item) => {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "#EEEEEE",
          minWidth: wp("40"),
        }}
      >
        <Text style={{ fontSize: 15, color:"gray" }}>{item.label}</Text>
      </View>
    );
  };



  getPictorialItems = () => {

    let products = [];

    this.state.itemList_.map((item) => {
      products.push(item.id);
    })

    FindPictorials(products).then((res) => {


      products = [];

      this.state.itemList_.map((item) => {
        res.map((itemRes) => {
          if(item.id == itemRes.SKUID) {

            item.SkuPictorialPackSize = itemRes.SKUPictorialPackSize;
            item.SkuDiscountCat = itemRes.SkuDiscountCat;
            item.SKUPictorialPackSize = itemRes.SKUPictorialPackSize;
          }


        })


        // if (item.SkuDiscountCat == 'A') {
          console.log('item.qty', item.qty);


          let packSizeDiff = item.qty % item.SKUPictorialPackSize;

          if (packSizeDiff != 0) {
            item.qty = item.SKUPictorialPackSize.toString();
          }


          item.lineTotal = item.unitPrice * item.qty;

        // }


        products.push(item);
      })

      this.setState({ itemList_: products });

    });

  }


  render() {
    const { preseasonStatus } = this.props;
    return (
      <View  keyboardShouldPersistTaps="handled">
        <View style={styles.container} >
          {/* <Header /> */}

          <View style={{width:'100%',flexDirection:'row',}}>
  <View style={{width:'50%'}}>
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
          {this.state.btnName == 'itemDelete' ? (
            <ConfirmationBox
              showHide={this.state.showdialog}
              yes={() => this.deleteOrderItem()}
              no={() => this.closeConfirmation()}
              contentText={this.state.contentText}
            />
          ) : (
            <ConfirmationBox
              showHide={this.state.showdialog}
              yes={() => this.clearListFunc()}
              no={() => this.closeConfirmation()}
              contentText={this.state.contentText}
            />
          )}




  <Text style={styles.titleTxt} allowFontScaling={false}>
                  Order Pad
                </Text>



                {this.state.barCodePanel ? (
                <View style={{width: wp('100'), height: '100%'}}>
                  <OrderPadBarCodeSection
                    getQrCode={this.getQrCode}
                    closeQrCode={this.closeQrCode}
                  />
                </View>
              ) : (
                <View>
                  {/* <OrderPadBarCodeSection getQrCode={this.getQrCode()} /> */}
                </View>
              )}



<View style={styles.searchSection}>
                <View style={styles.searchBarView} keyboardShouldPersistTaps='always'>

                  <Searchbar
                    autoCorrect={false}
                    autoCapitalize={false}
                    ref={this.myRef}
                    autoFocus={true}
                    iconColor={colors.primaryColor}

                    placeholder="Item number"
                    placeholderTextColor="#9C9C9C"
                    inputStyle={{fontSize: hp('1.5')}}
                    onChangeText={text => this.findProduct(text)}
                    value={this.state.searchQuery}
                    style={styles.searchBarStyle}
                    blurOnSubmit={false}
                  />

                  <View
                    style={{
                      width: '94%',
                      zIndex: 1000,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      backgroundColor: 'white',
                    }}>
                    <FlatList
                      data={this.state.filteredDataSet}
                      keyboardShouldPersistTaps="handled"
                      renderItem={({item}) => {
                        // console.log("fbniadsfbnsdf" + item.label);
                        return (
                          <TouchableOpacity
                            style={styles.searchresultView}
                            onPress={() => {
                              console.log('fbniadsfbnsdf' ,item);
                              // console.log(typeof item.label.toString());
// console.log('item.availability', item.availability);
                              // this.onSelectSearch(item.label);


                              if (item.availability) {
                                this.pickItem(item.label);
                                this.setState({filteredDataSet: []});
                              }else{


                                showMessage({
                                  message: 'KINGS SEEDS',
                                  description: `Item is Unavailable`,
                                  type: 'warning',
                                  autoHide: true,
                                });


                                store.dispatch({
                                  type: 'SET_BILLING_INFO',
                                  payload: {
                                    unavailableItems: item.label.toString(),
                                  }
                                });
                              }

                            }}>
                            <Text style={styles.searchresultTxt}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({barCodePanel: true});
                    // setFilteredDataSet([]);
                  }}
                  activeOpacity={0.9}
                  style={styles.barCodeBtn}>
                  <Image source={filter} style={styles.barcodeIcn} />
                </TouchableOpacity>
              </View>





<KeyboardAwareScrollView
                      style={{width: '100%', height: hp('110'), zIndex: -100}}
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="handled"
                      >
                      {this.state.itemList_.map((e, index) => {
                        console.log(e.title);
                        return (
                          <View style={styles.footerCardView} key={e.uniqId}>
                            <View style={styles.cartItemTextView}>
                              <View style={styles.cardView1}>
                                <View style={styles.cardTxtView}>
                                  <Text
                                    style={styles.cardTxt}
                                    allowFontScaling={false}
                                    numberOfLines={3}>
                                      {`${e.title}`}
                                    {/* {e.title.length > 22 && scrn_width > 450
                                      ? `${e.title}`
                                      : e.title.length > 22 && scrn_width < 450
                                      ? `${e.title.substring(0, 22)}...`
                                      : `${e.title}`} */}
                                  </Text>
                                  <View style={styles.subcontains}>
                                    <Text
                                      style={styles.cardSubMainTxt}
                                      allowFontScaling={false}>
                                      Code : {e.code}{' '}
                                    </Text>
                                      {
                                        e.SkuDiscountCat == "A" ? (
                                          e.availability == true ? (
                                            <Text style={styles.cardSubMainTxt5}>Stock: {e.availableItems}</Text>
                                          ) : (
                                            <Text style={styles.cardSubMainTxt5}>Stock: <Text style={{color:'red'}}>0</Text></Text>
                                          )
                                        ) : (
                                          e.availability == true ? (
                                            <Text style={styles.cardSubMainTxt5}>Stock: In Stock</Text>
                                          ) : (
                                            <Text style={styles.cardSubMainTxt5}>Stock: <Text style={{color:'red'}}>Out of Stock</Text></Text>
                                          )
                                        )
                                      }
                                  </View>
                                </View>

                                <View style={styles.pickerView}>
                                  <Dropdown
                                    style={styles.dropdownsty}
                                    iconStyle={styles.dropdownIcon}
                                    placeholderStyle={styles.dropdownFont}
                                    selectedTextStyle={styles.dropdownFontsel}
                                    data={e.priceOptions}
                                    labelField={e.packSize.label}
                                    activeColor="#e6fff0"
                                    maxHeight={180}
                                    // e.priceOptions.length *(wp('100') > 450 ? hp('3') : hp('4'))
                                    valueField={e.packSize.label}
                                    placeholder={e.packSize.label}
                                    value={e.packSize.label}
                                    renderItem={item => this._renderItem(item)}
                                    onChange={pack => {
                                      // state update
                                      let templistArry = this.state.itemList_;
                                      templistArry[index].packSize = pack;
                                      templistArry[index].unitPrice =
                                        pack.price;
                                      this.setState({itemList_: templistArry});

                                      // main operation - update packSize
                                      this.updatePackSize(index, pack);

                                      // setAddType(item.value);
                                      // setIsFocusAddType(false);
                                    }}
                                  />
                                </View>
                              </View>

                              {/* price view */}
                              <View style={styles.cardView2}>
                                <View style={styles.AddView}>
                                  <View style={styles.numericView}>
                                    <TextInput
                                      style={styles.input}
                                      onChangeText={value => {

                                       if (value == '') {
                                        value = 0;
                                       }

                                        const tyText = parseInt(value).toString() || '0';

                                        let templistArry = this.state.itemList_;
                                        templistArry[index].qty = tyText;



                                        this.setState({
                                          typingText: tyText,
                                          itemList_: templistArry,
                                        });



                                        // main operation - update qty
                                        this.updateQty(index, tyText, e);

                                      }}
                                      onFocus={() => {
                                        this.setState({
                                          prevQty: e.qty,
                                          typingText: e.qty.toString(),
                                        });
                                      }}
                                      onBlur={() => {
                                        // update state

                                        const tyText = parseInt(this.state.typingText).toString();


                                        if (
                                          /^[-+]?[0-9]+$/.test(
                                            tyText,
                                          )
                                        ) {
                                          let typingQty = GetInteger(
                                            tyText,
                                          );
                                          const pictorialPacketSize = e.SkuPictorialPackSize;
                                          let templistArry =
                                            this.state.itemList_;
                                          let tmepQty = 0;
                                          if (typingQty <= 0) {
                                            // if (e.SkuDiscountCat == 'A') {
                                              tmepQty = pictorialPacketSize;
                                              showMessage({
                                                message: 'KINGS SEEDS',
                                                description:
                                                  `Minimum quantity is ${pictorialPacketSize}`,
                                                type: 'warning',
                                                autoHide: true,
                                              });
                                            // } else {
                                            //   tmepQty = 1;
                                            //   showMessage({
                                            //     message: 'KINGS SEEDS',
                                            //     description:
                                            //       'Minimum quantity is 1',
                                            //     type: 'warning',
                                            //     autoHide: true,
                                            //   });
                                            // }
                                          } else {
                                            if (typingQty > 9999) {
                                              // if (e.SkuDiscountCat == 'A') {
                                                typingQty = getMaxMultiple(pictorialPacketSize, 10000);
                                              // }else{
                                                // tmepQty = 10000-1;
                                              // }

                                              console.log(tmepQty); // Output: 98
                                              showMessage({
                                                message: 'KINGS SEEDS',
                                                description:
                                                  `Maximum quantity is ${tmepQty}`,
                                                type: 'warning',
                                                autoHide: true,
                                              });
                                              tmepQty = typingQty;
                                            } else {
                                              // if (e.SkuDiscountCat == 'A') {
                                                e.qty;

                                                const picturePack = typingQty % pictorialPacketSize;
                                                if (typingQty > pictorialPacketSize) {
                                                  if (picturePack > 0) {
                                                    showMessage({
                                                      message: 'KINGS SEEDS',
                                                      description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Reduced By - ${picturePack}`,
                                                      type: 'warning',
                                                      autoHide: true,
                                                    });
                                                  }
                                                  tmepQty = typingQty - picturePack;
                                                } else {
                                                  const increased =
                                                    pictorialPacketSize -
                                                    picturePack;
                                                  if (picturePack > 0) {
                                                    showMessage({
                                                      message: 'KINGS SEEDS',
                                                      description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Increased By - ${increased}`,
                                                      type: 'warning',
                                                      autoHide: true,
                                                    });
                                                  }
                                                  tmepQty = typingQty + increased;
                                                  if (typingQty == pictorialPacketSize) {
                                                    tmepQty = typingQty;
                                                  } else {
                                                    tmepQty = typingQty + increased;
                                                  }
                                                }
                                              // } else {
                                              //   tmepQty = typingQty;
                                              // }
                                            }
                                          }

                                          templistArry[index].qty = tmepQty;

                                          this.setState({
                                            typingText: tmepQty,
                                            itemList_: templistArry,
                                          });

                                          // main operation - update qty
                                          this.updateQty(index, tmepQty, e);

                                          // let formattedValue = value;

                                          // if (value == '0') {
                                          //   formattedValue = '1';
                                          // }

                                          // this.updatePriceAfterChange_numInput(
                                          //   e.code,
                                          //   formattedValue
                                          // );

                                          // e.tempQty = formattedValue;
                                        } else {
                                          let templistArry = this.state.itemList_;
                                          templistArry[index].qty = e.SkuDiscountCat == 'A' ? e.SKUPictorialPackSize : 1;
                                          this.setState({
                                            typingText: e.SkuDiscountCat == 'A' ? e.SKUPictorialPackSize : 1,
                                            itemList_: templistArry,
                                          });
                                          showMessage({
                                            message: 'KINGS SEEDS',
                                            description: `Invalid Number`,
                                            type: 'warning',
                                            autoHide: true,
                                          });

                                        }
                                      }}
                                      selectTextOnFocus
                                      value={e.qty.toString()}
                                      keyboardType="numeric"
                                    />

                                    {/* <NumericInput
                              value={this.getNumericInpVal(e.code)}
                              onChange={(value) => {
                                this.updatePriceAfterChange_numInput(
                                  e.code,
                                  value
                                );
                                // this.setState({
                                //   value: value,
                                // });
                              }}
                              minValue={1}
                              maxValue={10000}
                              //onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                              totalWidth={wp("15")}
                              totalHeight={hp("4")}
                              iconSize={25}
                              step={1}
                              editable={false}
                              valueType="real"
                              rounded
                              borderColor="#f2f3f4"
                              textColor="black"
                              iconStyle={{ color: "#1ED18C" }}
                              rightButtonBackgroundColor="#f2f3f4"
                              leftButtonBackgroundColor="#f2f3f4"
                            /> */}
                                  </View>
                                </View>
                                <View style={styles.PriceView}>
                                  <View style={styles.cardTxtViewPrice}>
                                    <Text
                                      style={styles.cardUnitPriceTxt}
                                      allowFontScaling={false}>
                                      <Text> Unit Price: </Text>
                                      {/* { e.packSize.price.toFixed(2) } ask akila */}
                                      <Text style={{fontWeight: 'bold'}}>
                                        £{e.packSize.price.toFixed(2)}
                                      </Text>

                                      {/* {e.priceOptions !== null
                            ? e.priceOptions["1"].price
                            : ""} */}

                                      {/* {this.showUnitPrice(e.code, e.price)} */}
                                    </Text>

                                    <Text
                                      style={styles.cardPriceTxt}
                                      allowFontScaling={false}>
                                      <Text>£ </Text>
                                      {/* { (e.packSize.price * e.qty).toFixed(2)  ask akila} */}
                                      {e.lineTotal.toFixed(2)}
                                      {/* {e.priceOptions !== null
                            ? e.priceOptions["1"].price
                            : ""} */}

                                      {/* {this.showPrice(e.code, e.price)} */}
                                    </Text>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.9}
                                  onPress={() => {
                                    this.setState({
                                      deleteItemId: e.uniqId,
                                      btnName: 'itemDelete',
                                    });
                                    this.confirmShowHide(
                                      'Are you sure you want to delete this item?',
                                    );
                                  }}
                                  style={styles.DeleteView}>
                                  <View style={styles.delBtn}>
                                    <Image
                                      source={del}
                                      style={styles.cardImg}
                                    />
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        );
                      })}
</KeyboardAwareScrollView>

          {/* <KeyboardAwareScrollView keyboardShouldPersistTaps="handled"> */}
            <View style={{marginBottom:10, width: '100%'}}>
              <View style={styles.titleView}>


                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',

                    }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.printBtn}
                      onPress={() => {
                        showMessage({
                          message: 'KINGS SEEDS',
                          description: 'Please connect a printer to the device',
                          type: 'warning',
                          autoHide: true,
                        });
                      }}>
                      <Text style={styles.printTxt} allowFontScaling={false}>
                        PRINT
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.clearListBtn}
                      // onPress={() => {
                      //   // this.setState({ itemList_: [] });
                      //   // clearOrders();

                      // }}
                      onPress={() => {

                        console.log();
                        // this.myRef.current.focus();


                        if (this.state.itemList_.length > 0) {
                          this.setState({
                            btnName: 'clearList',
                          });
                          this.confirmShowHide(
                            'Are you sure you want to clear this list?',
                          );
                        } else {
                          showMessage({
                            message: 'KINGS SEEDS',
                            description: 'Order pad is already empty',
                            type: 'info',
                            autoHide: true,
                          });
                        }
                      }}>
                      <Text
                        style={styles.clearListTxt}
                        allowFontScaling={false}>
                        CLEAR LIST
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.AddToCartBtn}
                      onPress={() => {
                        if (checkDiscounts()) {
                          this.addToCart();
                        }
                      }}>
                      <Text style={styles.checkoutTxt} allowFontScaling={false}>
                        ADD TO CART
                      </Text>
                    </TouchableOpacity>
                  </View>

              </View>

            </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </View>
    );
  }
}



function getMaxMultiple(cut_value, tmepQty) {
 let maxMultiple = cut_value;

  while (maxMultiple < tmepQty) { maxMultiple = maxMultiple + cut_value; }

  if (maxMultiple == tmepQty) { maxMultiple = maxMultiple - cut_value }

  return maxMultiple;
}



function removeSpaces(str) {
  return str.trim().replace(/\s+/g, '');
}





function OrderPadWrapper(props) {
  const isFocused = useIsFocused();
  return <OrderPad {...props} isFocused={isFocused} />;


}


const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
    selItemCodes: state.orderPad.selItemCodes,
    itemsArray: state.orderPad.itemsArray,
    preseasonStatus: state.checkout,
  };
};

export default connect(mapStateToProps, {
  getItemsArray,
 // getSelectedCodes,
  addToCart,
})(OrderPadWrapper);



