
import openDatabaseService from '../offline/Config';

import { GetAddressDisplay } from "../offline/Services/AddressInfoProvider"
import { GetBoolean } from '../utils/ValidationHelper';
import {GetLoggedInAccountCode, IsCustomerB2B} from '../offline/Services/UserHelper';
import {RawQuery} from '../offline/Services/DataHelper';

async function GetCustomerAddresses(data) {

    
    const db = openDatabaseService();



    const loggedInCustomer = await GetLoggedInAccountCode();
    const isCustomerB2B = IsCustomerB2B(loggedInCustomer);

    let queryWhere = "AddressEnabled=1";


    if (isCustomerB2B) {
        queryWhere += " AND AddressAccCode='"+ loggedInCustomer + "'";
    }else{
        queryWhere += " AND AddressCustomerID='"+ data.adminCustomerID + "'";
        
        // const temp = IsCustomerBuyerAdmin(data.adminCustomerID)
        // console.log('====================================');
        // console.log(temp);
        // console.log('====================================');
    }
    
    
    


    // for (let index = 0; index < resourceAddressesRes.length; index++) {
    //     const element = GetAddressInfo(resourceAddressesRes.item(index));
    //     console.log('===========ff=========================');
    //     console.log(element);
    //     console.log('====================================');
        
    // }

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM local_com_address where `+ queryWhere + `order by AddressIsBilling DESC,AddressID DESC`, [],

                async function (tx, res) {
                    try {
                        let dataSet = [];
                        for (let index = 0; index < res.rows.length; index++) {
                            
                            let addressRow = {
                                addressID: res.rows.item(index).AddressID,
                                addressLine1: res.rows.item(index).AddressLine1,
                                addressLine2: res.rows.item(index).AddressLine2,
                                addressCity: res.rows.item(index).AddressCity,
                                addressZip: res.rows.item(index).AddressZip,
                                addressPhone: res.rows.item(index).AddressPhone,
                                addressCountryID: res.rows.item(index).AddressCountryID,
                                addressPersonalName: res.rows.item(index).AddressPersonalName,
                                addressGUID: res.rows.item(index).AddressGUID,
                                addressLastModified: res.rows.item(index).AddressLastModified,
                                addressLine3: res.rows.item(index).AddressLine3,
                                addressLine4: res.rows.item(index).AddressLine4,
                                webAddressID: res.rows.item(index).WebAddressID,
                                addressDisplay: GetAddressDisplay(
                                    res.rows.item(index).AddressLine1,
                                    res.rows.item(index).AddressLine2,
                                    res.rows.item(index).AddressLine3,
                                    res.rows.item(index).AddressLine4,
                                    res.rows.item(index).AddressCity,
                                    res.rows.item(index).AddressZip,
                                    "..."
                                ),
                                addressCustomerID: res.rows.item(index).AddressCustomerID,
                                addressAccCode: res.rows.item(index).AddressAccCode,
                                addressIsBilling: GetBoolean(res.rows.item(index).AddressIsBilling),
                                addressIsShipping: GetBoolean(res.rows.item(index).AddressIsShipping),
                                addressIsShippingDefault: false,
                                addressIsBillingDefault: false,
                                isAddressEditable: false,
                                isAddressDeletable: false
                            }


                            let resourceCustomerRes = await RawQuery(`SELECT CustomerDefaultDeliveryAddressID, CustomerDefaultPaymentAddressID FROM local_com_customer where CustomerID = '${data.adminCustomerID}'`);

                            if (resourceCustomerRes.item(0).CustomerDefaultDeliveryAddressID == res.rows.item(index).AddressID) {
                                addressRow.addressIsShippingDefault = true;
                            }
                            if (resourceCustomerRes.item(0).CustomerDefaultPaymentAddressID == res.rows.item(index).AddressID) {
                                addressRow.addressIsBillingDefault = true;
                            }

                            if (GetBoolean(data.adminCustomerID == res.rows.item(index).AddressCustomerID && !res.rows.item(index).AddressIsBilling && res.rows.item(index).AddressWebOnly)) {
                                addressRow.isAddressDeletable = true;
                            }

                            if (GetBoolean(data.adminCustomerID == res.rows.item(index).AddressCustomerID && !res.rows.item(index).AddressIsBilling && !res.rows.item(index).AddressWebOnly)) {
                                addressRow.isAddressEditable = true;
                            }




                            dataSet.push(addressRow);
                        }
                       
                        resolve({ addresses: dataSet });
                    } catch (e) {
                        console.log(e)
                        reject(e)
                    }
                },
                function (tx, error) {
                    console.log(error)
                    reject(Error('ExecuteSql ERROR: ' + error.message));
                })
        }, error => {
            console.log(error)
            reject(Error('Transaction ERROR: ' + error.message));
        });
    });
}

// function GetAddressInfo(address){

//     address.addressDisplay = GetAddressDisplay(
//             address.AddressLine1,
//             address.AddressLine2,
//             address.AddressLine3,
//             address.AddressLine4,
//             address.AddressCity,
//             address.AddressZip,
//             "..."
//         )

//         console.log(GetAddressDisplay(
//             address.AddressLine1,
//             address.AddressLine2,
//             address.AddressLine3,
//             address.AddressLine4,
//             address.AddressCity,
//             address.AddressZip,
//             "..."
//         ));



//     return address;
// }

export default GetCustomerAddresses;


