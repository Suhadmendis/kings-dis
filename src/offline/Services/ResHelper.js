import {GetCultureInfoByCode} from "./CultureInfoProvider";
import BasicConfig from "../../config/basic.json";
import {GetInteger} from "../../utils/ValidationHelper";
import {RawQuery} from "./DataHelper";

export async function GetString(stringName, cultureCode = null, useDefaultCulture = true) {
  try {
    let resourceStringRes = await RawQuery(`SELECT StringID FROM local_cms_resourcestring WHERE StringKey='${stringName}' LIMIT 1`);
    if (resourceStringRes != "") {
      let stringID = GetInteger(resourceStringRes.item(0).StringID);
      if (stringID > 0) {
        let oCulture = null;

        try {
          if (cultureCode != null) {
            oCulture = await GetCultureInfoByCode(cultureCode);
          } else {
            throw new Error("cultureCode is null");
          }
        } catch (e) {
          if (useDefaultCulture) {
            try {
              oCulture = await GetCultureInfoByCode(BasicConfig.DefaultCultureCode);
            } catch (e) {
            }
          }
        }

        if (oCulture != null) {
          let cultureID = GetInteger(oCulture.CultureID);
          if (cultureID > 0) {
            let resourceTranslationRes = await RawQuery(`SELECT TranslationText FROM local_cms_resourcetranslation WHERE TranslationStringID=${stringID} AND TranslationCultureID=${cultureID} LIMIT 1`);
            if (resourceTranslationRes != "") {
              return resourceTranslationRes.item(0).TranslationText;
            } else {
              //ResourceTranslation not found
              return stringName;
            }
          } else {
            //Invalid CultureID
            return stringName;
          }
        } else {
          //Culture not found
          return stringName;
        }

      } else {
        //Invalid StringID
        return stringName;
      }
    } else {
      //ResourceString not found
      return stringName;
    }
  } catch (e) {
    return stringName;
  }
}
