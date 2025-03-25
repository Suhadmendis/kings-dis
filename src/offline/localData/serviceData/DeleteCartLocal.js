
   
import openDatabaseService from '../../Config';


async function DeleteCatLocal(data) {
  
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`DELETE FROM local_com_shoppingcart where ShoppingCartID = ${data}`,[],

        function (tx, res) {
          
      
      });


      tx.executeSql(`DELETE FROM local_com_shoppingcartsku where ShoppingCartID = ${data}`,[],
        function (tx, res) {
          
      
          resolve(res.rowsAffected);
      });
     
    });

    
    
      
  });
}


export default DeleteCatLocal;