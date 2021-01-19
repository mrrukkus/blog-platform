import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import '../sign-in.css';

import Header from '../../header/header';
import Main from '../../main/main';
import { ActionCreator } from '../../../reducer/user/user';
import { UserApiRequests } from '../../../api';
import routePaths, { localStorageActions } from '../../../routes';

const popupFormClass = 'popup-form';

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorageActions.getUser());
  const authStatus = useSelector((state) => state.USER.authorizationStatus);
  const isLoading = useSelector((state) => state.USER.isLoading);

  const { handleSubmit, register, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onFormSubmit = (evt) => {
    const { email, image, password, username } = evt;
    dispatch(ActionCreator.setIsLoading(true));
    dispatch(UserApiRequests.editProfile({
      username,
      email,
      password,
      image
    }));
  };

  if (isLoading && !authStatus) {
    return <Spin />
  }
  if (!authStatus) {
    return <Redirect to={routePaths.signIn} />
  }
  return (
    <>
      <Header/>
      <Main>
        <div className={`${popupFormClass}__wrapper`}>
          <form action="#" className={popupFormClass} onSubmit={handleSubmit(onFormSubmit)} >
            <h2>Edit Profile</h2>

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              ref={register({
                required: {
                  value: true,
                  message: "Username is required"
                }
              })}
              disabled={isLoading}
            />
            {errors.username?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.username.message}</span>}


            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              ref={register({
                required: {
                  value: true,
                  message: "Email is required"
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

            <label htmlFor="password">New password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New password"
              autoComplete="no"
              ref={register({
                required: {
                  value: true,
                  message: "Password is required"
                },
                maxLength: 40,
                minLength: 6
              })}
              disabled={isLoading}
            />
            {errors.password?.type === "required" && <span className={`${popupFormClass}__error`}>{errors.password.message}</span>}


            <label htmlFor="avatar">Avatar image (url)</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Avatar image"
              ref={register({
                pattern: {
                  value: /(https?:\/\/.*\.(?:png|jpg))/i,
                  message: "Url address must be correct"
                }
              })}
              disabled={isLoading}
            />
            {errors.image?.type === "pattern" && <span className={`${popupFormClass}__error`}>{errors.image.message}</span>}


            <button type="submit" className={`${popupFormClass}__button-submit`} disabled={isLoading}>Save</button>
          </form>
        </div>
      </Main>
    </>
  )
};

export {popupFormClass}
export default EditProfile;