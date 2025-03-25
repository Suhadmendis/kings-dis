import openDatabaseService from "../../Config";

async function AddLocalStoreComments(data) {
  const db = openDatabaseService();

  console.log(data);
  return new Promise((resolve, reject) => {
    console.log(data);
    db.transaction((tx) => {
      tx.executeSql(
       "INSERT INTO local_ct_storecomments(ItemID, ItemCreatedBy, ItemCreatedWhen, ItemModifiedBy, ItemModifiedWhen, ItemOrder, ItemGUID, ItemTitle, ItemComment, TradeAccID, ReadyToSync, IsDeleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          data.itemID,
          data.itemCreatedBy,
          data.itemCreatedWhen,
          data.itemModifiedBy,
          data.itemCreatedWhen,
          data.itemOrder,
          data.itemGUID,
          data.itemTitle,
          data.itemComment,
          data.tradeAccID,
          data.readyToSync,
          0
        ],
        (tx, results) => {
          resolve(results.rowsAffected);
        }
      );
    });
  });
}

export default AddLocalStoreComments;

