import React, { useState, useEffect } from "react";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, FlatList} from "react-native";

import Back from "../components/common/Back";
import Styles from "../style/OrderSummaryStyle.js";
import {heightPercentageToDP as hp, widthPercentageToDP,} from "react-native-responsive-screen";
import {CommonActions, useFocusEffect, useNavigation} from "@react-navigation/native";
import OrderItem from "../components/orderSummary/OrderItem";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {updateOrderStatuses} from "../offline/Services/OrderHelper";
import {sendOrderEmail} from "../actions/SendOrderEmails";
import {showMessage} from "react-native-flash-message";
import {GetCustomFormattedValue} from "../offline/Services/ProductHelper";
import {clearCart} from "../actions/CartActions";
import {store} from "../../configureStore";
import {callCreateOrder} from "../utils/createOrder";
import { List } from 'react-native-paper';
import { color_gray } from "../style/Common/ColorsStyle";


import {RawQuery} from "../offline/Services/DataHelper";
import deleteAbondandOrders from "../components/CartOperation/deleteAbondandOrders";

const up_arrow = require("../assets/up_arrow.png");
const down_arrow = require("../assets/down_arrow.png");
const { ids, styles } = Styles;

const orderItems_ = [
  {
    name: "Cabbage Caraflex F1 (RHS Award of Garden)",
    productNumber: "1241",
    category: "ASD",
    skuPackSize: "12",
    priceOption: "25g",
    unitPrice: "24.5",
    quantity: "2",
  },
];

export default function OrderSummary() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [subTotalDisplay, setSubTotalDisplay] = React.useState(null);
  const [taxDisplay, setTaxDisplay] = React.useState(null);
  const [deliveryDisplay, setDeliveryDisplay] = React.useState(null);
  const [savingsDisplay, setSavingsDisplay] = React.useState(null);
  const [totalDisplay, setTotalDisplay] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const [isQuote, setIsQuote] = React.useState(null);

  const [quoteId, setQuoteId] = React.useState('');
  const [payable, setPayable] = React.useState(true);

  const shippingAddress = useSelector(s => s.checkout.shippingAddress)
  const billingAddress = useSelector(s => s.checkout.billingAddress)
  const deliveryPrice = useSelector(s => s.checkout.deliveryPrice)
  const deliveryTax = useSelector(s => s.checkout.deliveryTax)
  const deliveryOption = useSelector(s => s.checkout.deliveryOption)

  const paymentType = useSelector(s => s.checkout.paymentType)
  const offlineOrder = useSelector(s => s.checkout.offlineOrder)
  const orderNote = useSelector(s => s.checkout.orderNotes)
  const cartItemNotes =  useSelector(s => s.checkout.cartItemNotes)
  const orderAPayment = useSelector(s => s.checkout.orderAPayment)
  const customerEmail = useSelector(s => s.checkout.customerEmail)
  const registerNumber = useSelector(s => s.checkout.registerNumber)


  const workingOrderID = useSelector(s => s.checkout.workingOrderID)


  let items = useSelector(s => s.cart.items)


  items.map((item) => {

    let itemIdentifier = item.skuNumber + '-' + item.priceOption;

    if (cartItemNotes != undefined) {
      if (cartItemNotes.length > 0) {
        const filteredNote = cartItemNotes.filter((note) => {
          itemIdentifier == note.cartItemID

        })


        item.itemNote = filteredNote[0]?.value;

      }
    }


    return item;

  })


  let total = 0;
  let tax = deliveryTax;
  _.map(items, (i, j) => {
    total += i.totalPrice;
    tax += i.totalTax;
  })
  let savings = 0;

  const handlePress = () => setExpanded(!expanded);


  useFocusEffect(
      React.useCallback(() => {
        GetCustomFormattedValue(deliveryPrice)
            .then(pd => {
              setDeliveryDisplay(pd);
            });
      }, [deliveryPrice])
  )
  useFocusEffect(
      React.useCallback(() => {
        GetCustomFormattedValue(total)
            .then(pd => {
              let isQuoteIdExsist = false;
              items.map((item) => { // TODO

                if (item?.quoteId) {
                  if (item.quoteId != '') {
                    setQuoteId(item.quoteId);
                  }
                }

                if (item.actionMode == 'ORDER QUOTE') {
                  isQuoteIdExsist = true;
                }
              });


              if (isQuoteIdExsist) {

                let quotedPrice = 0.00;

                items.map((item) => {
                  quotedPrice += parseFloat(item.cartItemQuoteYourPrice) || 0;

                });


                console.log(quotedPrice);
                setSubTotalDisplay(quotedPrice.toFixed(2));
              }else{
                setSubTotalDisplay(pd);
              }


              setIsQuote(isQuoteIdExsist);



            });
      }, [total])
  )
  useFocusEffect(
      React.useCallback(() => {
        GetCustomFormattedValue(tax)
            .then(pd => {
              setTaxDisplay(pd);
            });
      }, [tax])
  )
  useFocusEffect(
      React.useCallback(() => {
        GetCustomFormattedValue(savings)
            .then(pd => {
              setSavingsDisplay(pd);
            });
      }, [savings])
  )
  useFocusEffect(
      React.useCallback(() => {
        let isQuoteIdExsist = false;
              items.map((item) => { // TODO

                if (item?.quoteId) {
                  if (item.quoteId != '') {
                    setQuoteId(item.quoteId);
                  }
                }

                if (item.actionMode == 'ORDER QUOTE') {
                  isQuoteIdExsist = true;
                }
              });


              let subTotal = 0.00;

              if (isQuoteIdExsist) {

                let quotedPrice = 0.00;

                items.map((item) => {
                  quotedPrice += parseFloat(item.cartItemQuoteYourPrice) || 0;

                });

                subTotal = quotedPrice;
              }else{
                subTotal = total;
              }


              console.log('ff',subTotal);


        GetCustomFormattedValue(subTotal + tax + deliveryPrice)
            .then(pd => {
              console.log(pd);
              setTotalDisplay(pd);
            });
      }, [total, tax, deliveryPrice])
  )

  useFocusEffect(
    React.useCallback(() => {
      setPayable(true)

    }, [])
)




 const managePreviousOrderStatus = async () => {



  if (workingOrderID == null) {
    return true;
  }else{


    console.log(workingOrderID);
    let resOrder = await RawQuery(`Select * from local_com_order WHERE OrderID = ${workingOrderID}`);

    if (resOrder != null) {

      webOrderId = resOrder.item(0).WebOrderID;

      console.log(webOrderId);
      if (webOrderId != null) {
          const res = await deleteAbondandOrders(webOrderId);

          // console.log(res);
          // console.log("=");
          // console.log(workingOrderID);
          if (res.error == null) {

            let resDelete = await RawQuery(`Delete from local_com_order WHERE OrderID = ${workingOrderID}`);
            console.log(resDelete);
          }





      }else{

        const status = await RawQuery(`SELECT StatusName from local_com_orderstatus where StatusID = ${resOrder.item(0).OrderStatusID}`);



        if (status.item(0).StatusName.toLowerCase() == 'new') {
          let resDelete = await RawQuery(`Delete from local_com_order WHERE OrderID = ${workingOrderID}`);
        }



      }


    }



    return true;

  }





 };



  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Header /> */}
        <Back />
        <View style={styles.titleView}>
          <Text style={styles.titleTxt} allowFontScaling={false}>
            Order Summary
          </Text>
        </View>
        <View style={{width: '94%', height: hp('73')}}>
          <View style={styles.addressDetails}>
            <View style={styles.addressDetailsShipping}>
              <Text style={styles.addTitle}>Shipping Address</Text>
              <View style={styles.shippingsub}>
                <Text style={styles.addname}>
                  {shippingAddress?.addressPersonalName}
                </Text>
                <Text style={styles.addDetails}>{shippingAddress?.label}</Text>
                <Text style={styles.addcontact}>
                  {shippingAddress?.addressPhone}
                </Text>
              </View>
            </View>
            <View style={styles.addressDetailsDelivery}>
              <Text style={styles.addTitle}>Billing Address</Text>
              <View style={styles.shippingsub}>
                <Text style={styles.addname}>
                  {billingAddress?.addressPersonalName}
                </Text>
                <Text style={styles.addDetails}>{billingAddress?.label}</Text>
                <Text style={styles.addcontact}>
                  {billingAddress?.addressPhone}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.contentScroll}>
          <FlatList
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <OrderItem key={index} index={index} isQuote={isQuote} item={item} />
            )}
            style={{ width: '100%' }}
          />
          </View>
          <View style={styles.mainCheckoutbox}>
            { orderNote != undefined & orderNote != '' ? (
              <View style={styles.orderNotesView}>
              {widthPercentageToDP('100') > 450 ? (
                <Text style={styles.noteTitle}>Order Note</Text>
              ) : null}
              {widthPercentageToDP('100') > 450 ? (
                // <Text style={styles.noteTitle}>Order Note</Text>
                <ScrollView>
                  <Text style={styles.noteContent}>
                    {orderNote}
                  </Text>
                </ScrollView>
              ) : (

                <List.Accordion
                  title="Order Notes"
                  // left={props => <List.Icon {...props} icon="folder" />}
                  style={styles.accordianView}
                  right={props => (
                    <View style={styles.imageNotesView}>
                      {expanded !== true ? (
                        <Image source={down_arrow} style={styles.cardImg} />
                      ) : (
                        <Image source={up_arrow} style={styles.cardImg} />
                      )}
                    </View>
                  )}
                  titleStyle={{
                    color: 'black',
                    height: hp('3'),
                    textAlignVertical: 'center',
                    fontSize: hp('1.7'),
                    marginTop: hp('-0.5'),
                    fontWeight: 'bold',
                  }}
                  expanded={expanded}
                  onPress={handlePress}>
                  <List.Item
                    onPress={handlePress}
                    style={{height: hp('14')}}
                    title={orderNote}
                    titleNumberOfLines={0}
                    titleStyle={{
                      color: 'black',
                      textAlignVertical: 'center',
                      fontSize: hp('1.3'),
                      color: 'gray',
                    }}
                  />
                  {/* <List.Item title="Second item" /> */}
                </List.Accordion>
              )}
            </View>
            ) : <View style={styles.orderNotesViewDisplay}></View> }
            <View
              style={[
                styles.basketTotal,
                expanded == true ? {display: 'none'} : null,
              ]}>
              <View style={{marginTop: hp('1')}}>
                {/*<View style={styles.savingsTextView3}>
                <Text style={styles.savingsText} allowFontScaling={false}>
                  Other Savings
                </Text>
                <View style={{ position: 'absolute', right: 1 }}>
                  <Text
                    style={styles.savingssubText}
                    allowFontScaling={false}
                  >
                    {savingsDisplay}
                  </Text>
                </View>
              </View>*/}
                <View style={styles.savingsTextView3}>
                  <Text style={styles.savingsText} allowFontScaling={false}>
                    Sub Total(Ex. VAT)
                  </Text>
                  <View style={{position: 'absolute', right: 1}}>
                    <Text
                      style={styles.savingssubText}
                      allowFontScaling={false}>
                      {subTotalDisplay}
                    </Text>
                  </View>
                </View>
                <View style={styles.savingsTextView3}>
                  <Text style={styles.savingsText} allowFontScaling={false}>
                    Delivery(Ex. VAT)
                  </Text>
                  <View style={{position: 'absolute', right: 1}}>
                    <Text
                      style={styles.savingssubText}
                      allowFontScaling={false}>
                      {deliveryDisplay}
                    </Text>
                  </View>
                </View>
                <View style={styles.savingsTextView3}>
                  <Text style={styles.savingsText} allowFontScaling={false}>
                    VAT
                  </Text>
                  <View style={{position: 'absolute', right: 1}}>
                    <Text
                      style={styles.savingssubText}
                      allowFontScaling={false}>
                      {taxDisplay}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.totalTextView}>
                <Text style={styles.totalTxt} allowFontScaling={false}>
                  Basket Total (Inc. VAT)
                </Text>
                <View style={{position: 'absolute', right: 1}}>
                  <Text style={styles.totalTxt} allowFontScaling={false}>
                    {totalDisplay}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.backbtn}
              onPress={() => navigation.navigate('carts')}>
              <Text style={styles.backbtnTxt}>BACK TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!payable}
              style={[styles.proceedbtn, !payable ? { backgroundColor: color_gray, borderWidth: 0 }: {} ]}
              onPress={() => {

                setPayable(false)


                if (items.length <= 0) {
                  showMessage({
                    message: 'KINGS SEEDS',
                    description: 'Cart is empty',
                    type: 'warning',
                    autoHide: true,
                  });
                } else {


                 const res =  managePreviousOrderStatus();


                  if (res) {
                      store.dispatch({type: 'CustomSpinner:SHOW'});
                      callCreateOrder(
                        items,
                        billingAddress,
                        shippingAddress,
                        deliveryPrice,
                        deliveryTax,
                        deliveryOption,
                        paymentType,
                        offlineOrder,
                        orderNote,
                        null,
                        false,
                        null,
                        0,
                        quoteId,
                        customerEmail,
                        registerNumber
                      )
                        .then(({orderID, webOrderID, finalTotal}) => {
                          store.dispatch({type: 'CustomSpinner:HIDE'});

                          console.log('payment type', paymentType);
                          console.log('offlineOrder', offlineOrder);
                          console.log('orderAPayment', orderAPayment);
                          console.log('finalTotal', finalTotal);

                          if (offlineOrder) {
                            dispatch(clearCart());
                            if (paymentType != 'sagepay' || (!orderAPayment && finalTotal == 0)) {
                              updateOrderStatuses('inprogress', orderID);
                            }
                            navigation.dispatch({
                              ...CommonActions.reset({
                                index: 0,
                                routes: [
                                  {
                                    name: 'drawer',
                                    state: {
                                      routes: [
                                        {
                                          name: 'home',
                                          params: {
                                            screen: 'orderConfirmation',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              }),
                            });
                          } else {
                            if (paymentType == 'sagepay' && (orderAPayment || finalTotal > 0)) {
                              navigation.navigate('payment', {time: Date.now()});
                            } else {
                              dispatch(clearCart());
                              updateOrderStatuses(
                                'inprogress',
                                orderID,
                                webOrderID,
                              );

                              if (paymentType == 'onaccount' && !orderAPayment) {
                                sendOrderEmail(webOrderID, customerEmail);
                              }

                              navigation.dispatch({
                                ...CommonActions.reset({
                                  index: 0,
                                  routes: [
                                    {
                                      name: 'drawer',
                                      state: {
                                        routes: [
                                          {
                                            name: 'home',
                                            params: {
                                              screen: 'orderConfirmation',
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                }),
                              });
                            }
                          }
                        })
                        .catch(err => {
                          console.log(`Order creation failed : ${err}`);
                          store.dispatch({type: 'CustomSpinner:HIDE'});
                          showMessage({
                            message: 'KINGS SEEDS',
                            description: `Order creation failed. Please try again later.`,
                            type: 'warning',
                            autoHide: true,
                          });
                        });
                  }else{
                    showMessage({
                      message: 'KINGS SEEDS',
                      description: `Something went wrong. Please try again later.`,
                      type: 'warning',
                      autoHide: true,
                    });
                  }


                }
              }}>
              <Text style={styles.proceedbtnTxt}>
                {paymentType == 'sagepay'
                  ? 'PROCEED TO PAYMENT'
                  : 'COMPLETE ORDER'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Footer /> */}
      </View>
    </SafeAreaView>
  );
}
