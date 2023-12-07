import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../common/Constants';
import { FavouritesScreenStyles } from '../common/GlobalStyles';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavouritesItemCard';
import HeaderBar from '../components/Header';
import useDispatch from '../hooks/useDispatch';
import { addToFavoriteList, deleteFromFavoriteList } from '../reducers/productReducer';

const FavoritesScreen = ({navigation}: any) => {
  const dispatch =useDispatch();
  const FavoritesList = useSelector((state: any) => state.favorites.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
 
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? dispatch(deleteFromFavoriteList({type:type, id:id})): dispatch(addToFavoriteList({type:type, id:id}));
  };
  return (
    <View style={FavouritesScreenStyles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={FavouritesScreenStyles.ScrollViewFlex}>
        <View
          style={[FavouritesScreenStyles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={FavouritesScreenStyles.ItemContainer}>
            <HeaderBar title="Favourites" />

            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={FavouritesScreenStyles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={data.favourite}
                      ToggleFavouriteItem={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default FavoritesScreen;
