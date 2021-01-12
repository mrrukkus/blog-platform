import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import '../sign-in.css';

import Header from '../../header/header';
import Main from '../../main/main';
import { Operation as UserOperation } from '../../../reducer/user/user';

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));
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
    dispatch(UserOperation.editProfile({
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
    return <Redirect to="/sign-in" />
  }
  return (
    <>
      <Header/>
      <Main>
        <div className="popup-form__wrapper">
          <form action="#" className="popup-form" onSubmit={handleSubmit(onFormSubmit)}>
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
            />
            {errors.username?.type === "required" && <span className="popup-form__error">{errors.username.message}</span>}


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
            />
            {errors.email?.type === "required" && <span className="popup-form__error">{errors.email.message}</span>}
            {errors.email?.type === "pattern" && <span className="popup-form__error">{errors.email.message}</span>}

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
            />
            {errors.password?.type === "required" && <span className="popup-form__error">{errors.password.message}</span>}


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
            />
            {errors.image?.type === "pattern" && <span className="popup-form__error">{errors.image.message}</span>}


            <button type="submit" className="popup-form__button-submit">Save</button>
          </form>
        </div>
      </Main>
    </>
  )
};

  // return (isLoading && !authStatus ? <Spin /> :
  //   !authStatus ? <Redirect to="/sign-in" /> :
  //   <>
  //     <Header/>
  //     <Main>
  //       <div className="popup-form__wrapper">
  //         <form action="#" className="popup-form" onSubmit={handleSubmit(onFormSubmit)}>
  //           <h2>Edit Profile</h2>

  //           <label htmlFor="username">Username</label>
  //           <input
  //             type="text"
  //             id="username"
  //             name="username"
  //             placeholder="Username"
  //             ref={register({
  //               required: {
  //                 value: true,
  //                 message: "Username is required"
  //               }
  //             })}
  //           />
  //           {errors.username?.type === "required" && <span className="popup-form__error">{errors.username.message}</span>}


  //           <label htmlFor="email">Email address</label>
  //           <input
  //             type="text"
  //             id="email"
  //             name="email"
  //             placeholder="Email"
  //             ref={register({
  //               required: {
  //                 value: true,
  //                 message: "Email is required"
  //               },
  //               pattern: {
  //                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //                 message: "invalid email address"
  //               }
  //           })}
  //           />
  //           {errors.email?.type === "required" && <span className="popup-form__error">{errors.email.message}</span>}
  //           {errors.email?.type === "pattern" && <span className="popup-form__error">{errors.email.message}</span>}

  //           <label htmlFor="password">New password</label>
  //           <input
  //             type="password"
  //             id="password"
  //             name="password"
  //             placeholder="New password"
  //             autoComplete="no"
  //             ref={register({
  //               required: {
  //                 value: true,
  //                 message: "Password is required"
  //               },
  //               maxLength: 40,
  //               minLength: 6
  //             })}
  //           />
  //           {errors.password?.type === "required" && <span className="popup-form__error">{errors.password.message}</span>}


  //           <label htmlFor="avatar">Avatar image (url)</label>
  //           <input
  //             type="text"
  //             id="image"
  //             name="image"
  //             placeholder="Avatar image"
  //             ref={register({
  //               pattern: {
  //                 value: /(https?:\/\/.*\.(?:png|jpg))/i,
  //                 message: "Url address must be correct"
  //               }
  //           })}
  //           />
  //           {errors.image?.type === "pattern" && <span className="popup-form__error">{errors.image.message}</span>}


  //           <button type="submit" className="popup-form__button-submit">Save</button>
  //         </form>
  //       </div>
  //     </Main>
  //   </>
  // )


export default EditProfile;