import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Styles from "../style/StoreStyle";
import { connect, useSelector } from "react-redux";
import { getStoreTabValue } from "../actions/StoreAction";
import Header from "./common/Header";
import Back from "./common/Back";
import Footer from "./common/Footer";
import { TabView, SceneMap } from "react-native-tab-view";
import {Fonts} from '../utils/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";

import * as colors from '../style/Common/ColorsStyle';

import { useIsFocused } from '@react-navigation/native';



import { ResetPasswordFunc } from "../components/ResetPassword";
import { UserInfoFunc } from "../components/UserInfo";
import { StoreOrderFunc } from "../components/StoreOrder";
import NumericInput from "react-native-numeric-input";
import { withNavigation } from "react-navigation";
import { StoreReports } from "../components/StoreReports";

import { OrderStoreArchived } from "../components/OrderStoreArchived";
import { OrderStoreComplete } from "../components/OrderStoreComplete";
import { OrderStoreProcessing } from "../components/OrderStoreProcessing";
import { OrderStoreCancelled } from "../components/OrderStoreCancelled";
import AddContactNote from "../components/AddContactNote";
import { StorePay } from "./StorePay";
import AddressScreen from "./AddressScreen";


import StoreOrders from "./StoreOrders";
import StoreAdresses from "./StoreAdresses";
import StorePhotos from "./StorePhotos";
import StoreContact from "./StoreContact";
import ContactNotes from "./ContactNotes";
import StoreQuotes from "../components/StoreQuotes";
import StoreCarts from "../components/StoreCarts";
import AddNewPhotos from "../components/AddNewPhotos";
import StoreCartsView from "../components/StoreCartsView";
import StoreContactForm from "./StoreContactForm";


import AddStoreContact from "../components/AddStoreContact";
import EditStoreContact from "../components/EditStoreContact";

import StoreQuotesView from "../components/StoreQuotesView";

import BlankComponent from "../components/common/BlankComponent";

import StoreOrdersView from "../components/StoreOrdersView";
import ViewPaymentHistory from "../components/ViewPaymentHistory";

import ViewContactNote from "./ViewContactNote";


const search = require("../assets/BlueLeft.png");
const add = require("../assets/add-alt.png");
const btnFilter = require("../assets/filter.png");
const filter = require("../assets/barcode.png");
const arrow = require("../assets/left-arrow.png");

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
  // {
  //   status: "Reports",
  //   val: 7,
  // },
  {
    status: "Photos",
    val: 8,
  },
];

const listSubViews_ = [
  {
    status: "addPhotos",
    val: "a",
  },
];

class StoreNewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      tabVal: 0,
      tabVal1: 0,
      tabVal2: 0,
      subTabVal: "",

      // contact related states

      contactFormViewType: '',
      editContactid: '',
      offlineTab: '',
      allOrders: false,
      cartId: '',
      quoteId: '',
      cartName: '',
      quoteName: '',
      orderId: '',
      quoteStatus: '',
      pageFlag: ''
    };
  }

  // state = {
  //   tabVal: 0,
  //   tabVal1: 0,
  //   tabVal2: 0,
  //   subTabVal:"a"
  // }

  componentDidUpdate(prevProps, prevState) {


    if (prevProps.route !== this.props.route) {
      this.setState({
        tabVal: this.props.route?.params?.tab,
        subTabVal: this.props.route?.params?.subTabVal,
      });
      this.setTabvalueFunc(this.props.route?.params?.tab);

      if (this.props.route?.params?.storeContactVt) {
        this.setState({
          contactFormViewType: this.props.route?.params?.storeContactVt,
        });
      }

      if (this.props.route?.params?.editContactid) {
        this.setState({
          editContactid: this.props.route?.params?.editContactid,
        });
      }

      if(this.props.route?.params?.offlineTab){
        this.setState({ offlineTab: this.props.route?.params?.offlineTab });
      }

      if(this.props.route?.params?.allOrders){
        this.setState({ allOrders: this.props.route?.params?.allOrders });
      }

      if(this.props.route?.params?.cartId){
        this.setState({ cartId: this.props.route?.params?.cartId });
      }

      if(this.props.route?.params?.quoteId){
        this.setState({ quoteId: this.props.route?.params?.quoteId });
      }

      if(this.props.route?.params?.cartName){
        this.setState({ cartName: this.props.route?.params?.cartName });
      }

      if(this.props.route?.params?.quoteName){
        this.setState({ quoteName: this.props.route?.params?.quoteName });
      }

      if(this.props.route?.params?.orderId){
        this.setState({ orderId: this.props.route?.params?.orderId });
      }

      if(this.props.route?.params?.pageFlag){
        this.setState({ pageFlag: this.props.route?.params?.pageFlag });
      }

      if(this.props.route?.params?.status){
        this.setState({ quoteStatus: this.props.route?.params?.status });
      }

    }

  }

  // //define a separate function to get triggered on focus
  // onFocusFunction = () => {
  //   console.log('focus listner======================'+this.props.router.params.tab);
  //   console.log(this.focusListener);
  //   this.setState({ tabVal: 1});
  //   this.setState({ tabVal: this.props.router.params.tab });
  // };

  //add a focus listener onDidMount
  async componentDidMount() {

    console.log('fsdfsdfdsdfdsdfdsdfdsdfdsdf');
    this.setState({
      tabVal: this.props.route?.params?.tab,
      subTabVal: this.props.route?.params?.subTabVal,
    });

    // console.log('teblu======================'+this.props.route?.params?.tab);

    // console.log('teblu======================'+this.props.route?.params?.storeContactVt);

    if (this.props.route?.params?.storeContactVt) {
      this.setState({
        contactFormViewType: this.props.route?.params?.storeContactVt,
      });

    }

    if (this.props.route?.params?.editContactid) {
      this.setState({ editContactid: this.props.route?.params?.editContactid });
    }

    if(this.props.route?.params?.offlineTab){
      this.setState({ offlineTab: this.props.route?.params?.offlineTab });
    }
    if(this.props.route?.params?.allOrders){
      this.setState({ allOrders: this.props.route?.params?.allOrders });
    }

    if(this.props.route?.params?.cartId){
      this.setState({ cartId: this.props.route?.params?.cartId });
    }

    if(this.props.route?.params?.quoteId){
      this.setState({ quoteId: this.props.route?.params?.quoteId });
    }

    if(this.props.route?.params?.cartName){
      this.setState({ cartName: this.props.route?.params?.cartName });
    }

    if(this.props.route?.params?.quoteName){
      this.setState({ quoteName: this.props.route?.params?.quoteName });
    }


    if(this.props.route?.params?.orderId){
      this.setState({ orderId: this.props.route?.params?.orderId });
    }

    if(this.props.route?.params?.pageFlag){
      this.setState({ pageFlag: this.props.route?.params?.pageFlag });
    }

    if(this.props.route?.params?.status){

      this.setState({ quoteStatus: this.props.route?.params?.status });
    }

  }

  //and don't forget to remove the listenerh
  // componentWillUnmount() {
  //   this.focusListener();
  // }

  renderTabs() {
    var tabId = this.state.tabVal;
    var subTabValId = this.state.subTabVal;


    var offlineTab = this.state.offlineTab;
    var allOrders = this.state.allOrders;
    var cartId = this.state.cartId;
    var quoteId = this.state.quoteId;

    var cartName = this.state.cartName;
    var quoteName = this.state.quoteName;

    var orderId = this.state.orderId;
    var pageFlag = this.state.pageFlag;

    var quoteStatus = this.state.quoteStatus;

    var Notetitle = this.props.route?.params?.NoteTitle;
    var Note = this.props.route?.params?.Note;
    var DateAdd = this.props.route?.params?.DateAdd;
    var Id = this.props.route?.params?.Id;

    // console.log('========subval id=============='+subTabValId);



    if (tabId == 0 && subTabValId == "addNote") {
      return <AddContactNote navigation={this.props.navigation} />;
    }
    else if (tabId == 0 && subTabValId == "viewNote") {
      return (
        <ViewContactNote
          NoteTitle={Notetitle}
          Note={Note}
          DateAdd={DateAdd}
          Id={Id}
          navigation={this.props.navigation}
        />
      );
    }
    else if (tabId == 0) {
      return <ContactNotes navigation={this.props.navigation} />;
    } else if (tabId == 1) {
      return (
        <StoreAdresses navigation={this.props.navigation} time_={Date.now()} />
      );
    }
    else if (tabId == 2 && subTabValId == "viewOrder") {


        return <StoreOrdersView navigation={this.props.navigation} orderId={orderId} pageFlag={pageFlag}  />;
    }
    else if (tabId == 2) {


      return <StoreOrders navigation={this.props.navigation} offlineTab={offlineTab} allOrders={allOrders} />;





    } else if (tabId == 3 && subTabValId == "viewQuotes") {


      return <StoreQuotesView navigation={this.props.navigation} quoteId={quoteId}  quoteName={quoteName} status={quoteStatus} />;
    } else if (tabId == 3) {

      return <StoreQuotes navigation={this.props.navigation} />;
    } else if (tabId == 4 && subTabValId == "viewCart") {
      return <StoreCartsView navigation={this.props.navigation} cartId={cartId} cartName={cartName} />;
    } else if (tabId == 4) {
      return <StoreCarts navigation={this.props.navigation} />;

    }
    else if (tabId == 5 && subTabValId == "viewPaymentHistory") {
      return <ViewPaymentHistory navigation={this.props.navigation} />;
    }
    else if (tabId == 5) {
      return <StorePay navigation={this.props.navigation} />;
      // return <StorePay />;
    } else if (tabId == 6 && subTabValId == "contactForm") {
      if (this.state.contactFormViewType == "Addcontact") {
        return (
          <AddStoreContact navigation={this.props.navigation}/>
        );
      }

      if (this.state.contactFormViewType == "Editcontact") {
        return (
          <EditStoreContact
            navigation={this.props.navigation}
            viewtype={this.state.contactFormViewType}
            editContactid={this.state.editContactid}
          />
        );
      }
    } else if (tabId == 6) {
      return <StoreContact navigation={this.props.navigation} />;
    } else if (tabId == 7) {
      // return <BlankComponent navigation={this.props.navigation} />;
    } else if (tabId == 8 && subTabValId == "addPhoto") {
      return <AddNewPhotos navigation={this.props.navigation} />;
    } else if (tabId == 8) {
      return <StorePhotos navigation={this.props.navigation} />;
    }
  }

  setTabvalueFunc(value) {
    this.setState({ tabVal: value });
    this.props.getStoreTabValue(value);
  }

  goback_(){
    if(this.state.subTabVal!=''){
      this.props.navigation.navigate("storeNew", {
        tab: this.state.tabVal,
        subTabVal: "",
      });
    }else{
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>
          <View
            style={styles.backView}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.backBtn}
              onPress={() => {
                this.goback_();
               // this.props.navigation.goBack();
              }}
            >
              <View style={styles.icnView}>
                <Image source={arrow} style={styles.backIcon} />
              </View>
              <Text
                style={styles.backText}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.titleView}>
            { this.state.pageFlag != 'ALL' ? (
              <Text style={Styles.titleTxt} allowFontScaling={false}>
                {/* The Seeds Store */}
                {this.props.selItemName}
              </Text>
            ) : (
              <Text style={Styles.titleTxt} allowFontScaling={false}>
              {'All Orders'}
              </Text>
            ) }
          </View>
          <View
            style={{
              height: "4%",
              width: "94%",
            }}
          >

            { this.state.pageFlag != 'ALL' ? (
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.listTab}>
                {listTab_.map((e) => (
                  <TouchableOpacity
                    style={[
                      styles.btnTab,
                      this.state.tabVal === e.val && styles.btnTabActive,
                    ]}
                    onPress={() => this.setTabvalueFunc(e.val)}
                  >
                    <Text
                      style={[
                        styles.textTab,
                        this.state.tabVal === e.val && styles.textTabActive,
                      ]}
                    >
                      {e.status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            ) : (
              <View></View>
            ) }



          </View>
          <View
            style={{
              height: "95%",
              width: "100%",
            }}
          >
            {this.renderTabs()}
          </View>
          {/* {this.renderTabs()} */}
        </View>
      </SafeAreaView>
    );
  }
}

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    width: "100%",
  },

  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    height: hp("3.6"),
    borderBottomWidth: hp("0.15"),
    borderColor: "#F1F1F1",

    //  backgroundColor: "#9A9C9C",
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
    //fontSize: hp(1.7),
    fontSize: wp("2.2"),
    color: colors.tertiaryColor,
    fontWeight: "500",
    // borderBottomColor: "red",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: wp("2.2"),
    },
    "@media (max-width: 450px)": {
      fontSize: wp("3"),
    },
  },

  textTabActive: {
    //fontSize: hp(1.7),
    fontSize: wp("2.2"),
    // color: "#fff",
    color: colors.primaryColor,
    alignItems: "center",
    // borderBottomColor: "red",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: wp("2.2"),
    },
    "@media (max-width: 450px)": {
      fontSize: wp("3"),
    },
  },

  btnTab: {
    // width: wp('76') / 5,
    width: wp("94") / 9,
    // borderTopLeftRadius: wp(1.8),
    // borderTopRightRadius: wp(1.8),
    // borderColor: "#EFF8FB",
    // borderBottomColor: "red",
    // backgroundColor: 'black',
    //padding: 10,
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("94") / 9,
    },
    "@media (max-width: 450px)": {
      width: wp("126") / 9,
    },
  },

  btnTabActive: {
    borderBottomWidth: hp("0.3"),
    // backgroundColor: "#20d48c",
    borderBottomColor: colors.primaryColor,
  },

  textTabSub: {
    fontSize: hp(1.7),
    color: colors.primaryColor,
    // borderBottomColor: "red",
  },
  textTabActiveSub: {
    fontSize: hp(1.7),
    color: "#fff",
    fontWeight: "500",
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


   //back btn style
   backBtn: {
    //width: wp('10'),
    backgroundColor: "transparent",
    height: hp("3"),
    borderColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    //marginTop:hp('1'),
    justifyContent: 'space-evenly',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:35,
      width: 85,
      borderRadius: 5,
      borderWidth: wp("0.15%"),
    },
    "@media (max-width: 450px)": {
      height:25,
      width: 55,
      borderRadius: 4,
      borderWidth: wp("0.2%"),
    },
  },
  backText: {
    color: colors.primaryColor,
    fontFamily: Fonts.PoppinsRegular,
    fontSize: hp("1.8%"),
    marginRight:6,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: hp("1.5%"),
    },
    "@media (max-width: 450px)": {
      fontSize: wp("2.8%"),
    },
  },
  icnView: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backIcon: {
    resizeMode:'contain',
    "@media (max-width: 1600px) and (min-width: 450px)": {
      aspectRatio: 0.8,
    },
    "@media (max-width: 450px)": {
      aspectRatio: 1,
    },
  },
  backView: {
    width: wp("40"),
    height: hp("3"),
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: hp("1"),
    alignSelf: "flex-start",
    marginLeft: wp("3"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      height:35,
    },
    "@media (max-width: 450px)": {
      height:25,
    },
  },
});



function StoreNewScreenWrapper(props) {
  const isFocused = useIsFocused();
  return <StoreNewScreen {...props} isFocused={isFocused} />;


}


const mapStateToProps = (state) => {
  return {
    userName: state.login.userName,
    password: state.login.password,
    selItemName: state.findStore.selItemName,
    tabValue: state.store.tabValue,
    itemCode: state.findStore.itemCode,
  };
};

export default connect(mapStateToProps, {
  getStoreTabValue,
})(StoreNewScreenWrapper);
