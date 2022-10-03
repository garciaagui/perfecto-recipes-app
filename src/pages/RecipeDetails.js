import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import BtnFavorite from '../components/BtnFavorite';
import getRecipeDetails from '../redux/actions/getRecipeDetails';
import getRecommendedRecipes from '../redux/actions/getRecommendedRecipes';
import { checkDoneRecipesLocalStorage,
  checkInProgressRecipesLocalStorage } from '../helpers/localStorage';
import ButtonShare from '../components/ButtonShare';

function RecipeDetails({ history, dispatch,
  recipeDetails, ingredientsList, ingredientsQuantity }) {
  const { location: { pathname } } = history;
  const { idReceita } = useParams();
  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const id = (pathname.includes('meals')) ? 'idMeal' : 'idDrink';
  const str = (pathname.includes('meals')) ? 'strMeal' : 'strDrink';
  const strThumb = (pathname.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const buttonType = (pathname.includes('meals')) ? 'meal' : 'drink';
  const { idReceita } = useParams();
  console.log(idReceita);

  useEffect(() => {
    dispatch(getRecipeDetails(pathname, idReceita));
    dispatch(getRecommendedRecipes(pathname));
  }, []);

  function renderIngredientsMap(ingredient, index) {
    return (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ `${index}${ingredient}` }
      >
        {`${ingredient} - ${ingredientsQuantity[index]}`}
      </li>
    );
  }

  return (
    <section>
      <div>
        <h1 data-testid="recipe-title">{recipeDetails[str]}</h1>
        <h3 data-testid="recipe-category">
          {type === 'meals' ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
        </h3>
        <img
          src={ recipeDetails[strThumb] }
          alt={ recipeDetails[str] }
          data-testid="recipe-photo"
          style={ { height: '360px', width: '360px' } }
        />
        <ul>
          { ingredientsList
            .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
        </ul>
        <p data-testid="instructions">
          {recipeDetails.strInstructions}
        </p>
        { type === 'meals'
          ? (
            <video data-testid="video" width="320" height="240" controls>
              <source src={ recipeDetails.strYoutube } type="video/webm" />
              <track default kind="captions" srcLang="en" src="" />
              Your browser does not support the video tag.
            </video>
          )
          : null}
      </div>
      <Carousel history={ history } />
      <div className="useful-btns">
        <ButtonShare
          history={ history }
          dataTestId="share-btn"
          type={ buttonType }
          id={ idReceita }
        />
        <BtnFavorite history={ history } />
      </div>
      { checkDoneRecipesLocalStorage(recipeDetails[id])
        ? null
        : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-recipe-btn"
            onClick={
              () => history
                .push(`${pathname}/in-progress`)
            }
          >
            {checkInProgressRecipesLocalStorage(recipeDetails[id], type)
              ? 'Continue Recipe'
              : 'Start Recipe'}
          </button>
        )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.detailsReducer.recipeDetails,
  ingredientsList: state.detailsReducer.ingredientsList,
  ingredientsQuantity: state.detailsReducer.ingredientsQuantity,
});

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipeDetails: PropTypes.shape().isRequired,
  ingredientsList: PropTypes
    .arrayOf(PropTypes.string.isRequired).isRequired,
  ingredientsQuantity: PropTypes
    .arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(RecipeDetails);
