import React, { Component, useState, useEffect, memo } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Styles from "../style/StoreQuotesStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import moment from 'moment';

import WarningMessage from "./common/WarningMessage";

import * as colors from "../style/Common/ColorsStyle"

import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DataAdapter from "../offline/localData/DataAdapter";
import { momentUKLocal, momentUTSLocal } from "./common/DateTimeGeneration";


const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");


const listTabVals_ = [
  {
    status: "All",
    val: 0,
  },
  {
    status: "New",
    val: 1,
  },
  {
    status: "Edited",
    val: 2,
  },
  {
    status: "Approved",
    val: 3,
  },
  {
    status: "Emailed",
    val: 4,
  },
  {
    status: 'Processed',
    val: 5,
  }
];

const StoreQuotes = ({ navigation }) => {



  const [token, setToken] = useState("blank");
  const [loading, setLoading] = useState(true);
  const [buttonTab, setButtonTab] = useState(0);

  const [quotes, setQuotes] = useState([]);
  const isFocused = useIsFocused();
  const setTabFilter = (tabVal) => {
    setButtonTab(tabVal);
  };

  const customerID = useSelector(
    (state) => state.findStore.adminCustomerID
  );
  const tokn = useSelector((state) => state.login.loginToken);
  useEffect(() => {

    setToken(tokn);

    console.log('effect ..................................');


    getQuoteOrderedRefs().then(refids => {
      initial().then(res => {


        res = res.map(quote =>{


          console.log('====================================');
          console.log('120000000000 ',quote.ItemQuoteLabel);
          console.log('130000000000 ',quote.ItemShoppingCartID);
          console.log('====================================');

        const count = refids.filter(refid => refid.OrderQuoteID == quote.ItemID);

        if (count.length > 0) {
          quote.Status = 'Ordered';
        }


          return quote;


        })


        setQuotes(res);




      });

      });





  }, [isFocused]);

  const ListItem = memo(({ item }) => {
    console.log('Rendering item:', item.id); // For debugging
    if (buttonTab == 0) { // all orders
      return <FilteredContent object={item} />;
    }

    if (buttonTab == 1) {
      if (item.Status == 'new') {
        return <FilteredContent object={item} />;
      }
    }

    if (buttonTab == 2) {
      if (item.Status == 'edited') {
        return <FilteredContent object={item} />;
      }
    }

    if (buttonTab == 3) {
      if (item.Status == 'approved') {
        return <FilteredContent object={item} />;
      }
    }


    if (buttonTab == 4) {
      if (item.Status == 'emailed') {
        return <FilteredContent object={item} />;
      }
    }

    if (buttonTab == 5) {
      if (item.Status == 'processed') {
        return <FilteredContent object={item} />;
      }
    }

  });
  const renderItem = ({ item }) => <ListItem item={item} />;
  // const renderItem = ({item}) => {
  //   // return (
  //     // item.map((e) => {







  //     // })
  //   // )
  // }

   // main operation - get data
   async function initial(){

    const payload = {
      section: 'QUOTE',
      opration: 'GET',
      data: { customerID }
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }

  async function getQuoteOrderedRefs(){

    const payload = {
      section: 'QUOTE',
      opration: 'GET QUOTE ORDERED REFS',
      data: { customerID }
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  function FilteredContent(props) {

    let e = props.object;



    return (
      <View style={Styles.footerCardView} key={e.ShoppingCartID} >
      <View style={Styles.cartItemTextView}>
        <View style={Styles.cardTxtView1}>
          <Text style={Styles.cardTxt} allowFontScaling={false}>
            {e.ItemQuoteLabel}
          </Text>
          <Text style={Styles.cardSubMainTxt} allowFontScaling={false}>
          { momentUKLocal(e.ItemCreatedWhen) }
          </Text>
        </View>
        <View style={Styles.subView}>
          <Text style={Styles.subcardTxt} allowFontScaling={false}>
           { buttonTab == 0 ? capitalizeFirstLetter(e.Status) : '' }


          </Text>
        </View>
        <View style={Styles.subView}>
          <Text style={Styles.subcardTxtPrice} allowFontScaling={false}>
            £{e.ItemQuoteTotal.toFixed(2)}
          </Text>
        </View>
        <View style={Styles.iconView}>
          <TouchableOpacity activeOpacity={0.9} style={Styles.eyeBtn}
          onPress={() => {
            // this.props.navigation.navigate('storeCartsView')

             navigation.navigate('storeNew', { tab: 3, subTabVal: "viewQuotes", quoteId: e.ItemShoppingCartID, quoteName: e.ItemQuoteLabel, status: e.Status });
           }}
          >
            <Image source={viewicon} style={Styles.cardImg} />
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={0.9} style={Styles.ashBtn}>
            <Image source={edticon} style={Styles.cardImg} />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
    )


  // );
  }

  const _selectcontent = (itm) => {

    let array = [];

    let el_ = _.find(listTabVals_, {val: buttonTab}) ?? null;

    _.forEach(itm, function (a) {
      if (a.Status == el_.status.toLocaleLowerCase()) {
        array.push(a);
      }
    });



    if(buttonTab !== 0 && array.length ==0){
      return(
        <WarningMessage/>
      )

    }else{
      return (
        itm.map((e) => {


          if (buttonTab == 0) { // all orders
            return <FilteredContent object={e} />;
          }

          if (buttonTab == 1) {
            if (e.Status == 'new') {
              return <FilteredContent object={e} />;
            }
          }

          if (buttonTab == 2) {
            if (e.Status == 'edited') {
              return <FilteredContent object={e} />;
            }
          }

          if (buttonTab == 3) {
            if (e.Status == 'approved') {
              return <FilteredContent object={e} />;
            }
          }


          if (buttonTab == 4) {
            if (e.Status == 'emailed') {
              return <FilteredContent object={e} />;
            }
          }

          if (buttonTab == 5) {
            if (e.Status == 'processed') {
              return <FilteredContent object={e} />;
            }
          }





        })

      )
    }

    // if (itm.staus == 'NEW') {
    //   <FilteredContent Items={itm} />
    // }

  };

  return (
    <View style={{ flex: 1 }}>
      <View style={Styles.container}>

        <View style={Styles.titleButtonView}>
          <View style={Styles.buttonView}>
            {listTabVals_.map((e) => (
              <View style={Styles.buttonView1}>
                <TouchableOpacity activeOpacity={0.9}
                  style={[
                    sty.tabButton,
                    buttonTab === e.val && sty.tabButtonActive,
                  ]}
                  onPress={() => setTabFilter(e.val)}
                >
                  <Text
                    style={[
                      sty.textStyle,
                      buttonTab === e.val && sty.textStyleActive,
                    ]}
                  >
                    {e.status}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
{
            quotes.length != 0 ?
            // _selectcontent(quotes)
            <View style={{
              width: "100%",
              height:'80%',
            }}>
<FlatList
            data={quotes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={10}
            windowSize={6}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={() => (
            //   <View style={{ width: '100%', height: 20, marginBottom: 10 }}>
            //     {loader && <ActivityIndicator size="large" color="#1ED18C" />}
            //   </View>
            // )}
          />
            </View>
             :
            (
              <WarningMessage/>
            )
          }
            {/* {buttonTab == 0
            ? _selectcontent(contactDetails_)
            : buttonTab == 1
            ? _selectcontent(contactDetails_new)
            : buttonTab == 2
            ? _selectcontent(contactDetails_processed)
            : buttonTab == 3
            ? _selectcontent(contactDetails_edited)
            : _selectcontent(contactDetails_email)}  */}
        {/* </ScrollView> */}
      </View>

    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    adminCustomerID: state.findStore.adminCustomerID
  };
};
export default connect(mapStateToProps, {})(StoreQuotes);

let widthper = wp("100%");

let crd_wdth = 0;
let txt_size = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("75");
  txt_size = wp("3");
} else {
  crd_wdth = wp("65");
  txt_size = wp("2.1");
}

const sty = StyleSheet.create({
  tabButtonActive: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: hp("3.5"),
    width: "98%",
    backgroundColor: colors.primaryColor,
  },
  textStyleActive: {
    color: "white",
    textAlign: "center",
    fontSize: txt_size,
  },
  tabButton: {
    borderRadius: wp("2.1"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("4"),
    width: "98%",
  },
  textStyle: {
    color: "#979797",
    textAlign: "center",
    fontSize: txt_size,
  },
});
