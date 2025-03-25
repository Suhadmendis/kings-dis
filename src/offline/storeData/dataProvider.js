import getBaseUrl from '../../url/getBaseUrl';
import { GetWorkingAsCustomerID } from '../Services/UserHelper';

export default async function totalSync(token, tableName, LastUpdate, from, to, viewType) {

  tableName = getCloudTableName(tableName);




  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
  if (viewType == 'CUSTOMER' && tableName == "COM_Order") { myHeaders.append("WorkingAsCustomerID", GetWorkingAsCustomerID()); }


  let customBody;

  // console.log('===============================fs=');
  // console.log(tableName);
  // console.log(from);
  // console.log(to);

  if (tableName == "COM_Order") {
    customBody = {
      "Sources": [
        {
          "Source": tableName,
          "FromDate": from, //"2021-09-22T00:54:12",
          "ToDate": to //"2021-09-22T00:54:12"
        }
      ]
    }

  }else{
    customBody = {
      "Sources": [
        {
          "Source": tableName,
          "LastUpdate": LastUpdate
          // "LastUpdate": "2021-09-22T00:54:12"
        }
      ]
    }

  }



  var raw = JSON.stringify(customBody);



  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${getBaseUrl()}Sync/LatestSync`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response).sources)
    .then(result => {


      if (result[0].data) {


        // if (tableName == 'COM_Order') {
          // return dataPrevention(result[0].data);
        // }else{
          return result[0].data;
        // }
      }else{
        return [];
      }

    })
    .catch(error => {
      console.log('data Error', error)
      return "ERROR";
    });
}

function dataPrevention(data) {
  // Filter out elements where orderStatusID is 18
  const filteredData = data.filter(item => item.orderStatusID !== 18);

  console.log(filteredData);

  return filteredData;
}

function getCloudTableName(tableName) {


  try {

  if (tableName == 'local_cms_country') { return 'CMS_Country'; }
  if (tableName == 'local_cms_state') { return 'CMS_State'; }
  if (tableName == 'local_cms_role') { return 'CMS_Role'; }
  if (tableName == 'local_cms_user') { return 'CMS_User'; }
  if (tableName == 'local_cms_userrole') { return 'CMS_UserRole'; }
  if (tableName == 'local_com_customer') { return 'COM_Customer'; }
  if (tableName == 'local_com_address') { return 'COM_Address'; }
  if (tableName == 'local_ct_userappointments') { return 'ct_userappointments'; }
  if (tableName == 'local_com_sku') { return 'COM_SKU'; }
  if (tableName == 'local_com_shoppingcart') { return 'COM_ShoppingCart'; }


  if (tableName == 'local_ct_customercontacts') { return 'ct_customercontacts'; }

  // RETURN same as local_com_shoppingcart
  if (tableName == 'local_com_shoppingcartsku') { return 'COM_ShoppingCart'; }

  if (tableName == 'local_com_order') { return 'COM_Order'; }
  if (tableName == 'local_com_orderaddress') { return 'COM_Order'; }


  if (tableName == 'local_cms_settingskey') { return 'CMS_SettingsKey'; }


  // RETURN same as local_com_order
  if (tableName == 'local_com_orderitem') { return 'COM_Order'; }
  if (tableName == 'local_com_orderstatus') { return 'COM_OrderStatus'; }
  if (tableName == 'local_ct_tradeaccount') { return 'ct_TradeAccount'; }
  if (tableName == 'local_ct_tradeaccountcustomer') { return 'ct_TradeAccountCustomer'; }
  if (tableName == 'local_ct_deliverymatrix') { return 'ct_DeliveryMatrix'; }
  if (tableName == 'local_ct_countrygroup') { return 'ct_CountryGroup'; }
  if (tableName == 'local_ct_postcodes') { return 'ct_Postcodes'; }
  if (tableName == 'local_ct_postcodezone') { return 'ct_PostcodeZone'; }
  if (tableName == 'local_com_shippingoption') { return 'COM_ShippingOption'; }
  if (tableName == 'local_int_salestax') { return 'int_salestax'; }
  if (tableName == 'local_int_analysis') { return 'int_analysis'; }
  if (tableName == 'local_ct_quotes') { return 'ct_Quotes'; }
  if (tableName == 'local_ct_quotestatus') { return 'ct_QuoteStatus'; }
  if (tableName == 'local_ct_quotestatususer') { return 'ct_QuoteStatusUser'; }

  if (tableName == 'local_cms_culture') { return 'CMS_Culture'; }
  if (tableName == 'local_cms_resource') { return 'CMS_Resource'; }
  if (tableName == 'local_cms_resourcestring') { return 'CMS_ResourceString'; }
  if (tableName == 'local_cms_resourcetranslation') { return 'CMS_ResourceTranslation'; }
  if (tableName == 'local_int_navigation') { return 'int_Navigation'; }
  if (tableName == 'local_int_nav_attributes') { return 'int_Nav_Attributes'; }

  if (tableName == 'local_ct_deliveryfactors') { return 'ct_DeliveryFactors'; }
  if (tableName == 'local_com_paymentoption') { return 'COM_PaymentOption'; }


  if (tableName == 'local_ct_storecomments') { return 'ct_StoreComments'; }
} catch (error) {console.error("An error 1", error);}
}
