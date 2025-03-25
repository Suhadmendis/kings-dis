import React, {useRef, useState} from 'react'
import {Image, Text, View} from 'react-native';
import Styles from "../style/CartStyle";
import {CommonActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import base64 from 'react-native-base64'
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import {showMessage} from "react-native-flash-message";
import {heightPercentageToDP as hp,} from "react-native-responsive-screen";

import {RawQuery} from "../offline/Services/DataHelper";
import {sendOrderEmail, sendPaymentEmail} from "../actions/SendOrderEmails";
import OpayoConfig from "../config/opayo.js";
import {clearCart} from "../actions/CartActions";

const loader = require("../assets/Loaders/loader.gif");
const {ids, styles} = Styles;

export default function PaymentScreen({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [merchantSessionKey, setMerchantSessionKey] = useState(null);
  const [uri, setUri] = useState(null);

  const webViewRef = useRef(null)
  const webOrderID = useSelector(s => s.checkout.webOrderID)
  const orderID = useSelector(s => s.checkout.orderID)
  const orderAPayment = useSelector(s => s.checkout.orderAPayment)
  const customerEmail = useSelector(s => s.checkout.customerEmail)
  const goback = () => {
    webViewRef.current.goBack();
  };

  let integrationKey = OpayoConfig[OpayoConfig.Mode].integrationKey
  let integrationPassword = OpayoConfig[OpayoConfig.Mode].integrationPassword
  let base64String = base64.encode(`${integrationKey}:${integrationPassword}`)

  console.log('base 64 string...', base64String)
  let paymentStatusChecker = null;
  let errorCount = 0;

  useFocusEffect(
      React.useCallback(() => {
        setUri(null);
        Axios.post(OpayoConfig[OpayoConfig.Mode].merchantSessionKey_URL,
            {
              vendorName: OpayoConfig[OpayoConfig.Mode].vendorName
            }, {
              headers: {
                Authorization: `Basic ${base64String}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }).then(res => {
          console.log('axios res ####', JSON.stringify(res.data, null, 2))
          if (res.data.merchantSessionKey) {
            setMerchantSessionKey(res.data.merchantSessionKey)
            setUri(`${OpayoConfig[OpayoConfig.Mode].paymentForm_URL}/${res.data.merchantSessionKey}?orderID=${webOrderID}`);
            webViewRef.current.reload()

            //paste this url in the browser and you can test the payment flow from the browser
            console.log(`${OpayoConfig[OpayoConfig.Mode].paymentForm_URL}/${res.data.merchantSessionKey}?orderID=${webOrderID}`)
            paymentStatusChecker = setInterval(paymentStatusCheck, 3000);
          }
        })

        return () => {
          clearInterval(paymentStatusChecker);
        }
      }, [])
  )

  //update vendor transaction code with new retry number so paymentStatusCheck wont pickup the previous failed status for a new transaction
  const reportBack = () => {
    Axios.post(OpayoConfig[OpayoConfig.Mode].orderPaymentStatus_URL,
        {orderID: webOrderID, finalStatusReceived: true}, {
          headers: {
            Accept: 'application/json',
            'Content-Type': "application/json",
          }
        })
  }

  const paymentStatusCheck = () => {
    Axios.post(OpayoConfig[OpayoConfig.Mode].orderPaymentStatus_URL,
        {orderID: webOrderID}, {
          headers: {
            Accept: 'application/json',
            'Content-Type': "application/json",
          }
        }).then(res => {
      console.log('payment status:', res.data)
      const {orderIsPaid, paymentStatus, orderStatusID, ipgStatusMsg} = res.data;
      if ((paymentStatus == "processed" && orderIsPaid == "true") || paymentStatus == "Ok") {
        clearInterval(paymentStatusChecker);

        showMessage({
          message: 'KINGS SEEDS',
          description: `Payment Successful!`,
          type: 'success',
          autoHide: true,
        });

        //update order status
        RawQuery(`UPDATE local_com_order SET OrderStatusID=${orderStatusID} WHERE OrderID=${orderID}`);

        if (orderAPayment) {
          //send email
          sendPaymentEmail(webOrderID);
        } else {
          dispatch(clearCart());
          //send email
          sendOrderEmail(webOrderID, customerEmail);
        }

        // navigation.navigate('orderConfirmation')
        navigation.dispatch({
          ...CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "drawer",
                state: {
                  routes: [
                    {
                      name: "home",
                      params: {
                        screen: "orderConfirmation"
                      }
                    }
                  ]
                }
              }
            ]
          })
        })
      } else if ((paymentStatus == "processed" || ["NotAuthed", "Rejected", "Malformed", "Invalid", "Error"].includes(paymentStatus)) && orderIsPaid == "false") {
        clearInterval(paymentStatusChecker);

        reportBack();

        showMessage({
          message: 'KINGS SEEDS',
          description: `${ipgStatusMsg}`,
          type: 'danger',
          autoHide: false,
        });

        //update order status
        RawQuery(`UPDATE local_com_order SET OrderStatusID=${orderStatusID} WHERE OrderID=${orderID}`);

        // navigation.navigate('orderConfirmation')
        navigation.dispatch({
          ...CommonActions.reset({
            index: 1,
            routes: [
              {name: 'home'},
            ]
          })
        })
      }
    }).catch(err => {
      console.log('api error', err);
      errorCount++;
      console.log('api error count', errorCount);
      if (errorCount > 2) {
        clearInterval(paymentStatusChecker);
        showMessage({
          message: 'KINGS SEEDS',
          description: `Something went wrong! Please contact customer services.`,
          type: 'danger',
          autoHide: true,
        });
        // navigation.navigate('orderConfirmation')
        navigation.dispatch({
          ...CommonActions.reset({
            index: 1,
            routes: [
              {name: 'home'},
            ]
          })
        })
      }
    })
  }

  return (
      <View
          style={{height: '100%'}}
      >
        {/* back and reload buttons for debugging */}
        {/* <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={goback} style={{
                    // height:'10%',
                    marginTop:'10%',
                    width:50,
                    }}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>webViewRef.current.reload()} style={{
                    // height:'10%',
                    marginTop:'10%',
                    width:50,
                    }}>
                    <Text>Reload</Text>
                </TouchableOpacity>
            </View> */}
        {uri ?

            <WebView
                // scalesPageToFit
                ref={webViewRef}
                javaScriptEnabled={true}
                allowFileAccess={true}
                source={{
                  // uri:'https://sop.kingsseeds.com/cms/AppPaymentPage'
                  uri
                }}
                scalesPageToFit={true}
                baseurl={" "}
            /> : <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
              <Image source={loader} style={{resizeMode: "contain", height: hp(15), aspectRatio: 1}}/>
              <Text>Please wait...</Text>
            </View>}
      </View>
  )
}
