import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filterByCategory from '../redux/actions/filterByCategory';
import getFirstRecipes from '../redux/actions/getFirstRecipes';

function Categories({ dispatch, history, categories }) {
  const { location: { pathname } } = history;

  return (
    <section>
      {categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          onClick={ () => { dispatch(filterByCategory(pathname, strCategory)); } }
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
});

Categories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Categories);
