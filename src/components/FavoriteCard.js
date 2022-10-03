import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import BtnDesfavorite from './BtnDesfavorite';

function FavoriteCard({ recipe, index }) {
  if (recipe.type === 'meal') {
    return (
      <div>
        <Link to={ `/meals/${recipe.id}` }>
          <img
            width={ 250 }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </Link>
        <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </h3>
        <button
          type="button"
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareButton }
            alt="Share Button"
          />
        </button>
        <BtnDesfavorite
          recipe={ recipe }
          index={ index }
        />
      </div>
    );
  } return (
    <div>
      <Link to={ `/drinks/${recipe.id}` }>
        <img
          width={ 250 }
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
      <h3 data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</h3>
      <h4 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h4>
      <button
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareButton }
          alt="Share Button"
        />
      </button>
      <BtnDesfavorite
        recipe={ recipe }
        index={ index }
      />
    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.any,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string,
  }),
}.isRequired;

export default FavoriteCard;
