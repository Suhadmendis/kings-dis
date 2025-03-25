import React, { useState } from "react";
import { View, Image, Text, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NumericInput from "react-native-numeric-input";


import NoteToggleButton from '../helperComponents/NoteToggleButoon';
import Styles from "../../style/OrderItemStyle.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { useNavigation } from "@react-navigation/core";
import * as colors from '../../style/Common/ColorsStyle'

const { ids, styles } = Styles;
let scrn_width = wp("100");

export default function OrderItem({ item, index, isQuote }) {



  const [totalDisplay, setTotalDisplay] = React.useState(null);


  const [visibleNote, setVisibleNote] = React.useState(false);
  const [noteText, setNoteText] = useState(item.itemNote);


  const navigation = useNavigation();



  const noteVisibility = (visibilitySwitch) => setVisibleNote(visibilitySwitch);


  return (
    <React.Fragment key={index}>
      <View>
        <View style={styles.footerCardNoteView}>
          <View style={styles.footerCardQuoteView}>
            <View style={styles.footerCardView}>
              <View style={styles.cartItemTextView}>
                <View style={styles.cardTxtView1}>
                  <Text style={styles.cardTxt} allowFontScaling={false}>
                    {item.name.length > 25 && scrn_width > 450
                      ? `${item.name.substring(0, 25)}...`
                      : item.name}
                  </Text>
                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.cardSubMainTxt} allowFontScaling={false}>
                  Code: {item.productNumber}
                    {/*<Text style={styles.cardSubMainTxt5}>{item.skuPackSize}</Text>*/}
                  </Text>
                  {
                    item.backingCard == true ?(<Text style={{fontSize:hp('1.3'), marginLeft:wp('2'), color:colors.primaryColor}}>Backing Card</Text>): null
                  }
                  </View>


                </View>
              </View>
              <View style={styles.cartItemTextView2}>

              <View
                style={styles.optinsView}
                >
                <Text style={styles.cardSubMainTxt6}>{item.priceOption}</Text>
                </View>


                <View style={styles.noteBtnView}>
                  <NoteToggleButton noteVisibility={noteVisibility}  />
                </View>

                <View style={styles.AddView}>
                  <View style={styles.numericView}>
                    <Text style={styles.numericTxt}>{item.quantity}</Text>
                  </View>
                </View>
                <View style={styles.PriceView}>
                  <Text style={styles.unitPriceTxt} allowFontScaling={false}>
                    Unit Price:{" "}
                    <Text style={{ fontWeight: "bold" }}>£{(item.unitPrice).toFixed(2)}</Text>
                  </Text>
                  <Text style={styles.cardPriceTxt} allowFontScaling={false}>
                    £{(item.totalPrice)}
                  </Text>
                </View>
              </View>

            </View>
          {
            isQuote ? (
              <View
              style={[
                styles.discountView,
                isQuote !== true ? { display: "none" } : null,
              ]}
            >
              <Text style={styles.discountTxt}>Line Discount: </Text>
              { item.cartItemQuoteLineDiscountType == 'F' ? (
                      <Text style={[styles.discountTxt, {color:'black'}]}> £ { item.cartItemQuoteLineDiscount } </Text>
                    ) : (
                      <Text style={[styles.discountTxt, {color:'black'}]}> { item.cartItemDiscountRate }% (£ { item.cartItemQuoteLineDiscount }) </Text>
                    )}

              <View
                style={styles.discountQuotedPriceView}
              >
                <Text style={[styles.discountTxt, { color: "black" }]}>
                  Quoted Price:{" "}
                </Text>
                <Text style={[styles.discountTxt, { color: "black" }]}>
                        £ { item.cartItemQuoteYourPrice.toFixed(2) }
                      </Text>

              </View>
            </View>
            ) : (
              <View></View>
            )
          }


          </View>

          {
            visibleNote ? (
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
              editable={false}
              onChangeText={() => console.log('f')}
              value={noteText}
              placeholder="Note..."

            />

            </View>
            ) : (
              <View></View>
            )
          }

        </View>
      </View>



    </React.Fragment>
  );
}
