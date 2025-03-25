

import openDatabaseService from '../../Config';
import {GetInteger} from "../../../utils/ValidationHelper";
import {GetProductPriceRange, GetProductPriceOptions, GetProductPriceRangeBySkuId} from "../../Services/ProductHelper";
import GetProductImages, { getProductImages } from '../../../url/API'
import {store} from '../../../../configureStore';
import _ from "lodash";
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../../Services/UserHelper";
import GetPictorialPackSize from '../../localData/serviceData/GetPictorialPackSize';
async function NewProducts() {

  Preseason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;
  console.log('--------------------------fsds---fff---');
  console.log(Preseason);

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    db.transaction(tx => {
      // let sWhere = "SKUNumber = '10829'";
      let sWhere = "";
      if (!IsUserAnySOP()) {
        sWhere = CategoriesNotAvailableForEndUsers()
          .map(cat => {
            return "Nav_Navigation NOT LIKE '" + cat + "/%' ";
          })
          .join(" AND ");
      }

      let query = `SELECT * FROM local_com_sku
      INNER JOIN local_int_navigation
      ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
      WHERE SKUEnabled=1`;


      if (Preseason == 1) {
        sWhere += " coalesce(SKUPreSeasonOnly, null, 0) = 1 ";
      } else {
        sWhere += " coalesce(SKUPreSeasonOnly, null, 0) = 0 ";
      }


      if (sWhere != '') {
        query += ` AND ${sWhere}`;
      }

      query += ` ORDER BY SKUCreated DESC LIMIT ${productsLimit}`;

      console.log('--------sdfihgsdbhsbdg---------------------fff---');
console.log(query);
      tx.executeSql(query,[],

        async function (tx, res) {
          let data = [];
          let productIDArray =[];

          for (let index = 0; index < res.rows.length; index++) {

            //const priceRange = await GetProductPriceRange(res.rows.item(index).SKUNumber);

            const priceOptionsProduct = await GetProductPriceRangeBySkuId(res.rows.item(index).SKUID);

            const pictorialCheck = await GetPictorialPackSize(res.rows.item(index).SKUID);

            data.push({
              code: res.rows.item(index).SKUNumber,
              id: res.rows.item(index).SKUID,
              title: res.rows.item(index).SKUName,
              subtitle: res.rows.item(index).SKUNumber,
              size: res.rows.item(index).SKUPackSize,
              stock: GetInteger(res.rows.item(index).SKUAvailableItems),
              dueDate: res.rows.item(index).SKUInStoreFrom,
              skuprice: priceOptionsProduct,
              image: require('../../../assets/noimage.png'),
              pictorial: pictorialCheck[0]
            });

            let obj = {"NodeSKUID": res.rows.item(index).SKUID}

            productIDArray.push(obj);

          }

          let state = store.getState();
          let internetConnectivity = state.loading?.connectionStatus;

          let imgsArray = [];
          if (internetConnectivity) {
            try {
              imgsArray = await getProductImages(productIDArray);
            } catch (error) {
              console.log(error);
            }

            for (let i = 0; i < data.length; i++) {
              const element = data[i];

              let el_ = _.find(imgsArray, {nodeSKUID: element.id}) ?? null;

              if (el_ != null) {
                element.image = { uri: el_.imagesMain[0].imagePath}
              }

            }
          }
          resolve(data);
        })
    });
  });
}



function getPriceRange(item){

  let price = '£' + (item.SKUPrice * 100/100).toFixed(2);
  let to_price = '';

  if(item.SKUPrice2 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice2).toFixed(2);
  if(item.SKUPrice3 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice3).toFixed(2);
  if(item.SKUPrice4 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice4).toFixed(2);
  if(item.SKUPrice5 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice5).toFixed(2);
  if(item.SKUPrice6 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice6).toFixed(2);
  if(item.SKUPrice7 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice7).toFixed(2);
  if(item.SKUPrice8 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice8).toFixed(2);
  if(item.SKUPrice9 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice9).toFixed(2);
  if(item.SKUPrice10 != '')  to_price = ' -  £' + parseFloat(item.SKUPrice10).toFixed(2);

  price = price + to_price;

  return price;

}

export default NewProducts;
