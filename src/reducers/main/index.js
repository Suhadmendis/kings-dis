import { combineReducers } from "redux";
import LoadingReducer from "../loadingReducer";
import LoginReducer from "../LoginReducer";
import HomeReducer from "../HomeReducer";
import FindStoreReducer from "../FindStoreReducer";
import OrderPadReducer from "../OrderPadReducer";
import StorePhotosReducer from "../StorePhotosReducer";
import ContactReducer from "../ContactReducer";
import StoreReducer from "../StoreReducer";
import CartReducer from '../CartReducer';
import CheckoutReducer from "../CheckoutReducer";
import CaledarReducer from "../caledarReducer";

export default combineReducers({
  loading: LoadingReducer,
  login: LoginReducer,
  home: HomeReducer,
  findStore: FindStoreReducer,

  orderPad: OrderPadReducer,

  storePhotos: StorePhotosReducer,
  contact: ContactReducer,
  store: StoreReducer,
  cart: CartReducer,
  checkout: CheckoutReducer,
  calendar: CaledarReducer
  
});
