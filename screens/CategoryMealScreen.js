import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {CATEGORIES} from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import colors from '../constatns/colors';

const CategoryMealScreen = ({navigation}) => {
  const meals = useSelector(state => state.meals.filteredMeals);
  // console.log(meals);

  const categoryId = navigation.getParam('categoryId');

  const displayedMeals = meals.filter(meal =>
    meal.categoryIds.includes(categoryId),
  );

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.container}>
        <DefaultText textStyle={styles.textStyle}>
          No meals found, maybe check your filters...
        </DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={navigation} />;
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

export default CategoryMealScreen;
