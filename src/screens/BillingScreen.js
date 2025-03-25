import React, {useEffect, useRef, useState} from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Checkbox} from "react-native-paper";
import Back from "../components/common/Back";
import Styles from "../style/BillingAddressStyle.js";
import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import {Dropdown} from "react-native-element-dropdown";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {getAddresses} from "../actions/AddressActions";
import _ from "lodash";
import {getValidShippingOptions} from "../offline/Services/DeliveryHelper";
import {showMessage} from "react-native-flash-message";
import {store} from "../../configureStore";
import CustomSpinner from "../components/common/CustomSpinner";
import {getValidPaymentOptions} from "../offline/Services/PaymentHelper";
import sendConEmail from "../components/contact/sendEmail";
import {GetString} from "../offline/Services/ResHelper";
import DataAdapter from "../offline/localData/DataAdapter";
import insertContactAPI from "../components/contacts/insertContactAPI";
import { EmailValidation, ContactNumberValidation } from "../utils/ValidationHelper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";
import * as colors from '../style/Common/ColorsStyle';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const filter = require("../assets/add2x.png");

const { ids, styles } = Styles;
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export default function BillingScreen({ route }) {


  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [time, setTime] = useState(null);
  const [checked, setChecked] = React.useState(true);
  const [termsCheck, setTermsCheck] = React.useState(false);

  const [checkoutMessage, setCheckoutMessage] = React.useState(null);
  const [canCheckout, setCanCheckout] = React.useState(true);
  const [accOnStopMessage, setAccOnStopMessage] = React.useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);


  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [addContactFormVisibility, setAddContactFormVisibility] = useState(false);


  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [customerEmails, setCustomerEmails] = useState(null);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState(null);
  const [registerNumber, setRegisteNumber] = useState('');

  const [orderNote, setOrderNote] = useState('');

  const [selectedPaymentOptionIndex, setSelectedPaymentOptionIndex] = useState(null);

  const connectionStatus = useSelector((s) => s.loading.connectionStatus);
  const cartItems = useSelector((s) => s.cart.items);
  const customerId = useSelector((s) => s.findStore.adminCustomerID);
  const accCode = useSelector((s) => s.findStore.accCode);
  const accOnStop = useSelector((s) => s.findStore.itemOnStop);
  const orderNoteredux = useSelector((s) => s.checkout.orderNotes);
  const regNumber = useSelector((s) => s.checkout.registerNumber);
  const cusEmail = useSelector((s) => s.checkout.customerEmail);
  const payType = useSelector((s) => s.checkout.paymentType);


  const dropdownRef = useRef(null);


  const adminCustomerID = useSelector((state) => state.findStore.adminCustomerID);
  const tokn = useSelector((state) => state.login.loginToken);

let shipMethod = shippingOptions[0]?.value

  async function getCustomerAddresses() {

    const payload = {
      section: 'ADDRESS',
      opration: 'GET CUSTOMER ADDRESS EMAILS',
      data: ''
    }

    const states_ = await DataAdapter(payload);
    return states_;
  }


  async function addContactAPI(data) {


    const newpro = await insertContactAPI(data);
    console.log(newpro);
    return newpro;
  }

  async function sendContact(data, token) {


    const newpro = await sendConEmail(data, token);
    return newpro;
  }


  async function getCustomerContacts(adminCustomerID) {

    const payload = {
      section: "LOCAL CONTACTS",
      opration: "GET",
      data: { type: "", adminCustomerID },
    };

    const states_ = await DataAdapter(payload);
    return states_;
  }


  const handleGetSelectedValue = () => {
    if (dropdownRef.current) {
      console.log('Current selected value:', dropdownRef.current.value);
      // You can access other properties or methods of the dropdown using dropdownRef.current
    }
  };



  async function getEmails(){

    let id = 1;
    let contactsAry = []
    getCustomerAddresses().then(res => {

      res.map(element => {
        console.log('================================================================');
          console.log(element);
        contactsAry.push({
          id,
          email: element.CustomerEmail,
          isDefault: null

        })
        ++id;
      })


      getCustomerContacts(adminCustomerID).then(ress => {
        console.log(ress);
        ress.map(element => {

          contactsAry.push({
            id,
            email: element.email,
            isDefault: element.isDefault
          })
          ++id;
        })


        contactsAry = moveDefaultToFirst(contactsAry);

     setCustomerEmails(contactsAry);

  setSelectedCustomerEmail(contactsAry[0]);

      });

    })
  }
useEffect(()=>{
  getEmails()
console.log('getEmails');


},[])

  function moveDefaultToFirst(contacts) {

    const defaultContact = contacts.filter(contact => contact.isDefault == 1);
    const orderContacts = contacts.filter(contact => contact.isDefault != 1);
    contacts = [...defaultContact, ...orderContacts];

    return contacts;
}



  useFocusEffect(
      React.useCallback(() => {
        GetString("myaccount.onstop")
            .then(text => {
              setAccOnStopMessage(text);
            });

            getEmails();




  setTimeout(() => {
    setSelectedShippingAddress(null)
  }, 100);

  setTimeout(() => {
    console.log(selectedShippingAddress);
  }, 1000);

  setTimeout(() => {
    console.log(selectedShippingAddress);
  }, 2000);

  setTimeout(() => {
    console.log(selectedShippingAddress);
  }, 3000);

  setTimeout(() => {
    console.log(selectedShippingAddress);
  }, 4000);

  setTimeout(() => {
    console.log(selectedShippingAddress);
  }, 5000);




            // getCustomerAddresses().then(res => {

            //   console.log('----------------------------------------------------------------');
            //   console.log(res[0]);
            //   console.log('----------------------------------------------------------------');
            //   setSelectedCustomerEmail(res[0]);
            //   setCustomerEmails(res);

            //   console.log('customerEmails',customerEmails);

            // })


      }, [])
  )

  useFocusEffect(
    React.useCallback(() => {
      store.dispatch({ type: "CustomSpinner:SHOW" });

      setChecked(true);


      getAddresses()
        .then((res) => {
          if (res && res.addresses) {
            let transformed = _.map(res.addresses, (i) => ({
              value: i.addressID,
              label: i.addressDisplay,
              ...i,
            }));

            setAddresses(transformed);

            console.log('transformed---------');
            console.log(transformed);
            // Set first address as default billing and second as default shipping
            if (transformed.length > 0) {
              setSelectedBillingAddress(transformed[0]);
            }
            if (transformed.length > 1) {
              console.log('transformed-------------',transformed);
              setSelectedShippingAddress(transformed[1]);
            }

            store.dispatch({type: "CustomSpinner:HIDE"});
          } else {
            throw new Error('Failed to retrieve addresses');
          }
        })
        .catch((e) => {
          console.log('Failed to retrieve addresses: ', e);

          //reset data
          setAddresses([]);
          setSelectedBillingAddress(null);
          setSelectedShippingAddress(null);

          store.dispatch({ type: "CustomSpinner:HIDE" });
          showMessage({
            message: "KINGS SEEDS",
            description: "Failed to retrieve addresses. Please try again later.",
            type: "warning",
            autoHide: true,
          });
        });
    }, [customerId, time])
  );


  //getting the shipping options
  useFocusEffect(
      React.useCallback(() => {
        if (selectedShippingAddress != null) {
          store.dispatch({type: "CustomSpinner:SHOW"});

          getValidShippingOptions(cartItems, selectedShippingAddress.addressZip, selectedShippingAddress.addressCountryID)
              .then((shippingOptions) => {
                console.log("shippingOptions... ", shippingOptions)

                setShippingOptions(shippingOptions.shippingOptions);
                setCheckoutMessage(shippingOptions.message);
                setCanCheckout(shippingOptions.canCheckout);

                //check previously selected option still valid
                if(selectedShippingOption != null) {
                  let selected = _.find(shippingOptions.shippingOptions, {
                    'label': selectedShippingOption.label,
                    'value': selectedShippingOption.value,
                    'price': selectedShippingOption.price
                  }) ?? null;
                  if (selected == null) { // reset if not valid
                    setSelectedShippingOption(null);
                  }
                }

                store.dispatch({type: "CustomSpinner:HIDE"});
              })
              .catch((e) => {
                console.log("Failed to retrieve shipping options: ", e);

                //reset data
                setShippingOptions([]);
                setSelectedShippingOption(null);
                setCheckoutMessage(null);

                store.dispatch({type: "CustomSpinner:HIDE"});
                showMessage({
                  message: "KINGS SEEDS",
                  description: "Failed to retrieve shipping options. Please try again later.",
                  type: "warning",
                  autoHide: true,
                });
              });
        } else {
          //reset data
          setShippingOptions([]);
          setSelectedShippingOption(null);
        }
      }, [selectedShippingAddress])
  )

  //getting the payment options
  useFocusEffect(
      React.useCallback(() => {
        store.dispatch({type: "CustomSpinner:SHOW"});
        getValidPaymentOptions(selectedShippingOption, accCode)
            .then((paymentOptions) => {
              console.log("paymentOptions... ", paymentOptions)
              setPaymentOptions(paymentOptions.paymentOptions);

              //check previously selected option still valid
              if(selectedPaymentOption != null) {
                let selected = _.find(paymentOptions.paymentOptions, {'PaymentOptionName': selectedPaymentOption}) ?? null;
                if (selected == null) { // reset if not valid
                  setSelectedPaymentOption(null);
                  setSelectedPaymentOptionIndex(null);
                }
              }

              store.dispatch({type: "CustomSpinner:HIDE"});
            })
            .catch((e) => {
              console.log("Failed to retrieve payment options: ", e);

              //reset data
              setPaymentOptions([]);
              setSelectedPaymentOption(null);
              setSelectedPaymentOptionIndex(null);

              store.dispatch({type: "CustomSpinner:HIDE"});
              showMessage({
                message: "KINGS SEEDS",
                description: "Failed to retrieve payment options. Please try again later.",
                type: "warning",
                autoHide: true,
              });
            })
      }, [selectedShippingOption])
  )

  //getting order notes
  useFocusEffect(
    React.useCallback(() => {
      console.log('2222222222222222222222222222222222222222222222222222 ',payType);
      if(orderNoteredux != ''){
        setOrderNote(orderNoteredux)
      }
      if(regNumber != ''){
        setRegisteNumber(regNumber)
      }else{
        setRegisteNumber(regNumber)
      }
      if(payType === undefined){
        setPaymentOptions([]);
              setSelectedPaymentOption(null);
              setSelectedPaymentOptionIndex(null);
      }
  }, [orderNoteredux,regNumber,payType, time]));

  const dummyShippingOpt = [
    {
      ShippingOptionCarrierID: 1,
      ShippingOptionCarrierServiceName: "CostByWeight",
      ShippingOptionCountryIDs: "0",
      ShippingOptionDescription: null,
      ShippingOptionDisplayName: "Standard Delivery",
      ShippingOptionEnabled: 1,
      ShippingOptionGUID: "fbb6c57b-9168-4fcc-b779-cb0040749677",
      ShippingOptionID: 1,
      ShippingOptionLastModified: "2020-07-30T15:57:51.8286861",
      ShippingOptionName: "standard",
      ShippingOptionSiteID: 1,
      ShippingOptionTaxClassID: null,
      ShippingOptionThumbnailGUID: null,
      label: "Standard Delivery",
      price: 0,
      value: 1,
    },
  ];

  let total = 0;
  _.map(cartItems, (i, j) => {
    total += i.totalPrice;
  });

  // console.log('customerEmails',selectedCustomerEmail.CustomerEmail);
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}
    >
      <CustomSpinner />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
        {/* <Header /> */}
        <Back />
        <View style={styles.titleView}>
          <Text style={styles.titleTxt} allowFontScaling={false}>
          Checkout
          </Text>
          <TouchableOpacity
            style={styles.addCustomerBtn}
            onPress={() =>
              //navigation.navigate("AddBillingAddress", { setTime })
             navigation.navigate("addStoreAddress", {
                prevScreen: 'billing',
                setTime
              })
            }
          >
            <Image source={filter} style={styles.addIcon} />
            <Text style={styles.newContactTxt} allowFontScaling={false}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>

        <Text style={styles.titleSub}>E-mail Address</Text>
        <View style={styles.emailAddressTypeView}>

            <View style={styles.emailDropdownArea}>

              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={_.filter(customerEmails, (i) => i.email)}
                search={false}
                // selectedTextProps={{ numberOfLines: 1 }}
                activeColor="#e6fff0"
                // maxHeight={
                //   customerEmails.length || 1 * hp("9")
                // }
                labelField="email"
                valueField="id"
                // placeholder={!isFocus2 ? "Select address" : "..."}
                searchPlaceholder="Search..."
                value={selectedCustomerEmail}
                // onFocus={() => setIsFocus2(true)}
                // onBlur={() => setIsFocus2(false)}
                onChange={(item) => {
                  console.log('item.CustomerID', item);
                  setSelectedCustomerEmail({ id: item.id, email: item.email });
                  // console.log("billing...", item);
                  // setIsFocus2(false);
                  // setSelectedBillingAddress(item);
                }}
              />
            </View>
            <View style={{ flex: 2 }}>
              <TouchableOpacity
                  style={{
                    height: hp("4.5"),
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DEF9F6",
                    marginLeft: "5%",
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setAddContactFormVisibility(!addContactFormVisibility);
                  }}
                >
                  <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>ADD</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.attributeBox1}>
              <Text style={styles.attributeRegNumber}>Order Registration Number</Text>
              <TextInput
                style={styles.attributeInput}

                onChangeText={(txt) => setRegisteNumber(txt)}
              >
                {registerNumber}
              </TextInput>
            </View>

          { addContactFormVisibility ? (
         <View style={styles.addContactForm}>

            <View style={styles.attributeBox}>
              <Text style={styles.attributeName}>Contact Name</Text>
              <TextInput
                style={styles.attributeInput}
                value={contactName}
                onChangeText={(txt) => setContactName(txt)}
              />
            </View>
            <View style={styles.attributeBox}>
              <Text style={styles.attributeName}>Contact Number</Text>
              <TextInput
                style={styles.attributeInput}
                value={contactNumber}
                onChangeText={(txt) => setContactNumber(txt)}
                keyboardType="numeric"
                maxLength={25}
              />
            </View>
            <View style={styles.attributeBox}>
              <Text style={styles.attributeName}>Email Adddress</Text>
              <TextInput
                style={styles.attributeInput}
                value={contactEmail}
                onChangeText={(txt) => setContactEmail(txt)}
              />
            </View>

            <View style={styles.attributeBox}>
              <TouchableOpacity
                style={{
                  height: hp("4.5"),
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#DEF9F6",
                  marginLeft: "1%",
                  borderRadius: 5,
                }}
                onPress={() => {

                  if (contactName) {

                  }

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

                  if(contactEmail != ''){
                    if(!EmailValidation(contactEmail)){
                      showMessage({
                        message: "KINGS SEEDS",
                        description: "Email is not valid",
                        type: "warning",
                        autoHide: true,
                      });
                      return;
                    }
                  }

                  let ReadyToSync = 0;
                  if (!connectionStatus) {
                    ReadyToSync = 1;
                  }

                  const data = {
                    name: contactName,
                    number: contactNumber,
                    itemCreatedBy: "",
                    email: contactEmail,
                    addressLine1: "",
                    addressLine2: "",
                    addressLine3: "",
                    city: "",
                    postCode: "",
                    state: "",
                    country: "",
                    countryId: "",
                    jobrole: "",
                    notes: "",
                    adminCustomerID,
                    ReadyToSync

                  };


                  console.log(data);

                  if (connectionStatus) {
                    addContactAPI(data).then(res => {
                      console.log(res);
                      if (res.status == "Success") {
                        sendContact(data, tokn).then((res) => {

                          showMessage({
                            message: "KINGS SEEDS",
                            description: "Contact Added Successfully",
                            type: "success",
                            autoHide: true,
                          });




                          setAddContactFormVisibility(false);

                          let defaultSelection = false;
                          getEmails(defaultSelection, contactEmail);


                          setContactName('');
                          setContactNumber('');
                          setContactEmail('');

                        //   setContactName("");
                        // setAddLine1("");
                        // setAddLine2("");
                        // setAddLine3("");
                        // setCity("");
                        // setState("");
                        // setPostCode("");
                        // setContactNumber("");
                        // setEmail("");
                        // setDrpChenged(false);
                        // setJobrole('');
                        // setNotes('');



                        })
                      }


                   })
                  }

                }}
              >
                <Text style={{ fontSize: hp("1.5"), color: "#1ED18C" }}>Add Contact</Text>
              </TouchableOpacity>
            </View>


        {/* <View style={styles.addressTypeView1}>
            <Text style={styles.titleSub}>E-mail Address</Text>
            <Dropdown
              style={[styles.dropdown, isFocus2 && { borderColor: colors.primaryColor }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={customerEmails}
              search={false}
              // selectedTextProps={{ numberOfLines: 1 }}
              activeColor="#e6fff0"
              // maxHeight={
              //   customerEmails.length || 1 * hp("9")
              // }
              labelField="CustomerEmail"
              valueField="CustomerID"
              // placeholder={!isFocus2 ? "Select address" : "..."}
              searchPlaceholder="Search..."
              // value={selectedCustomerEmail?.value ?? null}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(item) => {
                console.log(item.CustomerID);
                setSelectedCustomerEmail({ CustomerID: item.CustomerID, CustomerEmail: item.CustomerEmail });
                // console.log("billing...", item);
                // setIsFocus2(false);
                // setSelectedBillingAddress(item);
              }}
            />
          </View> */}


         </View>
       ) : null }

<View style={styles.addressTypeView1}>
  <Text style={styles.titleSub}>Billing Address</Text>
  <Dropdown
    style={[styles.dropdown, isFocus2 && { borderColor: colors.primaryColor }]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={_.filter(addresses, (i) => i.addressIsBilling)}
    search={false}
    selectedTextProps={{ numberOfLines: 1 }}
    activeColor="#e6fff0"
    maxHeight={
      _.filter(addresses, (i) => i.addressIsBilling).length * hp("9")
   }
    labelField="label"
    valueField="value"
    placeholder={!isFocus2 ? "Select address" : "..."}
    searchPlaceholder="Search..."
    value={selectedBillingAddress?.value ?? null}
    onFocus={() => setIsFocus2(true)}
    onBlur={() => setIsFocus2(false)}
    onChange={(item) => {
      console.log("billing...", item);
      setIsFocus2(false);
      setSelectedBillingAddress(item);
    }}
  />
</View>

<View style={styles.addressTypeView2}>
  <Text style={styles.titleSub}>Shipping Address</Text>
  <View style={styles.chckView}>
    <Checkbox.Android
      status={checked ? "checked" : "unchecked"}
      color={colors.primaryColor}
      onPress={() => {
        let val = !checked;
        setChecked(val);
        if (!val) {
          setSelectedShippingAddress(selectedBillingAddress);
        }
      }}
    />
    <Text style={styles.chckViewTxt}>
      My delivery address is different from the billing address
    </Text>
  </View>
  <Dropdown
    style={[styles.dropdown, isFocus && { borderColor: colors.primaryColor }]}
    ref={dropdownRef}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={_.filter(addresses, (i) => i.addressIsShipping)}
    selectedTextProps={{ numberOfLines: 1 }}
    activeColor="#e6fff0"
    search={false}
    disable={!checked}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? "Select address" : "..."}
    searchPlaceholder="Search..."
    value={selectedShippingAddress?.value ?? null}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={(item) => {
      console.log("shipping...", item);
      setIsFocus(false);
      setSelectedShippingAddress(item);
    }}
  />
</View>

          <View style={styles.addressTypeView3}>
            <Text style={styles.titleSub}>Delivery & Payment Options</Text>
            <Text style={styles.deliveryOptTxt}>Delivery Options</Text>
           {
            shipMethod!=undefined ? (
              <Dropdown
              style={[styles.dropdown, isFocus3 && { borderColor: colors.primaryColor }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              selectedTextProps={{ numberOfLines: 1 }}
              //  data={shippingOptions}
              data={shippingOptions}
              search={false}
              maxHeight={shippingOptions.length * hp("9")}
              activeColor="#e6fff0"
              labelField="label"
              valueField="value"
              placeholder={!isFocus3 ? "Select Delivery Option" : "..."}
              searchPlaceholder="Search..."
              value={selectedShippingOption ==null ?  setSelectedShippingOption(shippingOptions[0]) : selectedShippingOption}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={(item) => {
                console.log("delivery...", item);
                setIsFocus3(false);
                setSelectedShippingOption(item);
              }}
            />
            ):null
           }
            <RadioGroup
              size={24}
              thickness={2}
              color={colors.primaryColor}
              selectedIndex={selectedPaymentOptionIndex}
              style={styles.RBtnGroup}
              onSelect={(index, value) => {
                console.log("payment...", index, value);
                setSelectedPaymentOption(value);
                setSelectedPaymentOptionIndex(index);
              }}
            >
              {
                paymentOptions.map((option) => {




                  return (
                    <RadioButton  value={option.PaymentOptionName} key={option.PaymentOptionID}>
                    <Text style={styles.radiobtnTxt}>{option.PaymentOptionDisplayName}</Text>
                  </RadioButton>
                   )
                })
              }
            </RadioGroup>

            {(accOnStop || checkoutMessage != null) &&
              <View style={styles.alertView}>
                <Text style={styles.alerttxt}>
                  {accOnStop ? accOnStopMessage : checkoutMessage}
                </Text>
              </View>
            }


          </View>
          <View style={styles.orderNotesView}>
            <Text style={styles.orderNotesText}>Order Notes</Text>
            <TextInput
              style={styles.orderNotesTextInput}
              multiline={true}
              onChangeText={(text) => setOrderNote(text)}
            >
              {orderNote}
            </TextInput>
          </View>
          <View
            style={styles.termandConditionView}
            >
               <Checkbox.Android
                status={termsCheck ? "checked" : "unchecked"}
                color={colors.primaryColor}
                onPress={() => {
                  let val = !termsCheck;
                  setTermsCheck(val);
                  // if (!val) {
                  //   setSelectedShippingAddress(selectedBillingAddress);
                  // }
                }}
              />
              <Text
              style={{
                color:'black',
                fontSize:hp('1.3')
              }}
              > I Agree to Terms and Conditions</Text>
            </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.backbtn}
              onPress={() => navigation.navigate("carts")}
            >
              <Text style={styles.backbtnTxt}>BACK TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={(!accOnStop && canCheckout) ? styles.proceedbtn : styles.proceedbtn_disabled}
              disabled={(accOnStop || !canCheckout)}
              onPress={() => {

                console.log('KINGS SEEDS');
                console.log(shippingOptions);
                console.log(selectedShippingAddress);

                if (cartItems.length <= 0) {
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "Cart is empty",
                    type: "warning",
                    autoHide: true,
                  });
                } else if (selectedBillingAddress == null) {
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "Please select billing address",
                    type: "warning",
                    autoHide: true,
                  });
                } else if (selectedShippingAddress == null) {
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "Please select shipping address",
                    type: "warning",
                    autoHide: true,
                  });
                } else if (selectedShippingOption == null) {
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "Please select delivery option",
                    type: "warning",
                    autoHide: true,
                  });
                } else if (selectedPaymentOption == null) {
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "Please select payment option",
                    type: "warning",
                    autoHide: true,
                  });
                } else if (termsCheck == false) {
                  showMessage({
                    message: "KINGS SEEDS",
                    description: "please agree to the terms and conditions to continue",
                    type: "warning",
                    autoHide: true,
                  });
                }
                else {
                  if (!connectionStatus) {
                    showMessage({
                      message: "KINGS SEEDS",
                      description: "Continuing without an internet connection!",
                      type: "warning",
                      autoHide: true,
                    });
                  }

                  console.log('KINGS SEEDS');
                  // console.log(shippingOptions);
                  // console.log(selectedShippingAddress);
console.log(selectedPaymentOption);


                  handleGetSelectedValue();
                  store.dispatch({
                    type: 'SET_BILLING_INFO',
                    payload: {
                        customerEmail: selectedCustomerEmail.email,
                        deliveryPrice: selectedShippingOption.price,
                        deliveryTax: selectedShippingOption.tax,
                        shippingAddress: selectedShippingAddress,
                        billingAddress: selectedBillingAddress,
                        deliveryOption: selectedShippingOption.value,
                        paymentType: selectedPaymentOption,
                        orderID: null,
                        webOrderID: null,
                        webOrderBillingAddressID: null,
                        offlineOrder: !connectionStatus,
                        orderDate: null,
                        orderAPayment: false,
                        orderNotes:orderNote,
                        cartItemNotes: route.params.notes,
                        registerNumber: registerNumber
                      }
                    });

                  navigation.navigate("orderSummary", { time: Date.now() });
                }
              }}
            >
              <Text style={styles.proceedbtnTxt}>PROCEED</Text>
            </TouchableOpacity>
          </View>

        </View>



        {/* <Footer /> */}
      </View>

      </KeyboardAwareScrollView>
    </KeyboardAwareScrollView>
  );
}
