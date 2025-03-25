import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Back from "./common/Back";
import Styles from "../style/AddStoreContactStyle.js";
import { RadioButton, RadioGroup } from "react-native-flexi-radio-button";
import { Dropdown } from "react-native-element-dropdown";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import DataAdapter from "../offline/localData/DataAdapter";

import { showMessage } from "react-native-flash-message";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EmailValidation, ContactNumberValidation } from "../utils/ValidationHelper";
import * as colors from '../style/Common/ColorsStyle';
const filter = require("../assets/add2x.png");

const { ids, styles } = Styles;

async function addContact(data) {
  const payload = {
    section: "LOCAL CONTACTS",
    opration: "ADD",
    data,
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}


async function updateContact(data){

  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'UPDATE',
    data
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function searchContact(data){
  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'SEARCH',
    data
  }

  const newpro = await DataAdapter(payload);
  return newpro;
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

const EditStoreContact = ({ navigation,editContactid }) => {
  //  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  //dropdown
  const [cVal, setCVal] = useState("");
  const [addType, setAddType] = useState(null);


  const [cLabel, setCLabel] = useState("United Kingdom");

  const [stateReq, setStateReq] = useState(true);
  const [countries, setCountries] = useState([]);

  const [contactName, setContactName] = useState("");
  const [addLine1, setAddLine1] = useState("");
  const [addLine2, setAddLine2] = useState("");
  const [addLine3, setAddLine3] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postCode, setPostCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [jobrole, setJobrole] = useState("");

  const [isFocusCountry, setIsFocusCountry] = useState(false);
  const [isFocusAddType, setIsFocusAddType] = useState(false);
  const[drpChanged , setDrpChenged] = useState(false)

  const [editId, setEditId] = useState('');

  const adminCustomerID = useSelector((state) => state.findStore.adminCustomerID);

  const admEmail = useSelector((state) => state.findStore.cusEmail);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
    });

    if(editContactid != ''){
      setEditId(editContactid);


      searchContact(editContactid).then(res => {


        console.log(res);
       setContactNumber(res[0].phone);
       setEmail(res[0].email);

       setChecked(res[0].isDefault == 1 ? true : false);
      setContactName(res[0].name);
      setAddLine1(res[0].addressLine1);
      setAddLine2(res[0].addressLine2);
      setAddLine3(res[0].addressLine3);
      setCity(res[0].city);
      setState(res[0].state);
      setPostCode(res[0].postCode);
      setCVal(res[0].countryId);
      setCLabel(res[0].country);
      setNotes(res[0].notes);
      setJobrole(res[0].jobRole);
      console.log(res[0].countryId);

      });
    }


  }, [navigation]);

  const addNewContact = () => {
    let email_ = email;

    if (contactName == "") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Contact name cannot be empty",
        type: "warning",
        autoHide: true,
      });
      return;
    }
    if (contactNumber == "") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Contact number cannot be empty",
        type: "warning",
        autoHide: true,
      });
      return;
    }
    if(contactNumber!= ''){

      if(!ContactNumberValidation(contactNumber)){
        showMessage({
          message: "KINGS SEEDS",
          description: "Contact number is not valid",
          type: "warning",
          autoHide: true,
        });
        return;
      }
    }

    if(email == ''){
      email_ = admEmail
    }

    if(email != ''){
      if(!EmailValidation(email)){
        showMessage({
          message: "KINGS SEEDS",
          description: "Email is not valid",
          type: "warning",
          autoHide: true,
        });
        return;
      }
    }
    let country_ = '';

    if(drpChanged ==true){
      country_ = cLabel
    }

    const data = {
      id: editId,
      name: contactName,
      number: contactNumber,
      email: email_,
      addressLine1: addLine1,
      addressLine2: addLine2,
      addressLine3: addLine3,
      city: city,
      postCode: postCode,
      state: state,
      country: country_,
      countryId: cVal,
      isDefault: checked ? 1 : 0,
      jobrole:jobrole,
      notes:notes,
      adminCustomerID: adminCustomerID

    };

    updateContact(data).then((res) => {

      showMessage({
        message: "KINGS SEEDS",
        description: "Contact Edited Successfully",
        type: "success",
        autoHide: true,
      });



    });

  };

  let cartItems = [];
  let total = 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>


        <View style={styles.titleView}>
          <Text style={styles.titleTxt} allowFontScaling={false}>
            Edit Contact
          </Text>
        </View>
        <KeyboardAwareScrollView style={{ width: "94%" }}>
          <View style={{ width: "100%", height: hp("64") }}>
            <View style={{ width: "100%", height: hp("56") }}>
              <ScrollView style={{ width: "100%" }}>

              <View style={styles.checkAreaView}>
                  <Text style={styles.itemTxt}>
                    Set Default
                  </Text>
                  <View style={styles.checkBoxView}>
                    <Checkbox.Android
                      status={checked ? "checked" : "unchecked"}
                      color={colors.primaryColor}
                      onPress={() => {
                        let val = !checked;
                        setChecked(val);
                      }}
                    />
                  </View>
                </View>


                <View style={styles.cntactNameView}>
                  <Text style={styles.itemTxt}>
                    Contact Name <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View style={styles.inputView}>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) => {
                        setContactName(text);
                      }}
                      value={contactName}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.totView}>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          Address Line 1
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                              setAddLine1(text);
                            }}
                            value={addLine1}
                          ></TextInput>
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
                            onChangeText={(text) => {
                              setAddLine2(text);
                            }}
                            value={addLine2}
                          ></TextInput>
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
                            onChangeText={(text) => {
                              setAddLine3(text);
                            }}
                            value={addLine3}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          City/Town
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                              setCity(text);
                            }}
                            value={city}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        {stateReq != true ? (
                          <Text style={[styles.itemTxt, { color: "#DDD" }]}>
                            County/State
                          </Text>
                        ) : (
                          <Text style={styles.itemTxt}>
                            County/State
                          </Text>
                        )}

                        {stateReq != true ? (
                          <View style={styles.inputDisable}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              editable={false}
                              placeholderTextColor="gray"
                              onChangeText={(text) => {
                                setState(text);
                              }}
                              value={state}
                            ></TextInput>
                          </View>
                        ) : (
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={(text) => {
                                setState(text);
                              }}
                              value={state}
                            ></TextInput>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          Country
                        </Text>
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocusCountry && { borderColor: colors.primaryColor },
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={countries}
                          activeColor="#e6fff0"
                          maxHeight={hp("25")}
                          labelField="displayName"
                          valueField="id"
                          search
                          placeholder={
                            !isFocusCountry ? "Select country" : "..."
                          }
                          searchPlaceholder="Search..."
                          value={cVal}
                          onFocus={() => setIsFocusCountry(true)}
                          onBlur={() => setIsFocusCountry(false)}
                          onChange={(item) => {
                            setCVal(item.id);
                            setCLabel(item.displayName)
                            setIsFocusCountry(false);
                            setStateReq(item.stateReq);
                            if (item.stateReq != true) {
                              setState("");
                            }
                            if (item.id != 492 || item.id != 271) {
                              setPostCode("");
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        {cVal == 492 || cVal == 271 ? (
                          <Text style={styles.itemTxt}>
                            Post Code/Zip{" "}
                          </Text>
                        ) : (
                          <Text style={[styles.itemTxt, { color: "#DDD" }]}>
                            Post Code/Zip{" "}
                          </Text>
                        )}

                        {cVal == 492 || cVal == 271 ? (
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={(text) => {
                                setPostCode(text);
                              }}
                              value={postCode}
                            ></TextInput>
                          </View>
                        ) : (
                          <View style={styles.inputDisable}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              editable={false}
                              placeholderTextColor="gray"
                              onChangeText={(text) => {
                                setPostCode(text);
                              }}
                              value={postCode}
                            ></TextInput>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          Contact Number <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                              setContactNumber(text);
                            }}
                            value={contactNumber}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Job Role</Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                              setJobrole(text);
                            }}
                            value={jobrole}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          Email Address
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                              setEmail(text);
                            }}
                            value={email}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.cntactNameView, {height:hp('13')}]}>
                    <Text style={styles.itemTxt}>
                      Notes
                    </Text>
                    <View style={[styles.inputView, {height:hp('10')}]}>
                      <TextInput
                        allowFontScaling={false}
                        style={[styles.TxtInput,{ height:hp('10'), textAlignVertical:'top'}]}
                        placeholderTextColor="gray"
                        autoCapitalize='none'
                        multiline={true}
                        onChangeText={(text) => {
                          setNotes(text);
                        }}
                        value={notes}
                      ></TextInput>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.backbtn}
                onPress={() => {
                  navigation.navigate("storeNew", {
                    tab: 6,
                    subTabVal: "",
                  });
                }}
              >
                <Text style={styles.backbtnTxt}>BACK TO CONTACT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.proceedbtn}
                onPress={() => {
                  addNewContact();
                }}
              >
                <Text style={styles.proceedbtnTxt}>UPDATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <Footer /> */}
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
export default connect(mapStateToProps, {})(EditStoreContact);
