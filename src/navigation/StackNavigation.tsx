import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigation from './TabNavigation';
import { ScreenNames,Stackscreenoptions } from '../common/Constants';
import Details from '../screens/Details';
import Payment from '../screens/Payment';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={Stackscreenoptions}>
      <Stack.Screen name={ScreenNames.TabScreen} component={TabNavigation} options={{animation:'slide_from_bottom'}} />
      <Stack.Screen name={ScreenNames.DeatilsScreen} component={Details} options={{animation:'slide_from_bottom'}} />
      <Stack.Screen name={ScreenNames.PaymentScreen} component={Payment} options={{animation:'slide_from_bottom'}} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
