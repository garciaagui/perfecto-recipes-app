import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (doneRecipes !== null && doneRecipes.length === 0) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      /* setDoneRecipes([{
        id: 'id-da-receita',
        type: 'meal-ou-drink',
        nationality: 'nacionalidade-da-receita-ou-texto-vazio',
        category: 'categoria-da-receita-ou-texto-vazio',
        alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
        name: 'nome-da-receita',
        image: 'imagem-da-receita',
        doneDate: 'quando-a-receita-foi-concluida',
        tags: ['tag1', 'tag2'],
      }]); */
    }
  });

  const doneRecipesValid = doneRecipes !== null && doneRecipes.length > 0;

  return (
    <main>
      <Header history={ history } />
      <section>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-meal-btn" type="button">Meals</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>
      <section>
        { doneRecipesValid ? (
          doneRecipes.map((recipe, index) => (
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
