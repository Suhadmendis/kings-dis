// import RNFetchBlob from "rn-fetch-blob";

import { PermissionsAndroid } from "react-native";

import axios from "axios";
import { showMessage } from "react-native-flash-message";

import mime from "mime";
import { connect, useDispatch, useSelector } from "react-redux";
import {store} from "../../configureStore";
//import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from "react-native-calendar-events";
import { EmailValidation } from "../utils/ValidationHelper";
import{sendAppointmentEmail} from "../actions/SendAppointmentEmail"

var S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

function getDateTime (date){
  var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  return isoDateTime;
}

export const addAppointment = async (
  email,
  subject,
  location,
  startDate,
  endDate,
  note,
  app_array,
  checkMail,
  navigation
) => {
 
  getcalenderEventObj(arrayDummy)

  let state = store.getState();
  let storeName= state.findStore?.selItemName;

  if(storeName == '' || storeName == null){
    showMessage({
      message: "KINGS SEEDS",
      description: "Please select a store before continue",
      type: "warning",
      autoHide: true,
    });
  }

 
  var idGuid =
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4();

  try {
    let array = [...app_array];

    if (email == null || email == "") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Email cannot be empty",
        type: "warning",
        autoHide: true,
      });
    }else if(!EmailValidation(email)){
      showMessage({
        message: "KINGS SEEDS",
        description: "Please enter valid email",
        type: "warning",
        autoHide: true,
      });
    }
    else if (subject == null || subject == "") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Subject cannot be empty",
        type: "warning",
        autoHide: true,
      });
    } else if (startDate == null || endDate == null) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Dates cannot be empty",
        type: "warning",
        autoHide: true,
      });
    } else if (endDate < startDate) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Select valid end date or start date",
        type: "warning",
        autoHide: true,
      });
    } else {
      var itm_id = 0;

      const granted = await RNCalendarEvents.requestPermissions((readOnly = false));
      // console.log("granted... ", granted);
      if (granted === "authorized") {
        // console.log("clanedar=========================");
        try {
          let startDateISOString = getDateTime(startDate);
          let endDateISOString = getDateTime(endDate);

           let startDateISOString_forLocal = startDate.toISOString();
           let endDateISOString_forLocal = endDate.toISOString();

          RNCalendarEvents.saveEvent(subject, {
            startDate: startDateISOString_forLocal,
            endDate: endDateISOString_forLocal,
            location: location,
            notes: note,
          })
            .then((status) => {
              // console.log(status);
              itm_id = status;

              // cannot persist Date objects. its automatically serialized. so we store ISOString 
              
              
              let acountInfo = state.login?.accountInfo; 
              let userName = state.login?.fullName;
              let app_obj_email = {
                email: email,
                subject: subject,
                location: location,
                startDate: startDateISOString,
                endDate: endDateISOString,
                note: note,
                id: itm_id,
                sopUserId: acountInfo.customerUserID,
                storeName: storeName,
                sopFullName: userName
              };

              //dates should need to convert into toISOString. otherwise it'll show wrong times in calendar
              let app_obj = {
                email: email,
                subject: subject,
                location: location,
                startDate: startDateISOString_forLocal,
                endDate: endDateISOString_forLocal,
                startDateforDay: startDateISOString,
                endDateforDay: endDateISOString,
                note: note,
                id: itm_id,
                sopUserId: acountInfo.customerUserID,
                storeName: storeName,
                sopFullName: userName
              };
              array.push(app_obj);
              //array = [];
              console.log(checkMail);
              store.dispatch(getAddedAppointments(array));
              store.dispatch(getBack('yes'));
              // navigation.navigate("CalendarPage");

              if(checkMail== true){
                sendEmail(app_obj_email);
              }

              showMessage({
                message: "KINGS SEEDS",
                description: "Appointment added successfully",
                type: "success",
                autoHide: true,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        showMessage({
          message: "KINGS SEEDS",
          description: "Need calendar access to add appointments",
          type: "warning",
          autoHide: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    showMessage({
      message: "KINGS SEEDS",
      description: "Something went wrong",
      type: "warning",
      autoHide: true,
    });
  }
};



const sendEmail=async (obj)=>{
  try {
    var object = await sendAppointmentEmail(obj);
    // console.log(object);
  } catch (error) {
    console.log(error);
  }
   
}




export const editAppointment = async (
  email,
  subject,
  location,
  startDate,
  endDate,
  note,
  app_array,
  id,
  mailchecked,
  navigation
) => {
  //let app_array = useSelector((state) => state.calendar.appointmentsAdded);
  // var combined_S_date = startDate + "T" + startTime;
  // var combined_E_date = endDate + "T" + endTime;

  // var dateOne = new Date(combined_S_date);
  // var dateTwo = new Date(combined_E_date);
  // console.log(arrayDummy);
  getcalenderEventObj(arrayDummy);

  let state = store.getState();
  let storeName= state.findStore?.selItemName;

  console.log(startDate);

  try {
    let array = [...app_array];
    if(storeName == '' || storeName == null){
      showMessage({
        message: "KINGS SEEDS",
        description: "Please select a store before continue",
        type: "warning",
        autoHide: true,
      });
    } else if (email == null || email == "") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Email cannot be empty",
        type: "warning",
        autoHide: true,
      });
    }
  else if(!EmailValidation(email)){
    showMessage({
      message: "KINGS SEEDS",
      description: "Please enter valid email",
      type: "warning",
      autoHide: true,
    });
  }
    else if (subject == null || subject == "") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Subject cannot be empty",
        type: "warning",
        autoHide: true,
      });
    } else if (startDate == null || endDate == null) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Dates cannot be empty",
        type: "warning",
        autoHide: true,
      });
    } else if (endDate < startDate) {
      showMessage({
        message: "KINGS SEEDS",
        description: "Select valid end date or start date",
        type: "warning",
        autoHide: true,
      });
    } else {
      var itm_id = 0;

      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.id == id) {
          array[i].note = note;
          array[i].subject = subject;
          array[i].startDate = startDate;
          array[i].endDate = endDate;
          array[i].location = location;
          array[i].email = email;

        

          let startDateISOString_forLocal = startDate.toISOString();
          let endDateISOString_forLocal = endDate.toISOString();

          RNCalendarEvents.saveEvent(subject, {
            id: id,
            startDate: startDateISOString_forLocal,
            endDate: endDateISOString_forLocal,
            location: location,
            notes: note,
          }) .then((status) => {
            // console.log(status);
            store.dispatch(getAddedAppointments(array));

            if(mailchecked== true){
              let acountInfo = state.login?.accountInfo; 
              let userName = state.login?.fullName;

            
              let app_obj = {
                email: email,
                subject: subject,
                location: location,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                note: note,
                storeName: storeName,
                sopFullName: userName
              };

              let startDateISOString = getDateTime(startDate);
              let endDateISOString = getDateTime(endDate);
              let app_obj_email = {
                email: email,
                subject: subject,
                location: location,
                startDate: startDateISOString,
                endDate: endDateISOString,
                note: note,
                storeName: storeName,
                sopFullName: userName
              };
              sendEmail(app_obj_email);
            }

            showMessage({
              message: "KINGS SEEDS",
              description: "Appointment edited successfully",
              type: "success",
              autoHide: true,
            });
            navigation.navigate("CalendarPage");
          });
        }
      }

    }

  } catch (error) {
    showMessage({
      message: "KINGS SEEDS",
      description: "Something went wrong",
      type: "warning",
      autoHide: true,
    });
  }
};




export function dateFixForDayCalendar(sdate){
  let date;
  if(sdate.getMinutes()<=29 && sdate.getHours<=5){
    date = sdate.setDate(sdate.getDate()+1);
    return date;
  }else{
    return sdate;
  }
  
}





export const getAddedAppointments = (array) => async (dispatch) => {
  dispatch({
    type: "GET_ADDED_APPS",
    payload: array,
  });
};

export const getcalenderEventObj = (object) => async (dispatch) => {
  dispatch({
    type: "GET_ADDED_OBJ",
    payload: object,
  });
};

export const getBack = (text) => async (dispatch) => {
  dispatch({
    type: "GET_BACK",
    payload: text,
  });
};


let arrayDummy = {
  "2022-01-14": [
    { name: "subject", note: "note", time: "12:30-1:30" },
    { name: "subject", note: "note", time: "2:30-3:30" },
  ],
  "2022-01-15": [
    { name: "subject", note: "note", time: "12:30-1:30" },
    { name: "subject", note: "note", time: "5:30-6:30" },
  ],
};

const obj = {
  data: [
    { name: "subject", note: "note", time: "12:30-1:30" },
    { name: "subject", note: "note", time: "12:30-1:30" },
  ],
};

const addToCalenderobj =()=>{

}
