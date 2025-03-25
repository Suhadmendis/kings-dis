import openDatabaseService from "../../Config";
import {CFunc_INT_GetYourPrice} from "./Func";
import {executeSqlAsync} from "../../SQLiteAsync";
import { connect, useDispatch, useSelector } from "react-redux";

import createTable from "../../storeData/createTable";
import totalSync from "../../storeData/dataProvider";
import insertData from "../../storeData/insertData";

import {GetBoolean, GetDecimal, GetInteger, RoundDecimal} from "../../../utils/ValidationHelper";
import { store } from "../../../../configureStore";


export async function CProc_WEB_GetProductsForListV1_WithPrice(AccNo, PageSize = 24, PageNo = 1, Where = "", OrderBy = "", Input_CountryID = 0, PreSeason = 0) {
  let resData = [];


  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

  if (Where == "") {
    Where = "1=1"
  }


  if (PreSeason == 1) {
    Where += " and SKUPreSeason = 1 ";
  } else {
    Where += " and COALESCE(SKUPreSeasonOnly, null, 0) = 0";
  }


  if (OrderBy == "") {
    OrderBy = "local_com_sku.SKUNumber"
  }




  const db = openDatabaseService();

  let res = await executeSqlAsync(db, `SELECT (CASE
                                                   WHEN ${PageSize} = 0 THEN 1
                                                   WHEN ((RowNo / ${PageSize} = 0) and (RowNo% ${PageSize} > 0)) THEN 1
                                                   WHEN ((RowNo / ${PageSize} = 1) and (RowNo% ${PageSize} = 0)) THEN 1
                                                   WHEN ((RowNo / ${PageSize} > 0) and (RowNo% ${PageSize} > 0))
                                                       THEN (RowNo / ${PageSize}) + 1
                                                   WHEN ((RowNo / ${PageSize} > 0) and (RowNo %${PageSize} = 0))
                                                       THEN (RowNo / ${PageSize}) END)         AS PageNo,
                                              (CASE
                                                   WHEN ${PageSize} = 0 THEN 1
                                                   WHEN ((TotalRows / ${PageSize} = 0) and (TotalRows%${PageSize} > 0))
                                                       THEN 1
                                                   WHEN ((TotalRows / ${PageSize} = 1) and (TotalRows%${PageSize} = 0))
                                                       THEN 1
                                                   WHEN ((TotalRows / ${PageSize} > 0) and (TotalRows%${PageSize} > 0))
                                                       THEN (TotalRows / ${PageSize}) + 1 END) AS TotalPages,
                                              *
                                       FROM (SELECT Row_Number()                    OVER (ORDER BY ${OrderBy}) as RowNo, COUNT(*) OVER () as TotalRows, local_com_sku.SKUID,
                                                    local_com_sku.SKUNumber,
                                                    local_com_sku.SKUName,
                                                    local_com_sku.SKUPackSize,
                                                    local_com_sku.SKUName        AS ItemName,
                                                    local_com_sku.SKUNumber      AS ItemCode,
                                                    local_com_sku.SkuDiscountCat AS ItemCatCode,
                                                    local_com_sku.SKUPrice       AS ItemPrice,
                                                    local_com_sku.SKUPrice,
                                                    local_com_sku.SKUWeight,
                                                    Nav_ItemAttribute1           AS ItemAttribute1,
                                                    Nav_ItemAttribute2           AS ItemAttribute2,
                                                    Nav_ItemAttribute3           AS ItemAttribute3,
                                                    Nav_ItemAttribute4           AS ItemAttribute4,
                                                    Nav_ItemAttribute5           AS ItemAttribute5,
                                                    Nav_ItemAttribute6           AS ItemAttribute6,
                                                    Nav_ItemAttribute7           AS ItemAttribute7,
                                                    Nav_ItemAttribute8           AS ItemAttribute8,
                                                    Nav_ItemAttribute9           AS ItemAttribute9,
                                                    Nav_ItemAttribute10          AS ItemAttribute10,
                                                    Nav_ItemAttribute11          AS ItemAttribute11,
                                                    Nav_ItemAttribute12          AS ItemAttribute12,
                                                    Nav_ItemAttribute13          AS ItemAttribute13,
                                                    Nav_ItemAttribute14          AS ItemAttribute14,
                                                    Nav_ItemAttribute15          AS ItemAttribute15,
                                                    Nav_RangeDataHeadings        AS ItemDataHeadings,
                                                    Nav_ItemData1                AS ItemData1,
                                                    Nav_ItemData2                AS ItemData2,
                                                    Nav_ItemData3                AS ItemData3,
                                                    Nav_ItemData4                AS ItemData4,
                                                    Nav_ItemData5                AS ItemData5,
                                                    Nav_ItemData6                AS ItemData6,
                                                    Nav_ItemData7                AS ItemData7,
                                                    Nav_ItemData8                AS ItemData8,
                                                    Nav_ItemData9                AS ItemData9,
                                                    Nav_ItemData10               AS ItemData10,
                                                    local_com_sku.SKUImageLocation,
                                                    local_com_sku.SKUShortDescription,
                                                    local_com_sku.SKUAvailableItems,
                                                    local_com_sku.SKUBarCode,
                                                    local_com_sku.SKUCatNumber
                                             FROM local_int_navigation AS ct
                                                      LEFT OUTER JOIN local_com_sku ON ct.Nav_SKUID = local_com_sku.SKUID
                                             WHERE COALESCE(local_com_sku.SKUNumber, '') <> ''
                                               AND ${Where}) x
                                       WHERE ${PageNo} = CASE
                                                             WHEN ${PageSize} = 0 THEN 1
                                                             WHEN ((RowNo / ${PageSize} = 0) and (RowNo%${PageSize}>0))
                                                                 THEN 1
                                                             WHEN ((RowNo / ${PageSize} = 1) and (RowNo%${PageSize}= 0))
                                                                 THEN 1
                                                             WHEN ((RowNo / ${PageSize} > 0) and (RowNo%${PageSize}> 0))
                                                                 THEN (RowNo / ${PageSize}) + 1
                                                             WHEN ((RowNo / ${PageSize} > 0) and (RowNo%${PageSize} = 0))
                                                                 THEN (RowNo / ${PageSize}) END`, []);
  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      try {
        let data = await CFunc_INT_GetYourPrice(AccNo, res.rows.item(index).SKUNumber, 1, 1, 1, Input_CountryID, PreSeason);
        if (data != null) {
          let tmpObj = {
            ...res.rows.item(index),
            ...data
          };
          resData.push(tmpObj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;
}


export async function CProc_API_GetTradeAccountsStoreAddresses(UserID = 0, Offset = 0, Pagesize = 0, SearchTerm = '', Where = '', Orderby = '', SiteId = 1) {
  let resData = [];
  const db = openDatabaseService();

  let query = `SELECT local_ct_tradeaccount.ItemID AS TradeAccountID, local_ct_tradeaccount.ItemName AS TradeAccountName,
  local_ct_tradeaccount.ItemCode AS AccCode, local_ct_tradeaccount.ItemOnStop AS AccOnStop, local_com_customer.CustomerID AS AdminCustomerID, local_com_customer.CustomerFirstName AS
  AdminCustomerFirstName, local_com_customer.CustomerLastName AS AdminCustomerLastName, local_com_customer.CustomerEmail AS AdminCustomerEmail,
  local_com_customer.CustomerPhone AS AdminCustomerPhone, local_com_address.AddressID AS AddressID, local_com_address.AddressCustomerID AS AddressCustomerID,
  local_com_address.AddressPersonalName AS AddressPersonalName, local_com_address.AddressLine1 AS AddressLine1, local_com_address.AddressLine2 AS AddressLine2,
  local_com_address.AddressLine3 AS AddressLine3, local_com_address.AddressLine4 AS AddressLine4, local_com_address.AddressCity AS AddressCity, local_com_address.AddressZip AS
  AddressZip, local_cms_country.CountryDisplayName AS AddressCountry, local_com_address.AddressPhone AS AddressPhone, local_com_address.AddressIsBilling AS AddressIsBilling,
  local_com_address.AddressIsShipping AS AddressIsShipping FROM local_com_address`;

  query += ` INNER JOIN local_ct_tradeaccount ON local_com_address.AddressAccCode=local_ct_tradeaccount.ItemCode`;

  query += ` INNER JOIN local_ct_tradeaccountcustomer ON local_ct_tradeaccount.ItemID=local_ct_tradeaccountcustomer.TradeAccID`;

  if (UserID > 0) {
    query += ` INNER JOIN CView_SalesRepToCustomer ON local_ct_tradeaccount.ItemCode=CView_SalesRepToCustomer.TradeAccID`;
  }

  query += ` INNER JOIN local_com_customer ON local_ct_tradeaccountcustomer.CustomerID=local_com_customer.CustomerID`;

  query += ` INNER JOIN local_cms_country ON local_com_address.AddressCountryID=local_cms_country.CountryID`;

  query += ` WHERE local_com_address.AddressEnabled=1 AND local_ct_tradeaccount.ItemEnabled=1 AND (local_ct_tradeaccount.ItemSiteID='${SiteId}' OR local_ct_tradeaccount.ItemSiteID IS NULL) AND local_ct_tradeaccountcustomer.ItemIsAdmin=1`;

  if (UserID > 0) {
    query += ` AND CView_SalesRepToCustomer.SalesRepUserID='${UserID}'`;
  }

  if (SearchTerm != '') {
    query += ` AND (local_ct_tradeaccount.ItemCode LIKE '%${SearchTerm}%' OR local_ct_tradeaccount.ItemName LIKE '%${SearchTerm}%' OR
    local_com_address.AddressPersonalName LIKE '%${SearchTerm}%' OR local_com_address.AddressLine1 LIKE '%${SearchTerm}%' OR local_com_address.AddressLine2 LIKE '%${SearchTerm}%' OR local_com_address.AddressZip LIKE '%${SearchTerm}%' OR
    local_com_customer.CustomerFirstName LIKE '%${SearchTerm}%' OR local_com_customer.CustomerLastName LIKE '%${SearchTerm}%' OR local_com_customer.CustomerEmail LIKE '%${SearchTerm}%' OR local_com_customer.CustomerPhone LIKE '%${SearchTerm}%') `;
  }

  if (Where != '') {
    query += ` AND ${Where}`;
  }

  if (Orderby != '') {
    query += ` ORDER BY ${Orderby}`;
  } else {
    query += ` ORDER BY local_ct_tradeaccount.ItemName, local_com_address.AddressName`;
  }

  if (Pagesize > 0) {
    query += ` LIMIT ${Pagesize}`;
  } else {
    query += ` LIMIT -1`;
  }

  if (Offset > 0) {
    query += ` OFFSET ${Offset}`;
  }

  let res = await executeSqlAsync(db, query, []);

  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      resData.push(res.rows.item(index));
    }
  }

  return resData;
}


// @CodeTerm AS NVARCHAR(MAX), --searchterm
// 	@TextTerm AS NVARCHAR(MAX), --searchterm
// 	@UserPricingEnabled AS INT = 0, --pass 1
// 	@AccNo AS NVARCHAR(10) = '',
// 	@CultureID AS INT = 0, --unwanted
// 	@MaxRows AS NVARCHAR(MAX)='8',
// 	@Where AS NVARCHAR(MAX), --empty str
// 	@OrderBy AS NVARCHAR(MAX),--empty str
// 	@Input_CountryID int = 0,
// 	@IsBarcode AS INT = 0




export async function CProc_WEB_GetProductsForSearchForAutoCompleteV1(
  CodeTerm,
  TextTerm,
  IsBarcode,
  AccNo,
  Where = "",
  MaxRows = 0,
  OrderBy = "",
  Input_CountryID = 0,
  UserPricingEnabled = false,
  PreSeason = 0
) {
  let resData = [];
  let sp_query = "";

  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

console.log('CProc_WEB_GetProductsForSearchForAutoCompleteV');
console.log(PreSeason);




  const db = openDatabaseService();

  sp_query = `SELECT (CASE
                WHEN SKUNumber='${CodeTerm}' THEN 1 ELSE 2 END) AS ExactRank,
              (CASE
                WHEN INSTR(lower(SKUNumber), lower('${CodeTerm}')) = 1 THEN 1 ELSE 2 END) AS CodeRank,
              (CASE
                WHEN INSTR(lower(SKUName), lower('${TextTerm}'))  = 1 THEN 1 ELSE 2 END) AS NameRank,
              SKUID, SKUName, SKUNumber, SKUPackSize, SKUInternalStatusID, SKUManufacturerID, SKUAvailableItems,
              Nav_Navigation, SKUInStoreFrom,
              SKUEnabled
              FROM local_int_navigation AS ct
              LEFT OUTER JOIN local_com_sku ON ct.Nav_SKUID = local_com_sku.SKUID
              WHERE `;

  if (IsBarcode == true) {
    sp_query =
      sp_query +
      ` COALESCE(SKUBarCode,'') <> '' AND SKUBarCode = '${CodeTerm}'`;
  } else {
    sp_query =
      sp_query +
      ` COALESCE(SKUNumber,'') <> '' AND
      (SKUNumber = '${CodeTerm}' OR
      REPLACE(SKUNumber, ' ', '') LIKE REPLACE('%' || '${CodeTerm}' || '%', ' ', '') OR
      (COALESCE(SKUBarCode,'') <> '' AND SKUBarCode = '${CodeTerm}') OR
      SKUNumber LIKE '%' || '${CodeTerm}' || '%' OR
      SKUNumber LIKE  '%' || '${TextTerm}' || '%' OR
      SKUName LIKE  '%' || '${CodeTerm}' || '%' OR
      SKUName LIKE  '%' || '${TextTerm}' || '%')`;
  }


  // if (PreSeason == 1) {
  //   Where += " SKUPreSeason = 1 ";
  // } else {
  //   Where += " coalesce(SKUPreSeasonOnly, null, 0) = 0";
  // }

  if (PreSeason == 1) {
    Where += " coalesce(SkuPreSeason, null, 0) = 1 ";
  } else {
    Where += " coalesce(SKUPreSeasonOnly, null, 0) = 0";
  }

  if (Where != '') {
    sp_query += ` AND ${Where}`;
  }

  if (OrderBy != '') {
    sp_query += ` ORDER BY ${OrderBy}`;
  } else {
    sp_query += ` ORDER BY ExactRank,CodeRank,NameRank`;
  }

  console.log('--------------------------------hgjksah--------------------------------');
  console.log(sp_query);

  if (MaxRows > 0) {
    sp_query += ` LIMIT ${MaxRows}`;
  }

  // if(TextTerm.indexOf(' ') == 0){
  //   sp_query = sp_query + `OR CONTAINS(SKUName, 'FORMSOF(INFLECTIONAL, '${TextTerm}')') OR CONTAINS(SKUNumber, 'FORMSOF(INFLECTIONAL, '${TextTerm}')'))`;
  // }
  // else{
  //   let replacedTxt = TextTerm.replace(' ', '* NEAR ');
  //   sp_query = sp_query +
	// 							`OR CONTAINS(SKUName, '${replacedTxt}')
	// 							OR CONTAINS(SKUNumber, '${replacedTxt}'))`;
  // }

  let res = await executeSqlAsync(db, sp_query, []);

  if (res.rows.length >= 0) {
    for (let index = 0; index < res.rows.length; index++) {
      try {
        let data = await CFunc_INT_GetYourPrice(
          AccNo,
          res.rows.item(index).SKUNumber,
          1,
          1,
          1,
          Input_CountryID,
          PreSeason
        );

        if (data != null) {
          let tmpObj = {
            ...res.rows.item(index),
            ...data,
          };

          resData.push(tmpObj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;
}


// @Lvl AS NVARCHAR(20),
// 	@Category AS  NVARCHAR(200) = '',
// 	@Offset AS NVARCHAR(20) = 0,
// 	@Pagesize AS NVARCHAR(20) = 0,
// 	@Orderby AS NVARCHAR(MAX) = '',
// 	@HideInNavigation AS NVARCHAR(1) = '',
// 	@SiteID AS NVARCHAR(20) = 1,
// 	@IncSubcat AS bit = 0

export async function CProc_API_GetNavByLvl(
  Lvl,
  Category,
  IncSubcat = false,
  HideInNavigation = "",
  Where = "",
  OrderBy = "",
  SiteID = 1
) {
let resData = [];

const db = openDatabaseService();

let sub_sp_query = `SELECT ItemID FROM local_int_navigation WHERE local_int_navigation.Nav_Navigation=local_int_nav_attributes.Nav_Path AND Nav_ShopID=${SiteID}`;

if (HideInNavigation !== "") {
  sub_sp_query += ` AND Nav_Suspend=${HideInNavigation}`;
}

let sp_query = `SELECT Nav_Path, MIN(CASE WHEN Nav_Suspend=1 THEN 1 ELSE 0 END) AS HideInNavigation FROM local_int_nav_attributes WHERE EXISTS(${sub_sp_query}) AND Nav_ShopID=${SiteID}`;

if (HideInNavigation !== "") {
  sp_query += ` AND Nav_Suspend=${HideInNavigation}`;
}

if (Category !== "") {
  sp_query += ` AND Nav_Path LIKE '${Category}/%'`;
}

if (Where !== "") {
  sp_query += ` AND ${Where}`;
}

sp_query += ` GROUP BY Nav_Path`;

if (OrderBy !== "") {
  sp_query += ` ORDER BY ${OrderBy}`;
} else {
  sp_query += ` ORDER BY Nav_Path`;
}

let res = await executeSqlAsync(db, sp_query, []);

if (res.rows.length > 0) {
  let tmpObj = {};

  for (let index = 0; index < res.rows.length; index++) {
    let splitNavPath = res.rows.item(index).Nav_Path.split("/");

    let catName = splitNavPath[Lvl - 1]
    let catPath = splitNavPath.slice(0, Lvl).join("/");
    let hideInNavigation = GetInteger(res.rows.item(index).HideInNavigation);
    let subcatName = null;
    let subcatPath = null;

    if (IncSubcat) {
      subcatName = splitNavPath[Lvl] ?? null;
      if (subcatName != null) {
        subcatPath = splitNavPath.slice(0, Lvl + 1).join("/");
      }
    }

    let objKey = catPath + "_" + subcatPath;
    if (tmpObj.hasOwnProperty(objKey)) {
      if (hideInNavigation === 0) {
        tmpObj[objKey].HideInNavigation = 0;
      }
    } else {
      tmpObj[objKey] = {
        Cat_Name: catName,
        Cat_Path: catPath,
        Subcat_Name: subcatName,
        Subcat_Path: subcatPath,
        HideInNavigation: hideInNavigation
      };
    }
  }

  Object.keys(tmpObj).forEach((key, index) => {
    resData.push(tmpObj[key]);
  });
}

return resData;
}



export async function initialTableInspection(token) {


  try {
    const db = openDatabaseService();
    let res2 = await executeSqlAsync(db, `SELECT * FROM sqlite_master`, []);


    if (res2.rows.length < 3) {
      const int_Navigation = await tableDataOperation(token, 'local_int_navigation', true);
      const int_Nav_Attributes = await tableDataOperation(token, 'local_int_nav_attributes', true); // done
    }


  } catch (e) {
    console.log(e);
  }



  return 'ok';
}



async function tableDataOperation(token, tableName, isInitial) {

  console.log(`${tableName} started`);
  let inspected;


  console.log(`${tableName} - Table doesn't Exist`);

  const created = await createTable(tableName);
  if(created[0].created == 1){
      console.log(`Table Created: ${tableName}`);

      let lastUpdate = null;

      const data = await totalSync(token, tableName, lastUpdate);
      console.log(`API Data - ${data.length}`);

      const dataAdded = await insertData(tableName, data, isInitial);
      console.log(dataAdded.length);

  }else{
      console.log(`Table Schema Not Found in Code: ${tableName}`);
  }

  console.log(`${tableName} ended`);
  return tableName;
}


export async function CProc_INT_GetPrice(Input_Cu_Code, Input_Stk_Code, Input_Qty, Input_DatasetID, Input_ShopID, Input_CountryID, Input_Priceline, Input_QuotePrice = 0, disableStdDiscount = 0, overwrite = null, PreSeason = null) {
  let resData = [];



  const db = openDatabaseService();

  let Cu_Taxable = null;
  let IsAccount = false;
  let AccDiscGroup1 = 0;
  let AccDiscGroup2 = 0;
  let AccDiscGroup3 = 0;
  let AccDiscGroup4 = 0;
  let Input_CountryIDOUT = 0;
  let IsTaxableCountry = false;
  let RetPrice = 0;
  let StkDiscGroup = "";
  let STDPrice = 0;
  let WASPrice = 0;
  let SANALYSIS = "";
  let Stax_Code = "";
  let Stax_Rate = 0;
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



  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

  try {
    let res1 = await CProc_INT_GetCustomerHeaderInfo(Input_DatasetID, Input_Cu_Code);
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
    if (Input_QuotePrice > 0) {
      let res3 = await executeSqlAsync(db, `SELECT SKUPrice FROM local_com_sku WHERE SKUnumber = '${Input_Stk_Code}'`, []);
      if (res3.rows.length > 0) {
        RetPrice = GetDecimal(res3.rows.item(0).SKUPrice);
        STDPrice = Input_QuotePrice;
      }
    }
    else {




      let res3 = await executeSqlAsync(db, `SELECT SKUPrice, SkuDiscountCat,

      (CASE
      WHEN ${PreSeason} = 1 THEN SKUPricePreSeason
      WHEN ${Input_Priceline} = 1 THEN SKUPrice
      WHEN ${Input_Priceline} = 2 then SKUPrice2
      WHEN ${Input_Priceline} = 3 then SKUPrice3
      WHEN ${Input_Priceline} = 4 then SKUPrice4
      WHEN ${Input_Priceline} = 5 then SKUPrice5
      WHEN ${Input_Priceline} = 6 then SKUPrice6
      WHEN ${Input_Priceline} = 7 then SKUPrice7
      WHEN ${Input_Priceline} = 8 then SKUPrice8
      WHEN ${Input_Priceline} = 9 then SKUPrice9
      WHEN ${Input_Priceline} = 10 then SKUPrice10
      ELSE  0 END) AS STDPrice, (CASE
      WHEN ${Input_Priceline} = 1 then SKUPrice
      WHEN ${Input_Priceline} = 2 then SKUPrice2
      WHEN ${Input_Priceline} = 3 then SKUPrice3
      WHEN ${Input_Priceline} = 4 then SKUPrice4
      WHEN ${Input_Priceline} = 5 then SKUPrice5
      WHEN ${Input_Priceline} = 6 then SKUPrice6
      WHEN ${Input_Priceline} = 7 then SKUPrice7
      WHEN ${Input_Priceline} = 8 then SKUPrice8
      WHEN ${Input_Priceline} = 9 then SKUPrice9
      WHEN ${Input_Priceline} = 10 then SKUPrice10
      ELSE  0 END) AS WASPrice FROM local_com_sku WHERE SKUNumber = '${Input_Stk_Code}'`, []);

      if (res3.rows.length > 0) {
        console.log(res3.rows.item(0));
        RetPrice = GetDecimal(res3.rows.item(0).SKUPrice);
        StkDiscGroup = res3.rows.item(0).SkuDiscountCat;
        STDPrice = GetDecimal(res3.rows.item(0).STDPrice);
        WASPrice = GetDecimal(res3.rows.item(0).WASPrice);
        console.log('================================', Input_Stk_Code);
        console.log(STDPrice);
      }
    }
  } catch (e) {
    console.log(e);
  }

  console.log('Country==================c==========================');
  try {

    let s_time = new Date().getTime();

    let res4 = await CProc_INT_GetTaxAndAnalysisForGetPrice(Input_Cu_Code, Input_Stk_Code, Input_DatasetID);

    let diff = new Date().getTime() - s_time;

    console.log('diff', diff/1000);


    if (res4 != null) {
      SANALYSIS = res4.SANALYSIS;
      Stax_Code = res4.Stax_Code;
      Stax_Rate = GetDecimal(res4.Stax_Rate);
    }
  } catch (e) {
    console.log(e);
  }

  let UnitPrice = STDPrice;



  if (((StkDiscGroup || '') !== '') && (disableStdDiscount || null || 0) == 0 || (overwrite != null)) {



    if (StkDiscGroup === 'A') {
      Cu_Line_Disc = AccDiscGroup1;
    }
    if (StkDiscGroup === 'B') {
      Cu_Line_Disc = AccDiscGroup2;
    }
    if (StkDiscGroup === 'C') {
      Cu_Line_Disc = AccDiscGroup3;
    }
    if (StkDiscGroup === 'D') {
      Cu_Line_Disc = AccDiscGroup4;
    }

    if (overwrite != null) {
      if (disableStdDiscount == 0) {


        Cu_Line_Disc = overwrite;


      }

    }


  }





  let UnitPriceNetofDiscount = UnitPrice * (1 - (Cu_Line_Disc / 100));
  let LinePriceNetofDiscount = UnitPriceNetofDiscount * Input_Qty;

  if (Cu_Taxable) {
    UnitPriceIncTax = UnitPrice * (1 + Stax_Rate / 100.0000);
    RetPriceIncTax = RetPrice * (1 + Stax_Rate / 100.0000);
    STDPriceIncTax = STDPrice * (1 + Stax_Rate / 100.0000);
    WASPriceIncTax = WASPrice * (1 + Stax_Rate / 100.0000);
    UnitPriceNetofDiscountIncTax = UnitPriceNetofDiscount * (1 + Stax_Rate / 100.0000);
    LinePriceNetofDiscountIncTax = LinePriceNetofDiscount * (1 + Stax_Rate / 100.0000);
  } else {
    UnitPriceIncTax = UnitPrice;
    RetPriceIncTax = RetPrice;
    STDPriceIncTax = STDPrice;
    WASPriceIncTax = WASPrice;
    UnitPriceNetofDiscountIncTax = UnitPriceNetofDiscount;
    LinePriceNetofDiscountIncTax = LinePriceNetofDiscount;
  }

  let ItemVatCode = Stax_Code;
  let ItemVatRate = Stax_Rate;
  let Item_PDiscount = GPandO_PPMV;
  let Item_DDiscount = GPandO_DPMV;
  let Item_LDiscount = Cu_Line_Disc;

  if (UnitPrice > 0) {
    Item_DDiscountRateToP = 100 * Item_DDiscountRate / UnitPrice;
  } else {
    Item_DDiscountRateToP = 0;
  }

  Item_PDiscountRateToUnit = UnitPrice * (Item_PDiscountRate / 100);
  LinePrice = Input_Qty * UnitPriceNetofDiscount;
  Item_LandCLDiscountRate = Item_LDiscountRate + Cu_Line_Disc;
  Item_LandCLDiscountRateToValue = (Input_Qty * UnitPriceNetofDiscount) * (Item_LDiscountRate + Cu_Line_Disc) / 100;
  Item_TotalDiscountRate = Item_LDiscountRate + Cu_Line_Disc + Item_PDiscountRate + Item_DDiscountRateToP;
  Item_TotalDiscountRateToValue = Input_Qty * UnitPriceNetofDiscount * ((Item_PDiscountRate + Item_LDiscountRate + Cu_Line_Disc) / 100) + Input_Qty * Item_DDiscountRate;

  if (Cu_Taxable) {
    Item_DDiscountRateIncTax = Item_DDiscountRate * (1 + ItemVatRate / 100);
    Item_PDiscountRateToUnitIncTax = UnitPrice * (Item_PDiscountRate / 100) * (1 + ItemVatRate / 100);
    LinePriceIncTax = Input_Qty * UnitPriceNetofDiscount * (1 + ItemVatRate / 100);
    Item_LandCLDiscountRateToValueIncTax = (Input_Qty * UnitPriceNetofDiscount) * (Item_LDiscountRate + Cu_Line_Disc) / 100 * (1 + ItemVatRate / 100);
    Item_TotalDiscountRateToValueIncTax = (Item_TotalDiscountRateToValue) * (1 + ItemVatRate / 100);
  } else {
    Item_DDiscountRateIncTax = Item_DDiscountRate;
    Item_PDiscountRateToUnitIncTax = UnitPrice * (Item_PDiscountRate / 100);
    LinePriceIncTax = Input_Qty * UnitPriceNetofDiscount;
    Item_LandCLDiscountRateToValueIncTax = (Input_Qty * UnitPriceNetofDiscount) * (Item_LDiscountRate + Cu_Line_Disc) / 100;
    Item_TotalDiscountRateToValueIncTax = (Item_TotalDiscountRateToValue);
  }

  UnitDiscount = Item_TotalDiscountRateToValue / Input_Qty;
  UnitDiscountIncTax = Item_TotalDiscountRateToValueIncTax / Input_Qty;
  LineTaxValue = LinePriceIncTax - LinePrice;
  LineTaxValueNetofDiscount = LinePriceNetofDiscountIncTax - LinePriceNetofDiscount;
  UnitTaxValue = LineTaxValue / Input_Qty;
  UnitTaxValueNetofDiscount = LineTaxValueNetofDiscount / Input_Qty;

  IsProduct = UnitPrice > 0;

  resData.push({
    Cu_Code: Input_Cu_Code,
    Stk_Code: Input_Stk_Code,
    Qty: Input_Qty,
    DatasetID: Input_DatasetID,
    ShopID: Input_ShopID,
    RetPrice: GetDecimal(RetPrice),
    RetPriceIncTax: GetDecimal(RetPriceIncTax),
    Input_CountryID: Input_CountryID,
    StdPrice: GetDecimal(STDPrice),
    StdPriceIncTax: GetDecimal(STDPriceIncTax),
    WasPrice: GetDecimal(WASPrice),
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
    IsTaxableCountry: IsTaxableCountry
  });

  console.log(resData);
  return resData;
}

export async function CProc_INT_GetCustomerHeaderInfo(DatasetID, Cu_Code) {
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

export async function CProc_INT_GetTaxAndAnalysisForGetPrice(GTandA_AccountCode, GTandA_ItemCodeID, GTandA_DatasetID) {
  let resData = null;

  const db = openDatabaseService();

  let res = await executeSqlAsync(db, `SELECT Distinct local_com_sku.SKUAnalysis AS SANALYSIS, local_int_salestax.stax_Code AS Stax_Code, local_int_salestax.stax_Rate AS Stax_Rate FROM (local_com_sku INNER JOIN local_int_analysis ON local_com_sku.SKUAnalysis = local_int_analysis.Ana_Code) INNER JOIN local_int_salestax ON local_int_analysis.Ana_VatCode = local_int_salestax.stax_Code WHERE local_com_sku.SKUNumber = '${GTandA_ItemCodeID}' and local_com_sku.SKUDataSetID = ${GTandA_DatasetID}`, []);

  if (res.rows.length > 0) {
    let item = res.rows.item(0);

    resData = {
      SANALYSIS: item.SANALYSIS,
      Stax_Code: item.Stax_Code,
      Stax_Rate: item.Stax_Rate
    }
  }

  return resData;
}

export async function CProc_API_GetProductsByCategory(Lvl, AccNo, Category = "", Offset = 0, Pagesize = 0, Where = "", Orderby = "", HideInNavigation = "", Input_CountryID = 0, SiteID = 1, PreSeason = 0) {
  let resData = [];


  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;


  const db = openDatabaseService();

  let sub_query = `SELECT ItemID FROM local_int_nav_attributes WHERE local_int_nav_attributes.Nav_Path=local_int_navigation.Nav_Navigation AND (Nav_ShopID=${SiteID} OR Nav_ShopID IS NULL)`;
  if (HideInNavigation !== "") {
    sub_query += ` AND Nav_Suspend=${HideInNavigation}`;
  }

  let query = `SELECT Nav_Navigation,
    (CASE WHEN Nav_Suspend=1 THEN 1 ELSE 0 END) AS HideInNavigation,
    SKUID, SKUNumber, SKUName, SKUDescription, SKUPrice, SKUEnabled, SKUDepartmentID, SKUManufacturerID,
    SKUInternalStatusID, SKUPublicStatusID, SKUSupplierID, SKUAvailableInDays, SKUGUID, SKUImagePath, SKUWeight, SKUWidth,
    SKUDepth, SKUHeight, SKUAvailableItems, SKUSellOnlyAvailable, SKUCustomData, SKUOptionCategoryID, SKUOrder, SKULastModified,
    SKUCreated, SKUSiteID, SKUNeedsShipping, SKUValidUntil, SKUProductType, SKUMaxItemsInOrder, SKUValidity, SKUValidFor,
    SKUMembershipGUID, SKUConversionName, SKUConversionValue, SKUBundleInventoryType, SKUMinItemsInOrder, SKURetailPrice, SKUParentSKUID,
    SKUShortDescription, SKUEproductFilesCount, SKUBundleItemsCount, SKUInStoreFrom, SKUReorderAt, SKUTrackInventory, SKUTaxClassID,
    SKUBrandID, SKUCollectionID, SKUClassCode, SKUClassTable, SKUDataSetID, SKUImageLocation, SKUCatNumber, SKUPackSize,
    SKUFeatures, SKUDelMonth, SKUBarCode, SKUPrice2, SKUPrice3, SKUPrice4, SKUPrice5, SKUPrice6, SKUPrice7,
    SKUPrice8, SKUPrice9, SKUPrice10, SKUPrice1Label, SKUPrice2Label, SKUPrice3Label, SKUPrice4Label, SKUPrice5Label,
    SKUPrice6Label, SKUPrice7Label, SKUPrice8Label, SKUPrice9Label, SKUPrice10Label, SKUAnalysis, SkuDiscountCat, SKUPictorialPackSize
    From local_com_sku
    INNER JOIN local_int_navigation
    ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
    WHERE EXISTS(${sub_query}) AND SKUEnabled=1 AND (SKUSiteID=${SiteID} OR SKUSiteID IS NULL) AND (local_int_navigation.Nav_ShopID=${SiteID} OR local_int_navigation.Nav_ShopID IS NULL)`;

  if (HideInNavigation !== "") {
    query += ` AND Nav_Suspend=${HideInNavigation}`;
  }

  if (Category !== "") {
    query += ` AND Nav_Navigation LIKE '${Category}/%'`;
  }
  if (PreSeason == 1) {
    if (Where != '') {
    Where += " AND coalesce(SkuPreSeason, null, 0) = 1 ";
    }
  } else {
    if (Where != '') {
    Where += " AND coalesce(SKUPreSeasonOnly, null, 0) = 0";
    }
  }
  if (Where != '') {
    query += ` AND ${Where}`;
  }

  if (Orderby != '') {
    query += ` ORDER BY ${Orderby}`;
  } else {
    query += ` ORDER BY Nav_Navigation, SKUName`;
  }

  if (Pagesize > 0) {
    query += ` LIMIT ${Pagesize}`;
  } else {
    query += ` LIMIT -1`;
  }

  if (Offset > 0) {
    query += ` OFFSET ${Offset}`;
  }

  let res = await executeSqlAsync(db, query, []);

  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      try {
        let splitNavPath = res.rows.item(index).Nav_Navigation.split("/");

        let catName = splitNavPath[Lvl - 1]
        let catPath = splitNavPath.slice(0, Lvl).join("/");

        let data = await CFunc_INT_GetYourPrice(AccNo, res.rows.item(index).SKUNumber, 1, 1, SiteID, Input_CountryID);
        if (data != null) {
          let tmpObj = {
            Cat_Name: catName,
            Cat_Path: catPath,
            ...res.rows.item(index),
            ...data
          };
          resData.push(tmpObj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;
}

//replacement for CProc_WEB_GetProductsForListV1_WithPrice SP
//not returning price options
export async function CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination(
  AccNo,
  PageSize = 6,
  Offset = 1,
  Where = '',
  OrderBy = '',
  Input_CountryID = 0,
) {
  let resData = [];



  if (Where == '') {
    Where = '1=1';
  }

  if (OrderBy == '') {
    OrderBy = 'local_com_sku.SKUNumber';
  }


  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

  if(Where != ''){
    if (PreSeason == 1) {
      Where += " AND  coalesce(SkuPreSeason, null, 0) = 1 ";
    } else {
      Where += " AND  coalesce(SKUPreSeasonOnly, null, 0) = 0 ";
    }

  }else{
    if (PreSeason == 1) {
      Where += " coalesce(SkuPreSeason, null, 0) = 1 ";
    } else {
      Where += " coalesce(SKUPreSeasonOnly, null, 0) = 0 ";
    }
  }




  const db = openDatabaseService();

  let query = `SELECT  local_com_sku.SKUID,
  local_com_sku.SKUNumber,
  local_com_sku.SKUName,
  local_com_sku.SKUPackSize,
  local_com_sku.SKUName        AS ItemName,
  local_com_sku.SKUNumber      AS ItemCode,
  local_com_sku.SkuDiscountCat AS ItemCatCode,
  local_com_sku.SKUPrice       AS ItemPrice,
  local_com_sku.SKUPrice,
  local_com_sku.SKUWeight,
  local_com_sku.SKUImageLocation,
  local_com_sku.SKUShortDescription,
  local_com_sku.SKUAvailableItems,
  local_com_sku.SKUBarCode,
  local_com_sku.SKUCatNumber
FROM local_int_navigation AS ct
    LEFT OUTER JOIN local_com_sku ON ct.Nav_SKUID = local_com_sku.SKUID
WHERE COALESCE(local_com_sku.SKUNumber, '') <> ''
AND ${Where} ORDER BY ${OrderBy}`;

  if (PageSize > 0) {
    query += ` LIMIT ${PageSize}`;
  } else {
    query += ` LIMIT -1`;
  }

  if (Offset > 0) {
    query += ` OFFSET ${Offset}`;
  }

  let res = await executeSqlAsync(db, query, []);

  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      try {
        let data = await CFunc_INT_GetYourPrice(
          AccNo,
          res.rows.item(index).SKUNumber,
          1,
          1,
          1,
          Input_CountryID,
        );
        if (data != null) {
          let tmpObj = {
            ...res.rows.item(index),
            ...data,
            image: require('../../../assets/noimage.png')
          };
          resData.push(tmpObj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;
}



export async function CProc_WEB_GetAlsoBoughtProducts(skuId) {
  let resData = [];

  const db = openDatabaseService();

  let query = `SELECT local_com_sku.SKUID,
                      local_com_sku.SKUName,
                      local_com_sku.SKUAvailableItems,
                      local_com_sku.SKUNumber,
                      local_com_sku.SKUShortDescription,
                      local_com_sku.SKUPackSize
                      FROM local_int_navigation ct
                      LEFT OUTER JOIN local_com_sku ON ct.Nav_SKUID = local_com_sku.SKUID
                      WHERE SKUID IN (
                        SELECT COM_OrderItem_1.OrderItemSKUID
                        FROM local_com_orderitem INNER JOIN local_com_orderitem AS COM_OrderItem_1 ON local_com_orderitem.OrderItemOrderID = COM_OrderItem_1.OrderItemOrderID
                        GROUP BY COM_OrderItem_1.OrderItemSKUID, local_com_orderitem.OrderItemSKUID
                        HAVING (((COM_OrderItem_1.OrderItemSKUID)<>${skuId}) AND ((local_com_orderitem.OrderItemSKUID)=${skuId}))
                        ORDER BY Sum(local_com_orderitem.OrderItemUnitCount) DESC) AND skuenabled = 1 LIMIT 10 OFFSET 1`;

  let res = await executeSqlAsync(db,query, []);

  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      try {
        //let data = await CFunc_INT_GetYourPrice(AccNo, res.rows.item(index).SKUNumber, 1, 1, 1, Input_CountryID);

          let tmpObj = {
            ...res.rows.item(index),
            image: require('../../../assets/noimage.png')
          };
          resData.push(tmpObj);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;
}



export async function CProc_WEB_GetProducts(sWhere='', sTop=''){
  const db = openDatabaseService();
  let q = '';

  q = `SELECT `;


  PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

  if(sWhere != ''){
    if (PreSeason == 1) {
      sWhere += " AND SKUPreSeason = 1 ";
    } else {
      sWhere += " AND coalesce(SKUPreSeasonOnly, null, 0) = 0";
    }

  }else{
    if (PreSeason == 1) {
      sWhere += " SKUPreSeason = 1 ";
    } else {
      sWhere += " coalesce(SKUPreSeasonOnly, null, 0) = 0";
    }
  }



  if(sTop != ''){
    q = q + `TOP ${sTop} `;
  }

  q = q + `local_com_sku.SKUNumber AS label,
           local_com_sku.SKUNumber AS [value],
           local_com_sku.SKUEnabled AS SKUEnabled,
           local_com_sku.SKUAvailableItems AS Qty,
           local_com_sku.SKUID FROM local_com_sku
            INNER JOIN local_int_navigation
            ON local_int_navigation.Nav_SKUID=local_com_sku.SKUID
            WHERE COALESCE(local_com_sku.SKUNumber, '') <> ''`

  if(sWhere != ''){
    q = q + ` AND ` + sWhere;
  }

  q = q + ` ORDER BY SKUNumber`;

  console.log(q);
  let res = await executeSqlAsync(db,q, []);

  let resData =[];

  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      let availability = res.rows.item(index).Qty > 0 ? true : false;
      console.log(res.rows.item(index));

      if (res.rows.item(index).SKUEnabled != 1) {
        availability = false;
      }
      try {
          let tmpObj = {
            ...res.rows.item(index),
            availability
          };
          resData.push(tmpObj);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;


}



//returns products with proce options
//replacement for CProc_WEB_GetProductsForListV1_WithPrice SP
export async function CProc_WEB_GetProductsForListV1_WithPrice_WithoutPagination_v2(
  AccNo,
  PageSize = 6,
  Offset = 1,
  Where = '',
  OrderBy = '',
  Input_CountryID = 0,
) {
  let resData = [];

  if (Where == '') {
    Where = '1=1';
  }
  if (OrderBy == '') {
    OrderBy = 'local_com_sku.SKUNumber';
  }

  const db = openDatabaseService();

  let query = `SELECT
  local_com_sku.SKUID,
  local_com_sku.SKUNumber,
  local_com_sku.SKUName,
  local_com_sku.SKUPackSize,
  local_com_sku.SKUName        AS ItemName,
  local_com_sku.SKUNumber      AS ItemCode,
  local_com_sku.SkuDiscountCat AS ItemCatCode,
  local_com_sku.SKUPrice       AS ItemPrice,
  local_com_sku.SKUPrice,
  local_com_sku.SKUWeight,
  Nav_ItemAttribute1           AS ItemAttribute1,
  Nav_ItemAttribute2           AS ItemAttribute2,
  Nav_ItemAttribute3           AS ItemAttribute3,
  Nav_ItemAttribute4           AS ItemAttribute4,
  Nav_ItemAttribute5           AS ItemAttribute5,
  Nav_ItemAttribute6           AS ItemAttribute6,
  Nav_ItemAttribute7           AS ItemAttribute7,
  Nav_ItemAttribute8           AS ItemAttribute8,
  Nav_ItemAttribute9           AS ItemAttribute9,
  Nav_ItemAttribute10          AS ItemAttribute10,
  Nav_ItemAttribute11          AS ItemAttribute11,
  Nav_ItemAttribute12          AS ItemAttribute12,
  Nav_ItemAttribute13          AS ItemAttribute13,
  Nav_ItemAttribute14          AS ItemAttribute14,
  Nav_ItemAttribute15          AS ItemAttribute15,
  Nav_RangeDataHeadings        AS ItemDataHeadings,
  Nav_ItemData1                AS ItemData1,
  Nav_ItemData2                AS ItemData2,
  Nav_ItemData3                AS ItemData3,
  Nav_ItemData4                AS ItemData4,
  Nav_ItemData5                AS ItemData5,
  Nav_ItemData6                AS ItemData6,
  Nav_ItemData7                AS ItemData7,
  Nav_ItemData8                AS ItemData8,
  Nav_ItemData9                AS ItemData9,
  Nav_ItemData10               AS ItemData10,
  local_com_sku.SKUImageLocation,
  local_com_sku.SKUShortDescription,
  local_com_sku.SKUAvailableItems,
  local_com_sku.SKUBarCode,
  local_com_sku.SKUCatNumber
FROM local_int_navigation AS ct
    LEFT OUTER JOIN local_com_sku ON ct.Nav_SKUID = local_com_sku.SKUID
WHERE COALESCE(local_com_sku.SKUNumber, '') <> ''
AND ${Where} ORDER BY ${OrderBy}`;


  let res = await executeSqlAsync(db, query, []);

  if (res.rows.length > 0) {
    for (let index = 0; index < res.rows.length; index++) {
      try {
        let data = await CFunc_INT_GetYourPrice(
          AccNo,
          res.rows.item(index).SKUNumber,
          1,
          1,
          1,
          Input_CountryID,
        );
        if (data != null) {
          let tmpObj = {
            ...res.rows.item(index),
            ...data
          };
          resData.push(tmpObj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return resData;
}