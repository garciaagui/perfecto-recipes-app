export default function getEmailLocalStorage() {
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

export function getfavoriteRecipes() {
  const data = localStorage.getItem('favoriteRecipes');
  if (data === null) {
    return [];
  }
  const retorno = JSON.parse(data);
  return retorno;
}

export function setfavoriteRecipes(favorites) {
  const data = JSON.stringify(favorites);
  localStorage.setItem('favoriteRecipes', data);
}
