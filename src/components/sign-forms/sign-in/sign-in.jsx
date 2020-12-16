import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../sign-in.css';

import Header from '../../header/header.jsx';
import Main from '../../main/main.jsx';
import { Operation } from '../../../reducer/user/user.js';
import { Redirect } from 'react-router-dom';

const SignIn = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const authStatus = useSelector((state) => state.USER.authorizationStatus);

  const dispatch = useDispatch();

  const changeEmailHandler = (evt) => setEmailValue(evt.target.value);
  const changePasswordHandler = (evt) => setPasswordValue(evt.target.value);

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    dispatch(Operation.login({
      email: emailValue,
      password: passwordValue
    }))
  };

  return (
    authStatus ?
      <Redirect to="/" /> :
      <>
        <Header/>
        <Main>
          <div className="popup-form__wrapper">
            <form action="#" className="popup-form" onSubmit={(evt) => {
              formSubmitHandler(evt)
            }}>
              <h2>Sign In</h2>
              <label htmlFor="email">Email address</label>
              <input type="text" id="email" placeholder="Email address" onInput={changeEmailHandler}/>

              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" onInput={changePasswordHandler}/>
              <button type="submit" className="popup-form__button-submit">Login</button>
              <span>Don’t have an account? <a href="#signup" className="popup-form__sign-up-link">Sign Up.</a></span>
            </form>
          </div>
        </Main>
      </>
  )
};

export default SignIn;