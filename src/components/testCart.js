import openDatabaseService from '../offline/Config';
import { store } from '../../configureStore';
import getBaseUrl from "../url/getBaseUrl";

const db = openDatabaseService();

async function getCartsDataSet() {
  
  return new Promise((resolve, reject) => {



    
    const insertData = insertProccess();
   
    resolve(insertData);
    
  });

}



async function insertProccess(){
    
    let quoteObject = getCartData('CART');
 
    let serverInsertion = sendToServer(quoteObject)
    return serverInsertion;
 
}



async function getCartData() {
  const ress = new Promise((resolve, reject) => {
    let rowsAry = [];
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_shoppingcart where AppShoppingCartSaveFlag = 'CART' and ReadyToSync = '1'`,[],

      async function (tx, res)  {
      
          if (res.rows.length != 0) {
            for (let index1 = 0; index1 < res.rows.length; index1++) {

      
            
              tx.executeSql(`SELECT * FROM local_ct_quotes where ItemShoppingCartID = '${res.rows.item(index1).ShoppingCartID}'`,[],
      
              async  function (tx, ress) {
              
                
                      let cart = {
                          ShoppingCartID: res.rows.item(index1).ShoppingCartID,
                          ShoppingCartUserID: res.rows.item(index1).ShoppingCartUserID,
                          ShoppingCartCurrencyID: res.rows.item(index1).ShoppingCartCurrencyID,
                          ShoppingCartCustomerID: res.rows.item(index1).ShoppingCartCustomerID,
                          ShoppingCartNote: res.rows.item(index1).ShoppingCartNote,
                          ShoppingCartIsPreSeason: res.rows.item(index1).AppShoppingCartPreSeason
                      }
          
                      rowsAry.push({ cart });
  
  
                      let subRowsAry = [];
                      tx.executeSql(`SELECT * FROM local_com_shoppingcartsku where ShoppingCartID = '${rowsAry[index1].cart.ShoppingCartID}'`,[],
              
                      async function (tx, resss) {
                      
                          
                              
                          
                          for (let index = 0; index < resss.rows.length; index++) {
                              subRowsAry.push(resss.rows.item(index));
                          }
          
                          rowsAry[index1].cart.ShoppingCartItems = subRowsAry;
                          
                          
              
                          let len = res.rows.length -1;
                         
                          if (index1 == len ) {
                            
                              resolve(rowsAry);
                          }
                      })
              })
  
  
            
  
              
             
               
            }

          }else{
            resolve(rowsAry);
          }
          
     
      


          
        })
        

    
       
     
      

      

    });
  });


 
  return ress;
}






async function sendToServer(quoteObject) {
  return new Promise((resolve, reject) => {

 
   resolve(quoteObject)

  });
}


export default getCartsDataSet;
