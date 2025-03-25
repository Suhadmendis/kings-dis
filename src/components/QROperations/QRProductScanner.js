
import { getQrCodeApi } from "../../url/API";
import { RawQuery } from "../../offline/Services/DataHelper";
import { store } from "../../../configureStore";
import { showMessage } from "react-native-flash-message";

export const getQrCode = async (e, navigation) => {

    let state = store.getState();
    let connectionStatus = state.loading?.connectionStatus;

    if (connectionStatus) {

      try{
        getQrCodeApi(e.data)
        .then((result) => {
          console.log(result);
          console.log(result.results[0].availability);
          console.log(result.results[0].skuId);
          if (result.results[0].availability !== true) {
            console.log(result.results[0].code);
            showMessage({
              message: "KINGS SEEDS",
              description: "Item is Unavailable",
              type: "warning",
              autoHide: true,
            });
            store.dispatch({
              type: 'SET_BILLING_INFO',
              payload: {
                unavailableItems: result.results[0].code,
              }
            });
          } else if (result.results == null) {
            showMessage({
              message: "KINGS SEEDS",
              description: "Invalid product Id",
              type: "warning",
              autoHide: true,
            });
          } else {

            navigation.navigate('productDetails', { SkuId: result.results[0].skuId, product: result.results[0].code });
          }
        })
        .catch((error) => {
          showMessage({
            message: "KINGS SEEDS",
            description: "Invalid product Id",
            type: "warning",
            autoHide: true,
          });
        });
      }catch(error){
        showMessage({
          message: "KINGS SEEDS",
          description: "Invalid product Id",
          type: "warning",
          autoHide: true,
        });
      }finally{
        // setLoading(true);
      }

    }else{

      let query = await RawQuery(`SELECT * FROM local_com_sku WHERE SKUBarCode = '${e.data}'`);
      navigation.navigate('productDetails', { SkuId: query.item(0).SKUID, product: query.item(0).SKUNumber });

    }

  };