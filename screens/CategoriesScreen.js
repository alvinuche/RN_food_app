import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {CATEGORIES} from '../data/dummy-data';
import Colors from '../constatns/colors';
import CategoryGridTile from '../components/CategoryGridTile';

import AntDesign from 'react-native-vector-icons/AntDesign';

const CategoriesScreen = ({navigation}) => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate('CategoryMeal', {categoryId: itemData.item.id});
        }}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = {
  title: 'Meal Category',
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary,
  },
  headerTintColor: Platform.OS === 'ios' ? Colors.primary : '#fff',
  // headerTitleStyle: {
  //   color: '#fff',
  //   textAlign: 'center',
  // },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
