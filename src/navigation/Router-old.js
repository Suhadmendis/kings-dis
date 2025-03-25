import React from "react";
import { ActionConst, Router, Scene } from "react-native-router-flux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import SplashScreen from "../components/SplashScreen";
import SignInScreen from "../components/SignInScreen";
import SignUpScreen from "../components/SignUpScreen";
import HomeScreen from "../components/HomeScreen";
import ProductScreen from "../components/ProductScreen";
import DrawerContent from "../components/common/DrawerContent";
import CartScreen from "../components/CartScreen";
import MyProfile from "../components/MyProfile";

import FindStore from "../components/FindStore";
import MapView from "../components/MapView";
import Cart from "../components/Cart";
import Contacts from "../components/Contacts";
import ProductSubcategory from "../components/ProductSubcategory";

import ProductCategory from "../components/ProductCategory";
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import ProductDetails from "../components/ProductDetails";
import FilterDrawer from "../components/FilterDrawer";
import AddressScreen from "../components/AddressScreen";

import ContactForm from "../components/ContactForm";
import ContactNotes from "../components/ContactNotes";
import AddContactNote from "../components/AddContactNote";
import OrderPad from "../components/OrderPad";
import StoreAdresses from "../components/StoreAdresses";
import AddStoreAddress from "../components/AddStoreAddress";
import StorePhotos from "../components/StorePhotos";
import AddNewPhotos from "../components/AddNewPhotos";
import Store from "../components/Store";
import StoreNew from "../components/StoreNew";

import StoreContact from "../components/StoreContact";
import StoreContactForm from "../components/StoreContactForm";
import StoreCarts from "../components/StoreCarts";
import StoreQuotes from "../components/StoreQuotes";
import ViewContactNote from "../components/ViewContactNote";
import StoreCartsView from "../components/StoreCartsView";


import SearchResult from "../components/SearchResult";

const MyTransitionSpec = {
  duration: 600,
};

// dispatch({
//   type: 'GET_USER_LOGIN_TOKEN',
//   payload: '',
// });
// dispatch({
//   type: 'GET_USER_EXPIRY_DATE',
//   payload: '',
// });

let widthper = wp('100%');
let wdth=0;
if(widthper<=500.0){
  wdth = wp('70')
}else{
  wdth = wp('45')
}

const transitionConfig = () => ({
  transitionSpec: MyTransitionSpec,
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;
    const width = layout.initWidth;

    const inputRange = [index - 1, index, index + 1];

    const opacity = position.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange: [width, 0, 0],
    });

    return {
      opacity,
      transform: [{ translateX }],
    };
  },
});


const RouterComponent = () => {
  return (
    <Router>
      <Scene
        key="root"
        hideNavBar={true}
        transitionConfig={transitionConfig}
        headerMode={null}
      >
        <Scene key="loading" component={SplashScreen} initial />
        <Scene key="signIn" component={SignInScreen} />
        <Scene key="signUp" component={SignUpScreen} />
        <Scene key="cart" component={CartScreen} />
        <Scene key="contactNotes" component={ContactNotes} />
        <Scene key="addContactNote" component={AddContactNote} />
        <Scene key="viewContactNote" component={ViewContactNote} />
        <Scene key="storeQuotes" component={StoreQuotes} />
        <Scene key="storeCarts" component={StoreCarts} />
            <Scene key="storeCartsView" component={StoreCartsView} />

        <Scene
          drawerWidth={wdth}
          drawer
          hideNavBar
          contentComponent={DrawerContent}
          drawerPosition="left"
          key="drawerContent"
        >
          <Scene
            hideNavBar={true}
            transitionConfig={transitionConfig}
            headerMode={null}
          >
            <Scene key="home" component={HomeScreen} />
            <Scene key="product" component={ProductScreen} />
            <Scene key="findstore" component={FindStore} />
            <Scene key="mapview" component={MapView} />
            <Scene key="carts" component={Cart} />
            <Scene key="productCategory" component={ProductCategory} />
            <Scene key="productSubcategory" component={ProductSubcategory} />
            <Scene key="productDetails" component={ProductDetails} />
            <Scene key="addressScreen" component={AddressScreen} />
            {/* <Scene key="productGrid" component={ProductGrid}/> */}
            <Scene key="store" component={Store} />
            <Scene key="storeNew" component={StoreNew} />
            <Scene key="productList" component={ProductList} />
            <Scene key="myProfile" component={MyProfile} />
            <Scene key="orderPad" component={OrderPad} />
            

            <Scene key="searchResult" component={SearchResult} />

            <Scene key="contacts" component={Contacts} />
            <Scene key="contactForm" component={ContactForm} />

            <Scene key="addStoreAddress" component={AddStoreAddress} />
            <Scene key="storePhotos" component={StorePhotos} />
            <Scene key="addNewPhotos" component={AddNewPhotos} />
            <Scene key="productGrid" component={ProductGrid} />

            <Scene key="storeContact" component={StoreContact} />
            <Scene key="storeContactForm" component={StoreContactForm} />
            <Scene key="storeAdresses" component={StoreAdresses} />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};
export default RouterComponent;
