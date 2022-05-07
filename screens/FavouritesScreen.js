import React from 'react';
import {useSelector} from 'react-redux';

import {StyleSheet, Text, View} from 'react-native';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import colors from '../constatns/colors';

const FavouritesScreen = ({navigation}) => {
  const favouriteMeals = useSelector(state => state.meals.favouriteMeals);

  if (favouriteMeals.length === 0 || !favouriteMeals) {
    return (
      <View style={styles.container}>
        <DefaultText textStyle={styles.textStyle}>
          No favourite meals found. Start adding some!
        </DefaultText>
      </View>
    );
  }

  return <MealList listData={favouriteMeals} navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
  },
});

export default FavouritesScreen;
