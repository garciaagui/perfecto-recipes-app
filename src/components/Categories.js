import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filterByCategory from '../redux/actions/filterByCategory';
import getFirstRecipes from '../redux/actions/getFirstRecipes';
import '../styles/categories.css';

function Categories({ dispatch, history, categories, selectedCategory }) {
  const { location: { pathname } } = history;
  const [isCategoriesOn, setIsCategoriesOn] = useState(true);

  return (
    <section className="container-categories">
      {isCategoriesOn
        ? (
          <section>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={ () => { setIsCategoriesOn(!isCategoriesOn); } }
            >
              Hide Categories
            </button>
            {categories.map(({ strCategory }, index) => (
              <button
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={ () => {
                  if (selectedCategory !== strCategory) {
                    dispatch(filterByCategory(pathname, strCategory));
                  } else dispatch(getFirstRecipes(pathname));
                } }
              >
                {strCategory}
              </button>
            ))}
            <button
              type="button"
              data-testid="All-category-filter"
              className="btn btn-outline-secondary btn-sm"
              onClick={ () => { dispatch(getFirstRecipes(pathname)); } }
            >
              All
            </button>
          </section>
        ) : (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={ () => { setIsCategoriesOn(!isCategoriesOn); } }
          >
            Show Categories
          </button>
        ) }

    </section>
  );
}

const mapStateToProps = (state) => ({
  categories: state.mainReducer.categories,
  selectedCategory: state.mainReducer.selectedCategory,
});

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      strCategory: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Categories);
