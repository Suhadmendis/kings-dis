import React from "react";
import {Linking, Text} from "react-native";
import {GetDataTableValues, RawQuery} from "./DataHelper";
import {GetCountryInfo} from "./CountryInfoProvider";
import {GetDecimal, GetInteger, RoundDecimal} from "../../utils/ValidationHelper";
import {GetCustomFormattedValue} from "./ProductHelper";
import _ from "lodash";
import {CategoriesNotAvailableForEndUsers} from "./UserHelper";
import {styles} from "../../style/BillingAddressStyle.js";

export async function getValidShippingOptions(aCartItems, sPostcode, nCountryID, bDisplayShippingOptionPrice = true) {
  let data = {
    shippingOptions: [],
    message: null,
    canCheckout: true
  };

  if (aCartItems.length > 0 && nCountryID > 0) {
    let nPostcodeZoneID = 0;

    let oCountry = await GetCountryInfo(nCountryID);
    if (oCountry.CountryTwoLetterCode == "GB") {

      let nCountryGroupID = GetInteger(oCountry.CountryGroupID);
      if (nCountryGroupID == 1) {
        sPostcode = sPostcode.replace(' ', '');
        if (sPostcode !== "") {
          if (sPostcode.length > 3) {
            let sPostcodePart = sPostcode.substring(0, sPostcode.length - 3);
            nPostcodeZoneID = await getPostcodeZoneID(sPostcodePart);
          }
          nPostcodeZoneID = (nPostcodeZoneID == 0) ? 1 : nPostcodeZoneID; //default post code zone set to UK mainland
        } else {
          nPostcodeZoneID = 1;
        }
      }

      let sWhere = `ItemSiteID = 1 AND (ItemCountryGroupID = 0 OR ItemCountryGroupID = ${nCountryGroupID}) AND ` + ((nPostcodeZoneID > -1) ? `(ItemPostcodeZoneID = 0 OR ItemPostcodeZoneID = ${nPostcodeZoneID})` : `ItemPostcodeZoneID = -1`);

      let aFactors = await getDeliveryFactorIDs(aCartItems);
      if (aFactors.length > 0) {
        let sFactorsWhere = "";

        for (let i = 0; i < aFactors.length; i++) {
          if (sFactorsWhere == "") {
            sFactorsWhere = `'|' || ItemDeliveryFactors || '|' LIKE '%|${aFactors[i]}|%'`;
          } else {
            sFactorsWhere += ` OR '|' || ItemDeliveryFactors || '|' LIKE '%|${aFactors[i]}|%'`;
          }
        }

        sWhere += ` AND (${sFactorsWhere})`;
      }

      sWhere = `ShippingOptionID IN (SELECT ItemShippingOptionID FROM local_ct_deliverymatrix WHERE ${sWhere})`;

      let shippingOptionRes = await RawQuery(`SELECT * FROM local_com_shippingoption WHERE ${sWhere}`);
      console.log("shippingOptionRes... ", shippingOptionRes)
      if (shippingOptionRes != "") {
        let allItemsFree = true;
        for (let index = 0; index < aCartItems.length; index++) {
          let navRes = await GetDataTableValues("local_int_navigation", `Nav_SKUID=${aCartItems[index].skuid}`, "Nav_Navigation");
          console.log("navRes... ", navRes);
          if (navRes != "") {
            if (!_.some(CategoriesNotAvailableForEndUsers(), cat => navRes.item(0).Nav_Navigation.includes(cat))) {
              allItemsFree = false;
            }
          } else {
            allItemsFree = false;
          }
        }

        for (let i = 0; i < shippingOptionRes.length; i++) {
          let item = shippingOptionRes.item(i);

          let label = `${item.ShippingOptionDisplayName}`;
          let priceObj = await getDeliveryPriceObject(nCountryGroupID, nPostcodeZoneID, item.ShippingOptionID, aFactors);

          if (allItemsFree) {
            priceObj.shippingPrice = 0;
            priceObj.discountedPrice = 0;
          }

          let formattedPrice = await getDeliveryPriceDisplayValue(priceObj.shippingPrice, priceObj.discountedPrice, priceObj.itemPriceLabel);
          if (bDisplayShippingOptionPrice) {
            label += ` (${formattedPrice})`;
          }

          let prices = await getDeliveryPriceValue(priceObj.shippingPrice, priceObj.discountedPrice);
          data.shippingOptions.push({
            ...item,
            label: label,
            value: item.ShippingOptionID,
            price: prices[0],
            tax: prices[1],
            itemPriceLabel: formattedPrice
          })
        }
      }

    } else {
      data.message =
          <Text>We are not allowed to export seeds to countries outside the UK (Northern Ireland included) without the
            customer purchasing a Phytosanitary Certificate. Please contact us by email: <Text style={styles.link}
                                                                                               onPress={() => Linking.openURL('mailto:sales@kingsseeds.com')}>sales@kingsseeds.com</Text>.</Text>;
      data.canCheckout = false;
    }
  }

  return data;
}

export async function getPostcodeZoneID(sPostcodePart) {
  let itemZoneID = 1;

  let postcodeRes = await GetDataTableValues("local_ct_postcodes", `RTRIM(ItemPostcode) = '${sPostcodePart.trim()}'`, "ItemZoneID");
  console.log("postcodeRes... ", postcodeRes)
  if (postcodeRes != "") {
    if (GetInteger(postcodeRes.item(0).ItemZoneID) > 0) {
      itemZoneID = GetInteger(postcodeRes.item(0).ItemZoneID);
    }
  }

  return itemZoneID;
}

export async function getDeliveryFactorIDs(aCartItems) {
  let aFactors = [];

  let total = 0;
  _.map(aCartItems, (i) => {
    total += i.totalPrice;
  });
  total = GetDecimal(total.toFixed(2));

  let nFactorID = await getWeightFactorID(total);
  aFactors.push(nFactorID);

  return aFactors;
}

export async function getWeightFactorID(nFactor, bIsFactorRangeBased = true) {
  let nOut = 0;

  let deliveryFactorsRes = "";
  if (!bIsFactorRangeBased) {
    deliveryFactorsRes = await GetDataTableValues("local_ct_deliveryfactors", `ItemFactor = ${nFactor}`, "ItemID,ItemFactor", 1);
  } else {
    deliveryFactorsRes = await GetDataTableValues("local_ct_deliveryfactors", "", "ItemID,ItemFactor");
  }
  console.log("deliveryFactorsRes... ", deliveryFactorsRes)
  if (deliveryFactorsRes != "") {
    for (let i = 0; i < deliveryFactorsRes.length; i++) {
      let sFactors = deliveryFactorsRes.item(i)["ItemFactor"];

      if (sFactors != null && sFactors != "") {
        if (sFactors.includes("-")) {
          let dMin = GetDecimal(sFactors.split('-')[0]);
          let dMax = GetDecimal(sFactors.split('-')[1]);

          if (dMax > 0) {
            if (nFactor >= dMin && nFactor <= dMax) {
              nOut = GetInteger(deliveryFactorsRes.item(i)["ItemID"]);
              break;
            }
          }
        } else {
          nOut = GetInteger(deliveryFactorsRes.item(i)["ItemID"]);
          break;
        }
      }
    }
  }

  return nOut;
}

export async function getDeliveryPriceDisplayValue(nShippingPrice, nDiscountedPrice, sDeliveryPriceLabel, bDeliveryDiscountValid = false) {
  let sOut = await GetCustomFormattedValue(nShippingPrice, false);

  if (nShippingPrice == -1) {
    sOut = "TBC";
  } else if (bDeliveryDiscountValid) {
    if (sDeliveryPriceLabel != null && sDeliveryPriceLabel != "" && nDiscountedPrice == -1) {
      sOut = sDeliveryPriceLabel;
    } else {
      sOut = await GetCustomFormattedValue(nDiscountedPrice, false);
    }
  } else if (nShippingPrice == 0 && sDeliveryPriceLabel != null && sDeliveryPriceLabel != "") {
    sOut = sDeliveryPriceLabel;
  }

  return sOut;
}

export async function getDeliveryPriceValue(nShippingPrice, nDiscountedPrice, bDeliveryDiscountValid = false) {
  let shippingPrice = nShippingPrice;
  let shippingTax = 0;

  if (nShippingPrice == -1) {
    shippingPrice = 0;
  } else if (bDeliveryDiscountValid) {
    if (nDiscountedPrice == -1) {
      shippingPrice = 0;
    } else {
      shippingPrice = nDiscountedPrice;
    }
  }
  shippingPrice = RoundDecimal(GetDecimal(shippingPrice));

  if (shippingPrice > 0) {
    let taxRateRes = await RawQuery("SELECT stax_Rate FROM local_int_salestax WHERE stax_Code='1'");
    if (taxRateRes != "") {
      let taxRate = GetDecimal(taxRateRes.item(0).stax_Rate);
      if (taxRate > 0) {
        shippingTax = RoundDecimal(shippingPrice * (taxRate / 100));
      }
    }
  }

  return [shippingPrice, shippingTax];
}

export async function getDeliveryPriceObject(nCountryGroupID, nPostcodeZoneID, nShippingOptionID, aDeliveryFactorIDs) {
  let priceObj = {
    shippingPrice: 0,
    discountedPrice: 0,
    itemPriceLabel: ""
  };

  if (nShippingOptionID > 0) {
    let sWhere = `ItemSiteID = 1`;
    if (nCountryGroupID > 0) {
      sWhere += ` AND ItemCountryGroupID = ${nCountryGroupID}`;
    }
    if (nPostcodeZoneID > 0) {
      sWhere += ` AND (ItemPostcodeZoneID = 0 OR ItemPostcodeZoneID = ${nPostcodeZoneID})`;
    }
    if (nShippingOptionID > 0) {
      sWhere += ` AND ItemShippingOptionID = ${nShippingOptionID}`;
    }

    if (aDeliveryFactorIDs.length > 0) {
      let sFactorsWhere = "";

      for (let i = 0; i < aDeliveryFactorIDs.length; i++) {
        if (sFactorsWhere == "") {
          sFactorsWhere = `'|' || ItemDeliveryFactors || '|' LIKE '%|${aDeliveryFactorIDs[i]}|%'`;
        } else {
          sFactorsWhere += ` OR '|' || ItemDeliveryFactors || '|' LIKE '%|${aDeliveryFactorIDs[i]}|%'`;
        }
      }

      sWhere += ` AND (${sFactorsWhere})`;
    }

    let res = await RawQuery(`SELECT SUM(ItemPrice) AS Price, -1 AS DiscountedPrice, ItemPriceLabel from local_ct_deliverymatrix WHERE ${sWhere}`); //TODO
    console.log("res... ", res)
    if (res != "") {
      priceObj.shippingPrice = GetDecimal(res.item(0)["Price"]);
      priceObj.discountedPrice = GetDecimal(res.item(0)["DiscountedPrice"], -1);
      priceObj.itemPriceLabel = res.item(0)["ItemPriceLabel"];
    }
  }

  return priceObj;
}
