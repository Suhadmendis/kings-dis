import { Platform } from "react-native";
import openDatabaseService from "../../offline/Config";
import { RawQuery } from "../../offline/Services/DataHelper";
import DeviceInfo from "react-native-device-info";

const db = openDatabaseService();

export default async function AppVersion() {
  const version = getVersion();
  return version.appVersion;
}

function getVersion() {
  const appVersion = DeviceInfo.getVersion();

  const buildNumber = DeviceInfo.getBuildNumber();

  const version = { appVersion, buildNumber };

  return version;
}

export async function setVersion() {
  const version = getVersion();
  await RawQuery(`UPDATE local_info SET AppVersion = '${version.appVersion}'`);
  await RawQuery(`UPDATE local_info SET BuildNumber = '${version.buildNumber}'`);
}

export async function getLocalVersion() {
  let res = await RawQuery(`SELECT * FROM local_info limit 1`);

  let version = { appVersion: "", buildNumber: "" };
  if (res.length > 0) {
    version.appVersion = res.item(0).AppVersion;
    version.buildNumber = res.item(0).BuildNumber;

    return version;
  } else {
    return version;
  }
}


export async function compareVersions() {

  const appVersion = getVersion();
  const localAppVersion = await getLocalVersion();

  let isEqual = false;
  let abc = await RawQuery('SELECT * FROM local_com_orderitem' );


  if (appVersion.appVersion == localAppVersion.appVersion) {
    if (appVersion.buildNumber == localAppVersion.buildNumber) { isEqual = true; }
  }



  return isEqual;

}
export async function appUpdateIdentified() {

  const deleteAppTables = await deleteTables();

}
export async function isTableExist(tableName) {
  
  let res = await RawQuery(`SELECT count(*) as count FROM sqlite_master where type ='table' and name = '${tableName}'`);
  
return res.item(0).count > 0;
}

async function deleteTables() {

  let results = [];
  let result;

  result = await RawQuery (`DROP TABLE local_cms_role`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_cms_user`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_cms_userrole`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_customer`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_address`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_shoppingcart`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_com_shoppingcartsku`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_cms_settingskey`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_ct_customercontacts`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_orderstatus`);
 results.push(result); 
 result = await RawQuery ( `DROP TABLE local_ct_tradeaccount`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_tradeaccountcustomer`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_ct_deliverymatrix`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_countrygroup`);
  results.push(result); 
  result = await RawQuery  (`DROP TABLE local_ct_postcodes`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_postcodezone`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_shippingoption`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_int_salestax`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_ct_quotes`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_quotestatus`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_quotestatususer`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_cms_culture`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_cms_resource`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_cms_resourcestring`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_cms_resourcetranslation`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_storecomments`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_ct_deliveryfactors`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_paymentoption`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_orderpad`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_contacts`);
  results.push(result);
  result = await RawQuery ( `DROP TABLE local_int_contactnotes`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_order`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_orderitem`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_com_orderaddress`);
  results.push(result);
  result = await RawQuery  (`DROP TABLE local_temp_discount`);
  results.push(result);


return results;
}