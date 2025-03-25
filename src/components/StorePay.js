import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from "react-native";
import Styles from "../style/StorePayStyle";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";
import {Dropdown} from "react-native-element-dropdown";
import DataAdapter from "../offline/localData/DataAdapter";
import {GetDecimal} from "../utils/ValidationHelper";
import {store} from "../../configureStore";
import {showMessage} from "react-native-flash-message";
import {GetDataTableValues} from "../offline/Services/DataHelper";
import {useSelector} from "react-redux";
import {getAddresses} from "../actions/AddressActions";
import _ from "lodash";
import {callCreateOrder} from "../utils/createOrder";
import CustomSpinner from "./common/CustomSpinner";

import * as colors from "../style/Common/ColorsStyle"

const { ids, styles } = Styles;

const filter = require("../assets/view.png");
const search = require("../assets/BlueLeft.png");

export const StorePay = ({navigation}) => {
  const paymentTypeList = [
    {
      "value": "Invoice Payment",
      "label": "Invoice Payment",
    },
  ];
  const [cVal, setCVal] = useState(paymentTypeList[0].value);
  const [isFocus, setIsFocus] = useState(false);
  const [accBal, setAccBal] = useState(0);
  const [payAmount, setPayAmount] = useState("");
  const [payRef, setPayRef] = useState("");
  const [payNote, setPayNote] = useState("");

  const connectionStatus = useSelector((s) => s.loading.connectionStatus);
  const accCode = useSelector((s) => s.findStore.itemCode);

  async function getAccNote(code_) {
    const payload = {
      section: "",
      opration: "ACCOUNT NOTES DETAILS",
      data: code_,
    };
    return await DataAdapter(payload);
  }

  async function proceedToPayment() {
    if (!connectionStatus) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Device is not connected to the internet.',
        type: 'warning',
        autoHide: true,
      });
    } else if (!(/^\d{1,8}(\.\d{1,4})?$/.test(payAmount.trim()))) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Please enter a valid payment amount',
        type: 'warning',
        autoHide: true,
      });
    } else if (GetDecimal(payAmount.trim()) <= 0) {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Payment amount must be greater than 0',
        type: 'warning',
        autoHide: true,
      });
    } else if (payRef.trim() == "") {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Payment reference cannot be empty',
        type: 'warning',
        autoHide: true,
      });
    } else if (payNote.trim() == "") {
      showMessage({
        message: 'KINGS SEEDS',
        description: 'Payment notes cannot be empty',
        type: 'warning',
        autoHide: true,
      });
    } else {
      store.dispatch({type: 'CustomSpinner:SHOW'});

      try {
        let paymentProductRes = await GetDataTableValues("local_com_sku", "SKUNumber='MK001'", "*");
        if (paymentProductRes != "") {
          let addressRes = await getAddresses();
          if (addressRes && addressRes.addresses) {
            let defaultBillingAddress = null;
            let defaultShippingAddress = null;

            defaultBillingAddress = _.find(addressRes.addresses, {'addressIsBillingDefault': true}) ?? null;
            if (defaultBillingAddress == null) {
              defaultBillingAddress = _.find(addressRes.addresses, {'addressIsBilling': true}) ?? null;
            }

            defaultShippingAddress = _.find(addressRes.addresses, {'addressIsShippingDefault': true}) ?? null;
            if (defaultShippingAddress == null) {
              defaultShippingAddress = _.find(addressRes.addresses, {'addressIsShipping': true}) ?? null;
            }

            let cartItems = [
              {
                skuid: paymentProductRes.item(0).SKUID,
                skuName: paymentProductRes.item(0).SKUName,
                unitPrice: paymentProductRes.item(0).SKUPrice,
                quantity: 1,
                totalPrice: paymentProductRes.item(0).SKUPrice,
                totalTax: 0,
                priceLine: null,
                priceOption: payNote.trim()
              }
            ];

            await callCreateOrder(cartItems, defaultBillingAddress, defaultShippingAddress, 0, 0, null, 'sagepay', false,
                payNote.trim(), payRef.trim(), true, cVal, GetDecimal(payAmount.trim()));

            navigation.navigate("payment", {time: Date.now()});
          } else {
            throw new Error('Failed to retrieve addresses');
          }
        } else {
          throw new Error('Payment SKU not found');
        }
      } catch (e) {
        console.log("Payment creation failed: ", e);
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

  useEffect(() => {
    getAccNote(accCode).then((res) => {
      setAccBal(GetDecimal(res.ItemAccBalance));
    });
  }, [accCode]);

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'always'} >
      <CustomSpinner/>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <View style={styles.contactTitle}>
            <Text style={styles.titleText} allowFontScaling={false}>
              Your Account Balance:{" "}
              <Text style={{ fontWeight: "bold", color: colors.primaryColor }}>
                £{(Math.round(accBal * 100) / 100).toFixed(2)}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.addCustomerBtn}
            onPress={() => {
              navigation.navigate('storeNew', { tab: 5, subTabVal: "viewPaymentHistory" });
            //  this.props.navigation.navigate(addNewPhotos();
            }}
          >
            <Image source={filter} style={styles.addIcon} />
            <Text style={styles.newContactTxt} allowFontScaling={false}>
              View Payment History
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentView1}>
          <View style={styles.contentSubView1}>
            <Text style={styles.itemTxt}>Payment Type:<Text style={{color:'red'}}>*</Text></Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: colors.primaryColor }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={paymentTypeList}
              activeColor="#e6fff0"
              maxHeight={paymentTypeList.length * hp("5.5")}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Payment Type" : "..."}
              searchPlaceholder="Search..."
              value={cVal}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCVal(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={styles.contentSubView2}>
            <Text style={styles.itemTxt}>Payment Amount:<Text style={{color:'red'}}>*</Text></Text>
            <View style={styles.inputView}>
              <TextInput
                allowFontScaling={false}
                style={styles.TxtInput}
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  setPayAmount(text);
                }}
                value={payAmount}
              />
            </View>
          </View>
        </View>
        <View style={styles.contentView2}>
          <Text style={styles.itemTxt}>Payment Reference:<Text style={{color:'red'}}>*</Text></Text>
          <View style={styles.inputView}>
            <TextInput
              allowFontScaling={false}
              style={styles.TxtInput}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setPayRef(text);
              }}
              value={payRef}
            />
          </View>
        </View>
        <View style={styles.contentView3}>
          <Text style={styles.itemTxt}>Payment Notes:<Text style={{color:'red'}}>*</Text></Text>
          <View style={styles.inputAreaView}>
            <TextInput
              allowFontScaling={false}
              style={styles.TxtInputArea}
              placeholderTextColor="gray"
              numberOfLines={10}
              multiline={true}
              onChangeText={(text) => {
                setPayNote(text);
              }}
              value={payNote}
            />
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.backBtn}
                            onPress={() => {
                              setPayAmount("");
                              setPayRef("");
                              setPayNote("");
                            }}>
            <Text style={[styles.btntxt, { color: colors.primaryColor }]}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn}
                            onPress={()=>{
                              proceedToPayment();
                            }}>
            <Text style={[styles.btntxt, { color: "white" }]}>PROCEED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    width: wp("65"),
    height: hp("4.5"),
    backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
  },
  btnTab: {
    width: wp(65) / 2,
    borderWidth: 0.5,
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
    borderColor: "#EFF8FB",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textTab: {
    fontSize: hp(1.7),
    color: "#20d48c",
  },
  textTabActive: {
    fontSize: hp(1.7),
    color: "#fff",
    alignItems: "center",
  },
  btnTabActive: {
    backgroundColor: "#20d48c",
  },
});
