import { Platform } from "react-native";
import openDatabaseService from "../../offline/Config";
import { RawQuery } from "../../offline/Services/DataHelper";
import DeviceInfo from "react-native-device-info";

const db = openDatabaseService();

export default async function AppVersion() {

  return 'Test';
}


export async function isTableEmpty(tableName) {


    let query = `SELECT count(*) as Count FROM ${tableName}`;
    let res = await RawQuery(query);

    return res.item(0).Count == 0 ? true : false;
}