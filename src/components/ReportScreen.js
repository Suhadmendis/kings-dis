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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { store } from "../../configureStore";

const search = require("../assets/search-green.png");

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
// const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");
const viewicon = require("../assets/view.png");
const calicn = require("../assets/Calendar/calendardate2x.png");

const { ids, styles } = Styles;


class ReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      reportName: "app_salesbyrep",
      reports: [],
      startDate:null,
      endDate:null,
      isStartDatePickerVisible:false,
      dateType:'',
      selectedDate:null,
    };
  }

  componentDidMount() {
    this.getDate()
    this.initial();
  }
// componentDidUpdate() {
//   this.getDate()
// }
  async initial() {

    const reports = await GetReportList();

    this.setState({ reports });
  }

   handleConfirm = (date) => {


    date = moment(date).format("YYYY-MM-DD");


    let tStartDate = this.startDate;
    let tEndDate = this.endDate;

    if (this.state.dateType == 'startDate') {

      if (tEndDate == null) {
        tEndDate = moment().format("YYYY-MM-DD"); // default to today
      }
      if (moment(date).isAfter(tEndDate, 'day')) {
        showMessage({
          message: "KINGS SEEDS",
          description: "Start date should be smaller than or equal to the end date",
          type: "warning",
          autoHide: true,
        });
      } else {

        this.setState({startDate: date});
        console.log('555555555555555555555555555 ',date);
        this.hideDatePicker();
        // filterResultsByDateRange(date, tEndDate);
      }

      this.hideDatePicker();
    } else {

      if (tStartDate != null && moment(date).isBefore(tStartDate, 'day')) {
        showMessage({
          message: "KINGS SEEDS",
          description: "End date should be greater than or equal to the start date",
          type: "warning",
          autoHide: true,
        });
      } else {
        this.setState({endDate: date});
        this.hideDatePicker();
      }
    }
  };

 hideDatePicker = () => {
  // this.getDate()
  this.setState({isStartDatePickerVisible: false});

  };
    getDate(){

    let currentDate = new Date();

    //set defalt end date is the current date
    let endDateDefalt = currentDate.toISOString().replace('Z', '');
    let endDateDefaltFormate = moment(date).format("YYYY-MM-DD");
    this.setState({endDate: endDateDefaltFormate})

    //set defalt start date as 3 years leter
    currentDate.setFullYear(currentDate.getFullYear() - 3);
    let date = currentDate.toISOString().replace('Z', '');
    let startDateLater = moment(date).format("YYYY-MM-DD");
   this.setState({startDate:startDateLater})


}

  showDatePicker = (type) => {
    if (type == 'startDate') {
      this.setState({ selectedDate: this.convertToDateObject(this.state.startDate) });
    }
    if (type == 'endDate') {
      this.setState({ selectedDate: this.convertToDateObject(this.state.endDate) });
    }

    this.setState({isStartDatePickerVisible: true});
    this.setState({dateType: type});
  };
 convertToDateObject(dateString) {
    if (!dateString) {
      return new Date();
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Header /> */}
        <Back />
        <DateTimePickerModal
          isVisible={this.state.isStartDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
<View style={styles.titleView}>
  <Text style={styles.titleTxt}>Reports</Text>
</View>

        <View style={styles.container}>
          {this.state.reports.map((report) => {
            return (
              <View
              style={styles.listItem}

              >
                <View style={styles.insideView1}>
                { <Text style={styles.insideTitle}>{report.reportname}</Text> }
                </View>

                <View style={styles.iconView}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.eyeBtn}
                      onPress={() => {
                        console.log('this.props.navigation.navigate("sync")');

                        // this.props.navigation.navigate()
                        // this.props.navigation.navigate("sync");
                        this.props.navigation.navigate('reportTableScreen', {
                          reportName: report.reportcode,
                          reportName1: report.reportname
                        });

                        // report.reportcode
                      }}
                    >
                      <Image source={viewicon} style={styles.cardImg} />
                    </TouchableOpacity>
                      </View>



              </View>
            );
          })}
        </View>

        {/* <SampleReportComponent report={{ reportName: this.state.reportName}} /> */}
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

export default connect(mapStateToProps, {})(ReportScreen);
