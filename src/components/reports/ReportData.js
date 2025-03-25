import { Platform } from "react-native";
import openDatabaseService from "../../offline/Config";
import { RawQuery } from "../../offline/Services/DataHelper";
import DeviceInfo from "react-native-device-info";
import { store } from "../../../configureStore";
import { getReportData, getReportListResource } from "../../url/API";
import { convertToHumanReadable } from "../common/DateTimeGeneration";
// const db = openDatabaseService();

export default async function GetReport() {
  return "version.appVersion";
}

export async function GetReportList() {


  let state = store.getState();
  let customerUserID = state.login.accountInfo.customerUserID;


  const reportListResource = await getReportListResource(customerUserID);
  return reportListResource.reports;

}
export async function GetTableData(reportPayload) {
  let reportRes = [];
  let tableDataRes = [];
  let tableData;
  reportRes = await getTableDataResource(reportPayload);
  tableDataRes = reportRes;

  tableDataRes = tableDataRes.map(element => {
    // Create a new object with updated values
    const updatedElement = { ...element };

    Object.keys(updatedElement).forEach(key => {
        updatedElement[key] = dataInspection(updatedElement[key]);
    });

    return updatedElement; // Return the updated element
});

  if (tableDataRes.length > 0) {
    let tableFirstRow = tableDataRes[0];
    let tableHead = [tableDataRes[0]].flatMap(Object.keys);
    tableHead = tableHead.map((element) => {
      const correteAligment = getCorreteAligment(tableFirstRow[element]);
      console.log('element');
      console.log(element);

      return {
        value: element,
        columnName: capitalizeAndAddSpaces(element),
        aligment: correteAligment,
      };
    });

    tableData = {
      tableHead,
      tableData: tableDataRes,
    };
  }else{
    tableData = {
      tableHead: [],
      tableData: [],
    };
  }

  return tableData;
}
const getCorreteAligment = (value) => {
  if (typeof value === "number") {
    if (value % 1 !== 0) {
      return "flex-end";
    }
  }

  return "center";
};
async function getTableDataResource(reportPayload) {
  let getReportRes = [];
  let reportData = [];

  let fromDate = reportPayload.fromDate;
  let toDate = reportPayload.toDate;
  let repUserID = reportPayload.repUserID;
  let pageSize = reportPayload.pageSize;
  let offset = reportPayload.offset;
  let report = reportPayload.reportName;

  getReportRes = await getReportData(
    report,
    offset,
    pageSize,
    fromDate,
    toDate,
    repUserID
  );



  if (getReportRes.data == undefined) {
    reportData = [];
  } else {
    reportData = getReportRes.data.map((value) => {
      return {
        customer: value.customer,
        orderDate: value.orderDate,
        orderTotalPrice: value.orderTotalPrice,
        rep: value.rep,
      };
    });
  }

  return reportData;
}


function capitalizeAndAddSpaces(string) {
  if (!string) return "";

  // Add spaces before each uppercase letter and capitalize the first letter
  const spacedString = string.replace(/([A-Z])/g, ' $1');
  return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
}

function dataInspection(value) {
  switch (true) {
    // Check if value is a date-time string
    case typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(value):
      value = convertToHumanReadable(value);
      return value; // Return "datetime" if the format matches

    default:
      console.log("Value:", value);
      return value; // Return the original value if no match is found
  }
}