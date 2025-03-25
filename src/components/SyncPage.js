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
  Platform,
  TouchableOpacity
} from "react-native";



import { Fonts } from "../utils/Fonts";
import Styles from "../style/FooterStyle";
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

import DataAdapter from "../offline/localData/DataAdapter";
import Back from "./common/Back";
import { CProc_INT_GetPrice, CProc_WEB_GetProductsForListV1_WithPrice } from "../offline/localData/serviceData/SP";

import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { showMessage } from "react-native-flash-message";
import { syncImagesToApi } from "../actions/ImageSyncAction";

import { RawQuery } from "../offline/Services/DataHelper";

import {convertDateTimeToDate} from '../utils/ValidationHelper'
import * as colors from '../style/Common/ColorsStyle';


import getQuotesDataSet from "./test";
import getCartsDataSet from "./testCart";

import sendQuotestoServer from "./test1";
import sendCartstoServer from "./test1Cart";


import deleteFromLocal from "./test2";

import uploadContacts from "./contacts/uploadContacts";
import ConfirmationBox from "./common/ConfirmationBox";
import { ConfirmDialog } from "react-native-simple-dialogs";
import AppVersion, { compareVersions, getLocalVersion } from "./common/AppVersion";
import { checkDiscounts } from "../utils/checkDiscounts";
import { checkTable } from "./common/SyncHelper";
import deleteLocalRows from "../offline/storeData/bulkDelete";
import { GetWorkingAsCustomerID } from "../offline/Services/UserHelper";
import { checkCartItems, getCartType, isCartEmpty } from "./CartOperation/CartFunctions";
import { accountRemove } from "../actions/AuthActions";
import { clearCart } from "../actions/CartActions";
import MssqlDTToSqlDT from "./helperComponents/MssqlDTToSqlDT";
import moment from 'moment-timezone';
import isTokenExpired from "./common/TokenOperation";
import { CheckQuntities } from "./CartOperation/CheckQuntities";



const back_img = require("../assets/backgroundImages/Sync2x.png");
const refreshsync = require("../assets/fullsync2x.png");
const ordersync = require("../assets/cartsync2x.png");
const imagesync = require("../assets/imagesync2x.png");
const groupsync = require("../assets/productSync.png");

const checkIcn = require("../assets/Loaders/loader.gif");
const successMsg = require("../assets/Loaders/success-msg.gif");

const { ids, styles } = Styles;

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


export default function SyncPage() {
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { connectionStatus } = useSelector((s) => s.loading);

  const cusIdAdmin = useSelector((state) => state.findStore.adminCustomerID);




  const storeName = useSelector((state) => state.findStore?.selItemName);
  const cartItemNotes =  useSelector(s => s.checkout.unavailableItems)

  const [isNewUser, setIsNewUser] = useState(false);

  const [contentText, setContentText] = useState(false);
  const [contentTextDes, setContentTextDes] = useState(false);
  const [syncModalVisible, setSyncModalVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBtn, setModalBtn] = useState(false);

  const [proceedBtn, setProceedBtn] = useState(false);
  const [selBtn, setSelBtn] = useState("");

  const [logs, setLogs] = useState([]);



  useEffect(() => {

    checkInitialDB();


    // navigation.navigate("BlanckPage");
    if (!isFocused) {
      setModalVisible(false);
      store.dispatch({ type: "CustomSpinner:HIDE" });

    }else{
         // store.dispatch({ type: "CustomSpinner:SHOW" });
         store.dispatch({ type: "CustomSpinner:HIDE" });
         console.log('cus id========'+cusIdAdmin);

         initial().then(res => {
           setLogs(res);

         });

         checkDb().then(res => {
          const syncType = 'FULL SYNC';
           if (res == 0) {


            NetInfo.fetch().then(conG => {

              if (connectionStatus != true) {

              } else {

                if (conG.type == 'wifi') {
                  Main(
                    loginToken,
                    this.getnNewProducts,
                    this.startChangeStatus,
                    this.endChangeStatus,
                    syncType
                  ).then((res) => {
                    if (res == 'ERROR') {
                      console.log('Failed to');
                      setModalVisible(false)

                      setSyncModalVisible(true)

                      NetInfo.fetch().then(conL => {
                        console.log('net info ',conL);
                        if (conG.type == 'wifi') {
                          setContentText('Sorry! Incomplete sync. Please check your connection');
                        }else{
                          setContentText('Sorry! Incomplete sync. Please connect to Wi-Fi to complete');
                        }

                      })

                    }

                  });
                }else{
                  setSyncModalVisible(true)
                  setContentText('Please connect to a Wi-Fi network to start the initial sync');
                }

              }
            });

            console.log('----------------------------------------------------------------');


            // {"details": {"ipAddress": "192.168.1.51", "isConnectionExpensive": false, "subnet": "255.255.255.0"}, "isConnected": true, "isInternetReachable": true, "type": "wifi"}
           }else{
            compareVersions().then(isEqual => {
              if (!isEqual) {
                accountRemoveProcess()
                Main(
                  loginToken,
                  this.getnNewProducts,
                  this.startChangeStatus,
                  this.endChangeStatus,
                  syncType
                );
              }
            });

          }
         });






      //  initialTEST().then(res => {

      //   console.log('====res================================');
      //   console.log(res);
      //   console.log('====================================');

      //   //  store.dispatch({ type: "CustomSpinner:HIDE" });
      //  });


    }


    setTimeout(() => {

      test01()
      // test02()
      // test03()
      // test04()

    }, 1000);


  }, [isFocused]);


  async function test04(){
    console.log('te========');

    let ids = [9485];
    // const res = await CheckQuntities([9485]);
    const response = await executeQuery(GET_PRODUCT_AVAILABILITY, { ids });
    console.log(response);


  }


  async function test03(){
    await RawQuery(`select * from local_com_order`);


    // await isTokenExpired();


  }

  async function test02(){

    let timestamp = new Date();

    timestamp = MssqlDTToSqlDT(timestamp);
    console.log('================================');

    console.log(moment.tz(timestamp, "Europe/London").local().format("YYYY-MM-DD HH:mm:ss"));

    // await RawQuery(`DELETE FROM local_com_order`);
    // await RawQuery(`DELETE FROM local_com_orderaddress`);
    // await RawQuery(`DELETE FROM local_com_orderitem`);
  }

  async function test01(){

    let res = await RawQuery(`SELECT * FROM local_ct_quotes`);
    // let res = await RawQuery(`SELECT * FROM local_ct_quotes where ItemShoppingCartID = '1524052'`);
    // let res = await RawQuery(`select * from local_ct_quotes`);

// let res = await RawQuery(`SELECT (CASE
//       WHEN SKUNumber='${q}' THEN 1 ELSE 2 END) AS ExactRank,
//     (CASE
//       WHEN INSTR(lower(SKUNumber), lower('${q}')) = 1 THEN 1 ELSE 2 END) AS CodeRank,
//     (CASE
//       WHEN INSTR(lower(SKUName), lower('${q}'))  = 1 THEN 1 ELSE 2 END) AS NameRank,
//     SKUID, SKUName, SKUNumber, SKUPackSize, SKUInternalStatusID, SKUManufacturerID, SKUAvailableItems,
//     Nav_Navigation, SKUInStoreFrom
//     FROM local_int_navigation AS ct
//     LEFT OUTER JOIN local_com_sku ON ct.Nav_SKUID = local_com_sku.SKUID
//     `);

    console.log('length', res.length);
    for (let index = 0; index < res.length; index++) {
      const element = res.item(index);
      // console.log(element);

    }
console.log('.............................fdsfsdf.fff......');

  }


    // main operation - get data
    async function initialTEST(){

      const payload = {
        section: 'TEST',
        opration: 'SYNC',
        data: '',
      }

      const newpro = await DataAdapter(payload);
      return newpro;
    }

     // main operation - get data
     async function initial(orderId){

      const payload = {
        section: 'SYNC',
        opration: 'GET LAST UPDATES',
        data: { orderId },
      }

      const newpro = await DataAdapter(payload);
      return newpro;
    }

    async function accountRemoveProcess()  {
      dispatch(accountRemove());
      dispatch(clearCart());
      // this.props.;

      const res1 = await RawQuery(`delete from local_orderpad`);
      console.log('Clearing Orderpad', res1);

      // const res2 = await RawQuery(`delete from local_active_cart`);
      // console.log('Clearing Orderpad', res2);
      // console.log(this.state);

      showMessage({
        message: "KINGS SEEDS",
        description: "Customer removed successfully",
        type: "success",
        autoHide: true,
      });


    }

     checkInitialDB = async () => {
      checkDb().then(res => {
        if (res == 0) { setIsNewUser(false) } else { setIsNewUser(true) }
      })
    }

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
    checkInitialDB();
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

  const syncImages = () => {


    //add selected images to file array
    let files_ = [];
    for (let index = 0; index < selPhotosArray.length; index++) {
      const element = selPhotosArray[index];
      let i = 0;
      if (element.selected == true) {
        files_.push(element);
      }
    }

    if (files_.length == 0) {
      console.log(files_);
      showMessage({
        message: "KINGS SEEDS",
        description: "Please select images to sync",
        type: "info",
        autoHide: true,
      });
      navigation.navigate("storeNew", { tab: 8 });
    } else {
      setModalVisible(true);

      setTimeout(() => {
        syncImagesToApi(selPhotosArray, accCode, addressId, loginToken)
          .then((data) => {
            console.log(data);
            console.log(modalVisible);
            //setModalVisible(false);
            setModalBtn(true);
          })
          .catch((error) => {
            setModalVisible(false);
            showMessage({
              message: "KINGS SEEDS",
              description: "Image sync error",
              type: "warning",
              autoHide: true,
            });
          });
      }, 2000);
    }
  };

  const md_close = () => {

    setModalBtn(false);
    setModalVisible(false);
    navigation.navigate("home", { screen: "storePhotos" });
  };


  function showLastUpdateTime(syncType){

    if (syncType == 'FULL SYNC') {
      const full = logs.filter(log => log.main_operation == "FULL SYNC" & log.status == "DONE");
      const last_element = full[full.length - 1];
      var fdate = convertDateTimeToDate(last_element.date_time)
      return fdate;
    }

    if (syncType == 'PRODUCT SYNC') {
      const full = logs.filter(log => log.main_operation == "PRODUCT SYNC" & log.status == "DONE");
      const last_element = full[full.length - 1];
      var fdate = convertDateTimeToDate(last_element.date_time)
      return fdate;
    }

    if (syncType == 'IMAGE SYNC') {
      const full = logs.filter(log => log.main_operation == "IMAGE SYNC" & log.status == "DONE");
      const last_element = full[full.length - 1];
      var fdate = convertDateTimeToDate(last_element.date_time)
      return fdate;
    }

    if (syncType == 'ORDER SYNC') {
      const full = logs.filter(log => log.main_operation == "ORDER SYNC" & log.status == "DONE");
      const last_element = full[full.length - 1];
      var fdate = convertDateTimeToDate(last_element.date_time)
      return fdate;
    }

  }

  function lastUpdateVisibility(syncType){

    if (syncType == 'FULL SYNC') {
      const full = logs.filter(log => log.main_operation == "FULL SYNC" & log.sub_operation == "INITIAL" & log.status == "DONE");
      return full.length > 0 ? true : false;
    }


    if (syncType == 'PRODUCT SYNC') {
      const full = logs.filter(log => log.main_operation == "PRODUCT SYNC" & log.status == "DONE");
      return full.length > 0 ? true : false;
    }

    if (syncType == 'IMAGE SYNC') {
      const full = logs.filter(log => log.main_operation == "IMAGE SYNC" & log.status == "DONE");
      return full.length > 0 ? true : false;
    }

    if (syncType == 'ORDER SYNC') {
      const full = logs.filter(log => log.main_operation == "ORDER SYNC" & log.status == "DONE");
      return full.length > 0 ? true : false;
    }

  }




  function checkFullSync(){

    let check = logs.map(log => {

      if (log.main_operation == 'FULL SYNC') {
        if (log.sub_operation == 'INITIAL') {
          if (log.status == 'DONE') {
            return true;
          }
        }
      }

    });

    let bool = false;
    check.map(ch => {
      if (ch) {
        bool = true;
      }
    })

    return bool;
  }

  function proceedAnyway() {
    setSyncModalVisible(false);
    const syncType = 'FULL SYNC';
    Main(
      loginToken,
      this.getnNewProducts,
      this.startChangeStatus,
      this.endChangeStatus,
      syncType
    ).then((res) => {
      if (res == 'ERROR') {
        console.log('Failed to');
        setModalVisible(false)

        setSyncModalVisible(true)
        setContentText('Failed to sync')
      }

    });
  }

  function checkAndSync() {
    NetInfo.fetch().then(res => {
      if (connectionStatus != true) {

      } else {
        const syncType = 'FULL SYNC';
        if (res.type == 'wifi') {
          setSyncModalVisible(false)
          Main(
            loginToken,
            this.getnNewProducts,
            this.startChangeStatus,
            this.endChangeStatus,
            syncType
          ).then((res) => {
            if (res == 'ERROR') {
              console.log('Failed to');
              setModalVisible(false)

              setSyncModalVisible(true)

              NetInfo.fetch().then(conL => {
                  if (conG.type == 'wifi') {
                    setContentText('Please check the network connection');
                  }else{
                    setContentText('Please connect to a WIFI network');
                  }
              })
            }

          });
        }else{
          setSyncModalVisible(true)
          setContentText('please connect to a WIFI network and press (yes) or press (no) to proceed anyway');
        }

      }
    })
  }





  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <ImageBackground
          source={back_img}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        > */}

{/* <ConfirmationBox
        showHide={syncModalVisible}
        yes={() => checkAndSync()}
        no={() => proceedAnyway()}
        contentText={contentText}
      /> */}







<ConfirmDialog
        title="KINGS SEEDS"
        titleStyle={{
          color: "black",
          textAlign: "left",
          fontSize: hp("2"),
          // marginTop:hp('1')
        }}
        animationType="fade"
        dialogStyle={{
          zIndex: 10,
          borderRadius: 10
        }}
        buttonsStyle={{
          // backgroundColor:'red',
          color: "red",
        }}
        buttons={{
          title: "YES",
        }}
        visible={syncModalVisible}
        onTouchOutside={() => {
          checkDb().then(res => {
            if (res == 0) {
              const syncType = 'FULL SYNC';
              NetInfo.fetch().then(conG => {

                if (connectionStatus != true) {

                } else {

                  if (conG.type == 'wifi') {
                    Main(
                      loginToken,
                      this.getnNewProducts,
                      this.startChangeStatus,
                      this.endChangeStatus,
                      syncType
                    ).then((res) => {
                      if (res == 'ERROR') {
                        console.log('Failed to');
                        setModalVisible(false)

                        setSyncModalVisible(true)

                        NetInfo.fetch().then(conL => {
                          console.log(conL);
                          if (conG.type == 'wifi') {
                            setContentText('Sorry! Incomplete sync. Please check your connection');
                          }else{
                            setContentText('Sorry! Incomplete sync. Please connect to Wi-Fi to complete');
                          }

                        })

                      }

                    });
                  }else{
                    setSyncModalVisible(true)
                    setContentText('Please connect to a Wi-Fi network to start the initial sync');
                  }

                }
              });
            }else{
              setSyncModalVisible(false)
            }
          })
        }}
      >
        <View style={{ flexDirection: 'column',  paddingBottom: 10, paddingTop: 5 }}>

        <Text style={{ fontSize: 17 }}>
          {contentText}
        </Text>
        <Text>
          {contentTextDes}


        </Text>


        </View>



        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            height: hp("4.5"),
            marginTop: hp("1"),
            // zIndex: 1000
            }}>


                    {
                      isNewUser ? (
                        <View style={{
                          flex: 1,
                          }}>
<TouchableOpacity
              style={{
                height: hp("4.5"),
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f2f2f2",
                marginRight: "1%",
                borderRadius: 5,
              }}
              onPress={() => {
                checkDb().then(res => {
                  if (res == 0) {
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Please sync",
                      type: "info",
                      autoHide: true,
                    });
                  }else{
                    setSyncModalVisible(false)
                  }
                })
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "black" }}>Close</Text>
            </TouchableOpacity>
            </View>
                      ) : null
                    }


                  <View style={{
                    flex: isNewUser ? 1 : 0.5,
                    }}>
            <TouchableOpacity
              style={{
                height: hp("4.5"),
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DEF9F6",
                marginLeft: "1%",
                borderRadius: 5,
              }}
              onPress={() => {
                const syncType = 'FULL SYNC';
                NetInfo.fetch().then(conG => {
                  if (conG.type == 'wifi') {



                    if (connectionStatus != true) {
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Please check the Network Connection",
                        type: "warning",
                        autoHide: true,
                      });
                    } else {
                      Main(
                        loginToken,
                        this.getnNewProducts,
                        this.startChangeStatus,
                        this.endChangeStatus,
                        syncType
                      );
                    }
                    setSyncModalVisible(false)
                  }else{
                    checkDb().then(res => {
                     if (res == 0) {
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Please check your connection",
                        type: "warning",
                        autoHide: true,
                      });
                     }else{
                      if (connectionStatus != true) {
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Please check the Network Connection",
                          type: "warning",
                          autoHide: true,
                        });
                      } else {
                        Main(
                          loginToken,
                          this.getnNewProducts,
                          this.startChangeStatus,
                          this.endChangeStatus,
                          syncType
                        );
                      }
                      setSyncModalVisible(false)
                     }
                    })

                  }


                })
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>{ proceedBtn ? 'Proceed' : 'Sync' }</Text>
            </TouchableOpacity>
                  </View>
          </View>



      </ConfirmDialog>













          <CustomSpinner />
          <Back />
          <View>
            <Modal
              animationType="fade"
              //fade , none,slide use for animation type
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={sty.centeredView}>
                <View style={sty.modalView}>
                  <View
                    style={{
                      width: "90%",
                      height: hp("38"),
                      alignSelf: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      marginTop: hp("2"),
                    }}
                  >
                    {modalBtn == false ? (
                      <Text style={styles.syncOptionsText}>Sync Started </Text>
                    ) : (
                      <Text style={styles.syncOptionsText}>
                        Sync Successful{" "}
                      </Text>
                    )}

                    {modalBtn == false ? (
                      <Text style={{ fontSize: hp("1.5"), height:hp('2') }}>
                        This will take several minutes..
                      </Text>
                    ) : (
                      <Text style={{ fontSize: hp("1.5"), height:hp('2'), marginTop: 10 }}>
                        Now we can go further..
                    </Text>
                    )}

                    <View
                      style={{
                        width: "80%",
                        height: hp("19"),
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: hp("1"),
                      }}
                    >
                    {modalBtn == false ? (
                      <Image source={checkIcn} style={sty.cardImgCheck}></Image>
                    ) : (
                      <Image source={successMsg} style={sty.cardImgsuccess}></Image>
                    )}


                      {/* <Image source={successMsg} style={sty.cardImgCheck}></Image> */}
                    </View>

                    {modalBtn == false ? (
                      <Text style={{ fontSize: hp("1.7"), color: "#2CDC0B" }}>
                        Checking user environment..
                      </Text>
                    ) : (
                      <Text style={{ fontSize: hp("1.7"), color: "#2CDC0B" }}>
                        Click OK to continue..
                      </Text>
                    )}

                    <Pressable
                      style={[{
                        width: wp("20"),
                        height: hp("4"),
                        alignSelf: "center",
                        alignItems: "center",
                        backgroundColor: colors.primaryColor,
                        marginTop: hp("3"),
                        borderRadius: wp("1"),
                        justifyContent: "center",
                      }, modalBtn==false ? { backgroundColor: "#F6F6F6"}: null]}
                    >
                      <Text
                        disabled={!modalBtn}
                        accessibilityRole="button"
                        style={[{
                          fontSize: hp("1.7"),
                          color: "white",
                          width: wp("20"),
                          height: hp("4"),
                          textAlign: "center",
                          paddingTop: hp("0.8"),
                        }, modalBtn==false ? { color: "#979797"}: null]}
                        onPress={() => {
                          md_close();
                        }}
                      >
                        OK
                      </Text>
                    </Pressable>

                    {/* {modalBtn == false ? null : (
                      <TouchableOpacity
                        style={{
                          width: wp("20"),
                          height: hp("4"),
                          alignSelf: "center",
                          alignItems: "center",
                          backgroundColor: colors.primaryColor,
                          marginTop: hp("3"),
                          borderRadius: wp("1"),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          disabled={modalBtn}
                          accessibilityRole="button"
                          style={{
                            fontSize: hp("1.7"),
                            color: "white",
                            width: wp("20"),
                            height: hp("4"),
                            textAlign: "center",
                            paddingTop: hp("0.8"),
                          }}
                          onPress={() => {
                            md_close();
                          }}
                        >
                          OK
                        </Text>
                      </TouchableOpacity>
                    )} */}
                  </View>
                </View>
              </View>
            </Modal>

            <View style={styles.headView}>
              <Text style={styles.syncOptionsText}>Sync Options</Text>
              <Text style={{ fontSize: hp("1.5") }}>
                Please select Sync type:
              </Text>
            </View>
            <View style={styles.synccard}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {

                  NetInfo.fetch().then(conG => {
                    if (conG.type == 'wifi') {
                      const syncType = 'FULL SYNC';
                      // const syncType = 'CHECK';


                      if (connectionStatus != true) {
                        showMessage({
                          message: "KINGS SEEDS",
                          description: "Please check the Network Connection",
                          type: "warning",
                          autoHide: true,
                        });
                      } else {
                        Main(
                          loginToken,
                          this.getnNewProducts,
                          this.startChangeStatus,
                          this.endChangeStatus,
                          syncType
                        ).then((res) => {
                          if (res == 'ERROR') {
                            console.log('Failed to');
                            setModalVisible(false)

                            setSyncModalVisible(true)

                            NetInfo.fetch().then(conL => {
                              console.log(conL);
                              if (conG.type == 'wifi') {
                                setContentText('Sorry! Incomplete sync. Please check your connection');
                              }else{
                                setContentText('Sorry! Incomplete sync. Please connect to Wi-Fi to complete');
                              }

                            })

                          }

                        });
                      }

                    }else{
                      setSyncModalVisible(true);
                      setContentText('Please connect your device to a Wi-Fi network to start syncing');
                      setContentTextDes('(Running the sync without Wi-Fi may affect the app\'s functionality. If you still want to proceed, tap "Proceed")')
                      setProceedBtn(true)
                    }


                  })



                }}
              >
                <View style={styles.button}>
                  <Image source={refreshsync} style={styles.buttonIconfull} />
                  <Text style={styles.syncTypeText}>Full Sync</Text>
                </View>
                <View style={styles.synccardDetails}>
                  <Text style={styles.syncItemDetail}>
                    Update products, customers, addresses, pricing and more. Can
                    take up to 5 minutes
                  </Text>


                  {
                    lastUpdateVisibility('FULL SYNC') ? (
                      <Text style={styles.syncItemDetailsub}>
                      {" "}
                      Last updated on:{" "}
                      <Text style={{ color: "#2CDC0B" }}> { showLastUpdateTime('FULL SYNC') }</Text>
                    </Text>
                    ) : (
                      <Text style={styles.syncItemDetailsub}>{" "}</Text>
                    )
                  }

                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.synccard}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  // navigation.navigate("home", { screen: "mapview" });
                  // this.testSP();

                  const syncType = 'PRODUCT SYNC';

                  if (connectionStatus != true) {
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Please check the Network Connection",
                      type: "warning",
                      autoHide: true,
                    });
                  } else {
                    Main(
                      loginToken,
                      this.getnNewProducts,
                      this.startChangeStatus,
                      this.endChangeStatus,
                      syncType
                    );
                  }


                }}
              >
                <View style={styles.button}>
                  <Image source={groupsync} style={styles.buttonIcon} />
                  <Text style={styles.syncTypeText}>Product Sync</Text>
                </View>
                <View style={styles.synccardDetails}>
                  <Text style={styles.syncItemDetail}>
                    For product updates, new products, price changes and stock
                    levels
                  </Text>
                  {
                    lastUpdateVisibility('PRODUCT SYNC') ? (
                      <Text style={styles.syncItemDetailsub}>
                      {" "}
                      Last updated on:{" "}
                      <Text style={{ color: "#2CDC0B" }}> { showLastUpdateTime('PRODUCT SYNC') }</Text>
                    </Text>
                    ) : (
                      <Text style={styles.syncItemDetailsub}>{" "}</Text>
                    )
                  }
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.synccard}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  // navigation.navigate("home", { screen: "storePhotos" });
                  if(storeName == '' || storeName == null){
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Please select a store before continue",
                      type: "warning",
                      autoHide: true,
                    });
                  }else{
                    navigation.navigate("storeNew", { tab: 2, subTabVal: "offline", offlineTab: 'Y' });
                  }

                  // const syncType = 'ORDER SYNC';

                  // if (connectionStatus != true) {
                  //   showMessage({
                  //     message: "KINGS SEEDS",
                  //     description: "Please check the Network Connection",
                  //     type: "warning",
                  //     autoHide: true,
                  //   });
                  // } else {
                  //   Main(
                  //     loginToken,
                  //     this.getnNewProducts,
                  //     this.startChangeStatus,
                  //     this.endChangeStatus,
                  //     syncType
                  //   );
                  // }


                }}
              >
                <View style={styles.button}>
                  <Image source={ordersync} style={styles.buttonIcon} />
                  <Text style={styles.syncTypeText}>Order Sync</Text>
                </View>
                <View style={styles.synccardDetails}>
                  <Text style={styles.syncItemDetail}>
                    Click to select and upload the offline orders. Full Sync
                    does not upload offline orders
                  </Text>
                  {
                    lastUpdateVisibility('ORDER SYNC') ? (
                      <Text style={styles.syncItemDetailsub}>
                      {" "}
                      Last updated on:{" "}
                      <Text style={{ color: "#2CDC0B" }}> { showLastUpdateTime('ORDER SYNC') }</Text>
                    </Text>
                    ) : (
                      <Text style={styles.syncItemDetailsub}>{" "}</Text>
                    )
                  }
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.synccard}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  height: "100%",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setSelBtn("photos");
                  syncImages();
                  if(cusIdAdmin!= ''){
                    navigation.navigate("storeNew", { tab: 8 });
                  }
                  else{
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Please select a store before sync photos",
                      type: "warning",
                      autoHide: true,
                    });
                  }


                }}
              >
                <View style={styles.button}>
                  <Image source={imagesync} style={styles.buttonIcon} />
                  <Text style={styles.syncTypeText}>Image Sync</Text>
                </View>
                <View style={styles.synccardDetails}>
                  <Text style={styles.syncItemDetail}>
                    Click to select and upload pictures you have taken to the
                    office server. Not included in the full sync
                  </Text>
                  {
                    lastUpdateVisibility('IMAGE SYNC') ? (
                      <Text style={styles.syncItemDetailsub}>
                      {" "}
                      Last updated on:{" "}
                      <Text style={{ color: "#2CDC0B" }}> { showLastUpdateTime('IMAGE SYNC') }</Text>
                    </Text>
                    ) : (
                      <Text style={styles.syncItemDetailsub}>{" "}</Text>
                    )
                  }
                </View>
              </TouchableOpacity>
            </View>
          </View>
        {/* </ImageBackground> */}
      </View>
    </SafeAreaView>
  );
}

const sty = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(225,249,166,0.4)",
  },
  modalView: {
    width: modal_width,
    height: hp("40"),
    margin: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: wp("3.5"),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1.3,
  },
  cardImgCheck: {
    // aspectRatio: 1,
    borderRadius: 100,
    padding: 5,
    height: img_height,
    width: img_height,
    // resizeMode: "contain",
  },
  cardImgsuccess: {
    // aspectRatio: 1,

    padding: 5,
    height: img_height+5,
    width: img_height+5,
    // resizeMode: "contain",
  },
});