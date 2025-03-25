import React, {useEffect, useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import Styles from "../style/StorePaymentViewStyle";
import {connect, useSelector} from "react-redux";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";

import DataAdapter from "../offline/localData/DataAdapter";
import moment from "moment";

const { ids, styles } = Styles;

const filter = require("../assets/arrowleft2x.png");

const StoreQuotesView = ({ navigation, route }) => {
  const [paymentRecords, setPaymentRecords] = useState([]);

  const adminCustomerID = useSelector(
      (state) => state.findStore.adminCustomerID
  );

  async function getPaymentHistory() {
    const payload = {
      section: "PAYMENTS",
      opration: "GET",
      data: {
        adminCustomerID,
        orderBy: "OrderID DESC"
      },
    };
    return await DataAdapter(payload);
  }

  useEffect(() => {
    getPaymentHistory().then((res) => {
      setPaymentRecords(res);
    });
  }, [route?.params]);

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt} allowFontScaling={false}>
          Payment History
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.addCustomerBtn}
          onPress={() => {
            navigation.navigate('storeNew', { tab: 5 ,subTabVal:""});
          }}
        >
          <Image source={filter} style={styles.addIcon} />
          <Text style={styles.newContactTxt} allowFontScaling={false}>
            Back To Payment Page
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containView}>
        <ScrollView style={{ width: "100%", marginBottom: hp("1") }}>
          {paymentRecords.map((e) => (
            <View style={styles.footerCardView} key={e.order_id}>
              <View style={styles.cardInsideMain}>
                <View style={styles.cardInside1}>
                  <Text style={styles.paymentRefTxt} numberOfLines={1}>{e.payment_ref}</Text>
                  <Text style={styles.paymentDateTxt}>
                    {moment(e.date_time).format("DD-MM-YYYY HH:mm:ss")}
                  </Text>
                </View>
                <View style={styles.cardInside2}>
                  <Text style={styles.paymentStatusTxt} numberOfLines={1}>{e.status}</Text>
                  <Text style={styles.paymentPriceTxt}>£{(e.order_total).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
export default connect(mapStateToProps, {})(StoreQuotesView);

let widthper = wp("100%");
let crd_wdth = 0;
let txt_size = 0;
if (widthper <= 500.0) {
  txt_size = hp("1.6");
} else {
  txt_size = hp("1.4");
}
