import openDatabaseService from '../../Config';


async function AccNoteDetails(itmCode) {

  const db = openDatabaseService();
  // console.log('-------------trade account--------------------');
  // console.log(itmCode);
  return new Promise((resolve, reject) => {

    console.log(`SELECT ItemID, ItemName, ItemAdminFirstName, ItemAdminLastName, ItemCode,ItemKey2 ,ItemNotes,ItemDiscGroup1,ItemDiscGroup2,ItemDiscGroup3,ItemDiscGroup4,ItemAccBalance FROM local_ct_tradeaccount where ItemID=='${itmCode}'`);

    db.transaction(tx => {
      tx.executeSql(`SELECT ItemID, ItemName, ItemAdminFirstName, ItemAdminLastName, ItemCode,ItemKey2 ,ItemNotes,ItemDiscGroup1,ItemDiscGroup2,ItemDiscGroup3,ItemDiscGroup4,ItemAccBalance FROM local_ct_tradeaccount where ItemID=='${itmCode}'`,[],
        function (tx, res) {
          let data = {};
          data = res.rows.item(0);
        //  console.log(data);
          // for (let index = 0; index < 1; index++) {
          //  console.log(res.rows.item(0));
          //   data.push({
          //     ItemName: res.rows.item(index).ItemName,
          //     ItemAdminFirstName: res.rows.item(index).ItemAdminFirstName,
          //     ItemAdminLastName: res.rows.item(index).ItemAdminLastName,
          //     ItemCode: res.rows.item(index).ItemCode,
          //     ItemNotes: res.rows.item(index).ItemNotes,
          //   });

          // }
          resolve(data);
        })
    });
  });
}

export default AccNoteDetails;

