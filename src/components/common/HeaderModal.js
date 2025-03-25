import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { Image, Modal, Text, View, TouchableOpacity, Alert } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import headerStyles from "../../style/HeaderStyle";

import { useRoute } from '@react-navigation/native';

const { ids, styles } = headerStyles;

const leftIcon1 = require("../../assets/store_cartplus.png");
const leftIcon11 = require("../../assets/cart-plus_black.png");
const leftIcon2 = require("../../assets/store_contact.png");
const leftIcon3 = require("../../assets/store_graph.png");
const leftIcon4 = require("../../assets/store_map.png");
const leftIcon5 = require("../../assets/store_cartcheck.png");
const rightIcon1 = require("../../assets/store_cart.png");
const rightIcon2 = require("../../assets/store_notebook.png");
const rightIcon3 = require("../../assets/store_creditcard.png");
const rightIcon4 = require("../../assets/store_image.png");
const rightIcon5 = require("../../assets/store_noteline.png");
const store = require("../../assets/store.png");

let adminAddress = '', cusPhone = '', cusEmail = ''

export default function HeaderModal({ }) {

    const route = useRoute();

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { adminAddress, cusPhone, cusEmail, modalVisible } = useSelector(s => s.findStore)

    toggleModal = () => {
        dispatch({ type: 'SET_MODAL_VISIBLITY', payload: !modalVisible })
    }


    return (
        <View>
            <Modal
                //  animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // this.setModalVisible(!modalVisible);
                    toggleModal()
                    navigation.goBack();
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPressOut={() => toggleModal()}
                    style={{
                        height: '100%',
                    }}
                >
                    <View style={styles.modelBox}>
                        <View style={styles.modalView}>
                            <View style={styles.detailView}>
                                <Text style={styles.text1} numberOfLines={3}> {adminAddress} </Text>
                                <Text style={styles.text2}> {cusPhone} </Text>
                                <Text style={styles.text1}> {cusEmail} </Text>
                            </View>
                            <View style={styles.buttonView}>
                                <View style={styles.row1}>
                                <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'pictorial', });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={leftIcon11} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Pictorial</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn1}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'orderPad', });
                                            toggleModal()
                                        }}
                                    >
                                        {/* <View style={styles.leftBtnView}> */}
                                        <Image source={leftIcon1} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText1}>New Order</Text>
                                        {/* </View> */}
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
                                        <Image source={leftIcon2} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Contacts</Text>
                                        </TouchableOpacity> */}

                                                        {/* <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('storeNew',{ tab: 1});
                                        }}
                                    ></TouchableOpacity> */}
                                    
                                    <TouchableOpacity activeOpacity={0.9} style={styles.btn3}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 1, subTabVal: "", pageFlag: 'STORE'  } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={leftIcon4} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Address</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 3 , subTabVal: "", pageFlag: 'STORE' } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={rightIcon2} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Quotes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 5 , subTabVal: "", pageFlag: 'STORE' } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={rightIcon3} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Pay</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 7, subTabVal: "", pageFlag: 'STORE'  } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={leftIcon3} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Report</Text>
                                    </TouchableOpacity> */}

                                   
                                    {/* <TouchableOpacity activeOpacity={0.9} style={styles.btn2}
                      onPress={() => {
                        // navigation.navigate('storeAdresses');
                        navigation.navigate('store');
                      }}
                    >
                      <Image source={leftIcon4} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={styles.btn2} >
                      <Image source={leftIcon5} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Saved</Text>
                    </TouchableOpacity> */}
                                </View>
                                <View style={styles.row2}>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn3}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 0 , subTabVal: "", pageFlag: 'STORE' } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={store} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Store</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 2, subTabVal: "", offlineTab: 'N' , time: Date.now(), allOrders: false, pageFlag: 'STORE'  } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={rightIcon2} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Orders</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 4, subTabVal: "", pageFlag: 'STORE'  } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={rightIcon1} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Carts</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 6 , subTabVal: "", pageFlag: 'STORE' } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={leftIcon2} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Contacts</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}
                                        style={styles.btn2}
                                        onPress={() => {
                                            navigation.navigate('home', { screen: 'storeNew', params: { tab: 8, pageFlag: 'STORE' } });
                                            toggleModal()
                                        }}
                                    >
                                        <Image source={rightIcon4} style={styles.leftBtnIcon} />
                                        <Text style={styles.btnText}>Photos</Text>
                                    </TouchableOpacity>
                                    
                                    {/* <TouchableOpacity activeOpacity={0.9} style={styles.btn2}
                      onPress={() => {
                        navigation.navigate('contactNotes');
                      }}
                    >
                      <Image source={rightIcon5} style={styles.leftBtnIcon} />
                      <Text style={styles.btnText}>Stors</Text>
                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal >
        </View>
    )
}
