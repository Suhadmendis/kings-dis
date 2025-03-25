import openDatabaseService from "../Config";

export function GetAddressDisplay(addressLine1 = "", addressLine2 = "", addressLine3 = "",  city = "", zip = "", country = "") {
  let sbAddress = "";

  if (addressLine1 && addressLine1.trim() !== "") {
    if (sbAddress === "") {
      sbAddress += addressLine1.trim();
    } else {
      sbAddress += ", " + addressLine1.trim();
    }
  }
  if (addressLine2 && addressLine2.trim() !== "") {
    if (sbAddress === "") {
      sbAddress += addressLine2.trim();
    } else {
      sbAddress += ", " + addressLine2.trim();
    }
  }
  if (addressLine3 && addressLine3.trim() !== "") {
    if (sbAddress === "") {
      sbAddress += addressLine3.trim();
    } else {
      sbAddress += ", " + addressLine3.trim();
    }
  }
  // if (addressLine4 && addressLine4.trim() !== "") {
  //   if (sbAddress === "") {
  //     sbAddress += addressLine4.trim();
  //   } else {
  //     sbAddress += ", " + addressLine4.trim();
  //   }
  // }
  if (city && city.trim() !== "") {
    if (sbAddress === "") {
      sbAddress += city.trim();
    } else {
      sbAddress += ", " + city.trim();
    }
  }
  if (zip && zip.trim() !== "") {
    if (sbAddress === "") {
      sbAddress += zip.trim();
    } else {
      sbAddress += ", " + zip.trim();
    }
  }
  if (country && country.trim() !== "") {
    if (sbAddress === "") {
      sbAddress += country.trim();
    } else {
      sbAddress += ", " + country.trim();
    }
  }

  return sbAddress;
}

export function GetAddressInfo(nAddressID) {
  return new Promise((resolve, reject) => {
    let sOut = "";
    const db = openDatabaseService();
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM local_com_address WHERE AddressID=${nAddressID} LIMIT 1`, [],
          function (tx, res) {
            if (res.rows.length > 0) {
              let data = res.rows.item(0);
              resolve(data);
            } else {
              reject("Address not found!");
            }
          }, function (tx, error) {
            sOut = 'ExecuteSql ERROR: ' + error.message;
            console.log(sOut);
            reject(sOut);
          })
    }, error => {
      sOut = 'Transaction ERROR: ' + error.message;
      console.log(sOut);
      reject(sOut);
    });
  });
}
