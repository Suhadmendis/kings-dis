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
import AddNewStoreAddress from "./../actions/AddStoreAddressAction";
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
import {store} from '../../configureStore';
import getBaseUrl from "../url/getBaseUrl";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as colors from '../style/Common/ColorsStyle';
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
    });
    getCountries().then((res) => {
      this.setState({ countries: res });
    });
    getStates().then((r) => {
      this.setState({ allStatesList: r });
      this.filterStates_(271);
    });

  }

  filterStates_(c_id) {
    let arr = [];
    let arr_ = [];
    arr = this.state.allStatesList;
    arr
      .filter((p) => p.countryID == c_id)
      .map((filtered) => arr_.push(filtered.displayName));
    console.log(arr_);

    this.setState({ filteredStatesList: arr_ });
    console.log('filterdlist');
    console.log(this.state.filteredStatesList);
    console.log('=============================');
  }

  setVisibleCheck(c_id) {
    let countryItem = {};
    let arr = [];
    console.log(c_id);
    console.log('setcvus');
    arr = this.state.countries;
    arr.filter((p) => p.id == c_id).map((filtered) => (countryItem = filtered));
    console.log(countryItem);
    this.setState({
      AddressCountryID: c_id,
    });
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

  AddNewStoreAddress = async (
    adminCustomerID,
    l_token,
    AddressLine1,
    AddressLine2,
    AddressLine3,
    AddressCity,
    AddressPersonalName,
    AddressCountryID,
    AddressZip,
    AddressLine4,
    AddressPhone,
    IsDefaultBilling,
    IsDefaultShipping
  ) => {
    console.log(AddressLine1);
    store.dispatch({type:'CustomSpinner:SHOW'});
    if (l_token != "blank") {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${l_token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
        if (adminCustomerID !== "") {
          myHeaders.append("WorkingAsCustomerID", adminCustomerID);
        }

        var raw = JSON.stringify({
          AddressLine1: AddressLine1,
          AddressLine2: AddressLine2,
          AddressLine3: AddressLine3,
          AddressCity: AddressCity,
          AddressPersonalName: AddressPersonalName,
          AddressCountryID: AddressCountryID,
          AddressZip: AddressZip,
          AddressLine4: AddressLine4,
          AddressPhone: AddressPhone,
          IsDefaultBilling: IsDefaultBilling,
          IsDefaultShipping: IsDefaultShipping,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          `${getBaseUrl()}Address/AddEditCustomerAddress`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            const res = JSON.parse(result);
            store.dispatch({type:'CustomSpinner:HIDE'})
            if (res["error"] !== "") {
              showMessage({
                message: "KINGS SEEDS",
                description: res["error"],
                type: "warning",
                autoHide: true,
              });
              console.log("erreo11" + res["error"]);
            } else {
              showMessage({
                message: "KINGS SEEDS",
                description: "Address Added",
                type: "success",
                autoHide: true,
              });
              this.successMethod();
            }
          })
          .catch((error) => console.log("api error", error));
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    });

    this.props.navigation.navigate('storeNew', { tab: 1 ,subTabVal:""});
  }

  async addAddress() {
    //  Main();

    const tok = this.props.loginToken;
    await this.AddNewStoreAddress(
      this.props.adminCustomerID,
      tok,
      this.state.AddressLine1,
      this.state.AddressLine2,
      this.state.AddressLine3,
      this.state.AddressCity,
      this.state.AddressPersonalName,
      this.state.AddressCountryID,
      this.state.AddressZip,
      this.state.AddressLine4,
      this.state.AddressPhone,
      this.state.IsDefaultBilling,
      this.state.IsDefaultShipping
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>
          {/* <Header /> */}
          <CustomSpinner/>
          <Back />
          <View style={Styles.titleView}>
            <View style={Styles.contactTitle}>
              <Text style={Styles.titleTxt} allowFontScaling={false}>
                Add New Address
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView>
          <View style={{ width: "100%", height: hp("76%") }}>
            <ScrollView style={{ width: "100%" }}>
              <View style={sty.cardView}>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Contact Name:<Text style={{color:'red'}}>*</Text>
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <TextInput
                    allowFontScaling={false}
                    style={sty.TxtInput}
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({
                        AddressPersonalName: text,
                      })
                    }
                  >{this.state.AddressPersonalName}</TextInput>
                </View>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Address Phone:<Text style={{color:'red'}}>*</Text>
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <TextInput
                    allowFontScaling={false}
                    style={sty.TxtInput}
                    keyboardType='numeric'
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({
                        AddressPhone: text,
                      })
                    }
                  >{this.state.AddressPhone}</TextInput>
                </View>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Country:<Text style={{color:'red'}}>*</Text>
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <Picker
                    selectedValue={this.state.AddressCountryID}
                    style={{ height: hp("10"), width: wp("90")}}
                    onValueChange={(itemValue, itemIndex) =>
                      // this.setState({
                      //   AddressCountryID: itemValue,
                      // })
                      this.setVisibleCheck(itemValue)
                    }
                  >
                    {this.state.countries.map((e) => (
                      <Picker.Item label={e.displayName} value={e.id} />
                    ))}
                    {/* <Picker.Item label="United Kingdom" value="492" />
                    <Picker.Item label="United States" value="271" />
                    <Picker.Item label="Australia" value="21" /> */}
                  </Picker>
                </View>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Address Line 1:<Text style={{color:'red'}}>*</Text>
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <TextInput
                    allowFontScaling={false}
                    style={sty.TxtInput}
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({
                        AddressLine1: text,
                      })
                    }
                  >{this.state.AddressLine1}</TextInput>
                </View>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Address Line 2:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <TextInput
                    allowFontScaling={false}
                    style={sty.TxtInput}
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({
                        AddressLine2: text,
                      })
                    }
                  >{this.state.AddressLine2}</TextInput>
                </View>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Address Line 3:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <TextInput
                    allowFontScaling={false}
                    style={sty.TxtInput}
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({
                        AddressLine3: text,
                      })
                    }
                  >{this.state.AddressLine3}</TextInput>
                </View>
                {this.state.showAdd_4 === true ? (
                  <View style={sty.textView}>
                    <Text style={sty.itemTxt} allowFontScaling={false}>
                      state/county:<Text style={{color:'red'}}>*</Text>
                    </Text>
                  </View>
                ) : null}

                {this.state.showAdd_4 === true ? (
                  <View style={sty.txtInputView}>
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>
                        this.setState({
                          AddressLine4: text,
                        })
                      }
                    >{this.state.AddressLine4}</TextInput>
                  </View>
                ) : null}

                {this.state.AddressCountryID === 492 ||
                this.state.AddressCountryID === 271 ? (
                  <View style={sty.textView}>
                    <Text style={sty.itemTxt} allowFontScaling={false}>
                      Zip:<Text style={{color:'red'}}>*</Text>
                    </Text>
                  </View>
                ) : null}

                {this.state.AddressCountryID === 492 ||
                this.state.AddressCountryID === 271 ? (
                  <View style={sty.txtInputView}>
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      onChangeText={(text) =>
                        this.setState({
                          AddressZip: text,
                        })
                      }
                    >{this.state.AddressZip}</TextInput>
                  </View>
                ) : null}

                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    City/Town:<Text style={{color:'red'}}>*</Text>
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  <TextInput
                    allowFontScaling={false}
                    style={sty.TxtInput}
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({
                        AddressCity: text,
                      })
                    }
                  >{this.state.AddressCity}</TextInput>
                </View>

                <View
                  style={{
                    marginTop: hp("2"),
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity activeOpacity={0.9} style={sty.backtoBtn}
                   onPress={() => {
                    this.props.navigation.goBack()
                  }}
                  >
                    <Text
                      style={sty.bakctobtnTxt}
                      allowFontScaling={false}
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
                        this.props.navigation.navigate('storeNew', { tab: 1 ,subTabVal:""});
                      }}
                    >
                      BACK TO ADDRESS BOOK
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.saveBtn}
                    onPress={() => this.addAddress()}
                  >
                    <Text style={sty.savebtnTxt} allowFontScaling={false}>
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
          </KeyboardAwareScrollView>



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
    fontSize: hp(1.5),
    //backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
  },
  itemTxt: {
    height: hp("3"),
    fontSize: hp("1.5"),
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
