import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFavoriteRecipesLocalStorage,
  setFavoriteRecipesLocalStorage } from '../helpers/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import setRecipesFavorite from '../redux/actions/favoriteRecipes';

function BtnDesfavorite({ recipe, index, dispatch }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // function checkFavorite()
  //   const local = getFavoriteRecipesLocalStorage();
  //   const exis = local.some((receita) => receita.id === id);
  //   setIsFavorite(exis);
  // }

  useEffect(() => {
    const local = getFavoriteRecipesLocalStorage();
    const exis = local.some((receita) => receita.id === recipe.id);
    setIsFavorite(exis);
  }, [recipe]);

  function setFavoriteRecipe() {
    const local = getFavoriteRecipesLocalStorage();
    const exist = local.some((receita) => receita.id === recipe.id);
    if (exist === false) {
      local.push(recipe);
      setFavoriteRecipesLocalStorage(local);
      setIsFavorite(true);
    } else {
      const localFilter = local.filter((iten) => iten.id !== recipe.id);
      setFavoriteRecipesLocalStorage(localFilter);
      setIsFavorite(false);
      dispatch(setRecipesFavorite(localFilter));
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
        data-testid={ `${index}-horizontal-favorite-btn` }
        alt="icone favorite"
      />
    </button>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.detailsReducer.recipeDetails,
});

BtnDesfavorite.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps)(BtnDesfavorite);
