import * as React from "react";
import { Image, Text, View, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";

import HomeScreen from "../components/HomeScreen";
import ProductScreen from "../components/ProductScreen";

import FindStore from "../components/FindStore";
import MapView from "../components/MapView";
import Cart from "../components/Cart";
import Contacts from "../components/Contacts";
import AllOrders from "../components/AllOrders";
import ViewOrder from "../components/ViewOrder";
import ProductSubcategory from "../components/ProductSubcategory";

import ProductCategory from "../components/ProductCategory";
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import ProductDetails from "../components/ProductDetails";
import FilterDrawer from "../components/FilterDrawer";
import AddressScreen from "../components/AddressScreen";
import MyProfile from "../components/MyProfile";

import Store from "../components/Store";
import StoreNew from "../components/StoreNew";
import OrderPad from "../components/OrderPad";
import PictorialForm from "../components/PictorialForm";
import SearchResult from "../components/SearchResult";
import ContactForm from "../components/ContactForm";
import AddStoreAddress from "../components/AddStoreAddress";
import StorePhotos from "../components/StorePhotos";
import AddNewPhotos from "../components/AddNewPhotos";

import StoreContact from "../components/StoreContact";
import StoreContactForm from "../components/StoreContactForm";
import StoreAdresses from "../components/StoreAdresses";
import BlanckPage from "../components/BlanckPage";
import ReportScreen from "../components/ReportScreen";
import ReportTableScreen from "../components/ReportTableScreen";
import PrivacyPolicy from "../components/PrivacyPolicy";

import CalendarPage from "../components/CalendarPage";
import AddNewAppointment from "../components/AddNewAppointment";
import EditAppointment from "../components/EditAppointment";

import { logOut } from '../actions/AuthActions';
import _ from "lodash";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Styles from "../style/FooterStyle";
import SyncPage from "../components/SyncPage";
import { useDispatch, useSelector, useStore, connect } from "react-redux";
import ViewContactNote from "../components/ViewContactNote";
import NetInfo from "@react-native-community/netinfo";
import BillingScreen from "../screens/BillingScreen";
import OrderSummary from "../screens/OrderSummary";
import PaymentScreen from "../screens/PaymentScreen";
import OrderConfirmation from "../screens/OrderConfirmation";
import IsTokenExpired from "../components/common/TokenOperation";
import AddBillingAddressScreen from "../screens/AddBillingAddressScreen";

import DataAdapter from "../offline/localData/DataAdapter";


import ProductMainCategory from "../components/products/ProductMainCategory";
import ProductSubFilterCategory from "../components/products/ProductSubFilterCategory";
import ProductCategories from "../components/products/ProductCategories";
import ProductSubcategories from "../components/products/ProductSubcategories";
import { isOffline } from "../components/common/OfflineToggle";
import { tokenLogOut } from "../actions/HomeScreenAction";

const { ids, styles } = Styles;

const store = require("../assets/store_res.png");
const map = require("../assets/mapres.png");
const allOrdersImage = require("../assets/allorders-image.png");
const cal = require("../assets/calendar_res.png");
const contact = require("../assets/contact_res.png");
const sync = require("../assets/sync.png");


async function checkDb(){

  const payload = {
    section: 'SYNC',
    opration: 'SYNC CHECK DB',
    data: ''
  }

  const newpro = await DataAdapter(payload);
  return newpro;
}





function FooterTabs(props) {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const reduxStore = useStore();
  const dispatch = useDispatch();

  //get the sync status from redux store - loadingReducer store
  const { connectionStatus, syncProcessStatus, connectionSyncTrigger } =
    useSelector((s) => s.loading);


  syncButtonStyle = function (con_status, sync_status) {
    if (con_status) {
      if (sync_status) {
        return styles.footericonSyncView_sync;
      } else {
        return styles.footericonSyncView;
      }
    } else {
      return styles.footericonSyncView_off;
    }
  };


  _changeScreen = () => {

    const tokenExpired = IsTokenExpired();


console.log('change screen----ff------------------------------------------------------------change screen',tokenExpired);
console.log(props);
    if (tokenExpired) {
      tokenLogOut()
      // props.logOut(props)
    }



  };







  _changeScreen();


  React.useEffect(() => {

    const NetInfoSubscribtion = NetInfo.addEventListener(_handleConnectivityChange);
    return () => NetInfoSubscribtion()
  }, []);


  _handleConnectivityChange = async (state) => {


    changeNavigation(state);

    const res = await isOffline()
    console.log('isOffline', res);
    let customState = false;
    if (res) {
      customState = false;
    }else{
      customState = state.isConnected;
    }



    // console.log('connection state..', state)
    dispatch({ type: "UPDATE_CONNECTION_STATUS", payload: customState });
    dispatch({ type: "UPDATE_CONNECTION_SYNC_TRIGGER", payload: "0" });
  };


  changeNavigation = (state) => {

    checkDb().then(res => {

      if (res == 0) {
        if (state.isInternetReachable) {
          navigation.navigate('sync');
        }else{
          // navigation.navigate('networkError');
        }
      }
    });


  }

  console.log('*****syncProcessStatus', syncProcessStatus, connectionStatus)



  return (
    <Tab.Navigator
      // tabBar={props =>
      //     <BottomTabBar {...props}
      //         state={{
      //             ...props.state,
      //             routes: _.filter(props.state.routes, r => ['store', 'mapview', 'storePhotos', 'contacts'].includes(r.name))
      //         }}>
      //     </BottomTabBar>
      // }
      screenOptions={({ route }) => ({
        tabBarButton: ["store", "mapview", "storePhotos", "contacts"].includes(
          route.name
        )
          ? undefined
          : () => {
            return null;
          },
      })}
      tabBarOptions={{
        style: {
          height: hp(8),
          //paddingTop: hp(1),
        },
      }}
      sceneContainerStyle={
        {
          // justifyContent:'space-between',
          // alignItems: 'space-between'
        }
      }
    >
      <Tab.Screen name="home" component={HomeScreen} />

      <Tab.Screen
        name="store"
        component={Store}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: wp("20"),
                height: hp("4"),
                alignItems: "center",
                justifyContent: "center",
                // marginLeft: '7%',
                // marginRight: '7%'
                marginTop: hp('1'),
              }}
              onPress={() => {
                navigation.navigate("home", {
                  screen: "findstore",
                });
              }}
            >
              <Image source={store} style={styles.footericonstore} />
              <Text style={styles.title2}>Store</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="allOrders"
        component={AllOrders}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: wp("20"),
                height: hp("4"),
                alignItems: "center",
                justifyContent: "center",
                marginTop: hp('1')
                // marginLeft: '7%',
                // marginRight: '7%'
              }}
              onPress={() => {


                navigation.navigate("home", {
                  screen: "allOrders",
                });
              }}
            >
              <Image source={allOrdersImage} style={styles.footericonmap} />
              <Text style={styles.title2}>All Orders</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="sync"
        component={SyncPage}
        options={{
          tabBarButton: (props) => (
            <View
              style={{
                width: wp("20"),
                height: hp("6"),
                alignItems: "center",
                justifyContent: "center",
                // marginLeft: '7%',
                // marginRight: '7%',
                // borderRadius: 100,
                // width: wp(10)
                zIndex: -9999,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  {
                    width: wp("6"),
                    height: wp("6"),
                    alignSelf: 'center',

                    // alignItems: "center",
                    // justifyContent: "center",
                    // // marginLeft: '7%',
                    //marginRight: '7%',
                    // position:'absolute',

                    backgroundColor: "#2CDC0B",
                    borderRadius: 100,
                    // width: wp(10)
                  },
                  connectionSyncTrigger
                    ? syncButtonStyle(connectionStatus, syncProcessStatus)
                    : syncButtonStyle(connectionStatus, syncProcessStatus),
                ]}
                onPress={() => {
                  navigation.navigate("home", {
                    screen: "sync",
                  });
                }}
              >
                <Image source={sync} style={styles.footericonsync} />
                <Text style={styles.synctitle}>Sync</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarPage"
        component={CalendarPage}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate("home", {
                  screen: "CalendarPage", time: Date.now()
                });
              }}
              style={{
                width: wp("20"),
                height: hp("4"),
                alignItems: "center",
                justifyContent: "center",
                marginTop: hp('1'),
                // marginLeft: '7%',
                // marginRight: '7%'
              }}
            >
              <Image source={cal} style={styles.footericoncal} />
              <Text style={styles.title2}>Calendar</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="contacts"
        component={Contacts}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: wp("20"),
                height: hp("4"),
                alignItems: "center",
                justifyContent: "center",
                marginTop: hp('1'),
                // marginLeft: '7%',
                // marginRight: '7%',
              }}
              onPress={() => {
                navigation.navigate("home", {
                  screen: "contacts",
                });
                // navigation.navigate("home", {
                //   screen: "vieworder",
                // });
              }}
            >
              <Image source={contact} style={styles.footericoncon} />
              <Text style={styles.title2}>Contacts</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name="product" component={ProductScreen} />
      <Tab.Screen name="findstore" component={FindStore} />
      <Tab.Screen name="carts" component={Cart} />
      <Tab.Screen name="productCategory" component={ProductCategory} />
      <Tab.Screen name="productSubcategory" component={ProductSubcategory} />
      <Tab.Screen name="productDetails" component={ProductDetails} />
      <Tab.Screen name="addressScreen" component={AddressScreen} />
      {/* <Tab.Screen name="productGrid" component={ProductGrid}/> */}
      <Tab.Screen name="storeNew" component={StoreNew} />
      <Tab.Screen name="productList" component={ProductList} />
      <Tab.Screen name="myProfile" component={MyProfile} />
      <Tab.Screen name="orderPad" component={OrderPad} />
      <Tab.Screen name="pictorial" component={PictorialForm} />




      <Tab.Screen name="vieworder" component={ViewOrder} />

      <Tab.Screen name="searchResult" component={SearchResult} />

      <Tab.Screen name="contactForm" component={ContactForm} />

      <Tab.Screen name="addStoreAddress" component={AddStoreAddress} />
      <Tab.Screen name="addNewPhotos" component={AddNewPhotos} />
      <Tab.Screen name="productGrid" component={ProductGrid} />

      <Tab.Screen name="storeContact" component={StoreContact} />
      <Tab.Screen name="storeContactForm" component={StoreContactForm} />
      <Tab.Screen name="storeAdresses" component={StoreAdresses} />
      <Tab.Screen name="viewContactNote" component={ViewContactNote} />

      <Tab.Screen name="billing" component={BillingScreen} />
      <Tab.Screen name="orderSummary" component={OrderSummary} />
      <Tab.Screen name="payment" component={PaymentScreen} />
      <Tab.Screen name="orderConfirmation" component={OrderConfirmation} />

      <Tab.Screen name="AddBillingAddress" component={AddBillingAddressScreen} />
      <Tab.Screen name="privacyPolicy" component={PrivacyPolicy} />

      <Tab.Screen name="addNewAppointment" component={AddNewAppointment} />
      <Tab.Screen name="calendar" component={CalendarPage} />
      <Tab.Screen name="editAppointment" component={EditAppointment} />

      <Tab.Screen name="productMainCategory" component={ProductMainCategory} />
      <Tab.Screen name="productSubFilterCategory" component={ProductSubFilterCategory} />
      <Tab.Screen name="productCategories" component={ProductCategories} />
      <Tab.Screen name="productSubcategories" component={ProductSubcategories} />

      <Tab.Screen name="BlanckPage" component={BlanckPage} />
      <Tab.Screen name="reportScreen" component={ReportScreen} />
      <Tab.Screen name="reportTableScreen" component={ReportTableScreen} />



    </Tab.Navigator>
  );
}


const mapStateToProps = (state) => {
  return {
    // expireDate: state.login.expiryDate,
    // fullName: state.login.fullName,
    // userRole: state.login.userRole,
    loginToken: state.login.loginToken,
    // categoryItem: state.home.categoryItem,
    // drawerCategoryItem: state.home.drawerCategoryItem,
    // subcategoryItem: state.home.subcategoryItem,
    // drawersubcategoryItem: state.home.drawersubcategoryItem,
    // titleName: state.home.titleName,
  };
};



export default connect(mapStateToProps, {
  logOut

})(FooterTabs);



