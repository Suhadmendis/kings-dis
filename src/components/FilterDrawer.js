import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "../style/FilterDrawerStyle";
import { connect } from "react-redux";
// import { getProduct, getSelectedTileTxt, getFilters, getFilterData } from '../actions/HomeScreenAction';
import { RadioButton, RadioGroup } from "react-native-flexi-radio-button";
import CheckBox from "react-native-check-box";
import { getFilterData, getFilters } from "../url/API";
import { store } from "../../configureStore";
import { _ } from "lodash";

import * as colors from '../style/Common/ColorsStyle';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

let widthper = wp("100%");

const close = require("../assets/close-outline.png");
const down = require("../assets/down.png");
const up = require("../assets/up.png");

const { ids, styles } = Styles;

class FilterDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilterOptions: [],
      filterOptions: this.props.filterOptions,
      selectedSort: this.props.sortBy,
    };
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.filterOptions, prevProps.filterOptions)) {
      // only update if filterOptions changed
      this.setState({ filterOptions: this.props.filterOptions });
    }
    if (!_.isEqual(this.props.sortBy, prevProps.sortBy)) {
      // only update if sortBy changed
      this.setState({ selectedSort: this.props.sortBy });
    }
  }

  updateSelectedFilter(mainIndex, subIndex) {
    let { filterOptions } = this.state;
    filterOptions.filters[mainIndex]["filterValues"][subIndex]["selected"] =
      !filterOptions.filters[mainIndex]["filterValues"][subIndex]["selected"];
    this.setState({ filterOptions });
  }

  applyFilters() {
    store.dispatch({ type: "CustomSpinner:SHOW" });

    let api_data_filters = [];
    if (this.state.filterOptions["filters"] !== undefined) {
      api_data_filters = this.state.filterOptions["filters"];
    }

    let dataFilter = [];
    api_data_filters.map((filter_element, mainIndex) => {
      let temp = null;
      const sub_filter_elements = filter_element.filterValues;
      sub_filter_elements.map((sub_data_element, index) => {
        if (sub_data_element.selected) {
          if (temp == null) {
            temp = {
              Label: filter_element.label,
              FilterValues: [],
            };
          }
          temp.FilterValues.push({
            Value: sub_data_element.value,
            Selected: true,
          });
        }
      });
      if (temp != null) {
        dataFilter.push(temp);
      }
    });

    let promises = [
      getFilters(
        this.props.nodeAliasPath,
        dataFilter,
        this.state.selectedSort,
        1,
        100
      ),
      getFilterData(
        this.props.nodeAliasPath,
        dataFilter,
        this.state.selectedSort,
        1,
        100
      ),
    ];
    Promise.all(promises)
      .then((data) => {
        store.dispatch({
          type: "GET_FILTER_DATA_USING_NAME",
          payload: data[1].products,
          nodeAliasPath: this.props.nodeAliasPath,
          filterOptions: data[0],
          sortBy: this.state.selectedSort,
        });

        this.props.fDrawer.close();

        store.dispatch({ type: "CustomSpinner:HIDE" });
      })
      .catch((error) => {
        store.dispatch({ type: "CustomSpinner:HIDE" });
      });
  }

  render() {
    let api_data_filters = [];
    let api_data_sortby = [];

    if (this.state.filterOptions["filters"] !== undefined) {
      api_data_filters = this.state.filterOptions["filters"];
    }
    if (this.state.filterOptions["sortBy"] !== undefined) {
      api_data_sortby = this.state.filterOptions["sortBy"];
    }

    let selectedSortIndex = 0;
    api_data_sortby.map((item, index) => {
      if (item.value == this.state.selectedSort) {
        selectedSortIndex = index;
      }
    });

    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer} />
        <ScrollView
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.closeView}>
            <View style={styles.sortbyView}>
              <Text style={styles.titleText}>Sort By</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.iconView}
              onPress={() => {
                console.log(this.props.fDrawer);
                this.props.fDrawer.close();
              }}
            >
              <Image source={close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View>
            <View>
              {widthper >= 500 ? (
                <RadioGroup
                  //thickness={2}
                  color={colors.primaryColor}
                  selectedButtonColor={colors.primaryColor}
                  selectedIndex={selectedSortIndex}
                  onSelect={(index, value) =>
                    this.setState({ selectedSort: value })
                  }
                >
                  {api_data_sortby.map((sortby_element) => {
                    return (
                      <RadioButton
                        style={styles.radioView}
                        value={sortby_element.value}
                      >
                        <Text style={styles.radioText}>
                          {sortby_element.name}
                        </Text>
                      </RadioButton>
                    );
                  })}
                </RadioGroup>
              ) : (
                <RadioGroup
                  //thickness={2}
                  size={15}
                  color={colors.primaryColor}
                  selectedButtonColor={colors.primaryColor}
                  selectedIndex={selectedSortIndex}
                  onSelect={(index, value) =>
                    this.setState({ selectedSort: value })
                  }
                >
                  {api_data_sortby.map((sortby_element) => {
                    return (
                      <RadioButton
                        style={styles.radioView}
                        value={sortby_element.value}
                      >
                        <Text style={styles.radioText}>
                          {sortby_element.name}
                        </Text>
                      </RadioButton>
                    );
                  })}
                </RadioGroup>
              )}
            </View>

            {/* <View style={styles.titleView}>
              <Text style={styles.titleText}>Refine By</Text>
            </View>
            <View>
              {api_data_filters.map((filter_element, mainIndex) => {
                const sub_filter_elements = filter_element.filterValues;
                if (sub_filter_elements.length > 0) {
                  return (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.cardView}
                        onPress={() => {
                          let { showFilterOptions } = this.state;
                          showFilterOptions[mainIndex] =
                            !showFilterOptions[mainIndex];
                          this.setState({ showFilterOptions });
                        }}
                      >
                        <View
                          style={[
                            styles.subtitleView,
                            {
                              flexDirection: "row",
                              justifyContent: "space-between",
                              flex: 1,
                            },
                          ]}
                        >
                          <Text style={styles.cardTxt} allowFontScaling={false}>
                            {filter_element.name}
                          </Text>
                          <Image
                            source={
                              this.state.showFilterOptions[mainIndex]
                                ? up
                                : down
                            }
                            style={styles.dwonArrow}
                          />
                        </View>
                      </TouchableOpacity>

                      <View style={styles.borderstyle}></View>

                      <ScrollView style={styles.scrollStyle}>
                        {this.state.showFilterOptions[mainIndex] ? (
                          sub_filter_elements.map(
                            (sub_data_element, subIndex) => {
                              return (
                                <View style={styles.radioView}>
                                  <CheckBox
                                    style={{ flex: 1, padding: 8}}
                                    checkBoxColor={{colors.primaryColor}}
                                    checkedCheckBoxColor={{colors.primaryColor}}
                                    onClick={() => {
                                      this.updateSelectedFilter(
                                        mainIndex,
                                        subIndex
                                      );
                                    }}
                                    rightTextStyle={styles.checkbxfont}
                                    isChecked={sub_data_element.selected}
                                    rightText={
                                      sub_data_element.title 
                                      // " (" +
                                      // sub_data_element.count +
                                      // ")"
                                    }
                                  />
                                </View>
                              );
                            }
                          )
                        ) : (
                          <View></View>
                        )}
                      </ScrollView>
                    </View>
                  );
                }
              })}
            </View> */}
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.applyView}
          onPress={() => {
            this.applyFilters();
          }}
        >
          <View style={styles.button}>
            <Text style={styles.btnTxt} allowFontScaling={false}>
              APPLY 
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    nodeAliasPath: state.home.nodeAliasPath,
    filterOptions: state.home.filterOptions,
    sortBy: state.home.sortBy,
  };
};

export default connect(mapStateToProps, {
  // getProduct,
  // getSelectedTileTxt,
  // getFilters,
  // getFilterData
})(FilterDrawer);
