import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  View,
  SafeAreaView,
  Modal,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Styles from "../../style/FooterStyle";
import { useNavigation } from "@react-navigation/core";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import DataAdapter from "../../offline/localData/DataAdapter";

import * as colors from '../../style/Common/ColorsStyle';

const checkIcn = require("../../assets/Loaders/loader.gif");

const { ids, styles } = Styles;

async function initial() {
  const newpro = await DataAdapter("NEW PRODUCTS");
  return newpro;
}

let modal_width = 0;
let modal_btn = 0;
let img_height = 150;
if (wp("100") > 450) {
  modal_width = wp("55");
  modal_btn = wp("16");
  img_height = 150;
} else {
  modal_width = wp("70");
  modal_btn = wp("20");
  img_height = 100;
}

export default function DownloadPhotosModal(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { connectionStatus } = useSelector((s) => s.loading);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBtn, setModalBtn] = useState(false);
  const [downloadstatus, setDownloadstatus] = useState("Downloading Images...");

  const md_close = () => {
    
    setModalBtn(false);
    setModalVisible(false);
    navigation.navigate("home", { screen: "storePhotos" });
  };

  useEffect(() => {
    // store.dispatch({ type: "CustomSpinner:SHOW" });
    setModalVisible(props.modalvisible);
    console.log('---------------------------------');
    console.log(props);
    console.log('---------------------------------');
    
  },);

  return (
    <Modal
      animationType="fade"
      //fade , none,slide use for animation type
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={sty.centeredView}>
        <View style={sty.modalView}>
          <View
            style={{
              width: '90%',
              height: hp('38'),
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              marginTop: hp('2'),
            }}>
            {modalBtn == false ? (
              <Text style={styles.syncOptionsText}>Download Started</Text>
            ) : (
              <Text style={styles.syncOptionsText}>Download Successful</Text>
            )}

            <Text style={{fontSize: hp('1.5')}}>
              This will take several minutes..
            </Text>
            <View
              style={{
                width: '80%',
                height: hp('19'),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: hp('1'),
              }}>
              <Image source={checkIcn} style={sty.cardImgCheck}></Image>
            </View>

            {modalBtn == false ? (
              <Text style={{fontSize: hp('1.7'), color: '#2CDC0B'}}>
                {props.status_D}
              </Text>
            ) : (
              <Text style={{fontSize: hp('1.7'), color: '#2CDC0B'}}>
                Click done to continue..
              </Text>
            )}

            {modalBtn !== false ? null : (
              <TouchableOpacity
                style={[
                  {
                    width: wp('20'),
                    height: hp('4'),
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1ED18C',
                    marginTop: hp('3'),
                    borderRadius: wp('1'),
                    justifyContent: 'center',
                  }, props.status_D !== 'Completed' ? {display:"none"} : null 
                ]}>
                <TouchableOpacity>
                  <Text
                    style={{fontSize: hp('1.7'), color: 'white'}}
                    onPress={() => {
                      props.setvisibilty();
                    }}>
                    DONE
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const sty = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(225,249,166,0.4)",
  },
  modalView: {
    width: modal_width,
    height: hp("40"),
    margin: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: wp("3.5"),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1.3,
  },
  cardImgCheck: {
    // aspectRatio: 1,
    
    padding: 5,
    height: img_height,
    width: img_height,
    // resizeMode: "contain",
  },
});
