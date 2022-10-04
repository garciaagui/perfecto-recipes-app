import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';
import '../styles/donerecipes.css';

function DoneRecipes({ history }) {
  const [doneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  const [recipeToRender, setRecipeToRender] = useState([]);

  useEffect(() => {
    if (recipeToRender !== null && recipeToRender.length === 0) {
      setRecipeToRender(doneRecipes);
    }
  }, [recipeToRender]);

  function handleClickFilter({ target }) {
    if (target.name === 'reset') {
      setRecipeToRender(doneRecipes);
      return;
    }
    setRecipeToRender(
      doneRecipes.filter((recipe) => recipe.type === target.name),
    );
  }

  return (
    <main>
      <Header history={ history } />
      <section className="main-container-done">
        <section className="container-btns">
          <button
            onClick={ handleClickFilter }
            data-testid="filter-by-all-btn"
            type="button"
            name="reset"
            className="btn btn-outline-secondary"
          >
            All
          </button>
          <button
            onClick={ handleClickFilter }
            data-testid="filter-by-meal-btn"
            type="button"
            name="meal"
            className="btn btn-outline-secondary"
          >
            Meals
          </button>
          <button
            onClick={ handleClickFilter }
            data-testid="filter-by-drink-btn"
            type="button"
            name="drink"
            className="btn btn-outline-secondary"
          >
            Drinks
          </button>
        </section>
        <section>
          { (recipeToRender !== null && recipeToRender.length > 0) ? (
            recipeToRender.map((recipe, index) => (
              <DoneRecipeCard
                history={ history }
                key={ recipe.id }
                recipe={ recipe }
                index={ index }
              />
            ))
          ) : (
            <span>No done recipes found</span>
          )}
        </section>
      </section>
    </main>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
