import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as colors from "../../style/Common/ColorsStyle";

import Styles from "../../style/CartStyle";
import { Actions } from "react-native-router-flux";
import { useNavigation } from "@react-navigation/core";
import { Checkbox } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { showMessage } from "react-native-flash-message";
import { GetInteger } from "../../utils/ValidationHelper";
import { GetTaxByCustomPrice } from "../../offline/Services/ProductHelper";

import NoteToggleButton from "../helperComponents/NoteToggleButoon";

import { useIsFocused } from "@react-navigation/native";
import { checkUserRole } from "../../offline/Services/UserHelper";
import { Table, Row, Rows } from "react-native-table-component";
import { RawQuery } from "../../offline/Services/DataHelper";

const deleteIcon = require("../../assets/del.png");

const { ids, styles } = Styles;
let scrn_width = wp("100");

const data = [
  { label: "%", value: "1" },
  { label: "F", value: "2" },
];

export default function CartItem({
  key,
  item,
  removeItem,
  updateItem,
  updateTax,
  index,
  updateMode,
  quoteItemUi,
  onPressCheckbox,
  discount,
  readDiscount,
  addDiscount,
  cartMode,
  quoteId,
  changeNote,
  updateBackingCard,
  getTotalTaxes,
  discountSwitchFlag,
  discountPerNumText,
}) {
  const isFocused = useIsFocused();

readDiscount();
  // console.log('fsdgsd');

  // console.log(item.cartItemQuoteYourPrice);


  const navigation = useNavigation();
  const [check, setCheck] = useState(false);

  // const [data, setData] = useState('');
  const [bcheck, setBCheck] = useState(false);

  const [pictorial, setPictorial] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const [typingText, setTypingText] = useState(item.quantity.toString());

  const [cartItem, setCartItem] = useState(item);

  const getSPDiscount = discount.filter(
    (discountElement) => discountElement.cartItemID == item.cartItemID
  );
  let disTypeText;

  if (getSPDiscount.length > 0) {
    if (getSPDiscount[0].value == "F") {
      disTypeText = "2";
    } else {
      disTypeText = "1";
    }
  } else {
    if (item.cartItemQuoteLineDiscountType == "F") {
      disTypeText = "2";
    } else {
      if (item.cartItemQuoteLineDiscountType != undefined) {
        disTypeText = "1";
      } else {
        disTypeText = "2";
      }
    }
  }

  const [value, setValue] = useState(disTypeText);

  let cartItemQuoteLineDiscount;
  if (item.cartItemQuoteLineDiscount != undefined) {
    cartItemQuoteLineDiscount = item.cartItemQuoteLineDiscount;
  } else {
    cartItemQuoteLineDiscount = 0.0;
  }

  let cartItemDiscountRate;
  if (item.cartItemDiscountRate != undefined) {
    cartItemDiscountRate = item.cartItemDiscountRate;
  } else {
    cartItemDiscountRate = 0.0;
  }

  const [pictorialPacketSize, setPictorialPacketSize] = useState(1);

  const [lineDiscount, setLineDiscount] = useState(
    String(cartItemQuoteLineDiscount)
  );
  const [lineDiscountRate, setLineDiscountRate] = useState(
    String(cartItemDiscountRate)
  );
  const [quotedUnitPrice, setQuotedUnitPrice] = useState(item.unitPrice);

  const [quotedPrice, setQuotedPrice] = useState(
    parseFloat(item.cartItemQuoteYourPrice).toFixed(2) || 0
  );

  const [visibleNote, setVisibleNote] = React.useState(true);

  const [noteText, setNoteText] = useState(
    item.cartItemNote != undefined ? String(item.cartItemNote) : ""
  );

  const [isAdmin, setIsAdmin] = useState(false);

  const [tax, setTax] = useState(0);

  useEffect(() => {
    if (cartMode == "Editing Quote") {
      setDiscountBackwords();
    }

    if (cartMode == "Order Quote") {
      setDiscountBackwords();
    }

    // setRateType();



    if (item.skuDiscountCat) {
      if (item.skuDiscountCat == "A") {
        setPictorial(1);
      }
    } else {
      // alert('something went wrong in pictorials');
    }

    if (item.backingCard == true) {
      setBCheck(true);
    }

    setUpatedTax();
    // setTimeout(() => {
    getTotalTaxes();

    // updateItem({
    //   skuid: item.skuid,
    //   priceLine: item.priceLine,
    //   quantity: item.quantity
    // });

    // }, 100);

    discountEditable();

    setDiscountBackwords();

    noteChanged();

    setPacketSize();
  }, [isFocused]);

  const setPacketSize = async () => {
    let picPacketSize = await RawQuery(
      `SELECT SKUPictorialPackSize from local_com_sku where SKUID = '${item.skuid}' limit 1`
    );

    // console.log('Packet Size');

    console.log(item.skuid);
    console.log(picPacketSize.item(0)?.SKUPictorialPackSize);

    if (picPacketSize.item(0)?.SKUPictorialPackSize != undefined) {
      picPacketSize = picPacketSize.item(0).SKUPictorialPackSize;
    }else{
      picPacketSize = 1;
    }

    setPictorialPacketSize(picPacketSize);
  };

  /* remove this useEffect to prevent calling updateItem and getTax per each item
which slow down cart screen significantly */
  // useEffect(() => {

  // if (!discountSwitchFlag) {
  //   discountPerNumText = 0;
  // }

  //    updateItem({
  //     skuid: item.skuid,
  //     priceLine: item.priceLine,
  //     quantity: item.quantity,
  //     discountSwitchFlag: discountSwitchFlag,
  //     discountPerNumText: parseFloat(discountPerNumText) || 0
  //   })
  //   .then(() => {
  //     getTax();
  //   });

  //   }, [discountSwitchFlag, discountPerNumText]);

  let initialRender = true;

  useEffect(() => {
    setTypingText(item.quantity);

    console.log('Initial render');

    const tempTot = item.quantity * item.unitPrice;

      if (lineDiscountRate > 0) {
        const tempQuoted = tempTot - (tempTot / 100) * lineDiscountRate;

        setQuotedPrice(tempQuoted.toFixed(2));

        setLineDiscount((tempTot - tempQuoted).toFixed(2));
      } else {
        setQuotedPrice(tempTot.toFixed(2));
      }

    if (initialRender) {
      initialRender = false;
    } else {

    }
  }, [item.quantity]);

  useEffect(() => {
    // setTimeout(() => {
    setDiscountBackwords();

    // setUpatedTax();
    // changeDiscount();

    noteChanged();

    // }, 100);

    // triggerDiscountAry();
    // setRateType();

    setUpatedTax();
  }, [value, lineDiscount, lineDiscountRate, quotedUnitPrice, quotedPrice]);

  useEffect(() => {
    noteChanged();
  }, [noteText]);

  const noteChanged = () => {
    const array = {
      cartItemID: item.productNumber + "-" + item.priceOption,
      value: noteText,
    };

    changeNote(array);
  };

  const setUpatedTax = () => {
    // if (cartMode == "Editing Quote" || cartMode == "Order Quote") {
    //   getTax();
    // }
    // getTax();
  };

  const getTax = async () => {
    let totalPrice = quotedPrice;
    if (quotedPrice == "NaN") {
      totalPrice = item.totalPrice;
    }

    let disableStdDiscount = 1;
    if (discountSwitchFlag == true) {
      disableStdDiscount = 0;
    }

    const newpro = await GetTaxByCustomPrice(
      item.skuNumber,
      totalPrice,
      disableStdDiscount,
      discountPerNumText
    );
    console.log(item.skuNumber, quotedPrice);
    updateTax({
      skuid: item.skuid,
      priceLine: item.priceLine,
      totalTax: newpro,
    }).then(() => {
      getTotalTaxes();
    });


    // return newpro;
  };

  const noteVisibility = (visibilitySwitch) => setVisibleNote(visibilitySwitch);

  const setDiscountBackwords = () => {
    const array = {
      cartItemID: item.cartItemID,
      value: value,
      lineDiscount: lineDiscount,
      lineDiscountRate: lineDiscountRate,
      quotedUnitPrice: quotedUnitPrice,
      quotedPrice: quotedPrice,
      skuNumber: item.skuNumber,
      priceLine: item.priceLine,
    };

    addDiscount(array);
  };

  const triggerDiscountAry = () => {
    const sameCount = discount.filter(
      (discountElement) => discountElement.cartItemID == item.cartItemID
    );

    if (sameCount.length == 0) {
      const array = { cartItemID: element.cartItemID };
      discount.push(array);
    }
  };

  const displayQuotedPrice = () => {
    const q_price = quotedUnitPrice * item.quantity;
    // setQuotedPrice(q_price.toFixed(2));
  };

  const displayQuotedPrice1 = (showQuotedPrice) => {
    setQuotedPrice(showQuotedPrice.toFixed(2));
  };

  const setRateType = () => {
    if (item.cartItemQuoteLineDiscount) {
      setLineDiscount(item.cartItemQuoteLineDiscount.toString());
    }

    if (item.cartItemQuoteLineDiscountType == "F") {
      setValue("2");
      setQuotedUnitPrice(item.unitPrice - item.cartItemQuoteLineDiscount);
    } else {
      setQuotedUnitPrice(item.unitPrice - item.cartItemQuoteLineDiscount);
      setValue("1");
    }
  };

  async function checkRoles(role) {
    const isUserExist = await checkUserRole(role);
    return isUserExist;
  }

  const discountEditable = async () => {
    let editable = false;
    if (cartMode != "Order Quote") {
      checkRoles("quoteadmin").then((res) => {
        setIsAdmin(res);
      });
    }

    return editable;
  };

  function countDecimals(value) {
    if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
    return 0;
  }

  const changeDiscount = (text) => {

    if (text != "") {
      const enteredValue = parseFloat(text) || 0;

      const decCount = countDecimals(enteredValue);

      if (decCount > 2) {
        return;
      }

      const MAX = parseFloat(item.totalPrice);

      if (value == "2") {
        if (enteredValue > MAX) {
          showMessage({
            message: "KINGS SEEDS",
            description: "Discount amount exceeds line total!",
            type: "warning",
            autoHide: true,
          });

          const newEnteredValue = 0.0;

          const showQuotedPrice = item.totalPrice - newEnteredValue;

          displayQuotedPrice1(showQuotedPrice);

          setLineDiscountRate("0");
          setLineDiscount("0");
        } else {
          if (enteredValue < 0) {
          } else {
            const showQuotedPrice = item.totalPrice - enteredValue;

            // setQuotedUnitPrice(showQuotedPrice);
            displayQuotedPrice1(showQuotedPrice);

            const rateDiscount = (enteredValue / item.totalPrice) * 100;
            setLineDiscountRate(rateDiscount.toFixed(2));

            setLineDiscount(text);
          }
        }
      }

      if (value == "1") {
        if (enteredValue > 100) {
          showMessage({
            message: "KINGS SEEDS",
            description: "Discount amount exceeds line total!",
            type: "warning",
            autoHide: true,
          });

          const newEnteredValue = 0.0;

          const showQuotedUNPrice =
            item.totalPrice - (item.totalPrice / 100) * newEnteredValue;

          displayQuotedPrice1(showQuotedUNPrice);

          setLineDiscountRate("0");
          setLineDiscount("0");
        } else {
          if (enteredValue < 0) {
          } else {
            const showQuotedUNPrice =
              item.totalPrice - (item.totalPrice / 100) * enteredValue;

            displayQuotedPrice1(showQuotedUNPrice);
            setLineDiscount((item.totalPrice - showQuotedUNPrice).toFixed(2));

            setLineDiscountRate(text);
          }
        }
      }
    } else {
      setLineDiscount("0");
    }

    getTax();
  };

  return (
    <React.Fragment key={`${item.productNumber}-${item.priceOption}`}>
      <View style={styles.footerNoteView}>
        <View
          style={[
            quoteItemUi !== true
              ? styles.footerCardView
              : styles.footerCardViewQuote,
          ]}
        >
          <View style={styles.cardcontainView}>
            <View style={styles.DeleteViewNew}>
              <View style={styles.checkboxView}>
                <Checkbox.Android
                  disabled={cartMode == "Order Quote"}
                  status={check ? "checked" : "unchecked"}
                  color="red"
                  onPress={() => {
                    let state = !check;
                    setCheck(state);
                    onPressCheckbox(state, index);
                  }}
                />
              </View>
            </View>
            <View style={styles.cartItemTextView}>
              <View style={[styles.cartItemsubView1]}>
                <View style={styles.cardTxtView1}>
                  <Text
                    style={styles.cardTxt}
                    allowFontScaling={false}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name} {}
                  </Text>
                  <Text style={styles.cardSubMainTxt} allowFontScaling={false}>
                    Code: {item.productNumber}
                    {/* <Text style={styles.cardSubMainTxt5}>{item.skuPackSize}</Text> */}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      height: hp("6"),
                      width: wp("5"),
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    },
                    pictorial !== 1 ? { display: "none" } : null,
                  ]}
                >
                  <Checkbox.Android
                    disabled={cartMode == "Order Quote"}
                    status={bcheck ? "checked" : "unchecked"}
                    color={colors.primaryColor}
                    onPress={() => {
                      let state = !bcheck;
                      setBCheck(state);
                      updateBackingCard({
                        skuid: item.skuid,
                        priceLine: item.priceLine,
                        checkVal: state,
                      });
                      //   onPressCheckbox(state, index);
                    }}
                  />
                  <Text
                    style={{ color: colors.primaryColor, fontSize: hp("1.5") }}
                  >
                    B
                  </Text>
                </View>
              </View>

              <View style={styles.cartItemsubView2}>
                <View style={styles.gramsView}>
                  <Text style={styles.cardSubMainTxt6}>{item.priceOption}</Text>
                </View>

                <View style={styles.noteBtnView}>
                  <NoteToggleButton noteVisibility={noteVisibility} />
                </View>
                <View style={styles.AddView}>
                  <View style={styles.numericView}>
                    <TextInput
                      editable={cartMode != "Order Quote"}
                      style={styles.cartItemQuantity}
                      onChangeText={(text) => setTypingText(text)}
                      onFocus={() => {
                        setTypingText(item.quantity.toString());
                      }}
                      onBlur={() => {
                        if (/^[-+]?[0-9]+$/.test(typingText)) {
                          let typingQty = GetInteger(typingText);

                          console.log('pictorialPacketSize', pictorialPacketSize);
                          // const pictorialPacketSize = 5;

                          let tempQty = 0;
                          if (typingQty <= 0) {
                            tempQty = pictorialPacketSize;
                            showMessage({
                              message: "KINGS SEEDS",
                              description: "Minimum quantity is 5",
                              type: "warning",
                              autoHide: true,
                            });

                            // if (pictorial == 1) {

                            // } else {
                            //   tempQty = 1;
                            //   showMessage({
                            //     message: "KINGS SEEDS",
                            //     description: "Minimum quantity is 1",
                            //     type: "warning",
                            //     autoHide: true,
                            //   });
                            // }
                          } else {
                            if (typingQty > 9999) {
                              tempQty = 9999;
                              showMessage({
                                message: "KINGS SEEDS",
                                description: "Maximum quantity is 9999",
                                type: "warning",
                                autoHide: true,
                              });
                            } else {
                              // if (pictorial == 1) {
                                const picturePack =
                                  typingQty % pictorialPacketSize;

                                if (typingQty > pictorialPacketSize) {
                                  if (picturePack > 0) {
                                    showMessage({
                                      message: "KINGS SEEDS",
                                      description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Reduced By - ${picturePack}`,
                                      type: "warning",
                                      autoHide: true,
                                    });
                                  }
                                  tempQty = typingQty - picturePack;
                                } else {
                                  const increased =
                                    pictorialPacketSize - picturePack;
                                  if (picturePack > 0) {
                                    showMessage({
                                      message: "KINGS SEEDS",
                                      description: `These items sold in multiples of ${pictorialPacketSize} packets. Quantity Increased By - ${increased}`,
                                      type: "warning",
                                      autoHide: true,
                                    });
                                  }

                                  if (typingQty == pictorialPacketSize) {
                                    tempQty = typingQty;
                                  } else {
                                    tempQty = typingQty + increased;
                                  }
                                }
                              // } else {
                              //   tempQty = typingQty;
                              // }
                            }
                          }

                          setTypingText(tempQty);
                          //item.quantity = tempQty; // DO NOT DO THIS. this will mutate the redux store without dispatch and re renders

                          if (tempQty != item.quantity) {
                            updateItem({
                              skuid: item.skuid,
                              priceLine: item.priceLine,
                              quantity: tempQty,
                              discountSwitchFlag: discountSwitchFlag,
                              discountPerNumText,
                            }).then(() => {
                              getTax();
                            });
                          }
                        } else {
                          setTypingText(item.quantity);
                          alert("please enter numbers only");
                        }
                      }}
                      value={typingText.toString()}
                      keyboardType="numeric"
                      selectTextOnFocus
                    />
                  </View>
                </View>
                <View style={styles.PriceView}>
                  <Text
                    style={styles.cardUnitPriceTxt}
                    allowFontScaling={false}
                  >
                    Unit: £{item.unitPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.cardPriceTxt} allowFontScaling={false}>
                    £{item.totalPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.discountView,
              quoteItemUi !== true ? { display: "none" } : null,
            ]}
          >
            <Text style={styles.discountTxt}>Line Discount: </Text>
            <View style={styles.lineDiscountView}>
              <View
                style={{
                  width: "50%",
                  borderRightWidth: wp("0.2"),
                  borderColor: "#E1E2E2",
                }}
              >
                <TextInput
                  editable={isAdmin}
                  allowFontScaling={false}
                  style={styles.TxtInput}
                  placeholderTextColor="black"
                  maxLength={10}
                  keyboardType="numeric"
                  placeholder="0.00"
                  onChangeText={(text) => {
                    changeDiscount(text);
                  }}
                  value={value == "1" ? lineDiscountRate : lineDiscount}
                  selectTextOnFocus
                ></TextInput>
              </View>
              <View
                style={{
                  width: "50%",
                }}
              >
                <Dropdown
                  disable={!isAdmin}
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  maxHeight={data.length * hp("6")}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "%" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    item.cartItemQuoteLineDiscountType = item.label;
                    setValue(item.value);
                    setIsFocus(false);
                    setDiscountBackwords();
                  }}
                />
              </View>
            </View>

            <View
              style={{ flexDirection: "row", position: "absolute", right: 5 }}
            >
              <Text style={[styles.discountTxt, { color: "black" }]}>
                Quoted Price:{" "}
              </Text>
              <Text style={styles.discountTxt}>£ {quotedPrice}</Text>
              {/* <Text style={styles.discountTxt}>£ {isNaN(quotedPrice) ? item.totalPrice.toFixed(2) : quotedPrice}</Text> */}
            </View>
          </View>
        </View>

        {visibleNote ? (
          <View
            style={[
              styles.noteView,
              visibleNote !== true ? { display: "none" } : null,
            ]}
          >
            <TextInput
              style={styles.noteText}
              multiline
              numberOfLines={3}
              // style={styles.input}
              onChangeText={(text) => setNoteText(text)}
              value={noteText}
              placeholder="Note..."
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
      {/* <View style={styles.notepallet}>
              <Text>fdsfs</Text>
        </View> */}
    </React.Fragment>
  );
}

// <View style={styles.cardTxtView1}>
{
  /* <Text style={styles.cardTxt} allowFontScaling={false}>
{item.name.length > 20 && scrn_width > 450
      ? `${item.name.substring(0, 20)}...`
      : item.name.length > 17 && scrn_width < 450
      ? `${item.name.substring(0, 17)}...`
      : `${item.name}`}

</Text> */
}

// <Text
//     style={styles.cardSubMainTxt}
//     allowFontScaling={false}>
//     Product Number : {item.productNumber} {item.category}
//     {/* <Text style={styles.cardSubMainTxt5}>{item.skuPackSize} seeds</Text> */}
// </Text>
// </View>
// <View>
// <Text style={styles.cardSubMainTxt6}>
//     {item.priceOption}
// </Text>
// </View>
{
  /* <View style={styles.AddView}>
<View style={styles.numericView}>
    <NumericInput
        value={item.quantity}
        onChange={value => {
            console.log('change....', value);
            // this.setState({
            //     value: value,
            // });
            try {
                item.quantity = value
                updateItem({ ...item, quantity: value })
                console.log({ ...item, quantity: value })
            } catch (e) {
                console.log(e)
            }
        }}
        minValue={1}
        maxValue={4000}
        //onLimitReached={(isMax, msg) => console.log(isMax, msg)}
        totalWidth={wp('16')}
        totalHeight={hp('5')}
        iconSize={25}
        step={1}
        editable={false}
        valueType="real"
        rounded
        borderColor="#f2f3f4"
        textColor="black"
        iconStyle={{ color: '#1ED18C' }}
        rightButtonBackgroundColor="#F3F2F2"
        leftButtonBackgroundColor="#F3F2F2"
    />
</View>
</View> */
}

{
  /* <View style={styles.PriceView}>

    <Text
        style={styles.cardUnitPriceTxt}
        allowFontScaling={false}>
      Unit Price: £{(item.unitPrice).toFixed(2)}
    </Text>
    <Text
        style={styles.cardPriceTxt}
        allowFontScaling={false}>
      £{(item.unitPrice * item.quantity).toFixed(2)}
    </Text>

</View> */
}

{
  /* <View style={styles.DeleteView}>
<TouchableOpacity onPress={() => {
    try {
        removeItem(index)
        // this.props.navigation.navigate('refresh');
        navigation.goBack();
        navigation.navigate('carts', { time: Date.now() })
    } catch (e) {
        console.log('eeee', e)
    }
}}
    style={styles.delBtn}>
    <Image source={deleteIcon} style={styles.cardImg} />
</TouchableOpacity>
</View> */
}
