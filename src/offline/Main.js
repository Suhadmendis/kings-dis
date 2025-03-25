
import getValidToken from "./Token";
import inspectTable from "./storeData/inspectTable";
import createTable from "./storeData/createTable";
import insertData from "./storeData/insertData";
import submited from "./storeData/submitData";
import submitedQuoteDiscount from "./storeData/quoteDiscount";
import getLastUpdate from "./storeData/getLastUpdate";
import totalSync from "./storeData/dataProvider";
import getTradeAccountData from "./storeData/discountDataProvider";
import getLocalDataSet from "./storeData/LocalData";
import updateTradeAccountData from "./storeData/updateTradeAccountData";
import createView from "./storeData/createView";


import quotesToServer from "./storeData/quotesToServer";

// import getQuotesDataSet from "../components/test";

import getQuotesDataSet from "../components/test";
import getCartsDataSet from "../components/testCart";



import sendQuotestoServer from "../components/test1";
import sendCartstoServer from "../components/test1Cart";

import deleteFromLocal from "../components/test2";



import UploadAppointments from "../../src/components/appointments/UploadAppointments";
import UpdateAppointmentsSync from "../../src/components/appointments/UpdateAppointmentsSync";


import addressUploadData from "./storeData/addressUploadData";
import uploadReadyToSyncAddresses from "./localData/serviceData/uploadReadyToSyncAddresses";
import reUpdateAddressData from "./storeData/reUpdateAddressData";

import findNewUser from './getGeneratedData/findNewUser';
import findFirstLoad from './getGeneratedData/findFirstLoad';

import storeCommentData from "./storeData/storeCommentData";
import storeCommentDataProvider from "./storeData/storeCommentDataProvider";
import updateStoreCommentData from "./storeData/updateStoreCommentData";


import getLocalAddresses from "../../src/components/addresses/getLocalAddresses";
import uploadContacts from "../components/contacts/uploadContacts";
import { Platform } from "react-native";
import { RawQuery } from "./Services/DataHelper";
import { isTableEmpty } from "../components/common/SyncHelper";
import deleteLocalRows from "./storeData/bulkDelete";
import { appUpdateIdentified, compareVersions, setVersion } from "../components/common/AppVersion";

async function Main(token,getnNewProducts, startChangeStatus, endChangeStatus, syncType, from, to, viewType) {

    startChangeStatus();

    const res = await startProcess(token, getnNewProducts, endChangeStatus, syncType, from, to, viewType);


    if (res == 'ERROR') { return 'ERROR'; }

    const operationStatus = 'STARTED';

    return operationStatus;
}



async function startProcess(token, getnNewProducts, endChangeStatus, syncType, from, to, viewType) {



    let isNewUser = await findNewUser();
    let isInitial = '';

    if (!isNewUser) {
        const isEqual = await compareVersions();
        if (!isEqual) {
            isNewUser = true; // after app updates, consider as a new user
            await appUpdateIdentified();
        }
    }

    if (syncType == 'CHECK') {

        const ct_CustomerContacts = await tableDataOperation(token, 'local_ct_customercontacts', isInitial); // done
            if (ct_CustomerContacts == 'ERROR') { return "ERROR"; }



        const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);
    }

    if (syncType == 'FULL SYNC') {

        if(isNewUser){
        // if(true){

            isInitial = true;
            // const token = await getValidToken();
            // const int_Navigation = await tableDataOperation(token, 'local_int_navigation', isInitial); // done
            await delay();

        const CMS_Country = await tableDataOperation(token, 'local_cms_country', isInitial); //done
        if (CMS_Country == 'ERROR') { return "ERROR"; }


        const COM_SKU = await tableDataOperation(token, 'local_com_sku', isInitial); //done
        if (COM_SKU == 'ERROR') { return "ERROR"; }

        const CMS_State = await tableDataOperation(token, 'local_cms_state', isInitial); //done
        if (CMS_State == 'ERROR') { return "ERROR"; }

        const CMS_Role = await tableDataOperation(token, 'local_cms_role', isInitial); //done
        if (CMS_Role == 'ERROR') { return "ERROR"; }

        const CMS_User = await tableDataOperation(token, 'local_cms_user', isInitial); //done
        if (CMS_User == 'ERROR') { return "ERROR"; }

        const CMS_UserRole = await tableDataOperation(token, 'local_cms_userrole', isInitial); //done
        if (CMS_UserRole == 'ERROR') { return "ERROR"; }

        const COM_Customer = await tableDataOperation(token, 'local_com_customer', isInitial); //done
        if (COM_Customer == 'ERROR') { return "ERROR"; }

        const COM_Address = await tableDataOperation(token, 'local_com_address', isInitial); //done
        if (COM_Address == 'ERROR') { return "ERROR"; }

        const ct_UserAppointments = await tableDataOperation(token, 'local_ct_userappointments', isInitial); //done
        if (ct_UserAppointments == 'ERROR') { return "ERROR"; }

        const COM_ShoppingCart = await tableDataOperation(token, 'local_com_shoppingcart', isInitial); //done
        if (COM_ShoppingCart == 'ERROR') { return "ERROR"; }

        const COM_ShoppingCartSKU = await tableDataOperation(token, 'local_com_shoppingcartsku', isInitial); //done
        if (COM_ShoppingCartSKU == 'ERROR') { return "ERROR"; }




        const CMS_SettingsKey = await tableDataOperation(token, 'local_cms_settingskey', isInitial); // done
        if (CMS_SettingsKey == 'ERROR') { return "ERROR"; }

        const ct_CustomerContacts = await tableDataOperation(token, 'local_ct_customercontacts', isInitial); // done
        if (ct_CustomerContacts == 'ERROR') { return "ERROR"; }




        // const COM_Order = await tableDataOperation(token, 'local_com_order', isInitial); //done
        // if (COM_Order == 'ERROR') { return "ERROR"; }

        // const COM_OrderAddress = await tableDataOperation(token, 'local_com_orderaddress', isInitial); // done
        // if (COM_OrderAddress == 'ERROR') { return "ERROR"; }

        // const COM_OrderItem = await tableDataOperation(token, 'local_com_orderitem', isInitial); // done
        // if (COM_OrderItem == 'ERROR') { return "ERROR"; }









        const COM_OrderStatus = await tableDataOperation(token, 'local_com_orderstatus', isInitial); // done
        if (COM_OrderStatus == 'ERROR') { return "ERROR"; }

        const ct_TradeAccount = await tableDataOperation(token, 'local_ct_tradeaccount', isInitial); // done
        if (ct_TradeAccount == 'ERROR') { return "ERROR"; }

        const ct_TradeAccountCustomer = await tableDataOperation(token, 'local_ct_tradeaccountcustomer', isInitial); // done
        if (ct_TradeAccountCustomer == 'ERROR') { return "ERROR"; }

        const ct_DeliveryMatrix = await tableDataOperation(token, 'local_ct_deliverymatrix', isInitial); // done
        if (ct_DeliveryMatrix == 'ERROR') { return "ERROR"; }

        const ct_CountryGroup = await tableDataOperation(token, 'local_ct_countrygroup', isInitial); // done
        if (ct_CountryGroup == 'ERROR') { return "ERROR"; }

        const ct_Postcodes = await tableDataOperation(token, 'local_ct_postcodes', isInitial); // done
        if (ct_Postcodes == 'ERROR') { return "ERROR"; }

        const ct_PostcodeZone = await tableDataOperation(token, 'local_ct_postcodezone', isInitial); // done
        if (ct_PostcodeZone == 'ERROR') { return "ERROR"; }

        const COM_ShippingOption = await tableDataOperation(token, 'local_com_shippingoption', isInitial); // done
        if (COM_ShippingOption == 'ERROR') { return "ERROR"; }

        const int_salestax = await tableDataOperation(token, 'local_int_salestax', isInitial); // done
        if (int_salestax == 'ERROR') { return "ERROR"; }

        const int_analysis = await tableDataOperation(token, 'local_int_analysis', isInitial); // done
        if (int_analysis == 'ERROR') { return "ERROR"; }

        const ct_Quotes = await tableDataOperation(token, 'local_ct_quotes', isInitial); // done
        if (ct_Quotes == 'ERROR') { return "ERROR"; }

        const ct_QuoteStatus = await tableDataOperation(token, 'local_ct_quotestatus', isInitial); // done
        if (ct_QuoteStatus == 'ERROR') { return "ERROR"; }

        const ct_QuoteStatusUser = await tableDataOperation(token, 'local_ct_quotestatususer', isInitial); // done
        if (ct_QuoteStatusUser == 'ERROR') { return "ERROR"; }



        const CMS_Culture = await tableDataOperation(token, 'local_cms_culture', isInitial); // done
        if (CMS_Culture == 'ERROR') { return "ERROR"; }

        const CMS_Resource = await tableDataOperation(token, 'local_cms_resource', isInitial); // done
        if (CMS_Resource == 'ERROR') { return "ERROR"; }

        const CMS_ResourceString = await tableDataOperation(token, 'local_cms_resourcestring', isInitial); // done
        if (CMS_ResourceString == 'ERROR') { return "ERROR"; }

        const CMS_ResourceTranslation = await tableDataOperation(token, 'local_cms_resourcetranslation', isInitial); // done
        if (CMS_ResourceTranslation == 'ERROR') { return "ERROR"; }



            const ct_StoreComments = await tableDataOperation(token, 'local_ct_storecomments', isInitial); // done
            if (ct_StoreComments == 'ERROR') { return "ERROR"; }


            // const int_Nav_Attributes = await tableDataOperation(token, 'local_int_nav_attributes', isInitial); // done
            const ct_DeliveryFactors = await tableDataOperation(token, 'local_ct_deliveryfactors', isInitial); // done
            if (ct_DeliveryFactors == 'ERROR') { return "ERROR"; }
            const COM_PaymentOption = await tableDataOperation(token, 'local_com_paymentoption', isInitial); // done
            if (COM_PaymentOption == 'ERROR') { return "ERROR"; }

            //only in the local database
            const orderpad = await localTableDataOperation(token, 'local_orderpad');
            const contacts = await localTableDataOperation(token, 'local_contacts');
            const contactnotes = await localTableDataOperation(token, 'local_int_contactnotes');

            await localTableDataOperation(token, 'local_com_order'); // done
            await localTableDataOperation(token, 'local_com_orderitem'); // done
            await localTableDataOperation(token, 'local_com_orderaddress'); // done


            const CView_SalesRepToCustomer = await createView('CView_SalesRepToCustomer');

            const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);

            const quoteDiscount_craeted = await submitedQuoteDiscount('create'); // create
            const setAppVersion = await setVersion();
            const log_craeted = await submited('create'); // create, add, read, delete


            await RawQuery(`UPDATE local_info SET isHomeScreen = ${true ? 1 : 0}`);

            const flags = {
                main_operation: "FULL SYNC",
                sub_operation: "INITIAL",
                status: 'DONE'
            };
            const log_added = await submited('add', flags ); // create, add, read, delete

            const flags1 = {
                main_operation: "PRODUCT SYNC",
                sub_operation: "INITIAL",
                status: 'DONE'
            };
            const log_added1 = await submited('add', flags1 ); // create, add, read, delete

        }else{
            isInitial = false;

            const localQuote = await getQuotesDataSet();
            if (localQuote.length > 0) {
                const localQuotesToServer = await sendQuotestoServer(localQuote);
                const deleteQuote = await deleteFromLocal(localQuote);
            }


            const localCart = await getCartsDataSet();
            if (localCart.length > 0) {
                const localCartsToServer = await sendCartstoServer(localCart);
                const deleteCart = await deleteFromLocal(localCart);
            }

            const uploadAppointments = await UploadAppointments();
            const updateAppointmentsSync = await UpdateAppointmentsSync();


            const uploadContact = await uploadContacts();


            const COM_Address_upload = await addressUploadOperation(token, 'local_com_address', isInitial); // done
            if (COM_Address_upload == 'ERROR') { return "ERROR"; }
            const contacts = await localTableDataOperation(token, 'local_contacts');
            if (contacts == 'ERROR') { return "ERROR"; }

            const CMS_Country = await tableDataOperation(token, 'local_cms_country', isInitial); // done
            if (CMS_Country == 'ERROR') { return "ERROR"; }
            const COM_SKU = await tableDataOperation(token, 'local_com_sku', isInitial); // done
            if (COM_SKU == 'ERROR') { return "ERROR"; }
            const CMS_State = await tableDataOperation(token, 'local_cms_state', isInitial); // done
            if (CMS_State == 'ERROR') { return "ERROR"; }
            const CMS_Role = await tableDataOperation(token, 'local_cms_role', isInitial); // done
            if (CMS_Role == 'ERROR') { return "ERROR"; }
            const CMS_User = await tableDataOperation(token, 'local_cms_user', isInitial); // done
            if (CMS_User == 'ERROR') { return "ERROR"; }
            const COM_Customer = await tableDataOperation(token, 'local_com_customer', isInitial); // done
            if (COM_Customer == 'ERROR') { return "ERROR"; }
            const COM_Address = await tableDataOperation(token, 'local_com_address', isInitial); // done
            if (COM_Address == 'ERROR') { return "ERROR"; }

            const ct_UserAppointments = await tableDataOperation(token, 'local_ct_userappointments', isInitial); // done
            if (ct_UserAppointments == 'ERROR') { return "ERROR"; }

            const COM_ShoppingCartSKU = await tableDataOperation(token, 'local_com_shoppingcartsku', isInitial); // do not place this below COM_ShoppingCart
            if (COM_ShoppingCartSKU == 'ERROR') { return "ERROR"; }
            const COM_ShoppingCart = await tableDataOperation(token, 'local_com_shoppingcart', isInitial); // done
            if (COM_ShoppingCart == 'ERROR') { return "ERROR"; }


            const ct_CustomerContacts = await tableDataOperation(token, 'local_ct_customercontacts', isInitial); // done
            if (ct_CustomerContacts == 'ERROR') { return "ERROR"; }

            const CMS_SettingsKey = await tableDataOperation(token, 'local_cms_settingskey', isInitial); // done
            if (CMS_SettingsKey == 'ERROR') { return "ERROR"; }

            // const COM_Order = await tableDataOperation(token, 'local_com_order', isInitial); // done
            // const COM_OrderItem = await tableDataOperation(token, 'local_com_orderitem', isInitial); // done
            // const COM_OrderAddress = await tableDataOperation(token, 'local_com_orderaddress', isInitial); // done



            const COM_OrderStatus = await tableDataOperation(token, 'local_com_orderstatus', isInitial); // done
            if (COM_OrderStatus == 'ERROR') { return "ERROR"; }

            const ct_TradeAccount = await tableDataOperation(token, 'local_ct_tradeaccount', isInitial); // done
            if (ct_TradeAccount == 'ERROR') { return "ERROR"; }
            const ct_TradeAccountCustomer = await tableDataOperation(token, 'local_ct_tradeaccountcustomer', isInitial); // done
            if (ct_TradeAccountCustomer == 'ERROR') { return "ERROR"; }
            const ct_DeliveryMatrix = await tableDataOperation(token, 'local_ct_deliverymatrix', isInitial); // done
            if (ct_DeliveryMatrix == 'ERROR') { return "ERROR"; }
            const ct_CountryGroup = await tableDataOperation(token, 'local_ct_countrygroup', isInitial); // done
            if (ct_CountryGroup == 'ERROR') { return "ERROR"; }
            const ct_Postcodes = await tableDataOperation(token, 'local_ct_postcodes', isInitial); // done
            if (ct_Postcodes == 'ERROR') { return "ERROR"; }
            const ct_PostcodeZone = await tableDataOperation(token, 'local_ct_postcodezone', isInitial); // done
            if (ct_PostcodeZone == 'ERROR') { return "ERROR"; }
            const COM_ShippingOption = await tableDataOperation(token, 'local_com_shippingoption', isInitial); // done
            if (COM_ShippingOption == 'ERROR') { return "ERROR"; }
            const int_salestax = await tableDataOperation(token, 'local_int_salestax', isInitial); // done
            if (int_salestax == 'ERROR') { return "ERROR"; }
            const int_analysis = await tableDataOperation(token, 'local_int_analysis', isInitial); // done
            if (int_analysis == 'ERROR') { return "ERROR"; }
            const ct_Quotes = await tableDataOperation(token, 'local_ct_quotes', isInitial); // done
            if (ct_Quotes == 'ERROR') { return "ERROR"; }
            const ct_QuoteStatus = await tableDataOperation(token, 'local_ct_quotestatus', isInitial); // done
            if (ct_QuoteStatus == 'ERROR') { return "ERROR"; }
            const ct_QuoteStatusUser = await tableDataOperation(token, 'local_ct_quotestatususer', isInitial); // done
            if (ct_QuoteStatusUser == 'ERROR') { return "ERROR"; }
            const CMS_Culture = await tableDataOperation(token, 'local_cms_culture', isInitial); // done
            if (CMS_Culture == 'ERROR') { return "ERROR"; }
            const CMS_Resource = await tableDataOperation(token, 'local_cms_resource', isInitial); // done
            if (CMS_Resource == 'ERROR') { return "ERROR"; }
            const int_Navigation = await tableDataOperation(token, 'local_int_navigation', isInitial); // done
            if (int_Navigation == 'ERROR') { return "ERROR"; }
            const int_Nav_Attributes = await tableDataOperation(token, 'local_int_nav_attributes', isInitial); // done
            if (int_Nav_Attributes == 'ERROR') { return "ERROR"; }
            const ct_DeliveryFactors = await tableDataOperation(token, 'local_ct_deliveryfactors', isInitial); // done
            if (ct_DeliveryFactors == 'ERROR') { return "ERROR"; }
            const COM_PaymentOption = await tableDataOperation(token, 'local_com_paymentoption', isInitial); // done
            if (COM_PaymentOption == 'ERROR') { return "ERROR"; }

            const ct_StoreComments = await tableDataOperation(token, 'local_ct_storecomments', isInitial); // done
            if (ct_StoreComments == 'ERROR') { return "ERROR"; }

            const localAddressPushAndUpadte = await getLocalAddresses();

            // const CMS_UserRole = await tableDataOperation(token, 'local_cms_userrole', isInitial); // not done - keep


            const CMS_ResourceString = await tableDataOperation(token, 'local_cms_resourcestring', true); // pass true coz theres no update column
            const CMS_ResourceTranslation = await tableDataOperation(token, 'local_cms_resourcetranslation', true); // pass true coz theres no update column

            const ct_TradeAccountCustomerUpload = await tableUploadDataOperation(token, 'local_ct_tradeaccount', isInitial); // done

            const ct_StoreCommentUpload = await tableUploadStoreCommentDataOperation(token, 'local_ct_storecomments', isInitial); // done

            const CView_SalesRepToCustomer = await createView('CView_SalesRepToCustomer');


            // const localQuotesToServer = await quotesToServer();

            // console.log('====================================');
            // console.log(localQuotesToServer);
            // console.log('====================================');


            const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);

            const flags = {
                main_operation: "FULL SYNC",
                sub_operation: "INSTANT",
                status: 'DONE'
            };
            const log_added = await submited('add', flags ); // create, add, read, delete

            const flags1 = {
                main_operation: "PRODUCT SYNC",
                sub_operation: "INSTANT",
                status: 'DONE'
            };
            const log_added1 = await submited('add', flags1 ); // create, add, read, delete
        }
    }


    if (syncType == 'PRODUCT SYNC') {

        if(isNewUser){

            isInitial = true;

            const COM_SKU = await tableDataOperation(token, 'local_com_sku', isInitial); // done

            const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);

            const log_craeted = await submited('create'); // create, add, read, delete

            const flags = {
                main_operation: "PRODUCT SYNC",
                sub_operation: "INITIAL",
                status: 'DONE'
            };
            const log_added = await submited('add', flags ); // create, add, read, delete
        }else{
            isInitial = false;

            const COM_SKU = await tableDataOperation(token, 'local_com_sku', isInitial); // done

            const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);

            const flags = {
                main_operation: "PRODUCT SYNC",
                sub_operation: "INSTANT",
                status: 'DONE'
            };
            const log_added = await submited('add', flags ); // create, add, read, delete
        }

    }


    if (syncType == 'ORDER SYNC') {

        const isEmpty = await isTableEmpty('local_com_order');

        if(true){

            isInitial = true;

            const COM_Order = await tableDataOperation(token, 'local_com_order', isInitial, from, to, viewType); // done
            if (COM_Order == 'ERROR') { return "ERROR"; }
            const COM_OrderItem = await tableDataOperation(token, 'local_com_orderitem', isInitial, from, to, viewType); // done
            if (COM_OrderItem == 'ERROR') { return "ERROR"; }
            const COM_OrderAddress = await tableDataOperation(token, 'local_com_orderaddress', isInitial, from, to, viewType); // done
            if (COM_OrderAddress == 'ERROR') { return "ERROR"; }

            const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);

            const log_craeted = await submited('create'); // create, add, read, delete

            const flags = {
                main_operation: "ORDER SYNC",
                sub_operation: "INITIAL",
                status: 'DONE'
            };
            const log_added = await submited('add', flags ); // create, add, read, delete
        }else{

            isInitial = false;

            const COM_Order = await tableDataOperation(token, 'local_com_order', isInitial, from, to); // done
            if (COM_Order == 'ERROR') { return "ERROR"; }
            const COM_OrderItem = await tableDataOperation(token, 'local_com_orderitem', isInitial, from, to); // done
            if (COM_OrderItem == 'ERROR') { return "ERROR"; }
            const COM_OrderAddress = await tableDataOperation(token, 'local_com_orderaddress', isInitial, from, to); // done
            if (COM_OrderAddress == 'ERROR') { return "ERROR"; }

            const completeOperation = await completeoperation(getnNewProducts, endChangeStatus);

            const flags = {
                main_operation: "ORDER SYNC",
                sub_operation: "INSTANT",
                status: 'DONE'
            };
            const log_added = await submited('add', flags ); // create, add, read, delete
        }

    }


    // if (isNewUser == false) {
    //     const isFirstLoad = await findFirstLoad();

    //     if (isNewUser) {
    //         // first load up

    //     }

    //     if (isNewUser == false) {}


    // }




    //** ONLY IN DEVELOPMENT

    // const submited_response = await submited('delete'); // create, add, read, delete


    // log useage
    // const submited_response = await submited('create'); // create, add, read, delete
    // const submited_response = await submited('add'); // create, add, read, delete
    // const submited_response = await submited('read'); // create, add, read, delete
    // const submited_response = await submited('delete'); // create, add, read, delete
    // console.log(submited_response);

}


async function delay(){
    setTimeout(() => {
        return 'ok';
    }, 20000);
}

async function addressUploadOperation(token, tableName) {

    console.log(`${tableName} started Upload`);
    let readyToSyncRecodes;

    readyToSyncRecodes = await addressUploadData(tableName);



    const addressResponse = await uploadReadyToSyncAddresses(token, readyToSyncRecodes);

    const updated = await reUpdateAddressData(addressResponse);


    console.log(updated);





    // if (inspected[0].inspected == 1) {
    //     console.log(`${tableName} - Table Exist`);
    // }else{
    //     console.log(`${tableName} - Table doesn't Exist`);

    //     const created = await createTable(tableName);
    //     if(created[0].created == 1){
    //         console.log(`Table Created: ${tableName}`);
    //     }else{
    //         console.log(`Table Schema Not Found in Code: ${tableName}`);
    //     }
    // }

    console.log(`${tableName} ended`);
    return tableName;
}


async function localTableDataOperation(token, tableName) {

    console.log(`${tableName} started`);
    let inspected;

    inspected = await inspectTable(tableName);
    if (inspected[0].inspected == 1) {
        console.log(`${tableName} - Table Exist`);
    }else{
        console.log(`${tableName} - Table doesn't Exist`);

        const created = await createTable(tableName);
        if(created[0].created == 1){
            console.log(`Table Created: ${tableName}`);
        }else{
            console.log(`Table Schema Not Found in Code: ${tableName}`);
        }
    }

    console.log(`${tableName} ended`);
    return tableName;
}

async function tableDataOperation(token, tableName, isInitial, from, to, viewType) {

    console.log(`${tableName} started`);
    let inspected;

    inspected = await inspectTable(tableName);
    // make below 1 to 2 to recreate tables forcefully
    if (inspected[0].inspected == 1) {
        console.log(`${tableName} - Table Exist`);

            let lastUpdate = null;
            if (!isInitial) {
                lastUpdate = await getLastUpdate(tableName);
                console.log(`${tableName} - last Update - ${lastUpdate}`);
            }
            const data = await totalSync(token, tableName, lastUpdate, from, to, viewType);
            if (data == "ERROR") {
                return "ERROR";
            }
            console.log(`API Data - ${data.length}`);

            if (tableName == 'local_com_order' || tableName == 'local_com_orderitem' || tableName == 'local_com_orderaddress') {
                const res = await deleteLocalRows(tableName, data);
            }

            const dataAdded = await insertData(tableName, data, isInitial);

            console.log(dataAdded);

    }else{
        console.log(`${tableName} - Table doesn't Exist`);
        const created = await createTable(tableName);
        if(created[0].created == 1){
            console.log(`Table Created: ${tableName}`);

            let lastUpdate = getLimitedLastUpdate(tableName);
            console.log(`${tableName} - Last Update - ${lastUpdate}`);
            const data = await totalSync(token, tableName, lastUpdate, from, to);
            if (data == "ERROR") {
                return "ERROR";
            }
            console.log(`API Data - ${data.length}`);

            const dataAdded = await insertData(tableName, data, isInitial);
            console.log(dataAdded.length);

        }else{
            console.log(`Table Schema Not Found in Code: ${tableName}`);
        }
    }

    console.log(`${tableName} ended`);
    return tableName;
}


async function tableUploadDataOperation(token, tableName, isInitial) {

    console.log(`${tableName} started`);
    let inspected;

    inspected = await inspectTable(tableName);
    // make below 1 to 2 to recreate tables forcefully
    if (inspected[0].inspected == 1) {
        console.log(`${tableName} - Table Exist`);

            const localData = await getLocalDataSet(tableName);

            const data = await getTradeAccountData(token, tableName, localData);
            console.log(`API Data - ${data.length}`);



            const dataUpdated = await updateTradeAccountData(tableName, data);
            console.log(dataUpdated);

    }else{
        console.log(`${tableName} - Table doesn't Exist`);
    }

    console.log(`${tableName} ended`);
    return tableName;
}

function getLimitedLastUpdate(tableName) {

    if (Platform.OS === 'ios') {
        return null;
    }



    if (tableName == 'local_com_order') {
        return getDate(3);
    }
    if (tableName == 'local_com_orderaddress') {
        return getDate(3);
    }
    if (tableName == 'local_com_orderitem') {
        return getDate(3);
    }

    return null;

}


function getDate(month){
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - month);

    return currentDate.toISOString().replace('Z', '');
}


async function tableUploadStoreCommentDataOperation(token, tableName, isInitial) {

    console.log(`${tableName} started`);
    let inspected;

    inspected = await inspectTable(tableName);
    // make below 1 to 2 to recreate tables forcefully
    if (inspected[0].inspected == 1) {
        console.log(`${tableName} - Table Exist`);

            const localData = await storeCommentData(tableName);


            const data = await storeCommentDataProvider(token, tableName, localData);
            console.log(`API Data - ${data.length}`);



            const dataUpdated = await updateStoreCommentData(tableName, data);
            console.log(dataUpdated);

    }else{
        console.log(`${tableName} - Table doesn't Exist`);
    }

    console.log(`${tableName} ended`);
    return tableName;
}




async function completeoperation(getnNewProducts,endChangeStatus) {
    getnNewProducts();
    endChangeStatus();
    return 'Complete Operation';
  }





export default Main;
