import {CProc_API_GetNavByLvl, initialTableInspection} from "./SP";
import {GetBoolean} from "../../../utils/ValidationHelper";
import { IsUserAnySOP, CategoriesNotAvailableForEndUsers } from "../../Services/UserHelper";

export async function GetCatalogNavigation(
    sCategory,
    nLevel,
    bIncSubcat = false,
    nOffset = 0,
    nPageSize = 0
    
) {
  let resData = [];

  // let inspect = await initialTableInspection(token);
  
  try {
    let sWhere = "";
    if (!IsUserAnySOP()) {
      sWhere = CategoriesNotAvailableForEndUsers()
        .map(cat => {
          return "Nav_Path NOT LIKE '" + cat + "/%' ";
        })
        .join(" AND ");
    }
    
   

    

    let resultArray = await CProc_API_GetNavByLvl(
        nLevel,
        sCategory,
        bIncSubcat,
        "0",
        sWhere
    );
    
    if (resultArray.length > 0) {
      let tmpObj = {};

      for (let i = 0; i < resultArray.length; i++) {
        let item = resultArray[i];
        let catPath = item.Cat_Path;

        if (!tmpObj.hasOwnProperty(catPath)) {
          tmpObj[catPath] = getCategory(item);
        }

        if (bIncSubcat) {
          if (tmpObj[catPath].subcategories == null) {
            tmpObj[catPath].subcategories = [];
          }
          tmpObj[catPath].subcategories.push(getSubCategory(item));
        }
      }

      Object.keys(tmpObj).forEach((key, index) => {
        resData.push(tmpObj[key]);
      });

      if (nOffset > 0) {
        resData = resData.slice(nOffset);
      }

      if (nPageSize > 0) {
        resData = resData.slice(0, nPageSize);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return resData;
}

export const getCategory = (item) => {
  let category = null;

  if (item != null) {
    let nodeName = item.Cat_Name;
    let nodeAliasPath = item.Cat_Path;

    category = {
      nodeAliasPath: nodeAliasPath,
      alias: nodeAliasPath.toLowerCase(),
      name: nodeName,
      hideInNavigation: GetBoolean(item.HideInNavigation),
      imageUrl: null,
      subcategories: null,
    };
  }

  return category;
};

export const getSubCategory = (item) => {
  let subcategory = null;

  if (item != null) {
    let nodeName = item.Subcat_Name;
    let nodeAliasPath = item.Subcat_Path;

    subcategory = {
      nodeAliasPath: nodeAliasPath,
      alias: nodeAliasPath.toLowerCase(),
      name: nodeName,
      hideInNavigation: GetBoolean(item.HideInNavigation),
      ImageUrl: null,
    };
  }

  return subcategory;
};
