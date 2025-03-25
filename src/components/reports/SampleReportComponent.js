import { ScrollView, StyleSheet, Text, View,TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../../style/SampleReportStyle";
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from "@react-navigation/native";
import * as colors from '../../style/Common/ColorsStyle';
import GetReport, { GetTableData } from "./ReportData";
import { useSelector } from "react-redux";
import { DataTable } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { showMessage } from "react-native-flash-message";

const { ids, styles } = Styles;

export default function SampleReportComponent(props) {
  const isFocused = useIsFocused();
  console.log(props.report.reportName);

  const reportName = props.report.reportName;
  const calicn = require("../../assets/Calendar/calendardate2x.png");
  const [loadingStatus, setLoadingStatus] = useState("INITIAL");
  const [tableHead, setTableHead] = useState([]);

  const [headAlign, setHeaderAlign] = useState('');
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateType, setDateType] = useState('');

  const [data, setData] = useState([]);

  const { connectionStatus } = useSelector((s) => s.loading);
  const findStore = useSelector((s) => s.findStore);
  const login = useSelector((s) => s.login);

  const [offset, setOffset] = useState("0");
  const [pageSize, setPageSize] = useState("48");
  const [fromDate, setFromDate] = useState('2024.06.01');
  const [toDate, setToDate] = useState('2024.09.10');
  const [repUserID, setEepUserID] = useState();
console.log(login.accountInfo);
console.log(login.accountInfo.customerUserID);



  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    const sortedData = [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setData(sortedData);
  };

  useEffect(() => {


    // let storeName= state.findStore?.selItemName;
    setLoadingStatus("INITIAL");
    getDate()
    setOffset('0')
    setPageSize('10000')

    // setEepUserID(96528)
    setTableHead([]);
    setData([])


    setEepUserID(login.accountInfo.customerUserID);

  initial();





  }, [isFocused]);


  useEffect(() => {
    initial();
  }, [fromDate, toDate]);

  const initial = async () => {
    let payload = {
      reportName,
      offset,
      pageSize,
      fromDate,
      toDate,
      repUserID,
    }



    console.log(payload);

    const { tableHead, tableData } = await GetTableData(payload);
    console.log('initial---fdsf------ff---------------');
    console.log(tableHead);

    setTableHead(tableHead);
    setData(tableData)

    setLoadingStatus("LOADED");
  };


  const getDate = () => {

    let currentDate = new Date();

    //set defalt end date is the current date
    let endDateDefalt = currentDate.toISOString().replace('Z', '');
    let endDateDefaltFormate = moment(date).format("YYYY-MM-DD");
    setToDate(endDateDefaltFormate)
    //set defalt start date as 3 years leter
    currentDate.setFullYear(currentDate.getFullYear() - 3);
    let date = currentDate.toISOString().replace('Z', '');
    let startDateLater = moment(date).format("YYYY-MM-DD");
   setFromDate(startDateLater)

}
handleConfirm = (date) => {


  date = moment(date).format("YYYY-MM-DD");


  let tStartDate = fromDate;
  let tEndDate = toDate;

  if (dateType == 'startDate') {

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

      setFromDate(date)
      hideDatePicker();

      // filterResultsByDateRange(date, tEndDate);
    }

    hideDatePicker();
  } else {

    if (tStartDate != null && moment(date).isBefore(tStartDate, 'day')) {
      showMessage({
        message: "KINGS SEEDS",
        description: "End date should be greater than or equal to the start date",
        type: "warning",
        autoHide: true,
      });
    } else {
      setToDate(date)
     hideDatePicker();

    }
  }
};
const showDatePicker = (type) => {
  if (type == 'startDate') {
    setSelectedDate(convertToDateObject(fromDate))
  }
  if (type == 'endDate') {
    setSelectedDate(convertToDateObject(toDate))
  }

  setIsStartDatePickerVisible(true)
  setDateType(type)
};
hideDatePicker = () => {
  setIsStartDatePickerVisible(false);
  };
const  convertToDateObject = (dateString) => {
  if (!dateString) {
    return new Date();
  }
}
  const checkLoadingStatus = () => {
    if (connectionStatus) {
      if (loadingStatus == "INITIAL") {
        return false;
      }
      if (loadingStatus == "LOADING") {
        return false;
      }
      if (loadingStatus == "LOADED") {
        return true;
      }
    } else {
      return false;
    }
  };
const getCorreteAligment = (value) => {
  if (typeof value === 'number') {
    if (value % 1 !== 0) {
      return 'flex-end';
    }
  }

  return 'center';
}
  return (
    <View style={styles.container}>



{/* <Picker
          selectedValue={pageSize}
          onValueChange={(value) => {
            // setPageSize(value);
            // setCurrentPage(0); // Reset to first page when page size changes
          }}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="50" value={50} />
        </Picker> */}
      {checkLoadingStatus() ? (
        <View style={styles.container}>
            <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.dateView}>
<TouchableOpacity
             style={styles.dateBtn}
              onPress={() => showDatePicker('startDate')}>
              <Text style={{color: '#1ED18C'}}>
                {fromDate != null ? fromDate : 'From'}
              </Text>
              <View
                style={[
                  {
                    marginLeft: '10%',
                  },
                  fromDate != null ? {display: 'none'} : null,
                ]}>
                <Image source={calicn} style={styles.cardImg} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => showDatePicker('endDate')}>
              <Text style={{color: '#1ED18C'}}>
                {toDate != null ? toDate : 'To'}
              </Text>

              <View
                style={[
                  {
                    marginLeft: '10%',
                  },
                  toDate != null ? {display: 'none'} : null,
                ]}>
                <Image source={calicn} style={styles.cardImg} />
              </View>
            </TouchableOpacity>
</View>
<View style={{ flex: 1 }}>
  <ScrollView horizontal>
    <ScrollView style={{ flex: 1 }}>
      {
        tableHead.length > 0 ? (
<DataTable>
        <DataTable.Header
          style={{
            backgroundColor: colors.primaryColor,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          {tableHead.map((item, index) => (
            <DataTable.Title
              key={index}
              style={[
                styles.dataTableHeader,
                {
                  justifyContent: item.aligment,
                  width: 250,
                  paddingLeft: 15,
                  paddingRight: 15,
                },
              ]}
              onPress={() => handleSort(item.value)}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                {item.columnName}
              </Text>
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {data.map((item, index) => (
          <DataTable.Row key={index}>
            {tableHead.map((headerItem, index) => (
              <DataTable.Cell
                key={index}
                style={[
                  styles.dataTableColumn,
                  {
                    justifyContent: headerItem.aligment,
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: 250,
                    paddingLeft: 15,
                    paddingRight: 15,
                  },
                ]}
              >
                {item[headerItem.value]}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
        ) : (
          <Text>No Records</Text>
        )
      }

    </ScrollView>
  </ScrollView>
</View>
        </View>
      ) : (
        <Text>{connectionStatus ? "Loading" : "No Network"}</Text>
      )}
    </View>
  );
}
