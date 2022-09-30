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

export function checkDoneRecipes(recipeId) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipes) return false;
  return doneRecipes.some((recipe) => recipe.id === recipeId);
}

export function checkInProgresRecipes(recipeId, recipeType) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) return false;

  const keys = Object.keys(inProgressRecipes[recipeType]);
  return keys.some((key) => key === recipeId);
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
