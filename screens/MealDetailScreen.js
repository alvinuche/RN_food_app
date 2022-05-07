import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import DefaultText from '../components/DefaultText';
import colors from '../constatns/colors';
import {toggleFavourite} from '../store/actions/meals';

const ListItem = props => {
  const newStyle =
    props.index % 2 === 1 ? styles.leftBorderStyle : styles.rightBorderStyle;

  return (
    <View style={{...styles.listItem, ...newStyle}}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({navigation}) => {
  const availableMeals = useSelector(state => state.meals.meals);

  const dispatch = useDispatch();

  // const title = navigation.getParam('title');
  const mealId = navigation.getParam('mealId');
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const currentMealIsFavourite = useSelector(state =>
    state.meals.favouriteMeals.some(meals => meals.id === mealId),
  );

  const handleFavToggle = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({handleToggle: handleFavToggle});
    navigation.setParams({isFavourite: currentMealIsFavourite});
  }, [handleFavToggle, currentMealIsFavourite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />

      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>

      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingedients.map((ingredient, i) => (
        <ListItem key={i} index={1}>
          {ingredient}
        </ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, i) => (
        <ListItem key={i} index={2}>
          {step}
        </ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    textAlign: 'center',
    // marginLeft: 20,
    marginVertical: 16,
    color: colors.primary,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    // borderColor: '#ddd',
    // borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    // borderLeftWidth: 3,
    // borderLeftColor: colors.primary,
  },

  leftBorderStyle: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  rightBorderStyle: {
    borderRightWidth: 3,
    borderRightColor: colors.primary,
  },
});

export default MealDetailScreen;
