import React from 'react';
import { Text, View } from 'react-native';
import { HeaderStyles } from '../common/GlobalStyles';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={HeaderStyles.HeaderContainer}>
      <Text style={HeaderStyles.HeaderText}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
