// import URL from '../url/baseUrl';
// import {Actions} from 'react-native-router-flux';

// export const getFilters = (text,type) => async dispatch => {
//   console.log("Filter DATA +++++++++++++++++++++++++++++++++");
//   let obj = {
//     NodeAliasPath: '/products/Hydraulic-Pumps/hyd-piston-pumps',
//     NodeClass: "CMS.MenuItem",
//     CurrentPage: "3",
//     PageSize: "48",
//     SortBy: "ct.SKUNumber",
//     LastFilterClicked: {},
//     Filters: [],
//     FiltersFromURL: [],
//   };
//   await URL.post('GetFilters', obj, {
//     headers: {
//       Authorization: 'Bearer ' + text,
//     },
//   })
//     .then(response => {
//       console.log(response.data);
//       // dispatch({
//       //   type: 'GET_FILTER_VALUES',
//       //   payload: response.data,
//       // });
//       // setTimeout(() => {
//       //   this.props.navigation.navigate(filter();
//       // }, 1000);
//     })
//     .catch(function(error) {
//       console.log(error.message);
//     });
// };

// export const getItemName = text => async dispatch => {
//   dispatch({
//     type: 'GET_ITEM_NAME',
//     payload: text,
//   });
// };

// export const getItemImage = text => async dispatch => {
//   dispatch({
//     type: 'GET_ITEM_IMAGE',
//     payload: text,
//   });
// };

// export const getItemDescription = text => async dispatch => {
//   dispatch({
//     type: 'GET_ITEM_DESCRIPTION',
//     payload: text,
//   });
// };

// export const getItemPrice = text => async dispatch => {
//   dispatch({
//     type: 'GET_ITEM_PRICE',
//     payload: text,
//   });
// };

// export const getItemWeight = text => async dispatch => {
//   dispatch({
//     type: 'GET_ITEM_WEIGHT',
//     payload: text,
//   });
// };

// export const getSelectedTileTxt = text => async dispatch => {
//   dispatch({
//     type: 'GET_SELECTED_TITLE',
//     payload: text,
//   });
// };
