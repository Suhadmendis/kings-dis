
   
import openDatabaseService from '../../Config';

const db = openDatabaseService();

async function GetLocalContacts(data) {
  
  return new Promise((resolve, reject) => {

    const dataset = fetchingProccess(data);
    
    resolve(dataset);
    
  });
}




async function fetchingProccess(data){

  const quotes = await getQuotes(data);
  
  const quoteStatusUser = await getQuoteStatusUser(quotes);

  const quoteStatus = await getQuoteStatus(quoteStatusUser);
  
  return quoteStatus;

}



async function getQuotes(filterData) {

  return new Promise((resolve, reject) => {
    
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_quotes where ItemCustomerID = ${filterData.customerID} order by ItemCreatedWhen DESC`,[],

        function (tx, res) {
          let data = [];
      
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          resolve(data);
        })
    });
  });
}



async function getQuoteStatusUser(quotes) {

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_quotestatususer`,[],
        function (tx, res) {
          let data = [];
          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
          }
          quotes.map(quote => {
            const quoteItemID = quote.ItemID;
            const quoteUserElements = data.filter(quoteUserElement => quoteItemID == quoteUserElement.ItemQuoteID);
            quote.Status = quoteUserElements[quoteUserElements.length - 1];
          });
          resolve(quotes);
        })
    });
  });
}


async function getQuoteStatus(quoteStatusUser) {

  return new Promise((resolve, reject) => {

    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_ct_quotestatus`,[],

        function (tx, res) {
          let data = [];
      
          for (let index = 0; index < res.rows.length; index++) {

            data.push(res.rows.item(index));

          }

          quoteStatusUser.map(quote => {

          let quoteStatusID = null;

          if (quote.Status) {
            quoteStatusID = quote.Status.ItemQuoteStatusID;
          }


          const quoteElements = data.filter(status => quoteStatusID == status.ItemID);
          
          if (quoteElements.length > 0) {
            quote.Status = quoteElements[0].ItemName;
          }else{
            quote.Status = 'Not Allocated';
          }

            
          });

          resolve(quoteStatusUser);
        })
    });
  });
}



export default GetLocalContacts;