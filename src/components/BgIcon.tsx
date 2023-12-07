import React from 'react';
import { View } from 'react-native';
import { GlobalStyles } from '../common/GlobalStyles';
import CustomIcon from './CustomIcon';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[GlobalStyles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;
