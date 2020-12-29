import '../sign-in.css';

import Header from '../../header/header.jsx';
import Main from '../../main/main.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Operation } from '../../../reducer/user/user.js';
import { useRef } from 'react';



const CreateNewAccount = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.USER.authorizationStatus);

  const { handleSubmit, register, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const formSubmitHandler = (evt) => {
    const { email, password, username } = evt;
    console.log(email);
    console.log(password);
    console.log(username);
    console.log({
      email,
      password,
      username
    });
    dispatch(Operation.register({
      email,
      password,
      username
    }));
  };


  return (
    authStatus ?
      <Redirect to="/" /> :
      <>
        <Header/>
        <Main>
          <div className="popup-form__wrapper">
            <form action="#" className="popup-form" onSubmit={handleSubmit(formSubmitHandler)}>
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
              />
              {errors.username?.type === "required" && <span className="popup-form__error">{errors.username.message}</span>}
              {errors.username?.type === "minLength" && <span className="popup-form__error">Username must be `&gt;`2 letters</span>}
              {errors.username?.type === "maxLength" && <span className="popup-form__error">Username must be less than 21 letters</span>}

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
              />
              {errors.email?.type === "required" && <span className="popup-form__error">{errors.email.message}</span>}
              {errors.email?.type === "pattern" && <span className="popup-form__error">{errors.email.message}</span>}



              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  minLength: 6,
                  maxLength: 40
                })}
              />
              {errors.password?.type === "required" && <span className="popup-form__error">{errors.password.message}</span>}
              {errors.password?.type === "minLength" && <span className="popup-form__error">Password must be 6 signs at least</span>}
              {errors.password?.type === "maxLength" && <span className="popup-form__error">Password must be less than 40 signs</span>}

              <label htmlFor="repeat-password">Repeat Password</label>
              <input
                type="password"
                id="repeat_password"
                name="repeat_password"
                placeholder="Repeat Password"
                ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  },
                  validate: value => value === password.current
                })}
              />
              {errors.repeat_password?.type === "required" && <span className="popup-form__error">{errors.repeat_password.message}</span>}
              {errors.repeat_password?.type === "validate" && <span className="popup-form__error">Password must match</span>}

              <label className={errors.agreement?.type === "required" ? "popup-form__error" : ""}><input
                name="agreement"
                type="checkbox" ref={register({
                  required: {
                    value: true,
                    message: "This area is required"
                  }
                })}/>I agree to the processing of my personal information
              </label>
              {errors.agreement?.type === "required" && <span className="popup-form__error">{errors.agreement.message}</span>}

              <button type="submit" className="popup-form__button-submit">Create</button>
              <span>Already have an account? <a href="#signup" className="popup-form__sign-link">Sign In.</a></span>
            </form>
          </div>
        </Main>
      </>
  )
};

export default CreateNewAccount;