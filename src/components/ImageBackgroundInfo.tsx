import React from 'react';
import {
  ImageBackground,
  ImageProps,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  COLORS,
  FONTSIZE,
  SPACING
} from '../common/Constants';
import { ImageBgStyles } from '../common/GlobalStyles';
import CustomIcon from './CustomIcon';
import GradientBGIcon from './GradientBGIcon';


interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
 
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
  
  
}) => {

  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={ImageBgStyles.ItemBackgroundImage}>
        {EnableBackHandler ? (
          <View style={ImageBgStyles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity
              onPress={() => {
                BackHandler();
              }}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={ImageBgStyles.ImageHeaderBarContainerWithoutBack}>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={ImageBgStyles.ImageInfoOuterContainer}>
          <View style={ImageBgStyles.ImageInfoInnerContainer}>
            <View style={ImageBgStyles.InfoContainerRow}>
              <View>
                <Text style={ImageBgStyles.ItemTitleText}>{name}</Text>
                <Text style={ImageBgStyles.ItemSubtitleText}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={ImageBgStyles.ItemPropertiesContainer}>
                <View style={ImageBgStyles.ProperFirst}>
                  <CustomIcon
                    name={type == 'Bean' ? 'bean' : 'beans'}
                    size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      ImageBgStyles.PropertyTextFirst,
                      {
                        marginTop:
                          type == 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {type}
                  </Text>
                </View>
                <View style={ImageBgStyles.ProperFirst}>
                  <CustomIcon
                    name={type == 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={ImageBgStyles.PropertyTextLast}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={ImageBgStyles.InfoContainerRow}>
              <View style={ImageBgStyles.RatingContainer}>
                <CustomIcon
                  name={'star'}
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={ImageBgStyles.RatingText}>{average_rating}</Text>
                <Text style={ImageBgStyles.RatingCountText}>({ratings_count})</Text>
              </View>
              <View style={ImageBgStyles.RoastedContainer}>
                <Text style={ImageBgStyles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};



export default ImageBackgroundInfo;
