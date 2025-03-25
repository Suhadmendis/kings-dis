
import openDatabaseService from '../../Config';
import {GetAddressDisplay} from "../../Services/AddressInfoProvider";
import {GetBoolean, convertDateTimeTo_DDMMYYYY} from "../../../utils/ValidationHelper";

async function GetAllLocalStoreComments(id) {

    const db = openDatabaseService();

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM local_ct_storecomments WHERE TradeAccID=${id} AND IsDeleted != 1`, [],

                function (tx, res) {
                    try {
                        let data = [];
                        for (let index = 0; index < res.rows.length; index++) {
                            //console.log(res.rows.item(index))

                            let date_ = convertDateTimeTo_DDMMYYYY(res.rows.item(index).ItemCreatedWhen)
                            data.push({
                                Id: res.rows.item(index).ItemID,
                               // itemCreatedBy: res.rows.item(index).ItemCreatedBy,
                                Date: date_,
                            //    itemModifiedBy: res.rows.item(index).ItemModifiedBy,
                            //    itemModifiedWhen: res.rows.item(index).ItemModifiedWhen,
                            //    itemOrder: res.rows.item(index).ItemOrder,
                                itemGUID: res.rows.item(index).ItemGUID,
                                NoteTitle: res.rows.item(index).ItemTitle,
                                Note: res.rows.item(index).ItemComment,
                                tradeAccID: res.rows.item(index).TradeAccID,
                                readyToSync: res.rows.item(index).ReadyToSync,
                                isDeleted: res.rows.item(index).isDeleted
                               
                            });
                        }
                        resolve(data);
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

export default GetAllLocalStoreComments;
