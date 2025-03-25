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
} from "react-native";
import Styles from "../style/MapViewStyle";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const remove = require("../assets/delete.png");
const edit = require("../assets/edit.png");
const add = require("../assets/plus_circle.png");
const search = require("../assets/search-green.png");

class MapHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={Styles.container}>
          <Back />
          <View style={Styles.titleView}>
            <Text style={Styles.titleTxt} allowFontScaling={false}>
              Map View
            </Text>
            <View style={Styles.mapcontainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={Styles.map}
                showsUserLocation
                initialRegion={{
                  latitude: 51.84927,
                  longitude: 0.69553,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>

            <View style={Styles.addressView}>
              <View style={{ marginTop: hp("1") }}>
                <View style={Styles.savingsTextView}>
                  <Text style={Styles.cardTxt2} allowFontScaling={false}>
                    King Seeds & Suffolk Herbs
                  </Text>
                </View>

                <View style={Styles.applyView}>
                  <View style={Styles.locationView}>
                    <Text allowFontScaling={false} style={Styles.TxtInput1}>
                      Monks Farm, Coggeshall Road
                    </Text>
                    <Text allowFontScaling={false} style={Styles.TxtInput1}>
                      Kelvedon Colchester, Essex
                    </Text>
                    <Text allowFontScaling={false} style={Styles.TxtInput1}>
                      CO5 9PG
                    </Text>
                  </View>

                  <Text style={Styles.telTxt} allowFontScaling={false}>
                    Tel:01376 570 000
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
  };
};

export default connect(mapStateToProps, {})(MapHome);
