
   
import openDatabaseService from '../../Config';


async function GetLocalContacts() {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT t1.ShoppingCartNote FROM local_com_shoppingcart t1 LEFT JOIN local_ct_quotes t2 ON t1.ShoppingCartID = t2.ItemShoppingCartID WHERE t2.ItemShoppingCartID IS NULL`,[],

        function (tx, res) {
          let data = [];
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index).ShoppingCartNote);
          }
          resolve(data);
        })
    });
  });
}


export default GetLocalContacts;