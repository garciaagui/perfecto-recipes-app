import React from 'react';

function SearchBar() {
  return (
    <section>
      <input data-testid="search-input" type="text" placeholder="Search" />
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            name="search_filter"
            type="radio"
            id="ingredient"
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            data-testid="name-search-radio"
            name="search_filter"
            type="radio"
            id="name-search"
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            data-testid="first-letter-search-radio"
            name="search_filter"
            type="radio"
            id="first-letter-search"
          />
          First Letter
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
