import React, { Component, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";
import StyleSheet from "react-native-media-query";
import DeviceInfo from "react-native-device-info";

import getValidToken from "../../operation/Token";
import getValidSearchList from "./SearchList";
import { widthPercentageToDP } from "react-native-responsive-screen";

import NetInfo from "@react-native-community/netinfo";
const windowWidth = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import DataAdapter from "../../offline/localData/DataAdapter"
import { connect, useSelector } from "react-redux";
import * as colors from '../../style/Common/ColorsStyle'

import {CProc_WEB_GetProductsForSearchForAutoCompleteV1} from '../../offline/localData/serviceData/SP';
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../../offline/Services/UserHelper";
import { createPath } from "react-router-dom";


const BreadCrumb = (props) => {
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const [data, setData] = React.useState([]);
  // const [emptyTxt, setEmptyTxt] = React.useState(false);

  const navigation = useNavigation();
  const accNo = useSelector((state) => state.findStore.accCode);


  let isTablet = DeviceInfo.isTablet();

  const { catalogue, department, category, group, subCategory, upto } = props;

  const aliasPath = createAliasPath(props, upto);


  if (isTablet) {
    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
         
        { upto > -1 ? (
          
          
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('home')}
            >
              <Text 
                style={[styles.categoryText, upto == -1 ? { color: colors.primaryColor}: {}]}
              >{ 'Home' }</Text>
          </TouchableOpacity>
          
        ) : null }

        { upto > -1 ? (
          <>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.categoryText}>{ '  /  ' }</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {

              

              navigation.navigate('productCategories', { categoryName: catalogue, categoryAlias: createAliasPath(props, 0) })
            }}
          >
            <Text 
              style={[styles.categoryText, upto == 0 ? { color: colors.primaryColor}: {}]}
            >{ catalogue }</Text>
          </TouchableOpacity>
          </>
        ) : null }
  
        { upto > 0 ? (
          <>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.categoryText}>{ '  /  ' }</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => {


                navigation.navigate('productSubcategories',{ categoryName: department, categoryAlias: createAliasPath(props, 1)})
              }}
            >
              <Text 
                style={[styles.categoryText, upto == 1 ? { color: colors.primaryColor}: {}]}
              >{ department }</Text>
            </TouchableOpacity>
          </>
        ) : null }
  
        { upto > 1 ? (
          <>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.categoryText}>{ '  /  ' }</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => {
                console.log('====================================');
                // console.log({ categoryName: category, subcatNodeAliasPath: createAliasPath(props, 2) });
                console.log('====================================');


                navigation.navigate('productSubFilterCategory',{ categoryName: category, subcatNodeAliasPath: createAliasPath(props, 2) })
              }}
            >
              <Text 
                style={[styles.categoryText, upto == 2 ? { color: colors.primaryColor}: {}]}
              >{ category }</Text>
            </TouchableOpacity>
          </>
        ) : null }
        
        { upto > 2 ? (
          <>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.categoryText}>{ '  /  ' }</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => {

                navigation.navigate('productGrid', { subcatName: subCategory, subcatNodeAliasPath: createAliasPath(props, 3) })
              }}
            >
              <Text 
                style={[styles.categoryText, upto == 3 ? { color: colors.primaryColor}: {}]}
              >{ subCategory }</Text>
            </TouchableOpacity>
          </>
        ) : null }
  
      </View>
      </View>
    );  
  }else{
    return null;
  }
};

function createAliasPath(pathObject,upto) {
  console.log('====================================');
  console.log(upto);
  console.log('====================================');
  let path = '';
  if (upto == 0) {
    path = `${pathObject.catalogue}`;      
  }
  if (upto == 1) {
    path = `${pathObject.catalogue}/${pathObject.department}`;      
  }

  if (upto == 2) {
    path = `${pathObject.catalogue}/${pathObject.department}/${pathObject.category}`;  
  }
  
  if (upto == 3) {
    path = `${pathObject.catalogue}/${pathObject.department}/${pathObject.category}/${pathObject.group}/${pathObject.subCategory}`;  
  }
  
  return path;

}


const { ids, styles } = StyleSheet.create({
  mainView: {
    width: "94%",
    height: hp("3.7"),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2%"),
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
     marginTop:hp('2'),
     marginBottom:hp('1'),
     height: hp("6"),
    },
    
  },
  container: { 
    flex: 1,
    flexDirection: 'row',
    
  },
  categoryText: {
    fontSize:hp('1.4'),
    color:colors.tertiaryColor,
    textTransform: 'capitalize'
  }
  
});



const mapStateToProps = state => {
  return {
     loginToken: state.login.loginToken,
    // categoryItem: state.home.categoryItem,
  };
};



export default connect(
  mapStateToProps, {
    
  },
)(BreadCrumb);
