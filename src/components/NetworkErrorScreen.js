import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  View,
  SafeAreaView,
  Modal,
  StyleSheet,
  ImageBackground,
  Pressable,
  Linking,
  TouchableOpacity,
  BackHandler
} from "react-native";

import { Fonts } from "../utils/Fonts";
import ConfirmationBox from "./common/ConfirmationBox";
import { useNavigation } from "@react-navigation/core";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NetInfo from "@react-native-community/netinfo";
import Main from "../offline/Main";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import IdleTimerManager from 'react-native-idle-timer';

import * as colors from '../style/Common/ColorsStyle';

import DataAdapter from "../offline/localData/DataAdapter";
import Back from "./common/Back";
import { CProc_WEB_GetProductsForListV1_WithPrice } from "../offline/localData/serviceData/SP";

import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { showMessage } from "react-native-flash-message";
import { syncImagesToApi } from "../actions/ImageSyncAction";

import {convertDateTimeToDate} from '../utils/ValidationHelper'

const back_img = require("../assets/backgroundImages/Sync2x.png");
const refreshsync = require("../assets/fullsync2x.png");
const ordersync = require("../assets/cartsync2x.png");
const imagesync = require("../assets/imagesync2x.png");
const groupsync = require("../assets/productSync.png");

const checkIcn = require("../assets/Loaders/loader.gif");
const successMsg = require("../assets/Loaders/success-msg.gif");



async function initial() {
  const newpro = await DataAdapter("NEW PRODUCTS");
  return newpro;
}

let modal_width = 0;
let modal_btn = 0;
let img_height = hp('12');
if (wp("100") > 450) {
  modal_width = wp("55");
  modal_btn = wp("16");
  img_height =  hp('12');
} else {
  modal_width = wp("70");
  modal_btn = wp("20");
  img_height =  hp('12');
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


export default function NetworkErrorScreen() {
  const isFocused = useIsFocused();

  // const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const { connectionStatus } = useSelector((s) => s.loading);

  // const cusIdAdmin = useSelector((state) => state.findStore.adminCustomerID);

  const [modalVisible, setModalVisible] = useState(false);
  const [contentText, setContentText] = useState("The initial full sync is not completed. Please check the network connection");
  
  // const [modalBtn, setModalBtn] = useState(false);
  // const [selBtn, setSelBtn] = useState("");

  // const [logs, setLogs] = useState([]);



  useEffect(() => {



    

    // Linking.sendIntent("android.settings.NETWORK_OPERATOR_SETTINGS");
  
    // Linking.sendIntent("android.settings.SETTINGS");
    // Linking.sendIntent("android.settings.WIRELESS_SETTINGS");
    // Linking.sendIntent("android.settings.AIRPLANE_MODE_SETTINGS");
    // Linking.sendIntent("android.settings.WIFI_SETTINGS");
    // Linking.sendIntent("android.settings.APN_SETTINGS");
    // Linking.sendIntent("android.settings.BLUETOOTH_SETTINGS");
    // Linking.sendIntent("android.settings.DATE_SETTINGS");
    // Linking.sendIntent("android.settings.LOCALE_SETTINGS");
    // Linking.sendIntent("android.settings.INPUT_METHOD_SETTINGS");
    // Linking.sendIntent("android.settings.DISPLAY_SETTINGS");
    // Linking.sendIntent("android.settings.SECURITY_SETTINGS");
    // Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
    // Linking.sendIntent("android.settings.INTERNAL_STORAGE_SETTINGS");
    // Linking.sendIntent("android.settings.MEMORY_CARD_SETTINGS");
    
  }, [isFocused]);


  useEffect(() => {
    const backAction = () => {
      setModalVisible(true)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);




  startChangeStatus = () => {
    IdleTimerManager.setIdleTimerDisabled(true);
    setModalVisible(true);
    dispatch({ type: "UPDATE_SYNC_PROCESS_STATUS", payload: true });
    dispatch({ type: "UPDATE_CONNECTION_SYNC_TRIGGER", payload: "0" });
  };

  endChangeStatus = () => {
    IdleTimerManager.setIdleTimerDisabled(false);
    setModalBtn(true);
    dispatch({ type: "UPDATE_SYNC_PROCESS_STATUS", payload: false });
    dispatch({ type: "UPDATE_CONNECTION_SYNC_TRIGGER", payload: "0" });
  };

  getnNewProducts = () => {
    initial().then((res) => {
      //   this.setState({ newProducts: res });
      dispatch({ type: "UPDATE_HOME_NEW_PRODUCTS", payload: res });
    });
  };

  // testSP = () => {
  //   CProc_WEB_GetProductsForListV1_WithPrice(
  //     "MALA001",
  //     5,
  //     1,
  //     "local_com_sku.SKUEnabled = 1 AND Nav_Navigation || '/' LIKE 'Packets/Flower/%'",
  //     "local_com_sku.SKUName",
  //     492
  //   )
  //     .then((res) => {
  //       console.log("....sp...", res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const selPhotosArray = useSelector(
    (state) => state.storePhotos.selectedPhotosArray
  );


  


  const accCode = useSelector((state) => state.findStore.accCode);
  const addressId = useSelector((state) => state.findStore.addressId);
  const loginToken = useSelector((state) => state.login.loginToken);

  // const syncImages=()=>{
  //   store.dispatch({type:'CustomSpinner:SHOW'});
  //   syncImagesToApi(selPhotosArray, accCode, addressId,loginToken);
  //   store.dispatch({type:'CustomSpinner:HIDE'});
  //  // navigation.navigate("home", { screen: "contacts" });
  // }


  appExit = () => {
    BackHandler.exitApp();
  }

  Ignore = () => {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>

      <ConfirmationBox
              showHide={modalVisible}
              yes={() => this.appExit()}
              no={() => this.Ignore()}
              contentText={contentText}
            />

      <Text>Sorry, your full sync is interrupted. Please check the network connection.</Text>  


        {/* <TouchableOpacity activeOpacity={0.9}
                    style={ styles.btn }
                    onPress={() => {
                      Linking.sendIntent("android.settings.NETWORK_OPERATOR_SETTINGS");  
                    }}
                  >
                    <Text style={styles.btnTxt} >
                      Cellar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={ styles.btn }
                    onPress={() => {
                      Linking.sendIntent("android.settings.WIFI_SETTINGS");
                    }}
                  >
                    <Text style={styles.btnTxt} >
                      Wifi
                    </Text>
                  </TouchableOpacity> */}


                  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 70,
    height: hp("5.5"),
    backgroundColor: colors.primaryColor,
    tintColor: 'gray',
    // tintColor: "#2d3436",
    // opacity: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    // marginLeft: wp("2"),
    marginTop: hp("1"),
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {},
    "@media (max-width: 450px)": {
      borderRadius: 4,
      height: hp("4.5"),
      
      // marginLeft: wp("0"),
    },
  },
  btnTxt: {
    
    
    fontSize: hp("1.6"),
    color: "white",
    
  },
});