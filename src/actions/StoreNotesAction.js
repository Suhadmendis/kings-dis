import { showMessage } from 'react-native-flash-message';
import getBaseUrl from '../url/getBaseUrl';

async function UpdateDiscount(acc_id,pict_dis,opn_dis, f1_dis, mail_order, adminCustomerID,l_token ) {
  // console.log(l_token);
  if (l_token != 'blank') {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${l_token}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");
      if (adminCustomerID !== "") {
        myHeaders.append("WorkingAsCustomerID", adminCustomerID);
      }

      var raw = JSON.stringify({
        "TradeAccountID": acc_id,
        "ItemDiscGroup1": pict_dis,
        "ItemDiscGroup2": opn_dis,
        "ItemDiscGroup3": f1_dis,
        "ItemDiscGroup4": mail_order,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };


      fetch(`${getBaseUrl()}Account/UpdateTradeAccountDiscounts`, requestOptions)
        .then(response => response.text())
        .then(result => {
          const res = JSON.parse(result);
          // console.log("api results: "+JSON.stringify(result));
          // this.setState({ data: products });
          if(res["error"]!==""){
            showMessage({
            message: 'KINGS SEEDS',
            description: res["error"],
            type: 'warning',
            autoHide: true,
          });
       }
       else{
        showMessage({
          message: 'KINGS SEEDS',
          description: 'Discount Updated',
          type: 'success',
          autoHide: true,
        });
       }

        })
        .catch(error => console.log('api error', error));

      } catch (error) {
        console.log(error);
      }
  }
}

export default UpdateDiscount;
