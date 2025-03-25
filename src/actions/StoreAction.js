
import URL from "../url/baseUrl";
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

export const getStoreTabValue = (text) => async (dispatch) => {
 // console.log(text);
  dispatch({
    type: "GET_TAB_VALUE",
    payload: text,
  });
};



