import React, { Component } from "react";
import {
  View,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Styles from "../../style/FooterStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import  NetInfo from '@react-native-community/netinfo';

import Main from '../../offline/Main';


const store = require("../../assets/store_res.png");
const map = require("../../assets/mapres.png");
const cal = require("../../assets/calendar_res.png");
const contact = require("../../assets/contact_res.png");
const sync = require("../../assets/sync.png");

const refreshsync = require("../../assets/refresh-sync.png");
const ordersync = require("../../assets/order.png");
const imagesync = require("../../assets/image.png");
const groupsync = require("../../assets/Group-product.png");

class Footer extends Component {

  NetInfoSubscribtion = null;

  constructor(props) {
    super(props);
    this.state = {
      isShowSyncOptions: false,
      connection_status: false,
      syncProcessStatus: false,
      connection_sync_trigger: '0',
    }
  }

  componentDidMount() {
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this._handleConnectivityChange,
    )
  }


  componentWillUnmount() {
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
  }

  _handleConnectivityChange = (state) => {

    this.setState({ connection_status: state.isConnected });
    this.setState({ connection_sync_trigger: '0' });
  }


  startChangeStatus = () => {

    this.state.syncProcessStatus = true;
    this.setState({ connection_sync_trigger: '0' });
  }

  endChangeStatus = () => {
    this.state.syncProcessStatus = false;
    this.setState({ connection_sync_trigger: '0' });


  }

  syncButtonStyle = function (con_status, sync_status) {
    if (con_status) {

      if (sync_status) {
        return Styles.footericonSyncView_sync;
      } else {
        return Styles.footericonSyncView;
      }

    } else {
      return Styles.footericonSyncView_off;
    }

  }


  renderSyncOptions() {
    if (this.state.isShowSyncOptions) {
      return (

        <View style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 0,
          left: 0,
          bottom: hp("6"),
          backgroundColor: "#f7faf8",
          padding: 20,

          shadowColor: "black",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: -3,
          shadowRadius: 2,
          elevation: hp('3'),
          height: hp("8"),
        }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.9}
              style={{
                height: hp("5"),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                this.props.navigation.navigate('findstore');
              }}
            >
              <View style={Styles.button}>
                <Image source={refreshsync} style={Styles.buttonIcon} />
                <Text style={{marginLeft:10}}>Full Sync</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.9}
              style={{
                height: hp("5"),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                this.props.navigation.navigate('mapview');
              }}
            >
              <View style={Styles.button}>
                <Image source={groupsync} style={Styles.buttonIcon} />
                <Text style={{marginLeft:10}}>Product Sync</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.navigate('storePhotos');
              }}
              style={{
                height: hp("5"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={Styles.button}>
                <Image source={ordersync} style={Styles.buttonIcon} />
                <Text style={Styles.buttonText}>Order Sync</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.9}
              style={{
                height: hp("5"),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                this.props.navigation.navigate('contacts');
              }}
            >
              <View style={Styles.button}>
                <Image source={imagesync} style={Styles.buttonIcon} />
                <Text style={{marginLeft:10}}>Image Sync</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }


  render() {

 

    return (
      <View
        style={{
          flex: 1,
          // flexDirection: "row",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          //justifyContent: "space-around",
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "white",
          padding: 20,

          shadowColor: "black",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: -3,
          shadowRadius: 2,
          elevation: hp('3'),

          // shadowColor: "#EDEDED",
          // shadowOffset: { width: 0, height: 12 },
          // shadowOpacity: 5,
          // shadowRadius: 3,
          // elevation: 9,
          height: hp("6"),
        }}
      >
        {this.renderSyncOptions()}

        <View style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          //justifyContent: "space-around",
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "white",
          padding: 20,

          shadowColor: "black",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: -3,
          shadowRadius: 2,
          elevation: hp('3'),

          // shadowColor: "#EDEDED",
          // shadowOffset: { width: 0, height: 12 },
          // shadowOpacity: 5,
          // shadowRadius: 3,
          // elevation: 9,
          height: hp("6"),
        }}>
          
        <View style={{ flex: 1 }}>
          <TouchableOpacity activeOpacity={0.9}
            style={{
              height: hp("4"),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate('findstore');
            }}
          >
            <Image source={store} style={Styles.footericonstore} />
            <Text style={Styles.title2}>Store</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity activeOpacity={0.9}
            style={{
              height: hp("4"),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate('mapview');
            }}
          >
            <Image source={map} style={Styles.footericonmap} />
            <Text style={Styles.title2}>View Map</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity activeOpacity={0.9}
            style={this.state.connection_sync_trigger ? this.syncButtonStyle(this.state.connection_status, this.state.syncProcessStatus) : this.syncButtonStyle(this.state.connection_status, this.state.syncProcessStatus) }
            // style={ this.syncButtonStyle(this.state.connection_status, this.state.syncProcessStatus) }
            onPress={() => {
              // this.props.navigation.navigate('mapview');
            
              if (this.state.connection_status != true) {
                Alert.alert("Please check the Network Connection!");
              }else{
       
               
                Main(this.props.getnNewProducts, this.startChangeStatus, this.endChangeStatus);
               
                
              }
             
            }}
        >
          
                        <Image source={sync} style={Styles.footericonSync} />
              <Text style={Styles.title3}>Sync</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.navigate('calendar');
              }}
              style={{
                height: hp("4"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={cal} style={Styles.footericoncal} />
              <Text style={Styles.title2}>Calendar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.9}
              style={{
                height: hp("4"),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                this.props.navigation.navigate('contacts');
              }}
            >
              <Image source={contact} style={Styles.footericoncon} />
              <Text style={Styles.title2}>Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
</View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Footer);