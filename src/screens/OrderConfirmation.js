import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  BackHandler
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


import { store } from "../../configureStore.js";
import Styles from "../style/OrderCinfirmationStyle.js";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NetInfo from "@react-native-community/netinfo";
import Main from "../offline/Main";
import { useDispatch, useSelector } from "react-redux";
import DataAdapter from "../offline/localData/DataAdapter";
import Back from "../components/common/Back";
import moment from "moment";

const back_img = require("../assets/backgroundImages/Sync2x.png");
const refreshsync = require("../assets/fullsync2x.png");
const ordersync = require("../assets/Loaders/successgifNew.gif");
const imagesync = require("../assets/imagesync2x.png");
const groupsync = require("../assets/productSync.png");

const { ids, styles } = Styles;

async function initial() {
  const newpro = await DataAdapter("NEW PRODUCTS");
  return newpro;
}

export default function OrderConfirmation() {
  const navigation = useNavigation();
  const webOrderID = useSelector(s => s.checkout.webOrderID)
  const orderID = useSelector(s => s.checkout.orderID)
  const paymentType = useSelector(s => s.checkout.paymentType)
  const offlineOrder = useSelector(s => s.checkout.offlineOrder)
  const orderDate = useSelector(s => s.checkout.orderDate)
  const orderAPayment = useSelector(s => s.checkout.orderAPayment)

  useFocusEffect(
      React.useCallback(() => {



        store.dispatch({
          type: 'SET_ORDER_ID',
          payload: {
            workingOrderID: null
          }
      });



        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, [])
  )

  let text1 = [];
  let button1 = null;

  if (orderAPayment) {
    text1.push(<Text style={styles.orderTitle}>You payment has been successfully recorded.</Text>);
    button1 = <TouchableOpacity
        style={styles.ordersBtn}
      // onPress={() => navigation.navigate('storeNew', { tab: 5, subTabVal: "viewPaymentHistory" })}
        onPress={() => navigation.navigate("storeNew", {
          tab: 5,
          subTabVal: "viewPaymentHistory",
        })}
      
    >
      <Text style={styles.ordersTxt}>GO TO PAYMENT HISTORY</Text>
    </TouchableOpacity>;
  } else {
    if (offlineOrder) {
      if (paymentType == 'sagepay') {
        text1.push(<Text style={styles.orderTitle}>You order has been successfully recorded but is unpaid.</Text>);
        text1.push(<Text style={styles.orderTitle}>Please pay when the device is online.</Text>);
      } else {
        text1.push(<Text style={styles.orderTitle}>You order has been successfully recorded.</Text>);
      }
      button1 = <TouchableOpacity
          style={styles.ordersBtn}
          onPress={() => navigation.navigate("storeNew", { tab: 2, subTabVal: "offline", offlineTab: 'Y' })}
          
      >
        <Text style={styles.ordersTxt}>GO TO OFFLINE ORDERS</Text>
      </TouchableOpacity>;
    } else {
      text1.push(<Text style={styles.orderTitle}>You order has been successfully recorded.</Text>);
      button1 = <TouchableOpacity
          style={styles.ordersBtn}
          onPress={() => navigation.navigate('storeNew', {tab: 2, subTabVal: ""})}
      >
        <Text style={styles.ordersTxt}>GO TO ORDERS</Text>
      </TouchableOpacity>;
    }
  }

 

  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ImageBackground
              source={back_img}
              resizeMode="cover"
              style={{width: "100%", height: "100%"}}
          >
            {/* <Back /> */}
            <View style={styles.containerView}>
              <View style={styles.synccard}>
                <View style={styles.cardInside}>
                  {text1}
                  <View style={styles.imgContainer}>
                    <Image source={ordersync} style={styles.buttonIconfull}/>
                  </View>
                  <Text style={styles.greyTxt}>Thank you for your {orderAPayment ? 'payment' : 'order'} from everyone at Kings Seeds.</Text>
                  {
                    offlineOrder &&
                    <Text style={styles.grnTxt}>
                      Temporary Order Reference: TEMP-{orderID}.
                    </Text>
                  }
                  <Text style={styles.grnTxt}>
                    Your {orderAPayment ? 'Payment' : 'Order'} Reference
                    Number: {offlineOrder ? `will be generated when the payment is made and orders synced` : `${webOrderID}`}.
                  </Text>
                  <Text style={styles.dateTxt}>
                    Date: {moment(orderDate).format('DD-MM-YYYY')}
                  </Text>
                  {button1}
                </View>

              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
  );
}
