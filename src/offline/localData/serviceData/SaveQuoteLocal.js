import openDatabaseService from '../../Config';
import { store } from '../../../../configureStore';
import createTableSchema from '../../storeData/createTableSchema';
import createDataSchema from '../../storeData/createDataSchema';


const db = openDatabaseService();


async function SaveQuoteLocal({ items, cartMode, quoteId, ReadyToSync }) {
  

  const { cart, quote, quoteStatusUser } = items;


  return new Promise((resolve, reject) => {



    
    const insertData = insertProccess(cart, quote, quoteStatusUser, cartMode, quoteId, ReadyToSync);
    
    resolve(insertData);
    
  });
}


async function insertProccess(cart, quote, quoteStatusUser, cartMode, quoteId, ReadyToSync){

  const cartInserted = await insertCartData(cart, cartMode, quoteId, ReadyToSync);
  
  if (cartMode != 'Editing Quote') {
    const quoteInserted = await insertQuoteData(quote);
  }else{
    const updateQuote = await updateQuoteData(quote);
  }

  const quoteStatusInserted = await insertQuoteStatusData(quoteStatusUser);

  const show = await showData();



  return quoteStatusInserted;

}




async function insertCartData(cartObject, cartMode, quoteId, ReadyToSync) {

  return new Promise((resolve, reject) => {

    const tableName = 'local_com_shoppingcart';
    const subTableName = 'local_com_shoppingcartsku';




    const cart = cartObject;
    const shoppingCartItems = cartObject.shoppingCartItems;




    if (cartMode == 'Editing Quote') {


      const tableSchema = 'UPDATE local_com_shoppingcart SET ShoppingCartGUID = ?, ShoppingCartUserID = ?, ShoppingCartSiteID = ?, ShoppingCartLastUpdate = ?, ShoppingCartCurrencyID = ?, ShoppingCartPaymentOptionID = ?, ShoppingCartShippingOptionID = ?, ShoppingCartBillingAddressID = ?, ShoppingCartShippingAddressID = ?, ShoppingCartCustomerID = ?, ShoppingCartNote = ?, ShoppingCartCompanyAddressID = ?, ShoppingCartCustomData = ?, ShoppingCartContactID = ?, AppShoppingCartPreSeason = ?, AppShoppingCartName = ?, AppShoppingCartSaveFlag = ?, ShoppingCartIsPreSeason = ?, ToEmail = ?, ReadyToSync = ? where ShoppingCartID = ?';
      const subTableSchema = createTableSchema(subTableName);

      const dataSchema = createDataSchema(tableName, cart, '', 'QUOTE');

      db.transaction(
        (tx) => {
          
            const firstElement = dataSchema[0];
            dataSchema.shift();

            let updateDataSchema = dataSchema;
            updateDataSchema.push(firstElement);

            console.log('================================================');
            console.log(tableSchema);
            console.log(updateDataSchema);
            console.log('================================================');
            tx.executeSql(
              tableSchema
              ,updateDataSchema,
            function (tx, res) {
              console.log(`Updated - ${res.rowsAffected}`);
              if(res.rowsAffected == 1){

                tx.executeSql(`DELETE FROM local_com_shoppingcartsku where ShoppingCartID = ${updateDataSchema[updateDataSchema.length-1]}`,[],
                  function (tx, res) {
                    let count = 0;
                    shoppingCartItems.map((item) => {
                      
                      let subDataSchema = [];
                      
                      subDataSchema.push(item.webCartItemID);
                      subDataSchema.push(item.shoppingCartID);
                      subDataSchema.push(item.skuid);
                      subDataSchema.push(item.skuUnits);
                      subDataSchema.push(item.cartItemCustomData);
                      subDataSchema.push(item.cartItemGuid);
                      subDataSchema.push(item.cartItemParentGuid);
                      subDataSchema.push(item.cartItemValidTo);
                      subDataSchema.push(item.cartItemBundleGUID);
                      subDataSchema.push(item.cartItemText);
                      subDataSchema.push(item.cartItemAutoAddedUnits);
                      subDataSchema.push(item.cartItemUnitListPrice);
                      subDataSchema.push(item.cartItemUnitPrice);
                      subDataSchema.push(item.cartItemUnitDiscount);
                      subDataSchema.push(item.cartItemPrice);
                      subDataSchema.push(item.cartItemDiscountRate);
                      subDataSchema.push(item.cartItemQuoteLineDiscount);
                      subDataSchema.push(item.cartItemQuoteLineDiscountType);
                      subDataSchema.push(item.cartItemQuoteYourPrice);
                      subDataSchema.push(item.cartItemPriceLine);
                      subDataSchema.push(item.cartItemLineTax);
                      subDataSchema.push(item.cartItemNote);
                      subDataSchema.push(item.cartItemBackCard);
                      
                     
                      
              

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
            }, function (tx, error){
              console.log('====================================');
              console.log(tx);
              console.log(error);
              console.log('====================================');
            });  
          }
      );


      
    }else{



    const tableSchema = createTableSchema(tableName);
    const subTableSchema = createTableSchema(subTableName);

    
    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{


      

        const dataSchema = createDataSchema(tableName, cart, '', 'QUOTE');



        console.log('====================================');
        console.log(tableSchema);
        console.log(dataSchema);
        console.log('====================================');

        db.transaction(
          (tx) => {
            tx.executeSql(tableSchema, dataSchema,
            function (tx, res) {
              if(res.rowsAffected == 1){
                let count = 0;
                shoppingCartItems.map((item) =>{
                
     
                  const subDataSchema = createDataSchema(subTableName, item);
                  tx.executeSql(subTableSchema, subDataSchema,
                    function (tx, res) {
                        
                      count = count + 1;
                      if(res.rowsAffected != 1){
                        resolve('Error');          
                      }

                      if(count == shoppingCartItems.length){
                        
                        if (ReadyToSync) {
                          tx.executeSql(`DELETE FROM local_com_shoppingcart where ShoppingCartID = ${quoteId}`,[],

                          function (tx, res) {
                              
                          
                          });

                          tx.executeSql(`DELETE FROM local_ct_quotes where ItemShoppingCartID = ${quoteId}`,[],

                          function (tx, res) {
                              
                          
                          });


                          tx.executeSql(`DELETE FROM local_com_shoppingcartsku where ShoppingCartID = ${quoteId}`,[],
                            function (tx, res) {
                             
                              resolve('Success');        
                          
                              
                          });

                        }else{
                          resolve('Success');        
                        }
                      }

                  });
                });
              
              }else{
                resolve('Error');
              }
            });

            

          }
        );

      }

    }
  
  });
}





async function insertQuoteData(quoteObject) {

  return new Promise((resolve, reject) => {

    const tableName = 'local_ct_quotes';
    
    const tableSchema = createTableSchema(tableName);
    
    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{
    
      const dataSchema = createDataSchema(tableName, quoteObject);


      
      db.transaction(
        (tx) => {
          tx.executeSql(tableSchema, dataSchema,
          function (tx, res) {
            if(res.rowsAffected == 1){
              resolve('Success');

              
             
            }else{
              resolve('Error');
            }
          },
          function (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
          });


          

        }
      );


    }
  
  });
}


async function updateQuoteData(quoteObject) {

  return new Promise((resolve, reject) => {

    const tableName = 'local_ct_quotes';
    
    const tableSchema =  'UPDATE local_ct_quotes SET ItemQuoteTotal = ? where ItemShoppingCartID = ?';
    
    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{
    
      const dataSchema = [quoteObject.itemQuoteTotal, quoteObject.itemShoppingCartID];


      db.transaction(
        (tx) => {
          tx.executeSql(tableSchema, dataSchema,
          function (tx, res) {
            if(res.rowsAffected == 1){
              resolve('Success');

             
            }else{
              resolve('Error');
            }
          },
          function (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
          });

          

        }
      );


    }
  
  });
}


async function insertQuoteStatusData(quoteStatusUser) {

  return new Promise((resolve, reject) => {

    const tableName = 'local_ct_quotestatususer';
    
    const tableSchema = createTableSchema(tableName);
    
    if (tableSchema == '') {
      resolve(`Table Schema Not Found in Code: ${tableName}`);
    }else{
    
      const dataSchema = createDataSchema(tableName, quoteStatusUser);
      db.transaction(
        (tx) => {
          tx.executeSql(tableSchema, dataSchema,
            function (tx, res) {
              if(res.rowsAffected == 1){
                resolve('Success');
              
            
               
              }else{
                resolve('Error');
              }
            },
            function (error) {
              console.log('====================================');
              console.log(error);
              console.log('====================================');
            });

          

        }
      );


    }
  
  });
}


async function showData() {


  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_shoppingcart`,[],

        function (tx, res) {
          let data = [];
      

          console.log(res.rows.length);


          for (let index = 0; index < res.rows.length; index++) {

            // console.log(res.rows.item(index));

          }
          resolve(data);
        })
    });
  });


}





export default SaveQuoteLocal;



