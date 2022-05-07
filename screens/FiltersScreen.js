import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';

import {StyleSheet, Text, View, Switch, Platform} from 'react-native';
import DefaultText from '../components/DefaultText';
import colors from '../constatns/colors';

const FilterSwitch = ({label, value, handleChange}) => {
  return (
    <View style={styles.filterBox}>
      <DefaultText>{label}</DefaultText>
      <Switch
        trackColor={{true: colors.primary}}
        thumbColor={Platform.OS === 'android' ? colors.primary : ''}
        value={value}
        onValueChange={handleChange}
      />
    </View>
  );
};

const FiltersScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [isGluttenFree, setIsGluttenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGluttenFree,
      isLactoseFree,
      isVegan,
      isVegetarian,
    };

    dispatch(setFilters(appliedFilters));

    console.log(appliedFilters);
  }, [isGluttenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({save: saveFilters});
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Glutten-free"
        value={isGluttenFree}
        handleChange={newValue => {
          setIsGluttenFree(newValue);
        }}
      />
      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        handleChange={newValue => {
          setIsLactoseFree(newValue);
        }}
      />
      <FilterSwitch
        label="Vegan"
        value={isVegan}
        handleChange={newValue => {
          setIsVegan(newValue);
        }}
      />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        handleChange={newValue => {
          setIsVegetarian(newValue);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 16,
  },
});

export default FiltersScreen;
