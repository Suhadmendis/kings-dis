import URL from "../url/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PermissionsAndroid,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import RNFetchBlob from "rn-fetch-blob";

import { showMessage } from 'react-native-flash-message';



export const syncImagesToApi = async () => {
 
}

export const downloadImages = async () => {
 
    return await downloadImagesApi('test123', 456);
}


