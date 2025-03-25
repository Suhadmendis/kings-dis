import { store } from '../../configureStore';
import getBaseUrl from '../url/getBaseUrl';

 export const getQrCode = (e) => {
    let Preseason = 0;
    Preseason = store.getState().checkout.preSeasonToggle == 1 ? 1 : 0;
    // setQuery(e.data);
    // setBarCodePanel(false);
    // console.log(e.data);
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
      myHeaders.append("Preseason", Preseason);

      var raw = JSON.stringify({
        SearchTerm: `${e.data}`,
        IsBarcode: true,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${getBaseUrl()}GetSearchAutoCompleteData`,
        requestOptions
      )
      .then((response) => response.text())
      .then((response) => JSON.parse(response))
      .then((result) => {

          // alert(result.results.skuId);
          navigation.navigate('productDetails', { SkuId: result.results[0].skuId, product: result.results[0].code });
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      // console.log(error);
    } finally {
    //  setLoading(true);
    }

    // getProductsFromApi(true, e.data);
  };