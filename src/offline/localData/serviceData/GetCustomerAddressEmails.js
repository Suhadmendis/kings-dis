
import openDatabaseService from '../../Config';
import {GetAddressDisplay} from "../../Services/AddressInfoProvider";
import {GetBoolean} from "../../../utils/ValidationHelper";
import { store } from '../../../../configureStore';

async function GetCustomerAddressEmails(data) {

    const db = openDatabaseService();

    const accCode = store.getState().findStore.accCode;

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM local_com_customer where CustomerAccCode = '${accCode}'`, [],

                function (tx, res) {
                    try {
                        let data = [];
                        for (let index = 0; index < res.rows.length; index++) {
                            console.log(res.rows.item(index))
                            data.push(res.rows.item(index));
                        }
                        resolve(data);
                    } catch (e) {
                        console.log(e)
                        reject(e)
                    }
                })
        });
    });
}

export default GetCustomerAddressEmails;
