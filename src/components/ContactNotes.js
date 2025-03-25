import React, { Component,  useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Styles from "../style/ContactsNotesStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { useIsFocused,useScrollToTop } from '@react-navigation/native';
import { getCategories, getProduct } from "../actions/HomeScreenAction";
import NumericInput from "react-native-numeric-input";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
const search = require("../assets/search-green.png");
import NetInfo from "@react-native-community/netinfo";

import * as colors from '../style/Common/ColorsStyle';

import { checkUserRole } from "../offline/Services/UserHelper";

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");
import UpdateDiscount from "../actions/StoreNotesAction";
import DataAdapter from "../offline/localData/DataAdapter";
import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { withNavigationFocus } from 'react-navigation';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


import { showMessage } from "react-native-flash-message";
import { RawQuery } from "../offline/Services/DataHelper";

async function getAccNote(code_) {

  const payload = {
    section: "",
    opration: "ACCOUNT NOTES DETAILS",
    data: code_,
  };

  const acc_notes = await DataAdapter(payload);
  return acc_notes;
}

async function getContactNotes(id) {

  // const payload = {
  //   section: "LOCAL CONTACT NOTES",
  //   opration: "GET",
  //   data: id,
  // };

  const payload = {
    section: "LOCAL STORE COMMENTS",
    opration: "GET ALL",
    data: id,
  };
  const notes = await DataAdapter(payload);
  return notes;
}

async function Update_discounts_local(d1, d2, d3, d4, itmId, IsSynced) {
  let array = {
    ItemDiscGroup1: d1,
    ItemDiscGroup2: d2,
    ItemDiscGroup3: d3,
    ItemDiscGroup4: d4,
    ID: itmId,
    IsSynced:IsSynced
  };

  const payload = {
    section: "",
    opration: "UPDATE DISCOUNTS",
    data: array,
  };

  const up_dis = await DataAdapter(payload);
  return up_dis;
}

const noteDetails_ = [
  {
    noteId: 1,
    notetitle: "standard Lorem Ipsum passage",
    note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    date: "2021/05/05",
  },
  {
    noteId: 2,
    notetitle: "Finibus Bonorum et Malorum",
    note: "On the other hand, we denounce with righteous indignation and dislike men",
    date: "2021/12/15",
  },
  {
    noteId: 1,
    notetitle: "standard Lorem Ipsum passage",
    note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    date: "2021/05/05",
  },
  {
    noteId: 2,
    notetitle: "Finibus Bonorum et Malorum",
    note: "On the other hand, we denounce with righteous indignation and dislike men",
    date: "2021/12/15",
  },
];

const { ids, styles } = Styles;

class ContactNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      acc_details: {},
      cont_notes: [],
      pict_discount: "",
      opn_discount: "",
      f1f2_discount: "",
      mail_order: "",

      pict_discount_validation: false,
      opn_discount_validation: false,
      f1f2_discount_validation: false,
      mail_order_validation: false,

      pict_discount_disable: false,
      opn_discount_disable: false,
      f1f2_discount_disable: false,
      mail_order_disable: false,
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused  !== this.props.isFocused ) {

      this.setState({
        pict_discount: "",
        opn_discount: "",
        f1f2_discount: "",
        mail_order: "",
      });

      let code_ = this.props.itemCode;
      let res_ = prevState.cont_notes;

        getContactNotes(code_).then((res) => {

         console.log(res);
          this.setState({
            cont_notes: res,
          });
          res_ = this.state.cont_notes;
        });


      let cus_id = this.props.adminCustomerID;
      console.log('codgddgfdfde_',code_);
      getAccNote(code_).then((res) => {
        console.log('54235232res',res);
        let itm1 = "";
        let itm2 = "";
        let itm3 = "";
        let itm4 = "";
        if (res.ItemDiscGroup1 !== null) {
          itm1 = res.ItemDiscGroup1;
        }
        if (res.ItemDiscGroup2 !== null) {
          itm2 = res.ItemDiscGroup2;
        }
        if (res.ItemDiscGroup3 !== null) {
          itm3 = res.ItemDiscGroup3;
        }
        if (res.ItemDiscGroup4 !== null) {
          itm4 = res.ItemDiscGroup4;
        }


        console.log(itm1);
        console.log(itm2);
        console.log(itm3);
        console.log(itm4);


        console.log(itm3);
        this.setState({
          acc_details: res,
          pict_discount: itm1,
          opn_discount: itm2,
          f1f2_discount: itm3,
          mail_order: itm4
        });

        this.addTextIputRestrictions();
      });

    }



  }

  test = async ()=>{
    const res = await RawQuery(`SELECT Nav_Navigation from local_int_navigation`);
    for (let index = 0; index < res.length; index++) {
      console.log('EEEE----  ', res.item(index));
    }
  }
  componentDidMount() {
// this.test()
    let code_ = this.props.itemCode;

    this.setState({
      pict_discount: "",
      opn_discount: "",
      f1f2_discount: "",
      mail_order: "",
    });
    let cus_id = this.props.adminCustomerID;
    console.log(code_);
    getAccNote(code_).then((res) => {

      console.log(' res 52352',res);
      let itm1 = "";
      let itm2 = "";
      let itm3 = "";
      let itm4 = "";
      if (res.ItemDiscGroup1 !== null) {
        itm1 = res.ItemDiscGroup1;
        let itm1_;
        if (itm1 != '') {
          itm1_ = parseFloat(itm1).toFixed(2);
          itm1 =  itm1_.toString();
        }

        // itm1 =  itm1_

      }
      if (res.ItemDiscGroup2 !== null) {
        itm2 = res.ItemDiscGroup2;
        let itm2_;
        if (itm2 != '') {
          itm2_ = parseFloat(itm2).toFixed(2);
          itm2 =  itm2_.toString();
        }
        // itm2 =  itm2_;
      }
      if (res.ItemDiscGroup3 !== null) {
        itm3 = res.ItemDiscGroup3;
        let itm3_;

        if (itm3 != '') {
          itm3_ = parseFloat(itm3).toFixed(2);
          itm3 =  itm3_.toString();
        }
        // itm3 =  itm3_;
      }

      if (res.ItemDiscGroup4 !== null) {
        itm4 = res.ItemDiscGroup4;
        let itm4_;

        if (itm4 != '') {
          itm4_ = parseFloat(itm4).toFixed(2);
          itm4 =  itm4_.toString();
        }
        // itm4 =  itm4_;
      }


      console.log('----------------------------------------------------------------');
        console.log(itm1);
        console.log(itm2);
        console.log(itm3);
        console.log(itm4);
        console.log('----------------------------------------------------------------');

      console.log(itm1);
      this.setState({
        acc_details: res,
        pict_discount: itm1,
        opn_discount: itm2,
        f1f2_discount: itm3,
        mail_order: itm4,
      });

      //save discounts in redux store - cart reducer
      this.props.setDiscounts(itm1, itm2, itm3, itm4)



      this.addTextIputRestrictions();


    });

    getContactNotes(code_).then((res) => {
      console.log(res);
      this.setState({
        cont_notes: res,
      });
    });




  }
 saveBtnDisabled(){
  let isDisabled = false;

  if (this.state.pict_discount_disable) {
    isDisabled = true;
  }
  if (this.state.opn_discount_disable) {
    isDisabled = true;
  }
  if (this.state.f1f2_discount_disable) {
    isDisabled = true;
  }
  if (this.state.mail_order_disable) {
    isDisabled = true;
  }
  // return this.state.pict_discount==null&&this.state.pict_discount==null&&this.state.f1f2_discount==null?true:false
  return isDisabled;
 }
  checkDiscountVal(d){
    if(d>100.00){
      showMessage({
        message: "KINGS SEEDS",
        description: "Discount should be less than 100",
        type: "warning",
        autoHide: true,
      });
      return true;
    }else{
      return false;
    }
  }


  async addTextIputRestrictions(){

    const isUserExist = await checkUserRole('sopadmin');


    if (this.state.pict_discount == ''||this.state.pict_discount == 'null'||this.state.pict_discount == 'NaN') {
      this.setState({ pict_discount_disable: true });
    }else{
        // this.setState({ pict_discount_disable: false });
      if (isUserExist) {
        this.setState({ pict_discount_disable: true });
      }else{
        this.setState({ pict_discount_disable: false });
      }
    }

    if (this.state.opn_discount == ''||this.state.opn_discount == 'null'||this.state.opn_discount == 'NaN') {
      this.setState({ opn_discount_disable: true });
    }else{
      // this.setState({ opn_discount_disable: false });
      if (isUserExist) {
        this.setState({ opn_discount_disable: true });
      }else{
        this.setState({ opn_discount_disable: false });
      }
    }

    if (this.state.f1f2_discount == ''||this.state.f1f2_discount == 'null'||this.state.f1f2_discount == 'NaN') {
      this.setState({ f1f2_discount_disable: true });
    }else{
        // this.setState({ f1f2_discount_disable: false });
      if (isUserExist) {
        this.setState({ f1f2_discount_disable: true });
      }else{
        this.setState({ f1f2_discount_disable: false });
      }
    }

    if (this.state.mail_order == ''||this.state.mail_order == 'null'||this.state.mail_order == 'NaN' || this.state.mail_order == 0) {
      this.setState({ mail_order_disable: true });
    }else{
        // this.setState({ mail_order_disable: false });
      if (isUserExist) {
        this.setState({ mail_order_disable: true });
      }else{
        this.setState({ mail_order_disable: false });
      }
    }









  }

  async update_Discount() {
    let accId = this.props.itemCode;
    let d1 = this.state.pict_discount;
    let d2 = this.state.opn_discount;
    let d3 = this.state.f1f2_discount;
    let d4 = this.state.mail_order;
    let admCusId = this.state.adminCustomerID;
    let l_token = this.props.loginToken;

    if(d1 == ''|| d1 == 'NaN'||d1 == 'Nall'|| d2==''|| d2=='NaN'||d2 == 'Nall' || d3== ''|| d3=='NaN'||d3 == 'Nall' || d4== ''|| d4=='NaN'||d4 == 'Nall') {
      showMessage({
        message: "KINGS SEEDS",
        description: "Discount fields cannot be empty. If this customer has no discounts, enter ‘0’ in the boxes and click ‘Save’",
        type: "warning",
        autoHide: true,
      });


    }else{
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
      this.setState({
        pict_discount_validation: false,
        opn_discount_validation: false,
        f1f2_discount_validation: false,
        mail_order_validation: false
      })

        if(format.test(d1) || this.checkDiscountVal(d1)){
         this.setState({
           pict_discount_validation: true
         })

         if(this.checkDiscountVal(d1)){
          return;
         }else{
          showMessage({
            message: "KINGS SEEDS",
            description: "Enter valid discount value",
            type: "warning",
            autoHide: true,
          });
         }
         return
        }

        if(format.test(d2) || this.checkDiscountVal(d2) ){
          this.setState({
            opn_discount_validation: true
          })
          if(this.checkDiscountVal(d2)){
            return;
           }else{
            showMessage({
              message: "KINGS SEEDS",
              description: "Enter valid discount value",
              type: "warning",
              autoHide: true,
            });
           }
           return
         }

         if(format.test(d3) || this.checkDiscountVal(d3)){
          this.setState({
            f1f2_discount_validation: true
          })
          if(this.checkDiscountVal(d3)){
            return;
           }else{
            showMessage({
              message: "KINGS SEEDS",
              description: "Enter valid discount value",
              type: "warning",
              autoHide: true,
            });
           }
           return
         }

         if(format.test(d4) || this.checkDiscountVal(d4)){
          this.setState({
            mail_order_validation: true
          })
          if(this.checkDiscountVal(d4)){
            return;
           }else{
            showMessage({
              message: "KINGS SEEDS",
              description: "Enter valid discount value",
              type: "warning",
              autoHide: true,
            });
           }
           return
         }


         let state = store.getState();
         let isConnected_ = state.loading?.connectionStatus;




          if(isConnected_ == true){
            let updateStatus =  UpdateDiscount(
              accId,
              d1,
              d2,
              d3,
              d4,
              admCusId,
              l_token
            );

            updateStatus = true; // DEL

            if (updateStatus) {
              let IsSynced = 1;
              Update_discounts_local(d1, d2, d3, d4, accId, IsSynced).then((res) => {


                this.setState({
                  pict_discount_validation: false,
                  opn_discount_validation: false,
                  f1f2_discount_validation: false,
                  mail_order_validation: false,
                })
                this.addTextIputRestrictions();
              });
            }
           }else{
             let IsSynced = 0
            Update_discounts_local(d1, d2, d3, d4, accId, IsSynced).then((res) => {


              if (res == 1) {
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Saved discounts locally",
                  type: "success",
                  autoHide: true,
                });
                this.setState({
                  pict_discount_validation: false,
                  opn_discount_validation: false,
                  f1f2_discount_validation: false,
                  mail_order_validation: false,
                })
                this.addTextIputRestrictions();
              }else{
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Something went wrong when Updating",
                  type: "warning",
                  autoHide: true,
                });

              }

            });
           }




      // else{

      // }
      this.props.setDiscounts(d1, d2, d3, d4)
    }


  }

  render() {

    return (
      <View style={styles.container}>

        <View
          style={{
            width: wp("100"),
            minheight: hp("73"),
            alignItems: "center",
          }}
        >

          <KeyboardAwareScrollView
           keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}>
            <View style={styles.fieldsView} dataSet={{ media: ids.fieldsView }}>
              <View style={styles.detailsBox}>
                <View
                  style={styles.accountNotes2}
                  dataSet={{ media: ids.accountNotes2 }}
                >

                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      height: hp("7.5"),
                      //  backgroundColor:"green"
                    }}
                  >
                    <View style={styles.textView}>
                      <Text style={styles.itemTxt} allowFontScaling={false}>
                        Account Number:
                      </Text>
                    </View>
                    <View style={styles.txtInputView}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.TxtInput}
                        placeholderTextColor="gray"
                        editable={false}
                      >
                        {this.state.acc_details.ItemCode}
                      </TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      //backgroundColor: "yellow",
                      width: "100%",
                      alignItems: "center",
                      height: hp("7.5"),
                    }}
                  >

                    <View style={styles.textView}>
                      <Text style={styles.itemTxt} allowFontScaling={false}>
                        Account Name:
                      </Text>
                    </View>
                    <View style={styles.txtInputView}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.TxtInput}
                        placeholderTextColor="gray"
                        editable={false}
                      >
                        {this.state.acc_details.ItemAdminFirstName == 'null' ? '' : this.state.acc_details.ItemAdminFirstName}{" "}
                        {this.state.acc_details.ItemAdminLastName == 'null' ? '' : this.state.acc_details.ItemAdminLastName}

                      </TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      // backgroundColor: "grey",
                      width: "100%",
                      alignItems: "center",
                      height: hp("7.5"),
                    }}
                  >
                    <View style={styles.textView}>
                      <Text style={styles.itemTxt} allowFontScaling={false}>
                        Store Name:
                      </Text>
                    </View>
                    <View style={styles.txtInputView}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.TxtInput}
                        placeholderTextColor="gray"
                        editable={false}
                      >
                        {this.state.acc_details.ItemName}
                      </TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      // backgroundColor: "grey",
                      width: "100%",
                      alignItems: "center",
                      height: hp("7.5"),
                    }}
                  >
                    <View style={styles.textView}>
                      <Text style={styles.itemTxt} allowFontScaling={false}>
                        Pictorial Analysis Code:
                      </Text>
                    </View>
                    <View style={styles.txtInputView}>
                      <TextInput
                        allowFontScaling={false}
                        style={styles.TxtInput}
                        placeholderTextColor="gray"
                        editable={false}
                      >
                        {this.state.acc_details.ItemKey2}
                      </TextInput>
                    </View>
                  </View>

                </View>
                <View
                  style={styles.accountNotes}
                  dataSet={{ media: styles.accountNotes }}
                >
                  <View style={styles.textView}>
                    <Text style={styles.itemTxt} allowFontScaling={false}>
                      Account Notes:
                    </Text>
                  </View>
                  <View
                    style={styles.postaltxtInputView}
                    dataSet={{ media: ids.postaltxtInputView }}
                  >
                    <ScrollView
                      nestedScrollEnabled={true}
                      style={styles.postaltxtScrollView}
                      showsVerticalScrollIndicator={false}
                    >
                      <TextInput
                        allowFontScaling={false}
                        style={styles.postalTxtInput}
                        dataSet={{ media: ids.postalTxtInput }}
                        placeholderTextColor="gray"
                        numberOfLines={10}
                        multiline={true}
                        editable={false}
                      >
                        {this.state.acc_details.ItemNotes}
                      </TextInput>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                maxHeight: hp("15"),
                width: "100%",
                flexDirection: "column",
                borderColor: "#EEEEEE",
                // backgroundColor:"red",
                borderWidth: wp("0.3"),
                borderRadius: wp("2"),
                marginTop: hp("-1"),
                marginBottom: hp("1"),
                paddingBottom: hp("1.5"),
              }}
            >
              <View
                style={{
                  width: "96%",
                  marginLeft: "2%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={styles.textViewdis}>
                    <Text style={styles.itemTxtdis} allowFontScaling={false}>
                      Pictorial Packet:
                    </Text>
                  </View>
                  <View style={styles.InputDiscountContainerView}>
                    <View
                      style={[styles.txtInputDiscountView,
                        this.state.pict_discount_validation == true ? ({borderColor:'red'}): null
                      ]}
                      dataSet={{ media: ids.txtInputDiscountView }}
                    >
                      <TextInput
                        editable={this.state.pict_discount_disable}
                        allowFontScaling={false}
                        style={styles.TxtInputDiscount}
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        maxLength={5}
                        contextMenuHidden={true}
                        onChangeText={(text) =>
                          this.setState({
                            pict_discount: text,
                          })
                        }
                      >
                        {this.state.pict_discount === 'null'||this.state.pict_discount === 'NaN'||this.state.pict_discount === '' ? '' : this.state.pict_discount}
                      </TextInput>
                    </View>
                    <Text
                      style={{
                        width: "17%",
                        height: hp("4"),
                        fontSize: hp("2"),
                        marginTop: hp("1.5"),
                        marginLeft: wp("0.5"),
                        color: colors.primaryColor,
                      }}
                    >
                      %
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={styles.textViewdis}>
                    <Text style={styles.itemTxtdis} allowFontScaling={false}>
                      Open Pollinated:
                    </Text>
                  </View>
                  <View style={styles.InputDiscountContainerView}>
                    <View
                       style={[styles.txtInputDiscountView,
                        this.state.opn_discount_validation == true ? ({borderColor:'red'}): null
                      ]}
                      dataSet={{ media: ids.txtInputDiscountView }}
                    >
                      <TextInput
                      editable={this.state.opn_discount_disable}
                        allowFontScaling={false}
                        style={styles.TxtInputDiscount}
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        maxLength={5}
                        contextMenuHidden={true}
                        onChangeText={(text) =>
                          this.setState({
                            opn_discount: text,
                          })
                        }
                      >
                        {this.state.opn_discount === 'null'||this.state.opn_discount === 'NaN'||this.state.opn_discount === '' ? '' : this.state.opn_discount}
                      </TextInput>
                    </View>
                    <Text
                      style={{
                        width: "17%",
                        height: hp("4"),
                        fontSize: hp("2"),
                        marginTop: hp("1.5"),
                        marginLeft: wp("0.5"),
                        color: colors.primaryColor,
                      }}
                    >
                      %
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={styles.textViewdis}>
                    <Text style={styles.itemTxtdis} allowFontScaling={false}>
                      F1/F2/P&B:
                    </Text>
                  </View>
                  <View
                    style={styles.InputDiscountContainerView}
                    dataSet={{ media: ids.txtInputDiscountView }}
                  >
                    <View style={[styles.txtInputDiscountView,
                        this.state.f1f2_discount_validation == true ? ({borderColor:'red'}): null
                      ]}>
                      <TextInput
                      editable={this.state.f1f2_discount_disable}
                        allowFontScaling={false}
                        style={styles.TxtInputDiscount}
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        maxLength={5}
                        contextMenuHidden={true}
                        onChangeText={(text) =>
                          this.setState({
                            f1f2_discount: text,
                          })
                        }
                      >
                        {this.state.f1f2_discount === 'null'||this.state.f1f2_discount === 'NaN'||this.state.f1f2_discount === '' ? '' : this.state.f1f2_discount}
                      </TextInput>
                    </View>
                    <Text
                      style={{
                        width: "17%",
                        height: hp("4"),
                        fontSize: hp("2"),
                        marginTop: hp("1.5"),
                        marginLeft: wp("0.5"),
                        color: colors.primaryColor,
                      }}
                    >
                      %
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={styles.textViewdis}>
                    <Text style={styles.itemTxtdis} allowFontScaling={false}>
                      Mail Order:
                    </Text>
                  </View>
                  <View
                    style={styles.InputDiscountContainerView}
                    dataSet={{ media: ids.txtInputDiscountView }}
                  >
                    <View style={[styles.txtInputDiscountView,
                        this.state.mail_order_validation == true ? ({borderColor:'red'}): null
                      ]}>
                      <TextInput
                      editable={this.state.mail_order_disable}
                        allowFontScaling={false}
                        style={styles.TxtInputDiscount}
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        maxLength={5}
                        contextMenuHidden={true}
                        onChangeText={(text) =>
                          this.setState({
                            mail_order: text,
                          })
                        }
                      >
                        {this.state.mail_order === 'null'||this.state.mail_order === 'NaN'||this.state.mail_order === '' ? '' : this.state.mail_order}
                      </TextInput>
                    </View>
                    <Text
                      style={{
                        width: "17%",
                        height: hp("4"),
                        fontSize: hp("2"),
                        marginTop: hp("1.5"),
                        marginLeft: wp("0.5"),
                        color: colors.primaryColor,
                      }}
                    >
                      %
                    </Text>
                  </View>
                </View>


              </View>
              {this.state.pict_discount == "" ||this.state.pict_discount == 'null'||this.state.pict_discount == 'NaN'||
                this.state.opn_discount == "" ||this.state.opn_discount == 'null'||this.state.opn_discount == 'NaN'||
                this.state.f1f2_discount == "" ||this.state.f1f2_discount == 'null'||this.state.f1f2_discount == 'NaN'||
                this.state.mail_order == ""||this.state.mail_order == 'null'||this.state.mail_order == 'NaN' ? (
                <View
                  style={{
                    height: hp("3.5"),
                    width: wp("89.5"),
                    backgroundColor: "#f8d7da",
                    marginLeft: "2%",
                    marginTop: "2%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: hp("0.1"),
                    borderRadius: 7,
                    borderColor: "#f5c6cb",
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp("1.3"),
                      color: "#721c24",
                    }}
                  >
                    Please add discounts for this user{" "}
                  </Text>
                </View>
              ) : null}



                <View style={styles.saveView} dataSet={{ media: ids.saveView }}>
                  <TouchableOpacity
                  // disabled={}
                    activeOpacity={0.9}
                    style={styles.saveBtn}
                    onPress={() => {

                      let state = store.getState();
                      let isConnected_ = state.loading?.connectionStatus;
                      if(isConnected_ == true){
                        const isDisabled = this.saveBtnDisabled()
                        if (isDisabled) {
                          this.update_Discount();
                        }else{
                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Authorization Declined, Contact SOP Admin",
                            type: "warning",
                            autoHide: true,
                          });
                        }
                        console.log(isDisabled);
                      }else{
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Please check the Network Connection",
                        type: "warning",
                        autoHide: true,
                      });
                      }



// console.log(this.state.pict_discount_disable);
// console.log(this.state.opn_discount_disable);
// console.log(this.state.f1f2_discount_disable);
// console.log(this.state.mail_order_disable);

                    }}
                  >
                    <Text style={styles.newSaveTxt} allowFontScaling={false}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>


            </View>


            <View style={styles.titleView1}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.addCustomerBtn}
                dataSet={{ media: ids.addCustomerBtn }}
                onPress={() => {
                  // Actions.addContactNote();
                  // Actions.storeNew({ tab: 0, subTabVal: "addNote" });
                  this.props.navigation.navigate("storeNew", {
                    tab: 0,
                    subTabVal: "addNote",
                  });
                }}
              >
                <Image
                  source={filter}
                  style={styles.addIcon}
                  dataSet={{ media: ids.addIcon }}
                />
                <Text style={styles.newContactTxt} allowFontScaling={false}>
                  Add New Note
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemsNotesView}>
              <ScrollView
                style={{
                  width: "100%",
                  padding: 10,
                  //  marginBottom: hp("7%"),
                  minHeight: hp('10'),
                  maxHeight: hp("40"),
                }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {this.state.cont_notes.map((e) => {
                  const dateAry = e.Date.split('/');

                  // let tempDate  = moment(`${dateAry[0]}-${dateAry[1]}-${dateAry[2]}`).format("YYYY-MM-DD");

                  // let createdDate = moment(tempDate).format("DD/MM/YYYY")

                  return (<TouchableOpacity
                    key={e.Id}
                    activeOpacity={0.9}
                    style={styles.footerCardView}
                    dataSet={{ media: ids.footerCardView }}
                    onPress={() => {
                      this.props.navigation.navigate("viewContactNote", {
                        NoteTitle: e.NoteTitle,
                        Note: e.Note,
                        DateAdd: e.Date,
                        Id: e.Id,
                        navigation:this.props.navigation
                      });
                    }}
                  >
                    <View style={styles.noteItemTextView}>
                      <View style={styles.notecardTxtView1}>
                        <Text style={styles.cardTxt} allowFontScaling={false} numberOfLines={1}>
                          {e.NoteTitle}
                        </Text>
                        <Text
                          style={styles.cardSubMainTxt}
                          allowFontScaling={false}
                        >
                          {e.Note.length < 80
                            ? `${e.Note}`
                            : `${e.Note.substring(0, 90)}...`}
                        </Text>
                      </View>
                      <View style={styles.subView1}>
                        <Text
                          style={styles.notesubcardTxt}
                          allowFontScaling={false}
                        >
                          {e.Date}
                          {/* {moment('2022/5/1').format('YYYY-MM-DD')} */}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>)
                })}
              </ScrollView>
            </View>

          </KeyboardAwareScrollView>

        </View>

      </View>
    );
  }
}

function noteScreenWrapper(props) {
  const isFocused = useIsFocused();

  // useEffect(() => {

  // }, [isFocused]);

  return <ContactNotes {...props} isFocused={isFocused} />;


}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
    itemCode: state.findStore.itemCode,
    adminCustomerID: state.findStore.adminCustomerID,
  };
};

export default connect(mapStateToProps, {
  getCategories,
  getProduct,
  setDiscounts: (pictorialPacketDiscount, openPollinatedDiscount, f1f2Discount, mail_order) => dispatch => dispatch({ type: 'SET_DISCOUNTS', payload: { pictorialPacketDiscount, openPollinatedDiscount, f1f2Discount, mail_order } })
})(noteScreenWrapper);
