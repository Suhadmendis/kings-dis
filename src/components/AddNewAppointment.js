import React, { Component, useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Styles from "../style/AddnewAppointmentStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-datepicker";
import DataAdapter from "../offline/localData/DataAdapter";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AppointmentSaveAPI from './API_MOVE';

import * as colors from '../style/Common/ColorsStyle';

import { EmailValidation } from "../utils/ValidationHelper";
import {convertDateTimeToStr} from '../utils/ValidationHelper';

import { Dropdown } from "react-native-element-dropdown";
import { addAppointment } from "../actions/AddappointmentAction";
// import {RawQuery} from '../offline/Services/DataHelper';
import { RawQuery } from '../offline/Services/DataHelper';

import { sendAppointmentEmail } from "../actions/SendAppointmentEmail";

import { useIsFocused } from "@react-navigation/native";
import {Checkbox} from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { check } from "react-native-permissions";
const { ids, styles } = Styles;

const search = require("../assets/BlueLeft.png");

const min_Data = [
  { value: "00" },
  { value: "15" },
  { value: "30" },
  { value: "45" },
];

const hour_Data = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
];






const AddNewAppointment = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startDatestr, setStartDatestr] = useState(null);
  const [endDatestr, setEndDatestr] = useState(null);

  const [valueS, setValueS] = useState(null);
  const [isFocusS, setIsFocusS] = useState(false);

  const [sminvalue, setSminValue] = useState(null);
  const [isFocusminS, setIsFocusminS] = useState(false);

  const [valueAms, setValueAms] = useState(null);
  const [isFocusAms, setIsFocusAms] = useState(false);

  const [valueE, setValueE] = useState(null);
  const [isFocusE, setIsFocusE] = useState(false);

  const [eminvalue, setEminValue] = useState(null);
  const [isFocusminE, setIsFocusminE] = useState(false);

  const [valueAme, setValueAme] = useState(null);
  const [isFocusAme, setIsFocusAme] = useState(false);

  const [checked, setChecked] = React.useState(false);

  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [location, setLocation] = useState(null);
  const [note, setNote] = useState(null);
  const app_array = useSelector((state) => state.calendar.appointmentsAdded);
  const userInfo = useSelector(state => state.login.accountInfo);
  const b_check = useSelector((state) => state.calendar.back);
  const connectionStatus = useSelector((state) => state.loading.connectionStatus);

  const cusName = useSelector((state) => state.findStore?.selItemName);

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState('');

  const addtoappointment = async () => {


    
    // appointmentObj = { maxID,email,subject,location,startDate,endDate,note,checked, ReadyToSync }



    let startTime = "";
    let endTime = "";
    
    console.log(app_array);

    if (startDate == null) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Select valid start time",
        type: "warning",
        autoHide: true,
      });
    } else if (endDate == null) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Select valid end time",
        type: "warning",
        autoHide: true,
      });
    } else if (endDate == null) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Select valid time",
        type: "warning",
        autoHide: true,
      });
    } else {
      if (valueAms == "AM") {
        startTime = valueS + ":" + sminvalue + ":00";
      } else {
        startTime = valueS + 12 + ":" + sminvalue + ":00";
      }

      if (valueAme == "AM") {
        endTime = valueE + ":" + eminvalue + ":00";
      } else {
        endTime = valueE + 12 + ":" + eminvalue + ":00";
      }

     
      let startTime = "";
      let endTime = "";
      if(cusName == '' || cusName == null){
        showMessage({
          message: "KINGS SEEDS",
          description: "Please select a store before continue",
          type: "warning",
          autoHide: true,
        });
        return;
      }
  
  
      let maxID = await RawQuery(`SELECT max(ItemID) as maxID from local_ct_userappointments`);

      let saveLocal = false;
      let ReadyToSync = '0';
      if (!connectionStatus) {
        ReadyToSync = '1';
        saveLocal = true;
      }

      if (maxID.item(0).maxID == null) {
        maxID = 1;
      }else{
        maxID = maxID.item(0).maxID+1;
      }
      
  
  
      let startDateISO = startDate.toISOString();
      let endDateISO = endDate.toISOString();

      
      appointmentObj = { maxID,email,subject, userInfo: userInfo.customerUserID,location,startDate: startDateISO,endDate: endDateISO,note,checked, ReadyToSync }
  
      let res = null;

      if (connectionStatus) {
         res = await AppointmentSaveAPI(appointmentObj)
         if (res.body.error == "") {
          saveLocal = true;

          appointmentObj.maxID = res.body.userAppointment.itemID;
        }

        console.log('===================dfd=================');
        console.log(appointmentObj.maxID);
        console.log(res.body.userAppointment.itemID);
        console.log('====================================');
        try {
          var object = await sendAppointmentEmail(appointmentObj);
          console.log(object);
        } catch (error) {
          console.log(error);
        }
      
      

      }
      
      

      if (saveLocal) {
        addLocalAppointment(appointmentObj).then(res => {
          if (res == '1') {
            showMessage({
              message: "KINGS SEEDS",
              description: "Appointment added successfully",
              type: "success",
              autoHide: true,
            });

            navigation.goBack()
          }else{
            showMessage({
              message: "KINGS SEEDS",
              description: "Somehting went wrong",
              type: "warning",
              autoHide: true,
            });
          }
          
        })
        
      }else{
        showMessage({
          message: "KINGS SEEDS",
          description: "Somehting went wrong",
          type: "warning",
          autoHide: true,
        });
      }
      
  
      







    }
  };

  // const addtoappointment = async ()  => {

  //   // main operation - get data
  

   
  //     // addAppointment(
  //     //   email,
  //     //   subject,
  //     //   location,
  //     //   startDate,
  //     //   endDate,
  //     //   note,
  //     //   app_array,
  //     //   checked,
  //     //   navigation
  //     //   );


     


  // };

  useEffect(() => {
    
    setEmail('');
    setSubject('');
    setLocation('');
    setStartDate(null);
    setEndDate(null);
    setNote('');
    setValueS(null);
    setValueE(null);
    setValueAme(null);
    setValueAms(null);
    setSminValue(null);
    setEminValue(null);
    setChecked(false)



    

    
  }, [isFocused]);


  async function addLocalAppointment(data){

    const payload = {
      section: 'APPOINTMENTS',
      opration: 'ADD LOCAL',
      data,
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }


  const showDatePicker = (type) => {
    setStartDatePickerVisibility(true);
    setDateType(type)
  };

  const hideDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const datetimetostr= ()=>{

  }

  const handleConfirm = (date) => {
   // let strDate= date.toISOString()
   console.log(date);
   
   if(dateType == 'startDate'){
     if(date >= endDate && endDate != null){
      showMessage({
        message: "KINGS SEEDS",
        description: "Start date should be smaller than the end date",
        type: "warning",
        autoHide: true,
      });
     }else{
      setStartDate(date);

      let strs_dt = convertDateTimeToStr(date);
      setStartDatestr(strs_dt)
     }

   }else{

     if(date <= startDate && startDate != null){
      showMessage({
        message: "KINGS SEEDS",
        description: "End date should be greater than the start date",
        type: "warning",
        autoHide: true,
      });
     }else{
      setEndDate(date);

      let stre_dt = convertDateTimeToStr(date);
      setEndDatestr(stre_dt);
     }
   }

    hideDatePicker();
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Back />
        <View style={styles.titleView}>
          <Text style={styles.titleTxt} allowFontScaling={false}>
            Add New Appointment
          </Text>
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.bodyview}>
            <View style={[styles.inpMainView, {height:hp('12')}]}>
              <Text style={styles.txtHead}>Email:
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.txtInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="gray"
                  onChangeText={text => setEmail(text)}>
                  {email}
                </TextInput>
              </View>
              <View style={styles.chckView}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                color={colors.primaryColor}
                onPress={() => {
                  let val = !checked;
                  setChecked(val);
                }}
              />
              <Text style={styles.chckViewTxt}>
              Send email to this email address
              </Text>
            </View>
            </View>
            <View style={styles.inpMainView}>
              <Text style={styles.txtHead}>Subject:
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.txtInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="gray"
                  onChangeText={text => setSubject(text)}>
                  {subject}
                </TextInput>
              </View>
            </View>
            <View style={styles.inpMainView}>
              <Text style={styles.txtHead}>Location:
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.txtInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="gray"
                  onChangeText={text => setLocation(text)}>
                  {location}
                </TextInput>
              </View>
            </View>
            <View  style={{flexDirection:'row', width:'100%'}}>
            <View style={styles.inpMainView2}>
              <Text style={styles.txtHead}>Start time:
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.inpSubView}>
                <DateTimePickerModal
                  isVisible={isStartDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  locale="en_GB"
                />

                <TouchableOpacity
                  style={[styles.txtInpView2, {justifyContent:'center', alignItems:'center'}]}
                  onPress={() => showDatePicker('startDate')}>
                  <Text
                  style={{ fontSize:hp('1.6'), color:'gray'}}
                  >
                    {startDate != null
                      ? startDatestr
                      : 'select start date'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.inpMainView2, {position:'absolute', right:0}]}>
              <Text style={styles.txtHead}>End time
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.inpSubView}>
                <TouchableOpacity  style={[styles.txtInpView2, {justifyContent:'center', alignItems:'center'}]}
                  onPress={() => showDatePicker('endDate')}>
                  <Text
                  style={{ fontSize:hp('1.6'), color:'gray'}}
                  >
                    {endDate != null
                      ? endDatestr
                      : 'select end date'}
                  </Text>

                </TouchableOpacity>

              </View>
            </View>

            </View>
            <View style={styles.inpMainNoteView}>
              <Text style={styles.txtHead}>Note:</Text>
              <View style={styles.txtNoteInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInputNote}
                  placeholderTextColor="gray"
                  numberOfLines={5}
                  multiline={true}
                  onChangeText={text => setNote(text)}>
                  {note}
                </TextInput>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.bckBtn} activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
            <Text style={styles.bckBtnTxt}>BACK TO CALENDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveBtn}
            onPress={() => addtoappointment()}>
            <Text style={styles.saveBtnTxt}>ADD NEW APPOINTMENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(AddNewAppointment);

let widthper = wp("100%");
let crd_wdth = 0;
let tab_h = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("94");
  tab_h = hp("4");
} else {
  crd_wdth = wp("65");
  tab_h = hp("4.4");
}

const sty = StyleSheet.create({});
