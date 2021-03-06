import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';

import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constatns/colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? '#fff' : Colors.primary}
    />
  );
};

// const styles = StyleSheet.create({});
export default CustomHeaderButton;
