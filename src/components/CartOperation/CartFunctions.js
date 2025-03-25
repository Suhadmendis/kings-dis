import { store } from "../../../configureStore";
import DataAdapter from "../../offline/localData/DataAdapter";
import { showMessage } from "react-native-flash-message";
import getSettingsValue from "../common/SettingsOperation";
import { RawQuery } from "../../offline/Services/DataHelper";
import MssqlDTToSqlDT from "../helperComponents/MssqlDTToSqlDT";

function isConnected() {
  let state = store.getState();
  let internetConnectivity = state.loading?.connectionStatus;

  return internetConnectivity;
}

export async function getCartType() {
  console.log("getCartType");
  let state = store.getState();
  let cartItems = state.cart.items;
  let cartItemIds = cartItems.map((element) => element.skuid);

  for (let index = 0; index < cartItemIds.length; index++) {
    let res = await RawQuery(`
        SELECT
        SKUID,
        SKUNumber,
        CASE
           WHEN SkuPreSeason = 1 THEN true
           ELSE 0
       END AS SkuPreSeason,
       CASE
           WHEN SkuPreSeasonOnly = 1 THEN true
           ELSE 0
       END AS SkuPreSeasonOnly,
        SkuPricePreSeason
        FROM local_com_sku where SKUID = '${cartItemIds[index]}'`);

    cartItems = [];

    for (let index = 0; index < res.length; index++) {

      const element = res.item(index);
      cartItems.push(element);
    }
  }

console.log('CartItems: ', cartItems);
  if (cartItems.length == 0) return 'EMPTY';



  const NonPreSeason = cartItems.filter(item => item.SkuPreSeason == 0 && item.SkuPreSeasonOnly == 0)

  if (NonPreSeason.length > 0) return 'NORMAL';



  return 'PRESEASON';

}



export async function checkCartItems() {
  console.log("getCartType");
  let state = store.getState();
  let cartItems = state.cart.items;
  let cartItemsSend = [];
  let cartItemIds = cartItems.map((element) => element.skuid);

  for (let index = 0; index < cartItemIds.length; index++) {
    let res = await RawQuery(`
        SELECT
        SKUID,
        SKUNumber,
        SkuPreSeason,
        SkuPreSeasonOnly,
        SkuPricePreSeason
        FROM local_com_sku where SKUID = '${cartItemIds[index]}'`);


        for (let index = 0; index < res.length; index++) {

          const element = res.item(index);
          cartItemsSend.push(element);
        }

  }



  return cartItemsSend;

}





export async function isCartEmpty() {
  let state = store.getState();
  let cartItems = state.cart.items;

  let isCartEmpty = cartItems.length == 0;

  return isCartEmpty;
}

export async function getSettings(name) {
  const minimumOrderValue = await getSettingsValue(name);
  return minimumOrderValue[0];
}

export async function initialPictorial() {
  const payload = {
    section: "CART",
    opration: "PICTORIAL VALIDATION",
    data: "",
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

export async function initialCartRefs() {
  const payload = {
    section: "CART",
    opration: "GET REFS",
    data: "",
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}
export async function initialCartRefsAndIds() {
  const payload = {
    section: "CART",
    opration: "GET REFS AND IDS",
    data: "",
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

export async function initialQuoteRefsAndIds(custId) {
  const payload = {
    section: "QUOTE",
    opration: "GET REFS AND IDS",
    data: { custId },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

export async function initialQuoteRefs(custId) {
  const payload = {
    section: "QUOTE",
    opration: "GET REFS",
    data: { custId },
  };

  const newpro = await DataAdapter(payload);
  return newpro;
}

export async function saveCart(
  items,
  cartref,
  preSeason,
  cartMode,
  cartId,
  custId,
  cartStatus,
  ReadyToSync
) {
  let saveCartApiRes;

  if (isConnected()) {
    // if this save cart is offline, it should perform as a new online save cart to the API
    if (ReadyToSync) {
      cartMode = "Cart";
    }

    let payload = {
      section: "CART",
      opration: "SAVE API",
      data: { items, preSeason, cartref, cartMode, cartId, custId },
    };

    saveCartApiRes = await DataAdapter(payload);

    // API not success
    if (saveCartApiRes.status == "Error") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Something went wrong",
        type: "warning",
        autoHide: true,
      });
      return "Error";
    }
  } else {
    saveCartApiRes = amendCartLocal(items, cartref, custId, cartId, preSeason);
  }

  payload = {
    section: "CART",
    opration: "SAVE LOCAL",
    data: {
      items: saveCartApiRes.body,
      preSeason,
      cartMode,
      cartId,
      cartStatus,
      ReadyToSync,
    },
  };

  const saveCartLocalRes = await DataAdapter(payload);

  return saveCartLocalRes;
}

export async function saveQuote(
  items,
  quoteLabel,
  cartMode,
  quoteId,
  custId,
  disObject,
  ReadyToSync
) {
  let saveQuoteApiRes;

  if (isConnected()) {
    if (ReadyToSync) {
      cartMode = "Cart";
    }

    let payload = {
      section: "QUOTE",
      opration: "SAVE API",
      data: {
        items,
        quoteLabel,
        cartMode,
        quoteId,
        custId,
        disObject,
        ReadyToSync,
      },
    };
console.log('========fsdngosjdngousd');

    saveQuoteApiRes = await DataAdapter(payload);
    console.log(saveQuoteApiRes);

    // API not success
    if (saveQuoteApiRes.status == "Error") {
      showMessage({
        message: "KINGS SEEDS",
        description: "Something went wrong",
        type: "warning",
        autoHide: true,
      });
      return "Error";
    }
  } else {
    saveQuoteApiRes = amendQuoteLocal(
      items,
      quoteLabel,
      cartMode,
      custId,
      disObject,
      quoteId
    );
  }

  payload = {
    section: "QUOTE",
    opration: "SAVE LOCAL",
    data: { items: saveQuoteApiRes.body, cartMode, quoteId, ReadyToSync },
  };

  const saveQuoteLocalRes = await DataAdapter(payload);

  return saveQuoteLocalRes;
}

function amendCartLocal(items, cartref, custId, cartId, preSeason) {
  let shoppingCartID;

  if (cartId == "") {
    shoppingCartID = parseInt(Math.random() * 10000000);
  } else {
    shoppingCartID = cartId;
  }
  let timestamp = new Date();
  const shoppingCartLastUpdate = MssqlDTToSqlDT(timestamp);

  if (preSeason) {
    items = items.filter((item) => item.skuDiscountCat == "A");
  }

  let shoppingCartItems = items.map((item) => {
    let webCartItemID = parseInt(Math.random() * 10000000);

    let createItem = {
      appCartItemID: 0,
      cartItemAutoAddedUnits: null,
      cartItemBackCard: false,
      cartItemBundleGUID: null,
      cartItemCustomData: null,
      cartItemDiscountRate: 0,
      cartItemGuid: "",
      cartItemLineTax: item.totalTax,
      cartItemNote: "",
      cartItemParentGuid: null,
      cartItemPrice: item.totalPrice,
      cartItemPriceLine: item.priceLine,
      cartItemQuoteLineDiscount: null,
      cartItemQuoteLineDiscountType: null,
      cartItemQuoteYourPrice: null,
      cartItemText: item.priceOption,
      cartItemUnitDiscount: 0,
      cartItemUnitListPrice: item.unitPrice,
      cartItemUnitPrice: item.unitPrice,
      cartItemValidTo: null,
      shoppingCartID: shoppingCartID,
      skuUnits: item.quantity,
      skuid: item.skuid,
      webCartItemID: webCartItemID,
    };

    item = createItem;

    return item;
  });

  let object = {
    body: {
      cart: {
        shoppingCartBillingAddressID: null,
        shoppingCartCompanyAddressID: null,
        shoppingCartContactID: null,
        shoppingCartCurrencyID: 1,
        shoppingCartCustomData: null,
        shoppingCartCustomerID: custId,
        shoppingCartGUID: "",
        shoppingCartID: shoppingCartID,
        shoppingCartIsPreSeason: preSeason,
        shoppingCartItems: shoppingCartItems,
        shoppingCartLastUpdate: shoppingCartLastUpdate,
        shoppingCartNote: cartref,
        shoppingCartPaymentOptionID: null,
        shoppingCartShippingAddressID: null,
        shoppingCartShippingOptionID: null,
        shoppingCartSiteID: 1,
        shoppingCartUserID: 103527,
        readyToSync: 1,
      },
      error: "",
    },
    status: "Success",
  };
  return object;
}

function amendQuoteLocal(
  items,
  quoteLabel,
  cartMode,
  custId,
  disObject,
  quoteId
) {
  let timestamp = new Date();
  const shoppingCartLastUpdate = MssqlDTToSqlDT(timestamp);
  let shoppingCartID;
  let state = store.getState();
  let loggedInUserID = state.login.accountInfo?.customerUserID ?? null;

  if (quoteId == "") {
    shoppingCartID = parseInt(Math.random() * 10000000);
  } else {
    shoppingCartID = quoteId;
  }

  let shoppingCartItems;
  let discountType = "F";
  let count = 0;

  let itemQuoteTotal = 0;

  let webCartItemID = 0;

  if (disObject) {
    shoppingCartItems = items.map((item) => {
      itemQuoteTotal =
        itemQuoteTotal + parseFloat(disObject[count].quotedPrice) || 0;

      webCartItemID = parseInt(Math.random() * 10000000);

      if (disObject[count].value == "%") discountType = "%";

      let createItem = {
        appCartItemID: 0,
        cartItemAutoAddedUnits: null,
        cartItemBackCard: item.backingCard,
        cartItemBundleGUID: null,
        cartItemCustomData: null,
        CartItemDiscountRate: disObject[count].lineDiscountRate,
        cartItemGuid: "",
        cartItemLineTax: item.totalTax,
        cartItemNote: item.lineNote,
        cartItemParentGuid: null,
        cartItemPrice: item.totalPrice,
        cartItemPriceLine: item.priceLine,
        cartItemQuoteLineDiscount: disObject[count].lineDiscount,
        cartItemQuoteLineDiscountType: discountType,
        cartItemQuoteYourPrice: disObject[count].quotedPrice,
        cartItemText: item.priceOption,
        cartItemUnitDiscount: 0,
        cartItemUnitListPrice: item.unitPrice,
        cartItemUnitPrice: item.unitPrice,
        cartItemValidTo: null,
        shoppingCartID: shoppingCartID,
        skuUnits: item.quantity,
        skuid: item.skuid,
        webCartItemID: webCartItemID,
      };

      item = createItem;

      ++count;

      return item;
    });
  } else {
    shoppingCartItems = items.map((item) => {
      webCartItemID = parseInt(Math.random() * 10000000);

      let createItem = {
        appCartItemID: 0,
        cartItemAutoAddedUnits: null,
        cartItemBackCard: item.backingCard,
        cartItemBundleGUID: null,
        cartItemCustomData: null,
        cartItemDiscountRate: 0,
        cartItemGuid: "",
        cartItemLineTax: item.totalTax,
        cartItemNote: item.lineNote,
        cartItemParentGuid: null,
        cartItemPrice: item.totalPrice,
        cartItemPriceLine: item.priceLine,
        cartItemQuoteLineDiscount: 0,
        cartItemQuoteLineDiscountType: discountType,
        cartItemQuoteYourPrice: item.totalPrice,
        cartItemText: item.priceOption,
        cartItemUnitDiscount: 0,
        cartItemUnitListPrice: item.unitPrice,
        cartItemUnitPrice: item.unitPrice,
        cartItemValidTo: null,
        shoppingCartID: shoppingCartID,
        skuUnits: item.quantity,
        skuid: item.skuid,
        webCartItemID: webCartItemID,
      };

      itemQuoteTotal = itemQuoteTotal + parseFloat(item.totalPrice) || 0;

      item = createItem;

      return item;
    });
  }

  let itemID1 = parseInt(Math.random() * 1000000);
  let itemID2 = parseInt(Math.random() * 1000000);

  let object = {
    body: {
      cart: {
        shoppingCartBillingAddressID: null,
        shoppingCartCompanyAddressID: null,
        shoppingCartContactID: null,
        shoppingCartCurrencyID: 1,
        shoppingCartCustomData: null,
        shoppingCartCustomerID: custId,
        shoppingCartGUID: "35f6a685-6385-4a98-89b5-d02a276bc8c1", //ask chamila
        shoppingCartID: shoppingCartID,
        shoppingCartIsPreSeason: false,
        shoppingCartItems: shoppingCartItems,
        shoppingCartLastUpdate: shoppingCartLastUpdate,
        shoppingCartNote: quoteLabel,
        shoppingCartPaymentOptionID: null,
        shoppingCartShippingAddressID: null,
        shoppingCartShippingOptionID: null,
        shoppingCartSiteID: 1,
        shoppingCartUserID: loggedInUserID,
        readyToSync: 1,
      },
      error: "",
      quote: {
        itemCreatedBy: 96528,
        itemCreatedWhen: shoppingCartLastUpdate,
        itemCustomerID: custId,
        itemGUID: "c5268796-e7e8-4c46-992c-c8344785b9bc",
        itemID: itemID1,
        itemModifiedBy: 96528,
        itemModifiedWhen: shoppingCartLastUpdate,
        itemOrder: null,
        itemQuoteDelivery: 0,
        itemQuoteLabel: quoteLabel,
        itemQuoteTotal: itemQuoteTotal,
        itemShoppingCartID: shoppingCartID,
        itemSiteID: 1,
      },
      quoteStatusUser: {
        itemCreatedBy: loggedInUserID,
        itemCreatedWhen: shoppingCartLastUpdate, //ask chamila
        itemGUID: "13851e0e-2444-4787-af3a-c4a111f4df36",
        itemID: itemID2,
        itemModifiedBy: loggedInUserID,
        itemModifiedWhen: shoppingCartLastUpdate,
        itemOrder: null,
        itemQuoteID: itemID1,
        itemQuoteStatusID: 6,
        itemSiteID: 1,
      },
    },
    status: "Success",
  };

  return object;
}

export function validations(operation, value, itemCount, refs, tempRef) {
  if (itemCount == 0)
    return { status: "error", code: "03", message: "Cart is empty" };

  if (value.length > 50)
    return {
      status: "error",
      code: "06",
      message: "Max length of the label should be 50 characters",
    };

  if (checkSpecialCharacters(value))
    return {
      status: "error",
      code: "07",
      message: "Special characters and spaces are not allowed",
    };

  if (operation == "save cart") {
    if (value == "")
      return {
        status: "error",
        code: "01",
        message:
          "Please enter a valid basket name. Special characters and spaces are not allowed",
      };

    let duplicate_error = false;
    refs.map((ref) => {
      if (ref.toLowerCase() == value.toLowerCase()) duplicate_error = true;
    });

    if (duplicate_error) {
      if (tempRef != "Cart") {
        return {
          status: "success",
          code: "04",
          message: "Editing Mode Should Update",
        };
      } else {
        return {
          status: "error",
          code: "02",
          message:
            "Cart label already exists, please enter a different cart label",
        };
      }
    }

    if (tempRef != "") {
      return {
        status: "success",
        code: "05",
        message: "Editing Mode Should add new",
      };
    }

    if (value != "") return { status: "success", code: "09", message: "Ok" };
  }

  if (operation == "save quote") {
    if (value == "")
      return {
        status: "error",
        code: "01",
        message: "Please Enter Quote Label",
      };

    let duplicate_error = false;
    refs.map((ref) => {
      if (ref.toLowerCase() == value.toLowerCase()) duplicate_error = true;
    });

    if (duplicate_error) {
      if (tempRef != "Cart") {
        return {
          status: "success",
          code: "04",
          message: "Editing Mode Should Update",
        };
      } else {
        return {
          status: "error",
          code: "02",
          message:
            "Quote label already exists, please enter a different quote label",
        };
      }
    }

    if (value != "") return { status: "success", code: "09", message: "Ok" };
  }
}

function checkSpecialCharacters(value) {
  let value1 = value;
  let count = value.length;

  for (let index = 0; index < count; index++) {
    value1 = value1.replace("-", "");
  }

  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (format.test(value1)) {
    return true;
  } else {
    return false;
  }
}

export function preSeasonChecking(pictorials, cartItems) {
  let check = [];
  let checkCount = [];

  check.push(cartItems.length);

  cartItems.map((cartItem) => {
    pictorials.map((pictorial) => {
      if (pictorial.SKUID == cartItem.id) {
        checkCount.push(pictorial.SKUID);
      }
    });
  });

  check.push(checkCount.length);

  return check;
}
