import React, { useState } from 'react'
import {
    View,
    Image,
    Text,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NumericInput from 'react-native-numeric-input';
import * as colors from '../../style/Common/ColorsStyle';
import Styles from '../../style/CartStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useNavigation } from '@react-navigation/core';
const deleteIcon = require('../../assets/del.png');

const { ids, styles } = Styles;
let scrn_width = wp("100");

export default function SummaryItem({item, removeItem, updateItem, index}) {
    const navigation = useNavigation();
    return (
        <React.Fragment key={`${item.productNumber}-${item.skuPackSize}`}>
            <View style={styles.footerCardView}>
                <View style={styles.cartItemTextView}>
                    <View style={styles.cardTxtView1}>
                        <Text style={styles.cardTxt} allowFontScaling={false}>
                        {item.name.length > 25 && scrn_width > 450
                              ? `${item.name.substring(0, 25)}...`
                              : item.name.length > 17 && scrn_width < 450
                              ? `${item.name.substring(0, 17)}...`
                              : `${item.name}`}

                        </Text>
                        <Text
                            style={styles.cardSubMainTxt}
                            allowFontScaling={false}>
                            Code: {item.productNumber}
                            {/*<Text style={styles.cardSubMainTxt5}>{item.skuPackSize}</Text>*/}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.cardSubMainTxt6}>
                            {item.priceOption}
                        </Text>
                    </View>
                    <View style={styles.AddView}>
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
                                maxValue={10000}
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
                    </View>
                    <View style={styles.PriceView}>
                            <Text
                                style={styles.cardPriceTxt}
                                allowFontScaling={false}>
                              £{(item.unitPrice * item.quantity).toFixed(2)}
                            </Text>
                    </View>
                    <View style={styles.DeleteView}>
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
                    </View>
                </View>
            </View>

        </React.Fragment>
    )
}
