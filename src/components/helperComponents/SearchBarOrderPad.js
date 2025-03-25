import React, { Component, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";
import StyleSheet from "react-native-media-query";
import { Searchbar } from "react-native-paper";

import getValidToken from "../../operation/Token";
import getValidSearchList from "./SearchList";
import { widthPercentageToDP } from "react-native-responsive-screen";
import * as colors from '../style/Common/ColorsStyle';
const windowWidth = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MainSearchBar = (props) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([]);

  const token = useSelector((state) => state.login.loginToken);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      getSearchList(query, token);
    } else {
      setData([]);
    }
  };

  function getSearchList(query, token) {
    async function getSearchListAsync(query) {
      const searchList = await getValidSearchList(token, query);
      setData(searchList);
    }

    getSearchListAsync(query);
  }

  const { pageFlag } = props;

  return (
    <View
      style={
        pageFlag == "home" || data.length == 0
          ? { marginTop: 0 }
          : { marginTop: 24 }
      }
    >
      <Searchbar
        autoCorrect={false}
        autoCapitalize={false}
        // icon={({ size, color }) => (
        //   null
        // )}
        // clearIcon={({ size, color }) => (
        //   null
        // )}
        iconColor="#1ED18C"
        style={styles.searchbox}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View
        style={{ width: wp('80'),zIndex: 1, backgroundColor: "white",   borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10, }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            if (item.count < 6) {
              return (
                <TouchableOpacity
                  style={styles.itemelement}
                  activeOpacity={1}
                  onPress={() => {
                    setSearchQuery(item.title);
                    setData([]);
                    this.props.navigation.navigate('productDetails', { product: item.code });
                  }}
                >
                  <Text style={styles.title}>
                    {item.code} -{" "}
                    {item.title.length < 60
                      ? `${item.title}`
                      : `${item.title.substring(0, 60)}...`}
                  </Text>
                </TouchableOpacity>
              );
            }

            if (item.count == 6) {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#1ED18C",
                    padding: 12,
                    textAlignVertical: "center",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    setData([]);
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center", fontSize:hp('1.5') }}>
                    See all results
                  </Text>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

// const Item = ({ title, code }) => {
//   return (

//   )
// };

// const renderItem = ({ item }) => (
//   <Item title={item.title} code={item.code} />
// );

class SearchBarOrderPad extends Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }


  render() {

    console.log(this.props);

    return (
      <View>
        <MainSearchBar pageFlag={this.props.pageFlag} />
      </View>
    );
  }
}

const { ids, styles } = StyleSheet.create({
  searchbox: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#F6F6F6",
    elevation: 0,
    alignItems: "center",
    "@media (max-width: 1600px) and (min-width: 500px)": {
      height: 60,
      borderWidth: 1.3,
    },
    "@media (max-width: 500px)": {
      borderRadius: 9,
      height: 50,
      borderWidth: 1,
    },
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemelement: {
   // backgroundColor: "red",
    padding: 12,
    marginVertical: 1,
    marginHorizontal: 8,
    borderBottomWidth:1,
    borderColor:'#EEEEEE'
  },
  title: {
    fontSize: 16,
  },
});

export default SearchBarOrderPad;
