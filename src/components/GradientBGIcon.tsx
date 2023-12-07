import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../common/Constants';
import { GradientBgStyles } from '../common/GlobalStyles';
import CustomIcon from './CustomIcon';

interface GradientBGIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={GradientBgStyles.Container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={GradientBgStyles.LinearGradientBG}>
        <CustomIcon name={name} color={color} size={size} />
      </LinearGradient>
    </View>
  );
};



export default GradientBGIcon;
