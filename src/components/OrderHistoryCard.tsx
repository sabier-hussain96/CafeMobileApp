import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { OrderHistoryCardStyles } from '../common/GlobalStyles';
import OrderItemCard from './OrderItemCard';
  interface OrderHistoryCardProps {
    navigationHandler: any;
    CartList: any;
    CartListPrice: string;
    OrderDate: string;
  }
  const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
    navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
  }) => {
    return (
      <View style={OrderHistoryCardStyles.CardContainer}>
        <View style={OrderHistoryCardStyles.CardHeader}>
          <View>
            <Text style={OrderHistoryCardStyles.HeaderTitle}>Order Time</Text>
            <Text style={OrderHistoryCardStyles.HeaderSubtitle}>{OrderDate}</Text>
          </View>
          <View style={OrderHistoryCardStyles.PriceContainer}>
            <Text style={OrderHistoryCardStyles.HeaderTitle}>Total Amount</Text>
            <Text style={OrderHistoryCardStyles.HeaderPrice}>$ {CartListPrice}</Text>
          </View>
        </View>
        <View style={OrderHistoryCardStyles.ListContainer}>
          {CartList.map((data: any, index: any) => (
            <TouchableOpacity
              key={index.toString() + data.id}
              onPress={() => {
                navigationHandler({
                  index: data.index,
                  id: data.id,
                  type: data.type,
                });
              }}>
              <OrderItemCard
                type={data.type}
                name={data.name}
                imagelink_square={data.imagelink_square}
                special_ingredient={data.special_ingredient}
                prices={data.prices}
                ItemPrice={data.ItemPrice}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  

  
  export default OrderHistoryCard;
  