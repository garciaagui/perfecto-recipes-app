import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes({ history }) {
  const [doneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  const [recipeToRender, setRecipeToRender] = useState([]);

  useEffect(() => {
    if (recipeToRender !== null && recipeToRender.length === 0) {
      setRecipeToRender(doneRecipes);
    }
  });

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
      <section>
        <button
          onClick={ handleClickFilter }
          data-testid="filter-by-all-btn"
          type="button"
          name="reset"
        >
          All
        </button>
        <button
          onClick={ handleClickFilter }
          data-testid="filter-by-meal-btn"
          type="button"
          name="meal"
        >
          Meals
        </button>
        <button
          onClick={ handleClickFilter }
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
        >
          Drinks
        </button>
      </section>
      <section>
        { (recipeToRender !== null && recipeToRender.length > 0) ? (
          recipeToRender.map((recipe, index) => (
            <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
          ))
        ) : (
          <h1>Nao tem receitas prontas</h1>
        )}
      </section>
    </main>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
