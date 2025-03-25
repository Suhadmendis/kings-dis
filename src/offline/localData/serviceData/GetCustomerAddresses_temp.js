
import openDatabaseService from '../../Config';
import {GetAddressDisplay} from "../../Services/AddressInfoProvider";
import {GetBoolean} from "../../../utils/ValidationHelper";

async function GetAddresses(data) {

    const db = openDatabaseService();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM local_com_address WHERE AddressCustomerID=${data.adminCustomerID} AND AddressEnabled=1`, [],

                function (tx, res) {
                    try {
                        let data = [];
                        for (let index = 0; index < res.rows.length; index++) {
                            console.log(res.rows.item(index))
                            data.push({
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
                                addressIsShipping: GetBoolean(res.rows.item(index).AddressIsShipping)
                            });
                        }
                        resolve({ addresses: data });
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

export default GetAddresses;
