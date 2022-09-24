import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useValidateLoginBtn from '../hooks/useValidateLoginBtn';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);

  useValidateLoginBtn(email, password, setIsLoginBtnDisabled);

  const handleSubmit = () => {
    const { history } = props;

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
    history.push('/meals');
  };

  return (
    <form>
      <h2>Login</h2>
      <label htmlFor="email-input">
        <input
          type="email"
          id="email-input"
          placeholder="E-mail"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => { setEmail(target.value); } }
        />
      </label>

      <label htmlFor="password-input">
        <input
          type="password"
          id="password-input"
          placeholder="Senha"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => { setPassword(target.value); } }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isLoginBtnDisabled }
        onClick={ handleSubmit }
      >
        Entrar
      </button>

    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
