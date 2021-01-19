import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import '../sign-in.css';

import Header from '../../header/header';
import Main from '../../main/main';
import { UserApiRequests } from '../../../api';
import routePaths from '../../../routes';
import { ActionCreator } from '../../../reducer/user/user';
import { popupFormClass } from '../edit-profile/edit-profile';


const SignIn = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, errors } = useForm();
  const authStatus = useSelector((state) => state.USER.authorizationStatus);
  const fetchErrors = useSelector((state) => state.USER.errors);
  const isLoading = useSelector((state) => state.USER.isLoading);

  const errorsEntries = fetchErrors ? Object.entries(fetchErrors) : null;

  const formSubmitHandler = (evt) => {
    const { email, password } = evt;
    dispatch(ActionCreator.setIsLoading(true));
    dispatch(UserApiRequests.login({
      email,
      password
    }));
  };

  return (
    authStatus ?
      <Redirect to={routePaths.main} /> :
      <>
        <Header/>
        <Main>
          <div className={`${popupFormClass}__wrapper`}>
            <form action="#" className={popupFormClass} onSubmit={handleSubmit(formSubmitHandler)}>
              <h2>Sign In</h2>
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email address"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                })}
                disabled={isLoading}
              />
              {errors.email?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.email.message}</span>}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="true"
                placeholder="Password"
                ref={register({
                  required: {
                  value: true,
                  message: 'This area is required'
                  }
                })}
                disabled={isLoading}
              />
              {errors.password?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.password.message}</span>}
              {errorsEntries && <span className={`${popupFormClass}__error`}>{errorsEntries[0].join(' ')}</span>}

              <button type="submit" className={`${popupFormClass}__button-submit`} disabled={isLoading}>Login</button>
              <span>Don’t have an account? <Link to={routePaths.signUp} className={`${popupFormClass}__sign-up-link`}>Sign Up.</Link></span>
            </form>
          </div>
        </Main>
      </>
  )
};

export default SignIn;