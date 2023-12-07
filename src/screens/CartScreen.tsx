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
import { cartScreenStyles } from '../common/GlobalStyles';
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/Header';
import PaymentFooter from '../components/PaymentFooter';
import useDispatch from '../hooks/useDispatch';
import { calculateCartPrice, decrementCartItemQuantity, incrementCartItemQuantity } from '../reducers/productReducer';

const CartScreen = ({navigation}: any) => {
  const CartList = useSelector((state: any) => state.cart.CartList);
  const CartPrice = useSelector((state: any) => state.cart.CartPrice);
  const dispatch = useDispatch();

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    dispatch(incrementCartItemQuantity({id:id, size:size}));
    dispatch(calculateCartPrice());
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    dispatch(decrementCartItemQuantity({id:id, size:size}));
    dispatch(calculateCartPrice());
  };
  return (
    <View style={cartScreenStyles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={cartScreenStyles.ScrollViewFlex}>
        <View
          style={[cartScreenStyles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={cartScreenStyles.ItemContainer}>
            <HeaderBar title="Cart" />

            {CartList.length == 0 ? (
              <EmptyListAnimation title={'Cart is Empty'} />
            ) : (
              <View style={cartScreenStyles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle="Pay"
              price={{price: CartPrice, currency: '$'}}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};



export default CartScreen;
