import openDatabaseService from '../../Config';
import {GetBoolean, GetDecimal, GetInteger, RoundDecimal} from "../../../utils/ValidationHelper";
import {executeSqlAsync} from "../../SQLiteAsync";
import { store } from '../../../../configureStore';

export async function CFunc_INT_GetYourPrice(Input_Cu_Code, Input_Stk_Code, Input_Qty, Input_DatasetID, Input_ShopID, Input_CountryID = 0, Input_PreSeason = 0) {
  const db = openDatabaseService();

  let SANALYSIS = '';
  let Stax_Code = '';
  let Stax_Rate = 0;
  let Cu_Taxable = false;
  let Cu_Tax_Code = '';
  let Cu_CurrencyCode = '';
  let AccDiscGroup1 = 0;
  let AccDiscGroup2 = 0;
  let AccDiscGroup3 = 0;
  let AccDiscGroup4 = 0;
  let Input_CountryIDOUT = 0;
  let IsTaxableCountry = false;
  let Cu_Line_Disc = 0;

  let Priceline1 = 0;
  let Priceline2 = 0;
  let Priceline3 = 0;
  let Priceline4 = 0;
  let Priceline5 = 0;
  let Priceline6 = 0;
  let Priceline7 = 0;
  let Priceline8 = 0;
  let Priceline9 = 0;
  let Priceline10 = 0;
  let Priceline1label = '';
  let Priceline2label = '';
  let Priceline3label = '';
  let Priceline4label = '';
  let Priceline5label = '';
  let Priceline6label = '';
  let Priceline7label = '';
  let Priceline8label = '';
  let Priceline9label = '';
  let Priceline10label = '';
  let StkDiscGroup = '';

  let PriceMin = 0;
  let PriceMax = 0;
  let PriceRange = '';

  let ApplyTax = false;


  Input_PreSeason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;

  if (ApplyTax) {

    try {

      let res1 = await executeSqlAsync(db, `SELECT Distinct local_com_sku.SKUAnalysis,
                                                          local_int_salestax.stax_Code,
                                                          local_int_salestax.stax_Rate
                                          FROM (local_com_sku INNER JOIN local_int_analysis ON local_com_sku.SKUAnalysis = local_int_analysis.Ana_Code)
                                                   INNER JOIN local_int_salestax
                                                              ON local_int_analysis.Ana_VatCode = local_int_salestax.stax_Code
                                          WHERE local_com_sku.SKUNumber = '${Input_Stk_Code}'
                                            AND local_com_sku.SKUDataSetID = ${Input_DatasetID}`, []);
      if (res1.rows.length > 0) {
        SANALYSIS = res1.rows.item(0).SKUAnalysis;
        Stax_Code = res1.rows.item(0).stax_Code;
        Stax_Rate = GetDecimal(res1.rows.item(0).stax_Rate);
      }

    } catch (e) {
      console.log(e);
    }

    try {

      let res2 = await executeSqlAsync(db, `select case
                                                       when coalesce(ItemTaxCode, '') = '' then 'True'
                                                       when ItemTaxCode = '1' then 'True'
                                                       when coalesce(stax_rate, 0) > 0 then 'True'
                                                       else 'False' end              Cu_Taxable,
                                                   coalesce(ItemTaxCode, '')         ItemTaxCode,
                                                   coalesce(stax_rate, ${Stax_Rate}) stax_rate,
                                                   'GBP'                             Cu_CurrencyCode,
                                                   ItemDiscGroup1,
                                                   ItemDiscGroup2,
                                                   ItemDiscGroup3,
                                                   ItemDiscGroup4,
                                            from local_ct_tradeaccount
                                                     left outer join local_int_salestax
                                                                     on ItemTaxCode = stax_code and ItemDataSetID = stax_DataSetID
                                            where ItemDataSetID = ${Input_DatasetID}
                                              and ItemCode = '${Input_Cu_Code}'`, []);
      if (res2.rows.length > 0) {
        Cu_Taxable = GetBoolean(res2.rows.item(0).Cu_Taxable);
        Cu_Tax_Code = res2.rows.item(0).ItemTaxCode;
        Stax_Rate = GetDecimal(res2.rows.item(0).stax_rate);
        Cu_CurrencyCode = res2.rows.item(0).Cu_CurrencyCode;
        AccDiscGroup1 = GetDecimal(res2.rows.item(0).ItemDiscGroup1);
        AccDiscGroup2 = GetDecimal(res2.rows.item(0).ItemDiscGroup2);
        AccDiscGroup3 = GetDecimal(res2.rows.item(0).ItemDiscGroup3);
        AccDiscGroup4 = GetDecimal(res2.rows.item(0).ItemDiscGroup4);
      } else {
        Cu_Taxable = true;
      }

    } catch (e) {
      Cu_Taxable = true;
      console.log(e);
    }

    if (Input_CountryID > 0) {

      try {

        let res3 = await executeSqlAsync(db, `select CountryID
                                                  from local_cms_country T1
                                                           inner join local_ct_countrygroup T2 on T1.countrygroupid = T2.ItemID
                                                  where (T2.ItemName = 'DEFAULT')
                                                    and T1.CountryID = ${Input_CountryID}`, []);
        if (res3.rows.length > 0) {
          Input_CountryIDOUT = GetInteger(res3.rows.item(0).CountryID);
        }

      } catch (e) {
        console.log(e);
      }

      if (Input_CountryIDOUT > 0) {
        IsTaxableCountry = true;
      } else {
        Cu_Taxable = false;
        IsTaxableCountry = false;
      }

    }

  } else {

    Cu_Taxable = false;

    try {

      let res1 = await executeSqlAsync(db, `select ItemDiscGroup1, ItemDiscGroup2, ItemDiscGroup3, ItemDiscGroup4
                                          from local_ct_tradeaccount
                                                   left outer join local_int_salestax
                                                                   on ItemTaxCode = stax_code and ItemDataSetID = stax_DataSetID
                                          where ItemDataSetID = ${Input_DatasetID}
                                            and ItemCode = '${Input_Cu_Code}'`, []);
      if (res1.rows.length > 0) {
        AccDiscGroup1 = GetDecimal(res1.rows.item(0).ItemDiscGroup1);
        AccDiscGroup2 = GetDecimal(res1.rows.item(0).ItemDiscGroup2);
        AccDiscGroup3 = GetDecimal(res1.rows.item(0).ItemDiscGroup3);
        AccDiscGroup4 = GetDecimal(res1.rows.item(0).ItemDiscGroup4);
      }

    } catch (e) {
      console.log(e);
    }
  }


  let res1 = await executeSqlAsync(db, `select
                                              CASE WHEN ${Input_PreSeason} = 1 THEN SKUPricePreSeason ELSE SKUPrice END as SKUPrice,
                                               CASE WHEN SKUPrice2 = 0 THEN null ELSE SKUPrice2 END SKUPrice2,
                                               CASE WHEN SKUPrice3 = 0 THEN null ELSE SKUPrice3 END SKUPrice3,
                                               CASE WHEN SKUPrice4 = 0 THEN null ELSE SKUPrice4 END SKUPrice4,
                                               CASE WHEN SKUPrice5 = 0 THEN null ELSE SKUPrice5 END SKUPrice5,
                                               CASE WHEN SKUPrice6 = 0 THEN null ELSE SKUPrice6 END SKUPrice6,
                                               CASE WHEN SKUPrice7 = 0 THEN null ELSE SKUPrice7 END SKUPrice7,
                                               CASE WHEN SKUPrice8 = 0 THEN null ELSE SKUPrice8 END SKUPrice8,
                                               CASE WHEN SKUPrice9 = 0 THEN null ELSE SKUPrice9 END SKUPrice9,
                                               CASE WHEN SKUPrice10 = 0 THEN null ELSE SKUPrice10 END SKUPrice10,
                                               SKUPrice1Label,
                                               CASE WHEN SKUPrice2 = 0 THEN null ELSE SKUPrice2Label END   SKUPrice2Label,
                                               CASE WHEN SKUPrice3 = 0 THEN null ELSE SKUPrice3Label END   SKUPrice3Label,
                                               CASE WHEN SKUPrice4 = 0 THEN null ELSE SKUPrice4Label END   SKUPrice4Label,
                                               CASE WHEN SKUPrice5 = 0 THEN null ELSE SKUPrice5Label END   SKUPrice5Label,
                                               CASE WHEN SKUPrice6 = 0 THEN null ELSE SKUPrice6Label END   SKUPrice6Label,
                                               CASE WHEN SKUPrice7 = 0 THEN null ELSE SKUPrice7Label END   SKUPrice7Label,
                                               CASE WHEN SKUPrice8 = 0 THEN null ELSE SKUPrice8Label END   SKUPrice8Label,
                                               CASE WHEN SKUPrice9 = 0 THEN null ELSE SKUPrice9Label END   SKUPrice9Label,
                                               CASE WHEN SKUPrice10 = 0 THEN null ELSE SKUPrice10Label END SKUPrice10Label,
                                               SkuDiscountCat
                                        from local_com_sku
                                        where Skunumber = '${Input_Stk_Code}'`, []);
  if (res1.rows.length > 0) {
    Priceline1 = GetDecimal(res1.rows.item(0).SKUPrice);
    Priceline2 = GetDecimal(res1.rows.item(0).SKUPrice2);
    Priceline3 = GetDecimal(res1.rows.item(0).SKUPrice3);
    Priceline4 = GetDecimal(res1.rows.item(0).SKUPrice4);
    Priceline5 = GetDecimal(res1.rows.item(0).SKUPrice5);
    Priceline6 = GetDecimal(res1.rows.item(0).SKUPrice6);
    Priceline7 = GetDecimal(res1.rows.item(0).SKUPrice7);
    Priceline8 = GetDecimal(res1.rows.item(0).SKUPrice8);
    Priceline9 = GetDecimal(res1.rows.item(0).SKUPrice9);
    Priceline10 = GetDecimal(res1.rows.item(0).SKUPrice10);
    Priceline1label = res1.rows.item(0).SKUPrice1Label;
    Priceline2label = res1.rows.item(0).SKUPrice2Label;
    Priceline3label = res1.rows.item(0).SKUPrice3Label;
    Priceline4label = res1.rows.item(0).SKUPrice4Label;
    Priceline5label = res1.rows.item(0).SKUPrice5Label;
    Priceline6label = res1.rows.item(0).SKUPrice6Label;
    Priceline7label = res1.rows.item(0).SKUPrice7Label;
    Priceline8label = res1.rows.item(0).SKUPrice8Label;
    Priceline9label = res1.rows.item(0).SKUPrice9Label;
    Priceline10label = res1.rows.item(0).SKUPrice10Label;
    StkDiscGroup = res1.rows.item(0).SkuDiscountCat;

    if ((StkDiscGroup || '') !== '') {
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
    }

    if (Cu_Line_Disc > 0) {
      Priceline1 = Priceline1 * (1 - (Cu_Line_Disc / 100));
      Priceline2 = Priceline2 * (1 - (Cu_Line_Disc / 100));
      Priceline3 = Priceline3 * (1 - (Cu_Line_Disc / 100));
      Priceline4 = Priceline4 * (1 - (Cu_Line_Disc / 100));
      Priceline5 = Priceline5 * (1 - (Cu_Line_Disc / 100));
      Priceline6 = Priceline6 * (1 - (Cu_Line_Disc / 100));
      Priceline7 = Priceline7 * (1 - (Cu_Line_Disc / 100));
      Priceline8 = Priceline8 * (1 - (Cu_Line_Disc / 100));
      Priceline9 = Priceline9 * (1 - (Cu_Line_Disc / 100));
      Priceline10 = Priceline10 * (1 - (Cu_Line_Disc / 100));
    }

    if (Cu_Taxable && Stax_Rate > 0) {
      Priceline1 = Priceline1 * (1 + (Stax_Rate / 100));
      Priceline2 = Priceline2 * (1 + (Stax_Rate / 100));
      Priceline3 = Priceline3 * (1 + (Stax_Rate / 100));
      Priceline4 = Priceline4 * (1 + (Stax_Rate / 100));
      Priceline5 = Priceline5 * (1 + (Stax_Rate / 100));
      Priceline6 = Priceline6 * (1 + (Stax_Rate / 100));
      Priceline7 = Priceline7 * (1 + (Stax_Rate / 100));
      Priceline8 = Priceline8 * (1 + (Stax_Rate / 100));
      Priceline9 = Priceline9 * (1 + (Stax_Rate / 100));
      Priceline10 = Priceline10 * (1 + (Stax_Rate / 100));
    }

    let minArray = [Priceline2, Priceline3, Priceline4, Priceline5, Priceline6, Priceline7, Priceline8, Priceline9, Priceline10];
    PriceMin = Math.min(Priceline1, ...minArray.filter(x => x > 0));
    let maxArray = [Priceline2, Priceline3, Priceline4, Priceline5, Priceline6, Priceline7, Priceline8, Priceline9, Priceline10];
    PriceMax = Math.max(Priceline1, ...maxArray.filter(x => x > 0));

    if (PriceMin === PriceMax) {
      PriceRange = '£' + RoundDecimal(PriceMin).toFixed(2);
    } else {
      PriceRange = '£' + RoundDecimal(PriceMin).toFixed(2) + ' - ' + '£' + RoundDecimal(PriceMax).toFixed(2);
    }

    return {
      Priceline1: RoundDecimal(Priceline1),
      Priceline1label: Priceline1label,
      Priceline2: RoundDecimal(Priceline2),
      Priceline2label: Priceline2label,
      Priceline3: RoundDecimal(Priceline3),
      Priceline3label: Priceline3label,
      Priceline4: RoundDecimal(Priceline4),
      Priceline4label: Priceline4label,
      Priceline5: RoundDecimal(Priceline5),
      Priceline5label: Priceline5label,
      Priceline6: RoundDecimal(Priceline6),
      Priceline6label: Priceline6label,
      Priceline7: RoundDecimal(Priceline7),
      Priceline7label: Priceline7label,
      Priceline8: RoundDecimal(Priceline8),
      Priceline8label: Priceline8label,
      Priceline9: RoundDecimal(Priceline9),
      Priceline9label: Priceline9label,
      Priceline10: RoundDecimal(Priceline10),
      Priceline10label: Priceline10label,
      PriceRange: PriceRange
    }
  } else {
    return null;
  }
}
