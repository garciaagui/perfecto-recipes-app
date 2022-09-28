import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filterByCategory from '../redux/actions/filterByCategory';
import getFirstRecipes from '../redux/actions/getFirstRecipes';

function Categories({ dispatch, history, categories, selectedCategory }) {
  const { location: { pathname } } = history;

  return (
    <section>
      {categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          type="button"
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
        onClick={ () => { dispatch(getFirstRecipes(pathname)); } }
      >
        All

      </button>
    </section>
  );
}

const mapStateToProps = (state) => ({
  categories: state.mainReducer.categories,
  selectedCategory: state.mainReducer.selectedCategory,
});

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Categories);
