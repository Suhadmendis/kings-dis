import URL from "../url/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PermissionsAndroid,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import RNFetchBlob from "rn-fetch-blob";

let imageArray = [];


syncModalControl=()=>{
  
  getStoreModal(false)
}


export const getPhotosArray = (array) => async (dispatch) => {
  dispatch({
    type: "GET_PHOTOS_ARRAY",
    payload: array,
  });
};


export const getStoreModal = (modal) => async (dispatch) => {
  
  
  dispatch({
    type: "GET_STORE_MODAL",
    payload: modal,
  });
};


export const getSelectedPhotosArray = (array) => async (dispatch) => {
  dispatch({
    type: "GET_SELECTED_PHOTOS_ARRAY",
    payload: array,
  });
};


const saveImage = (source, filename) =>{
  const folderPath = "/storage/emulated/0/foldernew";
  const filePath = folderPath + "/" + "saveimg.jpg";

  RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
    if (isDir) {
      
      addImage(source, filename);
    } else {
      
      RNFetchBlob.fs.mkdir(folderPath).then(() => {
        
        addImage(source, filename);
      });
    }
  });
}


const addImage=(source, filename)=> {
  
  var randomChars = filename;
  var result = "";
  for (var i = 0; i < 10; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  
  var Base64Code = source.split("data:image/jpg;base64,"); //base64Image is my image base64 string
  const dirs = RNFetchBlob.fs.dirs;
  
  var path_ = dirs.DCIMDir + result + ".jpg";

  RNFetchBlob.fs.writeFile(path_, source, "base64").then((res) => {
    
  });
}

export const takeImageFromGallery_ = async() => {
  let options = {
    title: "Select Image",
    // saveToPhotos: true,
    selectionLimit: 10,
    includeBase64: true,
    customButtons: [
      { name: "customOptionKey", title: "Choose Photo from Custom Option" },
    ],
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  launchImageLibrary(options, (response) => {
    
    if (response.didCancel) {
      
    } else if (response.error) {
      
    } else if (response.customButton) {
      
      alert(response.customButton);
    } else {
      const source = { uri: "data:image/jpeg;base64" + response.base64 };
      
      for (let index = 0; index < response.assets.length; index++) {
        // saveImage(
        //   response.assets[index].base64,
        //   response.assets[index].fileName
        // );
        let imgDetails = {
          fileUri: response.assets[index].uri,
          fileName: response.assets[index].fileName,
          fileData: "",
          selected: false,
        };
       
        imageArray.push(imgDetails);
      }
      return imageArray;
    }
  });
};

// chooseImageFromCamera = async () => {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.CAMERA,
//     {
//       title: "message...",
//       message: "message...",
//       buttonNeutral: "message..",
//       buttonNegative: "No",
//       buttonPositive: "Yes",
//     }
//   );
//   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     let options = {
//       title: "Select Image",
//       saveToPhotos: true,
//       customButtons: [
//         { name: "customOptionKey", title: "Choose Photo from Custom Option" },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//     };
//     launchCamera(options, (response) => {
//       console.log("Response = ", response);

//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("ImagePicker Error: ", response.error);
//       } else if (response.customButton) {
//         console.log("User tapped custom button: ", response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };

//         console.log("response", JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//         this.setModalVisible(false);

//       }
//     });
//   }
// };