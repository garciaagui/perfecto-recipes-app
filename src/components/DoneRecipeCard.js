import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';

function DoneRecipeCard({ recipe, index }) {
  const [copied, setCopied] = useState(false);

  const handleClickShare = async () => {
    const url = (recipe.type === 'meal') ? `meals/${recipe.id}` : `drinks/${recipe.id}`;
    await navigator.clipboard.writeText(`http://localhost:3000/${url}`);
    setCopied(true);
  };

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
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </h3>
        <h4 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h4>
        { recipe.tags.map((tag) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</p>
        )) }
        <button
          type="button"
          onClick={ handleClickShare }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareButton }
            alt="Share Button"
          />
        </button>
        { copied && <span>Link copied!</span> }
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
        <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</h3>
      <h4 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h4>
      { recipe.tags.map((tag) => (
        <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</p>
      )) }
      <button
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareButton }
          alt="Share Button"
        />
      </button>
      { copied && <span>Link copied!</span> }
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
