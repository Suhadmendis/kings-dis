

import RNFetchBlob from 'rn-fetch-blob'

import axios from "axios";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from "mime";
import { connect } from "react-redux";
// import RNFS, { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';
var RNFS = require("react-native-fs");
import getBaseUrl from '../url/getBaseUrl';

import { downloadImagesApi } from "../url/API";

import {
  getStoreModal,
  syncModalControl
} from "../actions/StorePhotosAction";

let sel_array = [];
const getSelectedImagesFromArray = async (selPhotosArray) => {
  sel_array = [];
  for (let index = 0; index < selPhotosArray.length; index++) {
    const element = selPhotosArray[index];
    if (element.selected == true) {
      sel_array.push(element);
    }
  }
};



export function syncImagesToApi  (
  selPhotosArray,
  accCode,
  addressId,
  l_token,
)  {
  //  await getSelectedImagesFromArray(selPhotosArray);



  return new Promise((resolve, reject) => {
    var formData = new FormData();

    const dirs = RNFetchBlob.fs.dirs;

    var d_ = RNFS.DocumentDirectoryPath + '/';

    // console.log('selPhotosArray', RNFS);
    formData.append('AccCode', accCode);
    formData.append('AddressID', addressId);

    //add selected images to file array
    let files_ = [];
    for (let index = 0; index < selPhotosArray.length; index++) {
      const element = selPhotosArray[index];
      let i = 0;
      if (element.selected == true) {
        let img_ = {
          name: `Images`,
          filename: element.fileName,
          filepath: d_ + element.fileName,
          filetype: mime.getType(element.fileUri),
        };
        files_.push(img_);
      }
    }

    
    var uploadUrl = `${getBaseUrl()}Sync/ImageSync`;
    var uploadBegin = response => {
      var jobId = response.jobId;
      // console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = response => {
      var percentage = Math.floor(
        (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
      );
      // console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files_,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${l_token}`,
        Accept: 'application/json',
      },
      fields: {
        AccCode: accCode,
        AddressID: addressId.toString(),
      },
      // begin: uploadBegin,
      // progress: uploadProgress,
    })
    .promise.then(response => {
        if (response.statusCode == 200) {
          console.log(response.body);
          const res = JSON.parse(response.body);
          
        
console.log(res.error);
          if (res.error == null) {
        
            

            for (let index = 0; index < res.images.length; index++) {
              const element = res.images[index];
              

              if (element.error == null) {
                for (let j = 0; j < selPhotosArray.length; j++) {
                  const selImg = selPhotosArray[j];
                  if (selImg.fileName == element.fileName) {
                    selImg.synced = true;
                    selImg.selected = false;
                  }
                }
              }
            }

            getSelectedPhotosArray(selPhotosArray);
            resolve("success");
          } else {
            
            reject(res.error);
          }
        } else {
          reject("error");
        }
      })
      .catch(err => {
        if (err.description === 'cancelled') {
          console.log('err');
          // cancelled by user
          reject("error");
        }
        reject("error");
        console.log(err);
      });
  });
};

export const getSelectedPhotosArray = (array) => async (dispatch) => {
  
  dispatch({
    type: "GET_SELECTED_PHOTOS_ARRAY",
    payload: array,
  });
};


export const getStoreModalFalse = (modal) => async (dispatch) => {
  
  dispatch({
    type: "GET_STORE_MODAL",
    payload: modal,
  });
};

export const downloadImages = async () => {
 
 // return await downloadImagesApi('test123', 456);

}
