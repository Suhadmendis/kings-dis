import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import createTableSchema from '../../storeData/createTableSchema';
import createDataSchema from '../../storeData/createDataSchema';


async function SaveCartLocal({ items, preSeason, cartMode, cartId, cartStatus, ReadyToSync }) {
  
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {
  



    const tableName = 'local_com_shoppingcart';
    const subTableName = 'local_com_shoppingcartsku';

      
    const cart = items.cart;
    const shoppingCartItems = cart.shoppingCartItems;

    
if (cartStatus == 'NEWCART') {
  cartMode = cartStatus;
  
}


    if (cartMode == 'Editing Cart') {


      const tableSchema = 'UPDATE local_com_shoppingcart SET ShoppingCartGUID = ?, ShoppingCartUserID = ?, ShoppingCartSiteID = ?, ShoppingCartLastUpdate = ?, ShoppingCartCurrencyID = ?, ShoppingCartPaymentOptionID = ?, ShoppingCartShippingOptionID = ?, ShoppingCartBillingAddressID = ?, ShoppingCartShippingAddressID = ?, ShoppingCartCustomerID = ?, ShoppingCartNote = ?, ShoppingCartCompanyAddressID = ?, ShoppingCartCustomData = ?, ShoppingCartContactID = ?, AppShoppingCartPreSeason = ?, AppShoppingCartName = ?, AppShoppingCartSaveFlag = ?, ShoppingCartIsPreSeason = ?, ToEmail = ?, ReadyToSync = ? where ShoppingCartID = ?';
      const subTableSchema = createTableSchema(subTableName);


      if (tableSchema == '') {
        resolve(`Table Schema Not Found in Code: ${tableName}`);
      }else{

        



        let generatedPreSeason = '0';

        if(preSeason) generatedPreSeason = '1';
        
        let cartItemObject = cart;
        
        cartItemObject.shoppingCartIsPreSeason ? cartItemObject.shoppingCartIsPreSeason = 1 : cartItemObject.shoppingCartIsPreSeason = 0;
 
        

        const dataSchema = createDataSchema(tableName, cartItemObject, generatedPreSeason, 'CART');
        

        

        db.transaction(
          (tx) => {
             const firstElement = dataSchema[0];
              dataSchema.shift();

              let updateDataSchema = dataSchema;
              updateDataSchema.push(firstElement);
            
            
            tx.executeSql(tableSchema, dataSchema,
              function (tx, res) {
                console.log('effect ',res.rowsAffected);
                if(res.rowsAffected == 1){
                
                  tx.executeSql(`DELETE FROM local_com_shoppingcartsku where ShoppingCartID = ${updateDataSchema[updateDataSchema.length-1]}`,[],
                  function (tx, res) {

                    console.log('============rowsAffected========================');
                    console.log(res.rowsAffected);
                    console.log('====================================');
                    
                    let count = 0;
                    shoppingCartItems.map((item) => {
                      
                      item.cartItemID = item.webCartItemID;

                      const subDataSchema = createDataSchema(subTableName, item);
                  
                      console.log('====================================');
                      console.log(subTableSchema);
                      console.log(subDataSchema);
                      console.log('====================================');
                    

                      tx.executeSql(subTableSchema, subDataSchema,
                        function (tx, res) {
                            
                          count = count + 1;
                          
                          if(res.rowsAffected != 1){
                            resolve('Error');          
                          }
                          if(count == shoppingCartItems.length){
                            resolve('Success');        
                          }
                      },
                      function (error) {
                            
                        console.log('====================================');
                        console.log(error);
                        console.log('====================================');
                      });
                    });
                    
                  });
                  
                }else{
                  resolve('Error');
                }
              });


            //  const firstElement = dataSchema[0];
            //   dataSchema.shift();

            //   let updateDataSchema = dataSchema;
            //   updateDataSchema.push(firstElement);
            


          

// ------// ------// ------// ------// ------// ------// ------// ------// ------


              // const firstElement = dataSchema[0];
              // dataSchema.shift();

              // let updateDataSchema = dataSchema;
              // updateDataSchema.push(firstElement);
            
              // tx.executeSql(
              //   tableSchema
              //   ,updateDataSchema,
              // function (tx, res) {
              //   console.log(`Updated - ${res.rowsAffected}`);
              //   if(res.rowsAffected == 1){

                 
              //   }else{
              //     resolve('Error');
              //   }
              // });  
            }
        );


      }
    }else{
      
      const tableSchema = createTableSchema(tableName);
      const subTableSchema = createTableSchema(subTableName);

      if (tableSchema == '') {
        resolve(`Table Schema Not Found in Code: ${tableName}`);
      }else{
        
        let generatedPreSeason = '0'; // not in use

        if(preSeason) generatedPreSeason = '1'; // not in use
        
        cart.shoppingCartIsPreSeason ? cart.shoppingCartIsPreSeason = 1 : cart.shoppingCartIsPreSeason = 0;
        
        

        const dataSchema = createDataSchema(tableName, cart, generatedPreSeason, 'CART');
        
        

        db.transaction(
          (tx) => {
            tx.executeSql(tableSchema, dataSchema,
            function (tx, res) {
              console.log('effect ',res.rowsAffected);
              if(res.rowsAffected == 1){

                let count = 0;
                shoppingCartItems.map((item) => {
              
                  
                  const subDataSchema = createDataSchema(subTableName, item);
        

                  
                  tx.executeSql(subTableSchema, subDataSchema,
                    function (tx, res) {
                        
                      count = count + 1;
                      if(res.rowsAffected != 1){
                        resolve('Error');          
                      }

                      if(count == shoppingCartItems.length){

                        if (ReadyToSync) {
                          tx.executeSql(`DELETE FROM local_com_shoppingcart where ShoppingCartID = ${cartId}`,[],

                          function (tx, res) {
                              
                          
                          });


                          tx.executeSql(`DELETE FROM local_com_shoppingcartsku where ShoppingCartID = ${cartId}`,[],
                            function (tx, res) {
                              resolve('Success');        
                          
                              
                          });

                        }else{
                          resolve('Success');        
                        }
                   

                        
                      }

                  }, 
                  function (error) {
                        
                });
                });
              
              }else{
                resolve('Error');
              }
            },
            function (error) {
             console.log('=================error===================');
             console.log(error);
             console.log('====================================');
            });

            

          }
        );
      }


    }
    

  });
}

export default SaveCartLocal;



