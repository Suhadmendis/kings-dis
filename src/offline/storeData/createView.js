import openDatabaseService from '../Config';

async function createView(viewName) {
  const db = openDatabaseService();
  return new Promise((resolve, reject) => {
    let schema = null;

    switch (viewName) {
      case "CView_SalesRepToCustomer":
        schema = `CREATE VIEW IF NOT EXISTS CView_SalesRepToCustomer 
        AS 
        SELECT 
          CT.ItemID, 
          CT.ItemCode AS TradeAccID, 
          CT.ItemAccAreaCode, 
          local_com_customer.CustomerID AS SalesRepCustomerID, 
          local_com_customer.CustomerUserID AS SalesRepUserID, 
          local_com_customer.CustomerEmail AS SalesRepEmail 
        FROM 
          local_ct_tradeaccount AS CT 
        INNER JOIN 
          local_com_customer ON local_com_customer.CustomerSalesRepKey LIKE '%' || CT.ItemAccAreaCode || '%'`;
        break;
    }

    let response = {
      viewName: viewName,
      dropped: false,
      created: false,
      error: null
    };
    if (schema != null) {
      db.transaction(
          (tx) => {
            tx.executeSql(`DROP VIEW IF EXISTS ${viewName}`, [],
                function () {
                  response.dropped = true;

                  tx.executeSql(schema, [],
                      function (tx, res) {
                        response.created = true;
                        resolve(response);
                      },
                      function (tx, error) {
                        response.error = 'ExecuteSql ERROR: ' + error.message;
                        reject(response);
                      });
                },
                function (tx, error) {
                  response.error = 'ExecuteSql ERROR: ' + error.message;
                  reject(response);
                });
          },
          error => {
            response.error = 'Transaction ERROR: ' + error.message;
            reject(response);
          }
      );
    } else {
      response.error = `Invalid View: ${viewName}`
      reject(response);
    }
  });
}

export default createView;
