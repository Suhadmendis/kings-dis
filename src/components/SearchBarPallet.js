import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import StyleSheet from "react-native-media-query";
import Autocomplete from "react-native-autocomplete-input";
import { log } from "react-native-reanimated";
import BarCodeSection from "./BarCodeSection";
import { connect, useDispatch, useSelector } from "react-redux";
import SearchBar from "./helperComponents/SearchBar";
import { heightPercentageToDP } from "react-native-responsive-screen";
import getBaseUrl from "../url/getBaseUrl";
const barCodeIcon = require("../assets/barcode.png");
const closeIcon = require("../assets/close-home-page-search.png");
import { RawQuery } from "../offline/Services/DataHelper";

import * as colors from '../style/Common/ColorsStyle';
import { getQrCode } from "./QROperations/QRProductScanner";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { useNavigation } from "@react-navigation/core";
import { showMessage } from "react-native-flash-message";
import { store } from "../../configureStore";


function TopBar(props) {
  const [show, setShow] = React.useState(1);
  const [query, setQuery] = useState();
  const [filteredDataSet, setFilteredDataSet] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(props.token);
  const [barCodePanel, setBarCodePanel] = useState(false);

  const { connectionStatus } = useSelector((s) => s.loading);

  const navigation = useNavigation();

  useEffect(() => {
    setBarCodePanel(false);
    if (props.palletOpen) {
      setShow(1);
    } else {
      setShow(0);
    }
    setDataset(props.data);

  }, [props]);

  const getProductsFromApi = async (barcodeFlag, value) => {
    if (token != "blank") {
      try {

        let Preseason = 0;
        Preseason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
        myHeaders.append("Preseason", Preseason);

        var raw = JSON.stringify({
          SearchTerm: `${value}`,
          IsBarcode: barcodeFlag,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          `${getBaseUrl()}GetSearchAutoCompleteData`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            const productResults = JSON.parse(result);
            let products = [];

            for (
              let index = 0;
              index < productResults.results.length;
              index++
            ) {
              // if(index < 10){
              products.push(productResults.results[index].title);
              // }
            }

            setFilteredDataSet(products);
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleQrCode = async (e) => {

    setQuery(e.data);
    getQrCode(e, navigation);
   setBarCodePanel(false);
   setShow(0)
  };


  if (show == 1) {
    return (
      <View
        style={{ width: "100%", height: 110, zIndex: 10, position: "absolute" }}
      >
        <View
          style={
            barCodePanel == true
              ? styles.barPalletOpenStyle
              : styles.barPalletCloseStyle
          }
        >
          <View style={styles.closeArea}>
            <TouchableOpacity style={styles.closeIconSlot} activeOpacity={0.9} onPress={() => setShow(0)}>
              {/* <TouchableOpacity > */}
                <Image source={closeIcon} style={styles.closeIcon} />
              {/* </TouchableOpacity> */}
            </TouchableOpacity>
          </View>
          <View style={styles.productTextArea}>
            <Text style={styles.productText}>Product Search</Text>
          </View>
          <View style={styles.searchPallet}>
            <View style={styles.searchBarPallet}>
              <View style={{ width: "100%", position: "absolute", top:30 }}>
                <SearchBar pageFlag={"home"} />
              </View>
            </View>
            <View style={styles.barcodeImageArea}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setBarCodePanel(true);
                    setFilteredDataSet([]);
                  }}
                >
                  <Image source={barCodeIcon} style={styles.barcodeImage} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={
              barCodePanel == true
                ? { flex: 14 }
                : { flex: 14, display: "none" }
            }
          >
            <BarCodeSection getQrCode={handleQrCode} />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: "none",
          flex: 0.2,
          backgroundColor: "white",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      ></View>
    );
  }
}

export default class SearchBarPallet extends React.Component {
  state = {
    show: 1,
    data: [],
    isLoading: true,
  };

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHide = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true });
  };

  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true });
  };

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false });
  };

  render() {
    // alert(this.props.palletOpen)

    //

    return (
      <TopBar
        load={this.state.isLoading}
        data={this.state.data}
        palletOpen={this.props.palletOpen}
        token={this.props.token}
      />
    );
  }
}

const { ids, styles } = StyleSheet.create({
  barPalletOpenStyle: {
    position: "absolute",
    padding: 10,
    top: 0,
    left: 0,
    width: "100%",
    height: 450,

    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  barPalletCloseStyle: {
    position: "absolute",

    top: 0,
    left: 0,
    width: "100%",
    height: 130,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    "@media (max-width: 1600px) and (min-width: 500px)": {

    },
    "@media (max-width: 500px)": {
      paddingLeft: 10,
      paddingRight: 10,
      padding: 10,
    },
  },
  closeArea: {
    height: 40,

    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeIconSlot: {
    // backgroundColor: 'red',
    marginTop: 10,
    height: 20,
    width: 20,
    "@media (max-width: 1600px) and (min-width: 500px)": {

      height: 25,
      width: 25,
    },
    "@media (max-width: 500px)": {
      marginRight: 5,
      height: 15,
      width: 15,
    },
  },
  closeIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    aspectRatio: 0.9,
  },
  productTextArea: {
    //flex: 1.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    height:25,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height:25,
    },
    "@media (max-width: 500px)": {
      height:30,
    },
  },
  productText: {
    fontWeight: "bold",
    fontSize: 16,
    color:'black',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      fontSize: 19,
    },
    "@media (max-width: 500px)": {
      fontSize: 16,
    },
  },
  searchPallet: {
    height: 50,
    flexDirection: "row",

    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: 65,
      marginTop:10,
    },
    "@media (max-width: 500px)": {
      height: 50,

    },
  },
  searchBarPallet: {

    width: windowWidth - 30 - 100,
    // flex: 5,
    // flexDirection: "row",
    // justifyContent: "flex-start",
    marginRight: 10,
    "@media (max-width: 500px)": {
      width: windowWidth - 30 - 60,

    },
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 5,
  },
  searchContainerInner: { flex: 1 },
  containerInnerInputStyle: {
    borderColor: "white",
    backgroundColor: "red",
  },
  innerContainerStyle: {
    flex: 1,
    backgroundColor: "blue",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  dropdownItem: {
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
  },
  dropdownItemText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 17,
  },
  barcodeImageArea: {
    width: 60,
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    height: 60,
    justifyContent:'center',
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: 60,
    },
    "@media (max-width: 500px)": {
      width:55,
      marginLeft:5,
      height: 48,
      marginTop:5
    },
  },
  barcodeImage: { width: "60%", height: "60%", margin: 11 },
});
