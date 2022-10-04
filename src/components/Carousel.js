import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Carousel({ history, recommendedRecipes }) {
  const { location: { pathname } } = history;
  const id = (pathname.includes('meals')) ? 'idDrink' : 'idMeal';
  const str = (pathname.includes('meals')) ? 'strDrink' : 'strMeal';
  const strThumb = (pathname.includes('meals')) ? 'strDrinkThumb' : 'strMealThumb';

  return (
    <div className="carousel">
      { recommendedRecipes.map((recipe, index) => (
        <Card
          key={ recipe[id] }
          data-testid={ `${index}-recommendation-card` }
          style={ { minWidth: '175px', display: 'flex', justifyContent: 'center' } }
        >
          <Card.Img
            variant="top"
            src={ recipe[strThumb] }
            style={ { marginBottom: '18px' } }
          />
          <Card.Title
            data-testid={ `${index}-recommendation-title` }
            style={ { width: '100%', textAlign: 'center' } }
          >
            { recipe[str] }
          </Card.Title>
        </Card>
      )) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recommendedRecipes: state.mainReducer.recommendedRecipes,
});

Carousel.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  recommendedRecipes: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

export default connect(mapStateToProps)(Carousel);
