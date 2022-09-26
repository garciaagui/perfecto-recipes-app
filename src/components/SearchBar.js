import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterSearchBar } from '../redux/actions/SearchBarFilter';

function SearchBar({ history, dispatch, recipes }) { // ao usar a funçao 'connect' que conecta o componente no redux ele adiciona nas props o dispatch
  const [searchData, setSearchData] = useState({
    searchInput: '',
    searchFilter: '',
  });

  useEffect(() => {
    if (recipes !== false) {
      const { location: { pathname } } = history;
      if (recipes.meals !== null && pathname === '/meals' && recipes.meals.length === 1) {
        history.push(`${pathname}/${recipes.meals[0].idMeal}`);
      }
      if (recipes.drinks !== null && pathname === '/drinks'
      && recipes.drinks.length === 1) {
        history.push(`${pathname}/${recipes.drinks[0].idDrink}`);
      }
    }
  }, [recipes]);

  const handleChange = ({ target: { name, value } }) => {
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleRadioChange = ({ target: { name, id } }) => {
    setSearchData({
      ...searchData,
      [name]: id,
    });
  };

  const handleSearchClick = () => {
    const { location: { pathname } } = history;
    dispatch(filterSearchBar(searchData, pathname));
  };

  return (
    <section>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search"
        name="searchInput"
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            name="searchFilter"
            type="radio"
            id="ingredient"
            onChange={ handleRadioChange }
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            data-testid="name-search-radio"
            name="searchFilter"
            type="radio"
            id="name-search"
            onChange={ handleRadioChange }
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            data-testid="first-letter-search-radio"
            name="searchFilter"
            type="radio"
            id="first-letter-search"
            onChange={ handleRadioChange }
          />
          First Letter
        </label>
      </div>
      <button
        onClick={ handleSearchClick }
        data-testid="exec-search-btn"
        type="button"
      >
        Search
      </button>
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.renderRecipes.recipes,
});

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape().isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipes: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(SearchBar);
