import React, { Component, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Styles from "../style/StoreAdressesStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import { showMessage } from "react-native-flash-message";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { _ } from "lodash";
import ConfirmationBox from "./common/ConfirmationBox";
import getBaseUrl from "../url/getBaseUrl";
import { useIsFocused } from '@react-navigation/native';
import DataAdapter from '../offline/localData/DataAdapter';
const search = require("../assets/search-green.png");

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const mapicon = require("../assets/google-maps.png");
const notesicon = require("../assets/clone-line.png");



import GetCustomerAddresses from './GetCustomerAddresses';


const { ids, styles } = Styles;



async function initial(adminCustomerID){

  const payload = {
    section: 'ADDRESS',
    opration: 'GET CUSTOMER ADDRESSES',
    data: { adminCustomerID }
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}





async function deleteAddress(id){

  const payload = {
    section: 'ADDRESS',
    opration: 'DELETE ADDRESS',
    data: { id }
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}





class StoreAdresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      offset: 0,
      pagesize: 8,
      resData: [],


      //confirmation dialog
      showdialog: false,
      deleteYes: false,
      deleteItemId: "",
      contentText: "",
      btnName: "",
    };
  }

  confirmShowHide(contentTxt) {
    console.log(
      "----------------------------------------------------------------------------"
    );
    this.setState({
      showdialog: !this.state.showdialog,
      contentText: contentTxt,
    });
  }

  closeConfirmation() {
    this.setState({
      showdialog: !this.state.showdialog,
    });
  }


  //define a separate function to get triggered on focus
  onFocusFunction = () => {
    this.setState({
      resData: [],
    });
    //this.render();
    console.log(this.props.loginToken);
    console.log("amins" + this.props.adminCustomerID);
    this.setState({
      offset: 0,
    });




    this.getStoreAdrressListLocal();
    // this.getStoreAdrressList(this.props.loginToken);
  };

  // // add a focus listener onDidMount
  // async componentDidMount() {
  //   this.focusListener = this.props.navigation.addListener("didFocus", () => {
  //     this.onFocusFunction();
  //   });
  // }

  // // and don't forget to remove the listener s
  // componentWillUnmount() {
  //   this.focusListener.remove();
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused  !== this.props.isFocused ) {
      this.onFocusFunction();
    }


    store.dispatch({ type: "CustomSpinner:HIDE" });


    // if (prevState.resData == this.state.resData) {
    //   console.log("componnet did update address----------------");
    //   this.onFocusFunction();
    //   //prevState.resData == this.state.resData
    // }

  }

  //  componentDidUpdate(prevProps) {
  //     if (prevProps.time_ == this.props.time_) {
  //     console.log("componnet did update address----------------");
  //     this.onFocusFunction();
  // //    prevProps.time_ = this.props.time_
  //     //prevState.resData == this.state.resData
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.time_, prevProps.time_)) {
  //     // only update if filterOptions changed
  //     console.log("componnet did update address----------------");
  //     this.setState({
  //       offset: 0,
  //     });
  //     this.onFocusFunction();
  //   }

  // }

  async componentDidMount() {
    console.log("componnet did address");
    this.setState({
      offset: 0,
    });
    this.onFocusFunction();
  }
  handleLoadMore = () => {
    console.log("handle more=====" + this.state.offset);
    this.setState({
      offset: this.state.offset + this.state.pagesize,
    });

    console.log("new offset " + this.state.offset);
    this.getStoreAdrressListLocal();
    // this.getStoreAdrressList(this.props.loginToken);
  };
  _onScroll = () => {
    this.handleLoadMore();
  };


  deleteAddress = async () => {
    let id =  this.state.deleteItemId;
    console.log('=====f===============================');
    console.log(id);
    console.log('====================================');
    this.closeConfirmation();
    store.dispatch({ type: "CustomSpinner:SHOW" });
    let tokn_ = this.props.loginToken;
    console.log("delee");
    if (tokn_ != "blank") {
      try {
        console.log("searchapiiii - not -blank");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokn_}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
        console.log("cusid" + this.props.adminCustomerID);
        if (this.props.adminCustomerID !== "") {
          myHeaders.append("WorkingAsCustomerID", this.props.adminCustomerID);
        }

        var raw = JSON.stringify({
          AddressID: id,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          `${getBaseUrl()}Address/DeleteCustomerAddress`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) =>  {
            store.dispatch({ type: "CustomSpinner:HIDE" });
            var productResults = JSON.parse(result);


            console.log('======================ffff==============');
            console.log(productResults);
            console.log('====================================');
            this.setState({
              resData: [],
              offset: 0,
            });


            const temp = deleteAddress(id);
            console.log('=========ddddd===========================');
            console.log(temp);
            console.log('====================================');
            this.onFocusFunction();
            this.getStoreAdrressListLocal();
           // this.getStoreAdrressList(tokn_);
          })
          .catch((error) => console.log("error1", error));
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    }
  };

  //    this.handleLoadMore();
  // };

  //      this.handleLoadMore();
  // };

  getStoreAdrressListLocal = async () => {
//
//

console.log('====================================');
console.log(this.props.adminCustomerID);
console.log('====================================');
    const res = await GetCustomerAddresses({ adminCustomerID: this.props.adminCustomerID });
    this.setState({ resData: res.addresses });
    initial(this.props.adminCustomerID).then(res => {
      // this.setState({ resData: res.addresses});
    });






  }


  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = contentSize.height - 84;
    console.log("higher " + layoutMeasurement.height + contentOffset.y);
    console.log("contect " + paddingToBottom);
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  renderRow = ({ itm }) => {
    return (
      // <ScrollView style={{ width: "100%", marginBottom: hp("10%") }}>
      //       {noteDetails_.map((e) => (
      <View style={styles.footerCardView} key={itm.AddressID}>
        <View style={styles.noteItemTextView}>
          <View style={styles.notecardIconView1}>
            <View style={styles.ashBtn}>
              <Image source={filter} style={styles.addIcon} />
            </View>

            <Text style={styles.cardTxt} allowFontScaling={false}></Text>
          </View>
          <View style={styles.notecardTxtView1}>
            <Text style={styles.cardTxt} allowFontScaling={false}>
              {itm.addressPersonalName}
            </Text>
            <Text style={styles.cardSubMainTxt} allowFontScaling={false}>
              {itm.addressLine1}
            </Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.subcardTxt} allowFontScaling={false}>
              {itm.addressPhone}
            </Text>
            <Text style={styles.emailTxt} allowFontScaling={false}>
              {itm.addressZip}
            </Text>
          </View>
        </View>
      </View>
      //   ))}
      // </ScrollView>
    );
  };

  render() {
    console.log("Render lifecycle");
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <CustomSpinner /> */}
          {/* <View style={styles.titleView}>
            <View style={styles.contactTitle}>
              <Text style={styles.titleTxt} allowFontScaling={false}>
                Address
              </Text>
            </View>
            </View> */}
          {/*
          <Back /> */}
           <ConfirmationBox
                showHide={this.state.showdialog}
                yes={() => this.deleteAddress()}
                no={() => this.closeConfirmation()}
                contentText={this.state.contentText}
              />

          <View style={styles.titleView}>
            <View style={styles.contactTitle}>
              <Text style={styles.titleTxt} allowFontScaling={false}></Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.addCustomerBtn}
              onPress={() => {
                //this.props.navigation.navigate('addStoreAddress');
                this.props.navigation.navigate("addStoreAddress", {
                  prevScreen: 'storeAddress',
                });
              }}
            >
              <Image source={filter} style={styles.addIcon} />
              <Text style={styles.newContactTxt} allowFontScaling={false}>
                Add New Address
              </Text>
            </TouchableOpacity>
          </View>

          {/* <ScrollView
            style={{ width: "100%", marginBottom: hp("10%") }}
            nestedScrollEnabled={true}
            onMomentumScrollEnd={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this._onScroll();
              }
            }}
            scrollEventThrottle={400} */}

          <ScrollView
            style={{
              width: "100%",

              marginTop: hp("2"),
              marginBottom: hp("8%"),
            }}
            nestedScrollEnabled={true}
            // onMomentumScrollEnd={({ nativeEvent }) => {
            //   if (this.isCloseToBottom(nativeEvent)) {
            //     // this._onScroll();
            //   }
            // }}
            scrollEventThrottle={400}
          >
            {this.state.resData.map((itm) => {


              let billingRight = 1;
              let shippingRight = 1;
              if (itm.addressIsBillingDefault) shippingRight = '17%';


                // console.log('----------------------------------------------------------------');
                // console.log(itm.addressIsBillingDefault);
                // console.log(itm.addressIsShippingDefault);
                // console.log('----------------------------------------------------------------');

              return (
                <View style={styles.footerCardView}
                key={itm.addressID}
                >
                  {itm.addressIsBillingDefault == true ? (
                    ( itm.addressIsShippingDefault == true ? (
                      <View
                        style={{
                          width: wp("15%"),
                          height: hp("2.5%"),
                          backgroundColor: "#2CDC0B",
                          position: "absolute",
                          justifyContent: "center",
                          right: shippingRight,
                          top: 0,
                          borderRadius: wp("1"),
                          zIndex: 999,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: wp("2"),
                            textAlign: "center",
                          }}
                        >
                          Default DA
                        </Text>
                      </View>
                    ) : null),
                    <View
                      style={{
                        width: wp("15%"),
                        height: hp("2.5%"),
                        backgroundColor: "#2CDC0B",
                        position: "absolute",
                        justifyContent: "center",
                        right: billingRight,
                        top: 0,
                        borderRadius: wp("1"),
                        zIndex: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: wp("2"),
                          textAlign: "center",
                        }}
                      >
                        Default IA
                      </Text>
                    </View>
                  ) : null}

                  {itm.addressIsShippingDefault == true ? (
                    (itm.addressIsBillingDefault == true ? (
                     <View
                     style={{
                       width: wp("15%"),
                       height: hp("2.5%"),
                       backgroundColor: "#2CDC0B",
                       position: "absolute",
                       justifyContent: "center",
                       right: billingRight,
                       top: 0,
                       borderRadius: wp("1"),
                       zIndex: 999,
                     }}
                   >
                     <Text
                       style={{
                         color: "white",
                         fontSize: wp("2"),
                         textAlign: "center",
                       }}
                     >
                       Default IA
                     </Text>
                   </View>
                 ) : null),

                    <View
                      style={{
                        width: wp("15%"),
                        height: hp("2.5%"),
                        backgroundColor: "#2CDC0B",
                        position: "absolute",
                        justifyContent: "center",
                        right: shippingRight,
                        top: 0,
                        borderRadius: wp("1"),
                        zIndex: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: wp("2"),
                          textAlign: "center",
                        }}
                      >
                        Default DA
                      </Text>
                    </View>
                  ) : null}

                  <View style={styles.noteItemTextView}>
                    <View style={styles.notecardIconView1}>
                      <Image source={mapicon} style={styles.mapIcon} />
                    </View>
                    <View style={styles.notecardTxtView1}>
                      <Text style={styles.cardTxt} allowFontScaling={false}>
                        {itm.addressPersonalName}
                      </Text>
                      <Text
                        style={styles.cardSubMainTxt}
                        allowFontScaling={false}
                      >
                        {itm.addressLine1 +
                          " " +
                          itm.addressLine2 +
                          " " +
                          itm.addressLine3 +
                          " " +
                          " " +
                          itm.addressCity +
                          " " +
                          itm.addressLine4 +
                          " " +
                          itm.addressZip}
                      </Text>
                    </View>
                    <View style={styles.subView}>
                      <Text style={styles.subcardTxt} allowFontScaling={false}>
                        {itm.addressPhone}
                      </Text>
                      {/* <Text style={styles.emailTxt} allowFontScaling={false}>
                          {itm.addressZip}
                        </Text> */}
                    </View>
                    {itm.isAddressDeletable == true ? (
                      <View style={styles.deleteView}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.deleteBtn}
                          onPress={() => {
                            let state = store.getState();
                            let internetConnectivity = state.loading?.connectionStatus;
                            if (internetConnectivity) {
                              this.setState({
                                deleteItemId:itm.addressID
                              })
                              // this.deleteAddress(itm.addressID);
                              this.confirmShowHide('Are you sure you want to delete this address?')
                            }else{
                              showMessage({
                                message: "KINGS SEEDS",
                                description:"Please check your network connection",
                                type: "warning",
                                autoHide: true,
                              });
                            }
                          }}
                        >
                          <Image source={del} style={styles.cardImg} />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}



function addressWrapper(props) {
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("store Contact---");
  }, [isFocused]);

  return <StoreAdresses {...props} isFocused={isFocused} />;


}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    adminCustomerID: state.findStore.adminCustomerID,
    itemCode: state.findStore.itemCode,
  };
};
export default connect(mapStateToProps, {})(addressWrapper);
