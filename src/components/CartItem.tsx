import React from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTSIZE
} from '../common/Constants';
import { cartItemStyles } from '../common/GlobalStyles';
import CustomIcon from './CustomIcon';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={cartItemStyles.CartItemLinearGradient}>
          <View style={cartItemStyles.CartItemRow}>
            <Image source={imagelink_square} style={cartItemStyles.CartItemImage} />
            <View style={cartItemStyles.CartItemInfo}>
              <View>
                <Text style={cartItemStyles.CartItemTitle}>{name}</Text>
                <Text style={cartItemStyles.CartItemSubtitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={cartItemStyles.CartItemRoastedContainer}>
                <Text style={cartItemStyles.CartItemRoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              style={cartItemStyles.CartItemSizeRowContainer}>
              <View style={cartItemStyles.CartItemSizeValueContainer}>
                <View style={cartItemStyles.SizeBox}>
                  <Text
                    style={[
                      cartItemStyles.SizeText,
                      {
                        fontSize:
                          type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>
                <Text style={cartItemStyles.SizeCurrency}>
                  {data.currency}
                  <Text style={cartItemStyles.SizePrice}> {data.price}</Text>
                </Text>
              </View>
              <View style={cartItemStyles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={cartItemStyles.CartItemIcon}
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={cartItemStyles.CartItemQuantityContainer}>
                  <Text style={cartItemStyles.CartItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={cartItemStyles.CartItemIcon}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={cartItemStyles.CartItemSingleLinearGradient}>
          <View>
            <Image
              source={imagelink_square}
              style={cartItemStyles.CartItemSingleImage}
            />
          </View>
          <View style={cartItemStyles.CartItemSingleInfoContainer}>
            <View>
              <Text style={cartItemStyles.CartItemTitle}>{name}</Text>
              <Text style={cartItemStyles.CartItemSubtitle}>{special_ingredient}</Text>
            </View>
            <View style={cartItemStyles.CartItemSingleSizeValueContainer}>
              <View style={cartItemStyles.SizeBox}>
                <Text
                  style={[
                    cartItemStyles.SizeText,
                    {
                      fontSize:
                        type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                    },
                  ]}>
                  {prices[0].size}
                </Text>
              </View>
              <Text style={cartItemStyles.SizeCurrency}>
                {prices[0].currency}
                <Text style={cartItemStyles.SizePrice}> {prices[0].price}</Text>
              </Text>
            </View>
            <View style={cartItemStyles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={cartItemStyles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={cartItemStyles.CartItemQuantityContainer}>
                <Text style={cartItemStyles.CartItemQuantityText}>
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={cartItemStyles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                <CustomIcon
                  name="add"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};



export default CartItem;
