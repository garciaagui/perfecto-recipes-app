import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Categories({ categories }) {
  return (
    <section>
      {categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          type="button"
        >
          {strCategory}
        </button>
      ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  categories: state.renderCategories.categories,
});

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Categories);
