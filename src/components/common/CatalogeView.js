import React, {Component} from 'react';
import getBaseUrl from '../../url/getBaseUrl';
import {
  Alert,
  AsyncStorage,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from 'react-native';
import Styles from '../../style/DrawerContentStyle';
import {connect} from 'react-redux';
import {
  getsubCategories,
  getSelectedTileTxt,
  getFilters,
  getFilterData,
  getsubCategoriesDrawer
} from '../../actions/HomeScreenAction';

const { ids, styles } = Styles;

let that;
const dot = require('../../assets/plant2x.png');
const arrow = require('../../assets/plus2x.png');
const minus = require('../../assets/minus.png');
const minus2 = require('../../assets/minus2.png');
class CatalogeView extends Component {
    state = {
            showSowView:false,
            subCategories: []
            };

    getSubCategories =   ( )  =>  {
      this.props.getSelectedTileTxt(this.props.item.name);
            let obj = {
              offset: '0',
              pagesize: '60',
              category: this.props.item.alias,
            };
           URL.post('products/categories', obj, {
              //method: 'POST',
              headers: {
                Authorization: 'Bearer ' + this.props.loginToken,
              },
            })
              .then(response => {
                console.log( "-----ddfdf ",response.data);
                this.setState({subCategories:response.data})
              })
              .catch(function (error) {
                console.log(error.message);
              });
    }
    componentDidMount (){
      this.getSubCategories()
    }

  render = () => {
    console.log(this.state.subCategories)
    return (
      <View>
        <TouchableOpacity activeOpacity={0.9}
          style={styles.buttonBox}
          onPress={() => {
            this.setState({
              showSowView: !this.state.showSowView,
            });
            // this.props.getSelectedTileTxt(this.props.item.name);
            // this.props.getsubCategories(this.props.loginToken, this.props.item.alias);
          }}>
          <View style={styles.rowBox}>
            <View style={styles.iconBox}>
              <Image source={dot} style={styles.iconImg} />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.TitleTxt} allowFontScaling={false}>
                {this.props.item.name}
              </Text>
            </View>
            
            {this.state.showSowView === false ? (
              <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.setState({
                  showSowView: !this.state.showSowView,
                });
                this.props.getsubCategoriesDrawer(this.props.loginToken,this.props.item.alias);
              }}
              style={styles.arrowBox}>
              <Image source={arrow} style={styles.arrowBtn} />
            </TouchableOpacity>
            )
            : (
         <TouchableOpacity activeOpacity={0.9}
         onPress={() => {
           this.setState({
             showSowView: !this.state.showSowView,
           });
           this.props.getsubCategoriesDrawer(this.props.loginToken,this.props.item.alias);
         }}
         style={styles.arrowBox}>
         <Image source={minus2} style={styles.arrowBtn} />
       </TouchableOpacity>
        )}
          </View>
        </TouchableOpacity>
        {this.state.showSowView === false ? undefined : (
          <View style={styles.subBox1}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={styles.flatlist2}
                  data={this.state.subCategories}
                  //data={data}
                  renderItem={this.renderRow2}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                  extraData={this.state.subCategories}
                />
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // renderRow2 = ({item}) => {
  //   return <SubTopic item={item} />;
  // };
  
  renderRow2 = ({item}) => {
    console.log("render row 2", item)
    return (
      <TouchableOpacity activeOpacity={0.9}
      onPress={() => {
        this.props.getSelectedTileTxt(item.name);
        // this.getItemData(item.nodeAliasPath);
        this.props.getFilterData(this.props.loginToken, item.nodeAliasPath, item.name);    
      }}
      style={styles.subBoxBody}>
        {/* <View>
        <Image source={minus} style={styles.minusBtn} />
        </View> */}
        <Text style={styles.txtBody}>
           {item.name}
        </Text>
      </TouchableOpacity>
    );
  };


  render() {
    that = this;

    return (
      <View style={styles.mainContainer}>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.loginToken,
    categoryItem: state.home.categoryItem,
    drawerCategoryItem: state.home.drawerCategoryItem,
    subcategoryItem: state.home.subcategoryItem,
    drawerSubcategoryItem:state.home.drawerSubcategoryItem,
    titleName: state.home.titleName,
  };
};
export default connect(mapStateToProps, {
  getsubCategories,
  getSelectedTileTxt,
  getFilters,
  getFilterData,
  getsubCategoriesDrawer

})(CatalogeView);

// export default CatalogeView;

const SelectedBar = () => <View style={styles.selectedBar} />;