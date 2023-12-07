import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import {COLORS, ScreenNames} from '../common/Constants';
import {GlobalStyles} from '../common/GlobalStyles';
import {BlurView} from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: GlobalStyles.tabOptions,
        tabBarBackground: () => (
            <BlurView
              overlayColor=""
              blurAmount={15}
              style={GlobalStyles.BlurViewStyles}
            />
          ),
      }}>
      <Tab.Screen name={ScreenNames.HomeScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <CustomIcon
            name="home"
            size={25}
            color={
              focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
            }
          />
        ),
      }} component={Home} />
      <Tab.Screen
        name={ScreenNames.CartScreen}
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="cart"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={ScreenNames.FavoritesScreen}
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="like"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name={ScreenNames.OrderScreen}
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="star"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigation;
