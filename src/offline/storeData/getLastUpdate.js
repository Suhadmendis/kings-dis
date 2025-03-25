import openDatabaseService from '../Config';
import getDateTime from './../getGeneratedData/dateTime';



async function getLastUpdate(tableName) {

  const db = openDatabaseService();



  if (tableName == 'local_com_shoppingcartsku') {
    tableName = 'local_com_shoppingcart';
  }
  
  const lastModifiedFeild = getLastModifiedFeild(tableName);

  return new Promise((resolve, reject) => {


    db.transaction(tx => {

      
      tx.executeSql(`SELECT * FROM ${tableName} order by ${lastModifiedFeild} DESC limit 1`, [],
      function (tx, res) {
        if (res.rows.length == 0) {
          resolve(null);  
        }else{
          resolve(res.rows.item(0)[lastModifiedFeild]);
        }
      });

    });
  });
}

export default getLastUpdate;

function getLastModifiedFeild(tableName){

  if (tableName == 'local_cms_country') { return 'CountryLastModified'; }
  if (tableName == 'local_cms_state') { return 'StateLastModified'; }
  if (tableName == 'local_cms_role') { return 'RoleLastModified'; }
  if (tableName == 'local_cms_user') { return 'UserLastModified'; }
  if (tableName == 'local_cms_userrole') { return 'CMS_UserRole'; }
  if (tableName == 'local_com_customer') { return 'CustomerLastModified'; }
  if (tableName == 'local_com_address') { return 'AddressLastModified'; }
  if (tableName == 'local_ct_userappointments') { return 'ItemModifiedWhen'; }

  if (tableName == 'local_ct_customercontacts') { return 'ItemModifiedWhen'; }
  
  
  if (tableName == 'local_com_sku') { return 'SKULastModified'; }
  if (tableName == 'local_com_shoppingcart') { return 'ShoppingCartLastUpdate'; }



  if (tableName == 'local_cms_settingskey') { return 'KeyLastModified'; }

  
  // RETURN same as local_com_shoppingcart
  if (tableName == 'local_com_shoppingcartsku') { return 'COM_ShoppingCart'; }

  if (tableName == 'local_com_order') { return 'OrderLastModified'; }
  if (tableName == 'local_com_orderaddress') { return 'AddressLastModified'; }

  // RETURN same as local_com_order
  if (tableName == 'local_com_orderitem') { return 'OrderItemLastModified'; }
  if (tableName == 'local_com_orderstatus') { return 'StatusLastModified'; }
  if (tableName == 'local_ct_tradeaccount') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_tradeaccountcustomer') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_deliverymatrix') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_countrygroup') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_postcodes') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_postcodezone') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_com_shippingoption') { return 'ShippingOptionLastModified'; }
  if (tableName == 'local_int_salestax') { return 'LastUpdate'; }
  if (tableName == 'local_int_analysis') { return 'LastUpdate'; }
  if (tableName == 'local_ct_quotes') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_quotestatus') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_ct_quotestatususer') { return 'ItemModifiedWhen'; }

  if (tableName == 'local_cms_culture') { return 'CultureLastModified'; }
  if (tableName == 'local_cms_resource') { return 'ResourceLastModified'; }
  if (tableName == 'local_cms_resourcestring') { return 'CMS_ResourceString'; }
  if (tableName == 'local_cms_resourcetranslation') { return 'CMS_ResourceTranslation'; }
  if (tableName == 'local_int_navigation') { return 'LastUpdate'; }
  if (tableName == 'local_int_nav_attributes') { return 'LastUpdate'; }
  if (tableName == 'local_ct_deliveryfactors') { return 'ItemModifiedWhen'; }
  if (tableName == 'local_com_paymentoption') { return 'PaymentOptionLastModified'; }
  if (tableName == 'local_ct_storecomments') { return 'ItemModifiedWhen'; }

}
