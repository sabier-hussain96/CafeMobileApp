import React from 'react';
import { ImageProps, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS
} from '../common/Constants';
import { favouritesStyles } from '../common/GlobalStyles';
import ImageBackgroundInfo from './ImageBackgroundInfo';

interface FavoritesItemCardProps {
  id: string;
  imagelink_portrait: ImageProps;
  name: string;
  special_ingredient: string;
  type: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  description: string;
  favourite: boolean;
  ToggleFavouriteItem: any;
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  id,
  imagelink_portrait,
  name,
  special_ingredient,
  type,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  description,
  favourite,
  ToggleFavouriteItem,
}) => {
  return (
    <View style={favouritesStyles.CardContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        ToggleFavourite={ToggleFavouriteItem}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={favouritesStyles.ContainerLinearGradient}>
        <Text style={favouritesStyles.DescriptionTitle}>Description</Text>
        <Text style={favouritesStyles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};



export default FavoritesItemCard;
