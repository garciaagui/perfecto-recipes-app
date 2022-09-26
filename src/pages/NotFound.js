import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function NotFound({ history }) {
  return (
    <div>
      <Header history={ history } />
      NotFound
    </div>
  );
}

NotFound.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default NotFound;
