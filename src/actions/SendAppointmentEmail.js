import { store } from '../../configureStore';
import getBaseUrl from '../url/getBaseUrl';


export const sendAppointmentEmail = async (obj) => {
    let tokn_ = store.getState().login.loginToken;
    let cusEmail = store.getState().findStore.cusEmail;
     
    
    if (tokn_ != "") {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokn_}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "CMSPreferredUICulture=en-gb");

        var raw = JSON.stringify(
            [
                {
                    "Type": "appointment.invite",
                    "Data": {
                        "subject": obj.subject,
                        "toEmail": obj.email,
                        "fromEmail": cusEmail,
                        "location": obj.location,
                        "startDate": obj.startDate,
                        "endDate": obj.endDate,
                        "note": obj.note,
                        "storeName": obj.storeName,
                        "sopFullName": obj.sopFullName

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