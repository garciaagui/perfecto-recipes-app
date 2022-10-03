import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useValidateLoginBtn from '../hooks/useValidateLoginBtn';
import { saveLoginInfoLocalStorage } from '../helpers/localStorage';
import logotipo from '../images/logotipo-complete.png';
import '../styles/login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);

  useValidateLoginBtn(email, password, setIsLoginBtnDisabled);

  const handleSubmit = () => {
    const { history } = props;
    saveLoginInfoLocalStorage(email);
    history.push('/meals');
  };

  return (
    <form>
      <h2>Login</h2>
      <img src={ logotipo } alt="logotipo" />
      <section className="container-input">
        <label htmlFor="email-input">
          <input
            type="email"
            id="email-input"
            placeholder="E-mail"
            data-testid="email-input"
            className="form-control"
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
            className="form-control"
            value={ password }
            onChange={ ({ target }) => { setPassword(target.value); } }
          />
        </label>
      </section>
      <button
        type="submit"
        data-testid="login-submit-btn"
        className="btn btn-primary btn-lg"
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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
