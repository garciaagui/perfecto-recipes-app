export function saveLoginInfoLocalStorage(email) {
  localStorage.setItem('user', JSON.stringify({ email }));
  localStorage.setItem('mealsToken', JSON.stringify(1));
  localStorage.setItem('drinksToken', JSON.stringify(1));
}

export function getEmailLocalStorage() {
  const data = localStorage.getItem('user');
  if (data === null) {
    return { email: 'faça login' };
  }
  const retorno = JSON.parse(data);
  return retorno;
}

export function clearLocalStorage() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('drinksToken');
  localStorage.removeItem('doneRecipes');
  localStorage.removeItem('favoriteRecipes');
  localStorage.removeItem('inProgressRecipes');
  localStorage.removeItem('mealsToken');
}

export function checkDoneRecipesLocalStorage(recipeId) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipes) return false;
  return doneRecipes.some((recipe) => recipe.id === recipeId);
}

export function checkInProgressRecipesLocalStorage(recipeId, recipeType) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes || inProgressRecipes === undefined) return false;

  const keys = Object.keys(inProgressRecipes[recipeType]);
  return keys.some((key) => key === recipeId);
}

export function setInProgressRecipesLocalStorage(recipeId, recipeType) {
  if (checkInProgressRecipesLocalStorage(recipeId, recipeType) === false) {
    if (JSON.parse(localStorage.getItem('inProgressRecipes') === null)) {
      const inProgressRecipes = {
        drinks: {},
        meals: {},
      };
      inProgressRecipes[recipeType][recipeId] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes[recipeType][recipeId] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }
}

export function updateInProgressRecipesLocalStorage(id, type, index, isChecked) {
  console.log(index, isChecked);
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgressRecipes[type][id]);
  if (isChecked) {
    inProgressRecipes[type][id].push(index);
  } else {
    inProgressRecipes[type][id]
      .splice(inProgressRecipes[type][id].indexOf(index), 1);
    // inProgressRecipes[type][id].filter((el) => el === index);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

export function checkCheckedIngredients(recipeId, recipeType, index) {
  const currInProgressRecipe = JSON
    .parse(localStorage.getItem('inProgressRecipes'))[recipeType][recipeId];
  if (currInProgressRecipe === undefined) return false;
  return currInProgressRecipe.some((ingredient) => ingredient === index);
}

export function getFavoriteRecipesLocalStorage() {
  const data = localStorage.getItem('favoriteRecipes');
  if (data === null) {
    return [];
  }
  const retorno = JSON.parse(data);
  return retorno;
}

export function setFavoriteRecipesLocalStorage(favorites) {
  const data = JSON.stringify(favorites);
  localStorage.setItem('favoriteRecipes', data);
}
