import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterSearchBar } from '../redux/actions/SearchBarFilter';

function SearchBar({ dispatch }) { // ao usar a funçao 'connect' que conecta o componente no redux ele adiciona nas props o dispatch
  const [searchData, setSearchData] = useState({
    searchInput: '',
    searchFilter: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleRadioChange = ({ target: { name, id } }) => {
    console.log(id);
    setSearchData({
      ...searchData,
      [name]: id,
    });
  };

  const handleSearchClick = () => {
    dispatch(filterSearchBar(searchData));
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

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SearchBar);
