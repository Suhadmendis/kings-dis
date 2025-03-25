import React from 'react';
import { Image, View, TouchableOpacity, Text,useWindowDimensions  } from 'react-native';

import HomeScreen from "../components/HomeScreen";
import ProductScreen from "../components/ProductScreen";

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
import MyProfile from "../components/MyProfile";

import Store from "../components/Store";
import StoreNew from "../components/StoreNew";
import OrderPad from "../components/OrderPad";
import SearchResult from "../components/SearchResult";
import ContactForm from "../components/ContactForm";
import AddStoreAddress from "../components/AddStoreAddress";
import StorePhotos from "../components/StorePhotos";
import AddNewPhotos from "../components/AddNewPhotos";


import StoreContact from "../components/StoreContact";
import StoreContactForm from "../components/StoreContactForm";
import StoreAdresses from "../components/StoreAdresses";

import { connect, useDispatch } from 'react-redux';
import { logOut } from '../actions/AuthActions';
import {
      getsubCategories,
      getSelectedTileTxt,
      getFilters,
      getFilterData,
      getsubCategoriesDrawer,
    } from "../actions/HomeScreenAction";
import { UpdateProfileDetails } from "../actions/MyProfileAction";
import { getData } from "../actions/LoginScreenAction";

import DrawerMenu from "../components/common/DrawerMenu";

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { screenOptions } from "../components/common/NewHeader";
import FooterTabs from './FooterTabs';

const homeActiveIcon = require("../assets/home.png");
const homeInactiveIcon = require("../assets/home-black.png");
const fetherActiveIcon = require("../assets/plant-green.png");
const fetherInactiveIcon = require("../assets/plant.png");

const Drawer = createDrawerNavigator();



const DrawerNav = (props) => {

      const homeImageStyle = { marginLeft: 15, width: 15, marginTop: -5 };
      const fetherImageStyle = { marginLeft: 16, width: 11, marginTop: -5 };

      const dimensions = useWindowDimensions();

      const isLargeScreen = dimensions.width >= 450;

      const categories = props.drawerCategoryItem;
      
      

    return (
            <Drawer.Navigator
            // drawerWidth={wdth}
            // component={DrawerContent}
            // drawerPosition="left"
            // name="drawerContent"
            // drawerContent={(props) => <CustomDrawer {...props} />}
            drawerStyle={isLargeScreen ? { width: '50%' } : { width: '70%' }}
            drawerContentOptions={{
                  
                  labelStyle: {
                        fontSize: 12,
                        marginTop: -5,
                      },
                  itemStyle: { height: 35, padding:0, marginTop: -3 },
                }}
            initialRouteName="home"
            screenOptions={screenOptions}
            drawerContent={(props)=>{
                  return <DrawerMenu {...props} />
            }}
            >

                  <Drawer.Screen options={{
                       drawerContentStyle: { marginTop: 200 }, 
                  drawerLabel: 'Home',
                  drawerIcon: ({ focused }) => {
                        return focused ? <Image source={homeActiveIcon} resizeMode={'contain'} style={homeImageStyle} /> : <Image source={homeInactiveIcon} resizeMode={'contain'} style={homeImageStyle} />
                  }
                  }} 
                  name="home" component={FooterTabs} />
                  


            </Drawer.Navigator>
      );
}


const mapStateToProps = (state) => {
      return {
        expireDate: state.login.expiryDate,
        fullName: state.login.fullName,
        userRole: state.login.userRole,
        loginToken: state.login.loginToken,
        categoryItem: state.home.categoryItem,
        drawerCategoryItem: state.home.drawerCategoryItem,
        subcategoryItem: state.home.subcategoryItem,
        drawersubcategoryItem: state.home.drawersubcategoryItem,
        titleName: state.home.titleName,
      };
    };
  export default connect(
      mapStateToProps,
      {
          logOut,
          getsubCategories,
          getSelectedTileTxt,
          getFilters,
          getFilterData,
          getsubCategoriesDrawer,
          UpdateProfileDetails,
          getData,
      }
  )(DrawerNav)