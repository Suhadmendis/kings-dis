import React from "react";
// import { ActionConst, Router, Stack.Screen } from "react-native-router-flux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import SplashScreen from "../components/SplashScreen";
import SignInScreen from "../components/SignInScreen";
import SignUpScreen from "../components/SignUpScreen";
import NetworkErrorScreen from "../components/NetworkErrorScreen";

import DrawerContent from "../components/common/DrawerContent";
import CartScreen from "../components/CartScreen";
import SystemViewer from "../components/SystemViewer";





import ContactNotes from "../components/ContactNotes";
import AddContactNote from "../components/AddContactNote";








import StoreCarts from "../components/StoreCarts";
import StoreQuotes from "../components/StoreQuotes";
import ViewContactNote from "../components/ViewContactNote";
import StoreCartsView from "../components/StoreCartsView";
import BlanckPage from "../components/BlanckPage";
import AllOrders from "../components/AllOrders";
import ViewOrder from "../components/ViewOrder";




import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import { screenOptions } from "../components/common/NewHeader";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from '@react-navigation/native';

import DrawerNav from './DrawerNav';

import { navigationRef } from '../navigation/RootNavigation';


const menu = require("../assets/menu.png");
const cart = require("../assets/shopping-cart.png");

const MyTransitionSpec = {
  duration: 600,
};

let widthper = wp('100%');
let wdth = 0;
if (widthper <= 500.0) {
  wdth = wp('70')
} else {
  wdth = wp('45')
}

const Stack = createNativeStackNavigator();

const RouterComponent = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="loading"
        // hideNavBar={true}
        // transitionConfig={transitionConfig}
        // headerMode={false}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="loading" component={SplashScreen} />
        <Stack.Screen name="networkError" component={NetworkErrorScreen} />
        <Stack.Screen name="signIn" component={SignInScreen} />
        <Stack.Screen name="signUp" component={SignUpScreen} />
        {/* <Stack.Screen name="cart" component={CartScreen} /> */}
        <Stack.Screen name="contactNotes" component={ContactNotes} />
        <Stack.Screen name="addContactNote" component={AddContactNote} />
        <Stack.Screen name="viewContactNote" component={ViewContactNote} />
        <Stack.Screen name="storeQuotes" component={StoreQuotes} />
        <Stack.Screen name="storeCarts" component={StoreCarts} />
        <Stack.Screen name="storeCartsView" component={StoreCartsView} />
        <Stack.Screen name="blanckPage" component={BlanckPage} />
        <Stack.Screen name="systemViewer" component={SystemViewer} />
        <Stack.Screen name="allOrders" component={AllOrders} />
        <Stack.Screen name="ViewOrder" component={ViewOrder} />
        <Stack.Screen
          name="drawer"
          component={DrawerNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RouterComponent;
