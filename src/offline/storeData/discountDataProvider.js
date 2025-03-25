import getBaseUrl from '../../url/getBaseUrl';

export default async function totalSync(token, tableName, localData) {



  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

let upload = [];



localData.map(data => {

    upload.push({
      "Type": "ct_tradeaccount",
      "Data": {
        "TradeAccountID": data.ItemID,
        "ItemDiscGroup1": data.ItemDiscGroup1,
        "ItemDiscGroup2": data.ItemDiscGroup2,
        "ItemDiscGroup3": data.ItemDiscGroup3,
        "ItemDiscGroup4": data.ItemDiscGroup4,
      }
    })

})


  var raw = JSON.stringify({
    "Uploads": upload
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${getBaseUrl()}Sync/LatestSync`, requestOptions)
    .then(response => response.text())
    .then(response => JSON.parse(response).uploads)
    .then(result => {
     return result;
    })
    .catch(error => console.log('error', error));
}
