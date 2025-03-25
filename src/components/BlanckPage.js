import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Styles from "../style/ContactsNotesStyle";
import { connect } from "react-redux";
import BlankComponent from '../components/common/BlankComponent';
import Header from "./common/Header";
import Footer from "./common/Footer";
import Back from "./common/Back";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const search = require("../assets/search-green.png");

const filter = require("../assets/add-alt.png");
const edticon = require("../assets/edit-line.png");
const telicon = require("../assets/telephone.png");
const del = require("../assets/del.png");
const viewicon = require("../assets/view.png");
const notesicon = require("../assets/clone-line.png");



const { ids, styles } = Styles;

class BlanckPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
           {/* <Header /> */}
          <Back />
                <BlankComponent/>
        {/* <Footer/> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    cartArray: state.home.cartArray,
  };
};

export default connect(mapStateToProps, {
})(BlanckPage);
