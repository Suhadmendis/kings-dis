import React, {Component,useState,useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
   Dimensions
} from 'react-native';
import Styles from '../style/StoreStyle';
import {connect,useSelector} from 'react-redux';
import Header from './common/Header';
import Back from './common/Back';
import Footer from './common/Footer';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ResetPasswordFunc } from "../components/ResetPassword";
import { UserInfoFunc } from "../components/UserInfo";
import { StoreOrderFunc } from "../components/StoreOrder";
import NumericInput from "react-native-numeric-input";
import { withNavigation } from "react-navigation";
import { StoreReports } from "../components/StoreReports";
import { OrderStoreAll } from "./OrderStoreAll";
import { OrderStoreArchived } from "../components/OrderStoreArchived";
import { OrderStoreComplete } from "../components/OrderStoreComplete";
import { OrderStoreProcessing } from "../components/OrderStoreProcessing";
import { OrderStoreCancelled } from "../components/OrderStoreCancelled";



import { StoreQuotesAll } from "../components/StoreQuotesAll";
import { StoreQuotesNew } from "../components/StoreQuotesNew";
import { StoreQuotesProcessed } from "../components/StoreQuotesProcessed";
import { StoreQuotesEdited } from "../components/StoreQuotesEdited";
import { StoreQuotesEmailed } from "../components/StoreQuotesEmailed";


import { AddStoreContact } from "../components/AddStoreContact";



import { StorePay } from './StorePay';
import AddressScreen from './AddressScreen';
import StoreAdresses from './StoreAdresses';
import StorePhotos from './StorePhotos';
import StoreContact from './StoreContact';
// import TabStoreAddress from './TabStoreAddress';
// import TabStorePhotos from './TabStorePhotos';

const search = require("../assets/BlueLeft.png");
const add = require('../assets/add-alt.png');
const btnFilter = require('../assets/filter.png');
const filter = require('../assets/barcode.png');

const listTab_ = [
  {
    status: "Store",
    val: 0,
  },
  {
    status: "Address",
    val: 1,
  },
  {
    status: "Orders",
    val: 2,
  },
  {
    status: "Quotes",
    val: 3,
  },
  {
    status: "Carts",
    val: 4,
  },
  {
    status: "Pay",
    val: 5,
  },
  // {
  //   status: "Address",
  //   val: 6,
  // },
  {
    status: "Contacts",
    val: 6,
  },
  {
    status: "Reports",
    val: 7,
  },
  {
    status: "Photos",
    val: 8,
  },
];

const listTabStore_ = [
  {
    status: "All",
    val: 0,
  },
  {
    status: "Archived",
    val: 1,
  },
  {
    status: "Complete",
    val: 2,
  },
  {
    status: "Processing ",
    val: 3,
  },
  {
    status: "Cancelled",
    val: 4,
  }
];

const listTabQuotes_ = [
  {
    status: "All",
    val: 0,
  },
  {
    status: "New",
    val: 1,
  },
  {
    status: "Processed",
    val: 2,
  },
  {
    status: "Edited ",
    val: 3,
  },
  {
    status: "Emailed",
    val: 4,
  }
];

const StoreScreen = ({ navigation }) => {
  const [filteredDataSet, setFilteredDataSet] = useState([]);
  const [token, setToken] = useState("blank");
  const [tabVal, setTabVal] = useState(0);
  const [loading, setLoading] = useState(true);
  const setStatusFilter = (e) => {
    setTabVal(e);
    console.log(tabVal)
  };

  const [filteredDataSet1, setFilteredDataSet1] = useState([]);
  const [token1, setToken1] = useState("blank");
  const [tabVal1, setTabVal1] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const setStatusFilters = (e) => {
    setTabVal1(e);
    console.log(tabVal1)
  };

  const [filteredDataSet2, setFilteredDataSet2] = useState([]);
  const [token2, setToken2] = useState("blank");
  const [tabVal2, setTabVal2] = useState(0);
  const [loading2, setLoading2] = useState(true);
  const setStatusFilterss = (e) => {
    setTabVal2(e);
    console.log('tabVal2 ',tabVal2)
  };

  const [showRelatedProduct, setShowRelatedProduct] = useState(1);
  const setshowRelatedProduct = (showRelatedProduct) => {
    setShowRelatedProduct (showRelatedProduct)
    console.log('showRelatedProduct' ,showRelatedProduct)
  }

  const tokn = useSelector((state) => state.login.loginToken);

  useEffect(() => {
    console.log("tokennnn---" + tokn);
    setToken(tokn);


    console.log("set tabval " + tabVal);
  }, [token]);

  useEffect(() => {
    const navFocusListener = navigation.addListener("didFocus", () => {
      setTabVal(0);
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  return (


  <SafeAreaView style={{flex: 1}}>
    <View style={Styles.container}>

      <Back />

      {/* <View style={Styles.searchViews}> */}
      <View style={Styles.titleView}>
        <Text style={Styles.titleTxt} allowFontScaling={false}>
          The Seeds Store
        </Text>
       <Text></Text>


        {/* <TouchableOpacity activeOpacity={0.9}
          // onPress={() => {
          //   this.setState({searchBarPalletOpen: true});
          // }}
          style={Styles.AddressBtn}>

            <Image source={add} style={Styles.addIcon} />
              <Text style={Styles.addText}>Add New Store</Text>
        </TouchableOpacity> */}
      </View>

    {/* </View> */}


      <ScrollView style={{ height: "100%" }}>
        <ScrollView horizontal={true} >
          <View style={sty.container}>
            <View style={sty.listTab}>
              {listTab_.map((e) => (
                <TouchableOpacity activeOpacity={0.9}
                  style={[sty.btnTab, tabVal === e.val && sty.btnTabActive]}
                  onPress={() => setStatusFilter(e.val)}
                >
                  <Text style={[sty.textTab, tabVal === e.val && sty.textTabActive]}>
                    {e.status}
                  </Text>
                </TouchableOpacity>
                ))}
              </View>
            </View>

        </ScrollView>

          {tabVal === 0 ? (
            <Text>EDIT</Text>

        ) : tabVal === 1 ? (
          // <Text style={Styles.titleTxt} allowFontScaling={false}>
          //   Edit Contact
          // </Text>
          <ScrollView>
            {/* <TabStoreAddress/> */}
          </ScrollView>
        ) : tabVal === 2 ? (
          // <Text style={Styles.titleTxt} allowFontScaling={false}>
          //   Test 01
          // </Text>

            <ScrollView style={{ height: "100%" }}>
              <TouchableOpacity activeOpacity={0.9}
                // onPress={() => {
                //   this.setState({searchBarPalletOpen: true});
                // }}
                style={Styles.AddressBtn1}>

                <Image source={add} style={Styles.addIcon} />
                <Text style={Styles.addText}>Add New Store</Text>
              </TouchableOpacity>
              <ScrollView horizontal={true} >
                <View style={sty.container}>
                  <View style={sty.listTab}>
                    {listTabStore_.map((e) => (
                    <TouchableOpacity activeOpacity={0.9}
                      style={[sty.btnTabSub, tabVal1 === e.val && sty.btnTabActiveSub]}
                      onPress={() => setStatusFilters(e.val)}
                    >
                      <Text style={[sty.textTabSub, tabVal1 === e.val && sty.textTabActiveSub]}>
                        {e.status}
                      </Text>
                    </TouchableOpacity>

                    ))}
                    <TouchableOpacity activeOpacity={0.9}
                      // onPress={() => {
                      //   this.setState({searchBarPalletOpen: true});
                      // }}
                      style={Styles.FillterBtn}>

                      <Image source={btnFilter} style={Styles.filterIcon} />
                        <Text style={Styles.addText}>Fillter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>


              {tabVal1 === 0 ? (
                <ScrollView>
                  <OrderStoreAll/>
                </ScrollView>
              ) : tabVal1 === 1 ? (
                <ScrollView>
                  <OrderStoreArchived/>
                </ScrollView>
              ) : tabVal1 === 2 ? (
                <ScrollView>
                  <OrderStoreComplete/>
                </ScrollView>
              ) : tabVal1 === 3 ? (
                <ScrollView>
                  <OrderStoreProcessing/>
                </ScrollView>
              ) : (
                <ScrollView>
                  <OrderStoreCancelled/>
                </ScrollView>
              )}

              {/* <TouchableOpacity activeOpacity={0.9}
                // onPress={() => {
                //   this.setState({searchBarPalletOpen: true});
                // }}
                style={Styles.AddressBtn}>

                <Image source={add} style={Styles.addIcon} />
                  <Text style={Styles.addText}>Add New Store</Text>
              </TouchableOpacity> */}
            </ScrollView>
        ) : tabVal === 3 ? (
          // <Text style={Styles.titleTxt} allowFontScaling={false}>
          //   Test 02
          // </Text>

          <ScrollView style={{ height: "100%" }}>
              <ScrollView horizontal={true} >
                <View style={sty.container}>
                  <View style={sty.listTab}>
                    {listTabQuotes_.map((e) => (
                    <TouchableOpacity activeOpacity={0.9}
                      style={[sty.btnTabSub, tabVal2 === e.val && sty.btnTabActiveSub]}
                        onPress={() => setStatusFilterss(e.val)}
                    >
                      <Text style={[sty.textTabSub, tabVal2 === e.val && sty.textTabActiveSub]}>
                        {e.status}
                      </Text>
                    </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              {tabVal2 === 0 ? (
                <ScrollView>
                  <StoreQuotesAll/>
                </ScrollView>
              ) : tabVal2 === 1 ? (
                <ScrollView>
                  <StoreQuotesNew/>
                </ScrollView>
              ) : tabVal2 === 2 ? (
                <ScrollView>
                  <StoreQuotesProcessed/>
                </ScrollView>
              ) : tabVal2 === 3 ? (
                <ScrollView>
                  <StoreQuotesEdited/>
                </ScrollView>
              ) : (
                <ScrollView>
                  <StoreQuotesEmailed/>
                </ScrollView>
              )}
            </ScrollView>

        ) : tabVal === 4 ? (
          <Text style={Styles.titleTxt} allowFontScaling={false}>
            Test 03
          </Text>
        ) : tabVal === 5 ? (
          // <Text style={Styles.titleTxt} allowFontScaling={false}>
          //   Test 04
          // </Text>
          <StorePay/>
        ) : tabVal === 6 ? (
          // <Text style={Styles.titleTxt} allowFontScaling={false}>
          //   Test 05
          // </Text>
          <StoreContact/>
        ) : tabVal === 7 ? (
          <Text style={Styles.titleTxt} allowFontScaling={false}>
            Test 06
          </Text>
        ) : (
          // <Text style={Styles.titleTxt} allowFontScaling={false}>
          //   Test 07
          // </Text>
          <StorePhotos/>
        )}
      </ScrollView>


    </View>
  </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};

export default connect(mapStateToProps, {})(StoreScreen);

const sty = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    width:'100%',
  },

  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    height: hp("4.5"),
    // backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
    // backgroundColor: "red"
  },

  listTabOrder: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    height: hp("4.5"),
    // backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
  },

  listTabSub: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    height: hp("4.5"),
    // backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
    // backgroundColor: "red"
  },

  listTabOrderSub: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    height: hp("4.5"),
    // backgroundColor: "#ffffff",
    borderTopLeftRadius: wp(1.8),
    borderTopRightRadius: wp(1.8),
  },

  // btnTab: {
  //   width: wp(85) / 5,
  //   borderWidth: 0.5,
  //   borderTopLeftRadius: wp(1.8),
  //   borderTopRightRadius: wp(1.8),
  //   // borderColor: "#EFF8FB",
  //   // borderBottomColor: "#EFF8FB",

  //   // backgroundColor: 'black',
  //   padding: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderBottomColor: "#20d48c",

  // },


  textTab: {
    fontSize: hp(1.7),
    color: "#20d48c",
    fontWeight:"500",
    // borderBottomColor: "red",
  },

  textTabActive: {
    fontSize: hp(1.7),
    // color: "#fff",
    color: "#20d48c",
    alignItems: "center",
    // borderBottomColor: "red",

  },

  btnTab: {
    width: wp(76) / 5,
    borderWidth: 4,
    // borderTopLeftRadius: wp(1.8),
    // borderTopRightRadius: wp(1.8),
    // borderColor: "#EFF8FB",
    borderColor: '#F9F9F9',
    // borderBottomColor: "red",
    // backgroundColor: 'black',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  btnTabActive: {
    // backgroundColor: "#20d48c",
    borderBottomColor: "#20d48c",
  },

  textTabSub: {
    fontSize: hp(1.7),
    color: "#20d48c",
    // borderBottomColor: "red",
  },
  textTabActiveSub: {
    fontSize: hp(1.7),
    color: "#fff",
    fontWeight:"500",
    // color: "#20d48c",
    alignItems: "center",
    // borderBottomColor: "red",

  },

  btnTabSub: {
    width: wp(76) / 5,
    borderWidth: 1,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),

    borderColor: "#EFF8FB",
    // borderColor: "red",
    // borderBottomColor: "red",

    // backgroundColor: 'black',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",

  },

  btnTabActiveSub: {
    backgroundColor: "#20d48c",
    // borderBottomColor: "red",
  },

});

// const mapStateToProps = (state) => {
//   return {
//     // loginToken: state.login.loginToken,
//     // productItem: state.home.productItem,
//     // titleName: state.home.titleName,
//     filterData: state.home.filterData,
//   };
// };

