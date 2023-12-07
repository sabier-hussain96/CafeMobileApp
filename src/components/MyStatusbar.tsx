import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { COLORS } from '../common/Constants';


const MyStatusBar = () => (
  <View style={[styles.statusBar, {backgroundColor: COLORS.primaryBlackHex}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={COLORS.primaryBlackHex}  />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});


export default MyStatusBar;


