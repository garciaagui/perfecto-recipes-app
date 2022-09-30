import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Carousel({ history, recommendedRecipes }) {
  const { location: { pathname } } = history;
  // const type = (pathname.includes('meals')) ? 'drinks' : 'meals';
  const id = (pathname.includes('meals')) ? 'idDrink' : 'idMeal';
  const str = (pathname.includes('meals')) ? 'strDrink' : 'strMeal';
  const strThumb = (pathname.includes('meals')) ? 'strDrinkThumb' : 'strMealThumb';

  return (
    <div
      style={ { height: '225px',
        width: '360px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        overflowX: 'scroll' } }
    >
      { recommendedRecipes.map((recipe, index) => (
        <Card
          key={ recipe[id] }
          data-testid={ `${index}-recommendation-card` }
          style={ { minWidth: '190px' } }
        >
          <Card.Img
            variant="top"
            src={ recipe[strThumb] }
            style={ { width: 'auto' } }
          />
          <Card.Title
            data-testid={ `${index}-recommendation-title` }
            style={ { width: 'auto' } }
          >
            { recipe[str] }
          </Card.Title>
        </Card>
      )) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.renderRecipeDetails.recipeDetails,
  recommendedRecipes: state.mainReducer.recommendedRecipes,
});

Carousel.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape().isRequired,
  }).isRequired,
  recommendedRecipes: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

export default connect(mapStateToProps)(Carousel);
