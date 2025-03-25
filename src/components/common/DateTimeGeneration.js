import { Platform } from "react-native";
import openDatabaseService from "../../offline/Config";
import { RawQuery } from "../../offline/Services/DataHelper";
import DeviceInfo from "react-native-device-info";
import moment from 'moment-timezone';

const db = openDatabaseService();

export default async function DateTimeGeneration() {}

export function momentUTSLocal(datetime) {
  let formattedDateTime = moment
    .utc(datetime)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  if (formattedDateTime == "Invalid date") {
    const dateObject = new Date(datetime);

    return moment.utc(dateObject).local().format("YYYY-MM-DD HH:mm:ss");
  } else {
    return moment.utc(datetime).local().format("YYYY-MM-DD HH:mm:ss");
  }
}


export function momentUKLocal(datetime) {
  let formattedDateTime = moment
    .utc(datetime)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  if (formattedDateTime == "Invalid date") {
    const dateObject = new Date(datetime);

    return moment.tz(dateObject, "Europe/London").local().format("YYYY-MM-DD HH:mm:ss");
  } else {
    return moment.tz(datetime, "Europe/London").local().format("YYYY-MM-DD HH:mm:ss");
  }
}


export function convertToHumanReadable(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(); // Default locale and options
}