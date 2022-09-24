import React, { useState } from 'react';
import useValidateLoginBtn from '../hooks/useValidateLoginBtn';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);

  useValidateLoginBtn(email, password, setIsLoginBtnDisabled);

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
        // onClick={  }
      >
        Enter
      </button>

    </form>
  );
}

export default Login;
