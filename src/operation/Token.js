import getBaseUrl from '../url/getBaseUrl';

async function getValidToken() {
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    
    var raw = "{\r\n    \"username\": \"salesrep@kingsseeds.com\",//epos@grovesnurseries.co.uk\r\n    \"userpassword\": \"!Temp123\"//password\r\n}";
    
      
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
      
      return fetch(`${getBaseUrl()}token`, requestOptions)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(result => {
          
          return result.auth_token;
        })
        .catch(error => console.log('error', error));
    }
    
    export default getValidToken;
    
    
    
    
    
    
    