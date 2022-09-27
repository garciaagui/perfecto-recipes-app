import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getEmailLocalStorage, { clearLocalStorage } from '../tests/helpers/localStorage';

function Profile({ history }) {
  const [user, setUser] = useState({ email: 'seu email' });
  useEffect(() => {
    const email = getEmailLocalStorage();
    setUser(email);
  }, []);

  function pushDoneRecipes() {
    history.push('/done-recipes');
  }

  function pushFavoriteRecipes() {
    history.push('/favorite-recipes');
  }

  function pushLogout() {
    clearLocalStorage();
    history.push('/');
  }

  return (
    <div>
      <Header history={ history } />
      <main>
        <h3
          data-testid="profile-email"
        >
          { user.email }
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ pushDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ pushFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ pushLogout }
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
