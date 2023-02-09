import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BtnFavorite from '../components/BtnFavorite';
import ButtonShare from '../components/ButtonShare';
import getRecipeDetails from '../redux/actions/getRecipeDetails';
import { setInProgressRecipesLocalStorage,
  updateInProgressRecipesLocalStorage,
  checkCheckedIngredients,
  setDoneRecipesLocalStorage } from '../helpers/localStorage';
import '../styles/recipeinprogress.css';
import { setNewDoneRecipe } from '../helpers/supportFunctions';

function RecipeInProgress({ history, dispatch,
  recipeDetails, ingredientsList, ingredientsQuantity }) {
  const { location: { pathname } } = history;
  const { idReceita } = useParams();

  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const str = (pathname.includes('meals')) ? 'strMeal' : 'strDrink';
  const strThumb = (pathname.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';

  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    if (!Object.keys(recipeDetails).length) {
      dispatch(getRecipeDetails(pathname, idReceita));
    }
    setInProgressRecipesLocalStorage(idReceita, type);
    setCheckedIngredients(ingredientsList
      .reduce((acc, _, index) => {
        acc.push(checkCheckedIngredients(idReceita, type, index));
        return acc;
      }, []));
  }, [recipeDetails]);

  const handleCheckChange = (index) => {
    const newArr = checkedIngredients.reduce((acc, curr, i) => {
      if (i === index) {
        acc.push(!curr);
        updateInProgressRecipesLocalStorage(idReceita, type, index, !curr);
      } else acc.push(curr);
      return acc;
    }, []);
    setCheckedIngredients(newArr);
  };

  function renderIngredientsMap(ingredient, index) {
    return (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ `${index}${ingredient}` }
      >
        <label
          htmlFor={ `${index}-ingredient-step` }
          data-testid={ `${index}-ingredient-step` }
          className={ checkedIngredients[index]
            ? 'checked-ingredient' : 'unchecked-ingredient' }
        >
          <input
            type="checkbox"
            id={ `${index}-ingredient-step` }
            defaultChecked={ checkedIngredients[index] }
            onClick={ () => { handleCheckChange(index); } }
          />
          <span>
            {`${ingredient} - ${ingredientsQuantity[index]}`}
          </span>
        </label>
      </li>
    );
  }

  return (
    <section className="main-container-in-progress">
      <h2>Recipe In Progress</h2>
      <h1 data-testid="recipe-title">{recipeDetails[str]}</h1>
      <h4 data-testid="recipe-category">
        {type === 'meals'
          ? `Category: ${recipeDetails.strCategory}` : recipeDetails.strAlcoholic}
      </h4>
      <img
        src={ recipeDetails[strThumb] }
        alt={ recipeDetails[str] }
        data-testid="recipe-photo"
      />
      <h3>Ingredients</h3>
      <ul>
        { ingredientsList
          .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {recipeDetails.strInstructions}
      </p>
      <div className="useful-btns">
        <BtnFavorite history={ history } />
        <ButtonShare
          type={ recipeDetails.type }
          id={ idReceita }
          history={ history }
          dataTestId="share-btn"
        />
      </div>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn btn-primary"
        disabled={ !checkedIngredients.every((e) => e === true) }
        onClick={ () => {
          setNewDoneRecipe(pathname, recipeDetails, setDoneRecipesLocalStorage);
          history.push('/done-recipes');
        } }
      >
        Finalizar
      </button>
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.detailsReducer.recipeDetails,
  ingredientsList: state.detailsReducer.ingredientsList,
  ingredientsQuantity: state.detailsReducer.ingredientsQuantity,
});

RecipeInProgress.propTypes = {
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

export default connect(mapStateToProps)(RecipeInProgress);
