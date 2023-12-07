import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  COLORS
} from '../common/Constants';
import { OrderHistoryScreenStyles } from '../common/GlobalStyles';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/Header';
import OrderHistoryCard from '../components/OrderHistoryCard';
import PopUpAnimation from '../components/PopupAnimation';

const OrderHistoryScreen = ({navigation}: any) => {
  const OrderHistoryList = useSelector((state: any) => state.cart.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <View style={OrderHistoryScreenStyles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={OrderHistoryScreenStyles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={OrderHistoryScreenStyles.ScrollViewFlex}>
        <View
          style={[OrderHistoryScreenStyles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={OrderHistoryScreenStyles.ItemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={OrderHistoryScreenStyles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={OrderHistoryScreenStyles.DownloadButton}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={OrderHistoryScreenStyles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;
