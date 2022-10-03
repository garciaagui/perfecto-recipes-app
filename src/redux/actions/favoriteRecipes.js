import { SET_RECIPE_FAVORITE } from './types';

export default function setRecipesFavorite(payload) {
  return {
    type: SET_RECIPE_FAVORITE,
    payload,
  };
}
