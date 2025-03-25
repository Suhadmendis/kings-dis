import openDatabaseService from '../Config';

const db = openDatabaseService();

async function quotesToServer() {
  
  return new Promise((resolve, reject) => {



    
    const insertData = insertProccess();
   
    console.log('============insertData========================');
    console.log(insertData);
    console.log('====================================');

    resolve(insertData);
    
  });

}



async function insertProccess(){



    let getCartRows = getCartData('QUOTE');
  
    // for (let index = 0; index < getCartRows.length; index++) {
    //   const element = getCartRows[index].ShoppingCartID;
    //   db.transaction(tx => {
    //     tx.executeSql(`SELECT * FROM local_com_shoppingcartsku where ShoppingCartID = '${element}'`,[],
  
    //       function (tx, res) {
    //         let data = [];
            
    //         for (let index = 0; index < res.rows.length; index++) {
    //           data.push(res.rows.item(index));
    //         }
    //         console.log('====================================');
    //         console.log(data);
    //         console.log('====================================');
    //       })
    //   });
    //   console.log('====================================');
    //   console.log(element);
    //   console.log('====================================');
    // }
    // getCartRows = getCartRows.map(async row => {
    //   row.cartItems = await getCartItems(row.ShoppingCartID);
  
    //   return row;
    // })
  
    console.log('=============getCartRows=======================');
    console.log(getCartRows);
    console.log('====================================');
  
  
  
    return getCartRows;
  

 

}



async function getCartData() {
  return new Promise((resolve, reject) => {
    let data = [];
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_shoppingcart where AppShoppingCartSaveFlag = 'QUOTE' and ReadyToSync = '1'`,[],

        function (tx, res) {
       
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
      
        })
      for (let index = 0; index < 10; index++) {
        const element = array[index];
        
        tx.executeSql(`SELECT * FROM local_com_shoppingcart where AppShoppingCartSaveFlag = 'QUOTE' and ReadyToSync = '1'`,[],

        function (tx, res) {
       
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          
        })
        
      }

      tx.executeSql(`SELECT * FROM local_com_shoppingcart where AppShoppingCartSaveFlag = 'QUOTE' and ReadyToSync = '1'`,[],

        function (tx, res) {
       
          
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
        

      

    });
  });
}


async function getCartItems(id) {
  return new Promise((resolve, reject) => {

    
  });
}


export default quotesToServer;
