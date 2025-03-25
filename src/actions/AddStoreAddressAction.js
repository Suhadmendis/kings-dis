import URL from "../url/baseUrl";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';


import {store} from '../../configureStore';
import {getSearchStoresDetails} from "../url/API";
import {GetTradeStoresLocal} from "../offline/localData/serviceData/GetTradeStoresLocal";

import DataAdapter from "../offline/localData/DataAdapter";
import { addAddress } from "../url/API";
import getBaseUrl from '../url/getBaseUrl';

export const getStoresDetails = async data => {
  let state = store.getState();
  let internetConnectivity = state.loading?.connectionStatus;

  if (internetConnectivity) {
    //get data from the API if has internet
    addAddress({
      ...data,
      IsDefaultBilling: data.addressType == 1,
      IsDefaultShipping: data.addressType == 2,
    }).then(res => {
      // console.log('address adding result', res)
      if (res.address?.addressID) {
        showMessage({
          message: 'KINGS SEEDS',
          description: 'Address successfully added',
          type: 'success',
          autoHide: true,
        });
        //reloading previous screen's addresses
        route.params.setTime(Date.now())

        //adding address to local db
        addAddressToDB(res.address).then(res2 => {
          // console.log('db res', res2)
          //navigation.goBack();
        })

      } else {
       // Alert.alert('Error', res.error)
        showMessage({
          message: 'KINGS SEEDS',
          description: res.error,
          type: 'warning',
          autoHide: true,
        });
      }
    })
  } else {
    //get data from database if no internet
    addAddressToDB({
      ...data,
      IsDefaultBilling: data.addressType == 1,
      IsDefaultShipping: data.addressType == 2,
    }).then(res2 => {
      // console.log('db res', res2)
      //route.params.setTime(Date.now())
      //navigation.goBack();
    })
  }
}


// async function AddNewStoreAddress (
//   adminCustomerID,
//   l_token,
//   AddressLine1,
//   AddressLine2,
//   AddressLine3,
//   AddressCity,
//   AddressPersonalName,
//   AddressCountryID,
//   AddressZip,
//   AddressLine4,
//   AddressPhone,
//   IsDefaultBilling,
//   IsDefaultShipping
// ) {
//   console.log(AddressLine1);
//   if (l_token != "blank") {
//     try {
//       var myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${l_token}`);
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
//       if (adminCustomerID !== "") {
//         myHeaders.append("WorkingAsCustomerID", adminCustomerID);
//       }

//       var raw = JSON.stringify({
//         AddressLine1: AddressLine1,
//         AddressLine2: AddressLine2,
//         AddressLine3: AddressLine3,
//         AddressCity: AddressCity,
//         AddressPersonalName: AddressPersonalName,
//         AddressCountryID: AddressCountryID,
//         AddressZip: AddressZip,
//         AddressLine4: AddressLine4,
//         AddressPhone: AddressPhone,
//         IsDefaultBilling: IsDefaultBilling,
//         IsDefaultShipping: IsDefaultShipping,
//       });

//       var requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };

//       fetch(
//         `${getBaseUrl()}Address/AddEditCustomerAddress`,
//         requestOptions
//       )
//         .then((response) => response.text())
//         .then((result) => {
//           const res = JSON.parse(result);
          

//           if (res["error"] !== "") {
//             showMessage({
//               message: "KINGS SEEDS",
//               description: res["error"],
//               type: "warning",
//               autoHide: true,
//             });
//             console.log('erreo11'+res["error"]);
//             return res["error"];
//           } else {
//             showMessage({
//               message: "KINGS SEEDS",
//               description: "Address Added",
//               type: "success",
//               autoHide: true,
//             });
//             return "true";
//           }
//         })
//         .catch((error) => console.log("api error", error));
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// export default AddNewStoreAddress;
