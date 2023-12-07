import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { emptyListComponentStyles } from '../common/GlobalStyles';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={emptyListComponentStyles.EmptyCartContainer}>
      <LottieView
        style={emptyListComponentStyles.LottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={emptyListComponentStyles.LottieText}>{title}</Text>
    </View>
  );
};


export default EmptyListAnimation;
