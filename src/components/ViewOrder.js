import React, { Component, useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Styles from "../style/StoreCartsStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/CartActions";
import StyleSheet from "react-native-media-query";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Fonts } from "../utils/Fonts";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import {heightPercentageToDP as hp, widthPercentageToDP,} from "react-native-responsive-screen";
import * as colors from "../style/Common/ColorsStyle";
import { useIsFocused } from "@react-navigation/native";
import { RawQuery } from "../offline/Services/DataHelper";
import DataAdapter from "../offline/localData/DataAdapter";
import {GetCustomFormattedValue, GetProductLinePricing} from '../offline/Services/ProductHelper';
import {GetBoolean, GetDecimal, GetInteger} from '../utils/ValidationHelper';
import {showMessage} from "react-native-flash-message";
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../offline/Services/UserHelper";
import _ from "lodash";
import NoteToggleButton from "./helperComponents/NoteToggleButoon";
import { List } from 'react-native-paper';
import MoreView from "./MoreView";
import { getAccountCodeOrderId, getBillingAddressOrderId, getDeliveryAddress, getDeliveryOption, getPaymentOption, getUnavaiableItemsName } from "./helperComponents/OrderOperation";

const carticn = require("../assets/cartplus2xWhite.png");
const edticon = require("../assets/editline2xgreen.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");

const up_arrow = require("../assets/up_arrow.png");
const down_arrow = require("../assets/down_arrow.png");

const contactDetails_ = [
  {
    contactId: 1,
    name: "Cabbage Caraflex F1 (RHS Aws png)",
    num: "10125",
    grams: "25g",
    packs: "20 packs",
    price: 5100.65,
  },
  {
    contactId: 2,
    name: "Cabbage Caraflex F2 (RHS Aws png)",
    num: "14022",
    grams: "25g",
    packs: "20 packs",
    price: 510.65,
  }
];



const ViewOrder = (props) => {

  const { navigation } = props;
  const {  orderId, pageFlag } = props.route.params;


  const isFocused = useIsFocused();

  const [token, setToken] = useState("blank");
  const [orderNt, setOrderNt] = useState(true);

  const dispatch = useDispatch();

  // const [subCarts, setSubCarts] = useState([]);
  // const [cartId, setCartId] = useState([]);

  const [mainObject, setMainObject] = useState([]);
  const [subObject, setSubObject] = useState([]);
  const [moreDataset, setMoreDataset] = useState(null);
  const [reff, setReff] = useState('');

  const[reOrderDisabled,  setReOrderDisabled] = useState(false)
  const [expanded, setExpanded] = React.useState(false);
  const [changed, setChanged] = useState(true);

  const [storeName, setStoreName] = useState('');



  const tokn = useSelector((state) => state.login.loginToken);
  // useEffect(() => {
  //   console.log("store Contact---" + tokn);
  //   setToken(tokn);


  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {


    initial(orderId).then(res => {
      const { mainObject, subObject } = res;


      getStoreName(mainObject.OrderCustomerID).then(res => {
        setStoreName(res);
      });


      console.log('mainObject', mainObject.OrderCustomerID);

      let array= [];
      for (let index = 0; index < res.subObject.length; index++) {
        const element = subObject[index];
        let obj ={
          ...element,
          noteExpand: true
        }
        array.push(obj)
      }
      // getMoreViewData(mainObject).then((data) =>{
      //   setMoreDataset(data);
      //  })
      setMainObject(mainObject);
      setSubObject(array);


      setOrderNt(mainObject.OrderNote);

      if(mainObject.OrderQuoteID <= 0 || mainObject.OrderQuoteID ==""){

        if (pageFlag == 'ALL') {
          setReOrderDisabled(true);
        }else{
          setReOrderDisabled(false);
        }
      }else{
        setReOrderDisabled(true)
      }

      let reff_temp;
      if (mainObject.WebOrderID == null) {
        reff_temp = `TEMP-${mainObject.OrderID}`;
      }else{
        reff_temp = mainObject.WebOrderID;
        if (mainObject.OrderInvoiceNumber != null) {
          reff_temp += ` (${mainObject.OrderInvoiceNumber})`;
        }
      }

      setReff(reff_temp);

    });


  }, [isFocused]);

  // const getMoreViewData = async (data)=> {

  //   let orderId ;
  //   let accCode ;
  //   let billAddress ;
  //   let paymentOption ;
  //   let deliveryOption ;
  //   let deliveryAddress ;
  //   let isWebOrderId = false ;

  //   if (data.OrderID != null) {
  //     isWebOrderId = false ;

  //      accCode = await getAccountCodeOrderId(isWebOrderId , data.OrderID)
  //      billAddress = await getBillingAddressOrderId(isWebOrderId , data.OrderID)

  //      if (billAddress == '') {
  //      billAddress = await getBillingAddressOrderId(isWebOrderId , data.WebOrderID)
  //      }
  //      console.log();
  //      console.log('AccCode================================');



  //     paymentOption = await  getPaymentOption(isWebOrderId , data.OrderID)
  //     deliveryOption = await  getDeliveryOption(isWebOrderId , data.OrderID)
  //     deliveryAddress = await getDeliveryAddress(isWebOrderId , data.OrderID)
  //     if (deliveryAddress == '') {
  //       deliveryAddress = await getDeliveryAddress(isWebOrderId , data.WebOrderID)
  //     }
  //     orderId = data.OrderID;
  //   } else {
  //     isWebOrderId = true;
  //    accCode = await getAccountCodeOrderId(isWebOrderId , data.WebOrderID)
  //    billAddress = await getBillingAddressOrderId(isWebOrderId , data.WebOrderID)
  //    paymentOption = await  getPaymentOption(isWebOrderId , data.WebOrderID)
  //    deliveryOption = await  getDeliveryOption(isWebOrderId , data.WebOrderID)
  //    deliveryAddress = await getDeliveryAddress(isWebOrderId , data.WebOrderID)
  //     orderId = data.WebOrderID;
  //   }
  //   const array = data.UnavaiableItems.split(',').filter(item => item !== "");

  //   const skuArray = array.map(element => {
  //     return {
  //         SKU: element
  //     };
  // });
  //   const unavaiableItemsNameArray = await getUnavaiableItemsName(orderId)
  //   const mappedArray = skuArray.map((skuObj, index) => {
  //     const sku = skuObj.SKU;
  //     const skuNameObj = unavaiableItemsNameArray[index];
  //     const skuName = skuNameObj ? skuNameObj.SKUName : 'Unknown';
  //     return `${sku}-${skuName}`;
  // });

  //   const output = mappedArray.join(', ');



  //    let moreData = {
  //      orderNumber: orderId,
  //      OrderDate: data.OrderDate,
  //      OrderType: data.OrderType,
  //      UnavaiableItems: output,
  //      accountCode: accCode,
  //      billAddress: billAddress,
  //      deliveryAddress: deliveryAddress,
  //      paymentOption: paymentOption,
  //      deliveryOption: deliveryOption,
  //      OrderNote: data.OrderNote,

  //    }

  //    return moreData;
  //  }


  const noteVisibility = (visibility, id) => {
    let ei = _.findIndex(subObject, {
      OrderItemID: id,
    });

    console.log(id);

    let val = subObject[ei].noteExpand;

    subObject[ei].noteExpand = !val;
    let c_ = changed;
    setChanged(!c_);

    setSubObject(subObject);
  };


  // main operation - get data
  async function initial(orderId) {

    const payload = {
      section: 'ORDERS',
      opration: 'GET FULL ORDER',
      data: { orderId },
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }

  async function getStoreName(custID) {
    let AddressAccCode = await RawQuery(`select AddressAccCode from local_com_address where AddressCustomerID = ${custID} limit 1`);
    let ItemName = await RawQuery(`select ItemName from local_ct_tradeaccount where ItemCode = '${AddressAccCode.item(0).AddressAccCode}'`);

    return ItemName.item(0).ItemName;
  }



  function getSubTotal() {
    let tot = 0.00;
    subObject.map(object => {
      tot = tot + object.OrderItemTotalPrice;
    });

    return tot;
  }

  function getEstimateDelivery() {
    return mainObject?.OrderTotalShipping ?? 0;
  }

  function getVAT() {
    return mainObject?.OrderTotalTax ?? 0;
  }

  function getOrderTotal() {
    return mainObject?.OrderTotalPrice ?? 0;
  }

  // }, []);




  // addToEditingMode = () => {
  //   subCarts.map(subCart => {


  //     const product = {
  //       skuid: subCart.SKUID,
  //       imagesMain: [
  //         {
  //           imageID: "image",
  //           imageNumber: subCart.SKUNumber,
  //           imagePath: "https://sop.kingsseeds.com/CMS/no-image.png",
  //           skuName: subCart.SKUName,
  //         },
  //       ],
  //       skuPackSize: "",
  //       priceOptions: { 1: {"label": subCart.SKUPrice1Label, "price": subCart.CartItemUnitPrice / subCart.SKUUnits, "priceDisplay": `£${subCart.CartItemText}`} },
  //     };
  //     const qtys = { 1: subCart.SKUUnits };

  //     dispatch({ type: 'ADD_ITEM_TO_CART', payload: {
  //       ...product,
  //       quantityPerOptions: qtys,
  //     } })


  //   })


  // }



  addItemsToCart = async () => {
    let itemsToAdd = [];

    let unavailableItems = [];

    for (let i = 0; i < subObject.length; i++) {
      let subItem = subObject[i];

      if ((IsUserAnySOP() || !_.some(CategoriesNotAvailableForEndUsers(), cat => subItem.Nav_Navigation.includes(cat))) &&
      GetBoolean(subItem.SKUEnabled) && GetInteger(subItem.SKUAvailableItems) > 0) {
        let tot = GetDecimal(subItem.OrderItemUnitPrice) * GetInteger(subItem.OrderItemUnitCount); // fallback
        let tax = 0; // fallback
        let uPrice = GetDecimal(subItem.OrderItemUnitPrice); // fallback
        try {
          let linePricing = await GetProductLinePricing(subItem.SKUNumber, subItem.OrderItemPriceLine, subItem.OrderItemUnitCount);
          tot = linePricing.LinePrice;
          tax = linePricing.LineTax;
          uPrice = linePricing.UnitPrice;
        } catch (e) {
          console.log("GetProductLinePricing Error... ", e);
        }

        let bc = false;
        if(parseInt(subItem.OrderItemBackCard) == '1'){
          bc= true
        }

        const product = {
          skuid: subItem.OrderItemSKUID,
          skuName: subItem.OrderItemSKUName,
          skuNumber: subItem.SKUNumber,
          skuPackSize: subItem.SKUPackSize,
          priceOptions: {},
          priceLine: subItem.OrderItemPriceLine,
          quantity: subItem.OrderItemUnitCount,
          totalPrice: tot,
          totalTax: tax,
          skuDiscountCat: subItem.SkuDiscountCat,
          cartItemNote: subItem.OrderItemNote,
          backCard:bc
        };
        product.priceOptions[subItem.OrderItemPriceLine] = {
          label: subItem.OrderItemText,
          price: uPrice,
          priceDisplay: await GetCustomFormattedValue(uPrice)
        }

        console.log("product... ", product);
        itemsToAdd.push(product);
      } else {
        unavailableItems.push(subItem.OrderItemSKUID);
      }
    }

    if (unavailableItems.length === subObject.length) {
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



    // subObject.map(subItem => {
    //
    //
    //   const product = {
    //     skuid: subItem.OrderItemSKUID,
    //     imagesMain: [
    //       {
    //         imageID: "image",
    //         // imageNumber: subItem.SKUNumber
    //         imageNumber: '',
    //         imagePath: "https://sop.kingsseeds.com/CMS/no-image.png",
    //         skuName: subItem.OrderItemSKUName,
    //       },
    //     ],
    //     skuPackSize: "",
    //     priceOptions: { 1: {"label": subItem.OrderItemText, "price": subItem.OrderItemUnitPrice, "priceDisplay": `£${subItem.OrderItemTotalPrice}`} },
    //   };
    //   const qtys = { 1: subItem.OrderItemUnitCount };
    //
    //   dispatch({ type: 'ADD_ITEM_TO_CART', payload: {
    //     ...product,
    //     quantityPerOptions: qtys,
    //   } })
    //
    //
    // })

    if (itemsToAdd.length > 0) {
      props.addToCart({
        cartItems: itemsToAdd,
        orderNotes: orderNt
      });

      navigation.navigate("carts");
    }

  }







  return (

    <View style={Styles.container}>
      <Back />
      <View style={Styles.titleView}>
        <Text style={Styles.titleTxt} allowFontScaling={false}>
          {reff} { pageFlag == 'ALL' ? `| ${storeName}` : '' }
        </Text>
      </View>
      <View style={styles.scrlView}>
        <ScrollView style={{ width: "100%", marginBottom: hp('3') }}>
       
            <MoreView details={mainObject}/>
       
          {subObject.map((e) => (
            <View
            style={[
              styles.footerCardView,
              e.noteExpand == true ? styles.footerCardViewExpanded : null,
            ]}
             key={e.OrderItemSKUID+"_"+e.OrderItemPriceLine}>
              <View style={[styles.cartItemTextView, e.noteExpand == true ? styles.noteexpandedView : null,]}>
                <View style={styles.cardTxtView1}>
                  <Text style={styles.cardTxt} allowFontScaling={false} numberOfLines={1}>

                    {e.OrderItemSKUName}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={Styles.cardSubMainTxt}
                      allowFontScaling={false}
                    >
                      Code: {e.SKUNumber}
                    </Text>
                    {
                      parseInt(e.OrderItemBackCard) == '1' ? (<Text style={styles.seedsTxt}>Backing Card</Text> ) : null
                    }
                  </View>
                </View>
                <View style={styles.itemSecView}>
                  <View style={styles.subView1}>
                    <Text style={styles.subcardTxt} allowFontScaling={false}>
                      {e.OrderItemText}
                    </Text>
                  </View>
                  <View style={styles.noteBtnView}>
                  <NoteToggleButton noteVisibility={noteVisibility} itemId={e.OrderItemID} />
                  </View>
                  <View style={styles.subView}>
                    <Text
                      style={styles.subcardTxtPacks}
                      allowFontScaling={false}
                    >
                      {e.OrderItemUnitCount}
                    </Text>
                  </View>
                  <View style={Styles.priceView1}>

                    {/* unit price */}
                    <Text
                      style={styles.subcardTxtUnitPrice}
                      allowFontScaling={false}
                    >
                      Unit: £{(e.OrderItemUnitPrice).toFixed(2)}
                    </Text>

                    {/* sub total */}
                    <Text
                      style={styles.subcardTxtPrice}
                      allowFontScaling={false}
                    >
                      £{(e.OrderItemTotalPrice).toFixed(2)}
                    </Text>


                  </View>
                </View>


              </View>
              {e.noteExpand == true ? (
                <View style={styles.noteView}>
                  <TextInput
                    style={styles.noteText}
                    multiline
                    numberOfLines={3}
                    editable={false}
                    value={e.OrderItemNote}
                    // style={styles.input}
                    placeholder="Note..."
                  />
                </View>
              ) : null}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.allDetailsView}>



        <View style={styles.priceDetailsView}>
          <View style={styles.priceDetailsView1}>
            <View
              style={{
                height: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.quoteTxt}>Sub Total(Ex. VAT)</Text>
              <View style={styles.quoteTxt2View}>
                <Text style={styles.quoteTxt2}>£ {getSubTotal().toFixed(2)}</Text>
              </View>
            </View>
            <View
              style={{
                height: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.quoteTxt}>Estimated Delivery(Ex. VAT)</Text>
              <View style={styles.quoteTxt2View}>
                <Text style={styles.quoteTxt2}>£ {getEstimateDelivery().toFixed(2)}</Text>
              </View>
            </View>
            <View
              style={{
                height: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.quoteTxt}>VAT</Text>
              <View style={styles.quoteTxt2View}>
                <Text style={styles.quoteTxt2}>£ {getVAT().toFixed(2)}</Text>
              </View>
            </View>
            <View
              style={{
                height: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.quoteTxt}>Order Total (Inc. VAT)</Text>
              <View style={styles.quoteTxt2View}>
                <Text style={styles.quoteTxt2}>£ {getOrderTotal().toFixed(2)}</Text>
              </View>
            </View>
            {/* <View
                  style={{
                    height: "40%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.quoteTxt}>
                    Estimate Delivery (Inc. VAT)
                  </Text>
                  <View style={styles.quoteTxt2View}>
                    <Text style={styles.quoteTxt2}>£1.15</Text>
                  </View>
                </View> */}
          </View>
          <View style={styles.priceDetailsView2}>

            {/* <View style={styles.priceBtnView}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.edtCartbtn}
                    onPress={() => alert('12')}
                  >
                    <Image source={edticon} style={Styles.cardImg} />
                  </TouchableOpacity>
                </View> */}

                <View style={styles.priceBtnView}>
                  <TouchableOpacity activeOpacity={0.9} style={[styles.cartbtn, reOrderDisabled == true ? {backgroundColor: colors.color_gray} : null]}
                  disabled={reOrderDisabled}
                   onPress={() => this.addItemsToCart()}
                  >
                    {/* <Image source={carticn} style={Styles.cardImg} /> */}
                    <Text
                    style={styles.reoderTxt}
                    >REORDER</Text>
                  </TouchableOpacity>

                </View>
                {/* <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.dltCartbtn}
                   // onPress={() => this.deleteCart()}
                  >
                    <Image source={del} style={styles.cardImg} />
                  </TouchableOpacity> */}

                {/* </View> */}
          </View>
        </View>

      </View>
    </View>

  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {
  addToCart
})(ViewOrder);

let widthper = wp("100%");
let crd_wdth = 0;
let txt_size = 0;
if (widthper <= 500.0) {
  txt_size = hp("1.6");
} else {
  txt_size = hp("1.4");
}

const { ids, styles } = StyleSheet.create({
  scrlView:{
  width: "100%",
   flex:1,
   marginTop: hp("1"),
   "@media (max-width: 450px)": {
    height: '47%',
  },
 },

  itemSecView: {
    width: wp('50'),
    flexDirection: 'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: wp('50'),
    },
    "@media (max-width: 500px)": {
      width: wp('90'),
    },
  },
  footerCardView: {
    width: '92%',
    height: hp('7'),
    backgroundColor: 'white',
    borderRadius: wp('2'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: hp('1'),
    alignSelf: 'center',
    alignItems:'center',
    // borderColor: 'rgba(44, 130, 201, 1)',
    // borderWidth: 0.5,
   // flexDirection: 'row',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp('7'),
    },
    "@media (max-width: 500px)": {
      height: hp('11'),
    },
  },

  footerCardViewExpanded: {
    backgroundColor:colors.color_light_green,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height: hp('13'),
    },
    "@media (max-width: 450px)": {
      height: hp('20'),
    },
  },

  noteexpandedView: {
   // width: '100%',
    backgroundColor: 'white',
    borderRadius: wp('2'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
  },
  cartItemTextView: {
    width: '100%',
    height: hp('7'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:wp('2'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp('7'),
      flexDirection: 'row',
     // marginRight:wp('1')
    },
    "@media (max-width: 500px)": {
    //  marginTop:hp("1"),
      height: hp('11'),
      flexDirection: 'column',
    },
  },
  allDetailsView: {
    width: "100%",
    height: hp('17'),
    flexDirection: 'row',
    marginBottom:10,

    // backgroundColor: 'red',
    alignItems: "flex-end",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      paddingBottom:30,
    },
    "@media (max-width: 500px)": {
      flexDirection: 'column',
    },
  },

  priceDetailsView: {
    width: "60%",
    height: hp('12'),
    // flexDirection: "row",

    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "50%",
      marginLeft: "48%",
      justifyContent: "center",

    },
    "@media (max-width: 500px)": {
      width: "94%",
      height: hp('12'),
      alignSelf:"center"
    },
  },

  bottumNoteView: {
    width: "60%",
    height: hp('12'),
    // flexDirection: "row",
    // alignSelf: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "49%",
    },
    "@media (max-width: 500px)": {
      width: "94%",
      height: hp('12'),
      alignSelf:"center"
    },
  },
  priceBtnView: {
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    position:'absolute',
    right:0,
    height:hp('4.5'),
  },
  priceDetailsView2: {
    width: "20%",
    height: hp('4.5'),
    alignSelf: "flex-end",
    marginTop: hp("1"),
    flexDirection: "row",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      width: "100%",
      height: hp('4.5'),
    },
    "@media (max-width: 500px)": {
      width: "100%",
      height: hp('5'),
    },
  },
  priceDetailsView1: {
    backgroundColor: "white",
    borderRadius: wp("1"),
    width: "100%",
    height: "95%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
  },

  orderNotePallet: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: wp("1"),
    width: "100%",
    height: "95%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
  },

  dltCartbtn: {
    alignItems: "center",
    height: "88%",
    width:'49%',
    backgroundColor: "#FFD8D8",
    justifyContent:"center",
    alignSelf:'center',
    borderRadius: wp("1"),
  },
  cardTxt: {
    fontSize: hp('1.5'),
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('1'),
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginLeft: wp('1'),
    },
    "@media (max-width: 500px)": {
      marginLeft: wp('2.5'),
    },
  },
  backTmpbtn: {
    alignItems: "center",
    height: "88%",
    width: wp("60"),
    backgroundColor: "#1ED18C",
    borderRadius: wp("1"),
    marginRight: wp("65"),
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      marginRight: wp("65"),
      width: wp("58"),
    },
    "@media (max-width: 500px)": {
      marginRight: wp("50"),
      width: wp("53"),
    },
  },
  backTmpbtntxt: {
    fontSize: hp("1.5"),
    color: "white",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: hp("1.7"),
    },
    "@media (max-width: 500px)": {
      fontSize: hp("1.9"),
    },
  },
  cartbtn: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#1ED18C",
    borderRadius: wp("1"),
    justifyContent:'center'
  },
  edtCartbtn: {
    alignItems: "center",
    height: "88%",
    width: "88%",
    backgroundColor: "white",
    borderWidth: wp("0.2"),
    borderColor: "#1ED18C",
    borderRadius: wp("1"),
  },
  cardTxtView1: {
    flex: 1.8,
    height: hp("6"),
    marginLeft: wp("0"),
    marginRight: wp("1"),
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      width: wp('90')
    },
  },
  subcardTxtUnitPrice: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: "#BCBFBF",
    textAlign: 'right'
  },
  subcardTxt: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: txt_size,
    },
    "@media (max-width: 500px)": {
      fontSize: txt_size + 1,
    },
  },
  subcardTxtPacks: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: txt_size,
    },
    "@media (max-width: 500px)": {
      fontSize: txt_size + 1,
    },
  },
  seedsTxt: {
    fontSize: txt_size,
    fontFamily: Fonts.PoppinsBold,
    color: "#1ED18C",
    marginLeft: wp("1"),
  },
  priceView1: {
    flex: 0.9,
    height: hp('6'),
    alignItems: 'flex-end',
    //  flexDirection:'row',
    justifyContent: 'center',
    marginLeft: wp('1.5'),

  },
  subcardTxtPrice: {
    fontSize: txt_size + 2,
    fontFamily: Fonts.PoppinsBold,
    color: "#1ED18C",
  },
  subView1: {
    flex: 0.5,
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
  },
  subView: {
    flex: 0.8,
    height: hp("6"),
    alignItems: "center",
    justifyContent: "center",
  },

  reoderTxt:{
    fontSize: txt_size + 2,
    color:'white',
  },
  quoteTxt: {
    marginLeft: wp("2"),
    flex: 1,
    fontSize: txt_size + 2,
    fontFamily: Fonts.PoppinsBold,
    color: '#cacccc',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: txt_size,
    },
    "@media (max-width: 500px)": {
      fontSize: txt_size + 1,
    },
  },
  quoteTxt2: {
    fontSize: txt_size + 1,
    fontFamily: Fonts.PoppinsBold,
    color: "#1ED18C",
    marginRight: wp("1.5"),
    fontWeight: "bold",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: txt_size,
    },
    "@media (max-width: 500px)": {
      fontSize: txt_size + 1,
    },
  },
  quoteTxt2View: {
    flex: 0.4,
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: "contain",
    //resizeMethod: 'cover',
  },
  noteText:{
    color:'black'
  },
  noteBtnView:{
    width: wp('6'),
    paddingLeft: wp('1'),
    alignSelf: "center",
    "@media (max-width: 450px)": {
      // backgroundColor: "red",
      width: wp('17'),
    //  marginTop:wp('-3'),
    },

  },
  noteView:{
    width: "100%",
    height: hp("6"),
    padding: 10,
    // backgroundColor: "#EBFFE8",
    // backgroundColor: "green",

    // marginBottom: hp("1"),
    borderTopRightRadius: wp("0"),
    borderTopLeftRadius: wp("0"),
    alignSelf:'center',
    flexDirection: "row",
    "@media (max-width: 450px)": {
      padding: 5,
      height: hp("10"),
    },
  },
  orderNotesView: {
    width: "49.5%",
    height: hp("13"),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor:'white',
    marginTop:hp('0.1'),
    // justifyContent: 'space-around',
    alignItems: "flex-start",
    alignSelf:'flex-end',
    padding:hp('1'),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginRight:'1%',
    },
    "@media (max-width: 450px)": {
      //borderColor:colors.color_light_gray_border,
      backgroundColor:'#F6FFFE',
      borderColor:'#DEF9F6',
      borderWidth:hp('0.1'),
      width: "100%",
      height: 'auto',
      marginBottom:hp('0.5'),
      borderRadius: 4,
    },
  },
  orderNotesViewDisplay: {
    // display: 'none',
    width: "49.5%",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      marginRight:'1%',
    },
    "@media (max-width: 450px)": {
      //borderColor:colors.color_light_gray_border,

    },
  },
  noteTitle:{
    color:'black',
    fontWeight:'bold',
    fontSize:hp('1.5')
  },
  noteContent:{
    color:colors.color_gray,
    fontSize:hp('1.3')
  },
  accordianView:{
    width:wp('40'),
    // backgroundColor:'#F6FFFE',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width:wp('43'),
    },
    "@media (max-width: 450px)": {
      width:wp('85'),
      marginLeft:wp('-2'),
      height:hp('4'),
      alignItems:'center'
    },
  },
  imageNotesView:{
    width:wp('8'),
    height:hp('3'),
    alignSelf:'center',
    marginTop:hp('-1'),
    justifyContent:'center',
    alignItems:'center'
  },
  cardImg:{
    resizeMode:'contain',
    aspectRatio:0.7,
    height:hp('3')
  },
});
