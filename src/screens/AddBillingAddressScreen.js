import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Back from "../components/common/Back";
import Styles from "../style/AddBillingAddressStyle.js";
import { RadioButton, RadioGroup } from "react-native-flexi-radio-button";
import { Dropdown } from "react-native-element-dropdown";

import { showMessage } from "react-native-flash-message";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from "react-hook-form";
import DataAdapter from "../offline/localData/DataAdapter";
import _ from "lodash";
import { addAddress } from "../url/API";
import { LogTable, RawQuery } from "../offline/Services/DataHelper";
import { useSelector } from "react-redux";
import * as colors from '../style/Common/ColorsStyle';
const filter = require("../assets/add2x.png");

const { ids, styles } = Styles;

export default function AddBillingAddressScreen({ route }) {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  //dropdown
  const [cVal, setCVal] = useState(null);
  const [addType, setAddType] = useState(null);

  const [isFocusCountry, setIsFocusCountry] = useState(false);
  const [isFocusAddType, setIsFocusAddType] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  let internetConnectivity = useSelector(s => s.loading?.connectionStatus);

  const addressTypes = [
    {
      label: "Billing",
      value: "1",
    },
    {
      label: "Delivery",
      value: "2",
    },
  ];

  let cartItems = [];
  let total = 0;

  const renderLabel = () => {
    if (value1 || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  async function getCountries() {

    const payload = {
      section: '',
      opration: 'ADDRESS COUNTRIES',
      data: ''
    }

    const countries_ = await DataAdapter(payload);
    return countries_;
  }

  async function getStates() {

    const payload = {
      section: '',
      opration: 'ADDRESS STATES',
      data: ''
    }

    const states_ = await DataAdapter(payload);
    return states_;
  }

  async function addAddressToDB(data) {
    const payload = {
      section: 'ADDRESS',
      opration: 'ADD',
      data
    }
    return await DataAdapter(payload);
  }

  // getting countries
  useEffect(() => {
    setCVal(492)
    getCountries().then((res) => {
      setCountries(_.map(res, i => ({ label: i.displayName, value: i.id })))
      // let defaultCountry = _.find(res, {'id': 492}); //UK
      // setCVal(defaultCountry?.id ?? null)
    });
    getStates().then(res => {
      let filtered = res
        .filter((p) => p.countryID == 271) //filter states of USA
        .map((filtered) => ({ label: filtered.displayName, value: filtered.id }))
      setStates(filtered)
    })
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      AddressPersonalName: '',
      AddressLine1: '',
      AddressLine2: '',
      AddressLine3: '',
      AddressLine4: '',
      AddressCity: '',
      AddressCountryID: '',
      AddressZip: '',
      AddressPhone: '',
      county: '',
      email: '',
      addressType: '',
    }
  });

  const onSubmit = async data => {
    console.log(data, errors);

    if (internetConnectivity) {
      addAddress({
        ...data,
        IsDefaultBilling: data.addressType == 1,
        IsDefaultShipping: data.addressType == 2,
      }).then(res => {
        console.log('address adding result', res)
        if (res.address?.addressID) {
          showMessage({
            message: 'KINGS SEEDS',
            description: 'Address successfully added',
            type: 'success',
            autoHide: true,
          });
          //reloading previous screen's addresses
          route.params.setTime(Date.now())

          //adding address to local db
          addAddressToDB(res.address).then(res2 => {
            console.log('db res', res2)
            navigation.goBack();
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
      })
    } else {
      // TODO: add web address id on syncing to db
      //if no internet connection available
      addAddressToDB({
        ...data,
        IsDefaultBilling: data.addressType == 1,
        IsDefaultShipping: data.addressType == 2,
      }).then(res2 => {
        console.log('db res', res2)
        route.params.setTime(Date.now())
        navigation.goBack();
      })
    }
  }

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
        <KeyboardAwareScrollView style={{ width: "94%" }}>
          <View style={{ width: "100%", height: hp("73") }}>
            <View style={{ width: "100%", height: hp("66") }}>
              <ScrollView style={{ width: "100%" }}>
                <View style={styles.cntactNameView}>
                  <Text style={styles.itemTxt}>Contact Name <Text style={{ color: "red" }}>*</Text></Text>
                  <View style={styles.inputView}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      name="AddressPersonalName"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          allowFontScaling={false}
                          style={styles.TxtInput}
                          placeholderTextColor="gray"
                          onChangeText={onChange}
                          value={value}
                        ></TextInput>)}
                    />
                  </View>
                </View>
                <View style={styles.totView}>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Address Line 1 <Text style={{ color: "red" }}>*</Text></Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="AddressLine1"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Address Line 2 <Text style={{ color: "red" }}>*</Text></Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="AddressLine2"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Address Line 3</Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="AddressLine3"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                        </View>
                      </View>
                    </View>
                    {cVal == 271 ?
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>Address Line 4</Text>
                          <View style={styles.inputView}>
                            <Controller
                              control={control}
                              rules={{
                                // required: true,
                              }}
                              name="AddressLine4"
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Dropdown
                                  style={[
                                    styles.dropdown,
                                    isFocusCountry && { borderColor: colors.primaryColor },
                                  ]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={states}
                                  activeColor="#e6fff0"
                                  maxHeight={hp("25")}
                                  labelField="label"
                                  valueField="value"
                                  placeholder={!isFocusCountry ? "Select State" : "..."}
                                  searchPlaceholder="Search..."
                                  value={cVal}
                                  onFocus={() => setIsFocusCountry(true)}
                                  onBlur={() => setIsFocusCountry(false)}
                                  onChange={(item) => {
                                    // setIsFocusCountry(false);
                                    onChange(item.value)
                                  }}
                                />)}
                            />
                          </View>
                        </View>
                      </View> :
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>City/Town <Text style={{ color: "red" }}>*</Text></Text>
                          <View style={styles.inputView}>
                            <Controller
                              control={control}
                              rules={{
                                // required: true,
                              }}
                              name="AddressCity"
                              render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                  allowFontScaling={false}
                                  style={styles.TxtInput}
                                  placeholderTextColor="gray"
                                  onChangeText={onChange}
                                ></TextInput>)}
                            />
                          </View>
                        </View>
                      </View>
                    }

                  </View>
                  {/* {cVal == 271 ?
                    <View style={styles.totsubview}>
                      <View style={styles.secView1}>
                        <View style={styles.inpView}>
                          <Text style={styles.itemTxt}>City/Town <Text style={{ color: "red" }}>*</Text></Text>
                          <View style={styles.inputView}>
                            <Controller
                              control={control}
                              rules={{
                                // required: true,
                              }}
                              name="AddressCity"
                              render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                  allowFontScaling={false}
                                  style={styles.TxtInput}
                                  placeholderTextColor="gray"
                                  onChangeText={onChange}
                                ></TextInput>)}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.secView2}>
                        <View style={styles.inpView}>
                        </View>
                      </View>
                    </View> : null
                  } */}
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>County/State</Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="county"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Country <Text style={{ color: "red" }}>*</Text></Text>
                        <Controller
                          control={control}
                          rules={{
                            // required: true,
                          }}
                          name="AddressCountryID"
                          render={({ field: { onChange, onBlur, value } }) => (
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
                              search
                              activeColor="#e6fff0"
                              maxHeight={hp("25")}
                              labelField="label"
                              valueField="value"
                              placeholder={!isFocusCountry ? "Select Country" : "..."}
                              searchPlaceholder="Search..."
                              value={cVal}
                              onFocus={() => setIsFocusCountry(true)}
                              onBlur={() => setIsFocusCountry(false)}
                              onChange={(item) => {
                                setCVal(item.value);
                                setIsFocusCountry(false);
                                onChange(item.value)
                              }}
                            />)}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Post Code/Zip <Text style={{ color: "red" }}>*</Text></Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="AddressZip"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Contact Number</Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="AddressPhone"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                        </View>
                      </View>

                    </View>
                  </View>
                  <View style={styles.totsubview}>
                    {/* <View style={styles.secView1}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Email Address</Text>
                        <View style={styles.inputView}>
                          <Controller
                            control={control}
                            rules={{
                              // required: true,
                            }}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                allowFontScaling={false}
                                style={styles.TxtInput}
                                placeholderTextColor="gray"
                                onChangeText={onChange}
                              ></TextInput>)}
                          />
                          {errors.email && <Text style={{ color: 'red' }}>
                            Enter the email address correctly</Text>}
                        </View>
                      </View>
                    </View> */}
                    {/* <View style={styles.secView2}>
                      <View style={styles.inpView}>
                        <Text style={styles.itemTxt}>Address Type</Text>
                        <Controller
                          control={control}
                          rules={{
                            // required: true,
                          }}
                          name="addressType"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown
                              style={[
                                styles.dropdown,
                                isFocusAddType && { borderColor: "#1ED18C" },
                              ]}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              inputSearchStyle={styles.inputSearchStyle}
                              iconStyle={styles.iconStyle}
                              data={addressTypes}
                              activeColor="#e6fff0"
                              maxHeight={hp("12")}
                              labelField="label"
                              valueField="value"
                              placeholder={!isFocusAddType ? "Select address" : "..."}
                              searchPlaceholder="Search..."
                              value={addType}
                              onFocus={() => setIsFocusAddType(true)}
                              onBlur={() => setIsFocusAddType(false)}
                              onChange={(item) => {
                                setAddType(item.value);
                                setIsFocusAddType(false);
                                onChange(item.value)
                              }}
                            />)}
                        />
                      </View>

                    </View> */}
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.backbtn}
                onPress={navigation.goBack}>
                <Text style={styles.backbtnTxt}>BACK TO CART</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.proceedbtn}
                onPress={() => {
                  console.log('errors', errors);
                  handleSubmit(onSubmit)()
                  // navigation.navigate("orderSummary")
                }
                }
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
