import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonShare from './ButtonShare';

function DoneRecipeCard({ history, recipe, index }) {
  if (recipe.type === 'meal') {
    return (
      <div className="done-card">
        <Link to={ `/meals/${recipe.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          {`Done: ${recipe.doneDate}`}
        </h3>
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </h4>
        { recipe.tags.map((tag) => (
          <h4 data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</h4>
        )) }
        <section className="useful-btns">
          <ButtonShare
            type={ recipe.type }
            id={ recipe.id }
            history={ history }
            index={ index }
            dataTestId="-horizontal-share-btn"
          />
        </section>
      </div>
    );
  } return (
    <div className="done-card">
      <Link to={ `/drinks/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
        <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
      </Link>
      <h3 data-testid={ `${index}-horizontal-done-date` }>
        {`Done: ${recipe.doneDate}`}
      </h3>
      <h4 data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</h4>
      { recipe.tags.map((tag) => (
        <h4 data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</h4>
      )) }
      <section className="useful-btns">
        <ButtonShare
          type={ recipe.type }
          id={ recipe.id }
          history={ history }
          index={ index }
          dataTestId="-horizontal-share-btn"
        />
      </section>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default DoneRecipeCard;
