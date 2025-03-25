import { store } from '../../../configureStore';
import getBaseUrl from '../../url/getBaseUrl';


async function getValidSearchList(token, key, maxRows=8) {

  let Preseason = 0;
  Preseason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
  myHeaders.append("Preseason", Preseason);

  var raw = JSON.stringify({
    "SearchTerm": key,
    "IsBarcode": false,
    "PageSize": maxRows
  });


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  console.log(requestOptions);

  return fetch(`${getBaseUrl()}GetSearchAutoCompleteData`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(response => {
      let resultsAry = [];
      if (response != null) {
        if (response.results != null) {
          const result = response.results;
          let count = 0;
          result.map(result => {
            resultsAry.push({ code: result.code, title: result.title, id: result.skuId, count: count, availability: result.availability });
            ++count;
          })

        }
      }

      return resultsAry;
    })
    .catch(error => console.log('error', error));


  }

  export default getValidSearchList;
