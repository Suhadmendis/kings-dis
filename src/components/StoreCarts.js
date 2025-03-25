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
  StyleSheet,
  Dimensions,
} from "react-native";
import Styles from "../style/StoreCartsStyle";
import { Actions } from "react-native-router-flux";
import moment from "moment";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DataAdapter from "../offline/localData/DataAdapter";
import { useIsFocused } from "@react-navigation/native";
import {GetBoolean} from "../utils/ValidationHelper";
import { momentUKLocal, momentUTSLocal } from "./common/DateTimeGeneration";

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");

// const contactDetails_ = [
//     {
//       contactId: 1,
//       name: "akila Blackurn",
//       date: "25/02/2021 06:14:02",
//       phone: "Pre-season",
//       price: "£58.00",
//     },
//     {
//       contactId: 2,
//       name: "John Doe",
//       date: "25/02/2021 06:14:02",
//       phone: "Pre-season",
//       price: "£58.00",
//     },
//     {
//       contactId: 3,
//       name: "Claude MacMahn",
//       date: "25/02/2021 06:14:02",
//       phone: "",
//       price: "£58.00",
//     },
//   ];

const StoreCarts = ({ navigation }) => {
  const [token, setToken] = useState("blank");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [carts, setCarts] = useState([]);


  const customerID = useSelector(
    (state) => state.findStore.adminCustomerID
  );

  const tokn = useSelector((state) => state.login.loginToken);
  useEffect(() => {
    setCarts([]);
    console.log("store Contact---" + tokn);
    setToken(tokn);





    initial().then((res) => {
      console.log(res);
      getQuotesToPrivent().then((res1) => {


        filterCarts(res, res1);
      });
    });




  }, [isFocused]);


  const filterCarts = (cartIds, quoteIds) => {

    const filteredCarts = cartIds.filter(c => {

      const findQuoteID = quoteIds.filter(id => id == c.ShoppingCartID);


      if (findQuoteID.length == 0) {
        return c;
      }

    });


    setCarts(filteredCarts);



  }


  // main operation - get data
  async function initial() {
    const payload = {
      section: "CART",
      opration: "GET",
      data: { customerID }
    };



    const newpro = await DataAdapter(payload);
    return newpro;
  }

  // main operation - get data
  async function getQuotesToPrivent() {
    const payload = {
      section: "QUOTE",
      opration: "GET IDS",
      data: "",
    };

    const newpro = await DataAdapter(payload);
    return newpro;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={Styles.container}>
        <View style={Styles.titleView}></View>

        <ScrollView
          style={{ width: "100%", marginTop: hp("1"), marginBottom: hp("10%") }}
        >
          {carts.length != 0 ? (
            carts.map((e) => (
              <View style={Styles.footerCardView} key={e.ShoppingCartID}>
                <View style={Styles.cartItemTextView}>
                  <View style={Styles.cardTxtView1}>
                    <Text style={Styles.cardTxt} allowFontScaling={false}>
                      {e.ShoppingCartNote}
                    </Text>
                    <Text
                      style={Styles.cardSubMainTxt}
                      allowFontScaling={false}
                    >
                      { momentUKLocal(e.ShoppingCartLastUpdate) }
                    </Text>
                  </View>
                  <View style={Styles.subView}>
                    {e.ShoppingCartIsPreSeason == 1 ? (
                      <Text style={Styles.subcardTxt} allowFontScaling={false}>
                        Pre-Season
                      </Text>
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                  <View style={Styles.subView}>
                    <Text
                      style={Styles.subcardTxtPrice}
                      allowFontScaling={false}
                    >
                      £{e.SaveCartLineTotal.toFixed(2)}
                    </Text>
                  </View>
                  <View style={Styles.iconView}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={Styles.eyeBtn}
                      onPress={() => {
                       // this.props.navigation.navigate('storeCartsView')
                        navigation.navigate('storeNew', { tab: 4, subTabVal: "viewCart", cartId: e.ShoppingCartID, cartName: e.ShoppingCartNote });
                      }}
                    >
                      <Image source={viewicon} style={Styles.cardImg} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity activeOpacity={0.9}
                      style={Styles.ashBtn}

                    >
                      <Image source={edticon} style={Styles.cardImg} />
                    </TouchableOpacity> */}


                  </View>
                </View>
              </View>
            ))
          ) : (
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
              <Text style={{ color: "#664d03", fontSize: hp("1.6") }}>
                No results found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {})(StoreCarts);

let widthper = wp("100%");
let crd_wdth = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("75");
} else {
  crd_wdth = wp("65");
}

const sty = StyleSheet.create({});
