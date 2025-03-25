import getBaseUrl from '../../url/getBaseUrl';
import {addStoreComments, editStoreComments} from '../../url/API'

import URL from "../../url/baseUrl";

export default async function storeCommentDataProvider(token, tableName, localData) {
  let resultsArray = [];

  for (let i = 0; i < localData.length; i++) {
    const data = localData[i];
    
    let arr = {
      title:data.ItemTitle,
      note:data.ItemComment,
      id:data.ItemID,
      itemCode: data.TradeAccID,
      isDeleted: data.IsDeleted
    }

    let response = await editStoreComments(arr);

    if(response.error == "Invalid StoreCommentID"){
      let addArr = {
        NoteTitle:data.ItemTitle,
        Note:data.ItemComment,
        itemCode: data.TradeAccID,
        isDeleted: data.IsDeleted
      }

      let res2 = await addStoreComments(addArr);
      
      resultsArray.push(res2.storeComment)

    }else{
      resultsArray.push(response.storeComment)
    }

  }
  return resultsArray;

}

