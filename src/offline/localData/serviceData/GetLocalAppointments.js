import openDatabaseService from "../../Config";

async function GetLocalAppointments() {
  const db = openDatabaseService();


  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM local_ct_userappointments`,
        [],

        // const temp = [{"email": "Stsg@gjgu.com",
        // "endDate": "2022-12-07T07:11:00.000",
        // "endDateforDay": "2022-12-07T12:41:00.000",
        // "id": "321",
        // "location": "Dhfu",
        // "note": "Fhfhg",
        // "sopFullName": "Leo Lucas",
        // "sopUserId": 96528,
        // "startDate": "2022-12-06T07:11:00.000Z",
        // "startDateforDay": "2022-12-06T12:41:00.000Z",
        // "storeName": "5 Acre Nursery",
        // "subject": "Ghf"}]
//  [{"Email":
//   "test@test.com", "EndDate":
//   "2022-11-19T16:36:00", "IsDeleted":
//   1, "ItemCreatedBy":
//   96528, "ItemCreatedWhen":
//   "2022-11-18T17:05:20.5491137", "ItemGUID":
//   "c65869cb-570a-4690-9c1c-16b4b69b20cb", "ItemID":
//   1, "ItemModifiedBy":
//   96528, "ItemModifiedWhen":
//   "2022-11-18T17:08:50.1403764", "ItemOrder":
//   null, "Location":
//   "uk", "Note":
//   "test", "ReadyToSync":
//   0, "StartDate":
//   "2022-11-18T16:36:00", "Subject":
//   "Test", "TradeAccID":
//   24}, {


        function (tx, res) {
          let data = [];
          
          for (let index = 0; index < res.rows.length; index++) {
            
            data.push({
              id: res.rows.item(index).ItemID.toString(),
              email: res.rows.item(index).Email,
              startDate: res.rows.item(index).StartDate,
              startDateforDay: res.rows.item(index).StartDate,
              endDate: res.rows.item(index).EndDate,
              endDateforDay: res.rows.item(index).EndDate,
              location: res.rows.item(index).Location,
              note: res.rows.item(index).Note,
              subject: res.rows.item(index).Subject,
              sopUserId: res.rows.item(index).ItemCreatedBy,
              isDeleted: res.rows.item(index).IsDeleted
            });
          }
          resolve(data);
        }
      );
    });
  });
}

export default GetLocalAppointments;
