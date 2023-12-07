import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTSIZE
} from '../common/Constants';
import { PaymentScreenStyles } from '../common/GlobalStyles';
import CustomIcon from '../components/CustomIcon';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentFooter from '../components/PaymentFooter';
import PaymentMethod from '../components/PaymentMethod';
import PopUpAnimation from '../components/PopupAnimation';
import useDispatch from '../hooks/useDispatch';
import { addToOrderHistoryListFromCart, calculateCartPrice } from '../reducers/productReducer';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    dispatch(addToOrderHistoryListFromCart());
    dispatch(calculateCartPrice());
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };

  return (
    <View style={PaymentScreenStyles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={PaymentScreenStyles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={PaymentScreenStyles.ScrollViewFlex}>
        <View style={PaymentScreenStyles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={PaymentScreenStyles.HeaderText}>Payments</Text>
          <View style={PaymentScreenStyles.EmptyView} />
        </View>

        <View style={PaymentScreenStyles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                PaymentScreenStyles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={PaymentScreenStyles.CreditCardTitle}>Credit Card</Text>
              <View style={PaymentScreenStyles.CreditCardBG}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={PaymentScreenStyles.LinearGradientStyle}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                  <View style={PaymentScreenStyles.CreditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={PaymentScreenStyles.CreditCardNumberContainer}>
                    <Text style={PaymentScreenStyles.CreditCardNumber}>3879</Text>
                    <Text style={PaymentScreenStyles.CreditCardNumber}>8923</Text>
                    <Text style={PaymentScreenStyles.CreditCardNumber}>6745</Text>
                    <Text style={PaymentScreenStyles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={PaymentScreenStyles.CreditCardRow}>
                    <View style={PaymentScreenStyles.CreditCardNameContainer}>
                      <Text style={PaymentScreenStyles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={PaymentScreenStyles.CreditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={PaymentScreenStyles.CreditCardDateContainer}>
                      <Text style={PaymentScreenStyles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={PaymentScreenStyles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};



export default PaymentScreen;
