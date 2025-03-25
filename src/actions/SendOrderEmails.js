import { store } from '../../configureStore';
import getBaseUrl from '../url/getBaseUrl';

export const sendOrderEmail = async (orderId, email) => {
    console.log("send order emails: ", orderId);
    let tokn_ = store.getState().login.loginToken;

    let state = store.getState();
    let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

    if (tokn_ != "") {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokn_}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

        console.log('----------------fdsfgsfg----------------');
        console.log({
          "OrderID": orderId,
          "ToEmail": email,
          "SOPUserID": loggedInUserID
        });
        console.log('--------------------------------');
        var raw = JSON.stringify(
            [
                // {
                //     "Type": "Order.Admin",
                //     "Data": {
                //         "OrderID": orderId,
                //         "SOPUserID": loggedInUserID
                //     }
                // },
                {
                    "Type": "Order.Customer",
                    "Data": {
                        "OrderID": orderId,
                        "ToEmail": email,
                        "SOPUserID": loggedInUserID
                    }
                }
            ]
        );

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };


        fetch(
          `${getBaseUrl()}Notification/SendEmail`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            var res_ = JSON.parse(result);

            return res_;
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
        return null;
      } finally {
        // setLoading(false);
      }
    }
  }

export const sendPaymentEmail = async (orderId) => {

  let tokn_ = store.getState().login.loginToken;


  let state = store.getState();
    let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;


  if (tokn_ != "") {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokn_}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");


      var raw = JSON.stringify(
          [
            {
              "Type": "Payment.Admin",
              "Data": {
                "OrderID": orderId,
                "SOPUserID": loggedInUserID
              }
            },
            {
              "Type": "Payment.Customer",
              "Data": {
                "OrderID": orderId
              }
            }
          ]
      );

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };


      fetch(
          `${getBaseUrl()}Notification/SendEmail`,
          requestOptions
      )
          .then((response) => response.text())
          .then((result) => {
            var res_ = JSON.parse(result);

            return res_;
          })
          .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      // setLoading(false);
    }
  }
}
