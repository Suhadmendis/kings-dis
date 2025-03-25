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
  Linking 
} from "react-native";
import Styles from "../style/ContactsNotesStyle";
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
import { Dimensions, Platform, PixelRatio } from "react-native";
import * as colors from '../style/Common/ColorsStyle';
const { width: WIDTH, height: height } = Dimensions.get("window");

const { ids, styles } = Styles;

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={sty.container}>
          <Back />

          <View style={{ width: "100%", height: hp("76"), marginTop: "2%" }}>
            <View style={sty.cardView}>
              <ScrollView
                style={{
                  width: "94%",
                }}
              >
                <View style={sty.dateView}>
                  <Text style={sty.dateText}>Privacy Policy</Text>
                </View>
                <View style={sty.nameView}>
                  <Text style={sty.nameText}>Privacy Notice</Text>
                </View>
                <Text style={sty.noteText1}>
                  This privacy notice explains how we use any personal
                  information we collect about you.
                </Text>
                <View style={sty.noteView}>
                  <Text style={sty.noteTextTitle}>
                    This privacy notice explains how we use any personal
                    information we collect about you. What information do we
                    collect about you and why?
                  </Text>
                  <Text style={sty.noteText}>
                    We collect information about you when you request a
                    catalogue or place an order either from our website, phone,
                    email, or post. The only information we ever collect from
                    you will be your normal contact details, which enable us to
                    either despatch your orders, or contact you directly using
                    the contact details you alone provide.
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    Who might we share your information with?
                  </Text>
                  <Text style={sty.noteText}>
                    We do not share or sell information on to third parties.
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    How long do we keep hold of your information?
                  </Text>
                  <Text style={sty.noteText}>
                    Your details are kept on our secure data base whilst you
                    remain a customer or continue to receive our catalogues or
                    marketing information.{" "}
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    How can I access the information you hold about me?{" "}
                  </Text>
                  <Text style={sty.noteText}>
                    You have the right of access, rectification, erasure, to
                    restrict processing, to object, or to lodge a complaint if
                    you believe your data is being used incorrectly. You can opt
                    out of further communications or withdraw consent at any
                    time.{" "}
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    Automated decision making and profiling
                  </Text>
                  <Text style={sty.noteText}>
                    We do not use automated decision making or profiling to
                    process data. We source and process information securely in
                    house with a limited privacy impact.
                  </Text>

                  <Text style={sty.noteTextTitle}>Marketing</Text>
                  <Text style={sty.noteText}>
                    We’d like to send you information about our products and
                    services which may be of interest to you, but of course, you
                    may opt out at a later date.
                  </Text>

                  <Text style={sty.noteTextTitle}>Cookies</Text>
                  <Text style={sty.noteText}>
                    We use cookies to track visitor use of the website and to
                    compile statistical reports on website activity. It’s
                    important to remember cookies do not contain any of your
                    personal information such as name, address, contact numbers
                    or credit card details, please click on the link below for
                    further information. For further information visit{" "}
                    <Text style={{ color: colors.primaryColor,textDecorationLine: 'underline' }}
                    onPress={ ()=> Linking.openURL('https://www.allaboutcookies.org/') }
                    >
                      http://www.allaboutcookies.org/{" "}
                    </Text>
                  </Text>

                  <Text style={sty.noteText}>
                    You can set your browser not to accept cookies and the above
                    website tells you how to remove cookies from your browser.
                    However in a few cases some of our website features may not
                    function as a result.
                  </Text>

                  <Text style={sty.noteTextTitle}>Other websites</Text>
                  <Text style={sty.noteText}>
                    If our website contains links to other websites, although we
                    have taken out our own checks on those sites, our privacy
                    policy only applies to our own website. Therefore, when you
                    link to other websites we would encourage you to read the
                    privacy policy of every website you visit.
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    Credit card & Payment information
                  </Text>
                  <Text style={sty.noteText}>
                    In order to provide the most secure and safe payment process
                    as possible E.W King & Co Ltd do not take payment details
                    directly. Your card payment details are sent to a secure
                    payment gateway, in this case we use Sagepay (which doesn’t
                    require an account), which takes your payment details and
                    processes the payment. Simply E.W King & Co Ltd does not
                    handle this information and the only data we have access to
                    in this form is so we can process refunds and check the
                    fraud status of each payment, we never have access to the
                    full details you entered.
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    Orders received by telephone or post
                  </Text>
                  <Text style={sty.noteText}>
                    Should you want to order over the phone, our phone lines are
                    regularly tested for vulnerabilities, and are always
                    up-to-date with the latest in security updates to ensure a
                    secure connection between yourself and our sales team.
                    Furthermore information that is logged such as credit card
                    details once processed are destroyed at the end of each day
                    safely & securely.
                  </Text>

                  <Text style={sty.noteTextTitle}>
                    Changes to our privacy policy
                  </Text>
                  <Text style={sty.noteText}>
                    We keep our privacy policy under regular review and will
                    update or amend to comply with current legislation. This
                    Privacy notice was updated in May 2018.
                  </Text>

                  <Text style={sty.noteTextTitle}>How to Contact us</Text>
                  <Text style={sty.noteText}>
                    Please contact us if you have any questions about our
                    privacy policy or information we hold about you:
                  </Text>

                  <Text style={{
                    fontSize: txt_note,
                    color: "#9C9C9C",
                    marginTop: hp("1"),
                    width:wp('25'),
                   textDecorationLine: 'underline'
                  }}>
                    Address:
                  </Text>
                  <Text style={{
                    fontSize: txt_note,
                    color: "#9C9C9C",
                    marginTop: hp("0.3"),
                    width:wp('25')
                  }}>E W King & Co Ltd Monks Farm Pantlings Lane
                    Kelvedon Essex CO5 9PG 
                  </Text>

                  <Text style={{
                    fontSize: txt_note,
                    color: "#9C9C9C",
                    marginTop: hp("1"),
                    width:wp('50')
                  }}> 
                  Telephone: 01376 570000</Text>
                  <Text style={{
                    fontSize: txt_note,
                    color: "#9C9C9C",
                    marginTop: hp("0"),
                    width:wp('50')
                  }}> 
                  Fax: 01376571189
                  </Text>
                  <Text style={{
                    fontSize: txt_note,
                    color: "#9C9C9C",
                    marginTop: hp("0"),
                    width:wp('50')
                  }}>Email: sales@kingsseeds.com
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

let widthper = wp("100%");
let txt_date = 0;
let txt_name = 0;
let txt_note = 0;
if (widthper <= 500.0) {
  txt_date = hp("2.2");
  txt_name = hp("1.8");
  txt_note = hp("1.5");
} else {
  txt_date = hp("2.2");
  txt_name = hp("1.8");
  txt_note = hp("1.5");
}

const sty = StyleSheet.create({
  container: {
    //flex: 1,
    width: WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  titleView: {
    width: "94%",
    height: hp("4"),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dateView: {},
  nameView: {
    marginTop: hp("1"),
  },
  noteView: {
    marginTop: hp("1"),
  },

  dateText: {
    fontSize: txt_date,
    fontWeight: "bold",
    color:'black'
  },
  nameText: {
    fontSize: txt_name,
    color: colors.primaryColor,
  },
  noteText: {
    fontSize: txt_note,
    color: "#9C9C9C",
    marginTop: hp("0.3"),
  },

  cardView: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  textView: {
    width: "92%",
    height: hp("3"),
    //backgroundColor: 'red',
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: hp("1"),
  },
  noteTextTitle: {
    fontSize: txt_note + 0.5,
    marginTop: hp("0.5"),
    color:'black'
  },
  noteText1: {
    fontSize: txt_note,
    color: "#9C9C9C",
    marginTop: hp("1"),
  },
});

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
  };
};

export default connect(mapStateToProps, {
  getCategories,
  getProduct,
})(PrivacyPolicy);
