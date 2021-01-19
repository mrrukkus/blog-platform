import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../sign-in.css';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';

import Header from '../../header/header';
import Main from '../../main/main';
import { UserApiRequests } from '../../../api';
import routePaths from '../../../routes';
import { ActionCreator } from '../../../reducer/user/user';
import { popupFormClass } from '../edit-profile/edit-profile';


const CreateNewAccount = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(ActionCreator.setSuccess(null)), [dispatch]);

  const authStatus = useSelector((state) => state.USER.authorizationStatus);
  const fetchErrors = useSelector((state) => state.USER.errors);
  const isSuccess = useSelector((state) => state.USER.isSuccess);
  const isLoading = useSelector((state) => state.USER.isLoading);

  const { handleSubmit, register, errors, watch } = useForm();
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const formSubmitHandler = (evt) => {
    const { email, password, username } = evt;
    dispatch(ActionCreator.setIsLoading(true));
    dispatch(UserApiRequests.register({
      email,
      password,
      username
    }));
  };

  if (isSuccess) {
    return <Redirect to={routePaths.signIn} />
  }

  return (
    authStatus ?
      <Redirect to={routePaths.main} /> :
      <>
        <Header/>
        <Main>
          <div className={`${popupFormClass}__wrapper`}>
            <form action="#" className={popupFormClass} onSubmit={handleSubmit(formSubmitHandler)}>
              <h2>Create new account</h2>

              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  minLength: 3,
                  maxLength: 20
                })}
                disabled={isLoading}
              />
              {errors.username?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.username.message}</span>}
              {errors.username?.type === "minLength" && <span className={`${popupFormClass}__error`}>Username must be more than 2 letters</span>}
              {errors.username?.type === "maxLength" && <span className={`${popupFormClass}__error`}>Username must be less than 21 letters</span>}
              {fetchErrors?.username && <span className={`${popupFormClass}__error`}>Username {fetchErrors.username}</span>}

              <label htmlFor="email">Email address</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                name="email"
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
              {errors.email?.type === "pattern" && <span className={`${popupFormClass}__error`}>{errors.email.message}</span>}
              {fetchErrors?.email && <span className={`${popupFormClass}__error`}>Email {fetchErrors.email}</span>}


              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                placeholder="Password"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  minLength: 6,
                  maxLength: 40
                })}
                disabled={isLoading}
              />
              {errors.password?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.password.message}</span>}
              {errors.password?.type === "minLength" && <span className={`${popupFormClass}__error`}>Password must be 6 signs at least</span>}
              {errors.password?.type === "maxLength" && <span className={`${popupFormClass}__error`}>Password must be less than 40 signs</span>}

              <label htmlFor="repeat-password">Repeat Password</label>
              <input
                type="password"
                id="repeat_password"
                name="repeat_password"
                autoComplete="false"
                placeholder="Repeat Password"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  validate: value => value === passwordRef.current
                })}
                disabled={isLoading}
              />
              {errors.repeat_password?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.repeat_password.message}</span>}
              {errors.repeat_password?.type === "validate" && <span className={`${popupFormClass}__error`}>Password must match</span>}

              <label className={errors.agreement?.type === "required" ? `${popupFormClass}__error` : ""}><input
                name="agreement"
                type="checkbox" ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  }
                })}/>I agree to the processing of my personal information
              </label>
              {errors.agreement?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.agreement.message}</span>}

              <button type="submit" className={`${popupFormClass}__button-submit`} disabled={isLoading}>Create</button>
              <span>Already have an account? <Link to={routePaths.signIn} className={`${popupFormClass}__sign-link`}>Sign In.</Link></span>
            </form>
          </div>
        </Main>
      </>
  )
};

export default CreateNewAccount;