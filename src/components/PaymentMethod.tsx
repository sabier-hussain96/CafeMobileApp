import React from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTSIZE
} from '../common/Constants';
import { PaymentMethodStyles } from '../common/GlobalStyles';
import CustomIcon from './CustomIcon';

interface PaymentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View
      style={[
        PaymentMethodStyles.PaymentCardContainer,
        {
          borderColor:
            paymentMode == name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}>
      {isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={PaymentMethodStyles.LinearGradientWallet}>
          <View style={PaymentMethodStyles.WalletRow}>
            <CustomIcon
              name={'wallet'}
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_30}
            />
            <Text style={PaymentMethodStyles.PaymentTitle}>{name}</Text>
          </View>
          <Text style={PaymentMethodStyles.PaymentPrice}>$ 100.50</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={PaymentMethodStyles.LinearGradientRegular}>
          <Image source={icon} style={PaymentMethodStyles.PaymentImage} />
          <Text style={PaymentMethodStyles.PaymentTitle}>{name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};



export default PaymentMethod;
