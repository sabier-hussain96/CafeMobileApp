import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View,   ImageProps, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTSIZE } from '../common/Constants';
import { HomeScreenStyles } from '../common/GlobalStyles';
import BGIcon from './BgIcon';
import CustomIcon from './CustomIcon';

interface CoffeeCardProps {
  special_ingredient: string;
  buttonPressHandler: any;
  id: string;
  favourite: boolean;
  index: string;
  type: string;
  roasted: string;
  average_rating: number;
  imagelink_square:ImageProps;
  name: string;
  price: any;
  BackHandler?: any;

 
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={HomeScreenStyles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={imagelink_square}
        style={HomeScreenStyles.CardImageBG}
        resizeMode="cover">
        <View style={HomeScreenStyles.ratingContainer}>
          <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={HomeScreenStyles.ratingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={HomeScreenStyles.CardTitle}>{name}</Text>
      <Text style={HomeScreenStyles.CardSubtitle}>{special_ingredient}</Text>
      <View style={HomeScreenStyles.CardFooterRow}>
        <Text style={HomeScreenStyles.CardPriceCurrency}>
          $ <Text style={HomeScreenStyles.CardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{...price, quantity: 1}],
            });
          }}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;
