import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  COLORS,
  FONTSIZE
} from '../common/Constants';
import { DetailsScreenStyles } from '../common/GlobalStyles';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import useDispatch from '../hooks/useDispatch';
import { addToCart, addToFavoriteList, calculateCartPrice, deleteFromFavoriteList } from '../reducers/productReducer';

const Details = ({navigation, route}: any) => {
  const ItemOfIndex = useSelector((state: any) =>
  route.params.type == 'Coffee' ? state.favorites.CoffeeList :state.favorites.BeanList,
)[route.params.index];

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const dispatch = useDispatch();

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
   dispatch( addToCart({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices: [{...prices, quantity: 1}],
  }));
    dispatch(calculateCartPrice());
    navigation.navigate('Cart');
  };

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? dispatch(deleteFromFavoriteList({id:id,type:type})) : dispatch(addToFavoriteList({id:id,type:type}));
  };

  return (
    <View style={DetailsScreenStyles.ScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DetailsScreenStyles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={DetailsScreenStyles.FooterInfoArea}>
          <Text style={DetailsScreenStyles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={DetailsScreenStyles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={DetailsScreenStyles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={DetailsScreenStyles.InfoTitle}>Size</Text>
          <View style={DetailsScreenStyles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  DetailsScreenStyles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    DetailsScreenStyles.SizeText,
                    {
                      fontSize:
                        route.params.type == 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
          addToCarthandler({
            id: ItemOfIndex.id,
            index: ItemOfIndex.index,
            name: ItemOfIndex.name,
            roasted: ItemOfIndex.roasted,
            imagelink_square: ItemOfIndex.imagelink_square,
            special_ingredient: ItemOfIndex.special_ingredient,
            type: ItemOfIndex.type,
            prices: price
          });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Details;


