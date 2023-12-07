import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { paymentFooterStyles } from '../common/GlobalStyles';

interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View style={paymentFooterStyles.PriceFooter}>
      <View style={paymentFooterStyles.PriceContainer}>
        <Text style={paymentFooterStyles.PriceTitle}>Price</Text>
        <Text style={paymentFooterStyles.PriceText}>
          {price.currency} <Text style={paymentFooterStyles.Price}>{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={paymentFooterStyles.PayButton}
        onPress={() => buttonPressHandler()}>
        <Text style={paymentFooterStyles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default PaymentFooter;
