import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "../../style/ProductSubcatStyle";
import { connect } from "react-redux";
import Back from "../common/Back";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
// import {getFilterData, getSelectedTileTxt} from "../actions/HomeScreenAction";
import SearchBar from "../helperComponents/SearchBar";
import CustomBreadCrumb from "../helperComponents/CustomBreadCrumb";

import { FlatGrid } from "react-native-super-grid";

import CustomSpinner from "../common/CustomSpinner";
import { store } from "../../../configureStore";

import { getQrCode } from "../QROperations/QRProductScanner";
import { showMessage } from "react-native-flash-message";
import * as colors from '../../style/Common/ColorsStyle';
const search = require("../../assets/search-green.png");
const filter = require("../../assets/barcode.png");
const closeIcon = require("../../assets/close-outline.png");
const noImage = require("../../assets/noimage.png");

import BarCodeSection from "../BarCodeSection";
import { ScrollView } from "react-native-gesture-handler";
import {getSubcategories} from "../../actions/ProductCategoryAction";

let widthp = wp("100");

const { ids, styles } = Styles;


let count = 0;

class ProductSubFilterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catData:[],
      subcategoryItems: [],
      barCodePanel: false,
      tabVal: -1,

      tabs:[],


      catalogue: '',
      department: '',
      category: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route != this.props.route) {
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  changeListAccTabs =(e)=>{
    let _tVal = e;

    let _data = this.state.catData;

    if(_tVal == -1){
      let allItems=[];
      for (let j = 0; j < _data.length; j++) {
        const el_ = _data[j];
        allItems.push(...el_.subcategories)
      }

      console.log(allItems.length);
      this.setState({
        subcategoryItems: allItems,
      })
    }else{
      this.setState({
        subcategoryItems: _data[_tVal].subcategories,
      })
    }


  }

  loadData() {
    store.dispatch({ type: "CustomSpinner:SHOW" });
    this.setState({
      tabVal:-1
    })


    const NodeAliasPath = this.props.route.params.subcatNodeAliasPath.split('/');


    this.setState({ catalogue: NodeAliasPath[0] })
    this.setState({ department: NodeAliasPath[1] })
    this.setState({ category: NodeAliasPath[2] })



    getSubcategories(this.props.route.params.subcatNodeAliasPath, 4, true)
      .then((data) => {
        this.setState({
          catData: data,
        });
        this.setState({
          subcategoryItems: data[0].subcategories,
        });

        let tabArray_ =[];

        tabArray_.push({
          status: "ALL",
          val: -1,
        },)
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const e = data[i];

          tabArray_.push({
            status: e.name,
            val: i,
          })

        }

        this.changeListAccTabs(this.state.tabVal)

        this.setState({
          tabs : tabArray_
        })

        store.dispatch({ type: "CustomSpinner:HIDE" });
      })
      .catch((error) => {
        store.dispatch({ type: "CustomSpinner:HIDE" });
      });
  }

  // getItemData(nodeAlias) {
  //   this.props.getFilterData(this.props.loginToken, nodeAlias);
  //   // setTimeout(() => {
  //   //   console.log('mmm : ' + this.props.filterDataSkuid);
  //   //   this.props.getProduct(this.props.loginToken, this.props.filterDataSkuid);
  //   //   }, 1000);

  // }

  handleQrCode = async (e) => {
    // setQuery(e.data);
    getQrCode(e, this.props.navigation);
    this.setState({
      barCodePanel: false,
    });
    // setShow(0)
  };



  renderRow = ({ item }) => {
    count++;
    return (
      <TouchableOpacity
        key={count}
        activeOpacity={0.9}
        style={styles.item2}
        onPress={() => {
          // Actions.productGrid({subcatName: item.name, subcatNodeAliasPath: item.nodeAliasPath});
          this.props.navigation.navigate("productGrid", {
            subcatName: item.name,
            subcatNodeAliasPath: item.nodeAliasPath,
          });
        }}
      >
        <View
          style={{
            width: "100%",
            height: "77%",
            marginTop: "0%",
            //backgroundColor: 'green',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* <Image source={flower} style={styles.itemImage} /> */}
          <Image source={item.imageUrl == null ? noImage : { uri: item.imageUrl }} style={styles.itemImage} />
        </View>
        <View style={styles.cardMainTxtView1}>
          <View style={{ marginTop: hp("1") }}>
            <View style={styles.cardSubTxtView}>
              <Text
                numberOfLines={1}
                style={styles.cardSubMainTxt}
                allowFontScaling={false}
              >
                {item.name}
              </Text>
              <Text style={styles.cardSubTxt} allowFontScaling={false}></Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  handleLoadMore = () => {
    //console.warn('handleLoadMore');
  };
  render() {
    const { preseasonStatus } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <CustomSpinner />

          {this.state.barCodePanel ? (
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    barCodePanel: false,
                  })
                }
                style={{
                  width: wp('5'),
                  height: hp('5'),
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image source={closeIcon} style={styles.filterIcon} />
              </TouchableOpacity>
              <BarCodeSection getQrCode={this.handleQrCode} />
            </View>
          ) : null}

                   <View style={{width:'100%',flexDirection:'row'}}>
  <View style={{width:'50%',}}>
  <Back />
  </View>
  <View style={{width:'65%',alignItems:'flex-end',justifyContent:'flex-end',paddingRight:10}}>
  <View style={styles.preseasonView}>
                  <Text style={styles.preseasonTxt} allowFontScaling={false}>
                    { preseasonStatus.preSeasonToggle ? 'Pre-season - On' : 'Pre-season - Off' }
                  </Text>
                </View>
  </View>

                
</View>

          <View style={styles.searchView}>

            <View style={styles.searchViewInside1}>

              <SearchBar />
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.filterBtn}
                // onPress={() => {
                //   Actions.filter();
                // }}
                onPress={() =>
                  this.setState({
                    barCodePanel: true,
                  })
                }
              >
                <Image source={filter} style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.searchView}> */}
            <CustomBreadCrumb
              catalogue={this.state.catalogue}
              department={this.state.department}
              category={this.state.category}
              upto={1} // 0 - CATLOGUE, 1 - DEPARTMENT, 2 - CATEGORY, 3 - SUB CATEGORY
            />
          {/* </View> */}


          <View style={styles.titleView}>
            <Text style={styles.titleTxt} allowFontScaling={false}>
              {this.props.route.params.categoryName}
            </Text>
          </View>

          <View
            style={{
              width: "94%",
              height: hp("4.5"),
              marginTop: hp("0.5"),
              marginBottom: hp("0.5"),
            }}
          >
            <ScrollView style={styles.filterListView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >

                  {this.state.tabs.map((e) => (
                <View style={[styles.filterListBtnView]}>
                  <TouchableOpacity
                    style={[
                      styles.filterListBtn,
                      this.state.tabVal == e.val
                        ? { backgroundColor: colors.primaryColor }
                        : null,
                    ]}
                    onPress={() => {
                      this.changeListAccTabs(e.val),
                      this.setState({
                        tabVal: e.val,
                      });
                    }}
                  >
                    <Text
                      style={[
                        styles.filterListBtnText,
                        this.state.tabVal == e.val ? { color: "white" } : null,
                      ]}
                    >
                      {e.status}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

            </ScrollView>
          </View>

          <View style={styles.flatlist1}>
            <View style={styles.contentScrollView}>
            {widthp > 450 ? (
                <FlatGrid
                  itemDimension={wp("22")}
                  data={this.state.subcategoryItems}
                  style={sty.gridView}
                  spacing={hp("1")}
                 // keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderRow}
                />
              ) : (
                <FlatGrid
                  itemDimension={150}
                  data={this.state.subcategoryItems}
                  style={sty.gridView}
                  spacing={hp("1")}
               //   keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderRow}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const sty = StyleSheet.create({
  gridView: {
    width: wp("97%"),
    flex: 1,
    height: hp("70%"),
  },
});

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    preseasonStatus: state.checkout,
    // subcategoryItem: state.home.subcategoryItem,
    // titleName: state.home.titleName,
    // filterDataSkuid: state.home.filterDataSkuid,
  };
};

export default connect(mapStateToProps, {
  // getProduct,
  // getSelectedTileTxt,
  // getFilterData,
})(ProductSubFilterCategory);
