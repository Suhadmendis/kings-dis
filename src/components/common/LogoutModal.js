import React, { Component, useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Image } from "react-native";
import { ConfirmDialog } from "react-native-simple-dialogs";
//import StyleSheet from "react-native-media-query";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect, useDispatch, useSelector } from "react-redux";
import Styles from "../../style/GifImageModalStyle";
import { userLogOut } from "../../actions/HomeScreenAction";
const{ids, styles} = Styles;
import { store } from "../../../configureStore";
const loaderGif = require("../../assets/Loaders/loader.gif");

const LogoutModal = () => {
 // const { items } = useSelector((s) => s.cart);
 // const navigation = useNavigation();
  // dialogVisible
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
 // const tokn = useSelector((state) => state.login.tknExpireCheck);
    const logoutcheck = useSelector((state) => state.loading.logout);

  useEffect(() => {
    console.log('logout');

    console.log(logoutcheck);

    // store.dispatch({ type: "CustomSpinner:SHOW" });
    setModalVisible(logoutcheck);
  }, [logoutcheck]);


    return (
      <View style={{ zIndex: 2000 }}>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalTextTitle]}>Token Expired</Text>
            {/* <View style={styles.gifView}>
             <Image source={loaderGif} style={styles.cardImgCheck}></Image>
            </View> */}
            <Text style={styles.modalText1}>Your authentication token has expired. Please login again to refresh the token</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                {
                  // userLogOut();
                  store.dispatch({ type: "logout:false" });
                  setModalVisible(!modalVisible);
                }
               }
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>
    )


}


const mapStateToProps = (state) => {
  return {
    spinner: state.loading.spinner,
  };
};

export default connect(mapStateToProps, {})(LogoutModal);

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,

//   },
//   modalView: {
//     margin: 20,
//     borderRadius: 20,
//     padding: 35,
//     height:hp('40'),
//     width:wp('50'),
//     backgroundColor:"green",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });