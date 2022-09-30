import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFavoriteRecipesLocalStorage,
  setFavoriteRecipesLocalStorage } from '../helpers/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function BtnFavorite({ history, recipeDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const verifyPathname = history.location.pathname.includes('meals');

  // Declaração das constantes que serão utilizadas no momento de salvar a receita no Local Storage
  const id = verifyPathname ? recipeDetails.idMeal : recipeDetails.idDrink;
  const type = verifyPathname ? 'meal' : 'drink';
  const nationality = verifyPathname ? recipeDetails.strArea : '';
  const category = recipeDetails.strCategory;
  const alcoholicOrNot = verifyPathname ? '' : recipeDetails.strAlcoholic;
  const name = verifyPathname ? recipeDetails.strMeal : recipeDetails.strDrink;
  const image = verifyPathname ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb;

  // function checkFavorite() {
  //   const local = getFavoriteRecipesLocalStorage();
  //   const exis = local.some((receita) => receita.id === id);
  //   setIsFavorite(exis);
  // }

  useEffect(() => {
    const local = getFavoriteRecipesLocalStorage();
    const exis = local.some((receita) => receita.id === id);
    setIsFavorite(exis);
  }, [recipeDetails]);

  function setFavoriteRecipe() {
    const recipe = { id, type, nationality, category, alcoholicOrNot, name, image };
    const local = getFavoriteRecipesLocalStorage();
    const exist = local.some((receita) => receita.id === id);
    if (exist === false) {
      local.push(recipe);
      setFavoriteRecipesLocalStorage(local);
      setIsFavorite(true);
    } else {
      const localFilter = local.filter((iten) => iten.id !== id);
      setFavoriteRecipesLocalStorage(localFilter);
      setIsFavorite(false);
    }
  }

  return (
    <button
      alt="icone favorite"
      type="button"
      onClick={ () => { setFavoriteRecipe(); } }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt="icone favorite"
      />
    </button>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.detailsReducer.recipeDetails,
});

BtnFavorite.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  recipeDetails: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(BtnFavorite);
