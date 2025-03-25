import { store } from "../../../configureStore";
import { GetInteger } from "../../utils/ValidationHelper";
import { GetCustomerInfo } from "./CustomerInfoProvider";
import { RawQuery } from "./DataHelper";

export function IsCustomerB2B(sAccountCode) {
  let bRet = false;

  if (sAccountCode != null && sAccountCode != "") {
    bRet = !sAccountCode.startsWith("ZZ") && !sAccountCode.startsWith("XX");
  }

  return bRet;
}

export function IsCustomerBuyerAdmin(sAccountCode) {
  let addresses = [];

  if (sAccountCode != null && sAccountCode != "") {
    bRet = !sAccountCode.startsWith("ZZ") && !sAccountCode.startsWith("XX");
  }

  return addresses;
}

export function GetLoggedInAccountCode() {
  let state = store.getState();
  if (GetWorkingAsCustomerID() > 0) {
    return (
      state.findStore?.accCode ??
      state.login?.accountInfo?.customerAccCode ??
      ""
    );
  } else {
    return state.login?.accountInfo?.customerAccCode ?? "";
  }
}

export function GetWorkingAsCustomerID() {
  let state = store.getState();
  return GetInteger(state.findStore?.adminCustomerID ?? 0);
}

export async function GetWorkingAsCustomer() {
  let customerID = GetWorkingAsCustomerID();
  if (customerID > 0) {
    return await GetCustomerInfo(customerID);
  } else {
    throw new Error("No working as customer");
  }
}

export function GetAdminCustomerEmail() {
  let state = store.getState();
  return GetInteger(state.findStore?.cusEmail ?? "");
}

export async function checkUserRole(userRole) {
  let state = store.getState();

  const isUserExist = state.login.userRole.filter(
    (userElement) => userElement == userRole
  );

  if (isUserExist.length != 0) {
    return true;
  } else {
    return false;
  }
}

export function IsUserAnySOP() {
  let state = store.getState();

  const isUserExist = state.login.userRole.filter((userElement) => {
    if (userElement.toLowerCase().includes("sop")) {
      return userElement;
    }
  });

  if (isUserExist.length != 0) {
    return true;
  } else {
    return false;
  }
}

export async function IsQuoteCreatedbyAdmin(userId) {
  console.log("----IsQuoteCreatedbyAdmin----");

  let userroles = await RawQuery(`select UserID from local_cms_userrole US inner join local_cms_role R on  R.RoleID = US.RoleID Where RoleName like  'sopadmin' and UserID like ${userId}`);


  if (userroles.length > 0) {
    return true;
  }else{
    return false;
  }


}

export async function checkAdminRole() {
  let state = store.getState();

  let isUserExist = 0;
  isUserExist =
    isUserExist +
    state.login.userRole.filter((userElement) => userElement == "KINGS.SOP")
      .length;
  isUserExist =
    isUserExist +
    state.login.userRole.filter((userElement) => userElement == "quoteadmin")
      .length;
  isUserExist =
    isUserExist +
    state.login.userRole.filter((userElement) => userElement == "sopadmin")
      .length;

  if (isUserExist.length != 0) {
    return true;
  } else {
    return false;
  }
}


export async function getOrderAddressLocal(AddressID) {
  let query = `SELECT * FROM local_com_orderaddress WHERE AddressID = ${AddressID}`;
  let addressRes = await RawQuery(query);

  if (addressRes.length === 0) return '';

  const addressObj = addressRes.item(0);
  return formatAddress(addressObj);
}

function formatAddress(address) {
  const addressParts = [
    address.AddressLine1,
    address.AddressLine2,
    address.AddressLine3,
    address.AddressCity,
    address.AddressLine4,
    address.AddressZip
  ];

  return addressParts
    .filter(part => part && part.trim() !== '')
    .join(', ');
}

export function CategoriesNotAvailableForEndUsers() {
  return [
    "Commercial/Pictorial Packets/Headers",
    "Commercial/Pictorial Packets/Pos",
    "Commercial/Pictorial Packets/Stands",
  ];
}
