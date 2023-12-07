import React from 'react';
import { Image, ImageProps, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTSIZE
} from '../common/Constants';
import { orderItemCardStyles } from '../common/GlobalStyles';

interface OrderItemCardProps {
  type: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  ItemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={orderItemCardStyles.CardLinearGradient}>
      <View style={orderItemCardStyles.CardInfoContainer}>
        <View style={orderItemCardStyles.CardImageInfoContainer}>
          <Image source={imagelink_square} style={orderItemCardStyles.Image} />
          <View>
            <Text style={orderItemCardStyles.CardTitle}>{name}</Text>
            <Text style={orderItemCardStyles.CardSubtitle}>{special_ingredient}</Text>
          </View>
        </View>
        <View>
          <Text style={orderItemCardStyles.CardCurrency}>
            $ <Text style={orderItemCardStyles.CardPrice}>{ItemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data: any, index: any) => (
        <View key={index.toString()} style={orderItemCardStyles.CardTableRow}>
          <View style={orderItemCardStyles.CardTableRow}>
            <View style={orderItemCardStyles.SizeBoxLeft}>
              <Text
                style={[
                  orderItemCardStyles.SizeText,
                  {
                    fontSize:
                      type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                  },
                ]}>
                {data.size}
              </Text>
            </View>
            <View style={orderItemCardStyles.PriceBoxRight}>
              <Text style={orderItemCardStyles.PriceCurrency}>
                {data.currency}
                <Text style={orderItemCardStyles.Price}> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={orderItemCardStyles.CardTableRow}>
            <Text style={orderItemCardStyles.CardQuantityPriceText}>
              X <Text style={orderItemCardStyles.Price}>{data.quantity}</Text>
            </Text>
            <Text style={orderItemCardStyles.CardQuantityPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};



export default OrderItemCard;
