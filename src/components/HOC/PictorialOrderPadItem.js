import React, { useState, useEffect, Component } from "react";
import { View, Image, Text ,TextInput} from "react-native";


const PictorialOrderPadItem = ({ contentText, children }) => {

    handleBackPress = () => {
        alert('fds');
    }


    return (
        <View>
            
            <View>
                
                {children}
            </View>
        </View>
    );
}



export default PictorialOrderPadItem;


