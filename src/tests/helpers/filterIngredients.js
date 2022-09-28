export function filterIngredients(recipeDetails) {
  const toSliceFilterNum = 13;
  if (recipeDetails.drinks) {
    return Object.entries(recipeDetails.drinks[0])
      .filter((e) => e[0].slice(0, toSliceFilterNum) === 'strIngredient' && e[1])
      .map((e) => e[1]);
  } return Object.entries(recipeDetails.meals[0])
    .filter((e) => e[0].slice(0, toSliceFilterNum) === 'strIngredient' && e[1])
    .map((e) => e[1]);
}

export function filterIngredientsQuantity(recipeDetails) {
  const toSliceFilterNum = 10;
  if (recipeDetails.drinks) {
    return Object.entries(recipeDetails.drinks[0])
      .filter((e) => e[0].slice(0, toSliceFilterNum) === 'strMeasure' && e[1])
      .map((e) => e[1]);
  } return Object.entries(recipeDetails.meals[0])
    .filter((e) => e[0].slice(0, toSliceFilterNum) === 'strMeasure' && e[1])
    .map((e) => e[1]);
}
