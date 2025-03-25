import openDatabaseService from "../../Config";
import { executeSqlAsync } from "../../SQLiteAsync";
import { GetBoolean, GetDecimal, GetInteger, RoundDecimal } from "../../../utils/ValidationHelper";
import { store } from "../../../../configureStore";

export async function CProc_INT_GetPrice_V2(Items, Input_Cu_Code, Input_DatasetID, Input_ShopID, Input_CountryID, disableStdDiscount = 1, overrideDiscount = null, discountObject = [], PreSeason = 0) {
  let resDataObj = {};

  const db = openDatabaseService();

  let tmpDataObj = {};
  let stkCodes = [];

  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;


  for (let i = 0; i < Items.length; i++) {
    let Input_Stk_Code = Items[i].skuNumber;
    let Input_Qty = Items[i].quantity;
    let Input_Priceline = Items[i].priceLine.toString();
    let Input_QuotePrice = GetDecimal(Items[i].cartItemQuoteYourPrice);

    if (discountObject && discountObject.length > 0) {
      let disElement = discountObject.find(ob => ob.skuNumber == Input_Stk_Code && ob.priceLine == Input_Priceline);
      if (disElement) {
        Input_QuotePrice = GetDecimal(disElement.quotedPrice);
      }
    }

    if (!stkCodes.includes(Input_Stk_Code)) {
      stkCodes.push(Input_Stk_Code);
    }

    if (tmpDataObj[Input_Stk_Code] == undefined) {
      tmpDataObj[Input_Stk_Code] = {};
    }
    if (tmpDataObj[Input_Stk_Code][Input_Priceline] == undefined) {
      tmpDataObj[Input_Stk_Code][Input_Priceline] = {};
    }

    tmpDataObj[Input_Stk_Code][Input_Priceline] = {
      Input_Stk_Code: Input_Stk_Code,
      Input_Qty: Input_Qty,
      Input_Priceline: Input_Priceline,
      Input_QuotePrice: Input_QuotePrice,

      RetPrice: 0,
      StkDiscGroup: "",
      STDPrice: 0,
      WASPrice: 0,
      SANALYSIS: "",
      Stax_Code: "",
      Stax_Rate: 0
    };

  }

  let Cu_Taxable = null;
  let IsAccount = false;
  let AccDiscGroup1 = 0;
  let AccDiscGroup2 = 0;
  let AccDiscGroup3 = 0;
  let AccDiscGroup4 = 0;
  let Input_CountryIDOUT = 0;
  let IsTaxableCountry = false;

  try {
    let res1 = await CProc_INT_GetCustomerHeaderInfo_V2(Input_DatasetID, Input_Cu_Code);
    if (res1 != null) {
      Cu_Taxable = GetBoolean(res1.Cu_Taxable);
      AccDiscGroup1 = GetDecimal(res1.AccDiscGroup1);
      AccDiscGroup2 = GetDecimal(res1.AccDiscGroup2);
      AccDiscGroup3 = GetDecimal(res1.AccDiscGroup3);
      AccDiscGroup4 = GetDecimal(res1.AccDiscGroup4);
    }
  } catch (e) {
    console.log(e);
  }

  if (Cu_Taxable == null) {
    IsAccount = false;
    Cu_Taxable = true;
  } else {
    IsAccount = true;
  }

  if (GetInteger(Input_CountryID) > 0) {
    try {
      let res2 = await executeSqlAsync(db, `SELECT CountryID FROM local_cms_country T1 INNER JOIN local_ct_countrygroup T2 ON T1.countrygroupid = T2.ItemID WHERE (T2.ItemName = 'DEFAULT') AND T1.CountryID = ${Input_CountryID}`, []);
      if (res2.rows.length > 0) {
        Input_CountryIDOUT = GetInteger(res2.rows.item(0).CountryID);
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (Input_CountryIDOUT > 0) {
    IsTaxableCountry = true;
  } else {
    Cu_Taxable = false;
    IsTaxableCountry = false;
  }

  try {
    let res3 = await executeSqlAsync(db, `SELECT SKUNumber,
      (CASE
      WHEN ${PreSeason} = 1 THEN SKUPricePreSeason
      WHEN ${PreSeason} = 0 THEN SKUPrice
      ELSE  0 END) AS SKUPrice,
      SkuDiscountCat, SKUPrice2, SKUPrice3,
      SKUPrice4, SKUPrice5, SKUPrice6, SKUPrice7, SKUPrice8, SKUPrice9, SKUPrice10, SKUPricePreSeason
      FROM local_com_sku WHERE SKUNumber IN (${(stkCodes.map(sku => `'${sku}'`).join(", "))})`, []);
    if (res3.rows.length > 0) {
      for (let i = 0; i < res3.rows.length; i++) {

        let skuNo = res3.rows.item(i).SKUNumber;

        for (let priceLine in tmpDataObj[skuNo]) {

          let item = tmpDataObj[skuNo][priceLine];

          console.log(res3.rows.item(i));

            item.RetPrice = GetDecimal(res3.rows.item(i).SKUPrice);


          item.StkDiscGroup = res3.rows.item(i).SkuDiscountCat;
          switch (priceLine) {
            case "1":

                item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice);


              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice);
              break;
            case "2":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice2);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice2);
              break;
            case "3":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice3);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice3);
              break;
            case "4":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice4);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice4);
              break;
            case "5":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice5);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice5);
              break;
            case "6":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice6);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice6);
              break;
            case "7":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice7);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice7);
              break;
            case "8":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice8);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice8);
              break;
            case "9":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice9);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice9);
              break;
            case "10":
              item.STDPrice = GetDecimal(res3.rows.item(i).SKUPrice10);
              item.WASPrice = GetDecimal(res3.rows.item(i).SKUPrice10);
              break;
          }

        }

      }
    }
  } catch (e) {
    console.log(e);
  }

  try {
    let res4 = await CProc_INT_GetTaxAndAnalysisForGetPrice_V2(Input_Cu_Code, stkCodes, Input_DatasetID);
    if (res4.length > 0) {
      for (let i = 0; i < res4.length; i++) {
        let data = res4[i];

        for (let priceLine in tmpDataObj[data.SKUNumber]) {
          let item = tmpDataObj[data.SKUNumber][priceLine];

          item.SANALYSIS = data.SANALYSIS;
          item.Stax_Code = data.Stax_Code;
          item.Stax_Rate = GetDecimal(data.Stax_Rate);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  for (let skuNo in tmpDataObj) {
    for (let priceLine in tmpDataObj[skuNo]) {

      let Cu_Line_Disc = 0;
      let UnitPriceIncTax = 0;
      let RetPriceIncTax = 0;
      let STDPriceIncTax = 0;
      let WASPriceIncTax = 0;
      let UnitPriceNetofDiscountIncTax = 0;
      let LinePriceNetofDiscountIncTax = 0;
      let Item_DDiscountRateToP = 0;
      let GPandO_PPMV = 0;
      let GPandO_DPMV = 0;
      let Item_DDiscountRate = 0;
      let Item_PDiscountRateToUnit = 0;
      let Item_PDiscountRate = 0;
      let LinePrice = 0;
      let Item_LandCLDiscountRate = 0;
      let Item_LDiscountRate = 0;
      let Item_LandCLDiscountRateToValue = 0;
      let Item_TotalDiscountRate = 0;
      let Item_TotalDiscountRateToValue = 0;
      let Item_DDiscountRateIncTax = 0;
      let Item_PDiscountRateToUnitIncTax = 0;
      let LinePriceIncTax = 0;
      let Item_LandCLDiscountRateToValueIncTax = 0;
      let Item_TotalDiscountRateToValueIncTax = 0;
      let UnitDiscount = 0;
      let UnitDiscountIncTax = 0;
      let LineTaxValue = 0;
      let LineTaxValueNetofDiscount = 0;
      let UnitTaxValue = 0;
      let UnitTaxValueNetofDiscount = 0;
      let IsProduct = false;
      let QuotePriceIncTax = 0;
      let QuoteTaxValue = 0;

      let item = tmpDataObj[skuNo][priceLine];

      let UnitPrice = item.STDPrice;

      if (((item.StkDiscGroup || '') !== '') && (disableStdDiscount || 0 || null) == 0 || (overrideDiscount != null)) {
        if (item.StkDiscGroup === 'A') {
          Cu_Line_Disc = AccDiscGroup1;
        }
        if (item.StkDiscGroup === 'B') {
          Cu_Line_Disc = AccDiscGroup2;
        }
        if (item.StkDiscGroup === 'C') {
          Cu_Line_Disc = AccDiscGroup3;
        }
        if (item.StkDiscGroup === 'D') {
          Cu_Line_Disc = AccDiscGroup4;
        }

        if (overrideDiscount != null) {
          if (disableStdDiscount == 0) {

            Cu_Line_Disc = overrideDiscount;

          }
        }
      }

      let UnitPriceNetofDiscount = UnitPrice * (1 - (Cu_Line_Disc / 100));
      let LinePriceNetofDiscount = UnitPriceNetofDiscount * item.Input_Qty;

      if (Cu_Taxable) {
        UnitPriceIncTax = UnitPrice * (1 + item.Stax_Rate / 100.0000);
        RetPriceIncTax = item.RetPrice * (1 + item.Stax_Rate / 100.0000);
        STDPriceIncTax = item.STDPrice * (1 + item.Stax_Rate / 100.0000);
        WASPriceIncTax = item.WASPrice * (1 + item.Stax_Rate / 100.0000);
        UnitPriceNetofDiscountIncTax = UnitPriceNetofDiscount * (1 + item.Stax_Rate / 100.0000);
        LinePriceNetofDiscountIncTax = LinePriceNetofDiscount * (1 + item.Stax_Rate / 100.0000);
        QuotePriceIncTax = item.Input_QuotePrice * (1 + item.Stax_Rate / 100.0000);
      } else {
        UnitPriceIncTax = UnitPrice;
        RetPriceIncTax = item.RetPrice;
        STDPriceIncTax = item.STDPrice;
        WASPriceIncTax = item.WASPrice;
        UnitPriceNetofDiscountIncTax = UnitPriceNetofDiscount;
        LinePriceNetofDiscountIncTax = LinePriceNetofDiscount;
        QuotePriceIncTax = item.Input_QuotePrice;
      }

      let ItemVatCode = item.Stax_Code;
      let ItemVatRate = item.Stax_Rate;
      let Item_PDiscount = GPandO_PPMV;
      let Item_DDiscount = GPandO_DPMV;
      let Item_LDiscount = Cu_Line_Disc;

      if (UnitPrice > 0) {
        Item_DDiscountRateToP = 100 * Item_DDiscountRate / UnitPrice;
      } else {
        Item_DDiscountRateToP = 0;
      }

      Item_PDiscountRateToUnit = UnitPrice * (Item_PDiscountRate / 100);
      LinePrice = item.Input_Qty * UnitPriceNetofDiscount;
      Item_LandCLDiscountRate = Item_LDiscountRate + Cu_Line_Disc;
      Item_LandCLDiscountRateToValue = (item.Input_Qty * UnitPriceNetofDiscount) * (Item_LDiscountRate + Cu_Line_Disc) / 100;
      Item_TotalDiscountRate = Item_LDiscountRate + Cu_Line_Disc + Item_PDiscountRate + Item_DDiscountRateToP;
      Item_TotalDiscountRateToValue = item.Input_Qty * UnitPriceNetofDiscount * ((Item_PDiscountRate + Item_LDiscountRate + Cu_Line_Disc) / 100) + item.Input_Qty * Item_DDiscountRate;

      if (Cu_Taxable) {
        Item_DDiscountRateIncTax = Item_DDiscountRate * (1 + ItemVatRate / 100);
        Item_PDiscountRateToUnitIncTax = UnitPrice * (Item_PDiscountRate / 100) * (1 + ItemVatRate / 100);
        LinePriceIncTax = item.Input_Qty * UnitPriceNetofDiscount * (1 + ItemVatRate / 100);
        Item_LandCLDiscountRateToValueIncTax = (item.Input_Qty * UnitPriceNetofDiscount) * (Item_LDiscountRate + Cu_Line_Disc) / 100 * (1 + ItemVatRate / 100);
        Item_TotalDiscountRateToValueIncTax = (Item_TotalDiscountRateToValue) * (1 + ItemVatRate / 100);
      } else {
        Item_DDiscountRateIncTax = Item_DDiscountRate;
        Item_PDiscountRateToUnitIncTax = UnitPrice * (Item_PDiscountRate / 100);
        LinePriceIncTax = item.Input_Qty * UnitPriceNetofDiscount;
        Item_LandCLDiscountRateToValueIncTax = (item.Input_Qty * UnitPriceNetofDiscount) * (Item_LDiscountRate + Cu_Line_Disc) / 100;
        Item_TotalDiscountRateToValueIncTax = (Item_TotalDiscountRateToValue);
      }

      UnitDiscount = Item_TotalDiscountRateToValue / item.Input_Qty;
      UnitDiscountIncTax = Item_TotalDiscountRateToValueIncTax / item.Input_Qty;
      LineTaxValue = LinePriceIncTax - LinePrice;
      LineTaxValueNetofDiscount = LinePriceNetofDiscountIncTax - LinePriceNetofDiscount;
      UnitTaxValue = LineTaxValue / item.Input_Qty;
      UnitTaxValueNetofDiscount = LineTaxValueNetofDiscount / item.Input_Qty;
      QuoteTaxValue = QuotePriceIncTax - item.Input_QuotePrice;

      IsProduct = UnitPrice > 0;

      resDataObj[skuNo + "_" + priceLine] = {
        Cu_Code: Input_Cu_Code,
        Stk_Code: item.Input_Stk_Code,
        Qty: item.Input_Qty,
        DatasetID: Input_DatasetID,
        ShopID: Input_ShopID,
        RetPrice: GetDecimal(item.RetPrice),
        RetPriceIncTax: GetDecimal(RetPriceIncTax),
        Input_CountryID: Input_CountryID,
        StdPrice: GetDecimal(item.STDPrice),
        StdPriceIncTax: GetDecimal(STDPriceIncTax),
        WasPrice: GetDecimal(item.WASPrice),
        WasPriceIncTax: GetDecimal(WASPriceIncTax),
        UnitPrice: GetDecimal(UnitPrice),
        UnitPriceIncTax: GetDecimal(UnitPriceIncTax),
        UnitPriceNetOfDiscount: GetDecimal(RoundDecimal(UnitPriceNetofDiscount)),
        UnitPriceNetOfDiscountIncTax: GetDecimal(RoundDecimal(UnitPriceNetofDiscountIncTax)),
        LinePriceNetOfDiscount: GetDecimal(RoundDecimal(LinePriceNetofDiscount)),
        LinePriceNetOfDiscountIncTax: GetDecimal(RoundDecimal(LinePriceNetofDiscountIncTax)),
        ItemVatCode: ItemVatCode,
        ItemVatRate: GetDecimal(ItemVatRate),
        Item_PDiscount: GetDecimal(Item_PDiscount),
        Item_PDiscountRate: GetDecimal(Item_PDiscountRate),
        Item_DDiscount: GetDecimal(Item_DDiscount),
        Item_DDiscountRate: GetDecimal(Item_DDiscountRate),
        Item_LDiscount: GetDecimal(Item_LDiscount),
        Item_LDiscountRate: GetDecimal(Item_LDiscountRate),
        Cu_LDiscountRate: GetDecimal(Cu_Line_Disc),
        Item_DDiscountRateIncTax: GetDecimal(Item_DDiscountRateIncTax),
        Item_DDiscountRateToP: GetDecimal(Item_DDiscountRateToP),
        Item_PDiscountRateToUnit: GetDecimal(Item_PDiscountRateToUnit),
        Item_PDiscountRateToUnitIncTax: GetDecimal(Item_PDiscountRateToUnitIncTax),
        LinePrice: LinePrice,
        LinePriceIncTax: LinePriceIncTax,
        Item_LandCLDiscountRate: GetDecimal(Item_LandCLDiscountRate),
        Item_LandCLDiscountRateToValue: GetDecimal(Item_LandCLDiscountRateToValue),
        Item_LandCLDiscountRateToValueIncTax: GetDecimal(Item_LandCLDiscountRateToValueIncTax),
        UnitDiscount: GetDecimal(UnitDiscount),
        UnitDiscountIncTax: GetDecimal(UnitDiscountIncTax),
        Item_TotalDiscountRate: GetDecimal(Item_TotalDiscountRate),
        Item_TotalDiscountRateToValue: GetDecimal(Item_TotalDiscountRateToValue),
        Item_TotalDiscountRateToValueIncTax: GetDecimal(Item_TotalDiscountRateToValueIncTax),
        LineTaxValue: GetDecimal(RoundDecimal(LineTaxValue)),
        LineTaxValueNetofDiscount: GetDecimal(RoundDecimal(LineTaxValueNetofDiscount)),
        UnitTaxValue: GetDecimal(UnitTaxValue),
        UnitTaxValueNetofDiscount: GetDecimal(UnitTaxValueNetofDiscount),
        IsProduct: IsProduct,
        IsAccount: IsAccount,
        Cu_Taxable: Cu_Taxable,
        IsTaxableCountry: IsTaxableCountry,
        QuotePrice: item.Input_QuotePrice,
        QuotePriceIncTax: QuotePriceIncTax,
        QuoteTaxValue: QuoteTaxValue
      };

    }
  }

  return resDataObj;
}

export async function CProc_INT_GetCustomerHeaderInfo_V2(DatasetID, Cu_Code) {
  let resData = null;

  const db = openDatabaseService();

  let res = await executeSqlAsync(db, `SELECT (CASE WHEN COALESCE(ItemTaxCode,'') = '' THEN 'True' WHEN COALESCE(stax_rate,0)>0 THEN 'True' ELSE 'False' END) AS Cu_Taxable, COALESCE(ItemTaxCode,'') AS Cu_Tax_Code, COALESCE(stax_rate,0) AS Stax_Rate, 'GBP' AS Cu_CurrencyCode, ItemDiscGroup1 AS AccDiscGroup1, ItemDiscGroup2 AS AccDiscGroup2, ItemDiscGroup3 AS AccDiscGroup3, ItemDiscGroup4 AS AccDiscGroup4 FROM local_ct_tradeaccount LEFT OUTER JOIN local_int_salestax ON ItemTaxCode = stax_code and ItemDataSetID = stax_DataSetID WHERE ItemDataSetID = ${DatasetID} and ItemCode = '${Cu_Code}'`, []);
  if (res.rows.length > 0) {
    let item = res.rows.item(0);
    resData = {
      Cu_Taxable: item.Cu_Taxable,
      Cu_Tax_Code: item.Cu_Tax_Code,
      Stax_Rate: item.Stax_Rate,
      Cu_CurrencyCode: item.Cu_CurrencyCode,
      AccDiscGroup1: item.AccDiscGroup1,
      AccDiscGroup2: item.AccDiscGroup2,
      AccDiscGroup3: item.AccDiscGroup3,
      AccDiscGroup4: item.AccDiscGroup4
    }
  }

  return resData;
}

export async function CProc_INT_GetTaxAndAnalysisForGetPrice_V2(GTandA_AccountCode, GTandA_ItemCodeIDs, GTandA_DatasetID) {
  let resData = [];

  const db = openDatabaseService();

  let res = await executeSqlAsync(db, `SELECT Distinct local_com_sku.SKUAnalysis AS SANALYSIS, local_int_salestax.stax_Code AS Stax_Code, local_int_salestax.stax_Rate AS Stax_Rate, local_com_sku.SKUNumber AS SKUNumber FROM (local_com_sku INNER JOIN local_int_analysis ON local_com_sku.SKUAnalysis = local_int_analysis.Ana_Code) INNER JOIN local_int_salestax ON local_int_analysis.Ana_VatCode = local_int_salestax.stax_Code WHERE local_com_sku.SKUNumber IN (${(GTandA_ItemCodeIDs.map(sku => `'${sku}'`).join(", "))}) and local_com_sku.SKUDataSetID = ${GTandA_DatasetID}`, []);
  if (res.rows.length > 0) {
    for (let i = 0; i < res.rows.length; i++) {
      let item = res.rows.item(i);

      resData.push({
        SKUNumber: item.SKUNumber,
        SANALYSIS: item.SANALYSIS,
        Stax_Code: item.Stax_Code,
        Stax_Rate: item.Stax_Rate
      });
    }
  }

  return resData;
}
