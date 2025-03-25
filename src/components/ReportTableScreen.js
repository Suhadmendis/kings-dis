import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import { connect } from "react-redux";
import SampleReportComponent from "./reports/SampleReportComponent";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import Styles from "../style/ReportListStyle";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GetReportList } from "./reports/ReportData";

const search = require("../assets/search-green.png");

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");

const { ids, styles } = Styles;

class ReportTableScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      reportName: "",
      reports: [],

    };
  }

  componentDidMount() {

      this.setState({ reportName: this.props.route?.params?.reportName });


  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Header /> */}
        <Back />
        <View style={styles.titleView}>
          <Text style={styles.titleTxt}>{this.props.route?.params?.reportName1}</Text>
          </View>
        <View style={styles.container}>
          {
            this.state.reportName != '' ? (
              <SampleReportComponent report={{ reportName: this.state.reportName}} />
            ) : null
          }
        </View>


        {/* <Footer/> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
  };
};

export default connect(mapStateToProps, {})(ReportTableScreen);
