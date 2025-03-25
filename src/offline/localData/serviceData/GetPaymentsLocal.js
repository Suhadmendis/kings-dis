import openDatabaseService from '../../Config';


async function GetPaymentsLocal(data) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {

      let statuses = [];
      tx.executeSql(`SELECT * FROM local_com_orderstatus`, [],

          function (tx, res) {
            let data = [];

            for (let index = 0; index < res.rows.length; index++) {
              statuses.push(res.rows.item(index));
            }

          })

      let orderQuery = `SELECT * FROM local_com_order where OrderCustomerID=${data.adminCustomerID} AND OrderAPayment=1 AND OrderStatusID=17`; // 17 - Account Payment Complete
      if (data.orderBy && data.orderBy != "") {
        orderQuery += ` ORDER BY ${data.orderBy}`;
      }
      tx.executeSql(orderQuery, [],
          // tx.executeSql(`SELECT * FROM local_com_order`,[],

          function (tx, res) {
            let data = [];

            for (let index = 0; index < res.rows.length; index++) {

              let orderStatus = res.rows.item(index).OrderStatusID;

              let status = '';

              statuses.map(stat => {
                if (orderStatus == stat.StatusID) {
                  status = stat.StatusDisplayName;
                }
              });


              let order = {
                order_id: res.rows.item(index).OrderID,
                payment_ref: res.rows.item(index).OrderAccountsReference,
                date_time: res.rows.item(index).OrderDate,
                status,
                order_total: res.rows.item(index).OrderTotalPrice,
                all: res.rows.item(index)
              }


              data.push(order);
            }
            resolve(data);
          })
    });
  });
}


export default GetPaymentsLocal;
