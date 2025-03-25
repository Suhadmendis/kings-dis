
   
import openDatabaseService from '../../Config';


async function GetCartLocal(data) {
  


  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_shoppingcart where ShoppingCartCustomerID = '${data.customerID}' order by ShoppingCartLastUpdate desc`,[],

        function (tx, res) {

          
          let data = [];
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }

          
          if (data.length > 0) {
          
            data.map(row => {    

              tx.executeSql(`SELECT * FROM local_com_shoppingcartsku join local_com_sku on local_com_shoppingcartsku.SKUID = local_com_sku.SKUID WHERE local_com_shoppingcartsku.ShoppingCartID = ${row.ShoppingCartID}`,[],
                async function (tx, res) {
  
                    let tot = 0;
                    for (let index = 0; index < res.rows.length; index++) {          
                      // data.push(res.rows.item(index));
                      tot = tot + res.rows.item(index).CartItemPrice;
                    }

                    row.SaveCartLineTotal = tot;
  
                    resolve(data);
                });
  
                
            })
            
          }
          
          
        })

    });
  });
}


export default GetCartLocal;