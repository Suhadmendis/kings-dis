import openDatabaseService from "../../Config";

async function GetOrdersLocal(data) {
  const db = openDatabaseService();
let limit = data.limit;
let offset = data.offsets
console.log('66666666666666666666666666666666666666 12 ',offset);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      let statuses = [];
      let validOrderIdList = [];
      let customerAddresses = [];

      const startTime = Date.now();

      tx.executeSql(
        `SELECT * FROM local_com_orderstatus`,
        [],

        function (tx, res) {
          let data = [];

          const lap1 = Date.now(); // or performance.now() for more precise timing
          const timeDifference = lap1 - startTime;
          console.log("Query execution time:", timeDifference, "milliseconds");

          for (let index = 0; index < res.rows.length; index++) {
            statuses.push(res.rows.item(index));
          }
        }
      );

      tx.executeSql(
        `SELECT OrderItemOrderID FROM local_com_orderitem group by OrderItemOrderID`,
        [],
        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            validOrderIdList.push(res.rows.item(index).OrderItemOrderID);
          }
        }
      );

      tx.executeSql(
        `SELECT AddressCustomerID, AddressAccCode FROM local_com_address`,
        [],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            customerAddresses.push(res.rows.item(index));
          }
        }
      );

      let orderQuery = "";

      if (data.allOrders) {
        //write
        orderQuery = `SELECT * FROM local_com_order where OrderAPayment=0`;


      } else {
        orderQuery = `SELECT * FROM local_com_order where OrderCustomerID=${data.adminCustomerID} AND OrderAPayment=0`;
      }



      if (data.startDate != null && data.endDate != null) {
        orderQuery += ` and OrderDate BETWEEN '${data.startDate}' AND '${data.endDate}T23:59:59'`;
      }

      // orderQuery += ` and OrderStatusID <> 18`;


      if (data.orderBy && data.orderBy != "") {
        orderQuery += ` ORDER BY ${data.orderBy}`;
      }
    orderQuery += ` LIMIT ${10} OFFSET ${offset}`


      // orderQuery += ` limit 10`;

      console.log(orderQuery);
      tx.executeSql(
        orderQuery,
        [],
        // tx.executeSql(`SELECT * FROM local_com_order`,[],

        function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            let exists = 0;

            let orderExist = [];

            orderExist = validOrderIdList.filter(
              (id) => id == res.rows.item(index).WebOrderID
            );
            if (orderExist.length > 0) {
              exists = 1;
            }

            orderExist = validOrderIdList.filter(
              (id) => id == res.rows.item(index).OrderID
            );
            if (orderExist.length > 0) {
              exists = 1;
            }

            if (exists == 1) {
              let isOffline = false;
              if (res.rows.item(index).WebOrderID == null) {
                isOffline = true;
              }

              let orderStatus = res.rows.item(index).OrderStatusID;

              let status = "";

              statuses.map((stat) => {
                if (orderStatus == stat.StatusID) {
                  status = stat.StatusDisplayName;
                }
              });

              let reff;
              if (res.rows.item(index).WebOrderID == null) {
                reff = `TEMP-${res.rows.item(index).OrderID}`;
              } else {
                reff = res.rows.item(index).WebOrderID;

                let orderCustomerID = res.rows.item(index).OrderCustomerID; // order related address id

                const address = customerAddresses.filter(
                  (customerAddress) =>
                    customerAddress.AddressCustomerID == orderCustomerID
                );

                let accCode = "";

                if (address.length > 0) {
                  accCode = address[0].AddressAccCode;
                }

                if (accCode != "") {
                  if (accCode != null) {
                    reff += ` (${accCode})`;
                  }
                }

                if (res.rows.item(index).OrderInvoiceNumber != "") {
                  if (res.rows.item(index).OrderInvoiceNumber != null) {
                    reff += ` (${res.rows.item(index).OrderInvoiceNumber})`;
                  }
                }
              }

              let order = {
                order_id: res.rows.item(index).OrderID,
                order_ref: reff,
                date_time: res.rows.item(index).OrderDate,
                status,
                isOffline,
                checked: false,
                order_total: res.rows.item(index).OrderTotalPrice,
                all: res.rows.item(index),
              };

              data.push(order);
            }
          }
          resolve(data);
        },
        function (error, er) {
          resolve("FAILED");
        }
      );
    });
  });
}

export default GetOrdersLocal;
