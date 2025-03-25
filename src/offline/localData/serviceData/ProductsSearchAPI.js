import openDatabaseService from '../../Config';
import getBaseUrl from '../../../url/getBaseUrl';
import { store } from '../../../../configureStore';

async function ProductSearchAPI(token,query) {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    let Preseason = 0;
    Preseason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    myHeaders.append("Preseason", Preseason);

    var raw = JSON.stringify({
      "SearchTerm": query,
      "IsBarcode": false
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    // console.log(token);

    return fetch(`${getBaseUrl()}GetSearchAutoCompleteData`, requestOptions)
      .then(response => response.text())
      .then(response => JSON.parse(response))
      .then(response => {
        let resultsAry = [];
        if (response != null) {
          if (response.results != null) {


            const result = response.results;
            console.log(response.result);

            let count = 0;
            result.map(result => {

              let availableItems = '1';
              if(result.availableItems != undefined || result.availableItems != null){
                availableItems = result.availableItems;
              }

              resultsAry.push({
                code: result.code,
                name: result.title,
                id: result.skuId,
                count: count,
                packSize: result.packSize,
                price: result.price,
                dueDate: result.dueDate.replace(' ','T'),
                availability: result.availability,
                skuavailableitems: availableItems
              });
              ++count;
            })

          }
        }

        resolve(resultsAry);
      })
      .catch(error => console.log('error', error));


  });
}

export default ProductSearchAPI;

