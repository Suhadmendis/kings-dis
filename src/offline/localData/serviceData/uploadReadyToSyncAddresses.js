
import openDatabaseService from '../../Config';
import {GetAddressDisplay} from "../../Services/AddressInfoProvider";
import {GetBoolean} from "../../../utils/ValidationHelper";
import getBaseUrl from '../../../url/getBaseUrl';

async function uploadReadyToSyncAddresses(token, data) {

    return new Promise((resolve, reject) => {

        
    
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
    
        var raw = JSON.stringify({
            "Addresses": data
          });
        
    



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        
        return fetch(`${getBaseUrl()}Sync/AddressSync`, requestOptions)
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(result => {
         
          resolve(result.addresses);

        })
        .catch(error => console.log('error', error));
      
      
        
      });
}

export default uploadReadyToSyncAddresses;
