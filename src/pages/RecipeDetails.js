import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mountRecipeDetailsAPI } from '../redux/actions/RecipesDetailsAPI';

function RecipeDetails({ history, dispatch }) {
  useEffect(() => {
    dispatch(mountRecipeDetailsAPI(history));
  });

  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape().isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(RecipeDetails);
