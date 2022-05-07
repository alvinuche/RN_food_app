import {TOGGLE_FAVOURITE} from './constants';
import {SET_FILTERS} from './constants';

export const toggleFavourite = id => {
  return {type: TOGGLE_FAVOURITE, payload: id};
};

export const setFilters = filterSettings => {
  return {type: SET_FILTERS, payload: filterSettings};
};
