import { GetLoggedInAccountCode } from "../../Services/UserHelper";
import { GetProductsDataByCategory, GetCustomFormattedValue } from "../../Services/ProductHelper";
import { GetDecimal, GetInteger, GetBoolean } from "../../../utils/ValidationHelper";
import { IsUserAnySOP, CategoriesNotAvailableForEndUsers } from "../../Services/UserHelper";

export async function GetPictorialProducts(sCategory, nOffset = 0, nPageSize = 0) {
  let resData = [];


  try {
    // let sWhere = "SkuDiscountCat='A'";
    let sWhere = "(SkuDiscountCat='A' or SkuDiscountCat='A2')";
    if (!IsUserAnySOP()) {
      sWhere += " AND " + CategoriesNotAvailableForEndUsers()
        .map(cat => {
          return "Nav_Navigation NOT LIKE '" + cat + "/%' ";
        })
        .join(" AND ");
    }
    let resultArray = await GetProductsDataByCategory(
      3,
      GetLoggedInAccountCode(),
      sCategory,
      nOffset,
      nPageSize,
      sWhere
    );

    if (resultArray != null) {
      let navData = {};

      for (let i = 0; i < resultArray.length; i++) {
        let item = resultArray[i];

        let catPath = item["Cat_Path"];
        // only create category if its not already created
        if (!navData.hasOwnProperty(catPath)) {
          let catObj = {
            name: item["Cat_Name"],
            path: catPath,
            products: []
          };
          navData[catPath] = catObj;
        }

        let options = {};
        for (let i = 1; i <= 1; i++) // only need first price option atm
        {
          let price = GetDecimal(item["Priceline" + i]);
          let priceLineObj = null;
          //if (price > 0) {
            priceLineObj = {
              label: item["Priceline" + i + "label"],
              price: price,
              priceDisplay: await GetCustomFormattedValue(price)
            };
          //}
          options[i] = priceLineObj;
        }

        let productObj = {
          skuId: GetInteger(item["SKUID"]),
          code: item["SKUNumber"],
          title: item["SKUName"],
          stock: GetInteger(item["SKUAvailableItems"]),
          availability: GetBoolean(item["SKUEnabled"]) && GetInteger(item["SKUAvailableItems"]) > 0,
          price: item["PriceRange"],
          priceOptions: options,
          pictorialPackSize: GetInteger(item["SKUPictorialPackSize"])
        };

        navData[catPath].products.push(productObj);
      }

      navData = refactoredProductList(navData);


      Object.keys(navData).forEach((key, index) => {
        resData.push(navData[key]);
      });
    }
  } catch (error) {
    console.log(error);
  }

  return resData;
}

function refactoredProductList(products) {
  let resData = [];

  Object.keys(products).forEach((key, index) => {
    if (products[key].name == 'Vegetables') {
      products[key].products = refactoredProductListSort(products[key].products);
    }
    resData.push(products[key]);
  });

  return products
}

function refactoredProductListSort(arr) {
  return arr.sort((a, b) => {
    const titleA = a.title.toUpperCase(); // Ignore case for comparison
    const titleB = b.title.toUpperCase(); // Ignore case for comparison
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0; // Titles are equal
  });
}