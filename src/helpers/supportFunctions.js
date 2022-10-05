export function getDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const TEN = 10;

  const formattedDay = day < TEN ? `0${day}` : day;
  const formattedMonth = month < TEN ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function setNewDoneRecipe(pathname, recipeDetails, saveFunc) {
  const verifyPathname = pathname.includes('meals');
  const verifyTagValue = !Array.isArray(recipeDetails.strTags)
    ? [recipeDetails.strTags] : recipeDetails.strTags;

  const newDoneRecipe = {
    id: verifyPathname ? recipeDetails.idMeal : recipeDetails.idDrink,
    type: verifyPathname ? 'meal' : 'drink',
    nationality: verifyPathname ? recipeDetails.strArea : '',
    category: recipeDetails.strCategory,
    alcoholicOrNot: verifyPathname ? '' : recipeDetails.strAlcoholic,
    name: verifyPathname ? recipeDetails.strMeal : recipeDetails.strDrink,
    image: verifyPathname ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumbm,
    doneDate: getDate(),
    tags: verifyPathname ? verifyTagValue : [],
  };

  saveFunc(newDoneRecipe);
}
