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
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Styles from "../style/ContactsStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { getCategories, getProduct } from "../actions/HomeScreenAction";
import NumericInput from "react-native-numeric-input";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colors from '../style/Common/ColorsStyle';
import DataAdapter from '../offline/localData/DataAdapter';





async function updateContact(data){

  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'UPDATE',
    data
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}


async function addContact(data){

  const payload = {
    section: 'LOCAL CONTACTS',
    opration: 'ADD',
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



class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      id: '',
      nameText: '',
      addressText: '',
      numberText: '',
      emailText: '',
    };
  }

  async componentDidMount() {
    console.log("componnet did");



    if(this.props.route.params.id){
      this.setState({ id: this.props.route.params.id });
      searchContact(this.props.route.params.id).then(res => {

      this.setState({ nameText: res[0].name });
      this.setState({ addressText: res[0].address });
      this.setState({ numberText: res[0].phone });
      this.setState({ emailText: res[0].email });
      });

    }



    // console.log(this.props.loginToken);
  }

  render() {
    console.log(this.props.loginToken);
    // const vt = this.props.viewtype;
    const vt = this.props.route.params.viewtype;

    console.log("response " + vt);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>

          <Back />
          <View></View>

          <View style={Styles.titleView}>
            <View style={Styles.contactTitle}>
              {vt == "Addcontact" ? (
                <Text style={Styles.titleTxt} allowFontScaling={false}>
                  Add New Contact
                </Text>
              ) : vt == "Editcontact" ? (
                <Text style={Styles.titleTxt} allowFontScaling={false}>
                  Edit Contact
                </Text>
              ) : (
                <Text style={Styles.titleTxt} allowFontScaling={false}>
                  View Contact
                </Text>
              )}
            </View>
          </View>
          <View
            style={{ width: "100%", height: hp('75%')}}
          >
            <ScrollView style={{ width: "100%" }}>
              <View style={sty.cardView}>
              <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Name:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.nameText}
                      onChangeText = {(text) => this.setState({ nameText: text })}
                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.nameText}
                      onChangeText = {(text) => this.setState({ nameText: text })}
                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}
                      value={this.state.nameText}
                      onChangeText = {(text) => this.setState({ nameText: text })}
                    >

                    </TextInput>
                  )}
                </View>
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Address:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.addressText}
                      onChangeText = {(text) => this.setState({ addressText: text })}
                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.addressText}
                      onChangeText = {(text) => this.setState({ addressText: text })}
                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}
                      value={this.state.addressText}
                      onChangeText = {(text) => this.setState({ addressText: text })}
                    >

                    </TextInput>
                  )}
                </View>

                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Contact Number:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.numberText}
                      onChangeText = {(text) => this.setState({ numberText: text })}
                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.numberText}
                      onChangeText = {(text) => this.setState({ numberText: text })}
                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}
                      value={this.state.numberText}
                      onChangeText = {(text) => this.setState({ numberText: text })}
                    >

                    </TextInput>
                  )}
                </View>
                {/* <View style={sty.textView}>
                                <Text style={sty.itemTxt} allowFontScaling={false}>
                                    Postal Address:
                                </Text>
                                </View>
                                <View style={sty.postaltxtInputView}>

                                {vt == 'Addcontact' ?
                                    (
                                        <TextInput
                                        allowFontScaling={false}
                                        style={sty.postalTxtInput}
                                        placeholderTextColor="gray"
                                        numberOfLines={10}
                                        multiline={true}
                                    //  onChangeText = {(text) => setCurrentPassword(text)}
                                    />
                                    ) :
                                        vt == 'Editcontact' ?
                                    (
                                        <TextInput
                                        allowFontScaling={false}
                                        style={sty.postalTxtInput}
                                        placeholderTextColor="gray"
                                        numberOfLines={10}
                                        multiline={true}
                                    //  onChangeText = {(text) => setCurrentPassword(text)}
                                        >{contact_details.address}</TextInput>
                                    ):
                                        <TextInput
                                        allowFontScaling={false}
                                        style={sty.postalTxtInput}
                                        placeholderTextColor="gray"
                                        numberOfLines={10}
                                        multiline={true}
                                        editable = {false}
                                    //  onChangeText = {(text) => setCurrentPassword(text)}
                                        >{contact_details.address}</TextInput>

                                }
                            </View> */}
                <View style={sty.textView}>
                  <Text style={sty.itemTxt} allowFontScaling={false}>
                    Email Address:
                  </Text>
                </View>
                <View style={sty.txtInputView}>
                  {vt == "Addcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.emailText}
                      onChangeText = {(text) => this.setState({ emailText: text })}
                    />
                  ) : vt == "Editcontact" ? (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      value={this.state.emailText}
                      onChangeText = {(text) => this.setState({ emailText: text })}
                    >

                    </TextInput>
                  ) : (
                    <TextInput
                      allowFontScaling={false}
                      style={sty.TxtInput}
                      placeholderTextColor="gray"
                      editable={false}
                      value={this.state.emailText}
                      onChangeText = {(text) => this.setState({ emailText: text })}
                    >

                    </TextInput>
                  )}
                </View>
              </View>
              {vt == "Addcontact" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    height: hp("10"),
                    width: "100%",
                  }}
                >
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.clearListBtn}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  >
                    <Text style={sty.clearListTxt} allowFontScaling={false}>
                      BACK TO CONTACT LIST
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.AddToCartBtn}
                    onPress={() => {

                      if(this.state.nameText == ''){
                        alert("Please enter Name");
                        return;
                      }

                      if(this.state.addressText == ''){
                        alert("Please enter Address");
                        return;
                      }

                      if(this.state.numberText == ''){
                        alert("Please enter Contact Number");
                        return;
                      }

                      if(this.state.emailText == ''){
                        alert("Please enter Email");
                        return;
                      }


                      const data = { name: this.state.nameText, address: this.state.addressText, number: this.state.numberText, email: this.state.emailText };

                      addContact(data).then(res => {

                        alert("Successfully Added");
                        this.setState({ nameText: ''});
                        this.setState({ addressText: ''});
                        this.setState({ numberText: ''});
                        this.setState({ emailText: ''});

                      });



                    }}
                  >
                    <Text style={sty.checkoutTxt} allowFontScaling={false}>
                      SAVE
                    </Text>
                  </TouchableOpacity>

                </View>
              ) : vt == "Editcontact" ? (
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  height: hp("5"),
                  width: "100%",
                }}
                >
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.clearListBtn}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  >
                    <Text style={sty.clearListTxt} allowFontScaling={false}>
                      BACK TO CONTACT LIST
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.AddToCartBtn}
                    onPress={() => {



                      const data = { id: this.state.id, name: this.state.nameText, address: this.state.addressText, number: this.state.numberText, email: this.state.emailText };


                      updateContact(data).then(res => {

                        res == 1 ? alert("Successfully Updateed") : alert("Something went wrong")

                      });


                    }}
                  >
                    <Text style={sty.checkoutTxt} allowFontScaling={false}>
                      UPDATE
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  height: hp("5"),
                  width: "100%",
                }}
                >
                  <TouchableOpacity activeOpacity={0.9}
                    style={sty.clearListBtn}
                    onPress={() => {
                      this.props.navigation.goBack();
                      // this.props.navigation.navigate(contacts();
                    }}
                  >
                    <Text style={sty.clearListTxt} allowFontScaling={false}>
                      BACK TO CONTACT LIST
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
          {/* <View style={sty.mainBox}> */}

          {/* </View> */}

        </View>
      </SafeAreaView>
    );
  }
}

const sty = StyleSheet.create({
  mainBox: {
    width: wp("86"),
    height: hp("10"),
    backgroundColor: "red",
    // borderRadius: 15,
    // flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: hp("-20%"),
  },
  AddToCartBtn: {
    width: wp("92") / 2,
    height: hp("4.5"),
    backgroundColor: colors.primaryColor,
    borderRadius: wp('2'),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  clearListBtn: {
    width: wp("92") / 2,
    height: hp("4.5"),
    borderRadius: wp('2'),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("1"),
    backgroundColor: "#fffcfc",
    borderWidth: hp("0.14"),
    borderColor: colors.primaryColor,
  },
  clearListTxt: {
    fontSize: hp("1.5"),
    color: colors.primaryColor,
    // justifyContent: 'center',
  },
  checkoutTxt: {
    fontSize: hp("1.5"),
    color: "white",
    // justifyContent: 'center',
  },
  cardView: {

    width: wp("100"),
    height: hp("62%"),
    marginBottom: "5%",
    paddingBottom: hp("2"),
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
    // backgroundColor: '#EFF8FB',
    borderColor: "#e6e6e6",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: wp('2'),
    marginTop: hp("1%"),
    borderWidth: hp("0.1"),
  },
  TxtInput: {
    width: "80%",
    height: hp("7"),
    fontSize: hp(1.6),
    //backgroundColor: 'red',
    marginLeft: wp("3"),
    color: "gray",
  },
  itemTxt: {
    height: hp("3"),
    fontSize: hp("1.6"),
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
    height: hp("10"),
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
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
    viewtype_: state.contact.viewtype_,
  };
};

export default connect(mapStateToProps, {
  getCategories,
  getProduct,
})(ContactForm);
