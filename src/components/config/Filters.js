import getBaseUrl from '../../url/getBaseUrl';

async function getGetFilters() {

  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbGVzcmVwQGtpbmdzc2VlZHMuY29tIiwibmFtZWlkIjoiOTY1MjgiLCJuYmYiOjE2MzU1MDYyNDUsImV4cCI6MTYzNTUwOTg0NSwiaWF0IjoxNjM1NTA2MjQ1LCJpc3MiOiJzZWxmIiwiYXVkIjoiaHR0cHM6Ly9hcGkud2hpdGVob3VzZXByb2R1Y3RzbHRkLmNvbSJ9.ffX3sVSNv0yu59G0rHMPV2vjJ1kD7Kzc0kv284IHCug");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

var raw = JSON.stringify({
  "NodeAliasPath": "/Products/Vegetable-Seeds/Garlic",
  "CurrentPage": "1",
  "PageSize": "48",
  "LastFilterClicked": {},
  "Filters": [],
  "FiltersFromURL": [],
  "SortBy": "ct.SKUName"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

return fetch(`${getBaseUrl()}GetFilters`, requestOptions)
  .then(response => response.text())
  .then(response => JSON.parse(response))
    .then(result => {
      return result;
    })
  .catch(error => console.log('error', error));

}

export default getGetFilters;

