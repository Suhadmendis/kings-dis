import openDatabaseService from '../../Config';


async function FindPictorials(dataset) {
  

  

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;
    let data = [];
    
    db.transaction(tx => {
      dataset.map(productId => {
        tx.executeSql(`SELECT SKUID, SkuDiscountCat, SkuPictorialPackSize FROM local_com_sku where SKUID = ${productId}`,[],

        function (tx, res) {
          
      
          console.log(res.rows.length);

          for (let index = 0; index < res.rows.length; index++) {

            data.push(res.rows.item(index));              

          }

          
          
        })

        tx.executeSql(`SELECT SKUID, SkuDiscountCat, SkuPictorialPackSize FROM local_com_sku where SKUID = ${dataset[0]}`,[],

        function (tx, res) {
          
          resolve(data);
          
          
        })


      });
      
    });
  });
}


export default FindPictorials;