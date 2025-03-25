import React, { Component, useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Styles from "../style/StoreOrdersStyle";
import NetInfo from "@react-native-community/netinfo";
import IdleTimerManager from 'react-native-idle-timer';
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useIsFocused } from "@react-navigation/native";


import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { Dropdown } from 'react-native-element-dropdown';
import { showMessage } from "react-native-flash-message";
const { ids, styles } = Styles;
import { GetDecimal } from "../utils/ValidationHelper";

import submited from "../offline/storeData/submitData";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import DataAdapter from "../offline/localData/DataAdapter";
import { Button } from "react-native";
import _ from "lodash";
import {createOrder} from "../url/API";
import {GetDataTableValues, RawQuery} from "../offline/Services/DataHelper";
import {useFocusEffect} from "@react-navigation/native";

import Main from '../offline/Main';
import MssqlDTToSqlDT from "./helperComponents/MssqlDTToSqlDT";
import * as colors from '../style/Common/ColorsStyle';
import ConfirmationBox from "./common/ConfirmationBox";
import { ConfirmDialog } from "react-native-simple-dialogs";
import openDatabaseService from "../offline/Config";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { momentUTSLocal } from "./common/DateTimeGeneration";

const filter = require("../assets/add-alt.png");
const crdtCard = require("../assets/creditcard2x.png");
const crtIcon = require("../assets/cartplus2xWhite.png");

const cross = require("../assets/cross.png");
const viewicon = require("../assets/view.png");
const calicn = require("../assets/Calendar/calendardate2x.png");


const refreshsync = require("../assets/fullsync2x.png");


const listTabVals_ = [
  {
    status: "All",
    val: 0,
  },
  {
    status: "Offline",
    val: 1,
  }
];

const data = [
  { optionId: 1, optionValue: 'All' },
  { optionId: 2, optionValue: 'Offline' },
  { optionId: 3, optionValue: 'Completed' },
];


let widthper = wp("100%");
let crd_wdth = 0;
let txt_size = 0;
let date_height = 0;
let date_txt = hp("1");
let date_pl = hp("1.2");
if (widthper <= 500.0) {
  crd_wdth = wp("75");
  txt_size = wp("3");
  date_height = hp("3.9");
  (date_txt = hp("1.5")), (date_pl = hp("1.5"));
} else {
  crd_wdth = wp("65");
  txt_size = wp("2.1");
  date_height = hp("3.5");
  (date_txt = hp("1")), (date_pl = hp("1.2"));
}

function parseDate(str) {
  var mdy = str.split('-');

  return new Date(mdy[0], mdy[1], mdy[2]);
}


function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}


const AllOrders = ({ navigation, route, offlineTab, allOrders }) => {

  allOrders = true;
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [buttonTab, setButtonTab] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [orders, setOrders] = useState([]);
  const [initialOrders, setInitialOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [contentText, setContentText] = useState(false);
  const [syncModalVisible, setSyncModalVisible] = useState(false);
  const [contentTextDes, setContentTextDes] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState('');

  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const [offsets, setOffSet] = useState(0);
  const [limit, setLimit] = useState(10);

  const connectionStatus = useSelector((s) => s.loading.connectionStatus);

  const adminCustomerID = useSelector(
    (state) => state.findStore.adminCustomerID
  );




  const loginToken = useSelector((state) => state.login.loginToken);


  const showDatePicker = (type) => {
    if (type == 'startDate') {
      setSelectedDate(convertToDateObject(startDate));
    }
    if (type == 'endDate') {
      setSelectedDate(convertToDateObject(endDate));
    }
    setStartDatePickerVisibility(true);
    setDateType(type)
  };

  const hideDatePicker = () => {
    setStartDatePickerVisibility(false);
  };
  function convertToDateObject(dateString) {
    if (!dateString) {
      return new Date();
    }

    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }


  const handleDateRange = () => {

    if (startDate != null && endDate != null) {
      console.log('handleDateRange');
      setOrders([]);
      setOffSet(0);
      // setTimeout(() => {
        console.log('handleDateRange', offsets);

        remount('initial');
      // }, 1200);

    }else{
    //   setTimeout(() => {
    //   remount('initial');
    // }, 1200);
    }
    console.log(startDate, endDate);

  };

  const [isFocus, setIsFocus] = useState(false);

  const setTabFilter = (tabVal) => {

    setButtonTab(tabVal);

  };



  const handleConfirm = async (date) => {
    date = moment(date).format("YYYY-MM-DD");

    let tStartDate = startDate;
    let tEndDate = endDate;

    if (dateType == 'startDate') {

      // if (tEndDate == null) {
      //   tEndDate = moment().format("YYYY-MM-DD"); // default to today
      // }
      if (moment(date).isAfter(tEndDate, 'day')) {
        showMessage({
          message: "KINGS SEEDS",
          description: "Start date should be smaller than or equal to the end date",
          type: "warning",
          autoHide: true,
        });
      } else {
        if (tEndDate == null) {
          setStartDate(date);
        }else{
          const months = getMonthDifference(date, tEndDate);
          console.log('fhdosgsudg', months);
          if (months > 6) {
            showMessage({
              message: "KINGS SEEDS",
              description: "The maximum allowed date range per order download is 6 months",
              type: "warning",
              autoHide: true,
            });
          }else{
            setStartDate(date);
          }
        }

        if (tEndDate != null) {
          setTimeout(() => {
            console.log('ww1: ');

            // filterResultsByDateRange(date, tEndDate);
          }, 1000);

        }
      }

    } else {

      if (tStartDate != null && moment(date).isBefore(tStartDate, 'day')) {
        showMessage({
          message: "KINGS SEEDS",
          description: "End date should be greater than or equal to the start date",
          type: "warning",
          autoHide: true,
        });
      } else {

        if (tStartDate == null) {
          setEndDate(date);
        }else{
          const months = getMonthDifference(tStartDate, date);
          console.log('fhdosgsudg', months);

          if (months > 6) {
            showMessage({
              message: "KINGS SEEDS",
              description: "The maximum allowed date range per order download is 6 months",
              type: "warning",
              autoHide: true,
            });
          }else{
            setEndDate(date);
          }

        }

        if (tStartDate != null) { // only filter orders if start date is available
          console.log('ww2: ');
          setTimeout(() => {
            // filterResultsByDateRange(tStartDate, date);
          }, 1000);

        }
      }
    }

    hideDatePicker();
  };


  useEffect(() => {
    handleDateRange();
  }, [startDate, endDate])


  useFocusEffect(
  React.useCallback(() => {
    setStartDate(null);
    setEndDate(null);

console.log('fsdfsdgsdgsdg================================');


    if (offlineTab == 'Y') {
      setButtonTab(1);
    }else{
      setButtonTab(0);
    }
    setOrders([]);
    setLoading(false)
    // setOffSet(0)


    // setOffSet(0)

    if(offsets != 0){

      setOffSet(0)

    }


    // setTimeout(() => {
      // console.log('dsfsdfs',offsets);
      // if (offsets==0) {
        remount('initial');
      // }
    // }, 1000);





        // select the initial one
        setSelectedStatus(0);
    // setTabFilter(1);
    // store.dispatch({ type: "CustomSpinner:SHOW" });



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
                  //     this.startChangeStatusSub,
                  //     this.endChangeStatusSub,
                  //     syncType
                  //   );
                  // }










  }, [isFocused])
  );



  const remount = (flag) => {
    setOrders([]);
    setOffSet(0)
  console.log('Remounting', offsets, startDate, endDate);

      setLoading(true);

      setTimeout(() => {
        initial(allOrders, startDate, endDate, flag).then((res) => {
          // let temp = []
          // temp.push(res[0])
          // res = temp;

          if (res == 'FAILED') {
            setLoading(false);

            return;
          }




          if (res.length == limit) {
            setOffSet(limit)
          }



          // setTimeout(() => {
          //   console.log('pass', offsets);
            setOrders(res);
          //   // setOrders(res);
          //   setLoading(false);
          //   setOffSet(offsets+limit);
          //   setInitialOrders(res);
          //   setSelectedOrders(res);
          // }, 1200);


          // setLoader(true)

            // if(orders.length > 0){
            //   setOrders([...orders,...res]);
            //   setOffSet(offsets+1)
            // }else{
            //   setOrders(res);
            // }
            // // setLoader(false);
            // setLoading(false);



          // console.log('====================================');
          // console.log(res);
          // console.log('====================================');

          getOrderStatuses().then((res) => {
            console.log('res--------------------2');

            // console.log('====================================');
            // console.log(res);
            // console.log('====================================');

            // setLoading(false);
            setLoading(false);
            let orderStatusesTemp = [];
            orderStatusesTemp.push({ optionId: 0, optionValue: "All" });
            res.map(stat => {

              if (stat.StatusName == 'inprogress') {
                orderStatusesTemp.push({ optionId: stat.StatusID, optionValue: stat.StatusDisplayName });
              }
              if (stat.StatusName == 'inserted') {
                orderStatusesTemp.push({ optionId: stat.StatusID, optionValue: stat.StatusDisplayName });
              }
              if (stat.StatusName == 'completedorderprocess_fullydespatched') {
                orderStatusesTemp.push({ optionId: stat.StatusID, optionValue: stat.StatusDisplayName });
              }
              if (stat.StatusName == 'OrderPartDispatched') {
                orderStatusesTemp.push({ optionId: stat.StatusID, optionValue: stat.StatusDisplayName });
              }
              if (stat.StatusName == 'Abandoned') {
                orderStatusesTemp.push({ optionId: stat.StatusID, optionValue: stat.StatusDisplayName });
              }


            });
            setOrderStatuses(orderStatusesTemp);
          });




        // store.dispatch({ type: "CustomSpinner:HIDE" });

        setTimeout(() => {
          setLoading(false);
        }, 1000);

      });
      }, 100);

    }

  const handleLoadMore = () => {
    // setOffSet(offsets+limit)
console.log(offsets);
console.log(limit);
console.log(orders.length);

    if (offsets != 0) {
      setLoader(true)
      console.log('loadMore================================');

      console.log(offsets);

   initial(allOrders,startDate,endDate).then((res) => {

console.log('res', res.length);

     if (res.length > 0) {
      setOffSet(offsets+limit)
       if(orders.length > 0){
         setOrders([...orders,...res]);
       }else{
         setOrders(res);
       }
     }


     setLoader(false);
   }).catch(() => {
     setLoader(false);
   });
    }

  // }

  };

  function checkMonths(diff) {

    let startDateVal = new Date(startDate);
    let endDateVal = new Date(endDate);


    var timeDiff = endDateVal.getTime() - startDateVal.getTime();


    var diffMonths = (endDateVal.getFullYear() - startDateVal.getFullYear()) * 12;
    diffMonths += endDateVal.getMonth() - startDateVal.getMonth();


    return diffMonths < diff;
}
  updateOrders = async (flag) => {

    // setOffSet(0)

  if (startDate == null) {
    showMessage({
      message: "KINGS SEEDS",
      description: "Please select a from date",
      type: "warning",
      autoHide: true,
    });
    return "VALIDATED";
  }

  if (endDate == null) {
    showMessage({
      message: "KINGS SEEDS",
      description: "Please select a to date",
      type: "warning",
      autoHide: true,
    });
    return "VALIDATED";
  }


  const res = await updateOrderExection(flag);
  return res;



    }


    updateOrderExection = async (flag) => {

      const validMonths = checkMonths(3);


      NetInfo.fetch().then(conG => {
        if (conG.type == 'wifi') {
          setSyncModalVisible(false);
          const syncType = 'ORDER SYNC';

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
              syncType,
              startDate,
              endDate
            ).then((res) => {
              if (res == 'ERROR') {
                console.log('Failed to');


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

          if (flag != "Proceed") {
          if (validMonths) {
            if (connectionStatus != true) {
              showMessage({
                message: "KINGS SEEDS",
                description: "Please check the Network Connection",
                type: "warning",
                autoHide: true,
              });
            } else {

              const syncType = 'ORDER SYNC';
              Main(
                loginToken,
                this.getnNewProducts,
                this.startChangeStatus,
                this.endChangeStatus,
                syncType,
                startDate,
                endDate
              ).then((res) => {
                if (res == 'ERROR') {
                  console.log('Failed to');


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
            setContentTextDes('Running the sync without Wi-Fi may affect the app\'s functionality. If you still want to proceed, tap "Proceed"')
          }

        }else{

          if (flag == "Proceed") {
            setSyncModalVisible(false);
            const syncType = 'ORDER SYNC';

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
                syncType,
                startDate,
                endDate
              ).then((res) => {
                if (res == 'ERROR') {
                  console.log('Failed to');


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
            setContentText('Please connect to a Wi-Fi network to start the initial sync');
          }

        }



        }
      })

    }


  getnNewProducts = () => {
    // blank method
  };


  startChangeStatus = () => {
    IdleTimerManager.setIdleTimerDisabled(true);
    // what should happen when starting the download sync
    setLoading(true);
  };

  endChangeStatus = () => {
    console.log('Ending download sync');
    IdleTimerManager.setIdleTimerDisabled(false);
setLoader(false)

    showMessage({
      message: "KINGS SEEDS",
      description: "Download order sync is successful",
      type: "success",
      autoHide: true,
    });

    remount('initial');
    // initial(allOrders).then((res) => {
    //   setOrders(res);
    //   setInitialOrders(res);
    //   setSelectedOrders(res);


    //   getOrderStatuses().then((res) => {


    //     // console.log('====================================');
    //     // console.log("com");
    // //     console.log('====================================');



    //     let orderStatusesTemp = [];
    //     orderStatusesTemp.push({ optionId: 0, optionValue: "All" });
    //     res.map(stat => {
    //       orderStatusesTemp.push({ optionId: stat.StatusID, optionValue: stat.StatusDisplayName });
    //     });
    //     setOrderStatuses(orderStatusesTemp);


    // //   // select the initial one
    // setSelectedStatus(0);

    // setLoading(false);
    // showMessage({
    //   message: "KINGS SEEDS",
    //   description: "Download order sync is successful",
    //   type: "success",
    //   autoHide: true,
    // });





    //   });

    //   // store.dispatch({ type: "CustomSpinner:HIDE" });

    // });






  };


  orderReMount = () => {
    // setOrders([])
setTimeout(() => {
  initial(allOrders, startDate, endDate, flag).then((res) => {
    if (res.length > 0) {

      if(orders.length > 0){
        setOrders(res);
      }
    }

    setTimeout(() => {
      setLoading(false);
      setOffSet(offsets+limit)
      setButtonTab(0)
    }, 1000);

  });
}, 1000);



  }


  function getMonthDifference(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    return end.diff(start, 'months');
  }



  // main operation - get data
  async function initial(allOrders, startDate, endDate, flag) {
    const payload = {
      section: "ORDERS",
      opration: "GET",
      data: {
        offsets: flag == 'initial' ? 0 : offsets,
        limit: limit,
        adminCustomerID,
        orderBy: "OrderDate DESC",
        allOrders,
        startDate: flag == 'initial' ? null : startDate,
        endDate: flag == 'initial' ? null : endDate
      },
    };

    const newpro = await DataAdapter(payload);
    return newpro;
  }

    // main operation - get data
    async function initialTest() {
      const payload = {
        section: "TEST",
        opration: "SYNC",
        data: '',
      };

      const newpro = await DataAdapter(payload);
      return newpro;
    }


    // main operation - upload orders
    async function uploadOrdersAdapter(ordersSync) {
      const payload = {
        section: "ORDERS",
        opration: "SYNC UPLOAD",
        data: { adminCustomerID, ordersSync },
      };

      const newpro = await DataAdapter(payload);
      return newpro;
    }


    // main operation - update after sync
    async function updateOrderAfterUpload(orderResult) {
      const payload = {
        section: "ORDERS",
        opration: "UPDATE ORDER AFTER UPLOAD",
        data: { orderResult },
      };

      const newpro = await DataAdapter(payload);
      return newpro;
    }


    async function updateOrderItemAfterUpload(orderResult) {
      const payload = {
        section: "ORDERS",
        opration: "UPDATE ORDER ITEM AFTER UPLOAD",
        data: orderResult,
      };

      const newpro = await DataAdapter(payload);
      return newpro;
    }


    async function getOrderStatuses() {
      const payload = {
        section: "ORDERS",
        opration: "GET ORDER STATUSES",
        data: '',
      };

      const newpro = await DataAdapter(payload);
      return newpro;
    }


  function isOrderUnpaid(order) {
    let unpaidStatus = _.find(orderStatuses, {'optionValue': 'Unpaid'});
    return (order.all.OrderStatusID === unpaidStatus?.optionId);
  }


  function isOrderNew(order) {
    let newStatus = _.find(orderStatuses, {'optionValue': 'New'});
    return (order.all.OrderStatusID === newStatus?.optionId);
  }


  function showPayButton(order) {
    // console.log('-------------unpaid--------------------');
    // console.log(isOrderUnpaid(order));
    return (order.all.OrderPaymentOptionID == 3 && (order.isOffline || isOrderUnpaid(order) || isOrderNew(order))) //3-sagepay
  }




  async function proceedToPay(order) {
    if (!connectionStatus) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Need an active internet connection to proceed!',
        type: 'warning',
        autoHide: true,
      });
    } else {
      store.dispatch({type: 'CustomSpinner:SHOW'});

      try {
        if (order.isOffline) {
          const payload = {
            section: 'ORDERS',
            opration: 'GET FULL ORDER',
            data: {orderId: order.all.OrderID},
          }
          const orderData = await DataAdapter(payload);

          if ((orderData.billingAddress ?? null) == null) {
            throw new Error("Invalid Billing Address");
          } else if ((orderData.shippingAddress ?? null) == null) {
            throw new Error("Invalid Shipping Address");
          }

          let data = {
            ...orderData.mainObject,
            OrderBillingAddress: orderData.billingAddress,
            OrderShippingAddress: orderData.shippingAddress,
            OrderItems: [],
            CustomerShippingAddress: null
          }

          // can only add shipping addresses offline. therefore no need to check the billing address
          if ((orderData.shippingAddress.LocalCustomerAddressID ?? null) != null) {
            let addressRes = await GetDataTableValues("local_com_address", `AddressID=${orderData.shippingAddress.LocalCustomerAddressID}`, "*");
            if (addressRes != "") {
              if (addressRes.item(0).WebAddressID != null) { // address synced after the order created while the address is offline
                data.OrderShippingAddress.CustomerAddressID = addressRes.item(0).WebAddressID;
                data.OrderShippingAddress.LocalCustomerAddressID = null;
                //update CustomerAddressID
                await RawQuery(`UPDATE local_com_orderaddress
                  SET CustomerAddressID = ${addressRes.item(0).WebAddressID}, LocalCustomerAddressID = null
                  WHERE AddressID = ${orderData.shippingAddress.AddressID}`);
              } else { // address still offline
                data.CustomerShippingAddress = {
                  AddressID: addressRes.item(0).AddressID,
                  AddressCustomerID: addressRes.item(0).AddressCustomerID,
                  AddressAccCode: addressRes.item(0).AddressAccCode,
                  AddressPersonalName: addressRes.item(0).AddressPersonalName,
                  AddressLine1: addressRes.item(0).AddressLine1,
                  AddressLine2: addressRes.item(0).AddressLine2,
                  AddressLine3: addressRes.item(0).AddressLine3,
                  AddressLine4: addressRes.item(0).AddressLine4,
                  AddressCity: addressRes.item(0).AddressCity,
                  AddressCountryID: addressRes.item(0).AddressCountryID,
                  AddressZip: addressRes.item(0).AddressZip,
                  AddressPhone: addressRes.item(0).AddressPhone,
                  IsDefaultBilling: false,
                  IsDefaultShipping: false
                };
              }
            } else {
              throw new Error("Failed to get offline shipping address");
            }
          }

          if (orderData.subObject != null) {
            orderData.subObject.map(item => {
              data.OrderItems.push(item)
            })
          }

          let apiRes = await createOrder(data);
          //update WebOrderID
          await RawQuery(`UPDATE local_com_order
          SET WebOrderID = ${apiRes[0].webOrderID}
          WHERE OrderID = ${apiRes[0].appOrderID}`);
          //update billing WebOrderAddressID
          await RawQuery(`UPDATE local_com_orderaddress
          SET WebOrderAddressID = ${apiRes[0].orderBillingAddress.webOrderAddressID}, AddressOrderID = ${apiRes[0].webOrderID}
          WHERE AddressID = ${apiRes[0].orderBillingAddress.appOrderAddressID}`);
          //update shipping WebOrderAddressID
          await RawQuery(`UPDATE local_com_orderaddress
          SET WebOrderAddressID = ${apiRes[0].orderShippingAddress.webOrderAddressID}, AddressOrderID = ${apiRes[0].webOrderID}
          WHERE AddressID = ${apiRes[0].orderShippingAddress.appOrderAddressID}`);
          if(apiRes[0].customerShippingAddress != null) {
            //update WebAddressID
            await RawQuery(`UPDATE local_com_address
              SET WebAddressID = ${apiRes[0].customerShippingAddress.webAddressID}, ReadyToSync = 0
              WHERE AddressID = ${apiRes[0].customerShippingAddress.appAddressID}`);
            //update CustomerAddressID
            await RawQuery(`UPDATE local_com_orderaddress
              SET CustomerAddressID = ${apiRes[0].customerShippingAddress.webAddressID}, LocalCustomerAddressID = null
              WHERE AddressID = ${apiRes[0].orderShippingAddress.appOrderAddressID}`);
          }
          //update WebOrderItemIDs
          for (let index = 0; index < apiRes[0].orderItems.length; index++) {
            await RawQuery(`UPDATE local_com_orderitem
          SET WebOrderItemID = ${apiRes[0].orderItems[index].webOrderItemID}, OrderItemOrderID = ${apiRes[0].webOrderID}
          WHERE OrderItemID = ${apiRes[0].orderItems[index].appOrderItemID}`);
          }

          store.dispatch({
            type: 'SET_BILLING_INFO',
            payload: {
              deliveryPrice: 0,
              deliveryTax: 0,
              shippingAddress: null,
              billingAddress: null,
              deliveryOption: null,
              paymentType: 'sagepay',
              orderID: order.all.OrderID,
              webOrderID: apiRes[0].webOrderID,
              webOrderBillingAddressID: null,
              offlineOrder: false,
              orderDate: order.all.OrderDate,
              orderAPayment: false
            }
          });

          navigation.navigate("payment", {time: Date.now()});

        } else {
          store.dispatch({
            type: 'SET_BILLING_INFO',
            payload: {
              deliveryPrice: 0,
              deliveryTax: 0,
              shippingAddress: null,
              billingAddress: null,
              deliveryOption: null,
              paymentType: 'sagepay',
              orderID: order.all.OrderID,
              webOrderID: order.all.WebOrderID,
              webOrderBillingAddressID: null,
              offlineOrder: false,
              orderDate: order.all.OrderDate,
              orderAPayment: false
            }
          });

          navigation.navigate("payment", {time: Date.now()});
        }
      } catch (e) {
        // console.log("Payment creation failed: ", e);
        showMessage({
          message: 'KINGS SEEDS',
          description: 'Failed to proceed. Please try again later',
          type: 'warning',
          autoHide: true,
        });
      } finally {
        store.dispatch({type: 'CustomSpinner:HIDE'});
      }
    }
  }


  function filterResultsByDateRange(stDate, enDate) {
    let isStartDateExsist = false;
    if (stDate) {
      isStartDateExsist = true;
    }

    let isEndDateExsist = false;
    if (enDate) {
      isEndDateExsist = true;
    }

    if (isStartDateExsist & isEndDateExsist) {
      const temp_orders = [];
      initialOrders.map((order) => {
        const element_date_time = moment(order.date_time).format("YYYY-MM-DD");
        const inRange = moment(element_date_time).isBetween(stDate, enDate, 'day', '[]');

        if (inRange) {
          temp_orders.push(order);
        }
      });
      setOrders(temp_orders);
    } else {
      setOrders(initialOrders);
    }
  }



  function getOnlyOfflineOrders(){
    return orders.filter(order => order.isOffline );
  }

  function getOnlyCheckedOrders(offlineOrders){
    return offlineOrders.filter(order => order.checked );
  }


  function proceedToSync(){
    setLoading(true);
    if (connectionStatus) {
      const offlineOrders = getOnlyOfflineOrders();
      const checkedOrders = getOnlyCheckedOrders(offlineOrders);

      if (checkedOrders.length == 0) {
        setLoading(false);
        showMessage({
          message: "KINGS SEEDS",
          description:"No Any Selected Orders",
          type: "info", // sandaru = info, success, danger, warning
          autoHide: true,
        });

      }else{

        uploadOrders(checkedOrders);
        setLoading(false);
      }

      const flags = {
        main_operation: "ORDER SYNC",
        sub_operation: "INSTANT",
        status: 'DONE'
      };
      const log_added = submited('add', flags ); // create, add, read, delete
      // console.log(log_added);

    }else{
      setLoading(false);
      showMessage({
        message: "KINGS SEEDS",
        description: "Please check the Network Connection",
        type: "warning",
        autoHide: true,
      });
    }

  }



  function checkToSync(id) {
    let tempOrders = [];
    orders.map((order, i) => {

      if (order.order_id == id) {
        if (order.checked) {
          order.checked = false;
        } else {
          order.checked = true;
        }
      }
      tempOrders.push(order);
    })

    setOrders(tempOrders);
  }



  function uploadOrders(ordersToUpload){

    let ordersSync = [];
    ordersToUpload.map(order => {
      ordersSync.push(order.order_id);
    })


    ordersSync.map(orderid => {

      uploadOrdersAdapter(orderid).then((res) => {

        RawQuery(`
          UPDATE local_com_order
          SET OrderBillingAddressID = ${res.orderBillingAddress.webOrderAddressID}
          WHERE OrderID = ${res.appOrderID}
        `);

        RawQuery(`
          UPDATE local_com_order
          SET OrderShippingAddressID = ${res.orderShippingAddress.webOrderAddressID}
          WHERE OrderID = ${res.appOrderID}
        `);

        RawQuery(`
          UPDATE local_com_orderaddress
          SET WebOrderAddressID = ${res.orderBillingAddress.webOrderAddressID}
          WHERE AddressID = ${res.orderBillingAddress.appOrderAddressID}
        `);

        RawQuery(`
          UPDATE local_com_orderaddress
          SET WebOrderAddressID = ${res.orderShippingAddress.webOrderAddressID}
          WHERE AddressID = ${res.orderShippingAddress.appOrderAddressID}
        `);

        if (!res.error) {

          updateOrderAfterUpload(res).then((result) => {
            if(result == '1'){
              for (let i = 0; i < res.orderItems.length; i++) {
                const element = res.orderItems[i];

                let obj = {
                  orderItmId: element.appOrderItemID,
                  webOrderItmId: element.webOrderItemID,
                  webOrderID: res.webOrderID
                }

                updateOrderItemAfterUpload(obj).then((r)=>{
                  console.log(r);
                })

              }
              if(offsets != 0){
                setOffSet(0)
              }
              orderReMount();
              showMessage({
                message: "KINGS SEEDS",
                description: "Order(s) uploaded successfully!",
                type: "success",
                autoHide: true,
              });

            }

          });
        }else{
          setLoading(false);
          showMessage({
            message: "KINGS SEEDS",
            description: 'Order Sync Failed - ' + orderid,
            type: "warning",
            autoHide: true,
          });
        }
      });

    })






  }
// const handleLoadMore = async () => {
//   let offset = offsets + 1;
//     setOffSet(offset)
//     const res1 = await RawQuery(`SELECT * FROM local_com_order LIMIT 10 OFFSET :${1}`);
//    console.log('1111111111111111111111111111111111111111111111111111111111 ', res1);
// }




  const renderItem = ({ item }) => {


    if (buttonTab == 0) {
        if (selectedStatus == 0) {
          return <AllOrderRender object={item} />;
        }

        if (selectedStatus == item.all.OrderStatusID) {
          return <AllOrderRender object={item} />;
        }

    }

    if (buttonTab == 1) {
      if (item.isOffline) { // all offline orders
        return <OfflineOrderRender object={item} />;
      }

    }

  };


  const _selectcontent = () => {

    return

    // const orderElements = orders.map((e) => {

    //   // console.log('====================================');
    //   // console.log(e);
    //   // console.log('====================================');

    //   if (buttonTab == 0) { // all orders

    //     if (selectedStatus == 0) {
    //       return <AllOrderRender object={e} />;
    //     }

    //     if (selectedStatus == e.all.OrderStatusID) {
    //       return <AllOrderRender object={e} />;
    //     }

    //   }

    //   if (buttonTab == 1) {
    //     if (e.isOffline) { // all offline orders
    //       return <OfflineOrderRender object={e} />;
    //     }

    //   }




    // });


    // const passedOrderElements = orderElements.filter(e => e != undefined);

    // if (passedOrderElements.length == 0) {
    //     return (<View
    //       style={{
    //         backgroundColor: '#fff3cd',
    //         height: hp('4.5'),
    //         width: wp('94'),
    //         marginTop: hp('2'),
    //         alignSelf: 'center',
    //         borderRadius: wp('1'),
    //         borderColor: '#ffecb5',
    //         borderWidth: wp('0.2'),
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text style={{color: '#664d03', fontSize: hp('1.6')}}>
    //       Orders not found. Please select a date range and click 'Download Orders'
    //       </Text>
    //     </View>);


    //   }else{
    //     return passedOrderElements;
    //   }



  };





  function AllOrderRender(props) {
    let e = props.object;
    let index = props.index;
    return (
      <View style={styles.footerCardView} key={e.order_id}>
        <View style={styles.cartItemTextView}>
          <View style={styles.cardTxtView1}>
            <Text style={styles.cardTxt} allowFontScaling={false}>
             {e.order_ref}
            </Text>
            <Text style={styles.cardSubMainTxt} allowFontScaling={false}>
            { momentUTSLocal(e.date_time) }
            </Text>
          </View>

          <View style={styles.subView}>
            <Text
              style={[styles.subcardTxt, {color: 'black'}]}
              allowFontScaling={false}>
              {e.status}
            </Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.subcardTxtPrice} allowFontScaling={false}>
              £{GetDecimal(e.order_total).toFixed(2)}
            </Text>
          </View>

          {showPayButton(e) ? (
            //   <View style={styles.iconView}>
            //   <TouchableOpacity
            //  style={{
            //    width: wp('12'),
            //    height:hp('3.5'),
            //    backgroundColor:'white',
            //    borderRadius:wp('1'),
            //    borderColor:"#1ED18C",
            //    borderWidth:wp('0.2'),
            //    justifyContent:'center',
            //    alignItems:'center'
            //  }}
            //  onPress={()=>{
            //    proceedToPay(e);
            //  }}
            //  >
            //    <Text
            //     style={{
            //       fontSize:hp('1.2'),
            //       color:"#1ED18C"
            //     }}>Pay</Text>
            //  </TouchableOpacity>
            //  </View>
            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.grnBtn}
                onPress={()=>{
                     proceedToPay(e);
                   }}>
                <Image source={crdtCard} style={styles.cardImg} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.eyeBtn}
                onPress={() => {
                   // this.props.navigation.navigate('storeCartsView')
                   console.log('view order id : '+e.order_id );
                   // navigation.navigate("home", {
                   //   screen: "vieworder",
                   // });
                   navigation.navigate("vieworder", { orderId: e.order_id, pageFlag: 'ALL' });
                   // navigation.navigate("home", {
                   //   screen: "ViewOrder",
                   // });
                   // navigation.navigate("");
                   // navigation.navigate('storeNew', {
                   //   tab: 2,
                   //   subTabVal: 'viewOrder',
                   //   orderId: e.order_id,
                   //   pageFlag: 'ALL'
                   // });
                }}>
                <Image source={viewicon} style={styles.cardImg} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.eyeBtn}
                onPress={() => {
                  // this.props.navigation.navigate('storeCartsView')
                  console.log('view order id : '+e.order_id );
                  // navigation.navigate("home", {
                  //   screen: "vieworder",
                  // });
                  navigation.navigate("vieworder", { orderId: e.order_id, pageFlag: 'ALL' });
                  // navigation.navigate("home", {
                  //   screen: "ViewOrder",
                  // });
                  // navigation.navigate("");
                  // navigation.navigate('storeNew', {
                  //   tab: 2,
                  //   subTabVal: 'viewOrder',
                  //   orderId: e.order_id,
                  //   pageFlag: 'ALL'
                  // });
                }}>
                <Image source={viewicon} style={styles.cardImg} />
              </TouchableOpacity>
              {/* <TouchableOpacity activeOpacity={0.9} style={styles.grnBtn}
              onPress={() => addToCart(e) }

            >
             <Image source={crtIcon} style={styles.cardImg} />
            </TouchableOpacity> */}
            </View>
          )}
        </View>
      </View>
    );
  }

  // const renderItem = (e) =>{
  //   // console.log('====================================');
  //   // console.log(e.item.all);
  //   // console.log('====================================');
  //   return(
  //     <View style={styles.footerCardView} key={e.item.order_id}>
  //     <View style={styles.cartItemTextView}>
  //       <View style={styles.cardTxtView1}>
  //         <Text style={styles.cardTxt} allowFontScaling={false}>
  //           {e.item.order_ref}
  //         </Text>
  //         <Text style={styles.cardSubMainTxt} allowFontScaling={false}>
  //           {moment(e.item.date_time).format('DD-MM-YYYY HH:mm:ss')}
  //         </Text>
  //       </View>

  //       <View style={styles.subView}>
  //         <Text
  //           style={[styles.subcardTxt, {color: 'black'}]}
  //           allowFontScaling={false}>
  //           {e.item.status}
  //         </Text>
  //       </View>
  //       <View style={styles.subView}>
  //         <Text style={styles.subcardTxtPrice} allowFontScaling={false}>
  //           £{GetDecimal(e.item.order_total).toFixed(2)}
  //         </Text>
  //       </View>
  //       {showPayButton(e.item) ? (
  //         <View style={styles.iconView}>
  //           <TouchableOpacity
  //             activeOpacity={0.9}
  //             style={styles.grnBtn}
  //             onPress={()=>{
  //                  proceedToPay(e.item);
  //                }}>
  //             <Image source={crdtCard} style={styles.cardImg} />
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             activeOpacity={0.9}
  //             style={styles.eyeBtn}
  //             onPress={() => {
  //             }}>
  //             <Image source={viewicon} style={styles.cardImg} />
  //           </TouchableOpacity>
  //         </View>
  //       ) : (
  //         <View style={styles.iconView}>
  //           <TouchableOpacity
  //             activeOpacity={0.9}
  //             style={styles.eyeBtn}
  //             onPress={() => {
  //               console.log('view order id : '+e.item.order_id );
  //               navigation.navigate("vieworder", { orderId: e.item.order_id, pageFlag: 'ALL' });
  //             }}>
  //             <Image source={viewicon} style={styles.cardImg} />
  //           </TouchableOpacity>
  //         </View>
  //       )}
  //     </View>
  //   </View>
  //   )
  // }


  function OfflineOrderRender(props) {
    let e = props.object;

    return (
      <View style={styles.footerCardView} key={e.order_id}>
        <View style={styles.cartItemTextView}>

          {
           !showPayButton(e) ? (
              <View style={styles.checkboxView}>
                <Checkbox.Android
                  status={e.checked ? "checked" : "unchecked"}
                  color={colors.primaryColor}
                  onPress={() => {
                    checkToSync(e.order_id);
                  }}
                />
              </View>
            ) : null
          }
          <View style={styles.cardTxtView1}>
            <Text style={styles.cardTxt} allowFontScaling={false}>
              {e.order_ref}
            </Text>
            <Text style={styles.cardSubMainTxt} allowFontScaling={false}>
            { momentUTSLocal(e.date_time) }
            </Text>
          </View>


        <View style={styles.subView}>
          <Text
            style={[styles.subcardTxt, { color: "black" }]}
            allowFontScaling={false}
          >
            {e.status}
          </Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.subcardTxtPrice} allowFontScaling={false}>
            £{(e.order_total).toFixed(2)}
          </Text>
        </View>

        {showPayButton(e) ? (
            //   <View style={styles.iconView}>
            //   <TouchableOpacity
            //  style={{
            //    width: wp('12'),
            //    height:hp('3.5'),
            //    backgroundColor:'white',
            //    borderRadius:wp('1'),
            //    borderColor:"#1ED18C",
            //    borderWidth:wp('0.2'),
            //    justifyContent:'center',
            //    alignItems:'center'
            //  }}
            //  onPress={()=>{
            //    proceedToPay(e);
            //  }}
            //  >
            //    <Text
            //     style={{
            //       fontSize:hp('1.2'),
            //       color:"#1ED18C"
            //     }}>Pay</Text>
            //  </TouchableOpacity>
            //  </View>
            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.grnBtn}
                onPress={()=>{
                     proceedToPay(e);
                   }}>
               <Image source={crdtCard} style={styles.cardImg} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.eyeBtn}
                onPress={() => {
                  // this.props.navigation.navigate('storeCartsView')

                  navigation.navigate('storeNew', {
                    tab: 2,
                    subTabVal: 'viewOrder',
                    orderId: e.order_id,
                    pageFlag: 'ALL'
                  });
                }}>
                <Image source={viewicon} style={styles.cardImg} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.eyeBtn}
                onPress={() => {
                  // this.props.navigation.navigate('storeCartsView')

                  navigation.navigate('storeNew', {
                    tab: 2,
                    subTabVal: 'viewOrder',
                    orderId: e.order_id,
                    pageFlag: 'ALL'
                  });
                }}>
                <Image source={viewicon} style={styles.cardImg} />
              </TouchableOpacity>
              {/* <TouchableOpacity activeOpacity={0.9} style={styles.grnBtn}
              onPress={() => addToCart(e) }

            >
             <Image source={crtIcon} style={styles.cardImg} />
            </TouchableOpacity> */}
            </View>
          )}


        </View>
      </View>
    )
  }




  const offlinebtnView =()=>{
    return (
      <TouchableOpacity
      disabled={loading}
      onPress={() => proceedToSync()}
        style={{
          width: wp("25"),
          height: hp("4"),
          position: "absolute",
          right: 0,
          borderRadius:wp('1'),
          borderWidth:wp('0.1'),
          borderColor:'#1ED18C',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row'
        }}
      >
        <View
        style={{
          width:wp('3'),
          height:hp('3.5'),
          marginRight:wp('1'),
          justifyContent:'center',
          alignItems:'center'
        }}
        >
          <Image source={refreshsync} style={{
            height:hp('2.2'),
            resizeMode:"contain",
          }} />
        </View>
        <Text
        style={{
         color:'#1ED18C',
         fontSize:hp('1.5')
        }}
        >Upload</Text>
      </TouchableOpacity>
    );
  }

  const allBtnView =()=>{
    return(
      <View>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#1ED18C' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={orderStatuses}
          maxHeight={hp('30')}
          activeColor="#e6fff0"
          labelField="optionValue"
          valueField="optionId"
          placeholder={!isFocus ? 'Select order type' : '...'}
          searchPlaceholder="Search..."
          value={selectedStatus}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedStatus(item.optionId);
            setIsFocus(false);
          }}
        />


<TouchableOpacity
        onPress={() => {
          updateOrders('DOWNLOAD').then(() =>{
            // remount()
          })
        }}
          style={styles.downloadButton}
        >
          <View
          style={{
            width:wp('3'),
            height:hp('3.5'),
            marginRight:wp('1'),
            justifyContent:'center',
            alignItems:'center'
          }}
          >
            <Image source={refreshsync} style={{
              height:hp('2.2'),
              resizeMode:"contain",
            }} />
          </View>
          <Text
          style={{
          color:'#1ED18C',
          fontSize:hp('1.5')
          }}
          >Download</Text>
        </TouchableOpacity>





      </View>
    )
  }


  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
      <Back />
      <View style={styles.titleView}>
            <View style={styles.contactTitle}>

              <Text style={styles.titleTxt} allowFontScaling={false}>
                All Orders
              </Text>


            </View>
          </View>

        <CustomSpinner />
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />


{/* <ConfirmationBox
        showHide={syncModalVisible}
        yes={() => updateOrders("Proceed")}
        no={() => setSyncModalVisible(false)}
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
          borderRadius: 10,
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
          setSyncModalVisible(false);
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
            width: '100%',
            height: hp("4.5"),
            marginTop: hp("1"),
            // zIndex: 1000
            }}>
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
                setSyncModalVisible(false);
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "black" }}>Close</Text>
            </TouchableOpacity>


                  </View>
                  <View style={{
                    flex: 1,
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
                const syncType = 'ORDER SYNC';

                Main(
                  loginToken,
                  this.getnNewProducts,
                  this.startChangeStatus,
                  this.endChangeStatus,
                  syncType,
                  startDate,
                  endDate
                ).then((res) => {
                  if (res == 'ERROR') {


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

                setSyncModalVisible(false)


                // const syncType = 'ORDER SYNC';
                // NetInfo.fetch().then(conG => {
                //   if (conG.type == 'wifi') {



                //     if (connectionStatus != true) {
                //       showMessage({
                //         message: "KINGS SEEDS",
                //         description: "Please check the Network Connection",
                //         type: "warning",
                //         autoHide: true,
                //       });
                //     } else {
                //       Main(
                //         loginToken,
                //         this.getnNewProducts,
                //         this.startChangeStatus,
                //         this.endChangeStatus,
                //         syncType
                //       );
                //     }
                //     setSyncModalVisible(false)
                //   }else{
                //     checkDb().then(res => {
                //      if (res == 0) {
                //       showMessage({
                //         message: "KINGS SEEDS",
                //         description: "Please check your connection",
                //         type: "warning",
                //         autoHide: true,
                //       });
                //      }else{
                //       if (connectionStatus != true) {
                //         showMessage({
                //           message: "KINGS SEEDS",
                //           description: "Please check the Network Connection",
                //           type: "warning",
                //           autoHide: true,
                //         });
                //       } else {
                //         Main(
                //           loginToken,
                //           this.getnNewProducts,
                //           this.startChangeStatus,
                //           this.endChangeStatus,
                //           syncType
                //         );
                //       }
                //       setSyncModalVisible(false)
                //      }
                //     })

                //   }


                // })
              }}
            >
              <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>Proceed</Text>
            </TouchableOpacity>
                  </View>
          </View>



      </ConfirmDialog>


        <View style={styles.titleButtonView}>
          <View style={styles.buttonView}>
            {listTabVals_.map(e => (
              <View style={styles.buttonView1}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    sty.tabButton,
                    buttonTab === e.val && sty.tabButtonActive,
                  ]}
                  onPress={() => setTabFilter(e.val)}>
                  <Text
                    style={[
                      sty.textStyle,
                      buttonTab === e.val && sty.textStyleActive,
                    ]}>
                    {e.status}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.dateView}>
            <TouchableOpacity
              style={{
                width: '49%',
                height: date_height,
                justifyContent: 'center',
                borderRadius: wp('1'),
                marginRight: '2%',
                backgroundColor: 'white',
                alignItems: 'center',
                borderColor: '#1ED18C',
                borderWidth: wp('0.2'),
                flexDirection: 'row',
              }}
              onPress={() => showDatePicker('startDate')}>
              <Text style={{color: '#1ED18C'}}>
                {startDate != null ? startDate : 'From'}
              </Text>
              <View
                style={[
                  {
                    marginLeft: '10%',
                  },
                  startDate != null ? {display: 'none'} : null,
                ]}>
                <Image source={calicn} style={styles.cardImg} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '49%',
                height: date_height,
                justifyContent: 'center',
                borderRadius: wp('1'),
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: '#1ED18C',
                borderWidth: wp('0.2'),
                flexDirection: 'row',
              }}
              onPress={() => showDatePicker('endDate')}>
              <Text style={{color: '#1ED18C'}}>
                {endDate != null ? endDate : 'To'}
              </Text>

              <View
                style={[
                  {
                    marginLeft: '10%',
                  },
                  endDate != null ? {display: 'none'} : null,
                ]}>
                <Image source={calicn} style={styles.cardImg} />
              </View>
            </TouchableOpacity>
            {/* <DatePicker
              style={{
                width: "49%",
                height: date_height,
                justifyContent: "center",
                borderRadius: wp("1"),
                marginRight: "2%",
                backgroundColor: "white",
              }}
              date={startDate}
              mode="date"
              placeholder="From Date"
              androidMode="default"
              format="YYYY-MM-DD"
              minDate="2021-01-01"
              maxDate="2045-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: 10,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  //marginLeft: 36,
                  height: date_height,
                  borderRadius: wp("1"),
                  borderColor: "#1ED18C",
                  borderWidth: wp("0.2"),
                },
                dateText: {
                  fontSize: date_txt,
                  color: "#1ED18C",
                  //  marginRight: wp("3"),
                },
                placeholderText: {
                  fontSize: date_pl,
                  color: "#1ED18C",
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                setStartDate(date);
                filterResultsByDateRange(date, endDate);
              }}
            /> */}
            {/* <DatePicker
              style={{
                width: "49%",
                height: date_height,
                justifyContent: "center",
                borderRadius: wp("1"),
                backgroundColor: "white",
              }}
              date={endDate}
              mode="date"
              placeholder="To Date"
              androidMode="default"
              format="YYYY-MM-DD"
              minDate="2021-01-01"
              maxDate="2045-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: 10,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  //marginLeft: 36,
                  height: date_height,
                  borderRadius: wp("1"),
                  borderColor: "#1ED18C",
                  borderWidth: wp("0.2"),
                },
                dateText: {
                  fontSize: date_txt,
                  color: "#1ED18C",
                  //  marginRight: wp("3"),
                },
                placeholderText: {
                  fontSize: date_pl,
                  color: "#1ED18C",
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                setEndDate(date);
                filterResultsByDateRange(startDate, date);
              }}
            /> */}
          </View>
        </View>

        {startDate != null && endDate != null ? (
          <View
            style={{
              width: '92%',
              marginBottom: hp('1'),
              height: hp('2'),
              flexDirection:'row',
            }}>

            <Text
              style={{
                fontSize: hp('1.5'),
                color: '#979797',
              }}>
              Selected{' '}
              <Text
                style={{
                  color: '#1ED18C',
                }}>
                {moment(startDate).format("DD-MM-YYYY")}
              </Text>
              {' '}
              to{' '}
              <Text
               style={{
                color: '#1ED18C',
              }}>
              {moment(endDate).format("DD-MM-YYYY")}
                {/* <Text
                 onPress={()=>{
                  setEndDate(null)
                }}
                style={[{
                  fontWeight: 'bold',
                  color: 'red',
                }, endDate == null ? {display:'none'} : null
                ]}
                > X </Text> */}
              </Text>
            </Text>
            <TouchableOpacity
                onPress={()=>{
                   setStartDate(null);
                   setEndDate(null);
                   setOrders([]);
                   setOffSet(0);
                   // setTimeout(() => {
                     console.log('handleDateRange', offsets);

                     remount('initial');
                  //  filterResultsByDateRange(null, null);
                }}

                style={[{ height:hp('2'),
                width:wp('5'),
                alignItems:'center'}, startDate == null ?{display:'none'}: null ]}
                >
                <Image source={cross} style={styles.cardImgcross} />
                </TouchableOpacity>
          </View>
        ) : null}

        <View style={{width: '92%', height: hp('4'), marginBottom: hp('1')}}>
          {buttonTab == 0
            ? allBtnView()
            : buttonTab == 1
            ? offlinebtnView()
            : null}
        </View>



        <View style={{width: '100%', height: hp('73')}}>
          <OrientationLoadingOverlay
                  visible={loading}
                  color="white"
                  indicatorSize="large"
                  messageFontSize={24}
                  message="Loading..."
                  />


          {orders.length != 0 ? (
                 <View style={styles.listViewArea}>
    <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                initialNumToRender={10}
                windowSize={6}
                // onEndReached={handleLoadMore}
                onEndReached={buttonTab != '1' ? handleLoadMore : null}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => (
                  <View style={{ width: '100%', height: 20, marginBottom: 10 }}>
                    {loader && <ActivityIndicator size="large" color="#1ED18C" />}
                  </View>
                )}
              />
                </View>
              ) : (
                <View style={styles.emptyAlertBox}>
                  <View
                    style={{
                      width: wp("92"),
                      backgroundColor: "#fff3cd",
                      height:hp('4'),
                      justifyContent:'center',
                      alignItems:'center',
                      borderRadius:wp('1'),
                      borderWidth:wp('0.2'),
                      borderColor:'#ffeeba'
                    }}
                    >
                      <Text
                      style={{
                      fontSize :hp('1.5'),
                      color:'#856404'
                      }}
                      >
  Orders not found. Please select a date range and click 'Download Orders'
                      </Text>
                    </View>
                </View>

              )}
        </View>



        {buttonTab == 1 ? (
          <View style={{flexDirection: 'row', flex: 1, marginTop: 100}}>
            <View style={{flex: 3}}></View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => proceedToSync()}
              title={'Proceed Sync'}
              style={{
                backgroundColor: '#1ED18C',
                padding: 10,
                borderRadius: 20,
                flex: 1,
                height: 40,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Proceed Sync
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
export default connect(mapStateToProps, {})(AllOrders);

const sty = StyleSheet.create({
  tabButtonActive: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: hp("3.5"),
    width: "98%",
    backgroundColor: colors.primaryColor,
  },
  textStyleActive: {
    color: "white",
    textAlign: "center",
    fontSize: txt_size,
  },
  tabButton: {
    borderRadius: wp("2.1"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("4"),
    width: "98%",
  },
  textStyle: {
    color: "#979797",
    textAlign: "center",
    fontSize: txt_size,
  },
});
