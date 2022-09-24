import React from 'react';

function Login() {
  return (
    <form>
      <h2>Login</h2>
      <label htmlFor="email-input">
        <input
          type="email"
          id="email-input"
          placeholder="E-mail"
          data-testid="email-input"
          // value={  }
          // onChange={  }
        />
      </label>

      <label htmlFor="password-input">
        <input
          type="password"
          id="password-input"
          placeholder="Senha"
          data-testid="password-input"
          // value={  }
          // onChange={  }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        // disabled={  }
        // onClick={  }
      >
        Enter
      </button>

    </form>
  );
}

export default Login;
