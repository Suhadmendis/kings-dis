import React, { Component, useState } from "react";
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
  Switch,
} from "react-native";
import { store } from "../../configureStore";
import Styles from "../style/PictorialFormStyle";
import { addToCart } from "../actions/CartActions";
import { connect } from "react-redux";
import Back from "./common/Back";
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as colors from "../style/Common/ColorsStyle";

import { GetDecimal, GetInteger } from "../utils/ValidationHelper";
import {
  GetCustomFormattedValue,
  GetProductLinePricing,
} from "../offline/Services/ProductHelper";

import { showMessage } from "react-native-flash-message";
import { getPictorialItems } from "../url/API";
import { GetPictorialProducts } from "../offline/localData/serviceData/GetPictorialProducts";
const search = require("../assets/search-green.png");
import { getItemsArray, getSelectedCodes } from "../actions/OrderPadAction";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import PictorialOrderPadItem from "./HOC/PictorialOrderPadItem";
import DataAdapter from "../offline/localData/DataAdapter";
import { checkDiscounts } from "../utils/checkDiscounts";
import { checkCartItem, checkCartItems, getCartType, isCartEmpty } from "./CartOperation/CartFunctions";
import { useIsFocused } from "@react-navigation/native";

const greenArrow = require("../assets/arrow-down-green.png");
const blackArrow = require("../assets/arrow-down-black.png");

const { ids, styles } = Styles;

// main operation - get data
async function initial() {
  const payload = {
    section: "PICTORIAL ORDER PAD",
    opration: "GET",
    data: "",
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

class PictorialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat_1_switch: false,
      cat_2_switch: false,
      cat_3_switch: false,
      cat_4_switch: false,
      addToCartBtnLock: false,
      loading: false,
      mainObject: [],
      selectedCategoryKey: -1,
      preSeasonSwitch: false,
      cartType: '',
    };
  }

  async componentDidMount() {
    if (checkDiscounts()) {
    }

    this.mounted();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (checkDiscounts()) {
    }


    console.log('prevProps.isFocused', prevProps.isFocused);
    console.log('this.props.isFocused', this.props.isFocused);
    if (prevProps.isFocused !== this.props.isFocused) {
      this.mounted();
    }




  }



  setCartType = async () => {
    const cartType = await checkCartItems();

    return cartType;
  }

  mounted = async () => {
    console.log("mount");
    this.setState({ selectedCategoryKey: -1 });
    let dataset = [];

    let state = store.getState();

    let internetConnectivity = state.loading?.connectionStatus;
    let preSeasonToggle = state.checkout.preSeasonToggle || false;
    this.setState({ preSeasonSwitch: preSeasonToggle });

    if (internetConnectivity) {
      if (this.props.isFocused) {
        this.setState({ loading: true });
      }

      preSeasonToggle = preSeasonToggle ? 1 : 0;
      dataset = await getPictorialItems(preSeasonToggle);
      if (dataset == '') {
        showMessage({
          message: "KINGS SEEDS",
          description: `No products available for display at this time`,
          type: "warning",
          autoHide: true,
        });
      }
      this.setState({ loading: false });
    } else {
      if (this.props.isFocused) {
        this.setState({ loading: true });
      }
      dataset = await GetPictorialProducts("", 0, 0);
      console.log("dataset ", dataset);
      this.setState({ loading: false });
    }

    this.makeArray(dataset);
  };

  makeArray = (object) => {
    let categoryArray = [];
    let countKey = 0;
    object.map((element) => {
      element.key = countKey;

      let changeProducts = [];
      element.products.map((product) => {


        product.qty = "0";
        changeProducts.push(product);
      });

      element.products = changeProducts;

      categoryArray.push(element);
      ++countKey;
    });

    this.setState({ mainObject: categoryArray });
  };

  getOrderderingItems = () => {
    let orderingItems = [];

    this.state.mainObject.map((cat) => {
      cat.products.map((item) => {
        if (parseInt(item.qty) > 0) {
          orderingItems.push(item);
        }
      });
    });

    return orderingItems;
  };

  clearList = () => {
    let preObject = this.state.mainObject;

    let resetList = false;

    preObject.map((cat) =>
      cat.products.map((item) => {
        if (item.qty != "0") {
          resetList = true;
        }
        item.qty = "0";
      })
    );

    if (resetList) {
      // showMessage({
      //     message: 'KINGS SEEDS',
      //     description: `Items added to the cart`,
      //     type: 'success',
      //     autoHide: true,
      // });
    } else {
      showMessage({
        message: "KINGS SEEDS",
        description: `List is already in the initial stage`,
        type: "warning",
        autoHide: true,
      });

    }

    this.setState({ mainObject: preObject });
    this.setState({ selectedCategoryKey: -1 });
    this.setState({ addToCartBtnLock: false });
  };

  addToCart = async () => {
    let preOrderingItems = this.getOrderderingItems();

    preOrderingItems = preOrderingItems.map((item) => {
      let remainder = item.qty % item.pictorialPackSize;

      item.qty = item.qty - remainder;

      return item;
    });

    const orderingItems = preOrderingItems.filter((item) => item.qty != 0);

    if (orderingItems.length > 0) {
      let itemsToAdd = [];
      let unavailableItems = [];

      for (let index = 0; index < orderingItems.length; index++) {
        let item = orderingItems[index];

        if (item.availability) {
          let tot =
            GetDecimal(item.priceOptions["1"].price) * GetInteger(item.qty); // fallback
          let tax = 0; // fallback
          let uPrice = GetDecimal(item.priceOptions["1"].price); // fallback
          try {
            let linePricing = await GetProductLinePricing(
              item.code,
              1,
              item.qty
            );

            // chamila | {"LinePrice": 0, "LineTax": 0, "UnitPrice": 0}

            tot = linePricing.LinePrice;
            tax = linePricing.LineTax;
            uPrice = linePricing.UnitPrice;
          } catch (e) {
            console.log("GetProductLinePricing Error... ", e);
            this.setState({addToCartBtnLock:false})
          }

          const product = {
            skuid: item.skuId,
            skuName: item.title,
            skuNumber: item.code,
            skuPackSize: "",
            priceOptions: {},
            priceOption: item.priceOptions["1"].label,
            preSeason: false,
            skuDiscountCat: "A",
            priceLine: 1,
            quantity: item.qty,
            totalPrice: tot,
            totalTax: tax,
            unitPrice: uPrice,
          };

          product.priceOptions["1"] = {
            label: item.priceOptions["1"].label,
            price: item.priceOptions["1"].price,
            priceDisplay: await GetCustomFormattedValue(
              item.priceOptions["1"].price
            ),
          };

          // product.priceOption = item.priceOptions;
          console.log("product... ", product);

          itemsToAdd.push(product);
        } else {
          unavailableItems.push(item.uniqId);
        }
      }

      if (unavailableItems.length === orderingItems.length) {
        showMessage({
          message: "KINGS SEEDS",
          description:
            "All the items are unavailable and not added to the cart.",
          type: "warning",
          autoHide: true,
        });
      } else if (unavailableItems.length > 0) {
        showMessage({
          message: "KINGS SEEDS",
          description: `${unavailableItems.length} items are unavailable and not added to the cart.`,
          type: "warning",
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
          cartItems: itemsToAdd,
        });

        this.clearList();
      }
      this.setState({addToCartBtnLock:false})
    } else {
      showMessage({
        message: "KINGS SEEDS",
        description: "Please add quantities",
        type: "warning",
        autoHide: true,
      });
      this.setState({addToCartBtnLock:false})
    }
  };

  setLinePrice = async (catKey, productId) => {
    let preObject = this.state.mainObject;
    let thisCategory = preObject.filter((c) => c.key == catKey);
    let thisItem = thisCategory[0].products.filter((i) => i.skuId == productId);

    const lineTotal = await GetProductLinePricing(
      thisItem[0].code,
      1,
      thisItem[0].qty
    );

    thisCategory[0].products.map((i) => {
      if (i.skuId == productId) {
        return thisItem[0];
      }
    });

    preObject.map((c) => {
      if (c.key == catKey) {
        return thisCategory[0];
      }
    });

    this.setState({ mainObject: preObject });
  };

  preSeasonTogglePerform = (flag) => {
    // this.setState({ preSeasonSwitch: flag });

    this.setCartType().then((items) => {






      if (flag) {

        const nonPreSeasonitems = items.filter(item => item.SkuPreSeason != 1);

        if (nonPreSeasonitems.length > 0){
          showMessage({
            message: "KINGS SEEDS",
            description: "NON Pre-season items already in cart. Please save the cart or empty before proceeding",
            type: "warning",
            autoHide: true,
          });
          return;
        }else{
          this.changeToggle(flag);
        }

      }else{
        const preSeasonOnlyItems = items.filter(item => item.SkuPreSeasonOnly == 1);

        if (preSeasonOnlyItems.length > 0){
          showMessage({
            message: "KINGS SEEDS",
            description: "Pre-season Only items already in cart. Please save the cart or empty before proceeding",
            type: "warning",
            autoHide: true,
          });
          return;
        }else{
          this.changeToggle(flag);
        }
      }



      // if (flag) {
      //   if (type == "PRESEASON") {
      //     showMessage({
      //       message: "KINGS SEEDS",
      //       description: "There is an active cart with only preseason item/s. Please clear the cart.",
      //       type: "warning",
      //       autoHide: true,
      //     });
      //     return;

      //   }

      //   if (type == "NORMAL") {
      //     this.changeToggle(flag);
      //     return;
      //   }



      // }
      // else{

      //   if (type == "PRESEASON") {
      //     showMessage({
      //       message: "KINGS SEEDS",
      //       description: "This is a Preseason Cart, please amend the cart and try again",
      //       type: "warning",
      //       autoHide: true,
      //     });
      //     return;
      //   }

      //   if (type == "NORMAL") {
      //     this.changeToggle();
      //   }

      // }


    })
    console.log(flag);

  };

  changeToggle = (flag) => {
    store.dispatch({
      type: "PRE_SEASON_TOGGLE",
      payload: {
        preSeasonToggle: flag,
      },
    });

    setTimeout(() => {
      this.mounted();
    }, 100);
  }

  render() {
    // const Items = (category) => {
    //   let counter = category.products.length;
    //   // console.log('-----------------------------products-=--------------------------------------------');
    //   // console.log(category.products);
    //   // console.log('-----------------------------products-=--------------------------------------------');
    //   const ItemElement = category.products.map((product) => {
    //     // product.qty = '0';
    //     --counter;

    //     const lineTotal = product.qty * product.priceOptions["1"].price;

    //     return (
    //       <View style={styles.itemPallet} key={product.skuId}>
    //         <View style={styles.itemVeiw}>
    //           <View style={styles.lineOne}>
    //             <Text
    //               style={styles.productNameText}
    //               allowFontScaling={false}
    //               numberOfLines={1}
    //             >
    //               {product.title}
    //             </Text>

    //             <Text
    //               style={styles.productpackSizeText}
    //               allowFontScaling={false}
    //             >
    //               {product.priceOptions["1"].label}
    //             </Text>
    //           </View>
    //           <View style={styles.lineTwo}>
    //             <View style={{ flexDirection: "row" }}>
    //               <Text style={styles.productCodeText} allowFontScaling={false}>
    //                 Code: {product.code}
    //               </Text>
    //               <Text
    //                 style={[
    //                   styles.productCodeText,
    //                   { marginLeft: wp("5"), color: "#1ed18c" },
    //                 ]}
    //                 allowFontScaling={false}
    //               >
    //                 Stock:
    //                 {product.stock <= 0 ? (
    //                   <Text style={{ color: "red" }}> 0</Text>
    //                 ) : (
    //                   <Text> {product.stock}</Text>
    //                 )}
    //               </Text>
    //             </View>

    //             <Text
    //               style={styles.productUnitPriceText}
    //               allowFontScaling={false}
    //             >
    //               Unit Price: {product.price}
    //             </Text>
    //           </View>

    //           <View style={styles.lineThree}>
    //             <TextInput
    //               style={styles.productQtyText}
    //               keyboardType="numeric"
    //               value={product.qty}
    //               min={0}
    //               max={9999}
    //               selectTextOnFocus
    //               onFocus={() => {
    //                 console.log(product.qty);
    //                 if (product.qty == "0") {
    //                   let preObject = this.state.mainObject;
    //                   let thisCategory = preObject.filter(
    //                     (c) => c.key == category.key
    //                   );
    //                   let thisItem = thisCategory[0].products.filter(
    //                     (i) => i.skuId == product.skuId
    //                   );

    //                   thisItem[0].qty = "";

    //                   thisCategory[0].products.map((i) => {
    //                     if (i.skuId == product.skuId) {
    //                       return thisItem[0];
    //                     }
    //                   });

    //                   preObject.map((c) => {
    //                     if (c.key == category.key) {
    //                       return thisCategory[0];
    //                     }
    //                   });

    //                   this.setState({ mainObject: preObject });
    //                 }
    //               }}
    //               onChangeText={(text) => {
    //                 let preObject = this.state.mainObject;
    //                 let thisCategory = preObject.filter(
    //                   (c) => c.key == category.key
    //                 );
    //                 let thisItem = thisCategory[0].products.filter(
    //                   (i) => i.skuId == product.skuId
    //                 );

    //                 let enterdvalue = parseInt(text).toString();

    //                 if (enterdvalue > 0) {
    //                   thisItem[0].qty = enterdvalue;

    //                   thisCategory[0].products.map((i) => {
    //                     if (i.skuId == product.skuId) {
    //                       return thisItem[0];
    //                     }
    //                   });

    //                   preObject.map((c) => {
    //                     if (c.key == category.key) {
    //                       return thisCategory[0];
    //                     }
    //                   });

    //                   this.setState({ mainObject: preObject });
    //                 } else {
    //                   thisItem[0].qty = "0";

    //                   thisCategory[0].products.map((i) => {
    //                     if (i.skuId == product.skuId) {
    //                       return thisItem[0];
    //                     }
    //                   });

    //                   preObject.map((c) => {
    //                     if (c.key == category.key) {
    //                       return thisCategory[0];
    //                     }
    //                   });

    //                   this.setState({ mainObject: preObject });
    //                 }
    //               }}
    //               onBlur={(text) => {
    //                 let preObject = this.state.mainObject;
    //                 let thisCategory = preObject.filter(
    //                   (c) => c.key == category.key
    //                 );
    //                 let thisItem = thisCategory[0].products.filter(
    //                   (i) => i.skuId == product.skuId
    //                 );

    //                 let enterdvalue = parseInt(thisItem[0].qty) || 0;

    //                 console.log(enterdvalue);
    //                 if (enterdvalue != "0") {
    //                   if (!thisItem[0].availability) {
    //                     showMessage({
    //                       message: "KINGS SEEDS",
    //                       description: `Item is Unavailable`,
    //                       type: "warning",
    //                       autoHide: true,
    //                     });

    //                     store.dispatch({
    //                       type: "SET_BILLING_INFO",
    //                       payload: {
    //                         unavailableItems: thisItem[0].code,
    //                       },
    //                     });

    //                     thisItem[0].qty = "0";

    //                     thisCategory[0].products.map((i) => {
    //                       if (i.skuId == product.skuId) {
    //                         return thisItem[0];
    //                       }
    //                     });

    //                     preObject.map((c) => {
    //                       if (c.key == category.key) {
    //                         return thisCategory[0];
    //                       }
    //                     });

    //                     this.setState({ mainObject: preObject });

    //                     return;
    //                   }
    //                 }

    //                 if (thisItem[0].qty.length > 4) {
    //                   // enterdvalue = enterdvalue.slice(0, 4);
    //                   enterdvalue = 10000 - product.pictorialPackSize;

    //                   showMessage({
    //                     message: "KINGS SEEDS",
    //                     description: `Maximum quantity is ${enterdvalue}`,
    //                     type: "warning",
    //                     autoHide: true,
    //                   });
    //                 }

    //                 if (enterdvalue > 0) {
    //                   const pictorialPacketSize = product.pictorialPackSize;

    //                   const pictorialPack = enterdvalue % pictorialPacketSize;

    //                   if (enterdvalue > pictorialPacketSize) {
    //                     if (pictorialPack != 0) {
    //                       showMessage({
    //                         message: "KINGS SEEDS",
    //                         description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Reduced By - ${pictorialPack}`,
    //                         type: "warning",
    //                         autoHide: true,
    //                       });
    //                       enterdvalue = enterdvalue - pictorialPack;
    //                     }
    //                   } else {
    //                     const increased = pictorialPacketSize - pictorialPack;
    //                     if (pictorialPack > 0) {
    //                       showMessage({
    //                         message: "KINGS SEEDS",
    //                         description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Increased By - ${increased}`,
    //                         type: "warning",
    //                         autoHide: true,
    //                       });

    //                       enterdvalue = enterdvalue + increased;
    //                     }
    //                   }

    //                   thisItem[0].qty = enterdvalue.toString();

    //                   thisCategory[0].products.map((i) => {
    //                     if (i.skuId == product.skuId) {
    //                       return thisItem[0];
    //                     }
    //                   });

    //                   preObject.map((c) => {
    //                     if (c.key == category.key) {
    //                       return thisCategory[0];
    //                     }
    //                   });

    //                   this.setState({ mainObject: preObject });
    //                 } else {
    //                   thisItem[0].qty = "0";

    //                   thisCategory[0].products.map((i) => {
    //                     if (i.skuId == product.skuId) {
    //                       return thisItem[0];
    //                     }
    //                   });

    //                   preObject.map((c) => {
    //                     if (c.key == category.key) {
    //                       return thisCategory[0];
    //                     }
    //                   });

    //                   this.setState({ mainObject: preObject });
    //                 }

    //                 this.setLinePrice(category.key, product.skuId);
    //               }}
    //             />
    //             <Text
    //               style={styles.productLineTotalText}
    //               allowFontScaling={false}
    //             >
    //               £{lineTotal.toFixed(2)}
    //             </Text>
    //           </View>

    //           {counter == 0 ? null : <View style={styles.breakLine} />}
    //         </View>
    //       </View>
    //     );
    //   });

    //   return ItemElement;
    // };

    const renderCategory = (cat) => {


      return (
        <View style={styles.dropdownPallet} key={cat.key}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.state.selectedCategoryKey == cat.key
                ? this.setState({ selectedCategoryKey: -1 })
                : this.setState({ selectedCategoryKey: cat.key });
            }}
            style={styles.dropdownView}
          >
            <View style={styles.contentView}>
              <Text
                style={[
                  styles.dropdownText,
                  this.state.selectedCategoryKey == cat.key
                    ? { color: "#1ed18c" }
                    : null,
                ]}
              >
                {cat.name}
              </Text>

              {
                <Image
                  source={
                    this.state.selectedCategoryKey == cat.key
                      ? greenArrow
                      : blackArrow
                  }
                  style={[
                    styles.dropdownImage,
                    this.state.selectedCategoryKey == cat.key
                      ? { transform: [{ rotate: "180deg" }] }
                      : null,
                  ]}
                />
              }
            </View>
          </TouchableOpacity>

          {this.state.selectedCategoryKey == cat.key ?
           <FlatList
           data={cat.products}
           renderItem={({ item: product }) =>{
            let counter = cat.products.length;
               --counter;
             const lineTotal = product.qty * product.priceOptions["1"].price;

             return (
               <View style={styles.itemPallet} key={product.skuId}>
                 <View style={styles.itemVeiw}>
                   <View style={styles.lineOne}>
                     <Text
                       style={styles.productNameText}
                       allowFontScaling={false}
                       numberOfLines={1}
                     >
                       {product.title}
                     </Text>

                     <Text
                       style={styles.productpackSizeText}
                       allowFontScaling={false}
                     >
                       {product.priceOptions["1"].label}
                     </Text>
                   </View>
                   <View style={styles.lineTwo}>
                     <View style={{ flexDirection: "row" }}>
                       <Text style={styles.productCodeText} allowFontScaling={false}>
                         Code: {product.code}
                       </Text>
                       <Text
                         style={[
                           styles.productCodeText,
                           { marginLeft: wp("5"), color: "#1ed18c" },
                         ]}
                         allowFontScaling={false}
                       >
                         Stock:
                         {product.stock <= 0 ? (
                           <Text style={{ color: "red" }}> 0</Text>
                         ) : (
                           <Text> {product.stock}</Text>
                         )}
                       </Text>
                     </View>

                     <Text
                       style={styles.productUnitPriceText}
                       allowFontScaling={false}
                     >
                       Unit Price: {product.priceOptions['1'].priceDisplay}
                     </Text>
                   </View>

                   <View style={styles.lineThree}>
                     <TextInput
                       style={styles.productQtyText}
                       keyboardType="numeric"
                       value={product.qty}
                       min={0}
                       max={9999}
                       selectTextOnFocus
                       onFocus={() => {

                        console.log('Entering........................');

                         console.log(product);
                         if (product.qty == "0") {
                           let preObject = this.state.mainObject;
                           let thisCategory = preObject.filter(
                             (c) => c.key == cat.key
                           );
                           let thisItem = thisCategory[0].products.filter(
                             (i) => i.skuId == product.skuId
                           );

                           thisItem[0].qty = "";

                           thisCategory[0].products.map((i) => {
                             if (i.skuId == product.skuId) {
                               return thisItem[0];
                             }
                           });

                           preObject.map((c) => {
                             if (c.key == cat.key) {
                               return thisCategory[0];
                             }
                           });

                           this.setState({ mainObject: preObject });
                         }
                       }}
                       onChangeText={(text) => {
                         let preObject = this.state.mainObject;
                         let thisCategory = preObject.filter(
                           (c) => c.key == cat.key
                         );
                         let thisItem = thisCategory[0].products.filter(
                           (i) => i.skuId == product.skuId
                         );

                         let enterdvalue = parseInt(text).toString();

                         if (enterdvalue > 0) {
                           thisItem[0].qty = enterdvalue;

                           thisCategory[0].products.map((i) => {
                             if (i.skuId == product.skuId) {
                               return thisItem[0];
                             }
                           });

                           preObject.map((c) => {
                             if (c.key == cat.key) {
                               return thisCategory[0];
                             }
                           });

                           this.setState({ mainObject: preObject });
                         } else {
                           thisItem[0].qty = "0";

                           thisCategory[0].products.map((i) => {
                             if (i.skuId == product.skuId) {
                               return thisItem[0];
                             }
                           });

                           preObject.map((c) => {
                             if (c.key == cat.key) {
                               return thisCategory[0];
                             }
                           });

                           this.setState({ mainObject: preObject });
                         }
                       }}
                       onBlur={(text) => {
                         let preObject = this.state.mainObject;
                         let thisCategory = preObject.filter(
                           (c) => c.key == cat.key
                         );
                         let thisItem = thisCategory[0].products.filter(
                           (i) => i.skuId == product.skuId
                         );

                         let enterdvalue = parseInt(thisItem[0].qty) || 0;

                         console.log(enterdvalue);
                         if (enterdvalue != "0") {
                           if (!thisItem[0].availability) {
                             showMessage({
                               message: "KINGS SEEDS",
                               description: `Item is Unavailable`,
                               type: "warning",
                               autoHide: true,
                             });

                             store.dispatch({
                               type: "SET_BILLING_INFO",
                               payload: {
                                 unavailableItems: thisItem[0].code,
                               },
                             });

                             thisItem[0].qty = "0";

                             thisCategory[0].products.map((i) => {
                               if (i.skuId == product.skuId) {
                                 return thisItem[0];
                               }
                             });

                             preObject.map((c) => {
                               if (c.key == cat.key) {
                                 return thisCategory[0];
                               }
                             });

                             this.setState({ mainObject: preObject });

                             return;
                           }
                         }

                         if (thisItem[0].qty.length > 4) {
                           // enterdvalue = enterdvalue.slice(0, 4);
                           enterdvalue = getMaxMultiple(product.pictorialPackSize, 10000);


                           showMessage({
                             message: "KINGS SEEDS",
                             description: `Maximum quantity is ${enterdvalue}`,
                             type: "warning",
                             autoHide: true,
                           });
                         }

                         if (enterdvalue > 0) {
                           const pictorialPacketSize = product.pictorialPackSize;

                           const pictorialPack = enterdvalue % pictorialPacketSize;

                           if (enterdvalue > pictorialPacketSize) {
                             if (pictorialPack != 0) {
                               showMessage({
                                 message: "KINGS SEEDS",
                                 description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Reduced By - ${pictorialPack}`,
                                 type: "warning",
                                 autoHide: true,
                               });
                               enterdvalue = enterdvalue - pictorialPack;
                             }
                           } else {
                             const increased = pictorialPacketSize - pictorialPack;
                             if (pictorialPack > 0) {
                               showMessage({
                                 message: "KINGS SEEDS",
                                 description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Increased By - ${increased}`,
                                 type: "warning",
                                 autoHide: true,
                               });

                               enterdvalue = enterdvalue + increased;
                             }
                           }

                           thisItem[0].qty = enterdvalue.toString();

                           thisCategory[0].products.map((i) => {
                             if (i.skuId == product.skuId) {
                               return thisItem[0];
                             }
                           });

                           preObject.map((c) => {
                             if (c.key == cat.key) {
                               return thisCategory[0];
                             }
                           });

                           this.setState({ mainObject: preObject });
                         } else {
                           thisItem[0].qty = "0";

                           thisCategory[0].products.map((i) => {
                             if (i.skuId == product.skuId) {
                               return thisItem[0];
                             }
                           });

                           preObject.map((c) => {
                             if (c.key == cat.key) {
                               return thisCategory[0];
                             }
                           });

                           this.setState({ mainObject: preObject });
                         }

                         this.setLinePrice(cat.key, product.skuId);
                       }}
                     />
                     <Text
                       style={styles.productLineTotalText}
                       allowFontScaling={false}
                     >
                       £{lineTotal.toFixed(2)}
                     </Text>
                   </View>

                   {counter == 0 ? null : <View style={styles.breakLine} />}
                 </View>
               </View>
             );
           }}
           />
          : null}
        </View>
      );
    };


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Back />

          <OrientationLoadingOverlay
            visible={this.state.loading}
            color="white"
            indicatorSize="large"
            messageFontSize={24}
            message="Loading..."
          />

          <View style={styles.topSection}>
            <Text style={styles.titleTxt} allowFontScaling={false}>
              Pictorial Order Pad
            </Text>
            <View style={styles.preSeasonToggleArea}>
              <Text style={styles.preSeasonText} allowFontScaling={false}>
                Pre-Season
              </Text>
              <Switch
                disabled={false}
                style={styles.preSeasonToggle}
                trackColor={{ false: "#767577", true: "#B2F1A7" }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(flag) => this.preSeasonTogglePerform(flag)}
                value={this.state.preSeasonSwitch}
              />
            </View>
          </View>

          <ScrollView
            style={{ width: "100%", alignSelf: "center" }}
            nestedScrollEnabled={true}
          >
            {this.state.mainObject.map((cat) => renderCategory(cat))}

            {/* <PictorialOrderPadItem>
                        <Text>fdsfs</Text>

                      </PictorialOrderPadItem> */}
          </ScrollView>

          <View style={styles.buttonPallet}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.clearBtn}
              onPress={() => {
                this.clearList();
              }}
            >
              <Text style={styles.clearTxt} allowFontScaling={false}>
                CLEAR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            disabled={this.state.addToCartBtnLock}
              activeOpacity={0.9}
              style={styles.AddToCartBtn}
              onPress={() => {
                if (checkDiscounts()) {
                  this.setState({addToCartBtnLock: true});
                  this.addToCart();
                }
              }}
            >
              <Text style={styles.checkoutTxt} allowFontScaling={false}>
                ADD TO CART
              </Text>
            </TouchableOpacity>
          </View>

          {/* <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <View style={{height: hp('80'), width: '100%'}}>
              <View style={styles.titleView}>

                <View style={{marginTop: hp('1')}}>
                  <View
                    style={{
                      width: '100%',
                      height: hp('65'),

                    }}>

                  </View>

                </View>



              </View>




            </View>
          </KeyboardAwareScrollView> */}
        </View>
      </SafeAreaView>
    );
  }
}


function getMaxMultiple(cut_value, tmepQty) {
  let maxMultiple = cut_value;

   while (maxMultiple < tmepQty) { maxMultiple = maxMultiple + cut_value; }

   if (maxMultiple == tmepQty) { maxMultiple = maxMultiple - cut_value }

   return maxMultiple;
 }

function HomePictorialForm(props) {
  const isFocused = useIsFocused();
  return <PictorialForm {...props} isFocused={isFocused} />;


}




function PictorialFormWrapper(props) {
  const isFocused = useIsFocused();
  return <HomePictorialForm {...props} isFocused={isFocused} />;


}


const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
    selItemCodes: state.orderPad.selItemCodes,
    itemsArray: state.orderPad.itemsArray,
  };
};

export default connect(mapStateToProps, {
  getItemsArray,
  getSelectedCodes,
  addToCart,
})(PictorialFormWrapper);
