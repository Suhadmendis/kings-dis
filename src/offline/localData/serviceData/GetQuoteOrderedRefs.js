

import openDatabaseService from '../../Config';
import {GetInteger} from "../../../utils/ValidationHelper";
import {GetProductPriceRange} from "../../Services/ProductHelper";
import GetProductImages, { getProductImages } from '../../../url/API'
import {store} from '../../../../configureStore';
import _ from "lodash";
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../../Services/UserHelper";


async function NewProducts() {

  const db = openDatabaseService();

  return new Promise((resolve, reject) => {

    const productsLimit = 10;

    db.transaction(tx => {
      
      let query = `select OrderQuoteID from local_com_order where OrderQuoteID > 0`;
      
      tx.executeSql(query,[],

        async function (tx, res) {
          let data = [];

          for (let index = 0; index < res.rows.length; index++) {
            data.push(res.rows.item(index));
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
