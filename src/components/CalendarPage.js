import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import Styles from '../style/ProfileStyle';
import Back from './common/Back';
import {connect, useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Card, Avatar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/Fonts';
import { showMessage } from "react-native-flash-message";

import DataAdapter from "../offline/localData/DataAdapter";
import {useIsFocused} from '@react-navigation/native';

import {getAddedAppointments, dateFixForDayCalendar} from '../actions/AddappointmentAction';
import {convertDateTimeToStr} from '../utils/ValidationHelper';
import {ToggleButton} from 'react-native-paper';
//import { Calendar, CalendarList, Agenda } from "react-native-calendars";
//import { Calendar } from "react-native-big-calendar";
//import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import StyleSheet from 'react-native-media-query';
import {Calendar} from 'react-native-big-calendar';
import EventCalendar from 'react-native-events-calendar';

import DeleteAppointment from './appointments/DeleteAppointment';
import * as colors from '../style/Common/ColorsStyle';


import {withNavigation} from 'react-navigation';
const addicn = require('../assets/add2x.png');

import RNCalendarEvents from 'react-native-calendar-events';
import ConfirmationBox from './common/ConfirmationBox';  

const arrowleft = require('../assets/Calendar/arrowleft2x.png');
const arrowright = require('../assets/Calendar/arrowright2x.png');
const del = require('../assets/del.png');
const edticon = require('../assets/editgreen.png');
const multiply = require("../assets/multiply.png");

const emailicn = require("../assets/StoreQuotes/email2x.png");
const noteicn = require("../assets/Contacts/messagesquare2x.png");
const cal = require("../assets/calendar_res.png");
const map = require("../assets/mapres.png");
const closeoutline = require('../assets/Calendar/closeoutline2x.png')

const timeToString = props => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarPage = ({navigation, time}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const [calMode, setCalMode] = useState('month');
  const [calDate, setCalDate] = useState();

  const [eventsList_, setEventsList_] = useState({});
  const [t, setT] = useState(null);

  const [selDate, setSelDate] = useState(new Date(Date.now()));

  const [items, setItems] = useState({});

  //modal
  const [mdlSubject, setMdlSubject] = useState();
  const [mdlEmail, setMdlEmail] = useState();
  const [mdlTimeStart, setmdlTimeStart] = useState();
  const [mdlLocation, setMdlLocation] = useState();
  const [mdlNote, setMdlNote] = useState();
  //modal

  const [back, setBack] = useState('no');

  //day calendar
  const [dayEvents, setDayEvents] = useState([]);

  //month calendar
  const [monthEvents, setMonthEvents] = useState([]);

  //dialog box
  const [showDialog, setShowDialog] = useState(false);
  const [contentText, setContentText] = useState('');

  const [deleteEventID, setDeleteEventID] = useState('');

  const [app_array, setApp_array] = useState([]);

  // const app_array = useSelector(state => state.calendar.appointmentsAdded);
  const app_obj = useSelector(state => state.calendar.appointmentsObj);
  const userInfo = useSelector(state => state.login.accountInfo);
  const b_check = useSelector(state => state.calendar.back);
  const cusName = useSelector((state) => state.findStore?.selItemName);


  var getDaysArray = function (start, end) {
    console.log(start);
    console.log(end);
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  useEffect(() => {



    test()



    remount();


  }, [isFocused]);


  useEffect(() => {

    
    setCalMode('month');
    RNCalendarEvents.requestPermissions((readOnly = false));

    
    // setItems([])
    var dt = new Date(Date.now());
    setSelDate(dt);
    setBack(b_check);
    // console.log(b_check);

    // temp();


    

    
    setMonthEvents([]);
    // temp();

    addEventsToMonthsAndDays();

  }, [app_array]);



  const remount = () => {
    initial().then(res => {
      res = res.filter(app => app.isDeleted != 1)

      setApp_array(res);

    });
  }

  async function test(){

  }
  
  // main operation - get data
  async function initial(){

    const payload = {
      section: 'APPOINTMENTS',
      opration: 'GET',
      data: '',
    }

    const newpro = await DataAdapter(payload);
    return newpro;
  }



  _eventTapped = a => {
    alert('tapped');
    // console.log(a);
  };

  confirmShow = contentTxt => {
    setContentText(contentTxt);
    setShowDialog(true);
  };

  closeConfirmation = () => {
    setShowDialog(false);
  };

  addEventsToMonthsAndDays = () => {
    let array = [];
    let dayArray = [];
  
    for (let i = 0; i < app_array.length; i++) {
      const element = app_array[i];

      if(element.sopUserId == userInfo.customerUserID){
        let startDate = new Date(element.startDate);
        let endDate = new Date(element.endDate);
  
     
        let obj = {
          title: element.subject,
          start: startDate,
          end: endDate,
          summary: element.note,
          id: element.id,
          email: element.email,
          location: element.location
        };

      
        array.push(obj);
        let sd = new Date(element.startDateforDay);
        let ed = new Date(element.endDateforDay);
        

      


        var daylist = getDaysArray(sd, ed);
        console.log(daylist);
        for (let j = 0; j < daylist.length; j++) {
          let sdate = null;
          let stime = null;
          let edate = null;
          let etime = null;
          
          
          if (j === 0) {
            // let MyDateString = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth()+1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);
            sdate = startDate.getFullYear() + '-'+ (startDate.getMonth() + 1) + '-'+ startDate.getDate();
            stime = startDate.toLocaleTimeString('en-US', {hour12: false});
  
            edate = sdate;
            etime = '23:59:59';
          }
          if (j === daylist.length - 1) {
            let e_ = endDate.getFullYear() + '-'+ (endDate.getMonth() + 1) + '-'+ endDate.getDate();
            sdate = sdate ?? e_;
            stime = stime ?? '00:00:00';
  
            edate = e_;
            etime = endDate.toLocaleTimeString('en-US', {hour12: false});
          }
          if (j > 0 && j < daylist.length - 1) {
            sdate = daylist[j].getFullYear() + '-'+ (daylist[j].getMonth() + 1) + '-'+ daylist[j].getDate();
            stime = '00:00:00';
  
            edate = daylist[j].getFullYear() + '-'+ (daylist[j].getMonth() + 1) + '-'+ daylist[j].getDate();
            etime = '23:59:59';
          }

  
          
          let obj_day = {
            location:element.location,
            email: element.email,
            title: element.subject,
            start: sdate + ' ' + stime,
            end: edate + ' ' + etime,
            summary: element.note,
            id: element.id,
            eventStart: sdate + ' ' + stime,
            eventEnd: edate + ' ' + etime,
          };
          dayArray.push(obj_day);
        }
      }

      
    }

    setMonthEvents(array);
    setDayEvents(dayArray);
  };




  const getdatefromcalendar = dt => {
    const d = dt[0];

    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var d1 = new Date(d);
    var monthName = months[d1.getMonth()];
    console.log(monthName);
    setCalDate(monthName + ' ' + d1.getFullYear());
  };

  const darkTheme = {
    palette: {
      primary: {
        main: '#1ED18C',
        contrastText: 'white',
      },
      evenCellBg: '#E5FCF3',
      oddCellBg: 'white',
      gray: {
        100: '#1ED18C',
        200: '#DEDEDE',
        300: 'black',
        500: 'black',
        800: 'black',
      },
    },
    isRTL: true,
    typography: {
      xs: 12,
      sm: 15,
      xl: 30,
    },
  };

  selectDate = date => {
    // var strDate = date.split('T')[0];
    const d = new Date(date);
    let text = d.toISOString();

    text = text.split('T')[0];
    console.log(text);
    setSelDate(text);
    setCalMode('day');
  };

  const removeEventById = async () => {



    const result = await DeleteAppointment(deleteEventID);

    if (result == "Deleted") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Deleted Successfully",
        type: "success",
        autoHide: true,
      });
    }else{
      showMessage({
        message: "KINGS SEEDS",
        description: result,
        type: "warning",
        autoHide: true,
      });
    }
    

    

    setCalMode('month');

    remount();

    addEventsToMonthsAndDays();

// console.log('====================================');
// console.log(deleteEventID);
// console.log('====================================');
    




    // // get index of object with id of 37
    // const removeIndex = arr_.findIndex(item => item.id === deleteEventID);
    // // remove object
    // arr_.splice(removeIndex, 1);

    // RNCalendarEvents.removeEvent(deleteEventID).then(status => {
    //   console.log(status);

    //   dispatch(getAddedAppointments(arr_));

    //   setDeleteEventID('');

    //   addEventsToMonthsAndDays();
    // });

    closeConfirmation();
  };

  const renderEventItem = event => {
    console.log('====================================');
    console.log(dayEvents);
    console.log('====================================');
console.log('=============fdsfsdgs=======================');
console.log(event);
console.log('====================================');
return (
  <TouchableOpacity 
  onPress={() => {
    setMdlEmail(event.email)
    setMdlSubject(event.title)
    
    let d = event.eventStart + '  To  '+ event.eventEnd
    setmdlTimeStart(d);

    setMdlNote(event.summary);

    setMdlLocation(event.location);

    setModalVisible(true)}}
    >
    <View
      style={{
        width: '98%',
        height: hp('3'),
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        style={{width: wp('5'), height: hp('3'), marginRight: wp('1')}}
        // onPress={()=>  navigation.navigate('editAppointment', { screen: 'editAppointment', params: { id: event.id, navigation: navigation } })}
        onPress={() =>{
          if(cusName == null || cusName == ''){
            showMessage({
              message: "KINGS SEEDS",
              description: "Please select a store before continue",
              type: "warning",
              autoHide: true,
            });
            navigation.navigate("findstore");
          }else{
            navigation.navigate('editAppointment', {
              appId: event.id,
              event: event,
              navigation: navigation,
            })
          }
        }

        } //id
      >
        <Image source={edticon} style={styles.addIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: wp('5'),
          height: hp('3'),
        }}
        onPress={() => {
          setDeleteEventID(event.id);
          confirmShow('Are you sure you want to delete this event?');
        }}>
        <Image source={del} style={styles.addIcon} />
      </TouchableOpacity>
    </View>
    <Text style={{color:'gray', fontSize:hp('2.2')}}>{event.title}</Text>
    <Text style={{color:'gray', marginTop:hp('1'), fontSize:hp('1.6')}}>{event.summary}</Text>
    <Text style={{color:'gray', marginTop:hp('1'), fontSize:hp('1.6')}}>Start Time : {event.eventStart}</Text>
    <Text style={{color:'gray', fontSize:hp('1.6')}}>End Time   : {event.eventEnd}</Text>
    {/* <Text>{event.id}</Text> */}
  </TouchableOpacity>
);
  };



  

  


  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: '100%',
                height: '25%',
                backgroundColor: '#1ED18C',
                flexDirection: 'row',
                borderTopRightRadius:wp('1'),
                borderTopLeftRadius:wp('1'),
              }}>
              <Text
              numberOfLines={1}
                style={[
                  styles.modalText,
                  {
                    alignSelf: 'center',
                    textAlign: 'left',
                    marginLeft: wp('4'),
                    fontSize: hp('1.7'),
                    width: '80%',
                    color: 'white',
                  },
                ]}>
                {mdlSubject}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.modalClose}>
                <Image source={closeoutline} style={styles.cardImg} />
              </TouchableOpacity>
            </View>
            <View style={styles.subModaltxtView}>
              <View style={styles.subModalicnView}>
                <Image source={emailicn} style={styles.cardImg1} />
              </View>
              <Text style={styles.modalText}>{mdlEmail}</Text>
            </View>
            <View style={styles.subModaltxtView}>
              <View style={styles.subModalicnView}>
                <Image source={cal} style={styles.cardImg1} />
              </View>
              <Text style={styles.modalText}>{mdlTimeStart}</Text>
            </View>
            <View style={styles.subModaltxtView}>
              <View style={styles.subModalicnView}>
                <Image source={map} style={styles.cardImg1} />
              </View>
              <Text style={styles.modalText}>{mdlLocation}</Text>
            </View>
            <View style={[styles.subModaltxtView, {height:'auto',maxHeight:hp('10'),marginBottom:hp('1'), alignItems:"flex-start"}]}>
              <View style={[styles.subModalicnView,{height:hp('3')}]}>
                <Image source={noteicn} style={styles.cardImg1} />
              </View>
              <ScrollView style={{
                maxHeight:hp('7'),
                height:'auto',
                marginBottom:hp('2'),
                paddingTop:hp('0.1'),
              }}>
                
                <Text
                style={[
                  styles.modalText,
                  { width: '100%', textAlign: 'left', marginTop:hp('0.2')},
                ]}>
                {mdlNote}
              </Text>
              
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <ConfirmationBox
        showHide={showDialog}
        yes={() => removeEventById()}
        no={() => closeConfirmation()}
        contentText={contentText}
      />
      <View style={Styles.container}>
        <Back />
        <View style={styles.titleView}>
          <Text style={Styles.titleTxt} allowFontScaling={false}>
            Calendar
          </Text>

          <TouchableOpacity
            style={styles.addCustomerBtn}
            onPress={() => {
            //  navigation.navigate('addNewAppointment');
            if(cusName == null || cusName == ''){
              showMessage({
                message: "KINGS SEEDS",
                description: "Please select a store before continue",
                type: "warning",
                autoHide: true,
              });
              navigation.navigate("findstore");
            }else{
              navigation.navigate('addNewAppointment');
            }
            }}>
            <Image source={addicn} style={styles.addIcon} />
            <Text style={styles.newContactTxt} allowFontScaling={false}>
              New Appointment
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '94%',
            flexDirection: 'row',
            height: hp('4.5'),
            alignItems: 'center',
          }}>
          {calMode == 'day' ? (
            <TouchableOpacity
              style={styles.monthbtn}
              onPress={() => {
                setCalMode('month');
              }}>
              <Text style={styles.newContactTxt} allowFontScaling={false}>
                Month
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.titleTxt1} allowFontScaling={false}>
              {calDate}
            </Text>
          )}
        </View>
        <View
          style={{
            height: hp('66'),
            marginTop: hp('2'),
            width: wp('94'),
            backgroundColor: 'white',
            borderRadius: 8,
          }}>
          {calMode == 'day' ? (
            <EventCalendar
              // eventTapped={_eventTapped()}
              events={eventsListRefactor(dayEvents)}
              
              // events={[{ start: '2023-01-14 00:30:00', end: '2023-01-14 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }]}
              // events={[[{"email": "Fgfg", "end": "2022-12-16 12:41:00", "eventEnd": "2022-12-16 12:41:00", "eventStart": "2022-12-16 11:41:00", "id": "112", "location": "Xhg", "start": "2022-12-16 11:41:00", "summary": "", "title": "Cgf"}]]}
              width={wp('94')}
              initDate={selDate}
              scrollToFirst={true}
              renderEvent={event => renderEventItem(event)}
            />
          ) : (
            // <EventCalendar
            //   eventTapped={_eventTapped.bind(this)}
            //   events={eventsDummy}
            //   width={wp("94")}
            //   initDate={selDate}
            // />
            // <Agenda
            //   items={eventsList_}
            //   //loadItemsForMonth={loadItems}
            //   selected={"2022-01-06"}
            //   renderItem={renderItem}
            // />
            <Calendar
              headerComponent={true}
              //renderHeaderForMonthView={() => monthHeader()}
              events={monthEvents}
              height={200}
              swipeEnabled={true}
              //  date={selDate}
              mode={calMode}
              showTime={true}
              onChangeDate={date => getdatefromcalendar(date)}
              calendarContainerStyle={{backgroundColor: 'green'}}
              style={{
                style: {
                  backgroundColor: 'green',
                  borderRadius: '0px',
                  opacity: 0.8,
                  color: 'red',
                  border: '0px',
                  display: 'block',
                },
              }}
              theme={darkTheme}
              eventCellStyle={{
                backgroundColor: '#1ED18C',
                //minHeight: hp("1"),
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: wp('0.1'),
                alignItems: 'center',
              }}
              weekDayHeaderHighlightColor={colors.primaryColor}
              onPressCell={date => selectDate(date)}
              onPressEvent={date => selectDate(date.start)}
              eventPropGetter={{
                style: {
                  backgroundColor: 'green',
                  borderRadius: 20,
                  opacity: 0.8,
                  color: 'black',
                  border: '0px',
                  display: 'block',
                },
              }}
            />
          )}
        </View>
      </View>

      {/*  */}
    </SafeAreaView>
  );
};

function eventsListRefactor(events) {


  let refactoredEvents = events.map(dayEvent => {
    

    let startMonth = parseInt(dayEvent.start.split('-')[1]);
    let endMonth = parseInt(dayEvent.end.split('-')[1]);
    if (startMonth < 10) {
      dayEvent.start = dayEvent.start.split('-')[0] + '-' + "0" + startMonth.toString() + '-' + dayEvent.start.split('-')[2];
      dayEvent.end = dayEvent.end.split('-')[0] + '-' + "0" + endMonth.toString() + '-' + dayEvent.end.split('-')[2];
      
      console.log('=======g=============================');
      console.log(dayEvent);
      console.log('====================================');
      return dayEvent
    }else{
      return dayEvent
    }
    
  })



  console.log('====================================');
  console.log(refactoredEvents);
  console.log('====================================');

  return events;
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, {})(CalendarPage);

let widthper = wp('100%');
let crd_wdth = 0;
let tab_h = 0;
title_txt = 0;
if (widthper <= 500.0) {
  crd_wdth = wp('94');
  tab_h = hp('4');
  title_txt = hp('1.7');
} else {
  crd_wdth = wp('65');
  tab_h = hp('4.4');
  title_txt = hp('1.9');
}

const {ids, styles} = StyleSheet.create({
  titleView: {
    width: '94%',
    height: hp('4.5'),
    alignSelf: 'center',
    marginTop: hp('1'),
    marginBottom: hp('1'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 100,
    height: hp('4'),
    backgroundColor: '#E7FEF5',
    '@media (max-width: 1600px) and (min-width: 450px)': {
      width: 100,
      height: hp('3.5'),
    },
    '@media (max-width: 450px)': {
      width: 60,
      height: hp('4'),
    },
  },
  btnactive: {
    width: 100,
    height: hp('4'),
    backgroundColor: '#1ED18C',
    '@media (max-width: 1600px) and (min-width: 450px)': {
      width: 100,
      height: hp('3.5'),
    },
    '@media (max-width: 450px)': {
      width: 60,
      height: hp('4'),
    },
  },
  btntxt: {
    color: '#1ED18C',
    fontSize: 14,
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: 18,
    },
    '@media (max-width: 450px)': {
      fontSize: 14,
    },
  },
  btntxtActive: {
    color: 'white',
    fontSize: 14,
    '@media (max-width: 1600px) and (min-width: 450px)': {
      fontSize: 18,
    },
    '@media (max-width: 450px)': {
      fontSize: 14,
    },
  },
  monthChngBtn: {
    width: wp('6'),
    height: hp('3'),
    backgroundColor: 'white',
    borderWidth: wp('0.2'),
    borderColor: '#EEECEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1'),
    '@media (max-width: 1600px) and (min-width: 450px)': {
      width: wp('6'),
      height: hp('3'),
    },
    '@media (max-width: 450px)': {
      width: wp('9'),
      borderWidth: wp('0.3'),
      height: hp('4'),
    },
  },
  cardImg: {
    resizeMode: 'contain',
    height: hp('1.5'),
  },
  monthbtn: {
    width: wp('15'),
    height: hp('4.5'),
    backgroundColor: '#F9F9F9',
    borderColor: '#1ED18C',
    borderWidth: wp('0.2'),
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    '@media (max-width: 1600px) and (min-width: 500px)': {
      height: hp('4.5'),
    },
    '@media (max-width: 500px)': {
      height: hp('4'),
    },
  },
  addCustomerBtn: {
    width: wp('30'),
    height: hp('4.5'),
    backgroundColor: '#F9F9F9',
    borderColor: '#1ED18C',
    borderWidth: wp('0.2'),
    borderRadius: wp('1.5'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: '1%',
    position: 'absolute',
    right: 0,
    '@media (max-width: 1600px) and (min-width: 500px)': {
      height: hp('4.5'),
    },
    '@media (max-width: 500px)': {
      height: hp('4'),
    },
  },
  addIcon: {
    alignSelf: 'center',
    marginLeft: wp('2'),
    width: wp('3'),
    height: hp('2.9'),
    resizeMode: 'contain',
    '@media (max-width: 1600px) and (min-width: 500px)': {},
    '@media (max-width: 500px)': {},
  },
  newContactTxt: {
    fontSize: wp('2.3'),
    fontFamily: Fonts.PoppinsBold,
    color: '#1ED18C',
    alignSelf: 'center',
    marginRight: wp('2'),
    marginLeft: wp('2'),
    '@media (max-width: 1600px) and (min-width: 500px)': {},
    '@media (max-width: 500px)': {
      marginLeft: wp('1'),
      fontSize: wp('2.6'),
    },
    //textAlign: 'center',
  },
  dateTitle: {
    fontSize: title_txt,
    fontFamily: Fonts.PoppinsBold,
    color: 'black',
    fontWeight: 'bold',
  },
  cardImg: {
    flex: 1,
    aspectRatio: 0.4,
    resizeMode: 'contain',
    //resizeMethod: 'cover',
  },
  titleTxt1: {
    fontSize: hp('2'),
    color: '#1ED18C',
  },


  //modal
  modalClose:{
    height: '40%',
    width: wp('5'),
    alignSelf: 'center',
    position: 'absolute',
    right: wp('1'),
    '@media (max-width: 450px)': {
      right: wp('2.5'),
    },
  },
  cardImg: {
    aspectRatio: 1,
    height:'100%',
    resizeMode: "contain",
  },
  cardImg1: {
    aspectRatio: 0.5,
    height:'100%',
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp('7'),
    shadowColor: '#000',
    borderRadius: wp('1'),
    height: 'auto',
    width: wp('94'),
    paddingBottom: hp('1'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  
  modalText: {
    textAlign: 'center',
    fontSize:hp('1.5'),
    color:'black'
  },
  subModaltxtView:{
    height:hp('3'),
    width:'93%',
    flexDirection:"row",
    alignSelf:'center',
    alignItems:'center',
  },
  subModalicnView:{
    width:wp('4'),
    height:hp('3'),
    marginRight:wp('2'),
    alignItems:'center',
  },
  //modal
});
