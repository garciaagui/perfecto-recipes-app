import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BtnDesfavorite from './BtnDesfavorite';
import ButtonShare from './ButtonShare';

function FavoriteCard({ recipe, index, history }) {
  if (recipe.type === 'meal') {
    return (
      <div className="favorite-card">
        <Link to={ `/meals/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </h3>
        <section className="useful-btns">
          <BtnDesfavorite
            recipe={ recipe }
            index={ index }
          />
          <ButtonShare
            id={ recipe.id }
            index={ index }
            history={ history }
            type={ recipe.type }
            dataTestId="-horizontal-share-btn"
          />
        </section>
      </div>
    );
  } return (
    <div className="favorite-card">
      <Link to={ `/drinks/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</h3>
      <section className="useful-btns">
        <BtnDesfavorite
          recipe={ recipe }
          index={ index }
        />
        <ButtonShare
          id={ recipe.id }
          index={ index }
          history={ history }
          type={ recipe.type }
          dataTestId="-horizontal-share-btn"
        />
      </section>
    </div>
  );
}

FavoriteCard.propTypes = {
  history: PropTypes.func,
  index: PropTypes.any,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
  }),
}.isRequired;

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
