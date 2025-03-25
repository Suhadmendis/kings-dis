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
} from "react-native";
import Styles from "../style/AddnewAppointmentStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";
import DatePicker from "react-native-datepicker";
import { Dropdown } from "react-native-element-dropdown";
import { addAppointment, editAppointment } from "../actions/AddappointmentAction";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showMessage } from "react-native-flash-message";
import {Checkbox} from "react-native-paper";
import UpdateAppointment from './appointments/UpdateAppointment';

import * as colors from '../style/Common/ColorsStyle';

import {convertDateTimeToStr} from '../utils/ValidationHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { ids, styles } = Styles;

import { useIsFocused } from "@react-navigation/native";

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

const EditAppointment = ({route}) => {
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

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState('');

  // const addtoappointment = () => {
  //   let startTime = "";
  //   let endTime = "";
  //   console.log(app_array);
  //   if (valueS == null || sminvalue == null) {
  //     showMessage({
  //       message: "KINGS SEEDS",
  //       description: "Select valid start time",
  //       type: "warning",
  //       autoHide: true,
  //     });
  //   } else if (valueE == null || eminvalue == null) {
  //     showMessage({
  //       message: "KINGS SEEDS",
  //       description: "Select valid end time",
  //       type: "warning",
  //       autoHide: true,
  //     });
  //   } else if (valueAms == null || valueAme == null) {
  //     showMessage({
  //       message: "KINGS SEEDS",
  //       description: "Select valid time",
  //       type: "warning",
  //       autoHide: true,
  //     });
  //   } else {
  //     if (valueAms == "AM") {
  //       startTime = valueS + ":" + sminvalue + ":00";
  //     } else {
  //       startTime = valueS + 12 + ":" + sminvalue + ":00";
  //     }

  //     if (valueAme == "AM") {
  //       endTime = valueE + ":" + eminvalue + ":00";
  //     } else {
  //       endTime = valueE + 12 + ":" + eminvalue + ":00";
  //     }

  //     editAppointment(
  //       email,
  //       subject,
  //       location,
  //       startTime,
  //       endTime,
  //       startDate,
  //       endDate,
  //       note,
  //       app_array,
  //       route.params.appId,
  //       valueS,
  //       sminvalue,
  //       valueE,
  //       eminvalue,
  //       valueAms,
  //       valueAme,
  //       route.params.navigation
  //     );
  //   }
  // };


  const addtoappointment = async () => {
    let startTime = "";
    let endTime = "";
    console.log(app_array);



    const appointment = { email,
      subject,
      location,
      startDate,
      endDate,
      note,
      app_array,
      id: route.params.appId,
      checked
    }

    const res = await UpdateAppointment(appointment);

    if (res == 'UPDATED') {
      showMessage({
        message: "KINGS SEEDS",
        description: "Updated Successfully",
        type: "success",
        autoHide: true,
      });
      route.params.navigation.goBack()
    }else{
      showMessage({
        message: "KINGS SEEDS",
        description: "Somehting went wrong",
        type: "success",
        autoHide: true,
      });
    }

      // editAppointment(
      //   email,
      //   subject,
      //   location,
      //   startDate,
      //   endDate,
      //   note,
      //   app_array,
      //   route.params.appId,
      //   checked,
      //   route.params.navigation
      // );

  };


  const showDatePicker = (type) => {
    setStartDatePickerVisibility(true);
    setDateType(type)
  };

  const hideDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
   // let strDate= date.toISOString()

   if(dateType == 'startDate'){
     if(date >= endDate && endDate != null){
      showMessage({
        message: "KINGS SEEDS",
        description: "Start date should be smaller than the end date",
        type: "warning",
        autoHide: true,
      });
     }else{
      setStartDate(date)
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
      setEndDate(date)
      let stre_dt = convertDateTimeToStr(date);
      setEndDatestr(stre_dt);
     }
   }

    hideDatePicker();
  };

  useEffect(() => {
    const event = route.params.event;
   console.log('====================================');
   console.log(event.email);
   console.log('====================================');
  //  {"email": "Dhfh@dgg.fhv",
  //   "end": "2022-12-7 23:59:59",
  //   "eventEnd": "2022-12-7 23:59:59",
  //   "eventStart": "2022-12-7 09:49:00",
  //   "height": 1418.3055555555554,
  //   "id": "15",
  //   "index": 0,
  //   "left": 0,
  //   "location": "Dyfy",
  //   "start": "2022-12-7 09:49:00", "summary": "Chfg", "title": "Fhfh", "top": 981.6666666666666, "width": 300.09090909090907}

    setEmail(event.email)
    setSubject(event.title);
    setStartDate(event.eventStart);
    setEndDate(event.eventEnd);


    setNote(event.summary)

    setLocation(event.location)

        // setEmail(element.email);
        

        console.log('====================================');
        console.log(new Date());
        console.log('====================================');
        // setLocation(element.location);
        // setStartDate(startDate);
        // setEndDate(endDate);

        

        // let stre_dt = convertDateTimeToStr(endDate);
        // setEndDatestr(stre_dt);
        // let strs_dt = convertDateTimeToStr(startDate);
        setStartDatestr(event.eventStart);
        setEndDatestr(event.eventEnd)
  


   for (let i = 0; i < app_array.length; i++) {
     const element = app_array[i];

     if(element.id == route.params.appId){
       console.log(element);

       let startDate = new Date(element.startDate);
       let endDate = new Date(element.endDate);

        // setEmail(element.email);
        // setSubject(element.subject);
        // setLocation(element.location);
        // setStartDate(startDate);
        // setEndDate(endDate);

        // setNote(element.note)

        // let stre_dt = convertDateTimeToStr(endDate);
        // setEndDatestr(stre_dt);
        // let strs_dt = convertDateTimeToStr(startDate);
        // setStartDatestr(strs_dt);


     }
   }
  }, [isFocused]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Back />
        <View style={styles.titleView}>
          <Text style={styles.titleTxt} allowFontScaling={false}>
           Edit Appointment
          </Text>
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.bodyview}>
          <View style={[styles.inpMainView, {height:hp('12')}]}>
              <Text style={styles.txtHead}>Email:</Text>
              <View style={styles.txtInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="gray"
                  onChangeText={(text) => setEmail(text)}
                >
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
              <Text style={styles.txtHead}>Subject:</Text>
              <View style={styles.txtInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="gray"
                  onChangeText={(text) => setSubject(text)}
                >
                  {subject}
                </TextInput>
              </View>
            </View>
            <View style={styles.inpMainView}>
              <Text style={styles.txtHead}>Location:</Text>
              <View style={styles.txtInpView}>
                <TextInput
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="gray"
                  onChangeText={(text) => setLocation(text)}
                >
                  {location}
                </TextInput>
              </View>
            </View>

            <View style={{flexDirection:'row', width:'100%'}}>
            <View style={styles.inpMainView2}>
              <Text style={styles.txtHead}>Start time:</Text>
              <View style={styles.inpSubView}>
              <DateTimePickerModal
                  isVisible={isStartDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  

                />
                <TouchableOpacity style={[styles.txtInpView2, {justifyContent:'center', alignItems:'center'}]}
                onPress={() => showDatePicker('startDate')}>
                <Text
                 style={{ fontSize:hp('1.6'), color:'gray'}}
                >
                  {startDate != null
                    ? startDatestr
                    : 'select Date'}
                </Text>

                </TouchableOpacity>

              </View>
            </View>
            <View style={[styles.inpMainView2, { position:'absolute', right:0}]}>
              <Text style={styles.txtHead}>End time</Text>
              <View style={styles.inpSubView}>
                <TouchableOpacity style={[styles.txtInpView2, {justifyContent:'center', alignItems:'center'}]}
                  onPress={() => showDatePicker('endDate')}>
                  <Text
                   style={{ fontSize:hp('1.6'), color:'gray'}}
                  >
                    {endDate != null
                      ? endDatestr
                      : 'select Date'}
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
                  onChangeText={(text) => setNote(text)}
                >
                  {note}
                </TextInput>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.bckBtn} activeOpacity={0.9}
           onPress={() =>  route.params.navigation.goBack()}>
            <Text style={styles.bckBtnTxt}>BACK TO CALENDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveBtn}
            onPress={() => addtoappointment()}
          >
            <Text style={styles.saveBtnTxt}>UPDATE APPOINTMENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(EditAppointment);

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
