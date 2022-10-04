import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmailLocalStorage, clearLocalStorage } from '../helpers/localStorage';
import '../styles/profile.css';

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
      <main className="main-container-profile">
        <h4>E-mail</h4>
        <h3
          data-testid="profile-email"
        >
          { user.email }
        </h3>
        <section className="container-btns">
          <button
            type="button"
            className="btn btn-dark"
            data-testid="profile-done-btn"
            onClick={ pushDoneRecipes }
          >
            Done Recipes
          </button>
          <button
            type="button"
            className="btn btn-dark"
            data-testid="profile-favorite-btn"
            onClick={ pushFavoriteRecipes }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            className="btn btn-danger profile-logout-btn"
            data-testid="profile-logout-btn"
            onClick={ pushLogout }
          >
            Logout
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
