import openDatabaseService from "../../../src/offline/Config";
import { store } from "./../../../configureStore";
import getBaseUrl from "../../url/getBaseUrl";
import { isSKUAvailableForSale } from "../../offline/Services/ProductHelper";
import { RawQuery } from "../../offline/Services/DataHelper";

export async function CheckQuntities(ids) {
  const db = openDatabaseService();

  return new Promise((resolve, reject) => {
    const token = store.getState().login.loginToken;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

    // DEL
    // {"name": "100% Cornfield Annuals", "priceOption": "400 Grams", "productNumber": "WIL 014", "quantity": 35, "skuPackSize": "1", "unitPrice": 40.565}

    var raw = JSON.stringify(ids);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${getBaseUrl()}Products/GetProductListAvailabilityByCodes`,
      requestOptions
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response))
      .then((response) => {
        // if(response.error == "") {
        resolve(response);

        //   resolve({ status: 'Success', body: response });
        // }else{
        //   resolve({ status: 'Error', body: response });
        // }
      })
      .catch((error) => resolve({ status: "Error", body: response }));
  });
}

export async function CheckQuntitiesOffline(ids) {
  const db = openDatabaseService();

  let dataSet = [];

  for (let index = 0; index < ids.length; index++) {
    const id = ids[index];

    const code = id;

    const availability = await isSKUAvailableForSale(id);

    let query = `Select SKUAvailableItems from local_com_sku where SKUNumber = '${id}'`;
    const res = await RawQuery(query);

    const availableQty = res.item(0).SKUAvailableItems;

    dataSet.push({ code, availability, availableQty });
  }

  return dataSet;
}
