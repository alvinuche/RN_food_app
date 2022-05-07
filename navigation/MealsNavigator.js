import React from 'react';
import {Platform, Dimensions, Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

import Colors from '../constatns/colors';
import {CATEGORIES, MEALS} from '../data/dummy-data';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {createDrawerNavigator} from 'react-navigation-drawer';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
  headerShown: true,
  safeAreaInsets: {top: 0, bottom: 0, left: 0, right: 0},
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary,
  },
  headerTintColor: Platform.OS === 'ios' ? Colors.primary : '#fff',
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
    // textAlign: 'center',
  },
  headerBackTitleStyle: {
    fontFamily: 'OpenSans',
  },
  cardStyle: {opacity: 1},
  // animationEnabled: false,
  // transitionConfig: () => ({
  //   containerStyle: {backgroundColor: 'transparent'},
  //   transitionSpec: {duration: 0, useNativeDriver: true},
  // }),
};

const defaultNavigationOptions = navData => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      iconName="ios-menu-sharp"
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: navData => {
        return {
          title: 'Meal Category',
          headerLeft: () => defaultNavigationOptions(navData),
        };
      },
    },
    CategoryMeal: {
      screen: CategoryMealScreen,
      navigationOptions: navData => {
        const categoryId = navData.navigation.getParam('categoryId');
        const selectedCategory = CATEGORIES.find(
          category => category.id === categoryId,
        );
        return {
          title: selectedCategory.title,
        };
      },
    },
    MealDetail: {
      screen: MealDetailScreen,
      navigationOptions: navData => {
        const mealTitle = navData.navigation.getParam('title');
        const handleToggle = navData.navigation.getParam('handleToggle');
        const isFavourite = navData.navigation.getParam('isFavourite');

        return {
          title: mealTitle,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Favourite"
                iconName={isFavourite ? 'star' : 'star-outline'}
                // buttonStyle={{color: ''}}
                onPress={handleToggle}
              />
            </HeaderButtons>
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const FavNavigator = createStackNavigator(
  {
    Favourites: {
      screen: FavouritesScreen,
      navigationOptions: navData => {
        return {
          title: 'Your Favourites',
          headerLeft: () => defaultNavigationOptions(navData),
        };
      },
    },
    MealDetail: {
      screen: MealDetailScreen,
      navigationOptions: navData => {
        const mealTitle = navData.navigation.getParam('title');
        const handleToggle = navData.navigation.getParam('handleToggle');
        const isFavourite = navData.navigation.getParam('isFavourite');

        return {
          title: mealTitle,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Favourite"
                iconName={isFavourite ? 'star' : 'star-outline'}
                // buttonStyle={{color: ''}}
                onPress={handleToggle}
              />
            </HeaderButtons>
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{fontFamily: 'OpenSans-Bold'}}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{fontFamily: 'OpenSans-Bold'}}>Favourites</Text>
        ) : (
          'Favourites'
        ),
    },
  },
};

const tabScreenDefaultNavigation = ({navigation}) => ({
  tabBarIcon: ({focused, horizontal, tintColor}) => {
    const {routeName} = navigation.state;
    let IconComponent = Ionicons;
    let iconName;

    if (routeName === 'Meals') {
      iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
    } else if (routeName === 'Favourites') {
      iconName = focused ? 'ios-star' : 'ios-star-outline';
    }

    return <IconComponent name={iconName} size={25} color={tintColor} />;
  },
  // tabBarColor: '#fff',
  // tabBarBadge: true,
  // title: '',
});

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        defaultNavigationOptions: tabScreenDefaultNavigation,
        activeColor: Colors.primary,
        shifting: true,
        barStyle: {backgroundColor: 'hsl(0, 0%, 97%)'},
      })
    : createBottomTabNavigator(tabScreenConfig, {
        defaultNavigationOptions: tabScreenDefaultNavigation,
        tabBarOptions: {
          activeTintColor: Colors.accent,
          showLabel: false,
          labelStyle: {
            fontFamily: 'OpenSans-Bold',
          },
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
      navigationOptions: navigationData => {
        return {
          title: 'Filter Meals',
          headerLeft: () => defaultNavigationOptions(navigationData),
          headerRight: navData => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="ios-save"
                onPress={navigationData.navigation.getParam('save')}
              />
            </HeaderButtons>
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigator,
  },
  {
    drawerType: 'front',
    drawerPosition: 'left',
    drawerWidth: () => {
      return Dimensions.get('screen').width / 1.5;
    },
    contentOptions: {
      activeTintColor: Colors.accent,
      labelStyle: {fontFamily: 'OpenSans-Regular'},
    },
  },
);

export default createAppContainer(MainNavigator);
