import { useEffect } from 'react';

function useValidateLoginBtn(emailState, passwordState, setIsDisableState) {
  useEffect(() => {
    const PASSWORD_CHARACTER_LIMIT = 6;
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/img;

    const validEmail = emailState.toLowerCase().match(EMAIL_REGEX);
    const validPassword = passwordState.length > PASSWORD_CHARACTER_LIMIT;

    setIsDisableState(!(validEmail && validPassword));
  }, [emailState, passwordState]);
}

export default useValidateLoginBtn;
