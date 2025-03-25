import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Styles from "../style/AddNewAddressStyle";
//import AddNewStoreAddress from "./../actions/AddStoreAddressAction";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DataAdapter from "../offline/localData/DataAdapter";
import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { EmailValidation, ContactNumberValidation } from "../utils/ValidationHelper";
import getBaseUrl from "../url/getBaseUrl";

import {getSearchStoresDetails} from "../url/API";
import {GetTradeStoresLocal} from "../offline/localData/serviceData/GetTradeStoresLocal";

import { addAddress } from "../url/API";



import { Dropdown } from "react-native-element-dropdown";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {GetLoggedInAccountCode, GetWorkingAsCustomerID} from "../offline/Services/UserHelper";
import * as colors from '../style/Common/ColorsStyle';



const { ids, styles } = Styles;

let screenSize =wp('100');
let drpSearch = true;

if(screenSize>500){
  drpSearch = true;
}else{
  drpSearch = false
}

async function addAddressToDB(data) {

  const payload = {
    section: 'ADDRESS',
    opration: 'ADD',
    data
  }
  return await DataAdapter(payload);
}

async function getCountries() {
  const payload = {
    section: "",
    opration: "ADDRESS COUNTRIES",
    data: "",
  };

  const countries_ = await DataAdapter(payload);
  return countries_;
}

async function getStates() {
  const payload = {
    section: "",
    opration: "ADDRESS STATES",
    data: "",
  };

  const states_ = await DataAdapter(payload);
  return states_;
}



class AddStoreAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      AddressCity: "",
      AddressPersonalName: "",
      AddressCountryID: 492,
      AddressZip: "",
      AddressLine4: "",
      AddressPhone: "",
      IsDefaultBilling: false,
      IsDefaultShipping: false,
      showAdd_4: false,
      countries: [],
      allStatesList: [],
      filteredStatesList: [],
      //dropdown
      cVal: null,

      isFocusCountry: false,
      isFocusAddType: false,
      saveBtnDisable: false,
    };
  }

  componentDidMount() {

    this.setState({
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      AddressCity: "",
      AddressPersonalName: "",
      AddressCountryID: 492,
      AddressZip: "",
      AddressLine4: "",
      AddressPhone: "",
      IsDefaultBilling: false,
      IsDefaultShipping: false,
      saveBtnDisable: false,
    });


    getCountries().then((res) => {
      // let newCArr=[];
      // for (let index = 1; index < res.length; index++) {
      //   const element = res[index];
      //   let countryObj ={
      //     displayName:"",
      //     id:"",
      //     name:"",
      //     stateReq:null,
      //     value: 0
      //   }
      //   countryObj.displayName= element.displayName;
      //   countryObj.id= element.id;
      //   countryObj.name= element.name;
      //   countryObj.stateReq= element.stateReq;
      //   countryObj.value= index;

      //   newCArr.push(countryObj)
      // }

      this.setState({ countries: res });
      this.setVisibleCheck(492);
    });
    getStates().then((r) => {
      this.setState({ allStatesList: r });
      this.filterStates_(this.state.AddressCountryID);
    });

  }

  addaddressto_api_local = async data => {

    if (data.AddressPersonalName == '') {
      showMessage({
        message: "KINGS SEEDS",
        description: 'Contact name cannot be empty',
        type: "warning",
        autoHide: true,
      });
      return;
    }
    if (data.AddressLine1 == '') {
      showMessage({
        message: "KINGS SEEDS",
        description: 'Address line 1 cannot be empty',
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (data.AddressCity == '') {
      showMessage({
        message: "KINGS SEEDS",
        description: 'City/Town cannot be empty',
        type: "warning",
        autoHide: true,
      });
      return;
    }

    if (this.state.showAdd_4 == true && data.AddressLine4 == '') {
      showMessage({
        message: "KINGS SEEDS",
        description: 'County/State cannot be empty',
        type: "warning",
        autoHide: true,
      });
      return;
    }
    if (data.AddressPhone != '') {
      if (!ContactNumberValidation(data.AddressPhone)) {
        showMessage({
          message: "KINGS SEEDS",
          description: 'Contact Number is not valid',
          type: "warning",
          autoHide: true,
        });
        return;
      }
    }

    this.setState({saveBtnDisable: true});

    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    if (internetConnectivity) {
      //get data from the API if has internet
      addAddress({
        ...data,
        IsDefaultBilling: false,
        IsDefaultShipping: false,
      }).then(res => {
        if (res.address?.addressID) {
          showMessage({
            message: 'KINGS SEEDS',
            description: 'Address successfully added',
            type: 'success',
            autoHide: true,
          });
          //reloading previous screen's addresses
          // route.params.setTime(Date.now())
          res.address.readyToSync = 0;
          res.address.webAddressID = res.address.addressID;
          //adding address to local db
          addAddressToDB(res.address).then(res2 => {
            // console.log('db res', res2)
            //navigation.goBack();
            this.successMethod()
          })

        } else {
          // Alert.alert('Error', res.error)
          showMessage({
            message: 'KINGS SEEDS',
            description: res.error,
            type: 'warning',
            autoHide: true,
          });
        }
      }).catch(error => {
        showMessage({
          message: 'KINGS SEEDS',
          description: "Failed to add address",
          type: 'warning',
          autoHide: true,
        });
      })
    } else {
      //get data from database if no internet
      addAddressToDB({
        addressName: data.AddressPersonalName,
        addressPersonalName: data.AddressPersonalName,
        addressLine1: data.AddressLine1,
        addressLine2: data.AddressLine2,
        addressLine3: data.AddressLine3,
        addressLine4: data.AddressLine4,
        addressCity: data.AddressCity,
        addressCountryID: data.AddressCountryID,
        addressZip: data.AddressZip,
        addressPhone: data.AddressPhone,
        addressEnabled: 1,
        addressWebOnly: 1,
        addressIsShipping: 1,
        addressAccCode: GetLoggedInAccountCode(),
        addressCustomerID: GetWorkingAsCustomerID(),
        readyToSync: 1,
        webAddressID: null
      }).then(res2 => {
        // console.log('db res', res2)
        //route.params.setTime(Date.now())
        //navigation.goBack();
        showMessage({
          message: 'KINGS SEEDS',
          description: 'Address saved locally',
          type: 'success',
          autoHide: true,
        });
        this.successMethod()
      }).catch(error => {
        showMessage({
          message: 'KINGS SEEDS',
          description: "Failed to add address",
          type: 'warning',
          autoHide: true,
        });
      })
    }
  }

  filterStates_(c_id) {

    let arr = [];
    let arr_ = [];

     let itmId = parseInt(c_id);;
    arr = this.state.allStatesList;

  // arr.filter((p) => p.countryID == c_id).map((filtered) => arr_.push(filtered.displayName));
    //console.log(arr_);
    for (let index = 0; index < arr.length; index++) {

      const element = arr[index];
      if(element.countryID == itmId){
        arr_.push(element.displayName)
      }

    }

    this.setState({ filteredStatesList: arr_ });

  }

  setVisibleCheck(c_id) {
    let countryItem = {};
    let arr = [];
    // console.log(c_id);
    // console.log("setcvus");
    arr = this.state.countries;
    arr.filter((p) => p.id == c_id).map((filtered) => (countryItem = filtered));
  //  console.log(countryItem);
    this.setState({
      AddressCountryID: c_id,
    });
    // console.log("=======================stateReq======");
    // console.log(countryItem["stateReq"]);
    // console.log("=======================stateReq end======");
    if (countryItem["stateReq"] == 1) {
      this.setState({
        showAdd_4: true,
      });
      this.filterStates_(c_id);
    } else {
      this.setState({
        showAdd_4: false,
      });
    }
  }




  // AddNewStoreAddress = async (
  //   adminCustomerID,
  //   l_token,
  //   AddressLine1,
  //   AddressLine2,
  //   AddressLine3,
  //   AddressCity,
  //   AddressPersonalName,
  //   AddressCountryID,
  //   AddressZip,
  //   AddressLine4,
  //   AddressPhone,
  //   IsDefaultBilling,
  //   IsDefaultShipping
  // ) => {
  //   if(!ContactNumberValidation(AddressPhone)){
  //     showMessage({
  //       message: "KINGS SEEDS",
  //       description: 'Contact Number is not valid',
  //       type: "warning",
  //       autoHide: true,
  //     });
  //     return;
  //   }

  //   store.dispatch({ type: "CustomSpinner:SHOW" });
  //   if (l_token != "blank") {
  //     try {
  //       var myHeaders = new Headers();
  //       myHeaders.append("Authorization", `Bearer ${l_token}`);
  //       myHeaders.append("Content-Type", "application/json");
  //       myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
  //       if (adminCustomerID !== "") {
  //         myHeaders.append("WorkingAsCustomerID", adminCustomerID);
  //       }

  //       var raw = JSON.stringify({
  //         AddressLine1: AddressLine1,
  //         AddressLine2: AddressLine2,
  //         AddressLine3: AddressLine3,
  //         AddressCity: AddressCity,
  //         AddressPersonalName: AddressPersonalName,
  //         AddressCountryID: AddressCountryID,
  //         AddressZip: AddressZip,
  //         AddressLine4: AddressLine4,
  //         AddressPhone: AddressPhone,
  //         IsDefaultBilling: IsDefaultBilling,
  //         IsDefaultShipping: IsDefaultShipping,
  //       });

  //       var requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };

  //       fetch(
  //         `${getBaseUrl()}Address/AddEditCustomerAddress`,
  //         requestOptions
  //       )
  //         .then((response) => response.text())
  //         .then((result) => {
  //           const res = JSON.parse(result);
  //           store.dispatch({ type: "CustomSpinner:HIDE" });
  //           if (res["error"] !== "") {
  //             showMessage({
  //               message: "KINGS SEEDS",
  //               description: res["error"],
  //               type: "warning",
  //               autoHide: true,
  //             });

  //           } else {
  //             showMessage({
  //               message: "KINGS SEEDS",
  //               description: "Address Added",
  //               type: "success",
  //               autoHide: true,
  //             });
  //             this.successMethod();
  //           }
  //         })
  //         .catch((error) => console.log("api error", error));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  successMethod() {
    this.setState({
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      AddressCity: "",
      AddressPersonalName: "",
      AddressCountryID: 492,
      AddressZip: "",
      AddressLine4: "",
      AddressPhone: "",
      IsDefaultBilling: false,
      IsDefaultShipping: false,
      saveBtnDisable: false,
    });

    if(this.props.route.params.prevScreen == 'storeAddress'){
      this.props.navigation.navigate("storeNew", {
        tab: 1,
        subTabVal: "",
      });
    }else if(this.props.route.params.prevScreen == 'billing'){
      this.props.route.params.setTime(Date.now());
      this.props.navigation.goBack();
    }else{
      this.props.navigation.goBack()
    }
  }

  async addAddress() {
    //  Main();
    // console.log(this.state.AddressCountryID);
    let arr = [];
    let arr_ = [];
    let itmId = parseInt(this.state.AddressCountryID);;
    arr = this.state.allStatesList;

    //get states to an array
    for (let index = 0; index < arr.length; index++) {
      // console.log(element);
      const element = arr[index];
      if(element.countryID == itmId){
        arr_.push(element.displayName)
      }
    }

    let statecorrect = [];
    const tok = this.props.loginToken;

    if(arr_.length!=0){
      //check entered state is in the array
      for (let i = 0; i < arr_.length; i++) {
        const el = arr_[i];
        if(el == this.state.AddressLine4){
          statecorrect.push(el)
        }

      }
      if(statecorrect.length!=0){
        statecorrect = [];
        let obj = {
          AddressPersonalName: this.state.AddressPersonalName,
          AddressLine1:  this.state.AddressLine1,
          AddressLine2: this.state.AddressLine2,
          AddressLine3:  this.state.AddressLine3,
          AddressLine4:  this.state.AddressLine4,
          AddressCity: this.state.AddressCity,
          AddressCountryID:  this.state.AddressCountryID,
          AddressZip:  this.state.AddressZip,
          AddressPhone: this.state.AddressPhone,
          addressIsShipping:true,
          county: '',
          email: '',
          addressType: '',
        }

        this.addaddressto_api_local(obj)

        // await this.AddNewStoreAddress(
        //   this.props.adminCustomerID,
        //   tok,
        //   this.state.AddressLine1,
        //   this.state.AddressLine2,
        //   this.state.AddressLine3,
        //   this.state.AddressCity,
        //   this.state.AddressPersonalName,
        //   this.state.AddressCountryID,
        //   this.state.AddressZip,
        //   this.state.AddressLine4,
        //   this.state.AddressPhone,
        //   this.state.IsDefaultBilling,
        //   this.state.IsDefaultShipping
        // );
      }else{
        showMessage({
          message: "KINGS SEEDS",
          description: 'Enter valid county/state',
          type: "warning",
          autoHide: true,
        });
      }
    }else{
      let obj = {
        AddressPersonalName: this.state.AddressPersonalName,
        AddressLine1:  this.state.AddressLine1,
        AddressLine2: this.state.AddressLine2,
        AddressLine3:  this.state.AddressLine3,
        AddressLine4:  this.state.AddressLine4,
        AddressCity: this.state.AddressCity,
        AddressCountryID:  this.state.AddressCountryID,
        AddressZip:  this.state.AddressZip,
        AddressPhone: this.state.AddressPhone,
        county: '',
        email: '',
        addressType: '',
      }

      this.addaddressto_api_local(obj)
      // await this.AddNewStoreAddress(
      //   this.props.adminCustomerID,
      //   tok,
      //   this.state.AddressLine1,
      //   this.state.AddressLine2,
      //   this.state.AddressLine3,
      //   this.state.AddressCity,
      //   this.state.AddressPersonalName,
      //   this.state.AddressCountryID,
      //   this.state.AddressZip,
      //   this.state.AddressLine4,
      //   this.state.AddressPhone,
      //   this.state.IsDefaultBilling,
      //   this.state.IsDefaultShipping
      // );
    }


  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <Header /> */}
          <Back />
          <View style={styles.titleView}>
            <Text style={styles.titleTxt} allowFontScaling={false}>
              Add New Address
            </Text>
          </View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} style={{ width: "94%" }}>
            <View style={{ width: "100%", height: hp("80") }}>
              <View style={{ width: "100%", height: hp("80") }}>
                <ScrollView style={{ width: "100%" }}>
                  <View style={styles.cntactNameView}>
                    <Text style={styles.itemTxt}>
                      {" "}
                      Contact Name:<Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <View style={styles.inputView}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.TxtInput}
                        placeholderTextColor="gray"
                        onChangeText={(text) =>
                          this.setState({
                            AddressPersonalName: text,
                          })
                        }
                      >
                        {this.state.AddressPersonalName}
                      </TextInput>
                    </View>
                  </View>
                  <View style={styles.totView}>
                    <View style={styles.totsubview}>
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>
                            Address Line 1
                            <Text style={{ color: "red" }}>*</Text>
                          </Text>
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={(text) =>
                                this.setState({
                                  AddressLine1: text,
                                })
                              }
                            >
                              {this.state.AddressLine1}
                            </TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.secView2}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>Address Line 2</Text>
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={(text) =>
                                this.setState({
                                  AddressLine2: text,
                                })
                              }
                            >
                              {this.state.AddressLine2}
                            </TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.totsubview}>
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>Address Line 3</Text>
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={(text) =>
                                this.setState({
                                  AddressLine3: text,
                                })
                              }
                            >
                              {this.state.AddressLine3}
                            </TextInput>
                          </View>
                        </View>
                      </View>
                      <View style={styles.secView2}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>City/Town<Text style={{ color: "red" }}>*</Text></Text>
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={(text) =>
                                this.setState({
                                  AddressCity: text,
                                })
                              }
                            >
                              {this.state.AddressCity}
                            </TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.totsubview}>
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>Country<Text style={{ color: "red" }}>*</Text></Text>
                          <Dropdown
                            style={[
                              styles.dropdown,
                              this.state.isFocusCountry && {
                                borderColor: colors.primaryColor,
                              },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={this.state.countries}
                            activeColor="#e6fff0"
                            search = {
                              drpSearch
                            }
                            autoScroll={false}
                            maxHeight={hp("35")}
                            labelField="displayName"
                            valueField="id"
                            placeholder={
                              !this.state.isFocusCountry
                                ? "Select Country"
                                : "..."
                            }
                            searchPlaceholder="Search..."
                            value={this.state.AddressCountryID}
                            onFocus={() =>
                              this.setState({
                                isFocusCountry: true,
                              })
                            }
                            onBlur={() =>
                              this.setState({
                                isFocusCountry: false,
                              })
                            }
                            onChange={(item) => {
                              this.setState({
                                AddressCountryID: item.id,
                                isFocusCountry: false,
                                AddressLine4:"",
                                AddressZip:''
                              });
                              this.setVisibleCheck(item.id);


                            //  this.filterStates_(item.id)
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.secView2}>
                        <View style={styles.inpView}>
                          {this.state.showAdd_4 === true ? (
                            <Text
                              style={[
                                styles.itemTxt,
                              ]}
                            >
                              County/State<Text style={{ color: "red" }}>*</Text>
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.itemTxt,
                                styles.itemTxtDisable,
                              ]}
                            >
                              County/State
                            </Text>
                          )}
                          {this.state.showAdd_4 === true ? (
                            <View
                              style={[
                                styles.inputView,
                              ]}
                            >
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                editable={true}
                                onChangeText={(text) =>
                                  this.setState({
                                    AddressLine4: text,
                                  })
                                }
                              >
                                {this.state.AddressLine4}
                              </TextInput>
                            </View>
                          ) : (
                            <View
                              style={[
                                styles.inputView,
                                styles.inputDisable,
                              ]}
                            >
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                editable={false}
                                onChangeText={(text) =>
                                  this.setState({
                                    AddressLine4: text,
                                  })
                                }
                              >
                                {this.state.AddressLine4}
                              </TextInput>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={styles.totsubview}>
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          {this.state.AddressCountryID === 492 ||
                          this.state.AddressCountryID === 271 ? (
                            <Text style={styles.itemTxt}>Post Code/Zip<Text style={{ color: "red" }}>*</Text></Text>
                          ) :
                          <Text style={styles.itemTxtDisable}>Post Code/Zip</Text>
                          }

                          {this.state.AddressCountryID === 492 ||
                          this.state.AddressCountryID === 271 ? (
                            <View style={styles.inputView}>
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                editable={true}
                                onChangeText={(text) =>
                                  this.setState({
                                    AddressZip: text,
                                  })
                                }
                              >
                                {this.state.AddressZip}
                              </TextInput>
                            </View>
                          ) :
                          <View style={styles.inputDisable}>
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                editable={false}
                                onChangeText={(text) =>
                                  this.setState({
                                    AddressZip: text,
                                  })
                                }
                              >
                                {this.state.AddressZip}
                              </TextInput>
                            </View>
                          }
                        </View>
                      </View>
                      <View style={styles.secView2}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>Contact Number</Text>
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              keyboardType='numeric'
                              contextMenuHidden={true}
                              onChangeText={(text) =>
                                {
                                    let newText = '';
                                    let numbers = '0123456789';

                                    for (var i=0; i < text.length; i++) {
                                        if(numbers.indexOf(text[i]) > -1 ) {
                                            newText = newText + text[i];
                                            this.setState({
                                              AddressPhone: newText,
                                            })
                                        }
                                        else {
                                            // your call back function
                                            this.setState({
                                              AddressPhone: "",
                                            })
                                            showMessage({
                                              message: "KINGS SEEDS",
                                              description: "please enter numbers only",
                                              type: "warning",
                                              autoHide: true,
                                            });

                                        }
                                    }

                                }
                              }
                            >
                              {this.state.AddressPhone}
                            </TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/* <View style={styles.totsubview}>
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>Email Address</Text>
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                            ></TextInput>
                          </View>
                        </View>
                      </View>
                    </View> */}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.backbtn}
                  onPress={() => {
                    this.setState({
                      AddressLine1: "",
                      AddressLine2: "",
                      AddressLine3: "",
                      AddressCity: "",
                      AddressPersonalName: "",
                      AddressCountryID: 492,
                      AddressZip: "",
                      AddressLine4: "",
                      AddressPhone: "",
                      IsDefaultBilling: false,
                      IsDefaultShipping: false,
                    });


                    if(this.props.route.params.prevScreen == 'storeAddress'){
                      this.props.navigation.navigate("storeNew", {
                        tab: 1,
                        subTabVal: "",
                      });
                    }else{
                      this.props.navigation.goBack()
                    }
                  }}
                >
                  <Text style={styles.backbtnTxt}>BACK TO ADDRESS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.proceedbtn}
                  disabled={this.state.saveBtnDisable}
                  onPress={() => this.addAddress()}
                  //   onPress={() => navigation.navigate("orderSummary")}
                >
                  <Text style={styles.proceedbtnTxt}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* <Footer /> */}
        </View>
      </SafeAreaView>
    );
  }
}

const sty = StyleSheet.create({
  mainBox: {
    width: wp("92"),
    height: hp("10"),
    // backgroundColor: '#F6F6F6',
    // borderRadius: 15,
    // flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: hp("6%"),
  },
  saveBtn: {
    width: wp("92") / 2,
    height: hp("4.8"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp("2"),
    flexDirection: "row",
    //  marginTop: wp("-40"),
    alignItems: "center",
    justifyContent: "center",
  },
  backtoBtn: {
    width: wp("92") / 2,
    height: hp("4.8"),
    borderRadius: wp("2"),
    flexDirection: "row",
    //marginTop: wp("-40"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("1"),
    backgroundColor: "#fffcfc",
    borderWidth: hp("0.14"),
    borderColor: colors.primaryColor,
  },
  bakctobtnTxt: {
    fontSize: hp("1.5"),
    color: colors.primaryColor,
    // justifyContent: 'center',
  },
  savebtnTxt: {
    fontSize: hp("1.5"),
    color: "white",
    // justifyContent: 'center',
  },
  cardView: {
    width: wp("100"),
    // height: hp("83%"),
    //marginBottom: "5%",
    //  paddingBottom: hp("2"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textView: {
    width: "92%",
    height: hp("3"),
    //backgroundColor: 'red',
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: hp("1"),
  },
  txtInputView: {
    width: "92%",
    height: hp("4.5"),
    //backgroundColor: 'red',
    borderColor: "#e6e6e6",
    backgroundColor: "#fffcfc",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: hp("1"),
    marginTop: hp("0.1%"),
    borderWidth: hp("0.1"),
  },
  countryTxtInputView: {
    width: "92%",
    height: hp("4.5"),
    //backgroundColor: 'red',
    borderColor: "#e6e6e6",
    backgroundColor: "#fffcfc",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: hp("1"),
    marginTop: hp("0.9%"),
    borderWidth: hp("0.1"),
  },
  TxtInput: {
    width: "90%",
    height: hp("4.5"),
    fontSize: hp('1.8'),
    //backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
  },
  itemTxt: {
    height: hp("3"),
    fontSize: hp("1.7"),
    color: "black",
    marginTop: hp("1"),
  },
  postalTxtInput: {
    width: "90%",
    height: hp("10"),
    fontSize: hp(1.8),
    //backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  postaltxtInputView: {
    width: "85%",
    height: hp("30"),
    // backgroundColor: '#EFF8FB',
    borderColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: hp("2%"),
    borderWidth: hp("0.1"),
  },
});

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    adminCustomerID: state.findStore.adminCustomerID,
  };
};

export default connect(mapStateToProps, {})(AddStoreAddress);
