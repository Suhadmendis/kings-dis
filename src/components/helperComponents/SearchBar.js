import React, { useRef, Component, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  Dimensions,
  Keyboard,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";
import StyleSheet from "react-native-media-query";
import { useIsFocused } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import getValidToken from "../../operation/Token";
import getValidSearchList from "./SearchList";
import { widthPercentageToDP } from "react-native-responsive-screen";

import { store } from "../../../configureStore";
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CProc_WEB_GetProductsForSearchForAutoCompleteV1} from '../../offline/localData/serviceData/SP';
import {IsUserAnySOP, CategoriesNotAvailableForEndUsers} from "../../offline/Services/UserHelper";
import isTokenExpired from "../common/TokenOperation";
import { tokenLogOut } from "../../actions/HomeScreenAction";

async function getSearchLocalItems(query1, query2, IsBarcode, accNo){
  // console.log('qqqqqq');
  // console.log(...q);


  // const payload = {
  //   section: 'SKU SEARCH',
  //   opration: 'GET',
  //   data: query1
  // }

  // const newpro = await DataAdapter(payload);

  let sWhere = "";
  if (!IsUserAnySOP()) {
    sWhere = CategoriesNotAvailableForEndUsers()
      .map(cat => {
        return "Nav_Navigation NOT LIKE '" + cat + "/%' ";
      })
      .join(" AND ");
  }
  const newpro = await CProc_WEB_GetProductsForSearchForAutoCompleteV1(query1, query2, IsBarcode, accNo, sWhere)
console.log('fhijsdhbgsdb');

console.log(newpro);

  return newpro;
}

const MainSearchBar = (props) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [emptyTxt, setEmptyTxt] = React.useState(false);

  const navigation = useNavigation();
  const accNo = useSelector((state) => state.findStore.accCode);
  const token = useSelector((state) => state.login.loginToken);
  const unavailableItems1 = useSelector(s => s.checkout.unavailableItems)
  const connectionStatus = useSelector((state) => state.loading.connectionStatus);
  const textInput = useRef(null);


  const isFocused = useIsFocused();


  useEffect(() => {
    console.log('-----------------------------ghghghhg---');
    console.log(searchQuery);

    setData([]);
    setSearchQuery("")
  }, [isFocused])



  const onChangeSearch = (query) => {



    const tokenExpired = isTokenExpired();
    if (tokenExpired) {
      tokenLogOut();
    }



    setSearchQuery(query);
    if (query.length > 2) {
      getSearchList(query, token);
    } else {
      setData([]);
      setEmptyTxt(false)
    }
  };

  const emptyItemsList = () => {

    console.log(emptyTxt);
    console.log('searchQuery',searchQuery);
    if (searchQuery.length > 0) {
      return emptyTxt;
    }else{
      return false;
    }



  };


  function checkValidBarcode(result, txt) {

    if (result.length != 1) { return false; }

    if (isNaN(txt)) { return false;}

    if (parseInt(txt) > 1000000000) {
      return true;
    }else{
      return false;
    }

  }
  function getSearchList(query,tokenn) {
    async function getSearchListAsync(query, token) {
      // const token = await getValidToken();
     // const searchList = await getValidSearchList(token, query);
     //const searchList = await getSearchLocalItems();
      //here CodeTerm, TextTerm, IsBarcode, AccNo,
      let IsBarcode = false;
      let obj_lcl = [query, query, IsBarcode, accNo];

      let isConnected_ = false;

      isConnected_ = connectionStatus;

      if (isConnected_ == true) {
        const searchList = await getValidSearchList(tokenn, query);


        const isvalidBarcode = checkValidBarcode(searchList, query);
        console.log('isvalidBarcode', isvalidBarcode);

        if (isvalidBarcode) {
          textInput.current.clear();
          setEmptyTxt(false);
          setSearchQuery('')
          emptyItemsList();


          if (searchList[0].availability) {
            navigation.navigate("productDetails", {
              SkuId: searchList[0].id,
              product: searchList[0].code,
            });
          }else{
            showMessage({
              message: 'KINGS SEEDS',
              description: `Item is Unavailable`,
              type: 'warning',
              autoHide: true,
            });
            store.dispatch({
              type: 'SET_BILLING_INFO',
              payload: {
                unavailableItems: searchList[0].code.toString(),
              }
            });
            return;
          }
        }else{
          if (searchList.length == 0) {
            setEmptyTxt(true);
          } else {
            setEmptyTxt(false);
          }
        }
        console.log("api");
        console.log(searchList);

        if (!isvalidBarcode) {
          setData(searchList);
        }

      } else {
        getSearchLocalItems(query, query, IsBarcode, accNo).then((res) => {
          console.log('localItems================================');

          console.log(res);

          if (res.length == 0) {
            setEmptyTxt(true);
          } else {
            setEmptyTxt(false);
          }

          console.log('setEmptyTxt');
          console.log(res);
          const cutOff = 7;
          const loopCount = res.length > cutOff ? cutOff : res.length;

          let newres = [];
          for (let i = 0; i < loopCount; i++) {
            const element = res[i];
            console.log('fdfnusidbfnus');
            let availability = element.SKUAvailableItems > 0 ? true : false
            if (element.SKUEnabled != 1) {
              availability = false;
            }
            let obj = {
              count: i,
              availability,
              title: element.SKUName,
              id: element.SKUID,
              code: element.SKUNumber,
            }

            newres.push(obj)
          }


          const isvalidBarcode = checkValidBarcode(newres, query);
          console.log('isvalidBarcode', isvalidBarcode);
          if (isvalidBarcode) {
            textInput.current.clear();
            setEmptyTxt(false);
            setSearchQuery('')
            emptyItemsList();
            navigation.navigate("productDetails", {
              SkuId: newres[0].id,
              product: newres[0].code,
            });
          }else{
            if (res.length == 0) {
              setEmptyTxt(true);
            } else {
              setEmptyTxt(false);
            }
          }


          console.log('newres', newres);

          if (!isvalidBarcode) {
            setData(newres);
          }

        });
      }




    }

    getSearchListAsync(query, tokenn);
  }

  const { pageFlag } = props;

  return (
    <View
      style={
        pageFlag == "home" || data.length == 0
          ?[{position: "absolute", top: hp('-3'), width: '100%' } , wp('100') > 450 ? { top: hp('-2.3')} : null]
          : [{position: "absolute", top: hp('-3'), width: '100%' } , wp('100') > 450 ? { top:  hp('-2.3')} : null]
      }
    >

      <Searchbar
        autoCorrect={false}
        autoCapitalize={false}
        ref={textInput}
        // icon={({ size, color }) => (
        //   null
        // )}
        clearIcon={({ size, color }) => (
          <Icon name="clear" size={size} color="#000" onPress={()=> {
            textInput.current.clear()
            setData([]);
          }}/>
        )}
        inputStyle={[wp('100')< 450 ? {fontSize:hp('2.2'), padding:1} : null]}
        selectionColor="black"
        iconColor={colors.primaryColor}
        style={styles.searchbox}
        placeholder="Search"
        returnKeyType="done"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      {/* {
        data.length == 0 ? (
          <View
          style={{ width: wp('84'),zIndex: 9999, backgroundColor: "red", borderBottomLeftRadius: 10,
             height:50}}
          >

          </View>
        ): null
      } */}

      <View
        style={[{
          width: wp("85"),
          zIndex: 9999,
          backgroundColor: "white",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }, wp('100')< 450 ? {width:wp('80')} : null]}
      >


        {emptyItemsList() ? (
          <View
            style={{
              width: wp("84"),
              backgroundColor: "white",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height:hp('6'),
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <View
             style={{
              width: wp("80"),
              backgroundColor: "#fff3cd",
              height:hp('4'),
              justifyContent:'center',
              alignItems:'center',
              borderRadius:wp('1'),
              borderWidth:wp('0.2'),
              borderColor:'#ffeeba'
            }}
            >
            <Text
             style={{
            fontSize :hp('1.5'),
            color:'#856404'
            }}
            >No items to display</Text>
            </View>

          </View>
        ) : null}

        <FlatList
          data={data}
          renderItem={({ item }) => {
            if (item.count < 6) {
              return (
                <TouchableOpacity
                  style={styles.itemelement}
                  activeOpacity={1}
                  onPress={() => {

                    console.log('item.availability', item.availability);

                    if (item.availability) {
                      setSearchQuery(item.title);
                      setData([]);
                      if (Actions.currentScene !== "productDetails") {
                        setSearchQuery(item.title);
                        setData([]);
                        // Actions.productDetails({SkuId: item.id});

                        navigation.navigate("productDetails", {
                          SkuId: item.id,
                          product: item.code,
                        });
                      }
                    }else{
                      console.log(unavailableItems1);
                      showMessage({
                        message: 'KINGS SEEDS',
                        description: `Item is Unavailable`,
                        type: 'warning',
                        autoHide: true,
                      });
                      store.dispatch({
                        type: 'SET_BILLING_INFO',
                        payload: {
                          unavailableItems: item.code.toString(),
                        }
                      });


                    }

                  }}
                >
                  <Text style={styles.title}>
                    {item.code} -{" "}
                    {item.title.length < 60
                      ? `${item.title}`
                      : `${item.title.substring(0, 60)}...`}
                  </Text>
                </TouchableOpacity>
              );
            }

            if (item.count == 6) {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primaryColor,
                    padding: 12,
                    textAlignVertical: "center",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    console.log(searchQuery);
                    setData([]);
                    navigation.navigate("searchResult", {
                      searchQuery: searchQuery,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: hp("1.5"),
                    }}
                  >
                    See all results
                  </Text>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

// const Item = ({ title, code }) => {
//   return (

//   )
// };

// const renderItem = ({ item }) => (
//   <Item title={item.title} code={item.code} />
// );

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }
  render() {
    return (
      <View>
        <MainSearchBar pageFlag={this.props.pageFlag} />
      </View>
    );
  }
}

const { ids, styles } = StyleSheet.create({
  searchbox: {
    height: hp("4.5"),
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#F6F6F6",
    elevation: 0,
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
      borderWidth: 1.3,
    },
    "@media (max-width: 500px)": {
      height: hp("6"),
      borderWidth: 1,

    },
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemelement: {
   // backgroundColor: "red",
   zIndex: 1000,
    padding: 12,
    marginVertical: 1,
    marginHorizontal: 8,
    borderBottomWidth:1,
    borderColor:'#EEEEEE'
  },
  title: {
    fontSize: 16,
    color:colors.color_gray
  },
});

export default SearchBar;
