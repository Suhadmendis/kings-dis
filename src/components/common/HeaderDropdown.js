import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { Image, Modal, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import headerStyles from "../../style/HeaderStyle";
import HeaderModal from './HeaderModal';

const { ids, styles } = headerStyles;
const down = require("../../assets/arrowDown.png");

export default function HeaderDropdown({ }) {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { selItemName, modalVisible } = useSelector(s => s.findStore)

    // console.log(route);

    // if (route.params?.screen != 'allOrders') {
    if (true) {
        return (
            <View>
                {selItemName?.length > 0 ? (
                    <TouchableOpacity activeOpacity={0.9}
                        onPress={() => {
                            dispatch({ type: 'SET_MODAL_VISIBLITY', payload: !modalVisible });
                        }}
                        style={styles.store}
                    >
                        <Text style={styles.storeText} numberOfLines={1} ellipsizeMode='tail'>
                            {/* {selItemName.length < 13
                                ? `${selItemName}`
                                : `${selItemName?.substring(0, 13)}...`} */}
                                {selItemName}
                               
                        </Text>
    
                        <Image source={down} style={styles.storeIcon} />
                    </TouchableOpacity>
                ) : (
                    <View></View>
                )}
              <HeaderModal />
    
            </View>
        )    
    }
    
}

// {"params": {"pageFlag": "STORE", "subTabVal": "", "tab": 0}, "screen": "allOrders", "time": 1683190485559}
// {"params": {"pageFlag": "STORE", "subTabVal": "", "tab": 0}, "screen": "findstore", "time": 1683190485559}
