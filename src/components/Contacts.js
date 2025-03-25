import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from "react-native";
import Styles from "../style/ContactsStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import { getViewType } from "../actions/ContactAction";
import NumericInput from "react-native-numeric-input";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import _ from "lodash";

import openDatabaseService from "../offline/Config";
import DataAdapter from "../offline/localData/DataAdapter";

import {GetTradeStoresLocal} from '../offline/localData/serviceData/GetTradeStoresLocal'

import CustomSpinner from "./common/CustomSpinner";
import { store } from "../../configureStore";
import { Searchbar } from "react-native-paper";

import {GetAddressDisplay} from '../offline/Services/AddressInfoProvider';

import { LocaleConfig } from "react-native-calendars";
const search = require("../assets/search-green.png");
const searchCloseBtn = require("../assets/search-close-btn.png");

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/Contacts/telephone2x.png");
const smsicon = require("../assets/Contacts/messagesquare2x.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");

const db = openDatabaseService();

const { ids, styles } = Styles;

let numLines = 1;
if (wp("100") > 500) {
  numLines = 2;
} else {
  numLines = 1;
}

async function initialApi(contactParams) {
  const payload = {
    section: "API CONTACTS",
    opration: "GET",
    data: contactParams,
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function initial() {
  const payload = {
    section: "LOCAL CONTACTS",
    opration: "GET",
    data: { type: "ALL", adminCustomerID: "" },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

async function deleteContact(id) {
  const payload = {
    section: "LOCAL CONTACTS",
    opration: "DELETE",
    data: { id },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}


async function initialLocalContacts(searchTerm) {
  let res = await GetTradeStoresLocal(searchTerm,0,0)
  let contacts =[];
  if(res != []){
    for (let i = 0; i < res.length; i++) {
      const e = res[i];



      let obj = {
        id:i,
        name:e.tradeAccountName,
        address:e.addressDisplay,
        phone:e.addressPhone,
        email:e.adminCustomerEmail
      }
      contacts.push(obj)
    }
  }
  return contacts;
}

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      searchQuery: "",
      contacts: [],

      searching: false,
      searchResData: [],
      no_search_items: false,
      searchText: "",

      //lazy loading
      currentPage: 1,
      pagesize: 2500,
      searchTerm: "",
      setLoading: false,

      offlineUseableContacts: [],
      connectionAvailable: true
    };
  }


  getcontactList= async()=>{
    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;



    if(internetConnectivity){
      let contactParams = {
        currentPage: this.state.currentPage,
        pagesize: this.state.pagesize,
        searchTerm: this.state.searchTerm,
      };

      
      initialApi(contactParams).then((res) => {



        initial().then((resLocal) => {


          const allContacts = resLocal.map(contact =>{

            res.push(contact);
          })
         
          // console.log(res);
          this.setState({ contacts: res });
          this.setState({ offlineUseableContacts: res });
       
        });
      });
    }else{
      let res= [];
       res = await initialLocalContacts(this.state.searchTerm,0,0);



       let resLocal = [];
       resLocal = await initial();       

       let resCount = res.length;
      
      if(resLocal.length > 0){
        
        for (let i = 0; i < resLocal.length; i++) {
         
          const e = resLocal[i];
          
          let addressDisplay = GetAddressDisplay(e.addressLine1, e.addressLine2, e.addressLine3, "",e.city, e.postCode, e.country);
          // console.log('resCount is ');
          let obj = {
            id:resCount,
            name:e.name,
            address:addressDisplay,
            phone:e.phone,
            email:e.email
          }
          
          res.push(obj)
          resCount++;
        }
      }
      
      this.setState({ contacts: res });
      this.setState({ offlineUseableContacts: res });
      // let resLocal = await initial();

   


      // initialLocalContacts(this.state.searchTerm,0,0).then(res => {



      //   initial().then((resLocal) => {
      //     // console.log(res);
      //     console.log(resLocal.length);
      //     const allContacts = resLocal.map(contact =>{

      //       res.push(contact);
      //     })

      //     this.setState({ contacts: res });
      //   });
      //   // this.setState({ contacts: res });
      // });
    }
  }

  componentDidMount() {
    console.log('serach list contact did mount');
    let state = store.getState();
    let internetConnectivity = state.loading?.connectionStatus;

    if(internetConnectivity == false){
      this.setState({
        connectionAvailable : false
      })
    }
console.log('7878787887878 ',this.state.contacts);
   this.getcontactList();
   
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused  !== this.props.isFocused ) {
      let state = store.getState();
      let internetConnectivity = state.loading?.connectionStatus;

      if(internetConnectivity == false){
        this.setState({
          connectionAvailable : false
        })
      }

     this.getcontactList();
    }

  }




  searchInnerContainer=async (t)=> {
    // let state = store.getState();
    // let internetConnectivity = state.loading?.connectionStatus;
    let text = t.toLowerCase()
    if (text.length >= 3) {
      this.setState({
        searching: true,
        searchText: text,
        searchResData: [],
      });

      let contactParams = {
        currentPage: 0,
        pagesize: this.state.pagesize,
        searchTerm: text,
      };

      let state = store.getState();
      let internetConnectivity = state.loading?.connectionStatus;

      if(internetConnectivity){
        let res = [];
        res = await initialApi(contactParams);
        let reslocal = [];
        reslocal = await initial();
        if(reslocal.length != 0){
          _.find(reslocal, function(obj) {
            if (obj.name.toLowerCase().includes(text)) {
              res.push(obj);
            }else if(obj.address != null){
              if(obj.address.toLowerCase().includes(text)){
                res.push(obj);
              }
            } else if(obj.phone != null){
              if(obj.phone.includes(text)){
                res.push(obj);
              }
            }
        });
        }




          this.setState({
            searchResData: res,
          });
          if (this.state.searchResData.length == 0) {
            this.setState({
              no_search_items: true,
            });
          } else {
            this.setState({
              no_search_items: false,
            });
          }

      }else{

        this.setState({ contacts: [] });

        let keyword = t.toLowerCase();

        const results = this.state.offlineUseableContacts.filter(contact => {

          let contactNumber;

          if (contact.phone != null) {
            contactNumber = contact.phone.toString();
          }else{
            contactNumber = '';
          }
          if (contact.address.toLowerCase().includes(keyword)) { return contact; }
          if (contact.email.toLowerCase().includes(keyword)) { return contact; }
          if (contact.name.toLowerCase().includes(keyword)) { return contact; }
          if (contactNumber.toLowerCase().includes(keyword)) { return contact; }

        });


        this.setState({ contacts: results });


        if (results.length == 0) {
          this.setState({
            no_search_items: true,
          });
        } else {
          this.setState({
            no_search_items: false,
          });
        }

        // let newsearcharray = []
        // _.find(this.state.contacts, function(obj) {
        //     if (obj.name.toLowerCase().includes(text)) {
        //         newsearcharray.push(obj);
        //     }else if(obj.address != null){
        //       if(obj.address.toLowerCase().includes(text)){
        //         newsearcharray.push(obj);
        //       }
        //     } else if(obj.phone != null){
        //       if(obj.phone.includes(text)){
        //         newsearcharray.push(obj);
        //       }
        //     }
        // });

        //    this.setState({
        //      searchResData: newsearcharray,
        //    });

        //    if (this.state.searchResData.length == 0) {
        //      this.setState({
        //        no_search_items: true,
        //      });
        //    } else {
        //      this.setState({
        //        no_search_items: false,
        //      });
        //    }



      }



    } else {

      this.setState({ contacts: this.state.offlineUseableContacts });


      this.setState({
        no_search_items: false,
        searchTerm: "",
        searchResData: [],
      });


     }
  }

  // main operation - get delete
  generateDelete = (id) => {
    deleteContact(id).then((res) => {
      if (res == 1) {
        initial().then((res) => {
          this.setState({ contacts: res });
        });
      }
    });
  };

  onPressAdd() {
    this.props.getViewType("Addcontact");
    this.props.navigation.navigate("contactForm", {
      viewtype: "Addcontact",
      method: this.reloadData,
    });
  }
  onPressEdit = (id) => {
    this.props.getViewType("Editcontact");
    this.props.navigation.navigate("contactForm", {
      viewtype: "Editcontact",
      id,
    });
  };
  onPressView = (id) => {
    this.props.getViewType("Viewcontact");
    this.props.navigation.navigate("contactForm", {
      viewtype: "Viewcontact",
      id,
    });
  };
  onPressNotes() {
    this.props.navigation.navigate("contactNotes");
  }

  renderRow = ({item}) => {

   

    return (
      <View style={styles.footerCardView} key={item.id}>
        <View style={styles.cartItemTextView}>
          <View style={styles.cardTxtView1}>
            <Text style={styles.cardTxt} allowFontScaling={false}>
              {item.name}
            </Text>
            <Text
              style={styles.cardSubMainTxt}
              allowFontScaling={false}
              numberOfLines={numLines}
              ellipsizeMode="tail"
            >
              {item.address}
            </Text>
          </View>

          <View style={styles.subcontainView}>
            <View style={styles.subView}>
              <Text style={styles.subcardTxt} allowFontScaling={false}>
                {item.phone}
              </Text>
              <Text style={styles.emailTxt} allowFontScaling={false}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
                {item.email}
              </Text>
            </View>
            <View style={styles.iconView}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.eyeBtnLeft}
                onPress={() => {
                  Linking.openURL(`tel:${item.phone}`);
                }}
              >
                <Image source={telicon} style={styles.cardImg} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  Linking.openURL(`sms:${item.phone}`);
                }}
                style={styles.eyeBtn}
                // onPress={()=>  Actions.contactNotes()}
              >
                <Image source={smsicon} style={styles.cardImg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <CustomSpinner/> */}
        <View style={styles.container}>
          <Back />

          <View style={styles.titleView}>
            <View style={styles.contactTitle}>
              <Text style={styles.titleTxt} allowFontScaling={false}>
                Contacts
              </Text>
            </View>
          </View>
          <View style={styles.searchView}>
            <View style={styles.searchInput}>
              <Image source={search} style={styles.searchIcon} />
              <TextInput
                allowFontScaling={false}
                style={styles.TxtInputSearch}
                onChangeText={(text) => {
                  this.setState({ searchQuery: text });
                  this.searchInnerContainer(text);
                }}
                value={this.state.searchQuery}
              />
               <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.setState({ searchQuery: "" });
                    this.searchInnerContainer('');
                    initialApi().then((res) => {
                      // this.setState({ contacts: res });
                      this.setState({ contacts: res });
                    });
                  }}
                >
                  <Image
                    source={searchCloseBtn}
                    style={styles.searchCloseIcon}
                  />
                </TouchableOpacity>
              {/* {this.state.searchQuery != "" ? (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.setState({ searchQuery: "" });
                    this.searchInnerContainer('');
                    initialApi().then((res) => {
                      // this.setState({ contacts: res });
                      this.setState({ contacts: res });
                    });
                  }}
                >
                  <Image
                    source={searchCloseBtn}
                    style={styles.searchCloseIcon}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.searchCloseIcon}></View>
              )} */}
            </View>
          </View>

          { this.props.isFocused ? (
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", marginBottom: hp("2%") }}
          >
              {this.state.contacts.length == 0 ? 
                  <View style={{width:'100%',height:40,alignItems:'center',marginTop:10}}>
                  <ActivityIndicator size="small" color="#1ED18C" />
                  <Text>Please Wait</Text>
                  </View>:null}
            {this.state.searchResData.length === 0 &&
                this.state.no_search_items === false ? (
                  <FlatList
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
                  style={styles.flatlist}
                  data={this.state.contacts}
                  renderItem={(item) => this.renderRow(item)}
                  keyExtractor={(item, index) => String(index)}
                  onEndReachedThreshold={0.5}
                />
                ) : this.state.searchResData.length === 0 &&
                  this.state.no_search_items === true ? (
                  <View style={{ width: wp("92%") }}>
                    <View style={styles.footerCardViewno}>
                      <Text
                        style={styles.cardSubTxtno}
                        allowFontScaling={false}
                      >
                        No items to display
                      </Text>
                    </View>
                  </View>
                ) : (
                  <FlatList
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
                  style={styles.flatlist}
                  data={this.state.searchResData}
                  renderItem={(item) => this.renderRow(item)}
                  keyExtractor={(item, index) => String(index)}
                  onEndReachedThreshold={1}
                />
                )}

          </ScrollView>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}


function ContactWrapper(props) {
  const isFocused = useIsFocused();
  return <Contacts {...props} isFocused={isFocused} />;


}



const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,

  };
};

export default connect(mapStateToProps, {
  getViewType,
})(ContactWrapper);
