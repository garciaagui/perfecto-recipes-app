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
}
