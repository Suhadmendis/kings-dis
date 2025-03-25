import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Switch,
  Keyboard,
  Image,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Back from "../components/common/Back";
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

import insertContactAPI from "./contacts/insertContactAPI";
import sendEmail from "./contact/sendEmail";
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


async function addContactAPI(data) {


  const newpro = await insertContactAPI(data);
  console.log(newpro);
  return newpro;
}

async function send(data, token) {


  const newpro = await sendEmail(data, token);
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

const AddStoreContact = ({ navigation }) => {
  //  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  //dropdown
  const [cVal, setCVal] = useState("492"); // the country code is hardcorded, but thats ok for kings
  const [addType, setAddType] = useState(null);
  const[drpChanged , setDrpChenged] = useState(false)

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
  const [jobrole, setJobrole] = useState("");
  const [notes, setNotes] = useState("");


  const [isFocusCountry, setIsFocusCountry] = useState(false);
  const [isFocusAddType, setIsFocusAddType] = useState(false);


  const [keyboardStatus, setKeyboardStatus] = useState(false);


  const tokn = useSelector((state) => state.login.loginToken);

  const userId = useSelector((state) => state.login.accountInfo.customerUserID);
  const { connectionStatus } = useSelector((s) => s.loading);



  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
      console.log("=============================");
      console.log(countries);
    });
  }, [navigation]);






    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus(true);
        console.log('====================================');
        console.log("Keyboard Shown");
        console.log('====================================');
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus(false);
        console.log('====================================');
        console.log("Keyboard Hidden");
        console.log('====================================');
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    const admEmail = useSelector((state) => state.findStore.cusEmail);
    const adminCustomerID = useSelector((state) => state.findStore.adminCustomerID);


    console.log('===================temp=================');
    console.log(adminCustomerID);
    console.log('====================================');
  const addNewContact = ()  =>  {



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
    // if (stateReq == true) {
    //   if (state == "") {
    //     showMessage({
    //       message: "KINGS SEEDS",
    //       description: "State/County cannot be empty",
    //       type: "warning",
    //       autoHide: true,
    //     });
    //     return;
    //   }
    // }
    // if (cVal == 271 || cVal == 492) {
    //   if (postCode == "") {
    //     showMessage({
    //       message: "KINGS SEEDS",
    //       description: "Post Code/Zip cannot be empty",
    //       type: "warning",
    //       autoHide: true,
    //     });
    //     return;
    //   }
    // }

    // let addressLines = addLine1+" ";

    // if(addLine2!= ''){
    //   addressLines = addressLines+addLine2+" ";
    // }
    // if(addLine3!= ''){
    //   addressLines = addressLines+addLine3+" ";
    // }
    // addressLines = addressLines+ city+ " ";

    // if(state != ''){
    //   addressLines = addressLines+ state+ " ";
    // }
    // if(postCode != ''){
    //   addressLines = addressLines+ postCode+ " ";
    // }

    // console.log(addressLines+" "+cLabel);

    //address: addressLines+" "+cLabel,
    let country_ = '';

    if(drpChanged ==true){
      country_ = cLabel
    }

    let ReadyToSync = 0;
    if (!connectionStatus) {
      ReadyToSync = 1;
    }

    const data = {
      name: contactName,
      number: contactNumber,
      itemCreatedBy: userId,
      email: email_,
      addressLine1: addLine1,
      addressLine2: addLine2,
      addressLine3: addLine3,
      city: city,
      postCode: postCode,
      state: state,
      country: country_,
      countryId: cVal,
      jobrole: jobrole,
      notes: notes,
      checked: checked,
      adminCustomerID,
      ReadyToSync

    };




    if (connectionStatus) {
      addContactAPI(data).then(res => {

        send(data, tokn).then((res) => {

          showMessage({
            message: "KINGS SEEDS",
            description: "Contact Added Successfully",
            type: "success",
            autoHide: true,
          });

          setChecked(false);
          setContactName("");
        setAddLine1("");
        setAddLine2("");
        setAddLine3("");
        setCity("");

        setState("");
        setPostCode("");
        setContactNumber("");
        setEmail("");
        setDrpChenged(false);
        setJobrole('');
        setNotes('');



        })

     })

    }else{
      addContact(data).then((res) => {
        console.log('res', adminCustomerID);



        showMessage({
          message: "KINGS SEEDS",
          description: "Contact Added Successfully",
          type: "success",
          autoHide: true,
        });





        setContactName("");
        setAddLine1("");
        setAddLine2("");
        setAddLine3("");
        setCity("");
        setState("");
        setPostCode("");
        setContactNumber("");
        setEmail("");
        setDrpChenged(false);
        setJobrole('');
        setNotes('');
      });


    }







    console.log("======================================================");
  };

  let cartItems = [];
  let total = 0;

  return (
    <KeyboardAwareScrollView style={[styles.canves, keyboardStatus ? { marginBottom: 70 } : null ]} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* <Header /> */}

        <View style={styles.titleView}>
          <Text style={styles.titleTxt} allowFontScaling={false}>
            Add New Contact
          </Text>
        </View>
        <KeyboardAwareScrollView style={{width: '94%'}} keyboardShouldPersistTaps="handled">
          <View style={{width: '100%', height: hp('64')}}>
            <View style={{width: '100%', height: hp('56')}}>
              <ScrollView style={{width: '100%'}}>


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
                    Contact Name <Text style={{color: 'red'}}>*</Text>
                  </Text>
                  <View style={styles.inputView}>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={text => {
                        setContactName(text);
                      }}
                      value={contactName}></TextInput>
                  </View>
                </View>
                <View style={styles.totView}>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Address Line 1</Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={text => {
                              setAddLine1(text);
                            }}
                            value={addLine1}></TextInput>
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
                            onChangeText={text => {
                              setAddLine2(text);
                            }}
                            value={addLine2}></TextInput>
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
                            onChangeText={text => {
                              setAddLine3(text);
                            }}
                            value={addLine3}></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>City/Town</Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            onChangeText={text => {
                              setCity(text);
                            }}
                            value={city}></TextInput>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        {stateReq != true ? (
                          <Text style={[styles.itemTxt, {color: '#DDD'}]}>
                            County/State
                          </Text>
                        ) : (
                          <Text style={styles.itemTxt}>County/State</Text>
                        )}

                        {stateReq != true ? (
                          <View style={styles.inputDisable}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              editable={false}
                              placeholderTextColor="gray"
                              onChangeText={text => {
                                setState(text);
                              }}
                              value={state}></TextInput>
                          </View>
                        ) : (
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={text => {
                                setState(text);
                              }}
                              value={state}></TextInput>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Country</Text>
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocusCountry && {borderColor: '#1ED18C'},
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={countries}
                          activeColor="#e6fff0"
                          maxHeight={hp('25')}
                          labelField="displayName"
                          valueField="id"
                          search
                          placeholder={
                            !isFocusCountry ? 'United Kingdom' : '...'
                          }
                          searchPlaceholder="Search..."
                          value={cVal}
                          onFocus={() => setIsFocusCountry(true)}
                          onBlur={() => setIsFocusCountry(false)}
                          onChange={item => {
                            setCVal(item.id);
                            setCLabel(item.displayName);
                            setIsFocusCountry(false);
                            setStateReq(item.stateReq);
                            setDrpChenged(true);
                            if (item.stateReq != true) {
                              setState('');
                            }
                            if (item.id != 492 || item.id != 271) {
                              setPostCode('');
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
                          <Text style={styles.itemTxt}>Post Code/Zip </Text>
                        ) : (
                          <Text style={[styles.itemTxt, {color: '#DDD'}]}>
                            Post Code/Zip{' '}
                          </Text>
                        )}

                        {cVal == 492 || cVal == 271 ? (
                          <View style={styles.inputView}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              placeholderTextColor="gray"
                              onChangeText={text => {
                                setPostCode(text);
                              }}
                              value={postCode}></TextInput>
                          </View>
                        ) : (
                          <View style={styles.inputDisable}>
                            <TextInput
                              allowFontScaling={false}
                              style={styles.TxtInput}
                              editable={false}
                              placeholderTextColor="gray"
                              onChangeText={text => {
                                setPostCode(text);
                              }}
                              value={postCode}></TextInput>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          Job Role
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            maxLength={25}
                            onChangeText={text => {
                              setJobrole(text);
                            }}
                            value={jobrole}></TextInput>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                    <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>
                          Contact Number <Text style={{color: 'red'}}>*</Text>
                        </Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            maxLength={25}
                            onChangeText={text => {
                              setContactNumber(text);
                            }}
                            value={contactNumber}></TextInput>
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Email Address</Text>
                        <View style={styles.inputView}>
                          <TextInput
                            allowFontScaling={false}
                            style={styles.TxtInput}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            onChangeText={text => {
                              setEmail(text);
                            }}
                            value={email}></TextInput>
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
                        numberOfLines={5}
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
                  navigation.navigate('storeNew', {
                    tab: 6,
                    subTabVal: '',
                  });
                }}>
                <Text style={styles.backbtnTxt}>BACK TO CONTACT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.proceedbtn}
                onPress={() => {
                  addNewContact();
                }}>
                <Text style={styles.proceedbtnTxt}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <Footer /> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {})(AddStoreContact);
