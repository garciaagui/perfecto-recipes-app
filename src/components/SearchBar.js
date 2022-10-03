import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filterSearchBar from '../redux/actions/filterSearchBar';
import '../styles/searchbar.css';

function SearchBar({ history, dispatch, recipes, selectedCategory }) {
  const { location: { pathname } } = history;
  const [searchData, setSearchData] = useState({
    searchInput: '',
    searchFilter: '',
  });

  useEffect(() => {
    const id = (pathname === '/meals') ? 'idMeal' : 'idDrink';
    if (!selectedCategory.length && recipes.length === 1) {
      history.push(`${pathname}/${recipes[0][id]}`);
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
    dispatch(filterSearchBar(searchData, pathname));
  };

  return (
    <section className="container-search-bar">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search"
        name="searchInput"
        className="form-control form-control-sm"
        onChange={ handleChange }
      />
      <div className="container-radio-btns">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            name="searchFilter"
            type="radio"
            id="ingredient"
            className="form-check-input"
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
            className="form-check-input"
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
            className="form-check-input"
            onChange={ handleRadioChange }
          />
          First Letter
        </label>
      </div>
      <button
        onClick={ handleSearchClick }
        data-testid="exec-search-btn"
        className="btn btn-primary btn-sm"
        type="button"
      >
        Search
      </button>
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.mainReducer.recipes,
  selectedCategory: state.mainReducer.selectedCategory,
});

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SearchBar);
