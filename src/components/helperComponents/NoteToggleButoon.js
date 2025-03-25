import React,{ useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import StyleSheet from "react-native-media-query";


import Styles from "../../style/NoteToggleButtonStyle";
import { checkAdminRole } from '../../offline/Services/UserHelper';

const noteIcon = require("../../assets/notesIcon.png");
const arrowDown = require("../../assets/arrowDown.png");


const { ids, styles } = Styles;



export default function NoteToggleButton(props) {


    const { noteVisibility, itemId } = props;

    const [switchOn, setSwitchOn] = useState(false);

    const [allow, setAllow] = useState(false);

    const performPressEvent = () => {

        switchOn ? setSwitchOn(false) : setSwitchOn(true);

    }

    async function checkRoles(){
      const isUserExist = await checkAdminRole();
      return isUserExist;
    }
    
  
    checkRoles().then(res => setAllow(res));

    useEffect(() => {
        noteVisibility(switchOn, itemId);
      }, [switchOn]);


      if (allow) {
        return (
          <TouchableOpacity 
              activeOpacity={0.9} 
              style={styles.toggleButtonViewArea}
              onPress={() => performPressEvent()}
          >
              
             <View style={styles.toggleButtonIconArea}>
                <Image source={noteIcon} style={styles.toggleButtonNoteIcon} />
             </View>
             {/* <View style={styles.toggleButtonArrowArea}>
                <Image source={arrowDown}  style={[styles.toggleButtonArrowIcon, switchOn ? {transform: [{ rotate: '180deg' }]} : null ]} />
             </View> */}
    
          </TouchableOpacity>
        );
      }else{
        return (
          <View></View>
        )
      }
    


  
}




