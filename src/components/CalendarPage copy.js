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
  Dimensions,
  Alert,
} from "react-native";
import Styles from "../style/ProfileStyle";
import { Actions } from "react-native-router-flux";
import Back from "./common/Back";
import { connect, useDispatch, useSelector } from "react-redux";

import { Card, Avatar } from "react-native-paper";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Fonts } from "../utils/Fonts";
import * as colors from '../style/Common/ColorsStyle';
import { ToggleButton } from "react-native-paper";
//import { Calendar, CalendarList, Agenda } from "react-native-calendars";
//import { Calendar } from "react-native-big-calendar";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import StyleSheet from "react-native-media-query";

import { withNavigation } from "react-navigation";
const addicn = require("../assets/add2x.png");

const arrowleft = require("../assets/Calendar/arrowleft2x.png");
const arrowright = require("../assets/Calendar/arrowright2x.png");
const events = [
  {
    title: "Meeting",
    start: new Date(2022, 0, 3, 10, 0),
    end: new Date(2022, 0, 5, 10, 45),
  },
  {
    title: "Coffee break",
    start: new Date(2022, 0, 3, 10, 0),
    end: new Date(2022, 0, 4, 10, 45),
  },
];

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const CalendarPage = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [calMode, setCalMode] = useState("month");
  const [value, setValue] = React.useState("Light");
  const [calDate, setCalDate] = useState();

  const [selDate, setSelDate] = useState(new Date(Date.now()));

  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    console.log("================================");
    console.log(selDate);
    var dt = new Date(Date.now());
    setSelDate(dt);
  }, []);

  const getdatefromcalendar = (dt) => {
    const d = dt[0];

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d1 = new Date(d);
    var monthName = months[d1.getMonth()];
    console.log(monthName);
    setCalDate(monthName + " " + d1.getFullYear());
  };

  const increaseMonth = () => {
    if (calMode == "month") {
      var newDate = new Date(selDate.setMonth(selDate.getMonth() + 1));
    } else if (calMode == "week") {
      var newDate = new Date(selDate.setDate(selDate.getDate() + 7));
    } else {
      var newDate = new Date(selDate.setDate(selDate.getDate() + 1));
    }

    console.log(newDate);
    setSelDate(newDate);
  };

  const decreaseMonth = () => {
    if (calMode == "month") {
      var newDate = new Date(selDate.setMonth(selDate.getMonth() - 1));
    } else if (calMode == "week") {
      var newDate = new Date(selDate.setDate(selDate.getDate() - 7));
    } else {
      var newDate = new Date(selDate.setDate(selDate.getDate() - 1));
    }

    console.log(newDate);
    setSelDate(newDate);
  };
  const darkTheme = {
    palette: {
      primary: {
        main: colors.primaryColor,
        contrastText: "white",
      },
      evenCellBg: "#E5FCF3",
      oddCellBg: "white",
      gray: {
        100: colors.primaryColor,
        200: "#DEDEDE",
        300: "black",
        500: "black",
        800: "black",
      },
    },
    isRTL: true,
    typography: {
      xs: 12,
      sm: 15,
      xl: 30,
    },
  };

  const monthHeader = () => {
    return (
      <Text style={Styles.titleTxt} allowFontScaling={false}>
        {calDate}
      </Text>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        <Back />
        <View style={styles.titleView}>
          <Text style={Styles.titleTxt} allowFontScaling={false}>
            Calendar
          </Text>
          {/* <Text style={styles.titleTxt} allowFontScaling={false}>
            {calDate}
          </Text> */}

          <TouchableOpacity
            style={styles.addCustomerBtn}
            onPress={() => {
              navigation.navigate("addNewAppointment");
            }}
          >
            <Image source={addicn} style={styles.addIcon} />
            <Text style={styles.newContactTxt} allowFontScaling={false}>
              Add New Appointment
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp("94"),
            flexDirection: "row",
            alignItems: "center",
            height: hp("4"),
          }}
        >
          <Text style={styles.dateTitle} allowFontScaling={false}>
            {calDate}
          </Text>
          <View
            style={{
              width: wp("20"),
              height: hp("4"),
              marginLeft: wp("2"),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.monthChngBtn}
              onPress={() => decreaseMonth()}
            >
              <Image source={arrowleft} style={styles.cardImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.monthChngBtn, { marginLeft: wp("1") }]}
              onPress={() => increaseMonth()}
            >
              <Image source={arrowright} style={styles.cardImg} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              right: 0,
              backgroundColor: "#E7FEF5",
              borderWidth: wp("0.1"),
              borderColor: "#D9FAED",
              borderRadius: wp("0.8"),
            }}
          >
            <ToggleButton.Group
              onValueChange={(value) => {
                if (value != null) {
                  setCalMode(value);
                }
              }}
              value={calMode}
            >
              <ToggleButton
                color="green"
                style={[styles.btn, calMode === "month" && styles.btnactive]}
                icon={() => (
                  <View>
                    <Text
                      style={[
                        styles.btntxt,
                        calMode === "month" && styles.btntxtActive,
                      ]}
                    >
                      Month
                    </Text>
                  </View>
                )}
                value="month"
              />

              <ToggleButton
                color="green"
                icon={() => (
                  <View>
                    <Text
                      style={[
                        styles.btntxt,
                        calMode === "week" && styles.btntxtActive,
                      ]}
                    >
                      Week
                    </Text>
                  </View>
                )}
                style={[styles.btn, calMode === "week" && styles.btnactive]}
                value="week"
              />
              <ToggleButton
                color="green"
                style={[styles.btn, calMode === "day" && styles.btnactive]}
                icon={() => (
                  <View>
                    <Text
                      style={[
                        styles.btntxt,
                        calMode === "day" && styles.btntxtActive,
                      ]}
                    >
                      Day
                    </Text>
                  </View>
                )}
                value="day"
              />
            </ToggleButton.Group>
          </View>
        </View>
        <View
          style={{
            height: hp("69"),
            marginTop: hp("2"),
            width: wp("94"),
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={"2022-01-06"}
            renderItem={renderItem}
          />

          {/* <Calendar
            headerComponent={true}
            //renderHeaderForMonthView={() => monthHeader()}
            events={events}
            height={200}
            swipeEnabled={true}
            date={selDate}
            mode={calMode}
            showTime={true}
            onChangeDate={(date) => getdatefromcalendar(date)}
            calendarContainerStyle={{ backgroundColor: "green" }}
            style={{
              style: {
                backgroundColor: "green",
                borderRadius: "0px",
                opacity: 0.8,
                color: "red",
                border: "0px",
                display: "block",
              },
            }}
            theme={darkTheme}
            eventCellStyle={{
              backgroundColor: colors.primaryColor,
              //minHeight: hp("1"),
              justifyContent: "center",
              borderColor:'white',
              borderWidth:wp('0.1'),
              alignItems: "center",
            }}
            weekDayHeaderHighlightColor=colors.primaryColor
            eventPropGetter={{
              style: {
                backgroundColor: "green",
                borderRadius: 20,
                opacity: 0.8,
                color: "black",
                border: "0px",
                display: "block",
              },
            }}
          /> */}
        </View>
      </View>

      {/*  */}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
  };
};
export default connect(mapStateToProps, {})(CalendarPage);

let widthper = wp("100%");
let crd_wdth = 0;
let tab_h = 0;
title_txt = 0;
if (widthper <= 500.0) {
  crd_wdth = wp("94");
  tab_h = hp("4");
  title_txt = hp("1.7");
} else {
  crd_wdth = wp("65");
  tab_h = hp("4.4");
  title_txt = hp("1.9");
}

const { ids, styles } = StyleSheet.create({
  titleView: {
    width: "94%",
    height: hp("4.5"),
    alignSelf: "center",
    marginTop: hp("1"),
    marginBottom: hp("1"),
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: 100,
    height: hp("4"),
    backgroundColor: "#E7FEF5",
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: 100,
      height: hp("3.5"),
    },
    "@media (max-width: 450px)": {
      width: 60,
      height: hp("4"),
    },
  },
  btnactive: {
    width: 100,
    height: hp("4"),
    backgroundColor: colors.primaryColor,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: 100,
      height: hp("3.5"),
    },
    "@media (max-width: 450px)": {
      width: 60,
      height: hp("4"),
    },
  },
  btntxt: {
    color: colors.primaryColor,
    fontSize: 14,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: 18,
    },
    "@media (max-width: 450px)": {
      fontSize: 14,
    },
  },
  btntxtActive: {
    color: "white",
    fontSize: 14,
    "@media (max-width: 1600px) and (min-width: 450px)": {
      fontSize: 18,
    },
    "@media (max-width: 450px)": {
      fontSize: 14,
    },
  },
  monthChngBtn: {
    width: wp("6"),
    height: hp("3"),
    backgroundColor: "white",
    borderWidth: wp("0.2"),
    borderColor: "#EEECEC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("1"),
    "@media (max-width: 1600px) and (min-width: 450px)": {
      width: wp("6"),
      height: hp("3"),
    },
    "@media (max-width: 450px)": {
      width: wp("9"),
      borderWidth: wp("0.3"),
      height: hp("4"),
    },
  },
  cardImg: {
    resizeMode: "contain",
    height: hp("1.5"),
  },
  addCustomerBtn: {
    width: wp("33"),
    height: hp("4.5"),
    backgroundColor: "#F9F9F9",
    borderColor: colors.primaryColor,
    borderWidth: wp("0.2"),
    borderRadius: wp("1.5"),
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: "1%",
    position: "absolute",
    right: 0,
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: hp("4.5"),
    },
    "@media (max-width: 500px)": {
      height: hp("4"),
    },
  },
  addIcon: {
    alignSelf: "center",
    marginLeft: wp("2"),
    width: wp("3"),
    height: hp("2.9"),
    resizeMode: "contain",
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {},
  },
  newContactTxt: {
    fontSize: wp("2.3"),
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryColor,
    alignSelf: "center",
    marginRight: wp("2"),
    marginLeft: wp("2"),
    "@media (max-width: 1600px) and (min-width: 500px)": {},
    "@media (max-width: 500px)": {
      marginLeft: wp("1"),
      fontSize: wp("2.6"),
    },
    //textAlign: 'center',
  },
  dateTitle: {
    fontSize: title_txt,
    fontFamily: Fonts.PoppinsBold,
    color: "black",
    fontWeight: "bold",
  },
});
