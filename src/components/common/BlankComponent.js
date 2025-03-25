import React, { Component } from "react";
import {
  View,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { store } from "../../../configureStore";
import { AppToastMessage } from "../components/common/AppToastMessage";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { RawQuery } from "../../offline/Services/DataHelper";
import * as colors from "../../style/Common/ColorsStyle";
import { Calendar } from "react-native-big-calendar";
import EventCalendar from "react-native-events-calendar";
import { check } from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import { LocalDTToSqlDT } from "../helperComponents/MssqlDTToSqlDT";

class BlankComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSyncOptions: false,
      connection_status: false,
      syncProcessStatus: false,
      connection_sync_trigger: "0",

      appState: null,
      tableInfo: {},
    };
  }

  componentDidMount() {
    this.checkRedux();
    this.checkTable();
  }

  async checkRedux() {
    let appState = store.getState();
    const text = JSON.stringify(appState);
    this.setState({ appState: text });
  }

  async checkTable() {
    const res = await RawQuery(
      `SELECT * FROM sqlite_master where type ='table'`
    );
    let tableRes;
    const tableCount = res.length;
    let totalRaws = 0;
    let tableInfo = [];

    for (let index = 0; index < res.length; index++) {
      const element = res.item(index);
      // console.log(element.name);
      tableRes = await RawQuery(`SELECT * FROM ${element.name}`);
      // console.log(tableRes.length);
      tableInfo.push({ name: element.name, count: tableRes.length });
      totalRaws += tableRes.length;
      this.setState({
        tableInfo: { count: tableCount, info: tableInfo, totalRaws },
      });
    }
    // console.log(this.state.tableInfo.info);
  }

  render() {
    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();

    return (
      <View>
        <ScrollView>
          <Text>App State</Text>
          <Text></Text>
          <Text>{this.state.appState}</Text>

          <Text></Text>
          <Text>App Version: {appVersion}</Text>

          <Text></Text>
          <Text>Build Number: {buildNumber}</Text>
          <Text></Text>
          <Text>Table Info</Text>
          <Text></Text>
          <Text>Table Count: {this.state.tableInfo.count}</Text>
          <Text></Text>

          {this.state.tableInfo.info?.map((element) => {
            console.log(element.name);
            return (
              <Text>
                Table Name: {element.name} Table Count: {element.count}
              </Text>
            );
          })}

          <Text></Text>
          <Text>Table Records: {this.state.tableInfo.totalRaws}</Text>
          <Text></Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(BlankComponent);
