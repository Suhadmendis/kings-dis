import { showMessage } from "react-native-flash-message";
import { store } from "../../../configureStore";
import base64 from "react-native-base64";

export default function isTokenExpired() {

  const tokenObject = decodeToken();
  const expiry = tokenObject;

  let currentStamp = Math.floor(new Date().getTime() / 1000);

  console.log(currentStamp);
  console.log(expiry);
  console.log(currentStamp - expiry);
  console.log(currentStamp >= expiry);

  if (currentStamp == "NO TOKEN") {
    return true;
  } else {
    // showMessage({
    //   message: "KINGS SEEDS",
    //   description:
    //     "Your authentication token has expired. Please login again to refresh the token",
    //   type: "warning",
    //   autoHide: true,
    // });


    // store.dispatch({ type: "logout:false" });

    return currentStamp >= expiry;
  }
}

function decodeToken() {
  let state = store.getState();
  let token = state.login.loginToken;

  if (token == "") {
    return "NO TOKEN";
  }

  var base64Url = token.split(".")[1];

  console.log(base64.decode(base64Url));

  let stringg = base64.decode(base64Url) + "";

  let isJson = isJsonString(stringg);

  if (isJson) {
    var base64DecodedJSON = JSON.parse(stringg);

    return base64DecodedJSON.exp;
  } else {
    let elements = stringg.split(",");

    let exp = JSON.parse("{" + elements[3] + "}");

    return exp;
  }
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
