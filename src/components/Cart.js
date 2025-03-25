import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Animated,
  FlatList,
} from "react-native";
import Styles from "../style/CartStyle";
import { connect, useSelector } from "react-redux";
import { getCategories } from "../actions/HomeScreenAction";
import Back from "./common/Back";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";
import CartItem from "./CartOperation/CartItem";

import { bindActionCreators } from "redux";
import { store } from "../../configureStore";

import {
  addToCart,
  clearCart,
  removeItem,
  updateQty,
  recalculateCart,
  updateBackingCard,
  updateTax,
  updateStoreDiscountOverride,
} from "../actions/CartActions";
import {
  GetTaxByCustomPrice,
  checkQty,
} from "../offline/Services/ProductHelper";
import envMode from '../config/basic.json';
import ConfirmationBox from "../components/common/ConfirmationBox";
import { showMessage } from "react-native-flash-message";
import { ConfirmDialog } from "react-native-simple-dialogs";
import _ from "lodash";

import { RawQuery } from "../offline/Services/DataHelper";
import { GetBoolean, GetInteger } from "../utils/ValidationHelper";
import { CategoriesNotAvailableForEndUsers } from "../offline/Services/UserHelper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as colors from "../style/Common/ColorsStyle";

import {
  initialPictorial,
  initialCartRefs,
  initialCartRefsAndIds,
  initialQuoteRefsAndIds,
  initialQuoteRefs,
  saveCart,
  saveQuote,
  validations,
  preSeasonChecking,
  getSettings,
  getCartType,
} from "./CartOperation/CartFunctions";
import { checkDiscounts } from "../utils/checkDiscounts";

const search = require("../assets/search-green.png");
const filter = require("../assets/barcode.png");
const menu = require("../assets/menu.png");
const cart = require("../assets/BlueLeft.png");
const deleteIcon = require("../assets/del.png");
const remove = require("../assets/delete.png");

const { ids, styles } = Styles;

async function getTax(skuNumber, price) {
  const newpro = await GetTaxByCustomPrice(skuNumber, price);
  return newpro;
}
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      preSeason: false,
      // discountSW: false,
      cartRef: "",
      cartId: "",
      quoteId: "",
      quoteLabel: "",
      tempRef: "",
      allCartRefs: "",
      allCartRefsAndIds: "",
      allQuoteRefsAndIds: "",
      allQuoteLabels: "",
      pictorials: "",

      //confirmation dialog
      showdialog: false,
      deleteYes: false,
      deleteItemId: "",
      contentText: "",
      btnName: "",
      minimumOrderValue: "",

      cartMode: "Cart",
      quoteItemUi: false,
      customerID: "",
      showMinNote: true,

      selectedItems: [],
      deleteMode: null,
      discountObject: [],
      subTotal: 0.0,
      noteObject: [],
      saveCartDisable: false,
      checkoutBtn: false,
      totalTax: 0,
      ReadyToSync: false,
      fadeAnim: new Animated.Value(1),
      discountPer: "",
      // discountPerNum: '0',
      discountVisible: false,
      carriagePaidValue: "",
      shoppingCartDiscount: "",
      cartType: '',
      timeCounter: 0,
    };
  }

  componentDidMount() {
    this.initialMount();

    this.setState({ timeCounter: 0 })

    setTimeout(() => {
      this.checkCartMode();
    }, 2000);
  }

  async componentDidUpdate(prevProps, prevState) {

    // console.log('async componentDidUpdate');

if (this.props.cartItems.length != 0) {
  setTimeout(() => this.updateSubTotal(), 100);
}


    if (prevProps.cartItems.length !== this.props.cartItems.length) {
      console.log('cartItems updated:', this.props.cartItems);
      setTimeout(() => this.updateSubTotal(), 1000);

    }
    if (prevProps.isFocused !== this.props.isFocused) {
      this.initialMount();
    }

  }


  updateSubTotal() {
    const subTotal = this.getSubTotal();
    // this.setState({ subTotal });
    if (this.state.subTotal != subTotal) {
      this.setState({ subTotal });
    }

    // console.log('subTotal updated:============', subTotal);
  }

  initialMount = () => {

    this.setState({
      value: 1,
      preSeason: false,
      // discountSW: false,
      cartRef: "",
      cartId: "",
      quoteId: "",
      quoteLabel: "",
      tempRef: "",
      allCartRefs: "",
      allCartRefsAndIds: "",
      allQuoteRefsAndIds: "",
      allQuoteLabels: "",
      pictorials: "",

      //confirmation dialog
      showdialog: false,
      deleteYes: false,
      deleteItemId: "",
      contentText: "",
      btnName: "",
      minimumOrderValue: "",

      cartMode: "Cart",
      quoteItemUi: false,
      customerID: "",
      showMinNote: true,
      selectedItems: [],
      deleteMode: null,
      discountObject: [],
      subTotal: 0.0,
      noteObject: [],

      saveCartDisable: false,
      saveQuoteDisable: false,

      checkoutBtn: false,
      totalTax: 0,
      ReadyToSync: false,
      fadeAnim: new Animated.Value(1),
      discountPer: "",
      // discountPerNum: '0',
      discountVisible: false,
      carriagePaidValue: "",
      shoppingCartDiscount: "",
      cartType: '',
      timeCounter: 0,
    });

    fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };


    // getCartType().then((type) => this.setState({ cartType: type }));

    fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    this.setState({ customerID: this.props.adminCustomerID });

    initialPictorial().then((res) => this.setState({ pictorials: res }));

    initialCartRefs().then((res) => this.setState({ allCartRefs: res }));

    initialCartRefsAndIds().then((res) => this.setState({ allCartRefsAndIds: res }));

    initialQuoteRefs(this.props.adminCustomerID).then((res) => this.setState({ allQuoteLabels: res }));
    initialQuoteRefsAndIds(this.props.adminCustomerID).then((res) => this.setState({ allQuoteRefsAndIds: res }));

    getSettings("RTB2CMinimumOrderValue").then((res) => this.setState({ minimumOrderValue: parseFloat(res) }));
    getSettings("RTB2CCarriagePaidAtValue").then((res) => this.setState({ carriagePaidValue: parseFloat(res) }));
    getSettings("RTAppShoppingCartDiscountOverride").then((res) => this.setState({ shoppingCartDiscount: parseFloat(res) }));


    let state = store.getState();
    let preSeasonToggle = state.checkout.preSeasonToggle;

    setTimeout(() => {
      this.setState({ preSeason: preSeasonToggle });
    }, 2000);


console.log('Setting');
setTimeout(() => {
  this.checkCartMode();
  // this.props.recalculateCart(
  //   this.props.discountSW,
  //   this.props.discountPerNum,
  //   this.state.discountObject
  // );

}, 2000);


setTimeout(() => {
  this.checkCartMode();
}, 6000);





    setTimeout(() => {
      if (this.state.cartMode == "Editing Quote") {
        this.setState({ checkoutBtn: false });
      } else {
        this.setState({ checkoutBtn: true });
      }
      this.checkCheckoutButton();
    }, 10);

    this.updateSubTotal();
  };

  checkCartMode = () => {

    let lockAction = false;

    this.props.cartItems.map((item, index) => {
      console.log('indexwewrq', index);
      console.log(item.actionMode);

      if (item.actionMode == undefined) {
        lockAction = true;
      }

     if (!lockAction) {
      if (item.preSeason) {
        this.setState({ preSeason: true });
      }

      if (item.ReadyToSync == 1 || item.ReadyToSync == true) {
        this.setState({ ReadyToSync: true });
      }

      if (item.actionMode) {
        if (item.actionMode != "") {
          if (item.actionMode == "EDITING CART") {
            this.setState({ cartMode: "Editing Cart" });
            this.setState({ cartRef: item.cartName });
            this.setState({ cartId: item.cartId });
            lockAction = true;
          }
          if (item.actionMode == "EDITING QUOTE") {
            this.setState({ checkoutBtn: false });
            this.setState({ cartMode: "Editing Quote" });
            this.setState({ quoteLabel: item.quoteName });
            this.setState({ quoteId: item.quoteId });
            this.setState({ quoteItemUi: true });
            lockAction = true;
          }

          if (item.actionMode == "ORDER QUOTE") {
            this.setState({ cartMode: "Order Quote" });
            this.setState({ quoteLabel: item.quoteName });
            this.setState({ quoteId: item.quoteId });
            this.setState({ quoteItemUi: true });
            lockAction = true;
          }
        }
      }
     }


    });
  };

  getTotalTaxes = () => {
    let totTax = 0;
    for (let index = 0; index < this.props.cartItems.length; index++) {
      totTax = totTax + this.props.cartItems[index].totalTax;
    }

    setTimeout(() => this.updateSubTotal(), 1000);

    this.setState({ totalTax: totTax });
  };

  // checkQty = async () => {
  //   let ids = this.props.cartItems.map((item) =>{
  //     return item.productNumber;
  //   })

  //   ids = await CheckQuntities(ids);

  //   ids = ids.map((element) => {
  //     const pro = this.props.cartItems.filter((item) => item.productNumber == element.code);

  //     console.log(element.availableQty - pro[0].quantity);

  //     let balanceQty = element.availableQty - pro[0].quantity;
  //     if (element.availability == false) {
  //       return {
  //         ...element,
  //         balanceQty

  //       }
  //     }else{
  //       return {
  //         ...element,
  //         balanceQty,
  //         availability: balanceQty < 0 ? false : true
  //       }
  //     }

  //   })

  //   return ids;

  // }

  proceedToCheckout = async () => {
    let unavailableItems = [];
    let allItemsFree = true;
    let total = this.getSubTotal();
    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    for (let index = 0; index < this.props.cartItems.length; index++) {
      let cartItem = this.props.cartItems[index];

      let availability;
      let sku =
        await RawQuery(`SELECT SKUEnabled,SKUAvailableItems,Nav_Navigation
      FROM local_com_sku
      INNER JOIN local_int_navigation
      ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
      WHERE SKUID = ${cartItem.skuid}`);
      if (sku != "") {
        availability =
          GetBoolean(sku.item(0).SKUEnabled) &&
          GetInteger(sku.item(0).SKUAvailableItems) > 0;
        if (
          !_.some(CategoriesNotAvailableForEndUsers(), (cat) =>
            sku.item(0).Nav_Navigation.includes(cat)
          )
        ) {
          allItemsFree = false;
        }
      } else {
        availability = false;
        allItemsFree = false;
      }

      if (!availability) {
        unavailableItems.push(index);
      }
    }

    if (internetConnectivity) {
      const checkedQty = await checkQty(this.props.cartItems);

      // console.log(checkedQty);
      const exists = checkedQty.filter((item) => item.availability == false);
      // console.log(exists);

      if (exists.length > 0) {
        if (this.props.cartItems.length == exists.length) {
          showMessage({
            message: "KINGS SEEDS",
            description:
              "All the items are unavailable and removed from the cart.",
            type: "warning",
            autoHide: true,
          });
          this.props.clearCart();
          return;
        } else {
          showMessage({
            message: "KINGS SEEDS",
            description: `${exists.length} items are unavailable and removed from the cart.`,
            type: "warning",
            autoHide: true,
          });

          let UAItems = this.props.cartItems.map((item, count) => {
            console.log(count);
            const e = exists.filter(
              (uaItem) => uaItem.code == item.productNumber
            );
            if (e.length == 1) {
              return count;
            }
          });

          UAItems = UAItems.filter((item) => item != undefined);

          await this.props.removeItem(UAItems);

          // can use 'await this.props.recalculateCart' if we want to wait till recalculateCart is completed
          this.props.recalculateCart(
            this.props.discountSW,
            this.props.discountPerNum,
            this.state.discountObject
          );
          this.props.navigation.navigate("billing", {
            time: Date.now(),
            notes: this.state.noteObject,
          });

          return;
        }
      }
    } else {
      if (unavailableItems.length === this.props.cartItems.length) {
        showMessage({
          message: "KINGS SEEDS",
          description:
            "All the items are unavailable and removed from the cart.",
          type: "warning",
          autoHide: true,
        });
        this.props.clearCart();
      }

      if (unavailableItems.length > 0) {
        showMessage({
          message: "KINGS SEEDS",
          description: `${unavailableItems.length} items are unavailable and removed from the cart.`,
          type: "warning",
          autoHide: true,
        });
        this.props.removeItem(unavailableItems);
        // can use 'await this.props.recalculateCart' if we want to wait till recalculateCart is completed
        this.props.recalculateCart(
          this.props.discountSW,
          this.props.discountPerNum,
          this.state.discountObject
        );
        this.props.navigation.navigate("billing", {
          time: Date.now(),
          notes: this.state.noteObject,
        });
      }
    }

    if (!allItemsFree && total < this.state.minimumOrderValue) {
      showMessage({
        message: "KINGS SEEDS",
        description: `Minimum Order Value should be £${this.state.minimumOrderValue}`,
        type: "warning",
        autoHide: true,
      });
    } else {
      // can use 'await this.props.recalculateCart' if we want to wait till recalculateCart is completed

      this.props.recalculateCart(
        this.props.discountSW,
        this.props.discountPerNum,
        this.state.discountObject
      );
      this.props.navigation.navigate("billing", {
        time: Date.now(),
        notes: this.state.noteObject,
      });
    }
  };

  readDiscount = () => {
    // const timestamp = Date.now();
// console.log('timestampfsdgsdgs timestamp', timestamp); // Example: 1738002511015

    // let timeCounter = this.state.timeCounter + 1;
    // this.setState({ timeCounter: timeCounter });

  };

  addDiscount = (setDis) => {
    let disElementCount = this.state.discountObject.filter(
      (ob) => ob.cartItemID == setDis.cartItemID
    );

    if (disElementCount.length == 0) {
      let clonedElement = this.state.discountObject;
      clonedElement.push(setDis);
      this.setState({ discountObject: clonedElement });
    } else {
      const newDis = this.state.discountObject.map((ob) => {
        if (setDis.cartItemID == ob.cartItemID) {
          return {
            cartItemID: setDis.cartItemID,
            lineDiscount: setDis.lineDiscount,
            lineDiscountRate: setDis.lineDiscountRate,
            quotedUnitPrice: setDis.quotedUnitPrice,
            value: setDis.value == "1" ? "%" : "F",
            quotedPrice: setDis.quotedPrice,
            skuNumber: setDis.skuNumber,
            priceLine: setDis.priceLine,
          };
        } else {
          return ob;
        }
      });

      this.setState({ discountObject: newDis });
    }
  };

  changeNote = (note) => {
    let noteElementCount = this.state.noteObject.filter(
      (ob) => ob.cartItemID == note.cartItemID
    );

    if (noteElementCount == 0) {
      let clonedElement = this.state.noteObject;
      clonedElement.push(note);
      this.setState({ noteObject: clonedElement });
    } else {
      const newNote = this.state.noteObject.map((ob) => {
        if (note.cartItemID == ob.cartItemID) {
          return { cartItemID: note.cartItemID, value: note.value };
        } else {
          return ob;
        }
      });

      this.setState({ noteObject: newNote });
    }
  };

  preSeasonSwitch(flag) {
    flag
      ? this.setState({ preSeason: false })
      : this.setState({ preSeason: true });
  }

  discountSwitch(flag) {
    // flag ? fadeOut() : fadeIn()

    let discountSW = flag ? false : true;

    this.props.updateStoreDiscountOverride(
      discountSW,
      this.props.discountPerNum
    );

    // can use 'await this.props.recalculateCart' if we want to wait till recalculateCart is completed
    this.props.recalculateCart(
      discountSW,
      this.props.discountPerNum,
      this.state.discountObject
    );
  }

  saveCartCompletelySaved = () => {
    this.setState({ cartRef: "", cartMode: "Cart", deleteMode: "ALL" });
    this.deletecartItem();
    this.props.navigation.navigate("storeNew", { tab: 4, subTabVal: "" });
    this.setState({
      saveCartDisable: false,
    });
  };

  saveQuoteCompletelySaved = () => {
    this.setState({
      cartMode: "Cart",
      quoteLabel: "",
      quoteId: "",
      deleteMode: "ALL",
    });
    this.deletecartItem();
    this.props.navigation.navigate("storeNew", { tab: 3, subTabVal: "" });
    this.setState({
      saveQuoteDisable: false,
    });
  };

  addNotes = (cartItems) => {
    cartItems = cartItems.map((cartItem) => {
      let identifer = `${cartItem.productNumber}-${cartItem.priceOption}`;

      let note = "";

      this.state.noteObject.map((ob) => {
        if (identifer == ob.cartItemID) {
          note = ob.value;
        }
      });

      let itemWithNote = cartItem;

      itemWithNote.lineNote = note;

      return itemWithNote;
    });

    return cartItems;
  };

  saveCartOperation = (preCode) => {
    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    let cartItems = this.props.cartItems;
    const preSeason = this.state.preSeason;

    cartItems = this.addNotes(cartItems);

    let status, code, message;

    if (preCode == "04") {
      // if this is true is means this is an Editing Cart

      let object = validations(
        "save cart",
        this.state.cartRef,
        this.props.cartItems.length,
        this.state.allCartRefs,
        "Editing Cart"
      );

      status = object.status;
      code = object.code;
      message = object.message;
    } else {
      let object = validations(
        "save cart",
        this.state.cartRef,
        this.props.cartItems.length,
        this.state.allCartRefs,
        this.state.cartMode
      );

      status = object.status;
      code = object.code;
      message = object.message;
    }

    //4 5 9

    // error 01 - empty
    // error 02 - duplicated value
    // success 09 - success

    if (code == "01") {
      this.setState({
        saveCartDisable: false,
      });
      // alert(message);
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "02") {
      this.setState({
        saveCartDisable: false,
      });

      const cartId = getCartIdById(
        this.state.cartRef,
        this.state.allCartRefsAndIds
      );
      this.setState({ cartMode: "Editing Cart" });
      this.setState({ cartId: cartId });

      this.setState({
        btnName: "updateCart",
        showdialog: true,
        contentText:
          "This cart label already exists. If you want to update the existing saved cart click 'Yes' if not click 'No' and enter another cart label",
      });
      return;
    }

    if (code == "03") {
      this.setState({
        saveCartDisable: false,
      });
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "06") {
      this.setState({
        saveCartDisable: false,
      });
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "07") {
      this.setState({
        saveCartDisable: false,
      });
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    // success update
    if (code == "04") {
      if (this.state.preSeason) {
        const preSeasonCheck = preSeasonChecking(
          this.state.pictorials,
          this.props.cartItems
        );
        // preSeasonCheck[0] == preSeasonCheck[1]
        if (true) {
          saveCart(
            cartItems,
            this.state.cartRef,
            preSeason,
            this.state.cartMode,
            this.state.cartId,
            this.state.customerID,
            "",
            this.state.ReadyToSync
          ).then((res) => {
            if (res == "Success") {
              showMessage({
                message: "KINGS SEEDS",
                description: "Success! Your cart is saved",
                type: "success",
                autoHide: true,
              });

              this.saveCartCompletelySaved();
            }
          });
        } else {
          if (preSeasonCheck[1] == 0) {
            showMessage({
              message: "KINGS SEEDS",
              description:
                "There are no pre-season items in the cart. Please retry.",
              type: "warning",
              autoHide: true,
            });
          } else {
            if (preSeasonCheck[0] != preSeasonCheck[1]) {
              const diff = preSeasonCheck[0] - preSeasonCheck[1];

              let text = "";
              if (diff == 1) {
                text =
                  "There is 1 non pre-season item in the cart. Do you want to save without it?";
              } else {
                text = `There are ${diff} non pre-season items in the cart. Do you want to save without them?`;
              }

              Alert.alert("", text, [
                // The "Yes" button
                {
                  text: "Yes",
                  onPress: () => {
                    saveCart(
                      cartItems,
                      this.state.cartRef,
                      preSeason,
                      this.state.cartMode,
                      this.state.cartId,
                      this.state.customerID,
                      "",
                      this.state.ReadyToSync
                    ).then((res) => {
                      // this.setState({ newProducts: res });

                      if (res == "Success") {
                        // alert(res);
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Success! Your cart is saved",
                          type: "success",
                          autoHide: true,
                        });
                        this.saveCartCompletelySaved();
                      }
                    });
                  },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                  text: "No",
                },
              ]);
            }
          }
        }
      } else {
        saveCart(
          cartItems,
          this.state.cartRef,
          preSeason,
          this.state.cartMode,
          this.state.cartId,
          this.state.customerID,
          "",
          this.state.ReadyToSync
        ).then((res) => {
          if (res == "Success") {
            showMessage({
              message: "KINGS SEEDS",
              description: "Success! Your cart is saved",
              type: "success",
              autoHide: true,
            });
            this.saveCartCompletelySaved();
          }
        });
      }
    }

    // success
    if (code == "05") {
      if (this.state.preSeason) {
        const preSeasonCheck = preSeasonChecking(
          this.state.pictorials,
          this.props.cartItems
        );

        if (preSeasonCheck[0] == preSeasonCheck[1]) {
          saveCart(
            cartItems,
            this.state.cartRef,
            preSeason,
            "",
            "",
            this.state.customerID,
            "",
            this.state.ReadyToSync
          ).then((res) => {
            // add as a save cart
            // this.setState({ newProducts: res });

            if (res == "Success") {
              showMessage({
                message: "KINGS SEEDS",
                description: "Success! Your cart is saved",
                type: "success",
                autoHide: true,
              });
              this.setState({ cartRef: "" });
              this.saveCartCompletelySaved();
            }
          });
        } else {
          if (preSeasonCheck[1] == 0) {
            showMessage({
              message: "KINGS SEEDS",
              description:
                "There are no pre-season items in the cart. Please retry.",
              type: "warning",
              autoHide: true,
            });
          } else {
            if (preSeasonCheck[0] != preSeasonCheck[1]) {
              const diff = preSeasonCheck[0] - preSeasonCheck[1];

              let text = "";
              if (diff == 1) {
                text =
                  "There is 1 non pre-season item in the cart. Do you want to save without it?";
              } else {
                text = `There are ${diff} non pre-season items in the cart. Do you want to save without them?`;
              }

              Alert.alert("", text, [
                // The "Yes" button
                {
                  text: "Yes",
                  onPress: () => {
                    saveCart(
                      cartItems,
                      this.state.cartRef,
                      preSeason,
                      this.state.cartMode,
                      "",
                      this.state.customerID,
                      "NEWCART",
                      this.state.ReadyToSync
                    ).then(
                      // add as a save cart
                      (res) => {
                        // this.setState({ newProducts: res });

                        if (res == "Success") {
                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Success! Your cart is saved",
                            type: "success",
                            autoHide: true,
                          });
                          this.setState({ cartRef: "" });
                          this.saveCartCompletelySaved();
                        }
                      }
                    );
                    // setShowBox(false);
                  },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                  text: "No",
                },
              ]);
            }
          }
        }
      } else {
        saveCart(
          cartItems,
          this.state.cartRef,
          preSeason,
          "",
          "",
          this.state.customerID,
          "",
          this.state.ReadyToSync
        ).then((res) => {
          // add as a save cart

          if (res == "Success") {
            showMessage({
              message: "KINGS SEEDS",
              description: "Success! Your cart is saved",
              type: "success",
              autoHide: true,
            });
            this.setState({ cartRef: "" });
            this.saveCartCompletelySaved();
          }
        });
      }
    }

    // success
    if (code == "09") {
      if (this.state.preSeason) {
        const preSeasonCheck = preSeasonChecking(
          this.state.pictorials,
          this.props.cartItems
        );

        if (preSeasonCheck[0] == preSeasonCheck[1]) {
          saveCart(
            cartItems,
            this.state.cartRef,
            preSeason,
            "",
            "",
            this.state.customerID,
            "",
            this.state.ReadyToSync
          ).then((res) => {
            // add as a save cart
            // this.setState({ newProducts: res });

            if (res == "Success") {
              showMessage({
                message: "KINGS SEEDS",
                description: "Success! Your cart is saved",
                type: "success",
                autoHide: true,
              });
              this.setState({ cartRef: "" });
              this.saveCartCompletelySaved();
            }
          });
        } else {
          if (preSeasonCheck[1] == 0) {
            showMessage({
              message: "KINGS SEEDS",
              description:
                "There are no pre-season items in the cart. Please retry.",
              type: "warning",
              autoHide: true,
            });

            // Alert.alert(
            //   "",
            //   "There are no pre-season items in the cart. Please retry.",
            //   [
            //     // The "Yes" button
            //     {
            //       text: "OK",
            //       onPress: () => {
            //         // saveCart(cartItems, this.state.cartRef, preSeason).then(res => {  // add as a save cart
            //         //   // this.setState({ newProducts: res });
            //         //     if(res == 'Success'){
            //         //       alert(res);
            //         //       this.setState({ cartRef: '' });
            //         //     }
            //         // });
            //         // setShowBox(false);
            //       },
            //     },
            //   ]
            // );
          } else {
            if (preSeasonCheck[0] != preSeasonCheck[1]) {
              const diff = preSeasonCheck[0] - preSeasonCheck[1];

              let text = "";
              if (diff == 1) {
                text =
                  "There is 1 non pre-season item in the cart. Do you want to save without it?";
              } else {
                text = `There are ${diff} non pre-season items in the cart. Do you want to save without them?`;
              }

              Alert.alert("", text, [
                // The "Yes" button
                {
                  text: "Yes",
                  onPress: () => {
                    saveCart(
                      cartItems,
                      this.state.cartRef,
                      preSeason,
                      "",
                      "",
                      this.state.customerID,
                      "",
                      this.state.ReadyToSync
                    ).then(
                      // add as a save cart
                      (res) => {
                        // this.setState({ newProducts: res });

                        if (res == "Success") {
                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Success! Your cart is saved",
                            type: "success",
                            autoHide: true,
                          });
                          this.setState({ cartRef: "" });
                          this.saveCartCompletelySaved();
                        }
                      }
                    );
                    // setShowBox(false);
                  },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                  text: "No",
                },
              ]);
            }
          }
        }
      } else {
        saveCart(
          cartItems,
          this.state.cartRef,
          preSeason,
          "",
          "",
          this.state.customerID,
          "",
          this.state.ReadyToSync
        ).then((res) => {
          // add as a save cart
          // this.setState({ newProducts: res });

          if (res == "Success") {
            showMessage({
              message: "KINGS SEEDS",
              description: "Success! Your cart is saved",
              type: "success",
              autoHide: true,
            });
            this.setState({ cartRef: "" });
            this.saveCartCompletelySaved();
          }
        });
      }
    }
  };

  isQuoteRequested = async (quoteId) => {
    let statuses = [];

    let quoteStatus = await RawQuery(`SELECT * from local_ct_quotestatus`);
    for (let index = 0; index < quoteStatus.length; index++) {
      statuses.push(quoteStatus.item(index));
    }

    let itemID = await RawQuery(
      `SELECT * from local_ct_quotes where ItemShoppingCartID = '${quoteId}'`
    );
    itemID = itemID.item(0).ItemID;
    let quoteStatusUser = await RawQuery(
      `SELECT * from local_ct_quotestatususer where ItemQuoteID = '${itemID}'`
    );

    let quoteStatusUserStatuses = [];
    for (let index = 0; index < quoteStatusUser.length; index++) {
      const status = statuses.filter(
        (status) =>
          status.ItemID == quoteStatusUser.item(index).ItemQuoteStatusID
      );

      quoteStatusUserStatuses.push(status[0].ItemName);
    }

    const requested = quoteStatusUserStatuses.filter(
      (element) => element == "requested"
    );

    if (requested.length == 0) {
      return false;
    } else {
      return true;
    }
  };

  saveQuoteOperation = async (preCode) => {
    console.log('=======fffsd33');

    let cartItems = this.props.cartItems;

    cartItems = this.addNotes(cartItems);

    let status, code, message;

    if (preCode == "04") {
      let object = validations(
        "save quote",
        this.state.quoteLabel,
        this.props.cartItems.length,
        this.state.allQuoteLabels,
        "Editing Quote"
      );

      status = object.status;
      code = object.code;
      message = object.message;
    } else {
      let object = validations(
        "save quote",
        this.state.quoteLabel,
        this.props.cartItems.length,
        this.state.allQuoteLabels,
        this.state.cartMode
      );

      status = object.status;
      code = object.code;
      message = object.message;
    }

    console.log(this.state.saveQuoteDisable);
    // error 01 - empty
    // error 02 - duplicated value
    // success 09 - success
    if (code !== "04" || code !== "09") {
      this.setState({
        saveQuoteDisable: false,
      });
    }

    console.log("===code=================================");
    console.log(code);
    console.log("====================================");

    if (code == "01") {
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "02") {
      const quoteId = getQuoteIdById(
        this.state.quoteLabel,
        this.state.allQuoteRefsAndIds
      );

      this.setState({ cartMode: "Editing Quote" });
      this.setState({ quoteId: quoteId });

      const requested = await this.isQuoteRequested(quoteId);

      if (requested) {
        this.setState({ cartMode: "Cart" });
        showMessage({
          message: "KINGS SEEDS",
          description:
            "This quote label already exists and requested for quote",
          type: "warning",
          autoHide: true,
        });
        return;
      } else {
        this.setState({
          btnName: "updateQuote",
          showdialog: true,
          contentText:
            "This quote label already exists. If you want to update the existing saved quote click 'Yes' if not click 'No' and enter another quote label",
        });

        return;
      }
    }

    if (code == "03") {
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "06") {
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "07") {
      showMessage({
        message: "KINGS SEEDS",
        description: message,
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (code == "04") {
      // return;

      saveQuote(
        cartItems,
        this.state.quoteLabel,
        this.state.cartMode,
        this.state.quoteId,
        this.state.customerID,
        this.state.discountObject,
        this.state.ReadyToSync
      ).then((res) => {
        // this.setState({ newProducts: res });

        if (res == "Success") {
          showMessage({
            message: "KINGS SEEDS",
            description: "Success! Your Quote is saved",
            type: "success",
            autoHide: true,
          });
          this.saveQuoteCompletelySaved();
        }
      });
    }

    // success
    if (code == "09") {
      const cartItems = this.props.cartItems;
      saveQuote(
        cartItems,
        this.state.quoteLabel,
        "",
        "",
        this.state.customerID,
        "",
        this.state.ReadyToSync
      ).then((res) => {
        if (res == "Success") {
          showMessage({
            message: "KINGS SEEDS",
            description: "Success! Your Quote is saved",
            type: "success",
            autoHide: true,
          });
          this.setState({ quoteLabel: "" });
          this.saveQuoteCompletelySaved();
        }
      });
    }
  };

  ammendQuoteItemsDiscount = () => {
    console.log("====================================");
    console.log(this.state.discountObject);
    console.log("====================================");

    const items = this.props.cartItems;
    let discount = [];

    items.map((i, j) => {
      console.log("====================================");
      console.log(i);
      console.log("====================================");
      let element = {
        cartItemID: undefined,
        lineDiscount: 0,
        lineDiscountRate: 0,
        quotedPrice: i.totalPrice.toFixed(2),
        quotedUnitPrice: i.quotedUnitPrice,
        value: "F",
        skuNumber: i.skuNumber,
        priceLine: i.priceLine,
      };
      discount.push(element);
    });

    console.log("====================================");
    console.log(discount);
    console.log("====================================");
    this.setState({ discountObject: discount });

    // [{"cartItemID": undefined, "lineDiscount": "0", "lineDiscountRate": "0", "quotedPrice": "NaN", "quotedUnitPrice": 13.71, "value": "F"}]
  };

  deletecartItem() {
    if (this.state.deleteMode === "ALL") {
      this.setState({ discountObject: [] });
      this.props.clearCart();
      this.clearMode();
      store.dispatch({
        type: 'SET_BILLING_INFO',
        payload: {
            cartItemNotes: '',
            registerNumber: ''
          }
        });
    } else if (this.state.deleteMode === "SELECT") {
      if (this.state.selectedItems.length == this.props.cartItems.length) {
        this.props.clearCart();
        this.clearMode();
      } else {
        this.props.removeItem(this.state.selectedItems);
        const updatedDiscountObject = this.state.discountObject.filter(
          (_, index) => !this.state.selectedItems.includes(index)
        );
        this.setState({ discountObject: updatedDiscountObject });
      }
    }
    this.state.selectedItems = []; // clear after delete

    this.closeConfirmation();
  }

  confirmShowHide() {
    console.log(
      "----------------------------------------------------------------------------"
    );
    this.setState({
      showdialog: !this.state.showdialog,
      contentText: "Are you sure you want to delete this item?",
    });
  }

  closeConfirmation() {
    this.setState({
      showdialog: !this.state.showdialog,
    });
  }

  cartModeChange(flag) {
    if (flag == "") return "Cart";
    if (flag != "") return "Editing";
  }

  clearMode() {
    this.setState({ cartRef: "" });
    this.setState({ quoteLabel: "" });
    this.setState({ cartMode: "Cart" });
    this.setState({ quoteItemUi: false });
    this.setState({ cartType: '' })
    this.props.updateStoreDiscountOverride(false, "0");
  }

  onChangedDisPer(text) {
    console.log(typeof text);
    if (text[text.length - 1] == ".") {
    } else {
      text = parseFloat(text) || 0;
    }

    console.log(text);
    if (text > this.state.shoppingCartDiscount) {
      text = this.state.shoppingCartDiscount;
    }

    //     let rem = text % 1;

    // console.log(rem);

    text = text.toString();

    // if (text == 0) {
    //   text = '';
    // }
    this.setState({
      discountPer: text,
    });
  }

  checkCheckoutButton() {
    return this.state.checkoutBtn;
  }

  getSubTotal = () => {

    if (this.state.cartMode == "Editing Quote") {
      let total = 0;
      if (this.state.discountObject.length == 0) {
        this.props.cartItems.map((cartItem) => {


          total += parseFloat(cartItem.cartItemQuoteYourPrice) || 0;
        });
      } else {

        this.state.discountObject.map((ob) => {
// console.log('fdasfsds', ob.quotedPrice);

          total += parseFloat(ob.quotedPrice) || 0;
        });
      }

      console.log(total);

      return total;
    } else if (this.state.cartMode == "Order Quote") {
      let total = 0;
      if (this.state.discountObject.length == 0) {
        this.props.cartItems.map((cartItem) => {
          total += parseFloat(cartItem.cartItemQuoteYourPrice) || 0;
        });
      } else {
        this.state.discountObject.map((ob) => {
          total += parseFloat(ob.quotedPrice) || 0;
        });
      }

      return total;
    } else {
      let total = 0;
      _.map(this.props.cartItems, (i, j) => {
        total += i.totalPrice;
      });

      return total;
    }
  };

  renderCartType(){

    let state = store.getState();
    let preSeasonToggle = state.checkout.preSeasonToggle;
    if (preSeasonToggle) {
      this.setState({ cartType: 'Pre-Season' });
    }

    // if (this.state.preSeason) {
    //   if (this.state.cartType == 'NORMAL') return 'Normal';
    //   if (this.state.cartType == 'PRESEASON') return '';
    // }else{
    //   if (this.state.cartType == 'NORMAL') return '';
    //   if (this.state.cartType == 'PRESEASON') return 'Preseason';
    // }

    return preSeasonToggle;
  }

  render() {

    const { preseasonStatus } = this.props;

    let subTotal = this.getSubTotal();

    let tax = 0;
    _.map(this.props.cartItems, (i, j) => {
      tax += i.totalTax;
    });

    let state = store.getState();

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <Header /> */}
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


          <ConfirmDialog
            title="Enter Discount"
            titleStyle={{
              color: "black",
              textAlign: "left",
              fontSize: hp("2"),
              // marginTop:hp('1')
            }}
            animationType="fade"
            dialogStyle={styles.dialogbox}
            buttonsStyle={{
              // backgroundColor:'red',
              color: "red",
            }}
            buttons={{
              title: "YES",
            }}
            visible={this.state.discountVisible}
            onTouchOutside={() => this.setState({ discountVisible: false })}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.disTextinput}>
                <TextInput
                  style={styles.discountInput}
                  onChangeText={(txt) => this.onChangedDisPer(txt)}
                  value={this.state.discountPer}
                  placeholder=""
                  keyboardType="numeric"
                  maxLength={4}
                  max
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.disPerSymbol}>%</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: hp("1"), zIndex: 1000 }}
            >
              <TouchableOpacity
                style={{
                  height: hp("4.5"),
                  width: "49%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  marginRight: "1%",
                  borderRadius: 5,
                }}
                onPress={() => {
                  this.setState({ discountPer: "" });
                  this.setState({ discountVisible: false });
                }}
              >
                <Text style={{ fontSize: hp("1.5"), color: "black" }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: hp("4.5"),
                  width: "49%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#DEF9F6",
                  marginLeft: "1%",
                  borderRadius: 5,
                }}
                onPress={() => {
                  let discountPerNum = this.state.discountPer;

                  this.setState({ discountPer: "" });
                  this.setState({ discountVisible: false });

                  this.props.updateStoreDiscountOverride(
                    this.props.discountSW,
                    discountPerNum
                  );

                  // can use 'await this.props.recalculateCart' if we want to wait till recalculateCart is completed
                  this.props.recalculateCart(
                    this.props.discountSW,
                    discountPerNum,
                    this.state.discountObject
                  );
                }}
              >
                <Text
                  style={{ fontSize: hp("1.5"), color: colors.primaryColor }}
                >
                  APPLY
                </Text>
              </TouchableOpacity>
            </View>
          </ConfirmDialog>

          {this.state.btnName == "delete" ? (
            <ConfirmationBox
              showHide={this.state.showdialog}
              yes={() => this.deletecartItem()}
              no={() => this.closeConfirmation()}
              contentText={this.state.contentText}
            />
          ) : this.state.btnName == "updateCart" ? (
            <ConfirmationBox
              showHide={this.state.showdialog}
              yes={() => this.saveCartOperation("04")}
              no={() => {
                this.closeConfirmation();
                this.setState({ cartMode: "Cart" });
              }}
              contentText={this.state.contentText}
            />
          ) : this.state.btnName == "updateQuote" ? (
            <ConfirmationBox
              showHide={this.state.showdialog}
              yes={() => {
                this.ammendQuoteItemsDiscount();
                setTimeout(() => {
                  this.saveQuoteOperation("04");
                }, 100);
              }}
              no={() => {
                this.closeConfirmation();
                this.setState({ cartMode: "Cart" });
              }}
              contentText={this.state.contentText}
            />
          ) : null}

          <KeyboardAwareScrollView
            style={{ width: "100%" }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.keyboardView}>

              <View style={styles.topArea}>
              <View style={styles.titleView}>
                  <Text style={styles.titleTxt} allowFontScaling={false}>
                    {this.state.cartMode} {envMode.APIMode == "dev" ? this.props.cartItems.length : ''}
                  </Text>
                </View>

                <View style={styles.discountViewArea}>
                  <Text style={styles.discountTxtline}>
                    Override Store Discount
                  </Text>
                  <Switch
                    disabled={false}
                    style={[styles.discountSwitch, Platform.OS === 'ios' && styles.iosDiscountSwitch]}

                    trackColor={{ false: "#767577", true: "#B2F1A7" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      this.discountSwitch(this.props.discountSW)
                    }
                    value={this.props.discountSW}
                  />
                  <Animated.View
                    style={[
                      styles.fadingContainer,
                      {
                        // Bind opacity to animated value
                        opacity: this.state.fadeAnim,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.oDiscountArea,
                        this.props.discountSW && {
                          backgroundColor: "#B2F1A7",
                        },
                      ]}
                      activeOpacity={0.9}
                      onPress={() => {
                        if (this.props.discountSW) {
                          this.setState({ discountVisible: true });
                        }
                      }}
                    >
                      <Text style={styles.oDiscountTxt}>
                        {this.props.discountPerNum == ""
                          ? "0"
                          : this.props.discountPerNum}{" "}
                        %
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>

                  {/* {
                this.state.discountSW ? (

                ) : null
              } */}
                  {/* <Text >Discount Applied</Text> */}
                </View>
              </View>

              <View
                style={[
                  styles.cartItemList,
                  this.state.showMinNote == true && wp("100") < 450
                    ? { height: hp("29.5") }
                    : null,
                ]}
              >
                <View
                  style={[
                    styles.cartItmsHeader,
                    this.props.cartItems.length == 0
                      ? { display: "none" }
                      : null,
                  ]}
                >
                  <View style={[styles.cartItmsDlt]} activeOpacity={1}>
                    {/* <Image source={deleteIcon} style={styles.cardImgIcn} /> */}
                    <Text
                      style={{
                        fontSize: hp("1.4"),
                        color: "#E61538",
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                  <View style={styles.cartHTxtView}>
                    <Text
                      style={{
                        fontSize: hp("1.4"),
                        color: colors.primaryColor,
                      }}
                    >
                      Pack size
                    </Text>
                  </View>
                  <View style={[styles.cartHTxtView, { marginLeft: wp("1") }]}>
                    <Text
                      style={{
                        fontSize: hp("1.4"),
                        color: colors.primaryColor,
                      }}
                    >
                      Qty
                    </Text>
                  </View>
                </View>

                {this.props.cartItems.length == 0 && this.props.isFocused ? (
                  <View
                    style={{
                      backgroundColor: "#fff3cd",
                      height: hp("4.5"),
                      width: wp("94"),
                      marginTop: hp("2"),
                      alignSelf: "center",
                      borderRadius: wp("1"),
                      borderColor: "#ffecb5",
                      borderWidth: wp("0.2"),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp("1.5"),
                        color: "#664d03",
                      }}
                    >
                      Your cart is empty
                    </Text>
                  </View>
                ) : null}


<FlatList
  data={this.props.cartItems}
  keyExtractor={(item) => `${item.productNumber}-${item.priceOption}`}
  renderItem={({ item, index }) => (
    <CartItem
      index={index}
      item={item}
      cartMode={this.state.cartMode}
      readDiscount={this.readDiscount}
      addDiscount={this.addDiscount}
      changeNote={this.changeNote}
      discount={this.state.discountObject}
      getTotalTaxes={this.getTotalTaxes}
      removeItem={() => this.confirmShowHide()}
      updateItem={this.props.updateQty}
      discountSwitchFlag={this.props.discountSW}
      discountPerNumText={this.props.discountPerNum}
      updateTax={this.props.updateTax}
      updateBackingCard={this.props.updateBackingCard}
      updateMode={() => this.clearMode()}
      quoteItemUi={this.state.quoteItemUi}
      onPressCheckbox={(check, index) => {
        if (check) {
          if (this.state.selectedItems.indexOf(index) === -1)
            this.setState((prevState) => ({
              selectedItems: [...prevState.selectedItems, index],
            }));
        } else {
          this.setState((prevState) => ({
            selectedItems: prevState.selectedItems.filter((i) => i !== index),
          }));
        }
      }}
    />
  )}
  nestedScrollEnabled={true}
  style={{ width: "100%" }}
/>

              </View>
              <View style={styles.updateFieldsView}>
                <View style={styles.updateFields}>
                  <TouchableOpacity
                    disabled={this.state.cartMode == "Order Quote"}
                    style={styles.updateBtn}
                    onPress={() => {
//                       let total = 0;
//                       this.props.cartItems.map((item) => {


//                         total = total + item.totalPrice;
//                       })
// console.log(total);


                      if (this.state.selectedItems.length == 0) {
                        showMessage({
                          message: "KINGS SEEDS",
                          description: `Select a product to be deleted`,
                          type: "warning",
                          autoHide: true,
                        });
                      } else {
                        this.setState({
                          btnName: "delete",
                          showdialog: true,
                          contentText:
                            "Do you want to delete selected cart items?",
                          deleteMode: "SELECT",
                        });
                      }
                    }}
                  >
                    <Text style={styles.emptyTxt}>DELETE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.emptyCartBtn}
                    onPress={() => {
                      this.setState({
                        btnName: "delete",
                        showdialog: true,
                        contentText: "Do you want to delete all cart items?",
                        deleteMode: "ALL",
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.emptyTxt,
                        this.state.cartMode == "Order Quote"
                          ? { fontSize: 14 }
                          : null,
                      ]}
                    >
                      {this.state.cartMode == "Order Quote"
                        ? "EXIT FROM QUOTE"
                        : "EMPTY BASKET"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.updateNote,
                    this.state.showMinNote == false
                      ? { display: "none" }
                      : null,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: hp("1.4"),
                      color: "#664D03",
                    }}
                  >
                    Minimum order value (ex. Vat) is £
                    {this.state.minimumOrderValue}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ showMinNote: !this.state.showMinNote })
                    }
                    style={{
                      position: "absolute",
                      right: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp("1.5"),
                        color: "#664D03",
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "100%" }}>
                <View style={styles.mainBox}>
                  <View style={styles.leftBox}>
                    <View style={styles.discountCode}>
                      <View style={{ marginTop: hp("1"), width: "96%" }}>
                        <View style={styles.savingsTextView}>
                          <Text
                            style={styles.cardTxt2}
                            allowFontScaling={false}
                          >
                            Save Quote
                          </Text>
                        </View>

                        <View style={styles.applyView}>
                          <View style={styles.applyInput}>
                            <TextInput
                              editable={this.state.cartMode != "Order Quote"}
                              allowFontScaling={false}
                              // style={styles.TxtInputq}
                              style={{ color: "#000", padding: 0, width: "100%", paddingLeft: 10 }}
                              maxLength={50}
                              placeholder={
                                wp("100") > 500
                                  ? "Quote Label"
                                  : "Enter Quote Label to Save"
                              }
                              placeholderTextColor={colors.fourthiaryColor}
                              value={this.state.quoteLabel}
                              onChangeText={(text) =>
                                this.setState({ quoteLabel: text })
                              }
                            />
                          </View>
                          <TouchableOpacity
                            disabled={
                              this.state.cartMode == "Order Quote" ||
                              this.state.saveQuoteDisable == true
                            }
                            activeOpacity={0.9}
                            style={styles.applyBtn}
                            onPress={() => {
                              this.setState({ saveQuoteDisable: true });
                              Keyboard.dismiss();
                              setTimeout(() => this.saveQuoteOperation(), 1000);
                            }}
                          >
                            <Text
                              style={styles.applyTxt}
                              allowFontScaling={false}
                            >
                              SAVE
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={styles.basketRef}>
                      <View style={styles.cartIns}>
                        <View style={styles.savingsTextView}>
                          <Text
                            style={styles.cardTxt2}
                            allowFontScaling={false}
                          >
                            Save Cart
                          </Text>
                        </View>

                        <View style={styles.applyViewCart}>
                          <View style={styles.applyInput2}>
                            <TextInput
                              editable={this.state.cartMode != "Order Quote"}
                              value={this.state.cartRef}
                              onChangeText={(text) => {
                                this.setState({ cartRef: text });
                              }}
                              allowFontScaling={false}
                              // style={styles.TxtInputq}
                              style={{ color: "#000", padding: 0, width: "100%", paddingLeft: 10 }}
                              maxLength={50}
                              placeholder={
                                wp("100") > 500
                                  ? "Cart Ref"
                                  : "Enter Save Cart Ref"
                              }
                              placeholderTextColor={colors.fourthiaryColor}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.savingsbtnView}>
                        <View style={styles.toggleView}>
                          {/* <Text style={styles.preTxt}>Pre-Season</Text>
                          <Switch
                            disabled={this.state.cartMode == "Order Quote"}
                            style={[
                              styles.discountSwitch,
                              Platform.OS === 'ios' ? styles.iosDiscountSwitch : null,
                              { marginLeft: '5%' }
                            ]}
                            trackColor={{ false: "#767577", true: "#B2F1A7" }}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() =>
                              this.preSeasonSwitch(this.state.preSeason)
                            }
                            value={this.state.preSeason}
                          /> */}
                        </View>
                        <TouchableOpacity
                          disabled={
                            this.state.cartMode == "Order Quote" ||
                            this.state.saveCartDisable == true
                          }
                          activeOpacity={0.9}
                          style={styles.applyBtn}
                          onPress={() => {
                            this.setState({ saveCartDisable: true });
                            Keyboard.dismiss();
                            setTimeout(() => {
                              this.saveCartOperation();
                            }, 1000);
                          }}
                        >
                          <Text
                            style={styles.applyTxt}
                            allowFontScaling={false}
                          >
                            SAVE
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rightBox}>
                    <View style={styles.basketTotal}>
                      <View style={{ marginTop: hp("1") }}>
                        <View style={styles.savingsTextView3}>
                          <Text
                            style={styles.savingsText}
                            allowFontScaling={false}
                          >
                            Sub Total(Ex. VAT)
                          </Text>
                          <View style={{ position: "absolute", right: 1 }}>
                            <Text
                              style={styles.savingssubText}
                              allowFontScaling={false}
                            >
                              £{this.state.subTotal.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.savingsTextView3}>
                          <Text
                            style={styles.savingsText}
                            allowFontScaling={false}
                          >
                            VAT
                          </Text>
                          <View style={{ position: "absolute", right: 1 }}>
                            <Text
                              style={styles.savingssubText}
                              allowFontScaling={false}
                            >
                              {this.state.cartMode == "Order Quote" ||
                              this.state.cartMode == "Editing Quote"
                                ? `£${this.state.totalTax.toFixed(2)}`
                                : `£${tax.toFixed(2)}`}
                            </Text>
                          </View>
                        </View>
                        {/*<View style={styles.savingsTextView3}>
                      <Text style={styles.savingsText} allowFontScaling={false}>
                        Estimate Delivery(Inc. VAT)
                      </Text>
                      <View style={{ position: "absolute", right: 1 }}>
                        <Text
                          style={styles.savingssubText}
                          allowFontScaling={false}
                        >
                          £0
                        </Text>
                      </View>
                    </View>*/}
                      </View>
                      <View style={styles.carriageTxtView}>
                        <Text
                          style={styles.carriageTxt}
                          allowFontScaling={false}
                        >
                          Carriage paid on all orders over £
                          {this.state.carriagePaidValue} at invoice value
                        </Text>
                      </View>

                      <View style={styles.totalTextView}>
                        <Text style={styles.totalTxt} allowFontScaling={false}>
                          Basket Total (Inc. VAT)
                        </Text>
                        <View style={{ position: "absolute", right: 1 }}>
                          <Text
                            style={styles.totalTxt}
                            allowFontScaling={false}
                          >
                            £{(this.state.subTotal + tax).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {this.state.checkoutBtn ? (
                      <TouchableOpacity
                        style={styles.checkout}
                        onPress={() => {

                          if (!checkDiscounts()) {
                            return;
                          }


                          if (this.props.cartItems.length <= 0) {
                            showMessage({
                              message: "KINGS SEEDS",
                              description: `Cart is empty`,
                              type: "warning",
                              autoHide: true,
                            });
                          } else if (this.state.cartMode == "Editing Quote") {
                            showMessage({
                              message: "KINGS SEEDS",
                              description: `Checkout is not allowed while editing a quote`,
                              type: "warning",
                              autoHide: true,
                            });
                          } else {
                            this.proceedToCheckout();
                          }
                        }}
                      >
                        <Text
                          style={styles.checkoutTxt}
                          allowFontScaling={false}
                        >
                          CHECKOUT
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* <Footer /> */}
        </View>
      </SafeAreaView>
    );
  }
}

function getCartIdById(note, ids) {
  const element = ids.filter((element) => element.ref == note);
  return element[0].id;
}

function getQuoteIdById(note, ids) {
  const element = ids.filter((element) => element.label == note);
  return element[0].id;
}

function CartWrapper(props) {
  const isFocused = useIsFocused();
  return <Cart {...props} isFocused={isFocused} />;
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartItems: state.cart.items,
    adminCustomerID: state.findStore.adminCustomerID,
    discountSW: state.cart.discountSW,
    discountPerNum: state.cart.discountPerNum,
    preseasonStatus: state.checkout,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearCart,
      getCategories,
      addToCart,
      removeItem,
      updateQty,
      updateTax,
      recalculateCart,
      updateBackingCard,
      updateStoreDiscountOverride,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
